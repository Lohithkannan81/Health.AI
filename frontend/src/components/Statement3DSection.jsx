import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { Statement3DCanvas } from './Statement3DCanvas';

export function Statement3DSection({ onNavigateSignup }) {
  return (
    <section className="w-full py-28 sm:py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Editorial Statement */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-8 text-left"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-violet-300 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>DISRUPTIVE SCULPTURE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
            Beyond Data. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-300 to-cyan-300">
              Toward Intelligence.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-slate-300 font-light leading-relaxed max-w-xl">
            We transcend standard raw data ingestion. Our physical glass optics pipeline transforms disparate signals into actionable, high-confidence intelligence.
          </p>

          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.04, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNavigateSignup}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-2xl shadow-indigo-500/25 flex items-center space-x-3 transition-all duration-300"
            >
              <span>Explore the Technology</span>
              <ArrowRight className="w-4 h-4 text-cyan-300" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right 3D Glass Sculpture Canvas */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[450px]">
          <Statement3DCanvas />
        </div>

      </div>

    </section>
  );
}
