import React, { useState, useEffect } from 'react';
import { Search, X, Stethoscope, FileText, ArrowRight, Activity, Command } from 'lucide-react';

export function SearchModal({ isOpen, onClose, onSelectTab }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open search modal handled by parent or state trigger
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchItems = [
    { type: 'Action', title: 'New AI Vision Analysis', tab: 'analysis', icon: Stethoscope, desc: 'Upload X-Ray, MRI, or CT for computer vision evaluation' },
    { type: 'Report', title: 'Saved Patient Diagnostic Reports', tab: 'reports', icon: FileText, desc: 'View past screening summaries and PDF downloads' },
    { type: 'View', title: 'Clinical Analytics Dashboard', tab: 'dashboard', icon: Activity, desc: 'View screening metrics, modality charts, and recent cases' },
    { type: 'Settings', title: 'System Settings & Preferences', tab: 'settings', icon: Command, desc: 'Manage clinical API connections and profile parameters' },
  ].filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-xl glass-card-futuristic rounded-3xl overflow-hidden shadow-2xl space-y-0">
        
        {/* Search Input Header */}
        <div className="p-4 border-b border-white/10 flex items-center space-x-3 bg-slate-900/60">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clinical cases, analysis tools, reports..."
            className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-slate-500"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-1">
          {searchItems.length > 0 ? (
            searchItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    onSelectTab(item.tab);
                    onClose();
                  }}
                  className="p-3 rounded-2xl hover:bg-white/10 transition-all cursor-pointer flex items-center justify-between group border border-transparent hover:border-cyan-500/30"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500/20">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">
              No matching clinical tools or cases found.
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-3 border-t border-white/10 bg-slate-950/40 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[10px]">ESC</kbd> to close
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[10px]">Ctrl + K</kbd> quick shortcut
          </span>
        </div>

      </div>
    </div>
  );
}
