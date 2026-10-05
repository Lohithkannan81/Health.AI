import React from 'react';
import { motion } from 'framer-motion';

export function HeartbeatBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-20">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/20 via-sky-500/10 to-transparent rounded-full blur-3xl" />
      
      {/* Animated Heartbeat ECG SVG */}
      <svg
        className="absolute top-1/3 left-0 w-full h-48 stroke-cyan-400"
        viewBox="0 0 1200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 75 H350 L370 75 L380 40 L395 110 L410 20 L425 130 L440 75 L460 75 H750 L770 75 L780 40 L795 110 L810 20 L825 130 L840 75 L860 75 H1200"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-ecg"
        />
      </svg>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05]" />
    </div>
  );
}
