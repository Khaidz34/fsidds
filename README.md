# 🍱 FSI DDS - Hệ thống Đặt Cơm Nội Bộ

<div align="center">

![FSI DDS](https://img.shields.io/badge/FSI-DDS-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-2.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

**Hệ thống đặt cơm hiện đại với giao diện đẹp, responsive và đa ngôn ngữ**

[Demo](https://fsidds.onrender.com) • [Hướng dẫn](USER_GUIDE.md) • [Testing](TESTING.md)

</div>

---

## ✨ Tính năng nổi bật

### 🎨 Giao diện
- **Thiết kế Fusion Nhật-Việt:** Kết hợp văn hóa Sakura 🌸 và Lotus 🌺
- **Responsive 100%:** Hoạt động mượt trên Desktop, Tablet, Mobile
- **UI/UX hiện đại:** Animation mượt, card design đẹp, shadow gradient
- **Dark mode ready:** Chuẩn bị sẵn cho chế độ tối

### 🌍 Đa ngôn ngữ
- 🇻🇳 **Tiếng Việt** (Vietnamese)
- 🇬🇧 **English**
- 🇯🇵 **日本語** (Japanese)
- Chuyển đổi ngôn ngữ real-time
- Lưu preference tự động

### 👤 Chức năng User
- ✅ Xem menu hôm nay
- ✅ Đặt cơm (chọn 2 món)
- ✅ Xem lịch sử đơn hàng
- ✅ Gửi góp ý cải thiện
- ✅ Đặt cho người khác

### 👨‍💼 Chức năng Admin
- ✅ Đăng menu hôm nay
- ✅ Xem tất cả đơn
- ✅ Xuất Zalo text (format đẹp)
- ✅ Xuất CSV
- ✅ Thống kê tuần/tháng
- ✅ Quản lý thanh toán
- ✅ Xuất hóa đơn PDF
- ✅ Quản lý user
- ✅ Xem góp ý

---

## 🚀 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **Vanilla JavaScript** - No framework, pure JS
- **Font:** Noto Sans, Noto Sans JP, Baloo 2
- **Icons:** Font Awesome 6
- **PDF:** pdfMake

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Supabase** - PostgreSQL database
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Deployment
- **Frontend:** Netlify / Vercel / GitHub Pages
- **Backend:** Render
- **Database:** Supabase (PostgreSQL)

---

## 📦 Cài đặt

### Prerequisites
- Node.js >= 18.0.0
- npm hoặc yarn
- Supabase account

### 1. Clone repository
```bash
git clone https://github.com/Khaidz34/fsidds.git
cd fsidds
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Sửa file .env với thông tin Supabase
npm start
```

### 3. Setup Database
1. Vào Supabase Dashboard
2. SQL Editor
3. Chạy `backend/schema.sql`
4. (Optional) Chạy `backend/seed-test-users.sql`

### 4. Setup Frontend
```bash
# Mở frontend/index.html trong browser
# Hoặc dùng Live Server
```

---

## 🧪 Testing

### Tài khoản test
```
Admin:
  Username: admin
  Password: password

User:
  Username: nhanvien1
  Password: 123456
```

### Test scenarios
Xem chi tiết trong [TESTING.md](TESTING.md)

---

## 📖 Hướng dẫn sử dụng

Xem hướng dẫn đầy đủ trong [USER_GUIDE.md](USER_GUIDE.md)

### Quick start

**User:**
1. Đăng nhập
2. Vào "Đặt cơm hôm nay"
3. Chọn 2 món
4. Click "Đặt cơm"

**Admin:**
1. Đăng nhập với tài khoản admin
2. Vào "Quản lý Menu"
3. Nhập danh sách món
4. Click "Đăng menu"
5. Vào "Tất cả đơn" → Xuất Zalo text

---

## 🎨 Screenshots

### Desktop
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard)
![Order Page](https://via.placeholder.com/800x400?text=Order+Page)

### Mobile
![Mobile View](https://via.placeholder.com/400x800?text=Mobile+View)

---

## 📁 Cấu trúc thư mục

```
fsidds/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # CSS với thiết kế Nhật-Việt
│   └── i18n.js             # Đa ngôn ngữ
├── backend/
│   ├── server.js           # Express server
│   ├── schema.sql          # Database schema
│   ├── seed-test-users.sql # Test data
│   └── package.json
├── assets/
│   ├── logo.png
│   └── logo.svg
├── USER_GUIDE.md           # Hướng dẫn sử dụng
├── TESTING.md              # Hướng dẫn test
├── MIGRATION_TO_NEW_FRONTEND.md
└── README.md
```

---

## 🔧 Configuration

### Backend (.env)
```env
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5500
```

### Frontend (index.html)
```javascript
// Production
const API = 'https://fsidds.onrender.com';

// Local
// const API = 'http://localhost:3000';
```

---

## 🚀 Deployment

### Backend (Render)
1. Connect GitHub repo
2. Set environment variables
3. Deploy

### Frontend (Netlify)
1. Connect GitHub repo
2. Build command: (none)
3. Publish directory: `/`
4. Deploy

Chi tiết xem [DEPLOY_GITHUB_CHI_TIET.md](DEPLOY_GITHUB_CHI_TIET.md)

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repo
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 Changelog

### v2.0.0 (2024-01-XX)
- ✨ Redesign toàn bộ giao diện (Nhật-Việt fusion)
- ✨ Thêm đa ngôn ngữ (VI/EN/JA)
- ✨ Responsive 100%
- ✨ Thêm trang Menu Management
- ✨ Thêm trang Statistics
- ✨ Thêm trang Payment
- ✨ Thêm trang Invoice
- ✨ Thêm trang Feedback
- ✨ Thêm trang User Management
- 🐛 Fix lỗi hiển thị thứ tự món trong PDF
- 🎨 Cải thiện UI/UX
- ⚡ Tối ưu performance

### v1.0.0 (2024-01-XX)
- 🎉 Initial release
- ✅ Basic order system
- ✅ Admin dashboard
- ✅ Payment tracking

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Developer:** Kiro AI Assistant
- **Product Owner:** Khaidz34
- **Company:** FSI DDS

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/Khaidz34/fsidds/issues)
- **Email:** support@fsidds.com
- **Feedback:** Dùng tính năng "Góp ý" trong hệ thống

---

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- pdfMake for PDF generation
- Supabase for database
- Render for hosting

---

<div align="center">

**Made with ❤️ by FSI DDS Team**

⭐ Star us on GitHub — it helps!

[⬆ Back to top](#-fsi-dds---hệ-thống-đặt-cơm-nội-bộ)

</div>
