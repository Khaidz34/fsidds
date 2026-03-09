# 🛠️ Scripts - Hướng dẫn sử dụng

## 📋 Danh sách Scripts

### 1. `deploy.ps1` - Deploy nhanh
**Mục đích:** Commit và push code lên GitHub một cách nhanh chóng

**Cách dùng:**
```powershell
.\deploy.ps1
```

**Chức năng:**
- ✅ Check git status
- ✅ Add all changes
- ✅ Commit với message tùy chỉnh
- ✅ Push lên GitHub
- ✅ Hiển thị thông tin deploy
- ✅ Tùy chọn mở browser

**Ví dụ:**
```powershell
PS> .\deploy.ps1
🚀 FSI DDS - Quick Deploy Script
═══════════════════════════════════════════════════════════

📊 Checking git status...
📝 Có thay đổi cần commit:
 M frontend/index.html
 M frontend/styles.css

💬 Nhập commit message (hoặc Enter để dùng mặc định):
Message: Fix navigation bug

📦 Adding all changes...
💾 Committing changes...
✅ Commit thành công!

🚀 Pushing to GitHub...
✅ Deploy thành công!
```

---

### 2. `test.ps1` - Test nhanh
**Mục đích:** Test ứng dụng với nhiều tùy chọn

**Cách dùng:**
```powershell
.\test.ps1
```

**Menu:**
```
1. Test Navigation (test-navigation.html)
2. Test Frontend (frontend/index.html)
3. Test Root (index.html)
4. Test All (mở cả 3)
5. Run Backend Local
6. Check Backend Status
```

**Ví dụ:**
```powershell
PS> .\test.ps1
🧪 FSI DDS - Quick Test Script
═══════════════════════════════════════════════════════════

Chọn loại test:
  1. Test Navigation (test-navigation.html)
  2. Test Frontend (frontend/index.html)
  3. Test Root (index.html)
  4. Test All (mở cả 3)
  5. Run Backend Local
  6. Check Backend Status

Nhập lựa chọn (1-6): 2

🌐 Opening frontend/index.html...
✅ Đã mở frontend!

📝 Test accounts:
  Admin: admin / password
  User:  nhanvien1 / 123456
```

---

### 3. `migrate-simple.ps1` - Migration đơn giản
**Mục đích:** Copy files từ frontend/ sang root

**Cách dùng:**
```powershell
.\migrate-simple.ps1
```

**Chức năng:**
- ✅ Copy frontend/index.html → index.html
- ✅ Copy frontend/styles.css → styles.css
- ✅ Copy frontend/i18n.js → i18n.js
- ✅ Backup files cũ

---

### 4. `migrate.ps1` - Migration đầy đủ
**Mục đích:** Migration với nhiều tùy chọn

**Cách dùng:**
```powershell
.\migrate.ps1
```

**Chức năng:**
- ✅ Backup files cũ
- ✅ Copy files mới
- ✅ Update API URL
- ✅ Commit và push
- ✅ Verify migration

---

## 🚀 Quick Start

### Test ứng dụng
```powershell
# Mở frontend để test
.\test.ps1
# Chọn option 2

# Hoặc trực tiếp
Start-Process "frontend/index.html"
```

### Deploy lên GitHub
```powershell
# Deploy nhanh
.\deploy.ps1

# Hoặc thủ công
git add -A
git commit -m "Your message"
git push origin main
```

### Check backend status
```powershell
# Dùng script
.\test.ps1
# Chọn option 6

# Hoặc dùng curl
curl https://fsidds.onrender.com
```

---

## 📝 Test Accounts

### Admin
```
Username: admin
Password: password
```

### User
```
Username: nhanvien1
Password: 123456
```

---

## 🔗 URLs

### Production
- **Frontend:** Deploy lên Netlify/Vercel/GitHub Pages
- **Backend:** https://fsidds.onrender.com
- **Database:** Supabase PostgreSQL

### Local
- **Frontend:** `file:///path/to/frontend/index.html`
- **Backend:** http://localhost:3000
- **Database:** Supabase (remote)

---

## 🐛 Troubleshooting

### Script không chạy được
```powershell
# Enable script execution
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Git push bị reject
```powershell
# Pull trước khi push
git pull origin main
git push origin main
```

### Backend không kết nối được
```powershell
# Check backend status
.\test.ps1
# Chọn option 6

# Hoặc check trực tiếp
curl https://fsidds.onrender.com
```

### Frontend không load được
```powershell
# Check API URL trong file
Get-Content frontend/index.html | Select-String "const API"

# Nên thấy:
# const API = 'https://fsidds.onrender.com';
```

---

## 💡 Tips

### 1. Test trước khi deploy
```powershell
# Test local
.\test.ps1

# Nếu OK, deploy
.\deploy.ps1
```

### 2. Backup trước khi migrate
```powershell
# Script tự động backup
.\migrate-simple.ps1

# Hoặc manual backup
Copy-Item frontend/index.html frontend/index-backup.html
```

### 3. Check logs
```powershell
# Git log
git log --oneline -10

# Backend logs (nếu chạy local)
cd backend
npm start
```

### 4. Quick fixes
```powershell
# Reset changes
git reset --hard HEAD

# Discard changes
git checkout -- .

# Clean untracked files
git clean -fd
```

---

## 📚 Related Files

- `TESTING_CHECKLIST.md` - Checklist test đầy đủ
- `FIX_NAVIGATION.md` - Hướng dẫn fix lỗi navigation
- `USER_GUIDE.md` - Hướng dẫn sử dụng cho user
- `README.md` - Tổng quan dự án
- `TESTING.md` - Hướng dẫn test chi tiết

---

## 🎯 Workflow khuyến nghị

### Development
```powershell
1. Code changes
2. .\test.ps1 (option 2) - Test local
3. Fix bugs if any
4. .\deploy.ps1 - Deploy to GitHub
5. Test production
```

### Bug fixing
```powershell
1. Reproduce bug
2. Fix code
3. .\test.ps1 - Verify fix
4. .\deploy.ps1 - Deploy
5. Verify on production
```

### New feature
```powershell
1. Create feature branch (optional)
2. Implement feature
3. .\test.ps1 - Test thoroughly
4. Update documentation
5. .\deploy.ps1 - Deploy
6. Update CHANGELOG
```

---

**Last updated:** 2024-01-XX  
**Version:** 1.0.0  
**Maintainer:** Kiro AI Assistant
