import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export function IntroductionSection() {
  return (
    <section id="about" className="w-full py-28 sm:py-40 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-10 relative font-sans">
      
      {/* Background Radial Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-6 relative z-10"
      >
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-mono font-bold tracking-widest uppercase shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
          <span>OUR CLINICAL PHILOSOPHY</span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.08]">
          Clinical screening should <br />
          <span className="text-[#0066FF]">
            feel instantaneous & precise.
          </span>
        </h2>

        <p className="text-lg sm:text-2xl text-slate-600 font-light leading-relaxed max-w-3xl mx-auto">
          High-precision computer vision, multi-modal radiological analysis, and 3D anatomical heart modeling brought together in one seamless clinical experience.
        </p>
      </motion.div>

      {/* Luminous Glowing Blue Glass Line */}
      <div className="w-full max-w-md mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#0066FF] to-transparent relative z-10 shadow-[0_0_15px_rgba(0,102,255,0.6)]" />

    </section>
  );
}
