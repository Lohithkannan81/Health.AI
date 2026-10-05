import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Stethoscope, UserPlus } from 'lucide-react';

import { GlassNavigation } from '../components/GlassNavigation';
import { ThreeSpatialCoreCanvas } from '../components/ThreeSpatialCoreCanvas';


import { DramaticFinalCTASection } from '../components/DramaticFinalCTASection';
import { LuxuryFooter } from '../components/LuxuryFooter';

export function WelcomePage({ onNavigateLogin, onNavigateSignup, onNavigateDashboard }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans overflow-x-hidden selection:bg-[#0066FF] selection:text-white">
      
      {/* 1. Subtle SVG Noise Grain Texture */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 2. Soft Royal Blue Ambient Cursor Spotlight Follower */}
      <div 
        className="pointer-events-none fixed w-[600px] h-[600px] rounded-full blur-[160px] transition-transform duration-300 z-0 opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.10) 0%, rgba(14, 165, 233, 0.06) 45%, transparent 70%)',
          left: `${mousePos.x - 300}px`,
          top: `${mousePos.y - 300}px`
        }}
      />

      {/* 3. NAVIGATION BAR */}
      <GlassNavigation 
        onNavigateLogin={onNavigateLogin} 
        onNavigateSignup={onNavigateSignup} 
        onNavigateDashboard={onNavigateDashboard}
      />

      {/* 4. HERO SECTION WITH 3D DNA HELIX */}
      <main id="hero" className="relative z-10 pt-10 sm:pt-20 pb-20 sm:pb-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE HERO CONTENT */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-6 space-y-8 text-left z-20"
          >
            
            {/* Regulatory Medical Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-white border border-blue-200 shadow-sm shadow-blue-500/5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]" />
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#0066FF] uppercase">
                CE & HIPAA ALIGNED • AI-BASED MEDICAL VISION ENGINE
              </span>
            </motion.div>

            {/* Massive Headline */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]"
              >
                AI-Based Medical Image Analysis <br />
                <span className="text-[#0066FF]">
                  System for Early Disease Detection.
                </span>
              </motion.h1>

              {/* Short Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl"
              >
                Empowering cardiologists, radiologists, and clinical institutions with high-precision computer vision analysis for Radiographs, CT Scans, MRI, and Dermoscopy — for early disease detection and diagnostic assistance.
              </motion.p>
            </div>

            {/* Primary & Secondary CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              
              {/* Primary CTA */}
              <button
                onClick={onNavigateLogin}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0EA5E9] hover:from-blue-600 hover:to-sky-600 text-white text-sm font-extrabold flex items-center space-x-3 shadow-xl shadow-blue-500/25 transition-all transform hover:scale-[1.02]"
              >
                <Stethoscope className="w-4 h-4 text-white" />
                <span>Access Diagnostic Portal</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onNavigateSignup}
                className="px-7 py-4 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-sm font-bold flex items-center space-x-2.5 shadow-sm transition-all"
              >
                <UserPlus className="w-4 h-4 text-slate-600" />
                <span>Register Clinical Account</span>
              </button>

            </motion.div>

            {/* Key Technical Highlights */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 font-mono">
              <div>
                <span className="text-xl font-black text-slate-900 tracking-tight block">98.4%</span>
                <span className="text-[11px] text-slate-500">Neural Precision</span>
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 tracking-tight block">&lt; 0.78ms</span>
                <span className="text-[11px] text-slate-500">Inference Latency</span>
              </div>
              <div>
                <span className="text-xl font-black text-[#0066FF] tracking-tight block">100% HIPAA</span>
                <span className="text-[11px] text-slate-500">Zero-Storage Buffer</span>
              </div>
            </div>

          </motion.div>

          {/* RIGHT / CENTER 3D DNA STRAND CANVAS */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center min-h-[500px] lg:min-h-[620px]">
            
            {/* Ambient Backlight Spheres */}
            <div className="absolute w-[440px] h-[440px] rounded-full bg-blue-400/10 blur-[130px] pointer-events-none" />
            <div className="absolute w-[360px] h-[360px] rounded-full bg-sky-300/15 blur-[140px] pointer-events-none translate-x-12 translate-y-12" />

            {/* 3D Medical Spatial Core WebGL Canvas (3D DNA Helix) */}
            <ThreeSpatialCoreCanvas />

          </div>

        </div>

      </main>





      {/* SECTION 6 — DRAMATIC FINAL CTA */}
      <DramaticFinalCTASection 
        onNavigateSignup={onNavigateSignup} 
        onNavigateLogin={onNavigateLogin} 
      />

      {/* FOOTER */}
      <LuxuryFooter />

    </div>
  );
}
