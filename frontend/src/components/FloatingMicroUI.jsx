import React from 'react';
import { motion } from 'framer-motion';
import { Dna, Activity, ShieldCheck, Stethoscope } from 'lucide-react';

export function FloatingMicroUI() {
  return (
    <>
      {/* 1. TOP-LEFT CARD: GENOMIC SEQUENCING DNA HELIX */}
      <motion.div
        initial={{ opacity: 0, y: 30, x: -30 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        whileHover={{ scale: 1.05, rotateY: -8 }}
        className="absolute top-6 sm:top-12 left-0 sm:-left-12 z-10 p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-blue-200 shadow-xl shadow-blue-500/10 flex items-center space-x-3 max-w-[220px] hidden sm:flex pointer-events-auto"
      >
        <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center justify-center flex-shrink-0">
          <Dna className="w-4 h-4 text-[#0066FF] animate-pulse" />
        </div>
        <div className="text-left">
          <p className="text-[10px] font-mono font-bold tracking-wider text-[#0066FF]">GENOMIC SEQUENCING</p>
          <p className="text-xs font-bold text-slate-900 tracking-wide">3.2B BASE PAIRS</p>
        </div>
      </motion.div>

      {/* 2. TOP-RIGHT CARD: 98.4% DIAGNOSTIC PRECISION */}
      <motion.div
        initial={{ opacity: 0, y: -20, x: 30 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileHover={{ scale: 1.06, rotateY: 6 }}
        className="absolute top-2 sm:top-8 right-0 sm:-right-10 z-30 p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl shadow-blue-500/10 space-y-1 max-w-[200px] hidden sm:block pointer-events-auto"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-[#0066FF]">NEURAL ACCURACY</span>
          <Stethoscope className="w-3.5 h-3.5 text-[#0066FF]" />
        </div>
        <div className="text-2xl font-black text-slate-900 tracking-tight">98.4%</div>
        <p className="text-[10px] text-slate-500 font-medium">Cross-Validated Precision</p>
      </motion.div>

      {/* 3. BOTTOM-LEFT CARD: INFERENCE VELOCITY < 0.78ms */}
      <motion.div
        initial={{ opacity: 0, y: 40, x: -20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        whileHover={{ scale: 1.05, rotateX: -6 }}
        className="absolute bottom-10 sm:bottom-16 left-0 sm:-left-10 z-30 p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl shadow-blue-500/10 flex items-center space-x-3.5 max-w-[220px] hidden lg:flex pointer-events-auto"
      >
        <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0EA5E9] flex-shrink-0">
          <Activity className="w-4 h-4 text-[#0EA5E9]" />
        </div>
        <div className="text-left space-y-0.5">
          <div className="text-lg font-black text-slate-900 tracking-tight font-mono">&lt; 0.78ms</div>
          <p className="text-[10px] text-slate-500 font-medium">Inference Velocity</p>
        </div>
      </motion.div>

      {/* 4. BOTTOM-RIGHT CARD: HIPAA DICOM PROTOCOL */}
      <motion.div
        initial={{ opacity: 0, y: 30, x: 30 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        whileHover={{ scale: 1.05, rotateY: -6 }}
        className="absolute bottom-6 sm:bottom-12 right-0 sm:-right-8 z-10 p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl shadow-blue-500/10 flex items-center space-x-3 max-w-[210px] hidden md:flex pointer-events-auto"
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-slate-900 tracking-wide">HIPAA DICOM CORE</p>
          <p className="text-[10px] text-emerald-600 font-mono">100% Zero-Storage RAM</p>
        </div>
      </motion.div>
    </>
  );
}
