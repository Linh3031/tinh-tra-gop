import { initializeApp } from "firebase/app";
import { getDatabase, ref, runTransaction, onValue } from "firebase/database";

// CẤU HÌNH TỪ DỰ ÁN CŨ CỦA BẠN (qlst-9e6bd)
const firebaseConfig = {
  apiKey: "AIzaSyAQ3TWcpa4AnTN-32igGseYDlXrCf1BVew",
  authDomain: "qlst-9e6bd.firebaseapp.com",
  projectId: "qlst-9e6bd",
  storageBucket: "qlst-9e6bd.firebasestorage.app",
  messagingSenderId: "2316705291",
  appId: "1:2316705291:web:8ed2109658bf5d1685b10e",
  measurementId: "G-0WD7K7ZXK6"
};

// 1. Khởi tạo
const app = initializeApp(firebaseConfig);

// 2. Khởi tạo Realtime Database (Nơi chứa bộ đếm)
const db = getDatabase(app);

// --- HÀM XỬ LÝ ---

// Tăng đếm
export const incrementCounter = () => {
    // Lưu riêng vào nhánh 'app_tragop_counter' để tránh nhầm lẫn với app khác (nếu có)
    const counterRef = ref(db, 'app_tragop_counter');
    runTransaction(counterRef, (currentCount) => {
        return (currentCount || 0) + 1;
    });
};

// Lắng nghe đếm
export const subscribeCounter = (callback) => {
    const counterRef = ref(db, 'app_tragop_counter');
    return onValue(counterRef, (snapshot) => {
        const data = snapshot.val();
        callback(data || 0);
    });
};