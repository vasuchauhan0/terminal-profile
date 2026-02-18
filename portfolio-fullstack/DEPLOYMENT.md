# Deployment Guide - Portfolio Fullstack

This guide will help you deploy your portfolio website to production.

## 🚀 Recommended Hosting Providers

### Backend
- **Railway** (Recommended) - Easy, free tier available
- **Render** - Free tier with auto-deploy
- **Heroku** - Popular, has free tier
- **DigitalOcean App Platform** - $5/month
- **AWS EC2** - Most flexible, requires setup

### Frontend
- **Vercel** (Recommended) - Free, automatic deployments
- **Netlify** - Free, easy setup
- **GitHub Pages** - Free, for static sites
- **Cloudflare Pages** - Free, fast CDN

### Database
- **MongoDB Atlas** (Recommended) - Free tier (512MB)
- **MongoDB Cloud** - Scalable options

## 📦 Pre-Deployment Checklist

### Backend
- [ ] Set all environment variables
- [ ] Use production MongoDB database
- [ ] Set `NODE_ENV=production`
- [ ] Change `JWT_SECRET` to secure value
- [ ] Update admin credentials
- [ ] Enable HTTPS
- [ ] Configure CORS for production domain
- [ ] Set up error logging
- [ ] Test all API endpoints

### Frontend
- [ ] Update `VITE_API_URL` to production backend URL
- [ ] Test build locally (`npm run build`)
- [ ] Check for console errors
- [ ] Test on multiple devices
- [ ] Optimize images
- [ ] Enable analytics (optional)

## 🔧 Deployment Steps

## Option 1: Railway (Backend) + Vercel (Frontend)

### Deploy Backend to Railway

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize Railway to access your repo
   - Select your repository

3. **Configure Project**
   - Railway will auto-detect Node.js
   - Go to Settings → Environment
   - Add environment variables:
     ```
     NODE_ENV=production
     PORT=3000
     MONGODB_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_super_secret_jwt_key_production
     ADMIN_EMAIL=admin@yourportfolio.com
     ADMIN_PASSWORD=YourProductionPassword
     FRONTEND_URL=https://your-vercel-domain.vercel.app
     ```

4. **Set Start Command**
   - In Settings → Deploy
   - Set start command: `npm start`
   - Set root directory: `/backend`

5. **Deploy**
   - Railway will automatically deploy
   - Get your backend URL (e.g., `https://your-app.railway.app`)

### Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite

3. **Configure Build Settings**
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Set Environment Variables**
   ```
   VITE_API_URL=https://your-railway-backend-url.railway.app/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Get your frontend URL

6. **Update Backend CORS**
   - Go back to Railway
   - Update `FRONTEND_URL` with your Vercel URL

## Option 2: Render (Both Frontend & Backend)

### Deploy Backend to Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Select your repository

3. **Configure Service**
   - Name: `portfolio-backend`
   - Environment: Node
   - Region: Choose closest to you
   - Branch: main
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Set Environment Variables**
   Add all your environment variables in the "Environment" section

5. **Create Service**
   - Click "Create Web Service"
   - Wait for deployment
   - Get your backend URL

### Deploy Frontend to Render

1. **Create New Static Site**
   - Click "New +" → "Static Site"
   - Select same repository

2. **Configure Static Site**
   - Name: `portfolio-frontend`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Publish Directory: `dist`

3. **Set Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

4. **Deploy**
   - Click "Create Static Site"
   - Wait for deployment

## 📊 MongoDB Atlas Setup

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Cluster"
   - Select "Free" tier
   - Choose region closest to your backend server
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Grant "Read and write to any database" role

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, use specific IP of your backend server

5. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password
   - Use this as your `MONGODB_URI`

## 🔒 Security Best Practices

### Environment Variables
Never commit `.env` files to Git. Always use environment variables on hosting platforms.

### HTTPS
Always use HTTPS in production. Most hosting providers provide free SSL certificates.

### CORS
Set `FRONTEND_URL` to your exact frontend domain. Don't use wildcards in production.

### JWT Secret
Use a long, random string for `JWT_SECRET`. Generate one:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### MongoDB
- Use strong passwords
- Don't allow access from anywhere if possible
- Enable database authentication
- Use environment-specific databases

### Rate Limiting
The app includes rate limiting (100 requests per 15 min). Adjust in `server.js` if needed.

## 🐛 Common Deployment Issues

### "Module not found" Error
- Make sure all dependencies are in `package.json`
- Run `npm install` locally to verify
- Check that `node_modules` is in `.gitignore`

### CORS Errors
- Verify `FRONTEND_URL` in backend `.env`
- Check CORS configuration in `server.js`
- Make sure URLs don't have trailing slashes

### MongoDB Connection Error
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure database user has correct permissions
- Check if cluster is active

### 502 Bad Gateway
- Check if backend is running
- Verify start command is correct
- Check logs for errors
- Ensure PORT is not hardcoded

### Frontend Can't Connect to Backend
- Verify `VITE_API_URL` is set correctly
- Check if backend URL is accessible
- Look for CORS errors in browser console
- Make sure backend is using HTTPS if frontend is

## 📈 Post-Deployment

### 1. Test Everything
- Try logging in
- Create a project
- Submit contact form
- Upload images
- Test on mobile

### 2. Set Up Monitoring
- Use Railway/Render logs
- Set up error alerts
- Monitor database usage
- Track API response times

### 3. Configure Domain (Optional)
- Buy domain from Namecheap, GoDaddy, etc.
- Point domain to Vercel/Netlify
- Point API subdomain to Railway/Render
- Update environment variables with new domains

### 4. Enable Analytics (Optional)
- Google Analytics
- Plausible Analytics
- Vercel Analytics

### 5. Set Up Backups
- MongoDB Atlas has automatic backups
- Export data regularly
- Keep local copies of uploads

## 🎯 Example Production URLs

After deployment, your URLs might look like:

**Frontend:**
- Production: `https://yourportfolio.vercel.app`
- With custom domain: `https://yourname.com`

**Backend:**
- Production: `https://yourportfolio-api.railway.app`
- With custom domain: `https://api.yourname.com`

**Admin Panel:**
- `https://yourportfolio.vercel.app/login`
- `https://yourportfolio.vercel.app/admin/dashboard`

## 💡 Tips for Success

1. **Test locally first** - Make sure everything works before deploying
2. **Deploy backend first** - Frontend needs backend URL
3. **Update environment variables** - Don't forget CORS settings
4. **Use MongoDB Atlas** - Free tier is perfect for starting
5. **Enable auto-deploy** - Push to GitHub and auto-deploy
6. **Monitor logs** - Check for errors after deployment
7. **Use free tiers** - Railway, Vercel, and MongoDB Atlas are free to start

## 🆘 Need Help?

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Render Docs: https://render.com/docs

---

**Congratulations on deploying your portfolio! 🎉**

Remember to update your portfolio regularly with new projects and skills!
