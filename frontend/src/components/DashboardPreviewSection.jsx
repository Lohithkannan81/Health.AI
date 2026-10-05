import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, ShieldCheck, Zap, Sparkles, TrendingUp, Layers, Terminal, Server, ArrowUpRight, Search } from 'lucide-react';

export function DashboardPreviewSection() {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left - card.width / 2;
    const y = e.clientY - card.top - card.height / 2;
    // Calculate subtle 3D tilt angles
    setTilt({
      rotateX: (-y / card.height) * 12,
      rotateY: (x / card.width) * 12
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section className="w-full mt-24 sm:mt-36 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-12">
      
      {/* Section Header */}
      <div className="space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold">
          <Layers className="w-3.5 h-3.5" />
          <span>Real-Time Intelligence Hub</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Interactive Glass Control Suite
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Hover over the floating glass console to experience dynamic 3D optical tilt and live neural metrics.
        </p>
      </div>

      {/* Floating Glass Dashboard Container */}
      <div className="perspective-1000 py-6">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full rounded-[32px] bg-gradient-to-b from-white/[0.05] via-[#030712]/90 to-[#02040a]/95 backdrop-blur-3xl border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.8)] p-6 sm:p-8 lg:p-10 space-y-6 text-left transform-gpu group transition-shadow hover:shadow-cyan-500/10"
        >
          {/* Top Specular Inner Reflection Line */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-[32px]" />

          {/* Console Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-violet-500 p-[1px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full rounded-2xl bg-[#030712] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-300" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Aether Console v4.5</h3>
                <p className="text-xs text-slate-400">Live Workspace Infrastructure</p>
              </div>
            </div>

            {/* Search Bar & Status */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-400">
                <Search className="w-3.5 h-3.5" />
                <span>Search telemetry, logs, models...</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono text-slate-300">⌘K</kbd>
              </div>

              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ALL SYSTEMS OPTIMAL</span>
              </span>
            </div>
          </div>

          {/* Metric Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Active Pipeline Nodes', value: '1,024', change: '+12.4%', icon: Server, color: 'text-cyan-400' },
              { label: 'Neural Inferences', value: '14.2M', change: '+99.8%', icon: Cpu, color: 'text-indigo-400' },
              { label: 'Avg Latency', value: '0.78 ms', change: '-45.2%', icon: Zap, color: 'text-emerald-400' },
              { label: 'Security Buffer', value: '100%', change: 'HIPAA Locked', icon: ShieldCheck, color: 'text-violet-400' },
            ].map((m, idx) => {
              const IconC = m.icon;
              return (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-2 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{m.label}</span>
                    <IconC className={`w-4 h-4 ${m.color}`} />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-white tracking-tight">{m.value}</span>
                    <span className="text-[11px] font-semibold text-emerald-400 font-mono">{m.change}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dashboard Main Visual Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            
            {/* Left Graph & Performance Chart */}
            <div className="lg:col-span-8 p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Inference Velocity Stream</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Real-Time (60 FPS)</span>
              </div>

              {/* Animated Waveform Chart */}
              <div className="h-40 w-full flex items-end justify-between space-x-2 pt-4 border-b border-white/10 pb-2">
                {[35, 45, 60, 55, 75, 90, 80, 95, 70, 85, 100, 90, 95, 80, 100, 85, 95].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end h-full">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ duration: 0.6, delay: i * 0.03 }}
                      className="w-full rounded-t-sm bg-gradient-to-t from-cyan-500/20 via-indigo-500 to-violet-400 group-hover:from-cyan-400 group-hover:to-violet-300 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>00:00:00</span>
                <span>00:00:30</span>
                <span>00:01:00</span>
                <span>LIVE</span>
              </div>
            </div>

            {/* Right Live Stream Event Log */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center space-x-2 text-slate-300 border-b border-white/10 pb-3">
                <Terminal className="w-4 h-4 text-violet-400" />
                <span className="font-bold">Neural Log Stream</span>
              </div>

              <div className="space-y-2 text-[11px] text-slate-400 leading-relaxed overflow-hidden">
                <p className="text-cyan-300">&gt; model.deploy(&apos;v4.5-glass&apos;)</p>
                <p className="text-slate-300">[11:27:01] Mesh geometry synchronized</p>
                <p className="text-emerald-400">[11:27:02] GPU cluster 04 online (0.78ms)</p>
                <p className="text-slate-400">[11:27:03] Zero-knowledge lock verified</p>
                <p className="text-cyan-400">[11:27:04] Stream throughput: 14.2k req/s</p>
              </div>

              <button className="w-full mt-2 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-semibold border border-white/10 flex items-center justify-center space-x-1 transition-colors">
                <span>Open Telemetry</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>

          </div>

        </motion.div>
      </div>

    </section>
  );
}
