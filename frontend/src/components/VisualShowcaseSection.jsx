import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Activity, Box, Workflow } from 'lucide-react';

export function VisualShowcaseSection() {
  const showcaseItems = [
    {
      title: 'Neural Stream Synthesis',
      caption: 'Real-time multi-modal neural pattern recognition & glass visualization',
      icon: Cpu,
      gradient: 'from-cyan-500/20 via-indigo-600/20 to-purple-600/10',
      badge: 'VISION MODEL V4.5'
    },
    {
      title: 'Intelligent Real-Time Analytics',
      caption: 'Continuous telemetry aggregation with sub-second stream indexing',
      icon: Activity,
      gradient: 'from-blue-600/20 via-cyan-500/20 to-teal-500/10',
      badge: 'TELEMETRY ENGINE'
    },
    {
      title: '3D Spatial Geometry Matrix',
      caption: 'Hardware-accelerated WebGL physical light refraction & depth rendering',
      icon: Box,
      gradient: 'from-violet-600/20 via-purple-500/20 to-pink-500/10',
      badge: 'SPATIAL CORE'
    },
    {
      title: 'Automated Pipeline Orchestration',
      caption: 'Self-healing distributed GPU execution stack with zero human latency',
      icon: Workflow,
      gradient: 'from-indigo-600/20 via-blue-500/20 to-cyan-500/10',
      badge: 'ZERO-LATENCY FLOW'
    }
  ];

  return (
    <section id="solutions" className="w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Heading */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          Where Technology <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-400">
            Meets Experience.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          Immersive visual capabilities crafted for high-performance software environments.
        </p>
      </div>

      {/* 2 x 2 Grid of Large Glass Visual Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {showcaseItems.map((item, idx) => {
          const IconC = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-[32px] bg-[#030712]/80 backdrop-blur-3xl border border-white/15 p-6 sm:p-8 space-y-8 shadow-[0_24px_60px_rgba(0,0,0,0.6)] hover:border-white/30 transition-all duration-300 group overflow-hidden"
            >
              {/* Inner Specular Highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent rounded-t-[32px]" />

              {/* Glowing Background Radial Art */}
              <div className={`absolute -bottom-10 -right-10 w-72 h-72 rounded-full blur-3xl bg-gradient-to-br ${item.gradient} opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none`} />

              {/* Panel Top Badge & Title */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/15 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                    <IconC className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                  {item.badge}
                </span>
              </div>

              {/* Futuristic Glass Graphics Preview Area */}
              <div className="h-44 w-full rounded-2xl bg-black/50 border border-white/10 p-4 relative z-10 flex flex-col justify-between overflow-hidden group-hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>LATENCY: 0.78ms</span>
                  <span>STATE: OPTIMAL</span>
                </div>

                {/* Animated Graphic Waves / Matrix Bars */}
                <div className="h-20 w-full flex items-end justify-between space-x-1.5 pt-2">
                  {[45, 70, 55, 90, 65, 80, 100, 85, 95, 75, 85, 90, 100, 60, 85].map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-cyan-500/30 via-indigo-500 to-violet-400 rounded-t-sm group-hover:from-cyan-400 group-hover:to-violet-300 transition-all duration-300"
                      style={{ height: `${val}%` }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300">
                  <span>99.8% ACCURACY</span>
                  <span>STREAM ACTIVE</span>
                </div>
              </div>

              {/* Bottom Caption */}
              <p className="text-xs text-slate-400 leading-relaxed font-medium relative z-10 border-t border-white/10 pt-4">
                {item.caption}
              </p>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
