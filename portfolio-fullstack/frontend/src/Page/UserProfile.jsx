import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  LogOut,
  Edit,
  Key,
  CheckCircle
} from 'lucide-react';
import { toast } from 'react-toastify';
import authService from '../services/auth.service';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Get user from localStorage
    const userData = authService.getUser();
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      await authService.changePassword(
        passwordForm.currentPassword, 
        passwordForm.newPassword
      );
      
      toast.success('Password changed successfully');
      setIsChangingPassword(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0e0f] flex items-center justify-center">
        <div className="text-[#00ff41] font-mono">Loading...</div>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-[#0a0e0f] text-[#e8f5e9] py-16">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,52,54,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(45,52,54,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 font-mono">
            <span className="text-[#00ff41]">./</span>
            User_Profile
            <span className="inline-block w-2.5 h-5 bg-[#00ff41] animate-pulse" />
          </h1>
          <p className="text-[#808e87] mt-2 font-mono">
            Manage your account settings and information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-[#151b1e] border-2 border-[#2d3436] rounded-lg overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-[#2d3436] px-6 py-3 flex items-center justify-between border-b border-black">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff3b30]" />
              <div className="w-3 h-3 rounded-full bg-[#ffcc00]" />
              <div className="w-3 h-3 rounded-full bg-[#00ff41]" />
            </div>
            <span className="text-xs text-[#808e87] font-mono">
              user@portfolio:~/profile
            </span>
          </div>

          {/* Profile Info */}
          <div className="p-8 space-y-6">
            
            {/* Avatar & Basic Info */}
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-[#00ff41]/10 border-2 border-[#00ff41] flex items-center justify-center">
                <User className="w-12 h-12 text-[#00ff41]" />
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-xs text-[#808e87] font-mono flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4" />
                    EMAIL_ADDRESS
                  </label>
                  <div className="text-lg font-mono bg-[#0a0e0f] border border-[#2d3436] px-4 py-2 rounded">
                    {user.email}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#808e87] font-mono flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4" />
                      USER_ROLE
                    </label>
                    <div className={`font-mono text-sm px-4 py-2 rounded border ${
                      user.role === 'admin' 
                        ? 'bg-[#00ff41]/10 border-[#00ff41] text-[#00ff41]'
                        : 'bg-blue-500/10 border-blue-500 text-blue-400'
                    }`}>
                      {user.role.toUpperCase()}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#808e87] font-mono flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4" />
                      MEMBER_SINCE
                    </label>
                    <div className="font-mono text-sm bg-[#0a0e0f] border border-[#2d3436] px-4 py-2 rounded">
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {user.role === 'admin' && (
                  <div className="bg-[#00ff41]/5 border border-[#00ff41]/20 rounded p-4">
                    <div className="flex items-center gap-2 text-[#00ff41]">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-mono text-sm">
                        Admin privileges enabled - You have full system access
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-[#2d3436] space-y-3">
              <button
                onClick={() => setIsChangingPassword(!isChangingPassword)}
                className="w-full flex items-center justify-center gap-3 bg-[#2d3436] hover:bg-[#3d4446] border border-[#2d3436] text-[#e8f5e9] px-6 py-3 rounded font-mono transition"
              >
                <Key className="w-5 h-5" />
                {isChangingPassword ? 'Cancel Password Change' : 'Change Password'}
              </button>

              {user.role === 'admin' && (
                <button
                  onClick={() => navigate('/admin/dashboard')}
                  className="w-full flex items-center justify-center gap-3 bg-[#00ff41] hover:bg-[#00d936] text-[#0a0e0f] px-6 py-3 rounded font-mono font-bold transition"
                >
                  <Shield className="w-5 h-5" />
                  Go to Admin Panel
                </button>
              )}

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500 text-red-500 px-6 py-3 rounded font-mono transition"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Change Password Form */}
        {isChangingPassword && (
          <div className="bg-[#151b1e] border-2 border-[#2d3436] rounded-lg overflow-hidden">
            <div className="bg-[#2d3436] px-6 py-3 border-b border-black">
              <span className="text-sm text-[#e8f5e9] font-mono">
                Change Password
              </span>
            </div>

            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs text-[#808e87] font-mono flex gap-2 mb-1">
                  <span className="text-[#00ff41]">{'>'}</span>
                  CURRENT_PASSWORD
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  required
                  className="w-full bg-[#0a0e0f] border-2 border-[#2d3436] rounded px-4 py-3 font-mono text-[#e8f5e9] outline-none focus:border-[#00ff41] focus:shadow-[0_0_0_3px_rgba(0,255,65,0.2)] placeholder:text-[#808e87]/50"
                />
              </div>

              <div>
                <label className="text-xs text-[#808e87] font-mono flex gap-2 mb-1">
                  <span className="text-[#00ff41]">{'>'}</span>
                  NEW_PASSWORD
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password (min 6 characters)"
                  required
                  className="w-full bg-[#0a0e0f] border-2 border-[#2d3436] rounded px-4 py-3 font-mono text-[#e8f5e9] outline-none focus:border-[#00ff41] focus:shadow-[0_0_0_3px_rgba(0,255,65,0.2)] placeholder:text-[#808e87]/50"
                />
              </div>

              <div>
                <label className="text-xs text-[#808e87] font-mono flex gap-2 mb-1">
                  <span className="text-[#00ff41]">{'>'}</span>
                  CONFIRM_NEW_PASSWORD
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  required
                  className="w-full bg-[#0a0e0f] border-2 border-[#2d3436] rounded px-4 py-3 font-mono text-[#e8f5e9] outline-none focus:border-[#00ff41] focus:shadow-[0_0_0_3px_rgba(0,255,65,0.2)] placeholder:text-[#808e87]/50"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#00ff41] hover:bg-[#00d936] text-[#0a0e0f] px-6 py-3 rounded font-mono font-bold uppercase tracking-wider transition"
              >
                Update Password
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserProfile;