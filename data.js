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
  }
];
