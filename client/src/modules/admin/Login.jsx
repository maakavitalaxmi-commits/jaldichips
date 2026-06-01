import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Loader2, 
  AlertCircle, 
  Lock, 
  Mail, 
  ChevronRight, 
  ShieldCheck 
} from "lucide-react";

import logo from "/src/assets/banana/logo2.png";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: email.toLowerCase().trim(),
        password,
      });
      console.log("LOGIN RESPONSE:", data);
      if (data.user?.role === "admin" || data.user?.role === "super-admin") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("role", data.user.role);
        onLogin();
        navigate("/admin/dashboard");
      } else {
        setError("Unauthorized Access: Admin privileges required.");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Internal Server Error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-6 font-sans relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[440px]"
      >
        <div className="bg-[#111111]/80 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Brand Header */}
          <div className="text-center mb-10">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="relative inline-block mb-6"
            >
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
              <img 
                src={logo} 
                alt="Logo" 
                className="w-20 h-20 rounded-3xl object-cover relative z-10 border border-white/10 shadow-2xl"
              />
            </motion.div>
            
            <h2 className="text-3xl font-black text-white tracking-tight mb-1">
              Admin <span className="text-emerald-500">Portal</span>
            </h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">
              Maa Kavita Lakxmi Kitchen
            </p>
          </div>

          {/* Alert Handling */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-red-500/10 text-red-400 p-4 rounded-2xl mb-8 flex items-center gap-3 text-sm border border-red-500/20"
              >
                <AlertCircle size={18} />
                <span className="font-semibold">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 group-focus-within:text-emerald-500 transition-colors">
                System Identifier
              </label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-emerald-500/50 focus:bg-white/10 outline-none font-bold text-white transition-all placeholder:text-gray-700" 
                  placeholder="admin@khawojaldi.com" 
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 group-focus-within:text-emerald-500 transition-colors">
                Access Token
              </label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-emerald-500/50 focus:bg-white/10 outline-none font-bold text-white transition-all placeholder:text-gray-700" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            {/* Action Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-white text-black py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4 overflow-hidden relative group"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Initialize Access</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer Branding */}
          <div className="mt-12 pt-8 border-t border-white/5 text-center flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-gray-600" />
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
              Encrypted Terminal &copy; 2026
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
