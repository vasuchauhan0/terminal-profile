import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/auth.service';

// Protected Route for Admin Only
const ProtectedRoute = () => {
  const isAuthenticated = authService.isAuthenticated();
  const isAdmin = authService.isAdmin();

  if (!isAuthenticated) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    // Logged in but not admin, redirect to home
    return <Navigate to="/" replace />;
  }

  // User is authenticated and is admin, allow access
  return <Outlet />;
};

export default ProtectedRoute;