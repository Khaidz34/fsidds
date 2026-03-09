# 🧪 Hướng dẫn Test FSI DDS

## 📋 Tài khoản test

### 👨‍💼 Admin
```
Username: admin
Password: password
```

### 👥 Nhân viên
```
Username: nhanvien1
Password: 123456
```

Hoặc đăng ký tài khoản mới qua giao diện.

---

## 🚀 Cách 1: Test với Backend Production (Đơn giản nhất)

### Bước 1: Cấu hình API URL
Mở file `frontend/index-new.html`, tìm dòng 838-846:

```javascript
// PRODUCTION: Uncomment dòng này
const API = 'https://fsidds.onrender.com';

// LOCAL: Comment dòng này
// const API = 'http://localhost:3000';
```

### Bước 2: Mở file HTML
```bash
cd frontend
# Mở index-new.html bằng browser hoặc Live Server
```

### Bước 3: Test
- Đăng nhập với tài khoản admin hoặc đăng ký mới
- Backend đã chạy trên Render, không cần làm gì thêm

---

## 🏠 Cách 2: Test với Backend Local (Đầy đủ)

### Bước 1: Chạy Backend Local

```bash
# Terminal 1: Chạy backend
cd backend
npm install
npm start
```

Backend sẽ chạy tại: `http://localhost:3000`

### Bước 2: Cấu hình API URL
Mở file `frontend/index-new.html`, tìm dòng 838-846:

```javascript
// PRODUCTION: Comment dòng này
// const API = 'https://fsidds.onrender.com';

// LOCAL: Uncomment dòng này
const API = 'http://localhost:3000';
```

### Bước 3: Chạy Frontend

**Option A: Dùng Live Server (VSCode)**
1. Cài extension "Live Server"
2. Right-click `frontend/index-new.html`
3. Chọn "Open with Live Server"

**Option B: Dùng Python**
```bash
cd frontend
python -m http.server 8000
# Mở http://localhost:8000/index-new.html
```

**Option C: Mở trực tiếp**
```bash
# Mở file bằng browser
open frontend/index-new.html  # Mac
start frontend/index-new.html # Windows
```

### Bước 4: Test
- Mở http://localhost:5500/index-new.html (hoặc port của Live Server)
- Đăng nhập với tài khoản test

---

## 🔧 Khắc phục lỗi "Failed to fetch"

### Lỗi 1: Backend chưa chạy
**Triệu chứng:** Console hiện "Failed to fetch"

**Giải pháp:**
```bash
cd backend
npm start
```

Kiểm tra backend đã chạy:
```bash
curl http://localhost:3000
# Hoặc mở browser: http://localhost:3000
# Phải thấy: {"status":"ok","app":"FSI DDS Backend",...}
```

### Lỗi 2: CORS Error
**Triệu chứng:** Console hiện "CORS policy blocked"

**Giải pháp:** Kiểm tra `backend/server.js` dòng 14-20:
```javascript
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:3001',
    'http://127.0.0.1:5500',
    'http://localhost:5500',  // Thêm dòng này nếu dùng Live Server
    'http://localhost:8000'   // Thêm dòng này nếu dùng Python server
  ],
  credentials: true
}));
```

### Lỗi 3: Database chưa setup
**Triệu chứng:** Backend chạy nhưng login lỗi

**Giải pháp:**
1. Vào Supabase Dashboard
2. SQL Editor
3. Chạy file `backend/schema.sql`
4. Chạy file `backend/seed-test-users.sql` (tùy chọn)

### Lỗi 4: Environment variables chưa set
**Triệu chứng:** Backend crash khi start

**Giải pháp:**
```bash
cd backend
cp .env.example .env
# Sửa file .env với thông tin Supabase của bạn
```

---

## 🧪 Test Scenarios

### Test 1: Đăng nhập Admin
1. Username: `admin`, Password: `password`
2. Kiểm tra menu Admin hiện đầy đủ
3. Vào "Quản lý Menu" → Đăng menu mới

### Test 2: Đặt cơm
1. Admin đăng menu hôm nay (ít nhất 2 món)
2. Đăng xuất, đăng nhập user: `nhanvien1` / `123456`
3. Vào "Đặt cơm hôm nay"
4. Chọn 2 món → Đặt cơm
5. Kiểm tra "Đơn của tôi"

### Test 3: Xuất Zalo
1. Đăng nhập Admin
2. Vào "Tất cả đơn hôm nay"
3. Click "Xuất văn bản Zalo"
4. Click "Copy để gửi Zalo"
5. Paste vào notepad để kiểm tra format

### Test 4: Đa ngôn ngữ
1. Đăng nhập bất kỳ
2. Click nút VI / EN / JA
3. Kiểm tra tất cả text đổi ngôn ngữ
4. Reload page → ngôn ngữ vẫn giữ nguyên

### Test 5: Responsive
1. Mở DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Test iPhone SE, iPad, Desktop
4. Kiểm tra sidebar ẩn/hiện

---

## 📱 Test trên điện thoại thật

### Cách 1: Dùng ngrok (Backend local)
```bash
# Terminal 1: Chạy backend
cd backend
npm start

# Terminal 2: Expose backend
ngrok http 3000
# Copy URL: https://xxxx.ngrok.io
```

Sửa `frontend/index-new.html`:
```javascript
const API = 'https://xxxx.ngrok.io';
```

Deploy frontend lên Netlify/Vercel hoặc dùng ngrok cho frontend.

### Cách 2: Dùng production backend
```javascript
const API = 'https://fsidds.onrender.com';
```

Deploy frontend lên Netlify/Vercel, mở trên điện thoại.

---

## 🐛 Debug Tips

### Xem Console Log
1. Mở DevTools (F12)
2. Tab Console
3. Xem lỗi chi tiết

### Xem Network Requests
1. DevTools → Tab Network
2. Reload page
3. Xem request nào failed
4. Click vào request → xem Response

### Test API trực tiếp
```bash
# Test health check
curl http://localhost:3000

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'
```

---

## ✅ Checklist trước khi test

- [ ] Backend đang chạy (local hoặc production)
- [ ] Database đã setup (chạy schema.sql)
- [ ] Có ít nhất 1 tài khoản test
- [ ] API URL đã cấu hình đúng trong frontend
- [ ] Browser console không có lỗi CORS
- [ ] Đã clear cache/cookies nếu có lỗi lạ

---

## 🚀 Deploy Production

Sau khi test xong local, deploy:

1. **Backend:** Đã deploy trên Render
2. **Frontend:** 
   - Đổi API URL về production
   - Deploy lên Netlify/Vercel/GitHub Pages
   - Cập nhật CORS trong backend

Chi tiết xem file `DEPLOY_GITHUB_CHI_TIET.md`
