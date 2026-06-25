// 지도 초기화 (런던 중심)
const map = L.map('map').setView([51.5085, -0.0918], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map);

// 상태별 마커 색
const COLORS = { visited: '#2e7d52', toVisit: '#c0392b' };

function makeIcon(status) {
  const color = COLORS[status] || '#555';
  return L.divIcon({
    className: 'custom-marker',
    html: '<div style="width:16px;height:16px;border-radius:50%;background:' + color +
          ';border:2px solid #fff;box-shadow:0 0 3px rgba(0,0,0,0.4);"></div>',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
}

const markers = [];

function popupHtml(p) {
  let html = '<div class="popup-title">' + p.name + '</div>';
  html += '<div class="popup-meta">' + (p.architect || '') +
          (p.year ? ' · ' + p.year : '') + ' · ' + p.city + '</div>';
  if (p.photo) html += '<img src="' + p.photo + '" style="width:100%;border-radius:4px;margin-bottom:6px;" />';
  if (p.note) html += '<div class="popup-note">' + p.note + '</div>';
  return html;
}

// 마커 + 사이드바 리스트 생성
const listEl = document.getElementById('place-list');

PLACES.forEach((p, i) => {
  const marker = L.marker([p.lat, p.lng], { icon: makeIcon(p.status) })
    .addTo(map)
    .bindPopup(popupHtml(p));
  markers.push({ marker, data: p });

  const li = document.createElement('li');
  li.className = 'place-item';
  li.dataset.status = p.status;
  const dotClass = p.status === 'visited' ? 'visited' : 'tovisit';
  li.innerHTML = '<div class="name"><span class="dot ' + dotClass + '"></span>' + p.name + '</div>' +
                 '<div class="meta">' + (p.architect || '') + (p.year ? ' · ' + p.year : '') + '</div>';
  li.addEventListener('click', () => {
    map.setView([p.lat, p.lng], 16);
    marker.openPopup();
  });
  listEl.appendChild(li);
});

// 필터
function applyFilter() {
  const showVisited = document.getElementById('filter-visited').checked;
  const showToVisit = document.getElementById('filter-tovisit').checked;

  markers.forEach(({ marker, data }) => {
    const show = (data.status === 'visited' && showVisited) ||
                 (data.status === 'toVisit' && showToVisit);
    if (show) {
      if (!map.hasLayer(marker)) marker.addTo(map);
    } else {
      if (map.hasLayer(marker)) map.removeLayer(marker);
    }
  });

  document.querySelectorAll('.place-item').forEach(li => {
    const s = li.dataset.status;
    const show = (s === 'visited' && showVisited) || (s === 'toVisit' && showToVisit);
    li.style.display = show ? '' : 'none';
  });
}

document.getElementById('filter-visited').addEventListener('change', applyFilter);
document.getElementById('filter-tovisit').addEventListener('change', applyFilter);
