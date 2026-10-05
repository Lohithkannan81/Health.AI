import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap, Cpu, Sparkles, CheckCircle2, TrendingUp, Layers } from 'lucide-react';

export function GlassUICards() {
  return (
    <>
      {/* 1. TOP-LEFT FLOATING CARD: AI Status Indicator & Latency Metric */}
      <motion.div
        initial={{ opacity: 0, y: 30, x: -20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        whileHover={{ scale: 1.04, rotateY: -5, rotateX: 5 }}
        className="absolute top-4 sm:top-10 left-2 sm:-left-10 z-20 p-4 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.5)] space-y-3 max-w-[230px] hidden sm:block pointer-events-auto transition-shadow hover:shadow-cyan-500/10 group"
      >
        {/* Specular Edge Line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-3xl" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold text-slate-200 tracking-wide">SYSTEM NOMINAL</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            v4.5 ACTIVE
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white tracking-tight">0.8ms</span>
            <span className="text-[10px] font-semibold text-emerald-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +99.4%
            </span>
          </div>
          <p className="text-[10px] text-slate-400">Ultra Low Latency Processing</p>
        </div>

        {/* Live Mini Sparkline Wave */}
        <div className="h-7 w-full flex items-end space-x-1 pt-1">
          {[40, 65, 55, 80, 95, 70, 85, 100, 90].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-cyan-500/30 to-indigo-500 rounded-t-sm group-hover:from-cyan-400 group-hover:to-violet-400 transition-all duration-300"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </motion.div>

      {/* 2. TOP-RIGHT FLOATING CARD: Notification Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="absolute top-2 sm:top-6 right-2 sm:-right-8 z-20 px-4 py-2.5 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.4)] flex items-center space-x-3 max-w-[270px] hidden md:flex pointer-events-auto"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-white flex-shrink-0 shadow-md">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="text-left overflow-hidden">
          <p className="text-[11px] font-bold text-white leading-tight truncate">Quantum Model v4.2 Deployed</p>
          <p className="text-[10px] text-slate-400">Synchronized 12ms ago</p>
        </div>
      </motion.div>

      {/* 3. BOTTOM-LEFT FLOATING CARD: Circular Optimization Progress */}
      <motion.div
        initial={{ opacity: 0, y: 30, x: -30 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        whileHover={{ scale: 1.05, rotateY: 5 }}
        className="absolute bottom-6 sm:bottom-12 left-2 sm:-left-12 z-20 p-4 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.5)] flex items-center space-x-4 max-w-[240px] hidden lg:flex pointer-events-auto"
      >
        {/* SVG Circular Progress Ring */}
        <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-white/10"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-cyan-400"
              strokeDasharray="98, 100"
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute text-[10px] font-black text-white">98.4%</span>
        </div>

        <div className="text-left space-y-0.5">
          <h4 className="text-xs font-bold text-white leading-tight">Neural Optimization</h4>
          <p className="text-[10px] text-slate-400">Cross-Validated Precision</p>
        </div>
      </motion.div>

      {/* 4. BOTTOM-RIGHT FLOATING CARD: Mini Code & Throughput Preview */}
      <motion.div
        initial={{ opacity: 0, y: 40, x: 30 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        whileHover={{ scale: 1.04, rotateX: -5 }}
        className="absolute bottom-4 sm:bottom-10 right-2 sm:-right-10 z-20 p-4 rounded-3xl bg-[#030712]/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-2 max-w-[260px] hidden sm:block pointer-events-auto"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center space-x-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[11px] font-mono font-bold text-slate-300">pipeline.infer()</span>
          </div>
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">200 OK</span>
        </div>

        <div className="font-mono text-[10px] space-y-1 text-slate-400">
          <p><span className="text-purple-400">const</span> res = <span className="text-cyan-300">await</span> ai.<span className="text-indigo-300">synthesize</span>();</p>
          <p><span className="text-slate-500">// Throughput:</span> <span className="text-emerald-300">14.2k ops/s</span></p>
        </div>
      </motion.div>
    </>
  );
}
