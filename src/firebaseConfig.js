import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'; // 사용자 인증 모듈
import { getFirestore } from 'firebase/firestore'; // 데이터베이스 모듈
import { getStorage } from 'firebase/storage'; // 파일 저장 모듈

// Your web app's Firebase configuration (복사한 내용)
const firebaseConfig = {
  apiKey: "AIzaSyBbM1ibs74Stqt5XMg_TzhbWF8jmF2IZUw",
  authDomain: "my-app-server-97d1b.firebaseapp.com",
  projectId: "my-app-server-97d1b",
  storageBucket: "my-app-server-97d1b.firebasestorage.app",
  messagingSenderId: "355243896928",
  appId: "1:355243896928:web:445271951cc35601399305"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// 사용할 서비스 인스턴스 내보내기
export const auth = getAuth(app); 
export const db = getFirestore(app);
export const storage = getStorage(app); 

export default app;