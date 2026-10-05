import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ShieldCheck, Zap, Activity, ArrowUpRight } from 'lucide-react';

export function AsymmetricFeaturesSection() {
  return (
    <section id="features" className="w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-sans">
      
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Asymmetric <span className="text-[#0066FF]">Spatial Design.</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Uncompromising visual hierarchy designed around computational depth and technical precision.
        </p>
      </div>

      {/* Feature Block 1: Wide Left / Narrow Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 spatial-card p-8 sm:p-12 space-y-6 text-left relative overflow-hidden bg-white border border-slate-200"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">3D Computer Vision & Modality Intelligence</h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#0066FF] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              VISION CORE V4.8
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Multi-modal radiological analysis supporting Radiographs (X-Ray), CT Scans, MRI volumetric modeling, and dermatological pattern recognition.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 space-y-1">
            <p className="text-[#0066FF]">&gt; Model.synthesizeSpatialMesh(&#123; modality: &apos;3D_CARDIAC_CT&apos; &#125;);</p>
            <p className="text-emerald-600">&gt; Status: 200 OK — Refraction Index: 1.52 (Latency: 0.78ms)</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 spatial-card p-8 space-y-6 text-left bg-white border border-slate-200"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="text-xl font-bold text-slate-900">Sub-Millisecond Inference Velocity</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Distributed GPU cluster pipeline delivering instantaneous risk scoring and anomaly detection with zero queuing latency.
          </p>
          <div className="pt-2 text-xs font-mono font-bold text-[#0066FF] flex items-center space-x-1">
            <span>THROUGHPUT: 14.2K REQ/S</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </motion.div>

      </div>

      {/* Feature Block 2: Narrow Left / Wide Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 spatial-card p-8 space-y-6 text-left bg-white border border-slate-200"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-xl font-bold text-slate-900">Zero-Knowledge Ephemeral Core</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Patient health information is processed exclusively in ephemeral RAM buffers. Zero persistent storage guarantees total HIPAA alignment.
          </p>
          <div className="pt-2 text-xs font-mono font-bold text-emerald-600 flex items-center space-x-1">
            <span>100% ENCRYPTED • SOC2 COMPLIANT</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 spatial-card p-8 sm:p-12 space-y-6 text-left bg-white border border-slate-200"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Standardized Hospital PACS Integration</h3>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Directly interfaces with clinician routines, electronic medical records, and DICOM hospital infrastructure for automated PDF screening report generation.
          </p>
        </motion.div>

      </div>

    </section>
  );
}
