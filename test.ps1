# ═══════════════════════════════════════════════════════════
# FSI DDS - Quick Test Script
# ═══════════════════════════════════════════════════════════

Write-Host "🧪 FSI DDS - Quick Test Script" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Menu
Write-Host "Chọn loại test:" -ForegroundColor Yellow
Write-Host "  1. Test Navigation (test-navigation.html)" -ForegroundColor White
Write-Host "  2. Test Frontend (frontend/index.html)" -ForegroundColor White
Write-Host "  3. Test Root (index.html)" -ForegroundColor White
Write-Host "  4. Test All (mở cả 3)" -ForegroundColor White
Write-Host "  5. Run Backend Local" -ForegroundColor White
Write-Host "  6. Check Backend Status" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Nhập lựa chọn (1-6)"

switch ($choice) {
    "1" {
        Write-Host "🌐 Opening test-navigation.html..." -ForegroundColor Yellow
        if (Test-Path "test-navigation.html") {
            Start-Process "test-navigation.html"
            Write-Host "✅ Đã mở test navigation!" -ForegroundColor Green
        } else {
            Write-Host "❌ File test-navigation.html không tồn tại!" -ForegroundColor Red
        }
    }
    "2" {
        Write-Host "🌐 Opening frontend/index.html..." -ForegroundColor Yellow
        if (Test-Path "frontend/index.html") {
            Start-Process "frontend/index.html"
            Write-Host "✅ Đã mở frontend!" -ForegroundColor Green
            Write-Host ""
            Write-Host "📝 Test accounts:" -ForegroundColor Cyan
            Write-Host "  Admin: admin / password" -ForegroundColor White
            Write-Host "  User:  nhanvien1 / 123456" -ForegroundColor White
        } else {
            Write-Host "❌ File frontend/index.html không tồn tại!" -ForegroundColor Red
        }
    }
    "3" {
        Write-Host "🌐 Opening index.html..." -ForegroundColor Yellow
        if (Test-Path "index.html") {
            Start-Process "index.html"
            Write-Host "✅ Đã mở root index!" -ForegroundColor Green
            Write-Host ""
            Write-Host "📝 Test accounts:" -ForegroundColor Cyan
            Write-Host "  Admin: admin / password" -ForegroundColor White
            Write-Host "  User:  nhanvien1 / 123456" -ForegroundColor White
        } else {
            Write-Host "❌ File index.html không tồn tại!" -ForegroundColor Red
        }
    }
    "4" {
        Write-Host "🌐 Opening all test files..." -ForegroundColor Yellow
        if (Test-Path "test-navigation.html") {
            Start-Process "test-navigation.html"
        }
        if (Test-Path "frontend/index.html") {
            Start-Process "frontend/index.html"
        }
        if (Test-Path "index.html") {
            Start-Process "index.html"
        }
        Write-Host "✅ Đã mở tất cả!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📝 Test accounts:" -ForegroundColor Cyan
        Write-Host "  Admin: admin / password" -ForegroundColor White
        Write-Host "  User:  nhanvien1 / 123456" -ForegroundColor White
    }
    "5" {
        Write-Host "🚀 Starting backend server..." -ForegroundColor Yellow
        if (Test-Path "backend/server.js") {
            Set-Location backend
            Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
            npm install
            Write-Host ""
            Write-Host "🔥 Starting server on port 3000..." -ForegroundColor Yellow
            Write-Host "⚠️  Press Ctrl+C to stop" -ForegroundColor Red
            Write-Host ""
            npm start
        } else {
            Write-Host "❌ File backend/server.js không tồn tại!" -ForegroundColor Red
        }
    }
    "6" {
        Write-Host "🔍 Checking backend status..." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📍 Production API: https://fsidds.onrender.com" -ForegroundColor Cyan
        Write-Host "📍 Local API: http://localhost:3000" -ForegroundColor Cyan
        Write-Host ""
        
        # Check production
        Write-Host "Testing production API..." -ForegroundColor Yellow
        try {
            $response = Invoke-WebRequest -Uri "https://fsidds.onrender.com" -Method GET -TimeoutSec 5
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ Production API is UP!" -ForegroundColor Green
                $content = $response.Content | ConvertFrom-Json
                Write-Host "   Status: $($content.status)" -ForegroundColor White
                Write-Host "   App: $($content.app)" -ForegroundColor White
            }
        } catch {
            Write-Host "❌ Production API is DOWN!" -ForegroundColor Red
        }
        
        Write-Host ""
        
        # Check local
        Write-Host "Testing local API..." -ForegroundColor Yellow
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 2
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ Local API is UP!" -ForegroundColor Green
                $content = $response.Content | ConvertFrom-Json
                Write-Host "   Status: $($content.status)" -ForegroundColor White
                Write-Host "   App: $($content.app)" -ForegroundColor White
            }
        } catch {
            Write-Host "⚠️  Local API is not running" -ForegroundColor Yellow
            Write-Host "   Run option 5 to start local backend" -ForegroundColor White
        }
    }
    default {
        Write-Host "❌ Lựa chọn không hợp lệ!" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🎉 Done!" -ForegroundColor Green
Write-Host ""
