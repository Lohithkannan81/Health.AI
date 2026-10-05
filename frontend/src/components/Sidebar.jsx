import React from 'react';
import { 
  FileSpreadsheet, 
  Settings, 
  ShieldCheck,
  UserCheck,
  Sparkles,
  MessageSquare,
  ScanLine
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Sidebar({ activeTab, setActiveTab }) {
  const { user, isAuthenticated } = useAuth();

  const menuItems = [
    { id: 'chatbot', label: 'Symptom Chatbot', icon: MessageSquare },
    { id: 'image-analysis', label: 'Medical Image Analysis', icon: ScanLine, badge: 'AI Vision' },
    { id: 'reports', label: 'Saved Reports', icon: FileSpreadsheet },
    { id: 'settings', label: 'Settings & Facilities', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 text-slate-900 flex flex-col justify-between hidden md:flex min-h-screen sticky top-0 z-40 transition-colors duration-300 shadow-sm font-sans">
      {/* Brand Header: Health.AI */}
      <div>
        <div className="p-6 border-b border-slate-200 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 p-0.5 shadow-sm flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#0066FF]" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">Health</span>
              <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-[#0066FF] border border-blue-200">.AI</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Clinical Diagnostic Suite</p>
          </div>
        </div>


        {/* Navigation Items */}
        <nav className="px-3 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-xs tracking-tight transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-[#0066FF] border border-blue-300 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0066FF]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#0066FF]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Details */}
      <div className="p-4 border-t border-slate-200 space-y-3">
        {isAuthenticated && user && (
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center space-x-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full border border-blue-400 object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                {user.name.split(' ')[0]} <UserCheck className="w-3.5 h-3.5 text-[#0066FF]" />
              </h4>
              <p className="text-[10px] text-slate-500 truncate">{user.role.split(' ')[0]}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
