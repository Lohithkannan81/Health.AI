import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function DramaticFinalCTASection({ onNavigateSignup, onNavigateLogin }) {
  return (
    <section className="w-full py-28 sm:py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden font-sans">
      
      {/* Full-Width White Elevated Container */}
      <div className="spatial-card-elevated p-10 sm:p-20 text-center space-y-8 relative overflow-hidden bg-white border border-slate-200 shadow-xl shadow-blue-500/5">
        
        {/* Specular Edge Top Line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#0066FF]/40 to-transparent pointer-events-none" />

        {/* Ambient Moving Blue Background Lighting Sphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 via-sky-400/5 to-blue-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] font-mono text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>EXCELLENCE IN CLINICAL DIAGNOSTICS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.08]">
            Ready to Elevate <br />
            <span className="text-[#0066FF]">Clinical Diagnostics?</span>
          </h2>

          <p className="text-base sm:text-xl text-slate-600 font-light leading-relaxed max-w-xl mx-auto">
            Transform your radiological workflows with high-precision AI medical image analysis for early disease detection.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-4">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNavigateSignup}
            className="px-9 py-4.5 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0EA5E9] hover:from-blue-600 hover:to-sky-600 text-sm font-extrabold text-white flex items-center space-x-3 shadow-xl shadow-blue-500/25"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNavigateLogin}
            className="px-8 py-4.5 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-sm font-bold text-slate-900 flex items-center space-x-2"
          >
            <span>Sign In to Portal</span>
          </motion.button>
        </div>

      </div>

    </section>
  );
}
