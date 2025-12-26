# 🔐 Admin Login Credentials

## Default Admin Account

**Email:** `admin@portfolio.com`  
**Password:** `admin123`

---

## 🚀 How to Create the Admin User

Before you can login, you need to create the admin user in your database:

### Step 1: Make sure MongoDB is running
```powershell
# MongoDB should be running on localhost:27017
```

### Step 2: Run the admin creation script
```powershell
cd backend
node createAdmin.js
```

You should see:
```
✅ Connected to MongoDB
✅ Admin user created successfully!
📧 Email: admin@portfolio.com
🔒 Password: admin123
```

### Step 3: Login to your portfolio
1. Start the backend: `cd backend && npm start`
2. Start the frontend: `cd frontend && npm run dev`
3. Go to: `http://localhost:5173/login`
4. Enter the credentials above
5. Click "Login"

---

## 📝 Notes

- The "Register First Admin User" button has been removed from the login page
- The password is hashed securely in the database
- You can change the password later by updating the admin user in MongoDB
- This is a simple setup for portfolio management - for production, consider adding more security features

---

## 🔄 If You Need to Reset the Admin Password

1. Delete the existing admin user from MongoDB
2. Run `node createAdmin.js` again
3. Or manually update the user in MongoDB Compass

---

## 🎯 Quick Start

```powershell
# Terminal 1 - Backend
cd backend
node createAdmin.js    # Run once to create admin
npm start              # Start backend server

# Terminal 2 - Frontend  
cd frontend
npm run dev            # Start frontend server
```

Then visit: http://localhost:5173/login

**Login with:**
- Email: admin@portfolio.com
- Password: admin123

---

Enjoy your admin dashboard! 🎉
