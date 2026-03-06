# 🚀 Hướng dẫn Deploy FSI DDS qua GitHub (chi tiết từng bước)

Hướng dẫn này giúp bạn triển khai web **chỉ từ một repo GitHub**: đẩy code lên GitHub một lần, frontend chạy trên **GitHub Pages** (hoặc Netlify), backend chạy trên **Render**. Tất cả **miễn phí** và sau này chỉ cần **push code** là cả web tự cập nhật.

---

## 📌 Tổng quan: Bạn sẽ làm những gì?

| Bước | Việc làm | Dịch vụ | Chi phí |
|------|----------|---------|---------|
| 1 | Chuẩn bị cấu trúc repo (đưa frontend lên dễ deploy) | Máy tính của bạn | Miễn phí |
| 2 | Tạo repo trên GitHub và đẩy code lên | GitHub | Miễn phí |
| 3 | Tạo database, chạy file SQL | Supabase | Miễn phí |
| 4 | Kết nối repo với Render, cấu hình backend | Render | Miễn phí |
| 5 | Bật GitHub Pages (hoặc Netlify) cho frontend | GitHub Pages / Netlify | Miễn phí |
| 6 | Sửa URL API trong frontend, cập nhật CORS | Trong code + Render | Miễn phí |

**Kết quả:** Một địa chỉ web (ví dụ `https://tenban.github.io/fsidds/`) để nhân viên vào đặt cơm, backend chạy nền tại Render, database tại Supabase. **Toàn bộ dùng free tier.**

---

## Phần 1. Chuẩn bị cấu trúc repo (trên máy tính)

Để deploy **đơn giản** với GitHub Pages, trang web (file `index.html`) cần nằm ở **thư mục gốc** của repo. Bạn có hai cách:

### Cách A: Dùng GitHub Pages (một repo, không cần Netlify)

1. Mở thư mục dự án: `c:\Users\Admin\Pictures\fsidds_deploy\fsidds`
2. **Copy** file `frontend\index.html` và **dán** vào chính thư mục `fsidds` (cùng cấp với thư mục `frontend` và `backend`).  
   Nếu đã có file trùng tên, ghi đè hoặc đổi tên file cũ.
3. Sau bước này, thư mục `fsidds` của bạn có dạng:
   ```
   fsidds/
   ├── index.html      ← Trang web (bản copy từ frontend/index.html)
   ├── frontend/
   │   └── index.html  ← Có thể giữ hoặc xóa tùy bạn
   ├── backend/
   │   ├── server.js
   │   ├── schema.sql
   │   ├── package.json
   │   └── .env.example
   └── HUONG_DAN_DEPLOY.html
   ```
4. **Quan trọng:** Mọi lần sửa giao diện, bạn sửa file **`index.html` ở thư mục gốc** (và có thể đồng bộ sang `frontend/index.html` nếu bạn giữ cả hai).

### Cách B: Giữ nguyên thư mục `frontend/` và dùng Netlify

- Không cần copy `index.html` lên root.  
- Khi deploy, bạn sẽ kết nối GitHub với **Netlify** và chọn thư mục **`frontend`** làm thư mục publish.  
- Phần còn lại (GitHub repo, Render, Supabase) làm giống nhau.

Hướng dẫn dưới đây viết theo **Cách A** (GitHub Pages + root `index.html`). Nếu chọn Cách B, bạn bỏ qua bước copy file và dùng Netlify thay cho GitHub Pages ở Phần 5.

---

## Phần 2. Tạo repo trên GitHub và đẩy code lên

### 2.1. Cài Git (nếu chưa có)

- Tải Git: https://git-scm.com/download/win  
- Cài đặt mặc định, sau đó mở **PowerShell** hoặc **Command Prompt**.

### 2.2. Mở thư mục dự án trong terminal

```powershell
cd "c:\Users\Admin\Pictures\fsidds_deploy\fsidds"
```

### 2.3. Khởi tạo repo và commit lần đầu

Chạy lần lượt (copy từng khối):

```powershell
git init
```

```powershell
git add .
```

```powershell
git status
```

(Kiểm tra: có `index.html`, `backend/`, v.v. trong danh sách staged.)

```powershell
git commit -m "Initial commit: FSI DDS frontend + backend"
```

### 2.4. Tạo repo trên GitHub (trên trình duyệt)

