import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// 환경 변수 검증 함수
const isConfigValid = () => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.appId
  );
};

// Firebase 앱 초기화 (환경 변수가 있을 때만)
let app;
let auth;
let db;
let storage;

// 빌드 타임에는 초기화하지 않음 (typeof window로 브라우저 환경 체크)
if (typeof window !== 'undefined' && isConfigValid()) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} else if (!isConfigValid() && typeof window !== 'undefined') {
  console.error('Firebase 환경 변수가 설정되지 않았습니다. Vercel 환경 변수를 확인하세요.');
}

// Firebase 서비스 인스턴스 export
export { auth, db, storage };
export default app;
