import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, ShieldCheck, Layers, ArrowUpRight } from 'lucide-react';

export function FeatureSection() {
  const features = [
    {
      num: '01',
      title: 'Intelligent',
      desc: 'Adaptive neural algorithms that learn, predict, and optimize complex workflows in real time.',
      icon: Brain,
      glow: 'from-cyan-500/20 to-blue-600/10'
    },
    {
      num: '02',
      title: 'Fast',
      desc: 'Sub-millisecond execution throughput designed for high-concurrency enterprise pipelines.',
      icon: Zap,
      glow: 'from-indigo-500/20 to-violet-600/10'
    },
    {
      num: '03',
      title: 'Secure',
      desc: 'Zero-knowledge memory buffers with hardware-enforced HIPAA & SOC2 compliance.',
      icon: ShieldCheck,
      glow: 'from-emerald-500/20 to-cyan-600/10'
    },
    {
      num: '04',
      title: 'Scalable',
      desc: 'Elastic glass infrastructure scaling instantly from single prototypes to global deployments.',
      icon: Layers,
      glow: 'from-violet-500/20 to-pink-600/10'
    }
  ];

  return (
    <section id="features" className="w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Section Title */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          Everything You Need. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-400">
            Nothing You Don&apos;t.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          Four foundational pillars engineered for total software mastery and visual elegance.
        </p>
      </div>

      {/* 4 Luxury Editorial Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {features.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative p-8 rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/10 hover:border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 group flex flex-col justify-between overflow-hidden"
            >
              {/* Inner Specular Edge Line */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-[28px]" />

              {/* Background Gradient Glow */}
              <div className={`absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl bg-gradient-to-br ${item.glow} opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`} />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/15 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-cyan-500 group-hover:to-indigo-500 group-hover:text-white transition-all duration-300 shadow-lg">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black font-mono text-white/20 group-hover:text-cyan-400/40 transition-colors">
                    {item.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="pt-8 flex items-center justify-between border-t border-white/10 mt-6 relative z-10 text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                <span>Explore capability</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
