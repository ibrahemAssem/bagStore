#!/bin/bash

echo "🔐 Git Setup for Personal GitHub Account"
echo "========================================="
echo ""
echo "This will configure THIS PROJECT to use your personal GitHub"
echo "Your company credentials will remain unchanged for other projects"
echo ""

# Check if already a git repo
if [ -d .git ]; then
  echo "⚠️  Git repository already exists"
  echo "Current configuration:"
  git config user.name
  git config user.email
  echo ""
  read -p "Do you want to reconfigure? (y/n): " RECONFIG
  if [ "$RECONFIG" != "y" ]; then
    exit 0
  fi
else
  echo "✅ No existing Git repository found"
fi

echo ""
echo "📝 Enter your PERSONAL GitHub details:"
echo ""

# Prompt for personal details
read -p "Your personal name: " PERSONAL_NAME
read -p "Your personal email: " PERSONAL_EMAIL
read -p "Your GitHub username: " GITHUB_USERNAME
read -p "Repository name (default: bagstore): " REPO_NAME
REPO_NAME=${REPO_NAME:-bagstore}

echo ""
echo "🔧 Configuring Git..."

# Initialize Git if needed
if [ ! -d .git ]; then
  git init
  echo "✅ Git initialized"
fi

# Set local config (only for this project)
git config user.name "$PERSONAL_NAME"
git config user.email "$PERSONAL_EMAIL"

echo "✅ Personal credentials set for THIS project only"
echo ""
echo "📊 Configuration:"
echo "   Name:  $PERSONAL_NAME"
echo "   Email: $PERSONAL_EMAIL"
echo ""

# Check if files are already committed
if git rev-parse HEAD >/dev/null 2>&1; then
  echo "✅ Repository already has commits"
else
  echo "📦 Creating initial commit..."
  git add .
  git commit -m "Initial commit: Elegant Bags E-commerce App"
  echo "✅ Initial commit created"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 NEXT STEPS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  Create a new repository on GitHub:"
echo "   → Open: https://github.com/new"
echo "   → Name: $REPO_NAME"
echo "   → Visibility: Private (recommended)"
echo "   → ⚠️  DON'T initialize with README"
echo "   → Click 'Create repository'"
echo ""
echo "2️⃣  After creating the repository, run:"
echo ""
echo "   Using HTTPS (easier):"
echo "   ─────────────────────"
echo "   git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "   Using SSH (more secure):"
echo "   ────────────────────────"
echo "   git remote add origin git@github.com:$GITHUB_USERNAME/$REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Your company credentials remain unchanged for other projects!"
echo ""

# Save commands to a file for easy copy-paste
cat > .git-push-commands.txt << EOF
# Commands to push to your personal GitHub

# Using HTTPS:
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git
git branch -M main
git push -u origin main

# Or using SSH:
git remote add origin git@github.com:$GITHUB_USERNAME/$REPO_NAME.git
git branch -M main
git push -u origin main
EOF

echo "📄 Commands saved to: .git-push-commands.txt"
echo ""
