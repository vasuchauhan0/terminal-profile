import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from 'react-toastify';
import authService from "../services/auth.service";


const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        const response = await authService.login(formData.email, formData.password);
        
        if (response.success) {
          toast.success('Login successful!');
          
          // Check if user is admin
          if (response.data.user.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Login error:', error);
        toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
      } finally {
        setIsLoading(false);
      }
    };

  return (
   <section className="relative w-full min-h-screen flex items-center justify-center bg-[#0a0e0f] overflow-hidden">



     {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className=" active:scale-95 cursor-pointer absolute top-6 left-6 flex items-center gap-2 text-[#00ff41] hover:text-[#39ff14] transition"
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
              USER_AUTH_PROTOCOL_V1.5
            </span>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">

            {/* ASCII LOGIN */}
            <div className="text-[#00ff41] text-xs opacity-70 leading-none whitespace-pre select-none text-center">
{` _      ____   _____ _____ _   _ 
| |    / __ \\ / ____|_   _| \\ | |
| |   | |  | | |  __  | | |  \\| |
| |   | |  | | | |_ | | | | . \` |
| |___| |__| | |__| |_| |_| |\\  |
|______\\____/ \\_____|_____|_| \\_|`}
            </div>

            {/* Title */}
            <div className="text-center space-y-2">
              <p className="text-[#e8f5e9] text-xl font-semibold">
                Identify Yourself
              </p>
              <p className="text-[#808e87] text-sm">
                Please enter your credentials to proceed.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="block text-xs text-[#808e87]">
                  <span className="text-[#00ff41]">{'>'}</span> EMAIL_ADDRESS
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@portfolio.com"
                  required
                  className="w-full px-4 py-3 bg-[#0a0e0f] border-2 border-[#2d3436] text-[#e8f5e9] placeholder:text-[#808e87]/40 focus:outline-none focus:border-[#00ff41] focus:shadow-[0_0_0_3px_rgba(0,255,65,0.1)] transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs text-[#808e87]">
                  <span className="text-[#00ff41]">{'>'}</span> ACCESS_KEY
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 bg-[#0a0e0f] border-2 border-[#2d3436] text-[#e8f5e9] placeholder:text-[#808e87]/40 focus:outline-none focus:border-[#00ff41] focus:shadow-[0_0_0_3px_rgba(0,255,65,0.1)] transition"
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
                {isLoading ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
              </button>
            </form>



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

export default Login;
