import React from 'react';
import { 
  X, 
  LogOut, 
  ShieldCheck, 
  Mail, 
  Stethoscope, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function UserProfileModal({ isOpen, onClose, showToast }) {
  const { user, logout } = useAuth();

  if (!isOpen || !user) return null;

  const handleLogout = () => {
    logout();
    showToast?.('Signed out successfully', 'info');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-sm spatial-card-elevated rounded-3xl overflow-hidden p-6 space-y-6 border border-white/10 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#A7A2A5] hover:text-white hover:bg-[#111112] transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full border-2 border-amber-500/40 shadow-xl object-cover"
            />
            <div className="absolute bottom-0 right-0 p-1 rounded-full bg-[#050505] border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#F7F3F6] flex items-center justify-center gap-1.5">
              {user.name}
            </h3>
            <p className="text-xs text-[#F6A80D] font-mono font-medium flex items-center justify-center gap-1 mt-0.5">
              <Stethoscope className="w-3.5 h-3.5" />
              {user.role}
            </p>
          </div>

          <span className="px-2.5 py-0.5 rounded-full bg-[#111112] border border-white/10 text-[#A7A2A5] text-[11px] font-semibold flex items-center gap-1">
            {user.provider === 'google' ? (
              <>
                <svg className="w-3 h-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google Verified</span>
              </>
            ) : (
              <>
                <Mail className="w-3 h-3 text-[#F6A80D]" />
                <span>Verified Account</span>
              </>
            )}
          </span>
        </div>

        {/* User Details Box */}
        <div className="p-3.5 rounded-2xl bg-[#050505] border border-white/10 space-y-2.5 text-xs">
          <div className="flex items-center justify-between text-[#A7A2A5]">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#6E696C]" /> Email
            </span>
            <span className="text-[#F7F3F6] font-mono text-[11px] truncate max-w-[180px]">
              {user.email}
            </span>
          </div>

          <div className="flex items-center justify-between text-[#A7A2A5]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Access Status
            </span>
            <span className="text-emerald-400 font-semibold font-mono text-[11px]">
              Full Clinical License
            </span>
          </div>
        </div>

        {/* Logout Action */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-bold transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>

      </div>
    </div>
  );
}
