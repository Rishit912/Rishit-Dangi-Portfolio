# 🚀 Deployment Guide - Git & Vercel

## Step 1: Initialize Git Repository

```powershell
# From the root directory
cd C:\Users\Admin\Desktop\Rishit-Portfolio

# Initialize git
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit - Portfolio with Admin Dashboard"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and login
2. Click the "+" icon → "New repository"
3. Name it: `Rishit-Portfolio` or your preferred name
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

## Step 3: Connect Local Repository to GitHub

```powershell
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/Rishit-Portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 4: Deploy Backend to Vercel

### 4.1: Install Vercel CLI (if not already installed)
```powershell
npm install -g vercel
```

### 4.2: Login to Vercel
```powershell
vercel login
```

### 4.3: Deploy Backend
```powershell
cd backend
vercel --prod
```

**During deployment, Vercel will ask:**
- Set up and deploy? → **Y**
- Which scope? → Select your account
- Link to existing project? → **N**
- Project name? → `rishit-portfolio-backend` (or your choice)
- Directory? → **./backend** (press Enter)
- Override settings? → **N**

### 4.4: Add Environment Variables to Vercel

After deployment, go to your Vercel dashboard:

1. Go to your backend project settings
2. Navigate to "Environment Variables"
3. Add these variables:
   ```
   MONGO_URL = mongodb+srv://YOUR_MONGODB_ATLAS_URL
   JWT_KEY = Sketch_Code_Solutions
   PORT = 8001
   ```

**Important:** For production, use MongoDB Atlas (cloud database):
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get connection string
- Replace `YOUR_MONGODB_ATLAS_URL` with your cluster URL

### 4.5: Note Your Backend URL

After deployment, Vercel gives you a URL like:
```
https://rishit-portfolio-backend.vercel.app
```
**Copy this URL - you'll need it for the frontend!**

---

## Step 5: Update Frontend for Backend URL

```powershell
cd ../frontend
```

Edit `frontend/.env.production`:
```env
VITE_BACKEND_URL=https://your-actual-backend-url.vercel.app
```

---

## Step 6: Deploy Frontend to Vercel

```powershell
# Make sure you're in frontend directory
cd frontend

# Deploy to Vercel
vercel --prod
```

**During deployment:**
- Set up and deploy? → **Y**
- Which scope? → Select your account
- Link to existing project? → **N**
- Project name? → `rishit-portfolio` (or your choice)
- Directory? → **./frontend** (press Enter)
- Override settings? → **N**

---

## Step 7: Update Backend CORS

After frontend deployment, update backend CORS:

1. Note your frontend URL (e.g., `https://rishit-portfolio.vercel.app`)
2. Go to backend Vercel project → Settings → Environment Variables
3. Or update `backend/index.js` locally and redeploy

Add your frontend URL to `allowedOrigins` in `backend/index.js`:
```javascript
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:8001',
    'https://your-frontend-url.vercel.app',  // ADD THIS
    'https://sketchcode-alpha.vercel.app',
    'https://sketchcode.one'
];
```

Then redeploy backend:
```powershell
cd backend
git add .
git commit -m "Update CORS for production frontend"
git push
vercel --prod
```

---

## Step 8: Create Admin User in Production

You'll need to create the admin user in your production MongoDB:

**Option 1: Run script locally pointing to Atlas**
1. Update backend/.env with your MongoDB Atlas URL
2. Run: `node createAdmin.js`

**Option 2: Use MongoDB Compass**
1. Connect to your Atlas cluster
2. Create a user manually in the `users` collection

---

## 📋 Deployment Checklist

- [ ] Git repository initialized
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed to Vercel
- [ ] Backend environment variables set
- [ ] Backend URL copied
- [ ] Frontend .env.production updated with backend URL
- [ ] Frontend deployed to Vercel
- [ ] Backend CORS updated with frontend URL
- [ ] Admin user created in production database
- [ ] Tested login at production URL

---

## 🔗 Your URLs

After deployment, you'll have:

**Frontend:** `https://rishit-portfolio.vercel.app`
**Backend:** `https://rishit-portfolio-backend.vercel.app`

**Login at:** `https://rishit-portfolio.vercel.app/login`
- Email: admin@portfolio.com
- Password: admin123

---

## 🆘 Troubleshooting

### Backend Not Connecting to MongoDB
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for Vercel)
- Verify connection string in Vercel environment variables

### CORS Errors
- Ensure frontend URL is in backend's allowedOrigins
- Redeploy backend after changes

### 404 Errors on Refresh
Frontend should have proper routing configured in vercel.json

### Environment Variables Not Working
- Make sure to redeploy after adding/changing env vars
- Use `VITE_` prefix for frontend env vars

---

## 🔄 Future Updates

After making changes:

```powershell
git add .
git commit -m "Description of changes"
git push

# Then redeploy
cd frontend  # or backend
vercel --prod
```

---

## 🎉 You're Done!

Your portfolio is now live with a fully functional admin dashboard!

Share your live URL with the world! 🌍
