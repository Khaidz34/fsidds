# 📖 Hướng dẫn sử dụng FSI DDS

## 🎯 Tổng quan

FSI DDS là hệ thống đặt cơm nội bộ với giao diện hiện đại, responsive và hỗ trợ 3 ngôn ngữ (Việt-Anh-Nhật).

---

## 🔐 Đăng nhập

### Tài khoản Admin
```
Username: admin
Password: password
```

### Tài khoản User
- Đăng ký tài khoản mới qua giao diện
- Hoặc dùng tài khoản test: `nhanvien1` / `123456`

---

## 👤 Chức năng User (Nhân viên)

### 1. 📊 Dashboard
- Xem tổng quan hệ thống
- Menu hôm nay
- Món được yêu thích
- Thống kê nhanh

### 2. 🍽️ Đặt cơm hôm nay
**Cách đặt:**
1. Xem menu hôm nay
2. Chọn đúng 2 món (click vào món để chọn)
3. Chọn người ăn (mặc định là bạn)
4. Thêm ghi chú nếu cần (VD: "Ít cơm", "Nhiều rau")
5. Click "Đặt cơm"

**Lưu ý:**
- Mỗi suất = 2 món = 40.000đ
- Phải chọn đủ 2 món mới đặt được
- Có thể đặt cho người khác

### 3. 📋 Đơn của tôi
- Xem lịch sử đặt cơm
- Lọc theo tháng
- Xem chi tiết món ăn và giá

### 4. 💬 Góp ý
**Gửi góp ý:**
1. Nhập tiêu đề (tùy chọn)
2. Nhập nội dung góp ý (tối thiểu 6 ký tự)
3. Click "Gửi góp ý"

**Xem góp ý của tôi:**
- Trạng thái: 📝 Mới / 👀 Đã xem / ✅ Hoàn tất
- Xem lịch sử tất cả góp ý đã gửi

---

## 👨‍💼 Chức năng Admin

### 1. 📝 Quản lý Menu

**Đăng menu hôm nay:**
1. Vào "Quản lý Menu"
2. Nhập danh sách món (mỗi món 1 dòng):
   ```
   Cơm gà xối mỡ
   Cơm sườn nướng
   Bún bò Huế
   Phở bò tái
   Cơm chiên dương châu
   Mì xào hải sản
   ```
3. Thêm link ảnh menu (tùy chọn)
4. Xem trước menu
5. Click "Đăng menu"

**Lưu ý:**
- Menu sẽ tự động có số thứ tự (1, 2, 3...)
- Đăng menu mới sẽ ghi đè menu cũ trong ngày
- Nên đăng menu trước 10h sáng

### 2. 📦 Tất cả đơn hôm nay

**Xem đơn:**
- Danh sách tất cả đơn đặt trong ngày
- Thông tin: Người ăn, Món 1, Món 2, Ghi chú, Giá

**Xuất dữ liệu:**

**A. Xuất văn bản Zalo:**
1. Click "Xuất văn bản Zalo"
2. Popup hiện ra với format:
   ```
   1.	Quang 2+5
   2.	Thuỷ 6+2 (ít cơm)
   3.	Quyền 1+5
   ```
3. Click "Copy để gửi Zalo"
4. Paste vào Zalo và gửi cho quán cơm

**B. Xuất CSV:**
1. Click "Xuất CSV"
2. File CSV tự động download
3. Mở bằng Excel để xem/in

**Xóa đơn:**
- Click nút 🗑️ để xóa đơn (cẩn thận!)

### 3. 📈 Thống kê

**Thống kê tuần:**
- Tự động hiển thị 7 ngày gần nhất
- Số suất đặt của từng người

**Thống kê tháng:**
1. Chọn tháng
2. Xem số suất và tổng tiền của từng người
3. Sắp xếp theo số suất giảm dần

### 4. 💰 Thanh toán

**Xem trạng thái thanh toán:**
1. Chọn tháng
2. Xem bảng:
   - Tổng suất: Tổng số suất đã đặt
   - Tổng tiền: Tổng số tiền phải trả
   - Đã thanh toán: Số suất/tiền đã thanh toán
   - Còn lại: Số suất/tiền chưa thanh toán
   - Ngày TT: Ngày xác nhận thanh toán

**Xác nhận thanh toán:**
1. Khi nhân viên đã chuyển tiền
2. Click "Đã TT" ở dòng của người đó
3. Xác nhận
4. Trạng thái chuyển sang "✓ Hoàn tất"

**Lưu ý:**
- Hệ thống lưu audit log (lịch sử thanh toán)
- Không thể hoàn tác sau khi xác nhận
- Snapshot tại thời điểm xác nhận

### 5. 🧾 Xuất hóa đơn PDF

**Xuất hóa đơn tháng:**
1. Chọn tháng
2. Click "Xuất PDF"
3. Xem trước thông tin
4. File PDF tự động download

**Nội dung PDF:**
- Tổng quan: Số người, tổng tiền
- Chi tiết từng người:
  - Họ tên
  - Số suất × 40.000đ
  - Bảng chi tiết: Ngày, Món 1, Món 2, Giá

**Sử dụng:**
- Gửi cho kế toán
- Lưu trữ hồ sơ
- In ra giấy nếu cần

### 6. 💬 Góp ý (Admin view)

**Xem tất cả góp ý:**
- Góp ý từ tất cả nhân viên
- Thông tin: Người gửi, Tiêu đề, Nội dung, Trạng thái

