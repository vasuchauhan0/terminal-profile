# Portfolio Website - Backend API

A complete RESTful API backend for a portfolio website with admin panel functionality.

## Features

- ✅ **Authentication System** - JWT-based authentication with admin role
- ✅ **Project Management** - Full CRUD operations for projects
- ✅ **Skills Management** - Manage and categorize skills
- ✅ **Contact Form** - Handle contact messages with status tracking
- ✅ **Profile Management** - Update portfolio owner's profile info
- ✅ **File Uploads** - Support for image and document uploads
- ✅ **Security** - Rate limiting, input validation, and secure password hashing
- ✅ **MongoDB Database** - Efficient data storage with Mongoose ODM

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Multer** - File uploads
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation

## Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher) - Running locally or MongoDB Atlas account
- npm or yarn package manager

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the backend root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database - IMPORTANT: Change this to your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/portfolio

# JWT Secret - IMPORTANT: Change this to a random secure string
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Admin Credentials - IMPORTANT: Change these!
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=Admin@12345

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

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

**Using MongoDB Atlas (Cloud):**
If you're using MongoDB Atlas, update the `MONGODB_URI` in `.env` with your connection string.

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:3000` (or your configured PORT).

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |
| PUT | `/api/auth/change-password` | Change password | Private |

### Projects

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all projects | Public |
| GET | `/api/projects/:id` | Get project by ID | Public |
| POST | `/api/projects` | Create project | Admin |
| PUT | `/api/projects/:id` | Update project | Admin |
| DELETE | `/api/projects/:id` | Delete project | Admin |
| PATCH | `/api/projects/:id/toggle-featured` | Toggle featured status | Admin |

### Skills

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/skills` | Get all skills | Public |
| GET | `/api/skills/:id` | Get skill by ID | Public |
| POST | `/api/skills` | Create skill | Admin |
| PUT | `/api/skills/:id` | Update skill | Admin |
| DELETE | `/api/skills/:id` | Delete skill | Admin |
| PATCH | `/api/skills/:id/toggle-active` | Toggle active status | Admin |

### Messages (Contact Form)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/messages` | Submit contact message | Public |
| GET | `/api/messages` | Get all messages | Admin |
| GET | `/api/messages/:id` | Get message by ID | Admin |
| PATCH | `/api/messages/:id/status` | Update message status | Admin |
| PATCH | `/api/messages/:id/star` | Toggle star status | Admin |
| PUT | `/api/messages/:id/notes` | Update admin notes | Admin |
| DELETE | `/api/messages/:id` | Delete message | Admin |
| POST | `/api/messages/bulk/delete` | Bulk delete messages | Admin |

### Profile

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/profile` | Get profile | Public |
| PUT | `/api/profile` | Update profile | Admin |
| POST | `/api/profile/experience` | Add experience | Admin |
| PUT | `/api/profile/experience/:id` | Update experience | Admin |
| DELETE | `/api/profile/experience/:id` | Delete experience | Admin |
| POST | `/api/profile/education` | Add education | Admin |
| PUT | `/api/profile/education/:id` | Update education | Admin |
| DELETE | `/api/profile/education/:id` | Delete education | Admin |

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected routes:

1. Login to get a token
2. Include the token in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

## First Time Setup

When you first run the application:

1. The first user to register will automatically be made an admin
2. You can also register using the credentials set in `.env`:
   - Email: `ADMIN_EMAIL`
   - Password: `ADMIN_PASSWORD`

## File Uploads

Files are uploaded to the `/uploads` directory with the following structure:

```
uploads/
├── profiles/      # Profile and cover images
├── projects/      # Project images and thumbnails
├── skills/        # Skill icons
├── resumes/       # Resume files
└── others/        # Other files
```

Uploaded files are accessible at: `http://localhost:3000/uploads/...`

## Database Models

### User
- email (unique)
- password (hashed)
- role (admin/user)
- isActive
- lastLogin

### Project
- title, descriptions
- technologies, category
- images, thumbnailImage
- URLs (live, github)
- status (draft/published/archived)
- featured, viewCount
- dates, tags, order

### Skill
- name (unique)
- category, proficiency
- icon, description
- yearsOfExperience
- isActive, order, color

### Message
- name, email, subject, message
- status (unread/read/replied/archived)
- isStarred, adminNotes
- ipAddress, userAgent

### Profile
- Personal info (name, title, email, phone, location)
- Bio and about
- Profile and cover images
- Social links
- Resume URL
- Experience and education arrays
- SEO fields

## Security Features

- **Password Hashing** - Bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Express-validator for all inputs
- **Rate Limiting** - Prevents abuse and DDoS
- **CORS** - Configured for frontend URL
- **Role-Based Access** - Admin-only routes protection

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [] // Validation errors if any
}
```

Success responses:

```json
{
  "success": true,
  "message": "Success message",
  "data": {} // Response data
}
```

## Development Tips

1. **Testing Endpoints**: Use Postman or Thunder Client VS Code extension
2. **Database GUI**: Use MongoDB Compass to view your database
3. **Logs**: Check console for detailed error messages
4. **Hot Reload**: Use `npm run dev` for automatic server restart on changes

## Troubleshooting

### MongoDB Connection Error

If you get a connection error:
- Make sure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- Verify MongoDB is accessible on the specified port

### Port Already in Use

If port 3000 is already in use:
- Change `PORT` in `.env` to a different port (e.g., 3001)
- Or stop the process using port 3000

### JWT Secret Error

Make sure you have set `JWT_SECRET` in your `.env` file.

### File Upload Error

Check that the `uploads/` directory exists and has write permissions.

## Production Deployment

When deploying to production:

1. Set `NODE_ENV=production` in `.env`
2. Use a strong `JWT_SECRET`
3. Use MongoDB Atlas or a production MongoDB instance
4. Enable HTTPS
5. Configure proper CORS origins
6. Set up environment variables on your hosting platform
7. Use a process manager like PM2

## License

ISC

## Support

For issues or questions, please create an issue in the repository.
