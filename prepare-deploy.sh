#!/bin/bash

echo "🚀 Deployment Preparation Checklist"
echo "===================================="
echo ""

# Check if git is initialized
if [ -d .git ]; then
  echo "✅ Git repository initialized"
else
  echo "❌ Git not initialized. Run: git init"
fi

# Check for .gitignore
if [ -f .gitignore ]; then
  echo "✅ .gitignore exists"
else
  echo "❌ .gitignore missing"
fi

# Check for environment files
if [ -f .env.production ]; then
  echo "✅ .env.production exists"
else
  echo "❌ .env.production missing"
fi

if [ -f server/.env ]; then
  echo "✅ server/.env exists"
else
  echo "❌ server/.env missing"
fi

# Test production build
echo ""
echo "📦 Testing production build..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Production build successful"
else
  echo "❌ Production build failed"
  exit 1
fi

# Check build output
if [ -d dist ]; then
  echo "✅ dist/ folder created"
  echo "   Size: $(du -sh dist | cut -f1)"
else
  echo "❌ dist/ folder not found"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Create MongoDB Atlas account and cluster"
echo "2. Push code to GitHub: git push origin main"
echo "3. Deploy backend to Render"
echo "4. Deploy frontend to Vercel"
echo "5. Update .env.production with backend URL"
echo ""
echo "📖 See deployment_guide.md for detailed instructions"
