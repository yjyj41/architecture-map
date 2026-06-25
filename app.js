// ───────────────────────────────────────────────────────────────
// Architecture Map — 메인 앱
// ───────────────────────────────────────────────────────────────

// 지도 초기화 (런던 중심)
const map = L.map("map").setView([51.5085, -0.0918], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
  maxZoom: 19,
}).addTo(map);

const COLORS = { visited: "#2e7d52", toVisit: "#c0392b" };

function makeIcon(status) {
  const color = COLORS[status] || "#555";
  return L.divIcon({
    className: "custom-marker",
    html:
      '<div style="width:16px;height:16px;border-radius:50%;background:' +
      color +
      ';border:2px solid #fff;box-shadow:0 0 4px rgba(0,0,0,0.4);"></div>',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

const markerLayer = L.layerGroup().addTo(map);

// ── DOM 참조 ──────────────────────────────────────────────
const els = {
  list: document.getElementById("place-list"),
  search: document.getElementById("search"),
  country: document.getElementById("filter-country"),
  sort: document.getElementById("sort"),
  fVisited: document.getElementById("filter-visited"),
  fToVisit: document.getElementById("filter-tovisit"),
  statVisited: document.getElementById("stat-visited"),
  statToVisit: document.getElementById("stat-tovisit"),
  storageMode: document.getElementById("storage-mode"),
};

let allPlaces = []; // Store가 주는 원본
let markerIndex = {}; // id -> marker (리스트 클릭 시 팝업 열기)

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;",
  }[c]));
}

// ── 팝업 HTML ─────────────────────────────────────────────
function popupHtml(p) {
  let html = '<div class="popup-title">' + esc(p.name) + "</div>";
  html +=
    '<div class="popup-meta">' +
    esc(p.architect || "") +
    (p.year ? " · " + esc(p.year) : "") +
    " · " + esc(p.city) +
    (p.country ? ", " + esc(p.country) : "") +
    "</div>";
  if (p.photo)
    html +=
      '<img src="' + esc(p.photo) +
      '" style="width:100%;border-radius:4px;margin:4px 0;" onerror="this.style.display=\'none\'" />';
  if (p.note) html += '<div class="popup-note">' + esc(p.note) + "</div>";
  return html;
}

// ── 국가 드롭다운 채우기 (선택 보존) ───────────────────────
function refreshCountryOptions() {
  const current = els.country.value;
  const countries = Array.from(
    new Set(allPlaces.map((p) => p.country).filter(Boolean))
  ).sort();
  els.country.innerHTML =
    '<option value="">전체 국가</option>' +
    countries.map((c) => '<option value="' + esc(c) + '">' + esc(c) + "</option>").join("");
  if (countries.indexOf(current) !== -1) els.country.value = current;
}

// ── 필터 + 정렬 적용 ──────────────────────────────────────
function visiblePlaces() {
  const q = els.search.value.trim().toLowerCase();
  const country = els.country.value;
  const showV = els.fVisited.checked;
  const showT = els.fToVisit.checked;

  let list = allPlaces.filter((p) => {
    if (p.status === "visited" && !showV) return false;
    if (p.status === "toVisit" && !showT) return false;
    if (country && p.country !== country) return false;
    if (q) {
      const hay = [p.name, p.nameEn, p.city, p.country, p.architect]
        .filter(Boolean).join(" ").toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  });

  const sortKey = els.sort.value;
  list.sort((a, b) => {
    if (sortKey === "year") return (a.year || 9999) - (b.year || 9999);
    if (sortKey === "city") return String(a.city).localeCompare(String(b.city));
    return String(a.name).localeCompare(String(b.name), "ko");
  });
  return list;
}

// ── 렌더링 ────────────────────────────────────────────────
function render() {
  const list = visiblePlaces();

  // 마커
  markerLayer.clearLayers();
  markerIndex = {};
  list.forEach((p) => {
    if (typeof p.lat !== "number" || typeof p.lng !== "number") return;
    const marker = L.marker([p.lat, p.lng], { icon: makeIcon(p.status) })
      .bindPopup(popupHtml(p));
    marker.addTo(markerLayer);
    markerIndex[p.id] = marker;
  });

  // 리스트
  els.list.innerHTML = "";
  list.forEach((p) => {
    const li = document.createElement("li");
    li.className = "place-item";
    const dotClass = p.status === "visited" ? "visited" : "tovisit";
    const toggleLabel = p.status === "visited" ? "갈 곳으로" : "가봤어요";
    li.innerHTML =
      '<div class="place-main">' +
        '<div class="name"><span class="dot ' + dotClass + '"></span>' + esc(p.name) + "</div>" +
        '<div class="meta">' + esc(p.architect || "") +
          (p.year ? " · " + esc(p.year) : "") +
          " · " + esc(p.city) + "</div>" +
      "</div>" +
      '<div class="place-actions">' +
        '<button class="mini toggle" title="상태 변경">' + toggleLabel + "</button>" +
        '<button class="mini del" title="삭제">✕</button>' +
      "</div>";

    li.querySelector(".place-main").addEventListener("click", () => {
      if (typeof p.lat === "number") {
        map.setView([p.lat, p.lng], 15);
        const m = markerIndex[p.id];
        if (m) m.openPopup();
      }
    });
    li.querySelector(".toggle").addEventListener("click", (e) => {
      e.stopPropagation();
      const next = p.status === "visited" ? "toVisit" : "visited";
      Store.update(p.id, { status: next });
    });
    li.querySelector(".del").addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm('"' + p.name + '" 을(를) 삭제할까요?')) Store.remove(p.id);
    });

    els.list.appendChild(li);
  });

  // 통계 (필터와 무관하게 전체 기준)
  els.statVisited.textContent = allPlaces.filter((p) => p.status === "visited").length;
  els.statToVisit.textContent = allPlaces.filter((p) => p.status === "toVisit").length;
}

