import { initializeApp } from "firebase/app";
import { getDatabase, ref, runTransaction, onValue } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth"; 
// Bổ sung Firestore để chạy hệ thống kiểm tra Cập nhật (Force Update)
import { getFirestore } from "firebase/firestore";

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
const auth = getAuth(app); 

// 2. Khởi tạo 2 loại Database phân biệt
const rtdb = getDatabase(app); // Dành cho bộ đếm lượt sử dụng
export const db = getFirestore(app); // EXPORT Dành cho App.svelte kiểm tra config cập nhật

// 3. Tự động đăng nhập ẩn danh
signInAnonymously(auth).then(() => {
    console.log("Auto-login anonymous success");
}).catch((error) => {
    console.error("Auto-login failed", error);
});

// --- HÀM XỬ LÝ BỘ ĐẾM (Dùng rtdb) ---
export const incrementCounter = () => {
    if (!auth.currentUser) return; 

    const counterRef = ref(rtdb, 'app_tragop_counter');
    runTransaction(counterRef, (currentCount) => {
        return (currentCount || 0) + 1;
    }).catch(err => console.log("Inc fail:", err)); 
};

export const subscribeCounter = (callback) => {
    const counterRef = ref(rtdb, 'app_tragop_counter');
    
    return onValue(counterRef, (snapshot) => {
        const data = snapshot.val();
        callback(data || 0);
    }, (error) => {
        console.log("Read wait:", error.code);
    });
};