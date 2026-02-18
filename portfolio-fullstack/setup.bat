@echo off
REM Portfolio Fullstack Setup Script for Windows
REM This script helps you set up your fullstack portfolio website

echo ================================================
echo Portfolio Fullstack - Setup Script
echo ================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Node.js is not installed. Please install Node.js v16 or higher first.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node -v

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo [OK] npm is installed
npm -v
echo.

REM Setup Backend
echo Setting up Backend...
cd backend

echo Installing backend dependencies...
call npm install

REM Create .env if it doesn't exist
if not exist .env (
    echo Creating backend .env file...
    copy .env.example .env
    echo WARNING: Please update backend\.env with your configuration!
) else (
    echo [OK] Backend .env file already exists
)

cd ..

REM Setup Frontend
echo.
echo Setting up Frontend...
cd frontend

echo Installing frontend dependencies...
call npm install

REM Create .env if it doesn't exist
if not exist .env (
    echo Creating frontend .env file...
    copy .env.example .env
    echo [OK] Frontend .env file created
) else (
    echo [OK] Frontend .env file already exists
)

cd ..

echo.
echo ================================================
echo [OK] Setup Complete!
echo ================================================
echo.
echo Next Steps:
echo.
echo 1. Make sure MongoDB is running on your system
echo.
echo 2. Update backend\.env file with your configuration:
echo    - Set MONGODB_URI to your MongoDB connection string
echo    - Change JWT_SECRET to a secure random string
echo    - Set your ADMIN_EMAIL and ADMIN_PASSWORD
echo.
echo 3. Start the Backend (in one terminal):
echo    cd backend
echo    npm run dev
echo.
echo 4. Start the Frontend (in another terminal):
echo    cd frontend
echo    npm run dev
echo.
echo 5. Open your browser:
echo    Frontend: http://localhost:5173
echo    Admin Panel: http://localhost:5173/login
echo    Backend API: http://localhost:3000/api
echo.
echo Happy coding!
echo.
pause
