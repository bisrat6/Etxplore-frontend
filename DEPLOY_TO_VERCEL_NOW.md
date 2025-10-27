# 🚀 Deploy Frontend to Vercel - Quick Guide

Your backend is live at: **https://web-production-ad768.up.railway.app**

---

## ✅ Step 1: Push Frontend Code to GitHub

```bash
cd etxplore_frontEnd

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial frontend commit"

# Connect to GitHub
git remote add origin https://github.com/YOUR_USERNAME/etxplore-frontend.git

# Push to GitHub
git push -u origin main
```

**Note:** Replace `YOUR_USERNAME` with your GitHub username. Create the repository first on GitHub if it doesn't exist.

---

## ✅ Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard (Easiest)

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with GitHub
3. **Click "Add New Project"**
4. **Select** your `etxplore-frontend` repository
5. **Click "Import"**

### Configuration:

- **Framework Preset**: Vite
- **Root Directory**: `etxplore_frontEnd` (since you're in a monorepo)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

---

## ✅ Step 3: Add Environment Variable

**CRITICAL:** Add this environment variable in Vercel:

1. In the deployment setup, click **"Environment Variables"**
2. Click **"+ Add Environment Variable"**
3. Add:

   **Variable Name:**
   ```
   VITE_API_BASE_URL
   ```

   **Variable Value:**
   ```
   https://web-production-ad768.up.railway.app/api/v1
   ```

4. Click **"Save"**

---

## ✅ Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Your site will be live at: `https://etxplore-frontend.vercel.app`

---

## ✅ Step 5: Update Backend CORS

After Vercel gives you the frontend URL:

1. Go to **Railway** dashboard
2. Click on your backend service
3. Go to **Variables** tab
4. Add or update:

   **Variable Name:** `FRONTEND_URL`
   
   **Variable Value:** `https://your-frontend.vercel.app`
   
   (Replace with your actual Vercel URL)

5. Railway will auto-redeploy

---

## ✅ Step 6: Test Everything

1. **Visit your Vercel URL**
2. **Test Login** - Should connect to backend
3. **Test Signup** - Should create user in database
4. **Test Tours Page** - Should load tours from backend
5. **Test Tour Details** - Should show tour information

---

## 🎉 You're Done!

Your app is now live:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://web-production-ad768.up.railway.app

---

## 🔧 Troubleshooting

### If API calls fail:
- Check `VITE_API_BASE_URL` is set correctly in Vercel
- Make sure backend CORS includes your Vercel URL
- Check browser console for errors

### If images don't load:
- Verify `VITE_ASSET_BASE_URL` is set to backend URL
- Check image paths in your code

### If login fails:
- Check backend is running
- Verify environment variables are set
- Check browser console for errors

---

**Need help?** Check the deployment logs in Vercel dashboard!

