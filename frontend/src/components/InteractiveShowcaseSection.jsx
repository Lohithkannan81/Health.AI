import React from 'react';
import { motion } from 'framer-motion';
import { Move3d, ArrowUpRight } from 'lucide-react';
import { ThreeInteractiveShowcaseCanvas } from './ThreeInteractiveShowcaseCanvas';

export function InteractiveShowcaseSection({ onNavigateDashboard }) {
  return (
    <section id="dashboard-preview" className="w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 font-sans">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-mono font-bold">
          <Move3d className="w-3.5 h-3.5 text-[#0066FF]" />
          <span>INTERACTIVE CLINICAL SHOWCASE</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Spatial Medical <br />
          <span className="text-[#0066FF]">Inspection Stage.</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Rotate, inspect, and interact with live 3D clinical visual components suspended in space.
        </p>
      </div>

      {/* Large Light Showcase Area */}
      <div className="p-8 sm:p-12 rounded-[36px] bg-white border border-slate-200 shadow-xl shadow-blue-500/5 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Left Information */}
        <div className="lg:col-span-5 space-y-6 text-left relative z-10">
          <span className="text-xs font-mono font-bold text-[#0066FF] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            3D CLINICAL DEMO
          </span>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">
            Real-Time Diagnostic Telemetry & Model Inspection
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our spatial UI engine renders live data streams with physical light transmission, depth layer segmentation, and sub-millisecond response rates.
          </p>

          <div className="space-y-3 pt-2 font-mono text-xs text-slate-600">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
              <span>3D MESH RECONSTRUCTION: 60 FPS</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>GPU HARDWARE ACCELERATION: ACTIVE</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
              <span>CONFIDENCE INDEX: 98.4% PRECISION</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={onNavigateDashboard}
              className="px-6 py-3 rounded-2xl bg-[#0066FF] hover:bg-blue-600 text-xs font-bold text-white shadow-lg shadow-blue-500/20 flex items-center space-x-2 transition-all"
            >
              <span>Enter Interactive Clinical Dashboard</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Right 3D Interactive Canvas */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[420px]">
          <ThreeInteractiveShowcaseCanvas />
        </div>

      </div>

    </section>
  );
}
