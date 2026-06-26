// ───────────────────────────────────────────────────────────────
// Architecture Map — 메인 앱 (Divisare 풍 아카이브 + 미니멀 지도)
// ───────────────────────────────────────────────────────────────

const map = L.map("map", { zoomControl: true }).setView([48.6, 6.0], 5);

// 미니멀한 밝은 타일 (CartoDB Positron)
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · © <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
  }
).addTo(map);

const COLORS = { visited: "#2f6b46", toVisit: "#b23b2e" };

function makeIcon(status) {
  const color = COLORS[status] || "#555";
  return L.divIcon({
    className: "",
    html: '<div class="marker-dot" style="background:' + color + '"></div>',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

const markerLayer = L.layerGroup().addTo(map);

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

let allPlaces = [];
let markerIndex = {};
let firstFit = true;

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;",
  }[c]));
}

// ── 팝업 ──────────────────────────────────────────────────
function popupHtml(p) {
  let html = "";
  if (p.photo)
    html += '<img class="popup-img" src="' + esc(p.photo) +
      '" onerror="this.style.display=\'none\'" />';
  html += '<div class="popup-body">';
  html += '<div class="popup-architect">' + esc(p.architect || "") + "</div>";
  html += '<div class="popup-title">' + esc(p.name) + "</div>";
  html += '<div class="popup-meta">' +
    (p.year ? esc(p.year) + " · " : "") + esc(p.city) +
    (p.country ? ", " + esc(p.country) : "") + "</div>";
  if (p.note) html += '<div class="popup-note">' + esc(p.note) + "</div>";
  html += "</div>";
  return html;
}

// ── 국가 드롭다운 ─────────────────────────────────────────
function refreshCountryOptions() {
  const current = els.country.value;
  const countries = Array.from(
    new Set(allPlaces.map((p) => p.country).filter(Boolean))
  ).sort();
  els.country.innerHTML =
    '<option value="">All countries</option>' +
    countries.map((c) => '<option value="' + esc(c) + '">' + esc(c) + "</option>").join("");
  if (countries.indexOf(current) !== -1) els.country.value = current;
}

// ── 필터 + 정렬 ───────────────────────────────────────────
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

// ── 카드 ──────────────────────────────────────────────────
function buildCard(p) {
  const li = document.createElement("li");
  li.className = "card";

  const statusLabel = p.status === "visited" ? "Visited" : "To visit";
  const dotClass = p.status === "visited" ? "visited" : "tovisit";
  const toggleLabel = p.status === "visited" ? "갈 곳으로" : "가봤어요";

  const thumbInner = p.photo
    ? '<img src="' + esc(p.photo) + '" loading="lazy" alt="' + esc(p.name) +
      '" onerror="this.parentNode.innerHTML=\'<div class=&quot;noimg&quot;>NO IMAGE</div>\'" />'
    : '<div class="noimg">사진 없음 · 추가하기</div>';

  li.innerHTML =
    '<div class="thumb">' + thumbInner +
      '<div class="badge"><span class="dot ' + dotClass + '"></span>' + statusLabel + "</div>" +
    "</div>" +
    '<div class="caption">' +
      '<div class="architect">' + esc(p.architect || "—") + "</div>" +
      '<div class="name">' + esc(p.name) + "</div>" +
      '<div class="meta">' + (p.year ? esc(p.year) + " · " : "") +
        esc(p.city) + (p.country ? ", " + esc(p.country) : "") + "</div>" +
    "</div>" +
    '<div class="actions">' +
      '<button class="photo">사진</button>' +
      '<button class="toggle">' + toggleLabel + "</button>" +
      '<button class="del">삭제</button>' +
    "</div>";

  // 카드 클릭 → 지도 이동 + 팝업
  li.addEventListener("click", () => {
    if (typeof p.lat === "number") {
      map.setView([p.lat, p.lng], 15, { animate: true });
      const m = markerIndex[p.id];
      if (m) m.openPopup();
    }
  });

  li.querySelector(".photo").addEventListener("click", (e) => {
    e.stopPropagation();
    const url = window.prompt("사진 URL을 입력하세요 (비우면 삭제):", p.photo || "");
    if (url === null) return;
    Store.update(p.id, { photo: url.trim() });
  });
  li.querySelector(".toggle").addEventListener("click", (e) => {
    e.stopPropagation();
    Store.update(p.id, { status: p.status === "visited" ? "toVisit" : "visited" });
  });
  li.querySelector(".del").addEventListener("click", (e) => {
    e.stopPropagation();
    if (confirm('"' + p.name + '" 을(를) 삭제할까요?')) Store.remove(p.id);
  });

  return li;
}