1. Đăng nhập https://github.com (hoặc đăng ký tài khoản).
2. Góc phải trên → nút **“+”** → **“New repository”**.
3. Điền:
   - **Repository name:** `fsidds` (hoặc tên bạn thích, ví dụ `dat-com-cong-ty`).
   - **Description:** (tùy chọn) “Hệ thống đặt cơm nội bộ FSI DDS”.
   - Chọn **Public**.
   - **Không** tick “Add a README” (vì bạn đã có code sẵn).
4. Bấm **“Create repository”**.

### 2.5. Kết nối máy tính với GitHub và đẩy code

Trên trang repo vừa tạo, GitHub sẽ hiện hướng dẫn “push an existing repository”. Trong PowerShell (vẫn ở thư mục `fsidds`), chạy (thay `TENBAN` và `fsidds` bằng username và tên repo thật của bạn):

```powershell
git remote add origin https://github.com/TENBAN/fsidds.git
```

```powershell
git branch -M main
```

```powershell
git push -u origin main
```

(Nếu GitHub yêu cầu đăng nhập: dùng **Personal Access Token** thay mật khẩu, hoặc đăng nhập qua trình duyệt theo hướng dẫn.)

Sau bước này, toàn bộ code (gồm `index.html` ở root và thư mục `backend/`) đã nằm trên GitHub.

---

## Phần 3. Tạo database trên Supabase (miễn phí)

Backend cần một database. Supabase cung cấp PostgreSQL miễn phí.

### 3.1. Tạo project Supabase

1. Vào https://supabase.com → **Start your project**.
2. Đăng nhập bằng GitHub hoặc email.
3. **New project**:
   - **Organization:** chọn hoặc tạo mới.
   - **Name:** `fsidds` (hoặc tên bất kỳ).
   - **Database Password:** đặt mật khẩu mạnh và **lưu lại** (để đăng nhập DB nếu cần).
   - **Region:** chọn **Southeast Asia (Singapore)** cho gần Việt Nam.
4. Bấm **Create new project** và chờ vài phút.

### 3.2. Chạy file SQL tạo bảng

1. Trong project Supabase, menu trái → **SQL Editor**.
2. **New query**.
3. Mở file `backend/schema.sql` trên máy (Notepad hoặc VSCode), **copy toàn bộ** nội dung.
4. **Dán** vào ô soạn thảo trong SQL Editor.
5. Bấm **Run** (hoặc Ctrl+Enter).  
   Nếu chạy thành công, sẽ có thông báo kiểu “Success” và các bảng `users`, `menus`, `dishes`, `orders`, `payments` đã được tạo, kèm tài khoản admin mặc định.

### 3.3. Lấy URL và key cho backend

1. Menu trái Supabase → **Settings** (biểu tượng bánh răng) → **API**.
2. Trong **Project URL**: bấm **Copy** → dán vào Notepad, đặt nhãn “SUPABASE_URL”.
3. Trong **Project API keys**:
   - Tìm dòng **“service_role”** (không phải `anon`).
   - Bấm **Reveal** rồi **Copy** → dán vào Notepad, đặt nhãn “SUPABASE_SERVICE_KEY”.

**Lưu ý:** Giữ bí mật `service_role` key; chỉ dùng ở backend (Render), không đưa vào frontend.

---

## Phần 4. Deploy backend lên Render (miễn phí)

Backend Node.js không chạy trên GitHub được, nên dùng Render (free tier) và kết nối đúng repo GitHub.

### 4.1. Tạo Web Service trên Render

1. Vào https://render.com → đăng nhập (nên dùng **Sign in with GitHub**).
2. **New +** → **Web Service**.
3. **Connect a repository:** chọn repo **fsidds** (hoặc tên repo bạn đã tạo). Nếu chưa thấy, bấm **Configure account** để cấp quyền Render truy cập GitHub.
4. Sau khi chọn repo, Render hiện form cấu hình.

### 4.2. Cấu hình build và chạy

Điền chính xác:

| Ô | Giá trị |
|---|--------|
| **Name** | `fsidds-backend` (hoặc tên bạn muốn) |
| **Region** | Singapore (hoặc gần nhất) |
| **Root Directory** | `backend` ← **Quan trọng:** Render chỉ chạy thư mục backend |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | **Free** |

### 4.3. Thêm biến môi trường (Environment)

Kéo xuống **Environment Variables** → **Add Environment Variable**, thêm lần lượt:

