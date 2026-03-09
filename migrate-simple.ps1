Copy-Item -Path "frontend/index.html" -Destination "index.html" -Force
Copy-Item -Path "frontend/styles.css" -Destination "styles.css" -Force
Copy-Item -Path "frontend/i18n.js" -Destination "i18n.js" -Force
Write-Host "Migration completed!"
