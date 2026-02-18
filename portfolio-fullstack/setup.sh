#!/bin/bash

# Portfolio Fullstack Setup Script
# This script helps you set up your fullstack portfolio website

echo "================================================"
echo "Portfolio Fullstack - Setup Script"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js is not installed. Please install Node.js v16 or higher first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js is installed: $(node -v)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}⚠️  npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm is installed: $(npm -v)${NC}"
echo ""

# Setup Backend
echo -e "${BLUE}📦 Setting up Backend...${NC}"
cd backend

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating backend .env file..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please update backend/.env with your configuration!${NC}"
else
    echo -e "${GREEN}✓ Backend .env file already exists${NC}"
fi

cd ..

# Setup Frontend
echo ""
echo -e "${BLUE}📦 Setting up Frontend...${NC}"
cd frontend

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating frontend .env file..."
    cp .env.example .env
    echo -e "${GREEN}✓ Frontend .env file created${NC}"
else
    echo -e "${GREEN}✓ Frontend .env file already exists${NC}"
fi

cd ..

echo ""
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo ""
echo "1. Make sure MongoDB is running on your system"
echo ""
echo "2. Update backend/.env file with your configuration:"
echo "   - Set MONGODB_URI to your MongoDB connection string"
echo "   - Change JWT_SECRET to a secure random string"
echo "   - Set your ADMIN_EMAIL and ADMIN_PASSWORD"
echo ""
echo "3. Start the Backend (in one terminal):"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "4. Start the Frontend (in another terminal):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "5. Open your browser:"
echo "   Frontend: http://localhost:5173"
echo "   Admin Panel: http://localhost:5173/login"
echo "   Backend API: http://localhost:3000/api"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
echo ""
