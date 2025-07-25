#!/bin/bash

# Exit on error
set -e

echo "🔄 Exporting Swagger spec..."
npm run export:swagger

echo "📁 Copying swagger-output.json to docs/api-redoc/"
mkdir -p ./docs/api-redoc
cp ./docs/api/swagger-output.json ./docs/api-redoc/swagger-output.json

echo "📝 Writing Redoc HTML page to docs/api-redoc/index.html"
cat > ./docs/api-redoc/index.html <<EOF
<!DOCTYPE html>
<html>
  <head>
    <title>Music Catalog API Reference – ReDoc</title>
    <meta charset="utf-8"/>
    <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"> </script>
  </head>
  <body>
    <redoc spec-url="swagger-output.json"></redoc>
  </body>
</html>
EOF

echo "✅ ReDoc page generated at: docs/api-redoc/index.html"

# Optional reminder to commit
echo "📦 Reminder: Commit and push to publish to GitHub Pages:"
echo "   git add docs/api-redoc"
echo "   git commit -m 'Publish ReDoc version of API docs'"
echo "   git push"
