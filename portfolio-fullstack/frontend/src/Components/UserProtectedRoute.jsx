import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/auth.service';

// Protected Route for Logged-in Users (Admin or Regular User)
const UserProtectedRoute = () => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User is authenticated (admin or regular user), allow access
  return <Outlet />;
};

export default UserProtectedRoute;