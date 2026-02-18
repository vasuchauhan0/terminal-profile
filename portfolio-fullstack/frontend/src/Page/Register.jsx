import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from 'react-toastify';
import authService from "../services/auth.service";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Attempting to register with:', formData.email);
      
      const response = await authService.register(formData.email, formData.password);
      
      console.log('Registration response:', response);

      if (response.success) {
        toast.success('Registration successful! Redirecting...');
        
        // Check if user is admin
        setTimeout(() => {
          if (response.data.user.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response) {
        // Server responded with error
        errorMessage = error.response.data?.message || errorMessage;
        console.error('Server error:', error.response.data);
      } else if (error.request) {
        // Request made but no response
        errorMessage = 'Cannot connect to server. Make sure the backend is running on http://localhost:3000';
        console.error('No response from server');
      } else {
        // Something else happened
        errorMessage = error.message;
        console.error('Error:', error.message);
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#0a0e0f] overflow-hidden">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="active:scale-95 cursor-pointer absolute top-6 left-6 flex items-center gap-2 text-[#00ff41] hover:text-[#39ff14] transition"
      >
        <ArrowLeft size={20} />
        <span className="font-mono text-xl">Back</span>
      </button>

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#2d3436 1px, transparent 1px), linear-gradient(90deg, #2d3436 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Container */}
      <div className="relative z-10 w-full max-w-md px-4">
        {/* Card */}
        <div className="bg-[#151b1e] border-2 border-[#2d3436] shadow-[0_4px_16px_rgba(0,0,0,0.5)] rounded-none overflow-hidden font-mono">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#2d3436] py-2 px-4 border-b border-[#2d3436]">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff3b30]" />
              <span className="w-3 h-3 rounded-full bg-[#ffcc00]" />
              <span className="w-3 h-3 rounded-full bg-[#00ff41]" />
            </div>
            <span className="text-xs tracking-widest uppercase text-[#808e87]">
              INITIALIZE_USER ▮
            </span>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Title */}
            <div className="text-center space-y-2">
              <p className="text-[#e8f5e9] text-xl font-semibold">
                Create a new secure access node
              </p>
              <p className="text-[#808e87] text-sm">
                Initialize your credentials to gain system access.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded px-4 py-3 text-red-400 text-sm">
                ERROR: {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="block text-xs text-[#808e87]">
                  <span className="text-[#00ff41]">{'>'}</span> USERNAME
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. johndoe"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-[#0a0e0f] border-2 border-[#2d3436] text-[#e8f5e9] placeholder:text-[#808e87]/40 focus:outline-none focus:border-[#00ff41] focus:shadow-[0_0_0_3px_rgba(0,255,65,0.1)] transition disabled:opacity-50"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs text-[#808e87]">
                  <span className="text-[#00ff41]">{'>'}</span> EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-[#0a0e0f] border-2 border-[#2d3436] text-[#e8f5e9] placeholder:text-[#808e87]/40 focus:outline-none focus:border-[#00ff41] focus:shadow-[0_0_0_3px_rgba(0,255,65,0.1)] transition disabled:opacity-50"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs text-[#808e87]">
                  <span className="text-[#00ff41]">{'>'}</span> PASSWORD_
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-[#0a0e0f] border-2 border-[#2d3436] text-[#e8f5e9] placeholder:text-[#808e87]/40 focus:outline-none focus:border-[#00ff41] focus:shadow-[0_0_0_3px_rgba(0,255,65,0.1)] transition disabled:opacity-50"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs text-[#808e87]">
                  <span className="text-[#00ff41]">{'>'}</span> CONFIRM_PASSWORD_
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-[#0a0e0f] border-2 border-[#2d3436] text-[#e8f5e9] placeholder:text-[#808e87]/40 focus:outline-none focus:border-[#00ff41] focus:shadow-[0_0_0_3px_rgba(0,255,65,0.1)] transition disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 font-bold uppercase tracking-widest transition ${
                  isLoading
                    ? 'bg-[#808e87] text-[#0a0e0f] cursor-not-allowed'
                    : 'bg-[#00ff41] text-[#0a0e0f] hover:bg-[#00d936] hover:shadow-[0_0_15px_rgba(0,255,65,0.4)]'
                }`}
              >
                {isLoading ? 'INITIALIZING...' : '>_ EXECUTE REGISTRATION'}
              </button>
            </form>

            {/* Existing user link */}
            <div className="text-center text-xs text-[#808e87] pt-4 border-t border-[#2d3436]">
              // Existing user?{' '}
              <Link
                to="/login"
                className="text-[#00ff41] hover:text-[#39ff14] underline transition"
              >
                Login_Here
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#0a0e0f] border-t border-[#2d3436] py-2 px-4 flex justify-between text-[10px] text-[#808e87] font-mono">
            <span>STATUS: {isLoading ? 'Processing...' : 'Ready'}</span>
            <span>PORT: 3000</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;