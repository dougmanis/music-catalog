#!/bin/bash

# Exit on any error
set -e

echo "🔄 Exporting Swagger spec..."
npm run export:swagger

echo "📁 Copying swagger-output.json to GitHub Pages folder..."
cp ./docs/api/swagger-output.json ./docs/api/swagger-output.json

echo "✅ Done. The Swagger UI is now using the latest spec."

# Optional: git commit and push
echo "📦 Reminder: Commit and push to deploy to GitHub Pages:"
echo "   git add docs/api/swagger-output.json"
echo "   git commit -m 'Update Swagger spec'"
echo "   git push"
