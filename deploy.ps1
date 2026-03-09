# ═══════════════════════════════════════════════════════════
# FSI DDS - Quick Deploy Script
# ═══════════════════════════════════════════════════════════

Write-Host "🚀 FSI DDS - Quick Deploy Script" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git chưa được cài đặt!" -ForegroundColor Red
    exit 1
}

# Check git status
Write-Host "📊 Checking git status..." -ForegroundColor Yellow
$status = git status --porcelain
if (-not $status) {
    Write-Host "✅ Không có thay đổi nào để commit" -ForegroundColor Green
    Write-Host ""
    $continue = Read-Host "Bạn có muốn push lại lên GitHub? (y/n)"
    if ($continue -ne "y") {
        Write-Host "❌ Hủy deploy" -ForegroundColor Red
        exit 0
    }
} else {
    Write-Host "📝 Có thay đổi cần commit:" -ForegroundColor Yellow
    git status --short
    Write-Host ""
}

# Get commit message
if ($status) {
    Write-Host "💬 Nhập commit message (hoặc Enter để dùng mặc định):" -ForegroundColor Yellow
    $commitMsg = Read-Host "Message"
    if (-not $commitMsg) {
        $commitMsg = "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    }
    
    # Add all changes
    Write-Host "📦 Adding all changes..." -ForegroundColor Yellow
    git add -A
    
    # Commit
    Write-Host "💾 Committing changes..." -ForegroundColor Yellow
    git commit -m $commitMsg
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Commit thất bại!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Commit thành công!" -ForegroundColor Green
    Write-Host ""
}

# Push to GitHub
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Push thất bại!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Deploy thành công!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 Frontend: Đã push lên GitHub" -ForegroundColor Cyan
Write-Host "📍 Backend: https://fsidds.onrender.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔗 Các bước tiếp theo:" -ForegroundColor Yellow
Write-Host "  1. Kiểm tra GitHub: https://github.com/Khaidz34/fsidds" -ForegroundColor White
Write-Host "  2. Deploy frontend lên Netlify/Vercel (nếu cần)" -ForegroundColor White
Write-Host "  3. Test ứng dụng: Mở frontend/index.html" -ForegroundColor White
Write-Host ""

# Ask to open browser
$openBrowser = Read-Host "Bạn có muốn mở ứng dụng trong browser? (y/n)"
if ($openBrowser -eq "y") {
    Write-Host "🌐 Opening browser..." -ForegroundColor Yellow
    Start-Process "frontend/index.html"
}

Write-Host ""
Write-Host "🎉 Hoàn tất!" -ForegroundColor Green
