import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Shield, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';
import authService from '../services/auth.service';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      const userData = authService.getUser();
      
      setIsAuthenticated(authenticated);
      setUser(userData);
    };

    checkAuth();

    // Listen for auth changes (when user logs in/out)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    setShowUserMenu(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 z-50 border-b-gray-700 bg-zinc-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="text-xl font-bold text-green-400 font-mono drop-shadow-[0_0_8px_#00ff00]">
          <Link to='/'>&gt;_ TERMINAL</Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 font-mono text-white">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-green-400"
                : "hover:text-green-400 transition"
            }
          >
            Home
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink
                to="/project"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400"
                    : "hover:text-green-400 transition"
                }
              >
                Projects
              </NavLink>

              <NavLink
                to="/skill"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400"
                    : "hover:text-green-400 transition"
                }
              >
                Skills
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400"
                    : "hover:text-green-400 transition"
                }
              >
                Contact
              </NavLink>
            </>
          )}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-6 font-mono">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-white hover:text-green-400 transition">
                Login
              </Link>
              <Link to='/register' className="rounded-md bg-green-400 active:scale-95 px-5 py-2 font-semibold text-black hover:bg-green-500 transition">
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 border border-green-400/30 transition"
              >
                <User className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm max-w-[150px] truncate">
                  {user?.email}
                </span>
                <ChevronDown className={`w-4 h-4 text-green-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-green-400/30 rounded-md shadow-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-zinc-800">
                    <p className="text-xs text-gray-400">Signed in as</p>
                    <p className="text-sm text-white font-mono truncate">{user?.email}</p>
                    {user?.role === 'admin' && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-green-400/10 text-green-400 rounded border border-green-400/30">
                        ADMIN
                      </span>
                    )}
                  </div>

                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-zinc-800 transition"
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </Link>

                    {user?.role === 'admin' && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-green-400 hover:bg-zinc-800 transition"
                      >
                        <Shield className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green-400 text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-green-500 font-mono">
          <nav className="flex flex-col items-center gap-6 py-6 text-white">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-green-400"
                  : "hover:text-green-400 transition"
              }
            >
              Home
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink
                  to="/project"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-green-400"
                      : "hover:text-green-400 transition"
                  }
                >
                  Projects
                </NavLink>

                <NavLink
                  to="/skill"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-green-400"
                      : "hover:text-green-400 transition"
                  }
                >
                  Skills
                </NavLink>

                <NavLink
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-green-400"
                      : "hover:text-green-400 transition"
                  }
                >
                  Contact
                </NavLink>
              </>
            )}

            <div className="flex flex-col items-center gap-4 pt-4 w-full px-6">
              {!isAuthenticated ? (
                <>
                  <Link 
                    to="/login" 
                    onClick={() => setOpen(false)}
                    className="text-white hover:text-green-400 transition"
                  >
                    Login
                  </Link>
                  <Link 
                    to='/register' 
                    onClick={() => setOpen(false)}
                    className="w-full text-center rounded-md bg-green-400 active:scale-95 px-5 py-2 font-semibold text-black hover:bg-green-500 transition"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <div className="w-full text-center py-2 border border-green-400/30 rounded-md">
                    <p className="text-xs text-gray-400">Signed in as</p>
                    <p className="text-sm text-green-400 truncate px-2">{user?.email}</p>
                  </div>
                  
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="w-full text-center rounded-md border border-green-400 px-5 py-2 font-semibold text-green-400 hover:bg-green-400/10 transition"
                  >
                    My Profile
                  </Link>

                  {user?.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setOpen(false)}
                      className="w-full text-center rounded-md bg-green-400 px-5 py-2 font-semibold text-black hover:bg-green-500 transition"
                    >
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full rounded-md border border-red-500 px-5 py-2 font-semibold text-red-500 hover:bg-red-500/10 transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;