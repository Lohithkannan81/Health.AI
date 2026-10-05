import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, ShieldCheck, Layers, ArrowUpRight, Box } from 'lucide-react';

export function CoreCapabilitiesSection() {
  const capabilities = [
    {
      num: '01',
      title: '3D Cardiac & Radiological Vision',
      desc: 'Hardware-accelerated 3D neural execution synthesizing unstructured visual telemetry into high-confidence spatial anatomical models.',
      icon: Cpu,
      tag: 'SYNTHESIS CORE'
    },
    {
      num: '02',
      title: 'Sub-ms DICOM Engine',
      desc: 'Distributed multi-GPU pipeline delivering continuous real-time diagnostic throughput under 0.78ms latency.',
      icon: Zap,
      tag: 'HIGH VELOCITY'
    },
    {
      num: '03',
      title: 'Zero-Storage Privacy',
      desc: 'Ephemeral RAM buffer architecture guaranteeing complete isolation, HIPAA protocol, and SOC2 compliance.',
      icon: ShieldCheck,
      tag: 'ENCRYPTED'
    },
    {
      num: '04',
      title: 'Autonomous Orchestration',
      desc: 'Self-healing workflow agents connecting clinical DICOM streams with predictive disease risk scoring.',
      icon: Layers,
      tag: 'AUTONOMOUS'
    }
  ];

  return (
    <section id="capabilities" className="w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-sans">
      
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-mono font-bold">
          <Box className="w-3.5 h-3.5" />
          <span>SPATIAL MEDICAL CAPABILITIES</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Engineered for <br />
          <span className="text-[#0066FF]">Clinical Precision.</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Four foundational pillars combining 3D physical depth with deep neural medical computation.
        </p>
      </div>

      {/* 4 Interactive 3D Spatial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {capabilities.map((item, idx) => {
          const IconC = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="spatial-card p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden bg-white border border-slate-200"
            >
              {/* Soft Light Blue Accent Corner Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0066FF] group-hover:border-blue-400 group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <IconC className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-mono font-bold text-slate-400 group-hover:text-[#0066FF] transition-colors">
                    {item.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors pt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="pt-8 flex items-center justify-between border-t border-slate-100 mt-6 relative z-10 text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                <span>Inspect clinical core</span>
                <ArrowUpRight className="w-4 h-4 text-[#0066FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
