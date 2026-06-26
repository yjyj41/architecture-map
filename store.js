// ───────────────────────────────────────────────────────────────
// 저장 추상화 계층
// FIREBASE_CONFIG가 채워져 있으면 Firestore, 아니면 localStorage 사용.
//   Store.init()            -> Promise<void>  (앱 시작 시 1회)
//   Store.onChange(fn)      -> 데이터 변경 시 fn(places) 호출
//   Store.getAll()          -> 현재 장소 배열
//   Store.add(place)        -> Promise (새 장소 추가)
//   Store.update(id, patch) -> Promise (부분 수정)
//   Store.remove(id)        -> Promise (삭제)
//   Store.mode              -> 'firebase' | 'local'
//
// 추가로, 시드(PLACES)에 사진이 있는데 기존 문서에 사진이 비어 있으면
// 이름(nameEn/name)으로 매칭해 한 번 자동 채워 넣습니다(백필).
// ───────────────────────────────────────────────────────────────

const Store = (() => {
  const LS_KEY = "architecture-map-places";
  const listeners = [];
  let places = [];
  let mode = "local";
  let db = null;

  function uid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "id-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }

  function notify() {
    const snapshot = places.slice();
    listeners.forEach((fn) => fn(snapshot));
  }
  function onChange(fn) { listeners.push(fn); }
  function getAll() { return places.slice(); }

  function seedWithIds() {
    return PLACES.map((p) => Object.assign({ id: uid() }, p));
  }

  // 이름으로 시드 사진 찾기 (백필용)
  function seedPhotoFor(place) {
    const key = (place.nameEn || place.name || "").trim();
    for (let i = 0; i < PLACES.length; i++) {
      const s = PLACES[i];
      if ((s.nameEn || "").trim() === key || (s.name || "").trim() === key) {
        return s.photo || "";
      }
    }
    return "";
  }

  // 신규 시드 동기화 헬퍼
  function nameKeys(p) {
    return [(p.nameEn || "").trim(), (p.name || "").trim()].filter(Boolean);
  }
  function buildNameSet(arr) {
    const s = new Set();
    arr.forEach((p) => nameKeys(p).forEach((k) => s.add(k)));
    return s;
  }
  function seedIsMissing(existingSet, seed) {
    return !nameKeys(seed).some((k) => existingSet.has(k));
  }
  function seedSyncEnabled() {
    return typeof SEED_SYNC === "undefined" ? true : !!SEED_SYNC;
  }

  function firebaseEnabled() {
    return (
      typeof FIREBASE_CONFIG === "object" &&
      FIREBASE_CONFIG &&
      !!FIREBASE_CONFIG.projectId &&
      typeof firebase !== "undefined"
    );
  }

  // ── localStorage 백엔드 ────────────────────────────────
  const localBackend = {
    init() {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        try { places = JSON.parse(raw); }
        catch (e) { places = seedWithIds(); }
      } else {
        places = seedWithIds();
      }
      // 사진 백필
      places.forEach((p) => {
        if (!p.photo) {
          const ph = seedPhotoFor(p);
          if (ph) p.photo = ph;
        }
      });
      // 신규 시드 동기화 (시드에 있는데 저장소에 없는 건물 추가)
      if (seedSyncEnabled()) {
        const existing = buildNameSet(places);
        PLACES.forEach((s) => {
          if (seedIsMissing(existing, s)) places.push(Object.assign({ id: uid() }, s));
        });
      }
      persist();
      notify();
      return Promise.resolve();
    },
    add(place) {
      places.push(Object.assign({ id: uid() }, place));
      persist(); notify();
      return Promise.resolve();
    },
    update(id, patch) {
      places = places.map((p) => (p.id === id ? Object.assign({}, p, patch) : p));
      persist(); notify();
      return Promise.resolve();
    },
    remove(id) {
      places = places.filter((p) => p.id !== id);
      persist(); notify();
      return Promise.resolve();
    },
  };

  function persist() {
    localStorage.setItem(LS_KEY, JSON.stringify(places));
  }

  // ── Firebase / Firestore 백엔드 ────────────────────────
  const firebaseBackend = {
    init() {
      firebase.initializeApp(FIREBASE_CONFIG);
      db = firebase.firestore();
      const col = db.collection("places");

      return col.get().then((snap) => {
        if (snap.empty) {
          const batch = db.batch();
          seedWithIds().forEach((p) => {
            const ref = col.doc(p.id);
            const data = Object.assign({}, p);
            delete data.id;
            batch.set(ref, data);
          });
          return batch.commit().then(subscribe);
        }
        return subscribe();
      });

      function subscribe() {
        let backfilled = false;
        col.onSnapshot((snap) => {
          places = snap.docs.map((d) => Object.assign({ id: d.id }, d.data()));
          notify();
          if (!backfilled) {
            backfilled = true;
            // 사진 백필
            places.forEach((p) => {
              if (!p.photo) {
                const ph = seedPhotoFor(p);
                if (ph) col.doc(p.id).update({ photo: ph }).catch(function () {});
              }
            });
            // 신규 시드 동기화: 시드에 있는데 클라우드에 없는 건물 추가
            if (seedSyncEnabled()) {
              const existing = buildNameSet(places);
              PLACES.forEach((s) => {
                if (seedIsMissing(existing, s)) {
                  col.add(Object.assign({}, s)).catch(function () {});
                }
              });
            }
          }
        });
      }
    },
    add(place) { return db.collection("places").add(place); },
    update(id, patch) { return db.collection("places").doc(id).update(patch); },
    remove(id) { return db.collection("places").doc(id).delete(); },
  };

  let backend = localBackend;

  function init() {
    if (firebaseEnabled()) {
      mode = "firebase";
      backend = firebaseBackend;
      return backend.init().catch((err) => {
        console.warn("Firebase 연결 실패 → localStorage로 전환합니다.", err);
        mode = "local";
        backend = localBackend;
        return backend.init();
      });
    }
    mode = "local";
    backend = localBackend;
    return backend.init();
  }

  return {
    init,
    onChange,
    getAll,
    add: (p) => backend.add(p),
    update: (id, patch) => backend.update(id, patch),
    remove: (id) => backend.remove(id),
    get mode() { return mode; },
  };
})();
