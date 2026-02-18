import { NavLink, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Wrench,
  UserPen,
  LogOut,
  Shield,
} from "lucide-react";
import { toast } from 'react-toastify';
import authService from "../services/auth.service";

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Projects", path: "/admin/projects_management", icon: FolderKanban },
  { name: "Messages", path: "/admin/messages", icon: MessageSquare },
  { name: "Skills", path: "/admin/skills", icon: Wrench },
  { name: "Profile", path: "/admin/profile", icon: UserPen },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info from localStorage
    const userData = authService.getUser();
    setUser(userData);
  }, []);

  const handleLogout = () => {
    // Clear auth data
    authService.logout();
    
    // Show success message
    toast.success('Logged out successfully');

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col">

      {/* Logo & User Info */}
      <div className="border-b border-zinc-800">
        <div className="h-16 flex items-center px-6">
          <Link to='/admin/dashboard' className="text-lg font-bold text-green-400 font-mono">
            Admin Panel
          </Link>
        </div>
        
        {/* User Info */}
        {user && (
          <div className="px-6 py-4 bg-zinc-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {user.email}
                </p>
                <p className="text-xs text-green-400 uppercase font-mono">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/admin/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition ${
                  isActive
                    ? "bg-green-400/10 text-green-400 border border-green-400"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-md border border-red-500 text-red-500 hover:bg-red-500/10 transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
}