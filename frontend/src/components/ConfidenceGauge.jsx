import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ConfidenceGauge({ confidenceStr }) {
  const numericValue = parseInt((confidenceStr || '85').replace('%', ''), 10) || 85;
  const [currentVal, setCurrentVal] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = numericValue / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCurrentVal(numericValue);
        clearInterval(timer);
      } else {
        setCurrentVal(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [numericValue]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentVal / 100) * circumference;

  let color = '#38bdf8'; // sky blue
  if (numericValue >= 85) color = '#06b6d4'; // cyan
  if (numericValue < 70) color = '#f59e0b'; // amber

  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-slate-800"
            strokeWidth="8"
            fill="none"
          />
          {/* Foreground Animated Gauge */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-extrabold text-white tracking-tight">{currentVal}%</span>
          <span className="text-[9px] font-semibold text-slate-400 uppercase">Confidence</span>
        </div>
      </div>
      <span className="text-[11px] font-medium text-cyan-400 mt-1">AI Match Probability</span>
    </div>
  );
}
