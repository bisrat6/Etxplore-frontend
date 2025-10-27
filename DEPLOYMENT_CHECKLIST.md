# Frontend Deployment Checklist

Quick checklist before deploying to Vercel.

## ✅ Pre-Deployment Checklist

### Code Preparation
- [x] Code is committed to Git
- [ ] Code is pushed to GitHub
- [ ] All features are tested locally
- [ ] No console errors
- [ ] No TypeScript errors

### Environment Configuration
- [ ] Create `.env.example` file (already done)
- [ ] Know your backend API URL
- [ ] Have EmailJS credentials (optional, for contact form)

### Backend Connection
- [ ] Backend is deployed (Heroku/Railway/etc.)
- [ ] Backend URL is known
- [ ] Backend CORS allows your Vercel domain
- [ ] Backend environment has `FRONTEND_URL` set

### Testing
- [ ] Login works
- [ ] Signup works
- [ ] Email verification works
- [ ] Tours page loads
- [ ] Tour details work
- [ ] Images load correctly
- [ ] API calls succeed

---

## 🚀 Deployment Steps

### Quick Checklist

- [ ] **Step 1**: Push code to GitHub
- [ ] **Step 2**: Go to vercel.com and sign in
- [ ] **Step 3**: Import GitHub repository
- [ ] **Step 4**: Configure:
  - Framework: Vite
  - Root Directory: `etxplore_frontEnd` (if from monorepo)
  - Build Command: `npm run build`
  - Output Directory: `dist`
- [ ] **Step 5**: Add environment variable:
  ```
  VITE_API_BASE_URL=https://your-backend-url/api/v1
  ```
- [ ] **Step 6**: Click Deploy
- [ ] **Step 7**: Update backend CORS
- [ ] **Step 8**: Test deployed site

---

## 📝 Environment Variables

### Required Variable

```env
VITE_API_BASE_URL=https://your-backend-url/api/v1
```

**How to find backend URL:**
- Heroku: `https://your-app.herokuapp.com/api/v1`
- Railway: `https://your-app.railway.app/api/v1`
- DigitalOcean: `https://your-app.digitalocean.app/api/v1`

### Optional Variables (for contact form)

If you're using the contact form:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 🔧 Quick Commands

### Push to GitHub (First Time)

```bash
cd etxplore_frontEnd
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/etxplore-frontend.git
git push -u origin main
```

### Push Updates

```bash
git add .
git commit -m "Update description"
git push
```

### Test Build Locally

```bash
npm run build
npm run preview
```

---

## 🐛 Common Issues

### "Cannot find module" during build

**Fix**: Run `npm install` locally and commit `package-lock.json`

### API calls fail after deployment

**Fixes**:
1. Check `VITE_API_BASE_URL` environment variable
2. Verify backend CORS configuration
3. Check backend is running

### Images don't load

**Fix**: Check image paths and backend URL configuration

### Login doesn't work

**Fixes**:
1. Check backend URL in environment variables
2. Check backend JWT configuration
3. Check backend CORS

---

## ✅ Post-Deployment

After deployment, test:

- [ ] Site loads
- [ ] Login works
- [ ] Signup works  
- [ ] Tours display
- [ ] Tour details work
- [ ] Booking works
- [ ] Profile page works
- [ ] Admin functions work (if admin)

---

## 📞 Need Help?

1. Check Vercel build logs
2. Check browser console for errors
3. Verify environment variables
4. Check backend logs
5. Review VERCEL_DEPLOYMENT.md for details

---

**Ready to deploy?** Follow the steps in `VERCEL_DEPLOYMENT.md`

