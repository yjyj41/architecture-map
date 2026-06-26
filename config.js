// ───────────────────────────────────────────────────────────────
// Firebase 설정 (선택 사항)
// ───────────────────────────────────────────────────────────────
// 비워두면 → 브라우저(localStorage)에 저장됩니다. (이 기기에서만 보임)
// 값을 채우면 → 클라우드(Firestore)에 저장되어 모든 기기/브라우저에서 공유됩니다.
//
// 설정 방법:
//   1. https://console.firebase.google.com 에서 프로젝트 생성(무료)
//   2. 좌측 'Build > Firestore Database' → 데이터베이스 만들기(테스트 모드로 시작)
//   3. 프로젝트 설정(⚙️) → '내 앱'에서 웹 앱(</>) 추가
//   4. 표시되는 firebaseConfig 값을 아래에 그대로 붙여넣기
//
// 예시:
// const FIREBASE_CONFIG = {
//   apiKey: "AIza...",
//   authDomain: "my-project.firebaseapp.com",
//   projectId: "my-project",
//   storageBucket: "my-project.appspot.com",
//   messagingSenderId: "1234567890",
//   appId: "1:1234567890:web:abcdef"
// };

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyABqnxj9gTGw6CAYdzgvY6hCIH1fVq_PDA",
  authDomain: "architecture-map-d5f98.firebaseapp.com",
  projectId: "architecture-map-d5f98",
  storageBucket: "architecture-map-d5f98.firebasestorage.app",
  messagingSenderId: "1091019965722",
  appId: "1:1091019965722:web:5a46ff74b6a26ef97658a3",
};

// MapTiler API 키 (지도 스타일용). 비워두면 기본 미니멀 타일로 표시됩니다.
const MAPTILER_KEY = "gwe3oJ224j05calWMtAr";
const MAP_STYLE = "aquarelle"; // 예: aquarelle, toner-v2, streets-v2, basic-v2
