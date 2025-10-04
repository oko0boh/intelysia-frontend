# 🔗 GitHub Repository Connection Commands

## After creating your GitHub repository, run these commands:

```bash
# 1. Add GitHub remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/intelysia-frontend.git

# 2. Push code to GitHub
git push -u origin main
```

## Example (replace with your actual GitHub username):
```bash
git remote add origin https://github.com/yourusername/intelysia-frontend.git
git push -u origin main
```

## ✅ After running these commands:
- Your code will be live on GitHub
- Ready for Vercel deployment
- Repository will show 94 files committed

## 🚀 Next: Vercel Deployment

1. Go to https://vercel.com
2. Sign up with GitHub account
3. Click "New Project"
4. Import your intelysia-frontend repository
5. Configure:
   - Framework: Vite
   - Build Command: npm run build
   - Output Directory: dist
6. Deploy!

**Your app will be live at**: `https://intelysia-frontend.vercel.app`