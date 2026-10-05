import React from 'react';
import { Sparkles, Github, Twitter, Disc as Discord, Linkedin } from 'lucide-react';

export function GlassFooter() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#02040a]/90 backdrop-blur-2xl py-12 relative z-10 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Footer Navigation Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/10 pb-8">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-violet-500 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full rounded-full bg-[#030712] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-300" />
              </div>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              Aether<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">.AI</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#hero" className="hover:text-cyan-300 transition-colors">Product</a>
            <a href="#features" className="hover:text-cyan-300 transition-colors">Features</a>
            <a href="#solutions" className="hover:text-cyan-300 transition-colors">Solutions</a>
            <a href="#about" className="hover:text-cyan-300 transition-colors">Resources</a>
            <a href="#faq" className="hover:text-cyan-300 transition-colors">Company</a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="p-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 hover:text-white transition-colors">
              <Discord className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Aether Systems Inc. All rights reserved.</p>
          <p className="text-center sm:text-right">Designed with physical glass transmission & spatial 3D WebGL optics.</p>
        </div>

      </div>
    </footer>
  );
}
