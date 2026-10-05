import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Brain, ArrowUpRight } from 'lucide-react';

export function HorizontalWorkflowSection() {
  const steps = [
    {
      num: '01',
      title: 'INPUT',
      subtitle: 'Data Streaming & DICOM Ingestion',
      desc: 'Ingest raw radiological scans, DICOM images, vitals, and EHR datasets through zero-latency buffers.',
      icon: Database,
      tag: 'STREAM INGEST'
    },
    {
      num: '02',
      title: 'PROCESSING',
      subtitle: 'GPU Vectorization & 3D Optics',
      desc: 'Multi-GPU clusters perform spatial vectorization and hardware-accelerated WebGL physical optics mesh generation.',
      icon: Cpu,
      tag: 'SUB-MS PROCESS'
    },
    {
      num: '03',
      title: 'INTELLIGENCE',
      subtitle: 'Neural Pattern Recognition',
      desc: 'Deep convolutional & transformer vision models classify structural anomalies with 98.4% precision.',
      icon: Brain,
      tag: 'AI SYNTHESIS'
    },
    {
      num: '04',
      title: 'OUTPUT',
      subtitle: 'Spatial Dashboard & Hospital Export',
      desc: 'Synthesize actionable clinical insights into interactive 3D visual models and certified PDF screening reports.',
      icon: ArrowUpRight,
      tag: 'ACTIONABLE REPORT'
    }
  ];

  return (
    <section id="workflow" className="w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-sans">
      
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Horizontal <span className="text-[#0066FF]">3D Workflow.</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Autonomous data progression pipeline from raw input to 3D spatial intelligence.
        </p>
      </div>

      {/* 4-Step Horizontal Workflow Timeline */}
      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Connecting Line behind steps (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-10 right-10 h-[1px] bg-gradient-to-r from-blue-200 via-blue-500 to-sky-300 -translate-y-6 pointer-events-none shadow-sm" />

        {steps.map((step, idx) => {
          const IconC = step.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className="spatial-card p-6 sm:p-8 space-y-6 text-left group cursor-pointer relative overflow-hidden bg-white border border-slate-200"
            >
              <div className="flex items-center justify-between relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center justify-center group-hover:scale-110 group-hover:border-blue-400 transition-all shadow-sm">
                  <IconC className="w-6 h-6" />
                </div>
                <span className="text-2xl font-mono font-bold text-slate-400 group-hover:text-[#0066FF] transition-colors">
                  {step.num}
                </span>
              </div>

              <div className="space-y-2 relative z-10">
                <span className="text-[10px] font-mono font-bold text-[#0066FF] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  {step.tag}
                </span>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-[#0066FF] transition-colors pt-1">
                  {step.title}
                </h3>
                <p className="text-xs font-bold text-slate-700">{step.subtitle}</p>
                <p className="text-xs text-slate-500 leading-relaxed pt-1 font-medium">
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
