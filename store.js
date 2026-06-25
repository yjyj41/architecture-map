// ───────────────────────────────────────────────────────────────
// 저장 추상화 계층
// FIREBASE_CONFIG가 채워져 있으면 Firestore, 아니면 localStorage 사용.
// 어느 쪽이든 동일한 API를 제공합니다:
//   Store.init()            -> Promise<void>  (앱 시작 시 1회)
//   Store.onChange(fn)      -> 데이터 변경 시 fn(places) 호출
//   Store.getAll()          -> 현재 장소 배열
//   Store.add(place)        -> Promise (새 장소 추가)
//   Store.update(id, patch) -> Promise (부분 수정)
//   Store.remove(id)        -> Promise (삭제)
//   Store.mode              -> 'firebase' | 'local'
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

  function onChange(fn) {
    listeners.push(fn);
  }

  function getAll() {
    return places.slice();
  }

  // seed 데이터에 id 부여
  function seedWithIds() {
    return PLACES.map((p) => Object.assign({ id: uid() }, p));
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
        try {
          places = JSON.parse(raw);
        } catch (e) {
          places = seedWithIds();
          persist();
        }
      } else {
        places = seedWithIds(); // 첫 실행: 시드로 초기화
        persist();
      }
      notify();
      return Promise.resolve();
    },
    add(place) {
      places.push(Object.assign({ id: uid() }, place));
      persist();
      notify();
      return Promise.resolve();
    },
    update(id, patch) {
      places = places.map((p) => (p.id === id ? Object.assign({}, p, patch) : p));
      persist();
      notify();
      return Promise.resolve();
    },
    remove(id) {
      places = places.filter((p) => p.id !== id);
      persist();
      notify();
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
        // 컬렉션이 비어 있으면 시드 데이터로 초기화
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
        // 실시간 구독: 어느 기기에서 바꿔도 즉시 반영
        col.onSnapshot((snap) => {
          places = snap.docs.map((d) => Object.assign({ id: d.id }, d.data()));
          notify();
        });
      }
    },
    add(place) {
      return db.collection("places").add(place);
    },
    update(id, patch) {
      return db.collection("places").doc(id).update(patch);
    },
    remove(id) {
      return db.collection("places").doc(id).delete();
    },
  };

  let backend = localBackend;

  function init() {
    if (firebaseEnabled()) {
      mode = "firebase";
      backend = firebaseBackend;
      return backend.init().catch((err) => {
        // Firebase 실패 시 localStorage로 안전하게 폴백
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
    get mode() {
      return mode;
    },
  };
})();