**Cập nhật trạng thái:**
1. Click vào góp ý
2. Đổi trạng thái:
   - 📝 Mới (open)
   - 👀 Đã xem (reviewed)
   - ✅ Hoàn tất (closed)

### 7. 👥 Quản lý tài khoản

**Xem danh sách user:**
- ID, Username, Họ tên, Vai trò

**Đổi role:**
1. Click "Đổi role"
2. User ↔ Admin
3. Xác nhận

**Xóa user:**
1. Click nút 🗑️
2. Xác nhận (không thể hoàn tác!)

**Lưu ý:**
- Không thể đổi role hoặc xóa chính mình
- Xóa user sẽ xóa tất cả đơn hàng của user đó

---

## 🌍 Đa ngôn ngữ

**Chuyển đổi ngôn ngữ:**
1. Click nút VI / EN / JA ở góc trên
2. Toàn bộ giao diện đổi ngôn ngữ
3. Ngôn ngữ được lưu tự động

**Ngôn ngữ hỗ trợ:**
- 🇻🇳 Tiếng Việt (Vietnamese)
- 🇬🇧 English
- 🇯🇵 日本語 (Japanese)

---

## 📱 Sử dụng trên Mobile

**Responsive 100%:**
- Tự động điều chỉnh giao diện
- Sidebar ẩn, có nút hamburger (☰)
- Touch-friendly buttons
- Swipe gestures

**Cách dùng:**
1. Mở browser trên điện thoại
2. Truy cập URL website
3. Đăng nhập
4. Click nút ☰ để mở menu
5. Sử dụng bình thường

---

## 💡 Tips & Tricks

### Cho User:
1. **Đặt cơm nhanh:** Bookmark trang "Đặt cơm hôm nay"
2. **Nhớ mật khẩu:** Tick "Nhớ mật khẩu" khi đăng nhập
3. **Ghi chú rõ ràng:** VD: "Ít cơm", "Nhiều rau", "Không hành"
4. **Kiểm tra đơn:** Vào "Đơn của tôi" để xác nhận

### Cho Admin:
1. **Đăng menu sớm:** Trước 10h để nhân viên đặt kịp
2. **Backup dữ liệu:** Xuất CSV/PDF định kỳ
3. **Kiểm tra thanh toán:** Cuối tháng check kỹ
4. **Xử lý góp ý:** Đọc và phản hồi góp ý thường xuyên

---

## 🐛 Xử lý lỗi thường gặp

### Lỗi 1: Không đăng nhập được
**Nguyên nhân:** Sai username/password
**Giải pháp:** 
- Kiểm tra lại thông tin
- Liên hệ admin để reset password

### Lỗi 2: Không thấy menu
**Nguyên nhân:** Admin chưa đăng menu hôm nay
**Giải pháp:** Chờ admin đăng menu

### Lỗi 3: Không đặt được cơm
**Nguyên nhân:** 
- Chưa chọn đủ 2 món
- Chưa chọn người ăn
**Giải pháp:** Kiểm tra lại form đặt cơm

### Lỗi 4: PDF không xuất được
**Nguyên nhân:** Browser chặn popup
**Giải pháp:** 
- Cho phép popup từ website
- Hoặc dùng nút "In" của browser

### Lỗi 5: Giao diện lỗi trên mobile
**Nguyên nhân:** Cache cũ
**Giải pháp:** 
- Clear cache browser
- Hard refresh (Ctrl+Shift+R)

---

## 📞 Hỗ trợ

**Liên hệ Admin:**
- Qua tính năng "Góp ý" trong hệ thống
- Hoặc liên hệ trực tiếp admin công ty

**Báo lỗi:**
1. Vào "Góp ý"
2. Mô tả chi tiết lỗi
3. Kèm screenshot nếu có
4. Admin sẽ xử lý sớm nhất

---

## 🎨 Tính năng nổi bật

✨ **Thiết kế đẹp:** Fusion Nhật-Việt với Sakura 🌸 và Lotus 🌺
📱 **Responsive:** Hoạt động mượt trên mọi thiết bị
🌍 **Đa ngôn ngữ:** 3 ngôn ngữ (VI/EN/JA)
⚡ **Nhanh:** Load trang nhanh, UX mượt mà
🔒 **Bảo mật:** JWT authentication, role-based access
📊 **Thống kê:** Báo cáo chi tiết, xuất PDF/CSV
💰 **Thanh toán:** Quản lý rõ ràng, audit log
💬 **Góp ý:** Kênh phản hồi trực tiếp

---

## 🚀 Workflow khuyến nghị

### Quy trình hàng ngày:

**8:00 - Admin:**
- Đăng menu hôm nay

**9:00-11:00 - User:**
- Vào hệ thống
- Xem menu
- Đặt cơm

**11:30 - Admin:**
- Vào "Tất cả đơn"
- Xuất văn bản Zalo
- Gửi cho quán cơm

**12:00 - Nhận cơm:**
- Quán giao cơm theo danh sách

### Quy trình cuối tháng:

**Ngày 25-30:**
- Admin: Xuất hóa đơn PDF
- Gửi cho nhân viên
- Nhân viên chuyển tiền

**Ngày 1-5 tháng sau:**
- Admin: Xác nhận thanh toán
- Cập nhật trạng thái trong hệ thống

---

🎉 **Chúc bạn sử dụng FSI DDS hiệu quả!**
