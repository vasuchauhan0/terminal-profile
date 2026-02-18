// src/Components/Login_input.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const Login_input = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user types
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user data
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      // Show success message
      console.log("Login successful:", data);

      // Redirect based on role
      if (data.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded p-3 text-red-400 text-sm font-mono">
          <span className="text-red-500">ERROR:</span> {error}
        </div>
      )}

      {/* Email Input */}
      <div className="space-y-2">
        <label className="block text-[#00ff41] text-xs uppercase tracking-wider">
          &gt; Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="user@example.com"
          className="w-full bg-[#0a0e0f] border border-[#2d3436] text-[#e8f5e9] px-4 py-3 focus:border-[#00ff41] focus:outline-none transition font-mono"
          disabled={loading}
        />
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label className="block text-[#00ff41] text-xs uppercase tracking-wider">
          &gt; Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full bg-[#0a0e0f] border border-[#2d3436] text-[#e8f5e9] px-4 py-3 pr-12 focus:border-[#00ff41] focus:outline-none transition font-mono"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#808e87] hover:text-[#00ff41] transition"
            disabled={loading}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#00ff41] text-[#0a0e0f] py-3 font-bold uppercase tracking-widest hover:bg-[#39ff14] active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Authenticating...</span>
          </>
        ) : (
          <span>[ Execute Login ]</span>
        )}
      </button>

      {/* Register Link */}
      <div className="text-center text-sm">
        <span className="text-[#808e87]">New user? </span>
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="text-[#00ff41] hover:text-[#39ff14] underline transition"
          disabled={loading}
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default Login_input;