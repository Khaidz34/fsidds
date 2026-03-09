# Migration Script - Copy frontend files to root
Write-Host "🚀 Starting migration..." -ForegroundColor Green

# Copy index.html
Write-Host "📄 Copying index.html..." -ForegroundColor Yellow
Copy-Item -Path "frontend/index.html" -Destination "index.html" -Force

# Copy styles.css
Write-Host "🎨 Copying styles.css..." -ForegroundColor Yellow
Copy-Item -Path "frontend/styles.css" -Destination "styles.css" -Force

# Copy i18n.js
Write-Host "🌍 Copying i18n.js..." -ForegroundColor Yellow
Copy-Item -Path "frontend/i18n.js" -Destination "i18n.js" -Force

Write-Host ""
Write-Host "✅ Migration completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Files copied:" -ForegroundColor Cyan
Write-Host "  ✓ frontend/index.html → index.html"
Write-Host "  ✓ frontend/styles.css → styles.css"
Write-Host "  ✓ frontend/i18n.js → i18n.js"
Write-Host ""
Write-Host "🧪 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Open index.html in browser"
Write-Host "  2. Login with admin/password"
Write-Host "  3. Test all features"
Write-Host "  4. Commit and push changes"
Write-Host ""
