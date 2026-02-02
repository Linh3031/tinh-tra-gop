import { initializeApp } from "firebase/app";
import { getDatabase, ref, runTransaction, onValue } from "firebase/database";
// Thêm thư viện Auth để sửa lỗi bảo mật
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth"; 

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
const auth = getAuth(app); // Khởi tạo Auth
const db = getDatabase(app);

// 2. Tự động đăng nhập ẩn danh ngay khi app chạy
// Việc này giúp app có "thẻ bài" hợp lệ để vượt qua Rule "auth != null"
signInAnonymously(auth).then(() => {
    console.log("Auto-login anonymous success");
}).catch((error) => {
    console.error("Auto-login failed", error);
});

// --- HÀM XỬ LÝ ---

// Tăng đếm (Đã bọc xử lý an toàn)
export const incrementCounter = () => {
    // Chỉ chạy khi đã có user (để tránh lỗi permission denied)
    if (!auth.currentUser) return; 

    const counterRef = ref(db, 'app_tragop_counter');
    runTransaction(counterRef, (currentCount) => {
        return (currentCount || 0) + 1;
    }).catch(err => console.log("Inc fail:", err)); // Bỏ qua lỗi nếu mạng yếu
};

// Lắng nghe đếm
export const subscribeCounter = (callback) => {
    const counterRef = ref(db, 'app_tragop_counter');
    
    // onValue tự động thử lại khi kết nối/auth thành công
    return onValue(counterRef, (snapshot) => {
        const data = snapshot.val();
        callback(data || 0);
    }, (error) => {
        console.log("Read wait:", error.code);
    });
};
