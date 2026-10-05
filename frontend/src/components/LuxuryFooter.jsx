import React from 'react';
import { Sparkles, Github, Twitter, Disc as Discord, Linkedin } from 'lucide-react';

export function LuxuryFooter() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-12 relative z-10 text-slate-600 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Navigation Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-slate-100 pb-8">
          
          {/* Logo: Health.AI */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#0066FF]" />
            </div>
            <span className="font-extrabold text-lg text-slate-900 tracking-tight">
              Health<span className="text-[#0066FF]">.AI</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#hero" className="hover:text-[#0066FF] transition-colors">Home</a>
            <a href="#features" className="hover:text-[#0066FF] transition-colors">Features</a>
            <a href="#workflow" className="hover:text-[#0066FF] transition-colors">Workflow</a>
            <a href="#dashboard-preview" className="hover:text-[#0066FF] transition-colors">Dashboard</a>
            <a href="#capabilities" className="hover:text-[#0066FF] transition-colors">Documentation</a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="p-2 rounded-full bg-slate-100 border border-slate-200 hover:border-blue-300 hover:text-[#0066FF] transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-slate-100 border border-slate-200 hover:border-blue-300 hover:text-[#0066FF] transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-slate-100 border border-slate-200 hover:border-blue-300 hover:text-[#0066FF] transition-colors">
              <Discord className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-slate-100 border border-slate-200 hover:border-blue-300 hover:text-[#0066FF] transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Health AI Systems Inc. All rights reserved.</p>
          <p className="text-center sm:text-right">Architected with Three.js physical transmission glass & 3D WebGL DNA optics.</p>
        </div>

      </div>
    </footer>
  );
}
