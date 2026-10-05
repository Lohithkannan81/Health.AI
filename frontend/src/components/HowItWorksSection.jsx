import React from 'react';
import { motion } from 'framer-motion';
import { Link2, Cpu, Zap, Sparkles } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Connect',
      desc: 'Seamlessly link your data sources & API endpoints to the glass core.',
      icon: Link2
    },
    {
      num: '02',
      title: 'Analyze',
      desc: 'Neural vision models perform multi-spectrum spatial inference in sub-1ms.',
      icon: Cpu
    },
    {
      num: '03',
      title: 'Automate',
      desc: 'Smart rules execute autonomous workflow pipelines instantly.',
      icon: Zap
    },
    {
      num: '04',
      title: 'Transform',
      desc: 'Synthesize actionable intelligence into beautiful, production-ready experiences.',
      icon: Sparkles
    }
  ];

  return (
    <section className="w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Heading */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-400">Works.</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          A four-step streamlined journey from raw input to spatial intelligence.
        </p>
      </div>

      {/* Horizontal Process Timeline */}
      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Connecting Glowing Line behind steps (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-10 right-10 h-[1px] bg-gradient-to-r from-cyan-500/20 via-indigo-500/50 to-violet-500/20 -translate-y-6 pointer-events-none shadow-[0_0_12px_rgba(56,189,248,0.5)]" />

        {steps.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className="relative p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 hover:border-cyan-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6 text-left group transition-all duration-300"
            >
              {/* Inner Specular Highlight Line */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-t-3xl" />

              <div className="flex items-center justify-between relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/15 text-cyan-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-cyan-500 group-hover:to-indigo-500 group-hover:text-white transition-all shadow-lg">
                  <IconComp className="w-6 h-6" />
                </div>
                <span className="text-3xl font-black font-mono text-cyan-400/40 group-hover:text-cyan-400 transition-colors">
                  {step.num}
                </span>
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
