import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Stethoscope, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle,
  ArrowLeft,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useAuth, AUTH_ROLES } from '../context/AuthContext';

export function AuthPage({ initialMode = 'login', onNavigateDashboard, showToast }) {
  const { login, signup, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: AUTH_ROLES[0].label,
    rememberMe: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const u = await login(formData.email, formData.password);
        showToast?.(`Welcome back, ${u.name}!`, 'success');
      } else {
        const u = await signup(formData);
        showToast?.(`Account created successfully! Welcome, ${u.name}.`, 'success');
      }
      onNavigateDashboard?.();
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const u = await loginWithGoogle();
      showToast?.(`Signed in with Google as ${u.name}`, 'success');
      onNavigateDashboard?.();
    } catch (err) {
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex items-center justify-center py-10 px-4 sm:px-6 relative z-20 font-sans">
      
      {/* Centered White Clinical Auth Card */}
      <div className="w-full max-w-md bg-white p-8 sm:p-10 space-y-6 shadow-xl shadow-blue-500/5 relative z-10 border border-slate-200 rounded-3xl">
        
        {/* Top Header Controls */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <button
            onClick={onNavigateDashboard}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-[#0066FF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 p-0.5 shadow-sm flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
            </div>
            <span className="font-extrabold text-sm text-slate-900 tracking-tight">Health<span className="text-[#0066FF]">.AI</span></span>
          </div>
        </div>

        {/* Header & Mode Switcher */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {mode === 'login' ? 'Sign In to Portal' : 'Create Practitioner Account'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {mode === 'login'
                ? 'Enter credentials to access the 3D clinical dashboard'
                : 'Fill in parameters for practitioner registration'}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex p-1 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'login'
                  ? 'bg-white text-[#0066FF] border border-blue-200 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'signup'
                  ? 'bg-white text-[#0066FF] border border-blue-200 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Google One-Click Auth Button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-900 text-xs font-bold transition-all shadow-sm disabled:opacity-50 group"
        >
          {/* Google SVG Icon */}
          <svg className="w-5 h-5 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-[10px] text-slate-400 uppercase tracking-wider font-bold">
            Or with email
          </span>
        </div>

        {/* Error Message Alert */}
        {error && (
          <div className="flex items-center space-x-2 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name (Sign Up Only) */}
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#0066FF]" /> Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Dr. Alexander Wright"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl text-xs focus:outline-none focus:border-[#0066FF] focus:bg-white"
              />
            </div>
          )}



          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#0066FF]" /> Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="doctor@hospital.org"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl text-xs focus:outline-none focus:border-[#0066FF] focus:bg-white"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#0066FF]" /> Password
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => showToast?.('Password reset link sent to your email', 'info')}
                  className="text-xs text-[#0066FF] font-medium hover:underline"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="••••••••"
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl text-xs focus:outline-none focus:border-[#0066FF] focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          {mode === 'login' && (
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => handleChange('rememberMe', e.target.checked)}
                  className="rounded bg-slate-100 border-slate-300 text-[#0066FF] focus:ring-[#0066FF]"
                />
                <span>Remember me on this device</span>
              </label>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#0066FF] hover:bg-blue-600 text-xs font-bold text-white flex items-center justify-center space-x-2 disabled:opacity-50 mt-2 shadow-lg shadow-blue-500/20"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In to Portal' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </>
            )}
          </button>

        </form>

        {/* Security Footer Badge */}
        <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-500 border-t border-slate-100 pt-4">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
          <span>HIPAA Compliant & Ephemeral Memory Buffer</span>
        </div>

      </div>
    </div>
  );
}
