# ✅ Testing Checklist - FSI DDS

## 🔐 Authentication Tests

### Login
- [ ] Đăng nhập với tài khoản admin (`admin` / `password`)
- [ ] Đăng nhập với tài khoản user (`nhanvien1` / `123456`)
- [ ] Đăng nhập sai username → Hiện lỗi
- [ ] Đăng nhập sai password → Hiện lỗi
- [ ] Tick "Nhớ mật khẩu" → Reload page vẫn đăng nhập
- [ ] Đăng xuất → Quay về trang login

### Register
- [ ] Đăng ký tài khoản mới thành công
- [ ] Đăng ký với username đã tồn tại → Hiện lỗi
- [ ] Đăng ký với password < 6 ký tự → Hiện lỗi
- [ ] Đăng ký với password không khớp → Hiện lỗi

---

## 🌍 Multi-language Tests

- [ ] Chuyển sang tiếng Việt (VI) → Toàn bộ UI đổi sang tiếng Việt
- [ ] Chuyển sang English (EN) → Toàn bộ UI đổi sang tiếng Anh
- [ ] Chuyển sang 日本語 (JA) → Toàn bộ UI đổi sang tiếng Nhật
- [ ] Reload page → Ngôn ngữ được giữ nguyên

---

## 📱 Responsive Tests

### Desktop (>1024px)
- [ ] Sidebar hiển thị cố định bên trái
- [ ] Topbar hiển thị đầy đủ
- [ ] Cards hiển thị dạng grid
- [ ] Tables không bị overflow

### Tablet (768px - 1024px)
- [ ] Sidebar thu nhỏ
- [ ] Grid chuyển từ 4 cột → 2 cột
- [ ] Touch-friendly buttons

### Mobile (<768px)
- [ ] Sidebar ẩn, có nút hamburger (☰)
- [ ] Click hamburger → Sidebar slide in
- [ ] Click backdrop → Sidebar đóng
- [ ] Grid chuyển thành 1 cột
- [ ] Tables scroll ngang

---

## 👤 User Features

### 📊 Dashboard
- [ ] Hiển thị số đơn hôm nay
- [ ] Hiển thị số người đặt
- [ ] Hiển thị doanh thu tháng
- [ ] Hiển thị món phổ biến
- [ ] Hiển thị menu hôm nay
- [ ] Hiển thị top 6 món được yêu thích

### 🍽️ Đặt cơm hôm nay
- [ ] Hiển thị menu hôm nay với số thứ tự
- [ ] Click chọn món → Món được highlight
- [ ] Chọn đủ 2 món → Nút "Đặt cơm" active
- [ ] Chọn quá 2 món → Hiện cảnh báo
- [ ] Chọn người ăn (mặc định là mình)
- [ ] Nhập ghi chú (tùy chọn)
- [ ] Click "Đặt cơm" → Đặt thành công
- [ ] Toast notification hiện ra
- [ ] Form reset sau khi đặt

### 📋 Đơn của tôi
- [ ] Hiển thị danh sách đơn của tháng hiện tại
- [ ] Chọn tháng khác → Load đơn của tháng đó
- [ ] Hiển thị: Ngày, Món 1, Món 2, Ghi chú, Giá
- [ ] Không có đơn → Hiện empty state

### 💬 Góp ý
- [ ] Nhập tiêu đề (tùy chọn)
- [ ] Nhập nội dung (bắt buộc, min 6 ký tự)
- [ ] Click "Gửi góp ý" → Gửi thành công
- [ ] Hiển thị danh sách góp ý đã gửi
- [ ] Hiển thị trạng thái: 📝 Mới / 👀 Đã xem / ✅ Hoàn tất

---

## 👨‍💼 Admin Features

### 📝 Quản lý Menu
- [ ] Nhập danh sách món (mỗi món 1 dòng)
- [ ] Nhập link ảnh menu (tùy chọn)
- [ ] Xem trước menu với số thứ tự
- [ ] Click "Đăng menu" → Đăng thành công
- [ ] Menu mới ghi đè menu cũ trong ngày

### 📦 Tất cả đơn hôm nay
- [ ] Hiển thị tất cả đơn của ngày hiện tại
- [ ] Hiển thị: STT, Người ăn, Món 1, Món 2, Ghi chú, Giá
- [ ] Badge hiển thị số đơn
- [ ] Click "Xuất văn bản Zalo" → Modal hiện ra
- [ ] Format Zalo: `1. Name 2+5 (notes)`
- [ ] Click "Copy để gửi Zalo" → Copy thành công
- [ ] Click "Xuất CSV" → File CSV download
- [ ] Click nút 🗑️ → Xóa đơn (có confirm)

