# Deploying Etxplore Frontend to Vercel

This guide will walk you through deploying your Etxplore frontend to Vercel.

## 📋 Prerequisites

- GitHub account (or GitLab/Bitbucket)
- Vercel account (free at https://vercel.com)
- Your backend API deployed (Heroku, Railway, etc.)

## 🚀 Deployment Steps

### Step 1: Push Code to GitHub

1. **Initialize Git** (if not already done):
```bash
cd etxplore_frontEnd
git init
git add .
git commit -m "Initial commit"
```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository named `etxplore-frontend`
   - Don't initialize with README

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/etxplore-frontend.git
git branch -M main
git push -u origin main
```

---

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Easiest)

1. **Go to Vercel**:
   - Visit https://vercel.com
   - Sign in with GitHub

2. **Import Project**:
   - Click "Add New Project"
   - Select your `etxplore-frontend` repository
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: Leave as `.` (or `etxplore_frontEnd` if deploying from monorepo)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Environment Variables**:
   Add these variables:
   
   ```
   VITE_API_BASE_URL=https://your-backend.herokuapp.com/api/v1
   ```
   
   Replace `your-backend.herokuapp.com` with your actual backend URL.
   
   Optional (for contact form):
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://etxplore-frontend.vercel.app`

---

#### Option B: Via Vercel CLI

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
cd etxplore_frontEnd
vercel
```

4. **Follow Prompts**:
   - Link to existing project or create new
   - Set up environment variables when prompted

5. **Production Deploy**:
```bash
vercel --prod
```

---

### Step 3: Configure Environment Variables

After deployment, update environment variables:

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. Add these variables:

#### Required:
```
VITE_API_BASE_URL = https://your-backend-url/api/v1
```

#### Optional (for contact form):
```
VITE_EMAILJS_SERVICE_ID = your_service_id
VITE_EMAILJS_TEMPLATE_ID = your_template_id
VITE_EMAILJS_PUBLIC_KEY = your_public_key
```

**Important**: After adding environment variables, **Redeploy** your application for changes to take effect.

---

### Step 4: Update Backend CORS

Make sure your backend allows requests from your Vercel domain:

In your backend `config.env`:
```env
FRONTEND_URL=https://your-frontend.vercel.app
```

Or if deploying from monorepo:
```env
FRONTEND_URL=https://your-frontend.vercel.app,http://localhost:8080
```

---

## 🔧 Configuration Details

### Build Settings

If deploying from monorepo (backend + frontend in same repo):

1. Set **Root Directory**: `etxplore_frontEnd`
2. Keep other settings default

If deploying only frontend:

1. **Root Directory**: `.` (leave empty)
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Install Command**: `npm install`

### Environment Variables Explanation

- **VITE_API_BASE_URL**: Your backend API URL
  - Development: `http://localhost:3000/api/v1`
  - Production: `https://your-backend.herokuapp.com/api/v1`

- **VITE_EMAILJS_*** (Optional): For contact form
  - Get from https://www.emailjs.com/
  - Or remove contact form if not needed

---

## 🔄 Updating Your Deployment

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:
```bash
git add .
git commit -m "Update frontend"
git push
```

### Manual Redeploy

1. Go to Vercel dashboard
2. Click your project
3. Go to "Deployments"
4. Click "..." next to latest deployment
5. Click "Redeploy"

---

## 🐛 Troubleshooting

### Issue: "Build failed"

**Solution**: Check build logs in Vercel dashboard
- Usually TypeScript errors
- Or missing dependencies

### Issue: "API calls failing (CORS)"

**Solutions**:
1. Check backend CORS configuration
2. Verify `FRONTEND_URL` in backend config
3. Ensure backend is running

### Issue: "Images not loading"

**Solution**: Update `VITE_ASSET_BASE_URL` or check image paths

### Issue: "Environment variables not working"

**Solutions**:
1. Check variable names start with `VITE_`
2. Redeploy after adding variables
3. Verify values don't have extra spaces

---

## 📝 Custom Domain (Optional)

To use your own domain:

1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Follow DNS setup instructions
5. Wait for SSL certificate (automatic)

---

## ✅ Post-Deployment Checklist

- [ ] Frontend is accessible at Vercel URL
- [ ] Can login/signup
- [ ] Can browse tours
- [ ] Images are loading
- [ ] API calls are working
- [ ] Contact form works (if enabled)
- [ ] Backend CORS is configured
- [ ] HTTPS is enabled
- [ ] Custom domain is set up (optional)

---

## 🎉 You're Done!

Your Etxplore frontend is now live on Vercel!

**Next Steps**:
1. Test all features
2. Share your deployed URL
3. Monitor performance
4. Set up custom domain if desired

---

**Live URL**: `https://your-app.vercel.app`
**Backend URL**: Update in Vercel environment variables

