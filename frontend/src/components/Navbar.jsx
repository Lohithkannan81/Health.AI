import React, { useState } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  UserPlus, 
  Upload, 
  FileSpreadsheet, 
  Settings, 
  HelpCircle,
  LogIn,
  UserCheck,
  ShieldCheck,
  ScanLine
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Navbar({ activeTab, setActiveTab, onOpenProfile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const menuItems = [
    { id: 'chatbot', label: 'Symptom Chatbot', icon: Sparkles },
    { id: 'image-analysis', label: 'Image Analysis', icon: ScanLine },
    { id: 'reports', label: 'Saved Reports', icon: FileSpreadsheet },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'about', label: 'About', icon: HelpCircle },
  ];

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 transition-colors shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Brand: Health.AI */}
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-2xl bg-blue-50 border border-blue-200 p-0.5 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#0066FF]" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 text-lg tracking-tight">Health<span className="text-[#0066FF]">.AI</span></span>
            <span className="hidden sm:inline-block ml-2 text-[10px] px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0066FF] border border-blue-200 font-mono font-semibold">
              Clinical Diagnostic Suite
            </span>
          </div>
        </div>




        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* User Auth Controls */}
          {isAuthenticated && user ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all group"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full border border-blue-400 object-cover"
              />
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors leading-tight flex items-center gap-1">
                  {user.name.split(' ')[0]} <UserCheck className="w-3 h-3 text-[#0066FF]" />
                </span>
                <span className="text-[10px] text-slate-500 leading-none">
                  {user.role.split(' ')[0]}
                </span>
              </div>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'login'
                    ? 'bg-blue-50 text-[#0066FF] border border-blue-300'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Log In</span>
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className="hidden sm:flex items-center space-x-1 px-4 py-1.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-xs font-bold text-white shadow-md shadow-blue-500/20"
              >
                <span>Sign Up</span>
              </button>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-[#0066FF] border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 text-[#0066FF]" />
                <span>{item.label}</span>
              </button>
            );
          })}

          {!isAuthenticated && (
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => {
                  setActiveTab('login');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setActiveTab('signup');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 rounded-xl bg-[#0066FF] text-xs font-bold text-white"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