| Key | Value |
|-----|--------|
| `SUPABASE_URL` | URL Supabase (đã copy ở 3.3) |
| `SUPABASE_SERVICE_KEY` | service_role key (đã copy ở 3.3) |
| `JWT_SECRET` | Một chuỗi bí mật dài 32 ký tự trở lên, ví dụ: `fsidds_bi_mat_2024_do_ban_tu_dat` |
| `FRONTEND_URL` | Tạm điền `https://tenban.github.io` (sẽ sửa chính xác sau khi có URL trang web ở Phần 5) |

**Lưu ý:** Nếu dùng Netlify cho frontend thì sau khi deploy Netlify xong, quay lại đổi `FRONTEND_URL` thành URL Netlify (vd: `https://fsidds.netlify.app`).

### 4.4. Tạo service và chờ deploy

1. Bấm **Create Web Service**.
2. Render sẽ chạy `npm install` trong thư mục `backend` rồi `node server.js`. Chờ đến khi trạng thái **Live** (màu xanh).
3. Ở đầu trang service có **URL** dạng: `https://fsidds-backend.onrender.com` (tên có thể khác). **Copy URL này** và lưu lại — đây là địa chỉ API backend.

### 4.5. Kiểm tra nhanh backend

Mở trình duyệt, truy cập: `https://URL-BACKEND-CUA-BAN/`  
Ví dụ: `https://fsidds-backend.onrender.com/`  
Nếu thấy JSON kiểu `{ "status": "ok", "app": "FSI DDS Backend", ... }` là backend đã chạy đúng.

---

## Phần 5. Deploy frontend (GitHub Pages hoặc Netlify)

### 5.1. Cách A: GitHub Pages (dùng luôn repo vừa push)

1. Vào repo trên GitHub: `https://github.com/TENBAN/fsidds`.
2. **Settings** (tab trên cùng) → menu trái **Pages** (trong mục “Code and automation”).
3. **Build and deployment**:
   - **Source:** Deploy from a branch.
   - **Branch:** `main` (hoặc branch bạn đang dùng).
   - **Folder:** `/ (root)`.
4. **Save**. Vài phút sau, GitHub hiện dòng chữ kiểu: “Your site is live at `https://tenban.github.io/fsidds/`”.
5. **Lưu URL này** (thay `tenban` và `fsidds` bằng username và tên repo của bạn). Đây là địa chỉ web để nhân viên vào đặt cơm.

**Lưu ý:** Nếu repo là private, GitHub Pages free chỉ cho public repo. Nếu bạn cần private repo thì dùng Netlify (Cách B) vẫn free.

### 5.2. Cách B: Netlify (giữ nguyên thư mục `frontend/`)

1. Vào https://app.netlify.com → đăng nhập bằng GitHub.
2. **Add new site** → **Import an existing project** → **Deploy with GitHub** → chọn repo **fsidds**.
3. **Branch to deploy:** `main`.
4. **Publish directory:** gõ `frontend` (vì trang web nằm trong thư mục `frontend`).
5. **Deploy site**. Netlify sẽ cho URL dạng `https://random-name.netlify.app`. Có thể đổi tên site trong **Site settings** → **Change site name** (vd: `fsidds` → `https://fsidds.netlify.app`).
6. **Lưu URL** này làm địa chỉ frontend.

---

## Phần 6. Sửa URL API trong frontend và cập nhật CORS

Frontend cần gọi đúng địa chỉ backend; backend cần cho phép domain frontend (CORS).

### 6.1. Sửa URL API trong file `index.html`

1. Mở file **`index.html`** (file ở thư mục gốc nếu bạn dùng GitHub Pages, hoặc `frontend/index.html` nếu dùng Netlify).
2. Tìm dòng (gần đầu khối `<script>`):

   ```javascript
   const API = 'https://fsidds-backend.onrender.com';
   ```

3. Đổi thành **đúng URL backend** của bạn (URL đã copy ở bước 4.4), ví dụ:

   ```javascript
   const API = 'https://fsidds-backend-xxxx.onrender.com';
   ```

4. Lưu file.

### 6.2. Cập nhật biến FRONTEND_URL trên Render