// ── 렌더링 ────────────────────────────────────────────────
function render() {
  const list = visiblePlaces();

  markerLayer.clearLayers();
  markerIndex = {};
  const pts = [];
  list.forEach((p) => {
    if (typeof p.lat !== "number" || typeof p.lng !== "number") return;
    const marker = L.marker([p.lat, p.lng], { icon: makeIcon(p.status) })
      .bindPopup(popupHtml(p), { maxWidth: 240, minWidth: 240 });
    marker.addTo(markerLayer);
    markerIndex[p.id] = marker;
    pts.push([p.lat, p.lng]);
  });

  els.list.innerHTML = "";
  if (!list.length) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "조건에 맞는 건축물이 없습니다.";
    els.list.appendChild(li);
  } else {
    list.forEach((p) => els.list.appendChild(buildCard(p)));
  }

  els.statVisited.textContent = allPlaces.filter((p) => p.status === "visited").length;
  els.statToVisit.textContent = allPlaces.filter((p) => p.status === "toVisit").length;

  // 첫 로드 시 마커 전체가 보이도록 맞춤
  if (firstFit && pts.length) {
    firstFit = false;
    map.fitBounds(pts, { padding: [50, 50], maxZoom: 12 });
  }
}

// ── 지오코딩 (Nominatim) ─────────────────────────────────
const geoResults = document.getElementById("geocode-results");
function doGeocode() {
  const q = document.getElementById("f-query").value.trim();
  if (!q) return;
  geoResults.innerHTML = '<div class="geo-loading">검색 중…</div>';
  fetch("https://nominatim.openstreetmap.org/search?format=json&limit=5&q=" +
    encodeURIComponent(q), { headers: { Accept: "application/json" } })
    .then((r) => r.json())
    .then((rows) => {
      if (!rows.length) { geoResults.innerHTML = '<div class="geo-loading">결과 없음</div>'; return; }
      geoResults.innerHTML = "";
      rows.forEach((row) => {
        const div = document.createElement("div");
        div.className = "geo-item";
        div.textContent = row.display_name;
        div.addEventListener("click", () => {
          document.getElementById("f-lat").value = parseFloat(row.lat).toFixed(5);
          document.getElementById("f-lng").value = parseFloat(row.lon).toFixed(5);
          geoResults.innerHTML = '<div class="geo-ok">좌표 설정됨: ' +
            parseFloat(row.lat).toFixed(5) + ", " + parseFloat(row.lon).toFixed(5) + "</div>";
        });
        geoResults.appendChild(div);
      });
    })
    .catch(() => { geoResults.innerHTML = '<div class="geo-loading">검색 실패 (네트워크)</div>'; });
}

// ── 폼 ────────────────────────────────────────────────────
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

function exportCode() {
  const p = readForm();
  if (!p.name) { alert("먼저 폼을 채워주세요."); return; }
  const code =
    "  {\n" +
    "    name: " + JSON.stringify(p.name) + ', nameEn: "",\n' +
    "    city: " + JSON.stringify(p.city) + ", country: " + JSON.stringify(p.country) +
    ", lat: " + p.lat + ", lng: " + p.lng + ",\n" +
    "    status: " + JSON.stringify(p.status) +
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

// ── 이벤트 ────────────────────────────────────────────────
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
  els.storageMode.textContent = Store.mode === "firebase" ? "Cloud sync" : "Local";
  if (Store.mode === "firebase") els.storageMode.classList.add("cloud");
});
