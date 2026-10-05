import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function FinalCTASection({ onNavigateSignup, onNavigateLogin }) {
  return (
    <section className="w-full py-28 sm:py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Outer Large Glass Hero Container */}
      <div className="p-10 sm:p-20 rounded-[40px] bg-gradient-to-b from-white/[0.05] via-[#030712]/90 to-[#02040a] backdrop-blur-3xl border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.8)] text-center space-y-8 relative overflow-hidden">
        
        {/* Specular Edge Top Highlight Line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Large Subtle 3D Glowing Glass Orb behind typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/20 via-indigo-600/15 to-violet-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/15 text-cyan-300 font-mono text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>START BUILDING TODAY</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
            Ready to build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-400">
              what&apos;s next?
            </span>
          </h2>

          <p className="text-base sm:text-xl text-slate-300 font-light leading-relaxed max-w-xl mx-auto">
            Turn your ideas into intelligent experiences with our award-winning glassmorphism platform.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-4">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNavigateSignup}
            className="px-9 py-4.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 hover:from-cyan-300 hover:to-violet-400 text-white font-extrabold text-sm shadow-2xl shadow-cyan-500/30 flex items-center space-x-3 transition-all duration-300"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 text-cyan-300" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNavigateLogin}
            className="px-8 py-4.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 font-bold text-sm border border-white/15 flex items-center space-x-2 transition-all backdrop-blur-xl"
          >
            <span>Explore Platform</span>
          </motion.button>
        </div>

      </div>

    </section>
  );
}
