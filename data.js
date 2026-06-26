// 건축물 시드(seed) 데이터
// 이 배열은 "처음 한 번" 저장소를 채우는 기본값입니다.
// 추가/삭제/수정/사진추가는 사이트 UI로 하면 되고, 저장은 store.js가 처리합니다.
//   - Firebase 미설정 시: 브라우저(localStorage)에 저장
//   - Firebase 설정 시: 클라우드(Firestore)에 저장되어 모든 기기에서 공유
//
// status: "visited"(가본 곳) 또는 "toVisit"(갈 곳)
// photo: 위키미디어 커먼즈의 자유 라이선스 이미지(직접 URL을 바꿔도 됩니다)

const PLACES = [
  // ── London ─────────────────────────────────────────────
  {
    name: "세인트 폴 대성당", nameEn: "St Paul's Cathedral",
    city: "London", country: "UK", lat: 51.5138, lng: -0.0984,
    status: "visited", architect: "Christopher Wren", year: 1710,
    note: "영국 바로크 건축의 대표작. 돔이 인상적.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/St_Pauls_aerial_%28cropped%29.jpg/960px-St_Pauls_aerial_%28cropped%29.jpg"
  },
  {
    name: "테이트 모던", nameEn: "Tate Modern",
    city: "London", country: "UK", lat: 51.5076, lng: -0.0994,
    status: "visited", architect: "Herzog & de Meuron", year: 2000,
    note: "옛 발전소를 미술관으로 리모델링.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Tate_Modern_-_Bankside_Power_Station.jpg/960px-Tate_Modern_-_Bankside_Power_Station.jpg"
  },
  {
    name: "더 샤드", nameEn: "The Shard",
    city: "London", country: "UK", lat: 51.5045, lng: -0.0865,
    status: "toVisit", architect: "Renzo Piano", year: 2012,
    note: "서유럽에서 가장 높은 건물 중 하나.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/The_Shard_at_sunset_2017_%28cropped%29.jpg/960px-The_Shard_at_sunset_2017_%28cropped%29.jpg"
  },
  {
    name: "바비칸 센터", nameEn: "Barbican Centre",
    city: "London", country: "UK", lat: 51.5200, lng: -0.0937,
    status: "toVisit", architect: "Chamberlin, Powell and Bon", year: 1982,
    note: "브루탈리즘 건축의 상징적 복합단지.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Barbican_Lakeside_on_a_summer_evening.jpg/960px-Barbican_Lakeside_on_a_summer_evening.jpg"
  },
  {
    name: "로이즈 빌딩", nameEn: "Lloyd's Building",
    city: "London", country: "UK", lat: 51.5132, lng: -0.0822,
    status: "toVisit", architect: "Richard Rogers", year: 1986,
    note: "내부 설비를 바깥으로 드러낸 하이테크 건축.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Lloyds_building_taken_2011.jpg"
  },
  {
    name: "30 세인트 메리 액스(거킨)", nameEn: "30 St Mary Axe",
    city: "London", country: "UK", lat: 51.5145, lng: -0.0803,
    status: "toVisit", architect: "Norman Foster", year: 2003,
    note: "오이 모양의 친환경 고층 오피스.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/30_St_Mary_Axe%2C_%27Gherkin%27.JPG/960px-30_St_Mary_Axe%2C_%27Gherkin%27.JPG"
  },
  {
    name: "배터시 발전소", nameEn: "Battersea Power Station",
    city: "London", country: "UK", lat: 51.4817, lng: -0.1437,
    status: "toVisit", architect: "Giles Gilbert Scott", year: 1955,
    note: "아르데코 발전소를 복합공간으로 재생.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Battersea_Power_Station_from_the_river.jpg/960px-Battersea_Power_Station_from_the_river.jpg"
  },

  // ── Paris ──────────────────────────────────────────────
  {
    name: "에펠탑", nameEn: "Eiffel Tower",
    city: "Paris", country: "France", lat: 48.8584, lng: 2.2945,
    status: "toVisit", architect: "Gustave Eiffel", year: 1889,
    note: "만국박람회를 위해 세운 철골 탑.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/960px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg"
  },
  {
    name: "퐁피두 센터", nameEn: "Centre Pompidou",
    city: "Paris", country: "France", lat: 48.8607, lng: 2.3522,
    status: "toVisit", architect: "Renzo Piano & Richard Rogers", year: 1977,
    note: "구조와 설비를 외부에 드러낸 하이테크 미술관.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Centre_Pompidou_%40_Beaubourg_%40_Paris_%2815448205062%29.jpg/960px-Centre_Pompidou_%40_Beaubourg_%40_Paris_%2815448205062%29.jpg"
  },
  {
    name: "루브르 피라미드", nameEn: "Louvre Pyramid",
    city: "Paris", country: "France", lat: 48.8606, lng: 2.3360,
    status: "toVisit", architect: "I. M. Pei", year: 1989,
    note: "고전 궁전 안마당의 유리 피라미드.",
    photo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Louvre_Pyramid.jpg/960px-Louvre_Pyramid.jpg"
  },
  {
    name: "루이비통 재단 미술관", nameEn: "Fondation Louis Vuitton",
    city: "Paris", country: "France", lat: 48.8766, lng: 2.2633,
    status: "toVisit", architect: "Frank Gehry", year: 2014,
    note: "유리 돛으로 감싼 곡면 미술관.",
    photo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Fondation_Louis_Vuitton_-_Paris_%2850569906682%29.jpg/960px-Fondation_Louis_Vuitton_-_Paris_%2850569906682%29.jpg"
  },

  // ── Barcelona ──────────────────────────────────────────
  {
    name: "사그라다 파밀리아", nameEn: "Sagrada Família",
    city: "Barcelona", country: "Spain", lat: 41.4036, lng: 2.1744,
    status: "toVisit", architect: "Antoni Gaudí", year: 1882,
    note: "100년 넘게 짓고 있는 가우디의 미완성 대성당.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/SF_maig_2_cropped.jpg/960px-SF_maig_2_cropped.jpg"
  },
  {
    name: "카사 바트요", nameEn: "Casa Batlló",
    city: "Barcelona", country: "Spain", lat: 41.3917, lng: 2.1649,
    status: "toVisit", architect: "Antoni Gaudí", year: 1906,
    note: "뼈와 비늘을 닮은 모더니즘 주택.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Casa_Batllo_Overview_Barcelona_Spain_cut.jpg/960px-Casa_Batllo_Overview_Barcelona_Spain_cut.jpg"
  },
  {
    name: "바르셀로나 파빌리온", nameEn: "Barcelona Pavilion",
    city: "Barcelona", country: "Spain", lat: 41.3706, lng: 2.1500,
    status: "toVisit", architect: "Mies van der Rohe", year: 1929,
    note: "근대 건축 'Less is more'의 원형.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/The_Barcelona_Pavilion%2C_Barcelona%2C_2010.jpg/960px-The_Barcelona_Pavilion%2C_Barcelona%2C_2010.jpg"
  },

  // ── Bilbao ─────────────────────────────────────────────
  {
    name: "구겐하임 빌바오", nameEn: "Guggenheim Museum Bilbao",
    city: "Bilbao", country: "Spain", lat: 43.2687, lng: -2.9340,
    status: "toVisit", architect: "Frank Gehry", year: 1997,
    note: "티타늄 곡면으로 도시를 되살린 미술관.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Museo_Guggenheim%2C_Bilbao_%2831273245344%29.jpg/960px-Museo_Guggenheim%2C_Bilbao_%2831273245344%29.jpg"
  },

  // ── Berlin ─────────────────────────────────────────────
  {
    name: "라이히스타크 돔", nameEn: "Reichstag Dome",
    city: "Berlin", country: "Germany", lat: 52.5186, lng: 13.3762,
    status: "toVisit", architect: "Norman Foster", year: 1999,
    note: "의사당 위에 올린 투명 유리 돔.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Berlin_reichstag_west_panorama_2.jpg/960px-Berlin_reichstag_west_panorama_2.jpg"
  },
  {
    name: "베를린 필하모니", nameEn: "Berliner Philharmonie",
    city: "Berlin", country: "Germany", lat: 52.5096, lng: 13.3699,
    status: "toVisit", architect: "Hans Scharoun", year: 1963,
    note: "무대를 가운데 둔 포도밭형 콘서트홀.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Berlin_Philharmonie_asv2018-05_img2.jpg/960px-Berlin_Philharmonie_asv2018-05_img2.jpg"
  },
  {
    name: "유대인 박물관", nameEn: "Jewish Museum Berlin",
    city: "Berlin", country: "Germany", lat: 52.5024, lng: 13.3954,
    status: "toVisit", architect: "Daniel Libeskind", year: 2001,
    note: "지그재그 균열의 해체주의 건축.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Libeskind-Bau_%28J%C3%BCdisches_Museum_Berlin%29_Ecke.jpg/960px-Libeskind-Bau_%28J%C3%BCdisches_Museum_Berlin%29_Ecke.jpg"
  },

  // ── Rome ───────────────────────────────────────────────
  {
    name: "판테온", nameEn: "Pantheon",
    city: "Rome", country: "Italy", lat: 41.8986, lng: 12.4769,
    status: "toVisit", architect: "Hadrian (추정)", year: 126,
    note: "지름과 높이가 같은 고대 콘크리트 돔.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Pantheon_%28Rome%29_-_Right_side_and_front.jpg/960px-Pantheon_%28Rome%29_-_Right_side_and_front.jpg"
  },
  {
    name: "MAXXI 국립 21세기 미술관", nameEn: "MAXXI",
    city: "Rome", country: "Italy", lat: 41.9286, lng: 12.4669,
    status: "toVisit", architect: "Zaha Hadid", year: 2010,
    note: "흐르는 곡선의 유동적 전시 공간.",
    photo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/MAXXI_%2827483747665%29.jpg/960px-MAXXI_%2827483747665%29.jpg"
  },

  // ── Milan ──────────────────────────────────────────────
  {
    name: "보스코 베르티칼레", nameEn: "Bosco Verticale",
    city: "Milan", country: "Italy", lat: 45.4858, lng: 9.1905,
    status: "toVisit", architect: "Stefano Boeri", year: 2014,
    note: "나무를 심은 '수직 숲' 주거 타워.",
    photo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Bosco_Verticale_Milano.jpg/960px-Bosco_Verticale_Milano.jpg"
  },

  // ── Rotterdam ──────────────────────────────────────────
  {
    name: "마르크트할", nameEn: "Markthal",
    city: "Rotterdam", country: "Netherlands", lat: 51.9203, lng: 4.4876,
    status: "toVisit", architect: "MVRDV", year: 2014,
    note: "아치형 주거 안에 들어선 실내 시장.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Markthal-Rotterdam.jpg/960px-Markthal-Rotterdam.jpg"
  },
  {
    name: "큐브 하우스", nameEn: "Cube Houses",
    city: "Rotterdam", country: "Netherlands", lat: 51.9202, lng: 4.4905,
    status: "toVisit", architect: "Piet Blom", year: 1984,
    note: "45도로 기울인 정육면체 집합 주거.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/GraphyArchy_-_Wikipedia_00096.jpg/960px-GraphyArchy_-_Wikipedia_00096.jpg"
  },

  // ── Vienna ─────────────────────────────────────────────
  {
    name: "훈데르트바서하우스", nameEn: "Hundertwasserhaus",
    city: "Vienna", country: "Austria", lat: 48.2076, lng: 16.3940,
    status: "toVisit", architect: "Friedensreich Hundertwasser", year: 1985,
    note: "직선을 거부한 색채 가득한 공공주택.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Wien_-_Hundertwasserhaus_%2803%29.JPG/960px-Wien_-_Hundertwasserhaus_%2803%29.JPG"
  },

  // ── Porto ──────────────────────────────────────────────
  {
    name: "카사 다 무지카", nameEn: "Casa da Música",
    city: "Porto", country: "Portugal", lat: 41.1586, lng: -8.6308,
    status: "toVisit", architect: "Rem Koolhaas / OMA", year: 2005,
    note: "다면체 콘크리트 덩어리의 콘서트홀.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Casa_Da_Musica_%283190746009%29.jpg/960px-Casa_Da_Musica_%283190746009%29.jpg"
  },

  // ── Copenhagen ─────────────────────────────────────────
  {
    name: "8 하우스", nameEn: "8 House",
    city: "Copenhagen", country: "Denmark", lat: 55.6189, lng: 12.5760,
    status: "toVisit", architect: "BIG (Bjarke Ingels Group)", year: 2010,
    note: "8자 형태로 오르내리는 복합 주거.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/BIG_-_8_House.jpg/960px-BIG_-_8_House.jpg"
  },

  // ── Brussels ───────────────────────────────────────────
  {
    name: "아토미움", nameEn: "Atomium",
    city: "Brussels", country: "Belgium", lat: 50.8949, lng: 4.3415,
    status: "toVisit", architect: "André Waterkeyn", year: 1958,
    note: "철 결정 구조를 1650억 배 확대한 구조물.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Brussels_-_Atomium_2022.jpg/960px-Brussels_-_Atomium_2022.jpg"
  },

  // ═══ 추가 컬렉션: 건축가들이 보는 유럽 명작·기이건축 ═══

  // ── United Kingdom ─────────────────────────────────────
  {
    name: "내셔널 시어터", nameEn: "Royal National Theatre",
    city: "London", country: "UK", lat: 51.5071, lng: -0.1141,
    status: "toVisit", architect: "Denys Lasdun", year: 1976,
    note: "템스 강변의 대표적 브루탈리즘 극장.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/The_National_Theatre%2C_South_Bank%2C_London_-_geograph.org.uk_-_1861458.jpg/960px-The_National_Theatre%2C_South_Bank%2C_London_-_geograph.org.uk_-_1861458.jpg"
  },
  {
    name: "셀프리지스 버밍엄", nameEn: "Selfridges Building, Birmingham",
    city: "Birmingham", country: "UK", lat: 52.4779, lng: -1.8940,
    status: "toVisit", architect: "Future Systems", year: 2003,
    note: "1만 5천 개 알루미늄 디스크로 덮인 블롭 건축.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Selfridges_Building%2C_Birmingham_%282012%29.jpg/960px-Selfridges_Building%2C_Birmingham_%282012%29.jpg"
  },
  {
    name: "스코틀랜드 의회", nameEn: "Scottish Parliament Building",
    city: "Edinburgh", country: "UK", lat: 55.9522, lng: -3.1747,
    status: "toVisit", architect: "Enric Miralles (EMBT)", year: 2004,
    note: "유기적 형태가 풍경에 녹아드는 의사당.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Holyrood_Parliament_Edinburgh_%286096619764%29.jpg/960px-Holyrood_Parliament_Edinburgh_%286096619764%29.jpg"
  },
  {
    name: "에덴 프로젝트", nameEn: "Eden Project",
    city: "Cornwall", country: "UK", lat: 50.3619, lng: -4.7447,
    status: "toVisit", architect: "Grimshaw", year: 2001,
    note: "버블 돔(바이옴)으로 만든 거대 식물원.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Eden_project.JPG/960px-Eden_project.JPG"
  },

  // ── France ─────────────────────────────────────────────
  {
    name: "빌라 사보아", nameEn: "Villa Savoye",
    city: "Poissy", country: "France", lat: 48.9244, lng: 2.0283,
    status: "toVisit", architect: "Le Corbusier", year: 1931,
    note: "근대건축 5원칙을 구현한 흰 상자 주택.",
    photo: "https://upload.wikimedia.org/wikipedia/en/3/3c/VillaSavoye.jpg"
  },
  {
    name: "롱샹 성당", nameEn: "Notre-Dame du Haut",
    city: "Ronchamp", country: "France", lat: 47.7045, lng: 6.6206,
    status: "toVisit", architect: "Le Corbusier", year: 1955,
    note: "곡면 지붕과 두꺼운 벽의 조각 같은 예배당.",
    photo: "https://upload.wikimedia.org/wikipedia/en/5/59/RonchampCorbu.jpg"
  },
  {
    name: "위니테 다비타시옹", nameEn: "Unité d'habitation",
    city: "Marseille", country: "France", lat: 43.2613, lng: 5.3963,
    status: "toVisit", architect: "Le Corbusier", year: 1952,
    note: "필로티 위 거대 콘크리트 주거, 브루탈리즘의 출발.",
    photo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Unit%C3%A9_d%27habitation_Marseille%2C_France.jpg/960px-Unit%C3%A9_d%27habitation_Marseille%2C_France.jpg"
  },
  {
    name: "파리 필하모니", nameEn: "Philharmonie de Paris",
    city: "Paris", country: "France", lat: 48.8893, lng: 2.3936,
    status: "toVisit", architect: "Jean Nouvel", year: 2015,
    note: "새 모양 알루미늄 타일로 덮인 콘서트홀.",
    photo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Philharmonie_de_Paris.jpg/960px-Philharmonie_de_Paris.jpg"
  },
  {
    name: "아랍 세계 연구소", nameEn: "Institut du monde arabe",
    city: "Paris", country: "France", lat: 48.8490, lng: 2.3573,
    status: "toVisit", architect: "Jean Nouvel", year: 1987,
    note: "빛에 반응해 조리개처럼 열리는 금속 파사드.",
    photo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Paris_-_Institut_du_Monde_Arabe_%2827136624340%29.jpg/960px-Paris_-_Institut_du_Monde_Arabe_%2827136624340%29.jpg"
  },

  // ── Spain ──────────────────────────────────────────────
  {
    name: "카사 밀라 (라 페드레라)", nameEn: "Casa Milà",
    city: "Barcelona", country: "Spain", lat: 41.3953, lng: 2.1617,
    status: "toVisit", architect: "Antoni Gaudí", year: 1912,
    note: "물결치는 석조 외벽의 가우디 주택.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Casa_Mil%C3%A0%2C_general_view.jpg/960px-Casa_Mil%C3%A0%2C_general_view.jpg"
  },
  {
    name: "구엘 공원", nameEn: "Park Güell",
    city: "Barcelona", country: "Spain", lat: 41.4136, lng: 2.1528,
    status: "toVisit", architect: "Antoni Gaudí", year: 1914,
    note: "타일 모자이크 가득한 가우디의 정원 도시.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Parc_guell_-_panoramio.jpg/960px-Parc_guell_-_panoramio.jpg"
  },
  {
    name: "카사 비센스", nameEn: "Casa Vicens",
    city: "Barcelona", country: "Spain", lat: 41.4036, lng: 2.1516,
    status: "toVisit", architect: "Antoni Gaudí", year: 1885,
    note: "가우디의 첫 주택, 무어풍 타일 외관.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Gaud%C3%AD_-_Casa_Vicens.JPG/960px-Gaud%C3%AD_-_Casa_Vicens.JPG"
  },
  {
    name: "카탈라나 음악당", nameEn: "Palau de la Música Catalana",
    city: "Barcelona", country: "Spain", lat: 41.3875, lng: 2.1751,
    status: "toVisit", architect: "Domènech i Montaner", year: 1908,
    note: "스테인드글라스 천창의 모데르니스메 콘서트홀.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/22_11_01_Palau_DSCF2611_52502512616_cc1e7db845_k.jpg/960px-22_11_01_Palau_DSCF2611_52502512616_cc1e7db845_k.jpg"
  },
  {
    name: "예술과학도시", nameEn: "City of Arts and Sciences",
    city: "Valencia", country: "Spain", lat: 39.4542, lng: -0.3500,
    status: "toVisit", architect: "Santiago Calatrava", year: 1998,
    note: "흰 뼈대 같은 칼라트라바의 미래도시 복합단지.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Museo_Pr%C3%ADncipe_Felipe%2C_Ciudad_de_las_Artes_y_las_Ciencias%2C_Valencia%2C_Espa%C3%B1a%2C_2014-06-29%2C_DD_56.JPG/960px-Museo_Pr%C3%ADncipe_Felipe%2C_Ciudad_de_las_Artes_y_las_Ciencias%2C_Valencia%2C_Espa%C3%B1a%2C_2014-06-29%2C_DD_56.JPG"
  },
  {
    name: "메트로폴 파라솔", nameEn: "Metropol Parasol",
    city: "Seville", country: "Spain", lat: 37.3934, lng: -5.9905,
    status: "toVisit", architect: "Jürgen Mayer", year: 2011,
    note: "세계 최대 목조 구조물, 별명 '버섯(Setas)'.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Metropolparasolnov2011001.jpg/960px-Metropolparasolnov2011001.jpg"
  },

  // ── Netherlands ────────────────────────────────────────
  {
    name: "리트벨트 슈뢰더 하우스", nameEn: "Rietveld Schröder House",
    city: "Utrecht", country: "Netherlands", lat: 52.0853, lng: 5.1476,
    status: "toVisit", architect: "Gerrit Rietveld", year: 1924,
    note: "데 스테일을 입체로 구현한 주택.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Rietveld_Schr%C3%B6derhuis_HayKranen-20.JPG/960px-Rietveld_Schr%C3%B6derhuis_HayKranen-20.JPG"
  },
  {
    name: "판 넬러 공장", nameEn: "Van Nelle Factory",
    city: "Rotterdam", country: "Netherlands", lat: 51.9244, lng: 4.4326,
    status: "toVisit", architect: "Brinkman & Van der Vlugt", year: 1931,
    note: "유리와 철의 기능주의 공장, 유네스코 유산.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Rotterdam_van_nelle_fabriek.jpg/960px-Rotterdam_van_nelle_fabriek.jpg"
  },
  {
    name: "더 로테르담", nameEn: "De Rotterdam",
    city: "Rotterdam", country: "Netherlands", lat: 51.9055, lng: 4.4870,
    status: "toVisit", architect: "OMA (Rem Koolhaas)", year: 2013,
    note: "엇갈려 쌓은 '수직 도시' 복합 타워.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/De_Rotterdam%2C_September_2019_-_01.jpg/960px-De_Rotterdam%2C_September_2019_-_01.jpg"
  },

  // ── Germany ────────────────────────────────────────────
  {
    name: "아인슈타인 탑", nameEn: "Einstein Tower",
    city: "Potsdam", country: "Germany", lat: 52.3789, lng: 13.0644,
    status: "toVisit", architect: "Erich Mendelsohn", year: 1921,
    note: "흐르는 곡선의 표현주의 천문 관측탑.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Potsdam_Telegrafenberg_asv2023-09_img4.jpg/960px-Potsdam_Telegrafenberg_asv2023-09_img4.jpg"
  },
  {
    name: "엘프필하모니", nameEn: "Elbphilharmonie",
    city: "Hamburg", country: "Germany", lat: 53.5413, lng: 9.9841,
    status: "toVisit", architect: "Herzog & de Meuron", year: 2016,
    note: "옛 창고 위에 올린 파도 모양 유리 콘서트홀.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Elbphilharmonie_2025.jpg/960px-Elbphilharmonie_2025.jpg"
  },
  {
    name: "바우하우스 데사우", nameEn: "Bauhaus Dessau",
    city: "Dessau", country: "Germany", lat: 51.8385, lng: 12.2270,
    status: "toVisit", architect: "Walter Gropius", year: 1926,
    note: "모더니즘 디자인 학교의 상징적 교사(校舍).",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Dessau_Bauhaus-Geb%C3%A4ude_asv2024-06_img1.jpg/960px-Dessau_Bauhaus-Geb%C3%A4ude_asv2024-06_img1.jpg"
  },
  {
    name: "뮌헨 올림픽 스타디움", nameEn: "Olympiastadion (Munich)",
    city: "Munich", country: "Germany", lat: 48.1731, lng: 11.5466,
    status: "toVisit", architect: "Frei Otto & Behnisch", year: 1972,
    note: "거미줄 같은 장력 막구조 지붕.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/2022-08-21_Olympiapark_M%C3%BCnchen_by_Sandro_Halank%E2%80%93025.jpg/960px-2022-08-21_Olympiapark_M%C3%BCnchen_by_Sandro_Halank%E2%80%93025.jpg"
  },
  {
    name: "알리안츠 아레나", nameEn: "Allianz Arena",
    city: "Munich", country: "Germany", lat: 48.2188, lng: 11.6247,
    status: "toVisit", architect: "Herzog & de Meuron", year: 2005,
    note: "색이 바뀌는 공기막 쿠션 외피의 경기장.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Allianz_Arena_2008-02-09.jpg/960px-Allianz_Arena_2008-02-09.jpg"
  },
  {
    name: "비트라 디자인 미술관", nameEn: "Vitra Design Museum",
    city: "Weil am Rhein", country: "Germany", lat: 47.5996, lng: 7.6118,
    status: "toVisit", architect: "Frank Gehry", year: 1989,
    note: "게리의 첫 유럽작, 해체주의 흰 조형.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Vitra_Design_Museum.JPG/960px-Vitra_Design_Museum.JPG"
  },
  {
    name: "파에노 과학센터", nameEn: "Phaeno Science Center",
    city: "Wolfsburg", country: "Germany", lat: 52.4290, lng: 10.7896,
    status: "toVisit", architect: "Zaha Hadid", year: 2005,
    note: "콘크리트 콘(cone) 위에 떠 있는 듯한 덩어리.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Phaeno_Suedseite_RB.jpg/960px-Phaeno_Suedseite_RB.jpg"
  },

  // ── Italy ──────────────────────────────────────────────
  {
    name: "몰레 안토넬리아나", nameEn: "Mole Antonelliana",
    city: "Turin", country: "Italy", lat: 45.0689, lng: 7.6931,
    status: "toVisit", architect: "Alessandro Antonelli", year: 1889,
    note: "당대 세계 최고 높이의 벽돌 첨탑.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Mole_Antonelliana_%28Torino%29_09.jpg/960px-Mole_Antonelliana_%28Torino%29_09.jpg"
  },

  // ── Austria ────────────────────────────────────────────
  {
    name: "쿤스트하우스 그라츠", nameEn: "Kunsthaus Graz",
    city: "Graz", country: "Austria", lat: 47.0708, lng: 15.4348,
    status: "toVisit", architect: "Peter Cook & Colin Fournier", year: 2003,
    note: "별명 '친근한 외계인', 푸른 비정형 블롭.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Graz_Kunsthaus_vom_Schlossberg_20061126.jpg/960px-Graz_Kunsthaus_vom_Schlossberg_20061126.jpg"
  },
  {
    name: "쿤스트하우스 브레겐츠", nameEn: "Kunsthaus Bregenz",
    city: "Bregenz", country: "Austria", lat: 47.5048, lng: 9.7470,
    status: "toVisit", architect: "Peter Zumthor", year: 1997,
    note: "반투명 유리 비늘로 빛을 거르는 미술관.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Kornmarktstra%C3%9Fe_3_Kunsthaus%2C_1.JPG/960px-Kornmarktstra%C3%9Fe_3_Kunsthaus%2C_1.JPG"
  },

  // ── Switzerland ────────────────────────────────────────
  {
    name: "발스 테르메", nameEn: "Therme Vals",
    city: "Vals", country: "Switzerland", lat: 46.6186, lng: 9.1810,
    status: "toVisit", architect: "Peter Zumthor", year: 1996,
    note: "현지 편마암으로 쌓은 명상적 온천, 건축 순례지.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/2005-08-06-Therme-Vals-Peter-Zumthor_07.jpg/960px-2005-08-06-Therme-Vals-Peter-Zumthor_07.jpg"
  },
  {
    name: "괴테아눔", nameEn: "Goetheanum",
    city: "Dornach", country: "Switzerland", lat: 47.4855, lng: 7.6203,
    status: "toVisit", architect: "Rudolf Steiner", year: 1928,
    note: "조각처럼 빚은 표현주의 콘크리트 건축.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Goetheanum_Dornach2.jpg/960px-Goetheanum_Dornach2.jpg"
  },
  {
    name: "바이엘러 재단 미술관", nameEn: "Beyeler Foundation",
    city: "Basel", country: "Switzerland", lat: 47.5836, lng: 7.6586,
    status: "toVisit", architect: "Renzo Piano", year: 1997,
    note: "정원과 빛을 끌어들인 절제된 미술관.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Riehen_-_Fondation_Beyeler.jpg/960px-Riehen_-_Fondation_Beyeler.jpg"
  },

  // ── Finland ────────────────────────────────────────────
  {
    name: "템펠리아우키오 교회 (암석 교회)", nameEn: "Temppeliaukio Church",
    city: "Helsinki", country: "Finland", lat: 60.1732, lng: 24.9253,
    status: "toVisit", architect: "Timo & Tuomo Suomalainen", year: 1969,
    note: "화강암 암반을 파내 만든 빛의 교회.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Temppeliaukio_Church_Helsinki.jpg/960px-Temppeliaukio_Church_Helsinki.jpg"
  },
  {
    name: "핀란디아 홀", nameEn: "Finlandia Hall",
    city: "Helsinki", country: "Finland", lat: 60.1758, lng: 24.9336,
    status: "toVisit", architect: "Alvar Aalto", year: 1971,
    note: "흰 대리석으로 마감한 알토의 콘서트홀.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Finlandia_Hall-7141.jpg/960px-Finlandia_Hall-7141.jpg"
  },
  {
    name: "오디 도서관", nameEn: "Helsinki Central Library Oodi",
    city: "Helsinki", country: "Finland", lat: 60.1736, lng: 24.9383,
    status: "toVisit", architect: "ALA Architects", year: 2018,
    note: "목재 곡면과 유리로 열린 시민 도서관.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Oodi_Library_%28Helsinki%2C_Finland%29.jpg/960px-Oodi_Library_%28Helsinki%2C_Finland%29.jpg"
  },

  // ── Norway ─────────────────────────────────────────────
  {
    name: "오슬로 오페라하우스", nameEn: "Oslo Opera House",
    city: "Oslo", country: "Norway", lat: 59.9075, lng: 10.7531,
    status: "toVisit", architect: "Snøhetta", year: 2008,
    note: "빙산처럼 물에서 솟아 지붕을 걸어 오르는 오페라.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Oslo_opera_house_morning.jpg/960px-Oslo_opera_house_morning.jpg"
  },

  // ── Sweden ─────────────────────────────────────────────
  {
    name: "터닝 토르소", nameEn: "Turning Torso",
    city: "Malmö", country: "Sweden", lat: 55.6132, lng: 12.9763,
    status: "toVisit", architect: "Santiago Calatrava", year: 2005,
    note: "90도로 비틀린 인체 토르소 형상의 타워.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Turning_Torso2.jpg/960px-Turning_Torso2.jpg"
  },
  {
    name: "스톡홀름 시립도서관", nameEn: "Stockholm Public Library",
    city: "Stockholm", country: "Sweden", lat: 59.3439, lng: 18.0540,
    status: "toVisit", architect: "Gunnar Asplund", year: 1928,
    note: "원통형 열람실의 북유럽 고전주의 도서관.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/AsplundGunnarBibliotheque.jpg/960px-AsplundGunnarBibliotheque.jpg"
  },

  // ── Denmark ────────────────────────────────────────────
  {
    name: "그룬트비 교회", nameEn: "Grundtvig's Church",
    city: "Copenhagen", country: "Denmark", lat: 55.7047, lng: 12.5326,
    status: "toVisit", architect: "P. V. Jensen-Klint", year: 1940,
    note: "오르간 파이프 같은 표현주의 벽돌 교회.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Grundtvig%E2%80%99s_Church_02_%28level_and_colour_adjust%29.jpg/960px-Grundtvig%E2%80%99s_Church_02_%28level_and_colour_adjust%29.jpg"
  },
  {
    name: "마운틴 드웰링스", nameEn: "Mountain Dwellings",
    city: "Copenhagen", country: "Denmark", lat: 55.6315, lng: 12.5773,
    status: "toVisit", architect: "BIG + JDS", year: 2008,
    note: "주차장 위 계단식 테라스 산처럼 쌓은 주거.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/VM_Bjerget.JPG/960px-VM_Bjerget.JPG"
  },

  // ── Czechia ────────────────────────────────────────────
  {
    name: "댄싱 하우스", nameEn: "Dancing House",
    city: "Prague", country: "Czechia", lat: 50.0755, lng: 14.4143,
    status: "toVisit", architect: "Frank Gehry & Vlado Milunić", year: 1996,
    note: "춤추는 한 쌍처럼 휘어진 코너 건물.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Tanzendes_Haus_2023.jpg/960px-Tanzendes_Haus_2023.jpg"
  },
  {
    name: "빌라 투겐트하트", nameEn: "Villa Tugendhat",
    city: "Brno", country: "Czechia", lat: 49.2071, lng: 16.6156,
    status: "toVisit", architect: "Mies van der Rohe", year: 1930,
    note: "흐르는 평면과 통유리의 모더니즘 주택.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Vila_Tugendhat_exterior_Dvorak2.JPG/960px-Vila_Tugendhat_exterior_Dvorak2.JPG"
  },

  // ── Poland ─────────────────────────────────────────────
  {
    name: "백주년 기념관", nameEn: "Centennial Hall",
    city: "Wrocław", country: "Poland", lat: 51.1069, lng: 17.0772,
    status: "toVisit", architect: "Max Berg", year: 1913,
    note: "초기 철근콘크리트 대형 돔, 유네스코 유산.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Wroclaw_-_Hala_Stulecia_03.jpg/960px-Wroclaw_-_Hala_Stulecia_03.jpg"
  },

  // ── Greece ─────────────────────────────────────────────
  {
    name: "스타브로스 니아르호스 문화센터", nameEn: "Stavros Niarchos Foundation Cultural Center",
    city: "Athens", country: "Greece", lat: 37.9398, lng: 23.6925,
    status: "toVisit", architect: "Renzo Piano", year: 2016,
    note: "태양광 캐노피를 인 도서관·오페라 복합문화공간.",
    photo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Stavros_Niarchos_Foundation_Cultural_Center_-_52035330487.jpg/960px-Stavros_Niarchos_Foundation_Cultural_Center_-_52035330487.jpg"
  },

  // ═══ 런던 컬렉션 ═══
  {
    name: "리든홀 빌딩 (치즈그레이터)", nameEn: "Leadenhall Building",
    city: "London", country: "UK", lat: 51.5138, lng: -0.0822,
    status: "toVisit", architect: "Rogers Stirk Harbour", year: 2014,
    note: "비스듬한 쐐기형 외관, 별명 '치즈 강판'.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Cheesegrater_and_Gherkin.jpg/960px-Cheesegrater_and_Gherkin.jpg"
  },
  {
    name: "20 펜처치 스트리트 (워키토키)", nameEn: "20 Fenchurch Street",
    city: "London", country: "UK", lat: 51.5113, lng: -0.0837,
    status: "toVisit", architect: "Rafael Viñoly", year: 2014,
    note: "위가 불룩한 '워키토키', 옥상 스카이가든.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Walkie-Talkie_-_Sept_2015_%28cropped%29.jpg/960px-Walkie-Talkie_-_Sept_2015_%28cropped%29.jpg"
  },
  {
    name: "런던 시청 (구 시청)", nameEn: "City Hall London",
    city: "London", country: "UK", lat: 51.5045, lng: -0.0786,
    status: "toVisit", architect: "Norman Foster", year: 2002,
    note: "기울어진 달걀 모양의 유리 건물.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/London_-_City_Hall_%281%29.jpg/960px-London_-_City_Hall_%281%29.jpg"
  },
  {
    name: "더 O2 (밀레니엄 돔)", nameEn: "The O2",
    city: "London", country: "UK", lat: 51.5030, lng: 0.0032,
    status: "toVisit", architect: "Richard Rogers", year: 1999,
    note: "노란 마스트로 매단 거대한 돔.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/O2_Arena_%289499773307%29.jpg/960px-O2_Arena_%289499773307%29.jpg"
  },
  {
    name: "런던 아이", nameEn: "London Eye",
    city: "London", country: "UK", lat: 51.5033, lng: -0.1196,
    status: "toVisit", architect: "Marks Barfield", year: 2000,
    note: "템스 강변의 거대 관람차.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/London-Eye-2009.JPG/960px-London-Eye-2009.JPG"
  },
  {
    name: "타워 브리지", nameEn: "Tower Bridge",
    city: "London", country: "UK", lat: 51.5055, lng: -0.0754,
    status: "toVisit", architect: "Horace Jones & John Wolfe Barry", year: 1894,
    note: "빅토리아 고딕 양식의 도개교.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Tower_Bridge_at_Dawn.jpg/960px-Tower_Bridge_at_Dawn.jpg"
  },
  {
    name: "웨스트민스터 궁전 (국회의사당)", nameEn: "Palace of Westminster",
    city: "London", country: "UK", lat: 51.4995, lng: -0.1248,
    status: "toVisit", architect: "Charles Barry & A.W.N. Pugin", year: 1876,
    note: "빅벤이 있는 고딕 리바이벌 의사당.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Houses_of_Parliament_in_2022_%28cropped%29.jpg/960px-Houses_of_Parliament_in_2022_%28cropped%29.jpg"
  },
  {
    name: "웨스트민스터 사원", nameEn: "Westminster Abbey",
    city: "London", country: "UK", lat: 51.4994, lng: -0.1273,
    status: "toVisit", architect: "Henry Yevele 등", year: 1269,
    note: "영국 대관식이 열리는 고딕 대성당.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Westminster_Abbey%2C_Westminster.jpg/960px-Westminster_Abbey%2C_Westminster.jpg"
  },
  {
    name: "자연사 박물관", nameEn: "Natural History Museum, London",
    city: "London", country: "UK", lat: 51.4967, lng: -0.1764,
    status: "toVisit", architect: "Alfred Waterhouse", year: 1881,
    note: "테라코타로 빚은 로마네스크풍 '자연의 대성당'.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Natural_History_Museum_London_Jan_2006.jpg/960px-Natural_History_Museum_London_Jan_2006.jpg"
  },
  {
    name: "대영박물관", nameEn: "British Museum",
    city: "London", country: "UK", lat: 51.5194, lng: -0.1270,
    status: "toVisit", architect: "Robert Smirke (그레이트 코트: Foster)", year: 1852,
    note: "신고전 박물관, 포스터의 유리 지붕 안뜰.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/British_Museum_%28aerial%29.jpg/960px-British_Museum_%28aerial%29.jpg"
  },
  {
    name: "세인트 판크라스 역", nameEn: "St Pancras railway station",
    city: "London", country: "UK", lat: 51.5320, lng: -0.1263,
    status: "toVisit", architect: "George Gilbert Scott", year: 1868,
    note: "붉은 벽돌 고딕 리바이벌 역사.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/St_Pancras_Railway_Station_2012-06-23.jpg/960px-St_Pancras_Railway_Station_2012-06-23.jpg"
  },
  {
    name: "콜 드롭스 야드", nameEn: "Coal Drops Yard",
    city: "London", country: "UK", lat: 51.5358, lng: -0.1257,
    status: "toVisit", architect: "Heatherwick Studio", year: 2018,
    note: "빅토리아 석탄 창고를 변형한 '키스하는 지붕' 쇼핑가.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Coal_Drops_Yard_0606.jpg/960px-Coal_Drops_Yard_0606.jpg"
  },
  {
    name: "블룸버그 런던", nameEn: "Bloomberg London",
    city: "London", country: "UK", lat: 51.5128, lng: -0.0930,
    status: "toVisit", architect: "Norman Foster", year: 2017,
    note: "청동 핀으로 덮인 친환경 본사, 스털링상 수상.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Bloomberg_London_exterior_-_Cannon_Street%2C_Walbrook.jpg/960px-Bloomberg_London_exterior_-_Cannon_Street%2C_Walbrook.jpg"
  },
  {
    name: "로열 앨버트 홀", nameEn: "Royal Albert Hall",
    city: "London", country: "UK", lat: 51.5010, lng: -0.1774,
    status: "toVisit", architect: "Fowke & Scott", year: 1871,
    note: "붉은 벽돌 타원형 공연장.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Royal_Albert_Hall%2C_London_-_Nov_2012.jpg/960px-Royal_Albert_Hall%2C_London_-_Nov_2012.jpg"
  },
  {
    name: "원 캐나다 스퀘어", nameEn: "One Canada Square",
    city: "London", country: "UK", lat: 51.5049, lng: -0.0195,
    status: "toVisit", architect: "César Pelli", year: 1991,
    note: "피라미드 지붕의 카나리워프 마천루.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/London_MMB_S6_Canary_Wharf.jpg/960px-London_MMB_S6_Canary_Wharf.jpg"
  },
  {
    name: "트렐릭 타워", nameEn: "Trellick Tower",
    city: "London", country: "UK", lat: 51.5240, lng: -0.2055,
    status: "toVisit", architect: "Ernő Goldfinger", year: 1972,
    note: "분리된 설비 타워가 특징인 브루탈리즘 주거.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Trellick_Tower_front_view_%28colour_brightness_adjust%29.jpg/960px-Trellick_Tower_front_view_%28colour_brightness_adjust%29.jpg"
  },
  {
    name: "로열 페스티벌 홀", nameEn: "Royal Festival Hall",
    city: "London", country: "UK", lat: 51.5055, lng: -0.1163,
    status: "toVisit", architect: "LCC (Leslie Martin 등)", year: 1951,
    note: "'페스티벌 오브 브리튼'의 모더니즘 콘서트홀.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Royal_Festival_Hall%2C_Belvedere_Road_%281%29.jpg"
  },
  {
    name: "BT 타워", nameEn: "BT Tower",
    city: "London", country: "UK", lat: 51.5215, lng: -0.1389,
    status: "toVisit", architect: "Eric Bedford", year: 1964,
    note: "원통형 통신탑, 한때 런던 최고 높이.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/1350342_II_BT_COMMUNICATION_TOWER%2C_CLEVELAND_MEWS_Camden_London_20250612_0003.jpg/960px-1350342_II_BT_COMMUNICATION_TOWER%2C_CLEVELAND_MEWS_Camden_London_20250612_0003.jpg"
  },
  {
    name: "런던탑", nameEn: "Tower of London",
    city: "London", country: "UK", lat: 51.5081, lng: -0.0759,
    status: "toVisit", architect: "(노르만 왕조)", year: 1078,
    note: "화이트 타워가 중심인 중세 요새.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Tower_of_London_from_the_Shard_%288515883950%29.jpg/960px-Tower_of_London_from_the_Shard_%288515883950%29.jpg"
  },
  {
    name: "디자인 뮤지엄", nameEn: "Design Museum London",
    city: "London", country: "UK", lat: 51.4995, lng: -0.2003,
    status: "toVisit", architect: "John Pawson & OMA", year: 2016,
    note: "쌍곡포물면 지붕의 옛 커먼웰스 연구소를 개조.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Design_Museum_%282%29_%28geograph_5246509%29.jpg/960px-Design_Museum_%282%29_%28geograph_5246509%29.jpg"
  },
  {
    name: "빅토리아 앤드 앨버트 박물관 (V&A)", nameEn: "Victoria and Albert Museum",
    city: "London", country: "UK", lat: 51.4966, lng: -0.1722,
    status: "toVisit", architect: "Aston Webb 등", year: 1909,
    note: "세계 최대 규모의 장식미술·디자인 박물관.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Facade_of_the_Victoria_and_Albert_Museum%2C_London-14279991463.jpg/960px-Facade_of_the_Victoria_and_Albert_Museum%2C_London-14279991463.jpg"
  },
  {
    name: "킹스 크로스 역", nameEn: "King's Cross railway station",
    city: "London", country: "UK", lat: 51.5320, lng: -0.1233,
    status: "toVisit", architect: "John McAslan (서측 콘코스)", year: 2012,
    note: "부채꼴 다이아그리드 지붕의 거대 콘코스.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/King%27s_Cross_Western_Concourse.jpg/960px-King%27s_Cross_Western_Concourse.jpg"
  },
  {
    name: "미슐랭 하우스", nameEn: "Michelin House",
    city: "London", country: "UK", lat: 51.4920, lng: -0.1685,
    status: "toVisit", architect: "François Espinasse", year: 1911,
    note: "타이어 모티프의 아르누보·아르데코 건물.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Michelin_House%2C_London_-_2022-09-04_%281%29.jpg/960px-Michelin_House%2C_London_-_2022-09-04_%281%29.jpg"
  },
  {
    name: "이소콘 빌딩", nameEn: "Isokon building",
    city: "London", country: "UK", lat: 51.5470, lng: -0.1640,
    status: "toVisit", architect: "Wells Coates", year: 1934,
    note: "영국 초기 모더니즘의 콘크리트 아파트.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Isokon_Building_Hampstead_2005.jpg/960px-Isokon_Building_Hampstead_2005.jpg"
  },
  {
    name: "센터 포인트", nameEn: "Centre Point",
    city: "London", country: "UK", lat: 51.5163, lng: -0.1300,
    status: "toVisit", architect: "Richard Seifert", year: 1966,
    note: "콘크리트 격자 외피의 1960년대 타워.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Centre_Point%2C_New_Oxford_Street_%281%29_-_geograph.org.uk_-_2659023.jpg"
  }
];