// ── 지오코딩 (OpenStreetMap Nominatim, 무료) ───────────────
const geoResults = document.getElementById("geocode-results");

function doGeocode() {
  const q = document.getElementById("f-query").value.trim();
  if (!q) return;
  geoResults.innerHTML = '<div class="geo-loading">검색 중…</div>';
  const url =
    "https://nominatim.openstreetmap.org/search?format=json&limit=5&q=" +
    encodeURIComponent(q);
  fetch(url, { headers: { Accept: "application/json" } })
    .then((r) => r.json())
    .then((rows) => {
      if (!rows.length) {
        geoResults.innerHTML = '<div class="geo-loading">결과 없음</div>';
        return;
      }
      geoResults.innerHTML = "";
      rows.forEach((row) => {
        const div = document.createElement("div");
        div.className = "geo-item";
        div.textContent = row.display_name;
        div.addEventListener("click", () => {
          document.getElementById("f-lat").value = parseFloat(row.lat).toFixed(5);
          document.getElementById("f-lng").value = parseFloat(row.lon).toFixed(5);
          geoResults.innerHTML =
            '<div class="geo-ok">좌표 설정됨: ' +
            parseFloat(row.lat).toFixed(5) + ", " + parseFloat(row.lon).toFixed(5) +
            "</div>";
        });
        geoResults.appendChild(div);
      });
    })
    .catch(() => {
      geoResults.innerHTML = '<div class="geo-loading">검색 실패 (네트워크)</div>';
    });
}

// ── 폼 제출: 새 장소 추가 ─────────────────────────────────
function readForm() {
  const status = document.querySelector('input[name="f-status"]:checked').value;
  const yearVal = document.getElementById("f-year").value;
  return {
    name: document.getElementById("f-name").value.trim(),
    nameEn: "",
    city: document.getElementById("f-city").value.trim(),
    country: document.getElementById("f-country").value.trim(),
    lat: parseFloat(document.getElementById("f-lat").value),
    lng: parseFloat(document.getElementById("f-lng").value),
    status: status,
    architect: document.getElementById("f-architect").value.trim(),
    year: yearVal ? parseInt(yearVal, 10) : null,
    note: document.getElementById("f-note").value.trim(),
    photo: document.getElementById("f-photo").value.trim(),
  };
}

function handleSubmit(e) {
  e.preventDefault();
  const place = readForm();
  if (!place.name || isNaN(place.lat) || isNaN(place.lng)) {
    alert("이름과 좌표(위도/경도)는 필수예요. '검색'으로 좌표를 채워보세요.");
    return;
  }
  Store.add(place).then(() => {
    document.getElementById("add-form").reset();
    geoResults.innerHTML = "";
    if (typeof place.lat === "number") map.setView([place.lat, place.lng], 14);
  });
}

// ── data.js용 코드 내보내기 (클립보드 복사) ────────────────
function exportCode() {
  const p = readForm();
  if (!p.name) {
    alert("먼저 폼을 채워주세요.");
    return;
  }
  const code =
    "  {\n" +
    '    name: ' + JSON.stringify(p.name) + ', nameEn: "",\n' +
    '    city: ' + JSON.stringify(p.city) + ", country: " + JSON.stringify(p.country) +
    ", lat: " + p.lat + ", lng: " + p.lng + ",\n" +
    '    status: ' + JSON.stringify(p.status) +
    ", architect: " + JSON.stringify(p.architect) +
    ", year: " + (p.year || "null") + ",\n" +
    "    note: " + JSON.stringify(p.note) +
    ", photo: " + JSON.stringify(p.photo) + "\n" +
    "  },";
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(
      () => alert("data.js의 PLACES 배열에 붙여넣을 코드가 복사됐어요.\n\n" + code),
      () => window.prompt("아래 코드를 복사하세요:", code)
    );
  } else {
    window.prompt("아래 코드를 복사하세요:", code);
  }
}

// ── 이벤트 바인딩 ─────────────────────────────────────────
els.search.addEventListener("input", render);
els.country.addEventListener("change", render);
els.sort.addEventListener("change", render);
els.fVisited.addEventListener("change", render);
els.fToVisit.addEventListener("change", render);
document.getElementById("geocode-btn").addEventListener("click", doGeocode);
document.getElementById("f-query").addEventListener("keydown", (e) => {
  if (e.key === "Enter") { e.preventDefault(); doGeocode(); }
});
document.getElementById("add-form").addEventListener("submit", handleSubmit);
document.getElementById("export-btn").addEventListener("click", exportCode);

// ── 시작 ──────────────────────────────────────────────────
Store.onChange((places) => {
  allPlaces = places;
  refreshCountryOptions();
  render();
});

Store.init().then(() => {
  els.storageMode.textContent =
    Store.mode === "firebase" ? "☁ 클라우드 저장 (모든 기기 공유)" : "💾 이 브라우저에 저장";
  els.storageMode.classList.add(Store.mode === "firebase" ? "cloud" : "local");
});
