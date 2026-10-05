import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, ShieldCheck } from 'lucide-react';

export function LoadingScreen({ hasImage }) {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    "Initializing Spatial 3D Neural Engine...",
    "Structuring patient demographic parameters...",
    hasImage ? "Extracting visual 3D features from medical scan..." : "Evaluating clinical symptom presentation...",
    "Running multi-modal neural cross-examination...",
    "Synthesizing early screening impression and guidance..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 min-h-[450px] font-sans">
      
      {/* Custom 3D Spatial Assembling Core Loading Graphic */}
      <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
        
        {/* Outer Pulsing Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-[#F6A80D]/10 blur-xl animate-pulse" />
        
        {/* Orbiting Ring 1 (Clockwise) */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/40 animate-[spin_8s_linear_infinite]" />
        
        {/* Orbiting Ring 2 (Counter-Clockwise) */}
        <div className="absolute inset-3 rounded-full border border-copper-500/30 animate-[spin_12s_linear_infinite_reverse]" />

        {/* Central 3D Spatial Core Box */}
        <div className="relative z-10 w-28 h-28 rounded-3xl bg-[#050505] border border-amber-500/40 flex flex-col items-center justify-center shadow-2xl shadow-amber-500/20">
          <Sparkles className="w-10 h-10 text-[#F6A80D] animate-pulse mb-1" />
          <span className="text-[10px] font-mono text-[#F6A80D] font-bold uppercase tracking-widest">
            SYNTHESIZING
          </span>
        </div>
      </div>

      {/* Primary Loading Text */}
      <motion.div
        key={stepIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2 max-w-md"
      >
        <h3 className="text-lg font-bold text-[#F7F3F6] tracking-tight flex items-center justify-center gap-2">
          <Cpu className="w-5 h-5 text-[#F6A80D] animate-spin-slow" />
          AI is analyzing your symptoms...
        </h3>
        <p className="text-xs text-[#F6A80D] font-mono font-medium h-5">
          {steps[stepIndex]}
        </p>
      </motion.div>

      {/* Progress Bar Animation */}
      <div className="w-full max-w-sm h-1.5 bg-[#050505] rounded-full overflow-hidden mt-6 border border-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-[#F6A80D] via-amber-500 to-[#AE3A13] rounded-full"
          initial={{ width: "5%" }}
          animate={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <p className="text-[11px] text-[#6E696C] mt-4 font-mono">
        Aether Neural Inference Engine v4.8 • Ephemeral RAM Core
      </p>
    </div>
  );
}
