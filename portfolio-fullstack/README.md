# Portfolio Website - Fullstack Application

A complete, production-ready fullstack portfolio website with a powerful admin panel. Built with React (frontend) and Node.js/Express/MongoDB (backend).

## 🌟 Features

### Frontend
- ✨ Modern, responsive design with Terminal/Matrix theme
- 🎨 Smooth animations and transitions
- 📱 Mobile-first approach
- 🚀 Fast and optimized with Vite
- 🎯 Clean and professional UI/UX

### Backend Admin Panel
- 🔐 **Secure Authentication** - JWT-based login system
- 📊 **Dashboard** - Overview of all portfolio statistics
- 📁 **Project Management** - Full CRUD operations for projects
- 🛠️ **Skills Management** - Manage technical skills with categories
- 📬 **Message Management** - View and respond to contact form submissions
- 👤 **Profile Management** - Update personal information, social links, resume
- 🖼️ **File Uploads** - Support for images and documents
- 📈 **Analytics** - Track project views and engagement

## 🏗️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Lucide React** - Icons
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Express Validator** - Input validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**
- **Git**

## 🚀 Installation & Setup

### 1. Clone or Extract the Project

If you have the folder, extract it. Otherwise:
```bash
git clone <your-repo-url>
cd portfolio-fullstack
```

### 2. Backend Setup

Navigate to backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create environment file:
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database - IMPORTANT: Update this!
MONGODB_URI=mongodb://localhost:27017/portfolio

# JWT Secret - IMPORTANT: Change to a secure random string!
JWT_SECRET=your_super_secret_jwt_key_change_this_12345

# Admin Credentials - IMPORTANT: Set your admin credentials!
ADMIN_EMAIL=admin@yourportfolio.com
ADMIN_PASSWORD=SecurePassword123!

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

**Important Environment Variables:**
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A strong, random secret key for JWT tokens
- `ADMIN_EMAIL` & `ADMIN_PASSWORD`: Your admin login credentials

### 3. Frontend Setup

Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Create environment file:
```bash
cp .env.example .env
```

Edit `.env` file:
```env
# Backend API URL
VITE_API_URL=http://localhost:3000/api
```

### 4. Start MongoDB

Make sure MongoDB is running:

**On macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**On Ubuntu/Linux:**
```bash
sudo systemctl start mongod
```

**On Windows:**
MongoDB should start automatically, or run:
```bash
net start MongoDB
```

**Using MongoDB Atlas (Cloud - Recommended):**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in backend `.env` file

## 🎯 Running the Application

### Option 1: Run Both Servers Separately (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on: `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on: `http://localhost:5173`

### Option 2: Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📱 Accessing the Application

- **Frontend (Public Portfolio):** http://localhost:5173
- **Backend API:** http://localhost:3000/api
- **Admin Panel:** http://localhost:5173/admin/dashboard (login required)

## 🔐 First Time Login

1. Go to: http://localhost:5173/login
2. Use credentials from your `.env` file:
   - Email: Your `ADMIN_EMAIL`
   - Password: Your `ADMIN_PASSWORD`
3. You'll be redirected to the admin dashboard

**Note:** The first user to register will automatically become an admin.

## 📁 Project Structure

```
portfolio-fullstack/
├── backend/
│   ├── middleware/          # Auth & Upload middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── uploads/            # Uploaded files
│   ├── .env               # Environment variables
│   ├── .env.example       # Environment template
│   ├── server.js          # Entry point
│   └── package.json
│
└── frontend/
    ├── public/            # Static files
    ├── src/
    │   ├── admin/        # Admin panel pages
    │   ├── Components/   # Reusable components
    │   ├── Layout/       # Layout components
    │   ├── Page/         # Frontend pages
    │   ├── services/     # API services
    │   ├── utils/        # Utility functions
    │   ├── App.jsx       # Main app component
    │   └── main.jsx      # Entry point
    ├── .env              # Environment variables
    ├── .env.example      # Environment template
    └── package.json
```

## 🎨 Admin Panel Features

### Dashboard
- View total projects, skills, and messages
- See recent projects
- Quick statistics overview
- Quick action buttons

### Project Management
- Create new projects with images
- Edit existing projects
- Delete projects
- Toggle published/draft status
- Mark projects as featured
- Add technologies and tags
- Track project views

