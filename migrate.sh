#!/bin/bash
# Migration Script - Copy frontend files to root

echo "🚀 Starting migration..."

# Copy index.html
echo "📄 Copying index.html..."
cp frontend/index.html index.html

# Copy styles.css
echo "🎨 Copying styles.css..."
cp frontend/styles.css styles.css

# Copy i18n.js
echo "🌍 Copying i18n.js..."
cp frontend/i18n.js i18n.js

echo ""
echo "✅ Migration completed successfully!"
echo ""
echo "📋 Files copied:"
echo "  ✓ frontend/index.html → index.html"
echo "  ✓ frontend/styles.css → styles.css"
echo "  ✓ frontend/i18n.js → i18n.js"
echo ""
echo "🧪 Next steps:"
echo "  1. Open index.html in browser"
echo "  2. Login with admin/password"
echo "  3. Test all features"
echo "  4. git add . && git commit -m 'feat: New frontend' && git push"
echo ""
