# Quick Deployment Commands

# ====================================
# STEP 1: PUSH TO GITHUB
# ====================================

# First, create a new repository on GitHub.com
# Then run these commands:

git remote add origin https://github.com/YOUR_USERNAME/Rishit-Portfolio.git
git branch -M main
git push -u origin main


# ====================================
# STEP 2: DEPLOY BACKEND TO VERCEL
# ====================================

# Install Vercel CLI (only needed once)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy backend
cd backend
vercel --prod

# IMPORTANT: After deployment
# 1. Copy the backend URL (e.g., https://rishit-portfolio-backend.vercel.app)
# 2. Go to Vercel Dashboard > Your Backend Project > Settings > Environment Variables
# 3. Add these:
#    MONGO_URL = your_mongodb_atlas_connection_string
#    JWT_KEY = Sketch_Code_Solutions
#    PORT = 8001


# ====================================
# STEP 3: UPDATE FRONTEND CONFIG
# ====================================

# Edit frontend/.env.production and replace:
# VITE_BACKEND_URL=https://your-actual-backend-url.vercel.app


# ====================================
# STEP 4: DEPLOY FRONTEND TO VERCEL
# ====================================

cd ../frontend
vercel --prod

# After deployment, copy the frontend URL


# ====================================
# STEP 5: UPDATE BACKEND CORS
# ====================================

# Option A: Update via code and redeploy
# Edit backend/index.js - add your frontend URL to allowedOrigins
# Then:
cd ../backend
git add .
git commit -m "Update CORS for production"
git push
vercel --prod

# Option B: Use Vercel CLI
# vercel env add ALLOWED_ORIGINS


# ====================================
# STEP 6: CREATE ADMIN IN PRODUCTION
# ====================================

# Update backend/.env with your production MongoDB Atlas URL
# Then run:
node createAdmin.js


# ====================================
# DONE! 🎉
# ====================================

# Your portfolio is now live at:
# Frontend: https://your-portfolio.vercel.app
# Backend: https://your-backend.vercel.app

# Login at: https://your-portfolio.vercel.app/login
# Email: admin@portfolio.com
# Password: admin123