1. Vào https://dashboard.render.com → chọn service backend **fsidds-backend**.
2. **Environment** (menu trái).
3. Sửa biến **FRONTEND_URL**:
   - Nếu dùng **GitHub Pages:** `https://tenban.github.io` (không có dấu `/` cuối, và thay `tenban` bằng username GitHub của bạn).  
     Hoặc nếu trang nằm trong repo: `https://tenban.github.io/fsidds`.
   - Nếu dùng **Netlify:** `https://ten-ban-netlify.netlify.app` (đúng URL site Netlify của bạn).
4. **Save Changes**. Render sẽ tự redeploy; chờ trạng thái **Live** lại.

### 6.3. Đẩy code đã sửa lên GitHub (nếu bạn sửa file trên máy)

```powershell
cd "c:\Users\Admin\Pictures\fsidds_deploy\fsidds"
git add index.html
git commit -m "Cấu hình URL API backend"
git push
```

Sau khi push, GitHub Pages hoặc Netlify sẽ tự deploy lại; vài phút sau bạn mở lại URL frontend để kiểm tra.

---

## Phần 7. Kiểm tra và sử dụng

1. Mở **URL frontend** (GitHub Pages hoặc Netlify) trên trình duyệt.
2. Nếu trang load nhưng đăng nhập báo lỗi: kiểm tra lại **FRONTEND_URL** trên Render (phải trùng với domain bạn đang mở, không dấu `/` thừa) và đợi redeploy xong.
3. Đăng nhập tài khoản admin mặc định:
   - **Tên đăng nhập:** `admin`
   - **Mật khẩu:** `admin123`
4. Sau khi vào được: vào **Quản lý tài khoản** tạo thêm user, **Đăng menu** nhập món hôm nay, rồi chia sẻ **link frontend** cho nhân viên đặt cơm.

---

## Phần 8. Sau này: Cập nhật web chỉ bằng một lệnh

- **Sửa giao diện (frontend):** Sửa file `index.html` (ở root hoặc trong `frontend/` tùy cách bạn chọn) → `git add` → `git commit` → `git push`. GitHub Pages hoặc Netlify sẽ tự deploy.
- **Sửa backend:** Sửa file trong `backend/` → `git add` → `git commit` → `git push`. Render sẽ tự build và deploy lại.

Chỉ cần **một repo GitHub**; không cần deploy thủ công từng phần (trừ lần đầu cấu hình).

---

## Phần 9. Một số lỗi thường gặp

| Tri giác / Lỗi | Nguyên nhân có thể | Cách xử lý |
|----------------|--------------------|------------|
| Trang trắng hoặc 404 | GitHub Pages chưa bật hoặc chọn sai branch/folder | Vào Settings → Pages, chọn branch `main`, folder root; đợi vài phút. |
| Đăng nhập báo lỗi CORS / “Chưa đăng nhập” | Backend không nhận đúng domain frontend | Kiểm tra **FRONTEND_URL** trên Render trùng với URL bạn mở (vd: `https://tenban.github.io` hoặc URL Netlify), không thiếu `https://`, không thừa `/` cuối. |
| “Token không hợp lệ” | JWT_SECRET trên Render đổi hoặc sai | Đảm bảo JWT_SECRET trên Render giữ nguyên; user có thể đăng xuất và đăng nhập lại. |
| Lần đầu mở web chậm 30–50 giây | Render free tier để service “ngủ” sau ~15 phút không ai gọi | Bình thường; lần sau sẽ nhanh. Có thể dùng UptimeRobot ping URL backend mỗi 14 phút để hạn chế ngủ. |
| “Hôm nay chưa có menu” | Chưa đăng menu trong trang Admin | Đăng nhập admin → **Đăng menu** → nhập danh sách món (mỗi dòng một món) → **ĐĂNG MENU**. |

---

## Tóm tắt nhanh: Có miễn phí không?

- **GitHub:** repo và GitHub Pages (public repo) — **miễn phí**.
- **Supabase:** 500MB database, 2GB bandwidth — **miễn phí** (free tier).
- **Render:** 750 giờ/tháng, 512MB RAM — **miễn phí** (free tier).
- **Netlify** (nếu dùng thay GitHub Pages): 100GB bandwidth — **miễn phí**.

Toàn bộ hướng dẫn này dùng **free tier**; bạn không cần trả phí để chạy hệ thống đặt cơm nội bộ với quy mô vài chục đến vài trăm nhân viên.

Nếu bạn gửi thêm (ví dụ: bạn đang dùng Cách A hay B, URL frontend/backend), có thể viết tiếp phần xử lý lỗi cụ thể cho trường hợp của bạn.