### Skills Management
- Add new skills
- Organize by categories (Frontend, Backend, Database, etc.)
- Set proficiency levels (0-100%)
- Add years of experience
- Toggle active/inactive status
- Reorder skills

### Message Management
- View all contact form submissions
- Mark messages as read/unread/replied/archived
- Star important messages
- Add private admin notes
- Filter by status
- Bulk delete messages

### Profile Management
- Update personal information
- Manage social media links
- Upload profile photo and cover image
- Add work experience
- Add education
- Upload resume/CV
- SEO settings

## 🔒 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/change-password` - Change password

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (Admin)
- `PUT /api/projects/:id` - Update project (Admin)
- `DELETE /api/projects/:id` - Delete project (Admin)
- `PATCH /api/projects/:id/toggle-featured` - Toggle featured (Admin)

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get skill by ID
- `POST /api/skills` - Create skill (Admin)
- `PUT /api/skills/:id` - Update skill (Admin)
- `DELETE /api/skills/:id` - Delete skill (Admin)
- `PATCH /api/skills/:id/toggle-active` - Toggle active (Admin)

### Messages
- `POST /api/messages` - Submit contact message (Public)
- `GET /api/messages` - Get all messages (Admin)
- `GET /api/messages/:id` - Get message by ID (Admin)
- `PATCH /api/messages/:id/status` - Update status (Admin)
- `PATCH /api/messages/:id/star` - Toggle star (Admin)
- `PUT /api/messages/:id/notes` - Update notes (Admin)
- `DELETE /api/messages/:id` - Delete message (Admin)
- `POST /api/messages/bulk/delete` - Bulk delete (Admin)

### Profile
- `GET /api/profile` - Get profile (Public)
- `PUT /api/profile` - Update profile (Admin)
- `POST /api/profile/experience` - Add experience (Admin)
- `PUT /api/profile/experience/:id` - Update experience (Admin)
- `DELETE /api/profile/experience/:id` - Delete experience (Admin)
- `POST /api/profile/education` - Add education (Admin)
- `PUT /api/profile/education/:id` - Update education (Admin)
- `DELETE /api/profile/education/:id` - Delete education (Admin)

## 🛠️ Development Tips

### Testing APIs
Use Postman, Insomnia, or Thunder Client (VS Code extension) to test API endpoints.

### Database Management
Use MongoDB Compass to view and manage your database visually.

### Hot Reload
Both frontend and backend support hot reload during development.

### Debugging
- Check browser console for frontend errors
- Check terminal console for backend errors
- Enable detailed logging in development mode

## 🚢 Production Deployment

### Backend Deployment (Heroku, Railway, Render)

1. Set environment variables on your platform
2. Set `NODE_ENV=production`
3. Use a production MongoDB database (MongoDB Atlas)
4. Enable HTTPS
5. Configure CORS for your frontend domain

### Frontend Deployment (Vercel, Netlify)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder

3. Set environment variable `VITE_API_URL` to your backend URL

### Recommended Hosting

- **Backend:** Railway, Render, or Heroku
- **Frontend:** Vercel or Netlify
- **Database:** MongoDB Atlas (Free tier available)

## 🔧 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- If using Atlas, check network access and IP whitelist

### Port Already in Use
- Change `PORT` in backend `.env`
- Or stop the process using the port

### CORS Errors
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check CORS configuration in `server.js`

### JWT Authentication Errors
- Ensure `JWT_SECRET` is set in backend `.env`
- Clear browser localStorage and login again

### File Upload Errors
- Check `uploads/` directory exists and has write permissions
- Verify file size is under 5MB
- Check file type is allowed

## 📝 Common Tasks

### Adding a New Project
1. Login to admin panel
2. Go to "Project Management"
3. Click "Add New Project"
4. Fill in details and upload thumbnail
5. Click "Create Project"

### Managing Messages
1. Login to admin panel
2. Go to "Messages"
3. Click on a message to view details
4. Mark as read/replied/archived
5. Add admin notes if needed

### Updating Profile
1. Login to admin panel
2. Click on your profile icon
3. Update information
4. Upload images if needed
5. Save changes

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the README files in backend and frontend folders
3. Create an issue in the repository

## 📄 License

ISC

## 👨‍💻 Author

Created with ❤️ by Your Name

---

**Enjoy building your awesome portfolio! 🚀**
