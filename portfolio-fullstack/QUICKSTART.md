# Portfolio Fullstack - Quick Start Guide

## ⚡ Super Quick Setup (5 minutes)

### Step 1: Run Setup Script

**On macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**On Windows:**
```bash
setup.bat
```

### Step 2: Configure Backend

Edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=change_this_to_a_random_secret_key_12345
ADMIN_EMAIL=admin@yourportfolio.com
ADMIN_PASSWORD=YourSecurePassword123!
```

### Step 3: Start MongoDB

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Windows:** MongoDB should be running, or:
```bash
net start MongoDB
```

**Cloud (MongoDB Atlas):** Create free account at mongodb.com/cloud/atlas

### Step 4: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running on http://localhost:3000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend running on http://localhost:5173

### Step 5: Login & Start Using

1. Go to http://localhost:5173/login
2. Login with your admin credentials from `.env`
3. Start managing your portfolio!

## 🎯 What You Can Do Now

### Admin Panel (http://localhost:5173/admin/dashboard)
- ✅ Create and manage projects
- ✅ Add and categorize skills
- ✅ View contact messages
- ✅ Update your profile
- ✅ Upload images and files

### Public Portfolio (http://localhost:5173)
- ✅ View your projects
- ✅ See your skills
- ✅ Contact form
- ✅ Responsive design

## 🆘 Common Issues

### "Cannot connect to MongoDB"
- Make sure MongoDB is running
- Check MONGODB_URI in backend/.env

### "Port 3000 already in use"
- Change PORT in backend/.env to 3001 or another port
- Update VITE_API_URL in frontend/.env accordingly

### "Login failed"
- Check ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env
- Make sure backend server is running

## 📚 Need More Help?

Check out the main [README.md](README.md) for detailed documentation.

## 🚀 Ready to Deploy?

See the "Production Deployment" section in README.md

---

That's it! You're ready to build an amazing portfolio! 🎉