### 📈 Thống kê
- [ ] **Thống kê tuần:** Hiển thị 7 ngày gần nhất
- [ ] Hiển thị: Người dùng, Số suất
- [ ] **Thống kê tháng:** Chọn tháng
- [ ] Hiển thị: Người dùng, Số suất, Tổng tiền
- [ ] Sắp xếp theo số suất giảm dần

### 💰 Thanh toán
- [ ] Chọn tháng
- [ ] Hiển thị: Người dùng, Tổng suất, Tổng tiền, Đã TT, Còn lại, Ngày TT
- [ ] Click "Đã TT" → Confirm
- [ ] Xác nhận → Trạng thái chuyển "✓ Hoàn tất"
- [ ] Người đã thanh toán → Opacity giảm
- [ ] Click "Làm mới" → Reload data

### 🧾 Xuất hóa đơn
- [ ] Chọn tháng
- [ ] Click "Xuất PDF" → Xem trước thông tin
- [ ] PDF download thành công
- [ ] PDF chứa: Tổng quan, Chi tiết từng người
- [ ] Chi tiết: Họ tên, Số suất, Bảng (Ngày, Món 1, Món 2, Giá)

### 💬 Góp ý (Admin view)
- [ ] Hiển thị tất cả góp ý từ mọi người
- [ ] Hiển thị: Người gửi, Tiêu đề, Nội dung, Trạng thái
- [ ] Click góp ý → Có thể đổi trạng thái
- [ ] Đổi trạng thái: open → reviewed → closed

### 👥 Quản lý tài khoản
- [ ] Hiển thị danh sách users
- [ ] Hiển thị: ID, Username, Họ tên, Vai trò
- [ ] Click "Đổi role" → User ↔ Admin
- [ ] Không thể đổi role chính mình
- [ ] Click 🗑️ → Xóa user (có confirm)
- [ ] Không thể xóa chính mình

---

## 🎨 UI/UX Tests

### Design
- [ ] Màu sắc: Sakura pink, Matcha green, Lotus pink
- [ ] Font: Noto Sans, Noto Sans JP, Baloo 2
- [ ] Icons: Font Awesome hiển thị đúng
- [ ] Shadows và gradients mượt mà
- [ ] Border radius nhất quán

### Animations
- [ ] Hover effects trên buttons
- [ ] Hover effects trên cards
- [ ] Toast notifications slide in/out
- [ ] Modal slide up
- [ ] Page transitions mượt

### Accessibility
- [ ] Tab navigation hoạt động
- [ ] Focus states rõ ràng
- [ ] Contrast đủ cao
- [ ] Font size đọc được

---

## 🐛 Error Handling Tests

### Network Errors
- [ ] Mất kết nối internet → Hiện lỗi rõ ràng
- [ ] API timeout → Hiện lỗi
- [ ] 401 Unauthorized → Redirect về login
- [ ] 403 Forbidden → Hiện lỗi quyền truy cập
- [ ] 500 Server Error → Hiện lỗi server

### Validation Errors
- [ ] Form validation hoạt động
- [ ] Required fields được check
- [ ] Min/max length được check
- [ ] Email format được check (nếu có)

### Edge Cases
- [ ] Không có menu → Hiện empty state
- [ ] Không có đơn → Hiện empty state
- [ ] Không có dữ liệu thống kê → Hiện empty state
- [ ] Chọn tháng không có dữ liệu → Hiện empty state

---

## 🚀 Performance Tests

- [ ] Page load < 3 giây
- [ ] API calls < 1 giây
- [ ] Images load nhanh
- [ ] No console errors
- [ ] No console warnings
- [ ] Memory leaks check (DevTools)

---

## 🔒 Security Tests

- [ ] JWT token được lưu an toàn
- [ ] Token expired → Redirect về login
- [ ] Admin routes không truy cập được bởi user
- [ ] XSS protection
- [ ] CSRF protection
- [ ] SQL injection protection (backend)

---

## 📊 Test Results Summary

**Ngày test:** ___________  
**Người test:** ___________  
**Browser:** ___________  
**OS:** ___________  

**Tổng số test cases:** 100+  
**Passed:** _____ / _____  
**Failed:** _____ / _____  
**Blocked:** _____ / _____  

**Critical bugs:** _____  
**Major bugs:** _____  
**Minor bugs:** _____  

**Status:** ⬜ PASS / ⬜ FAIL  

---

## 📝 Notes

Ghi chú các vấn đề phát hiện:

1. 
2. 
3. 

---

## ✅ Sign-off

**Tester:** ___________  
**Date:** ___________  
**Signature:** ___________

