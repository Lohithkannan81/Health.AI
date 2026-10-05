import React from 'react';
import { HelpCircle, ShieldCheck, Cpu, Database, Activity, Lock, Heart, FileText } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-cyan-400" /> About MediVision AI
        </h2>
        <p className="text-xs text-slate-400">
          AI-Based Medical Image Analysis System for Early Disease Detection & Screening
        </p>
      </div>

      {/* Tech Stack Breakdown */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" /> Technology Architecture
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="font-bold text-cyan-300 block">Frontend Stack</span>
            <p className="text-slate-300">React.js + Vite + Tailwind CSS + Framer Motion + Lucide Icons</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="font-bold text-cyan-300 block">Backend Proxy</span>
            <p className="text-slate-300">Python FastAPI + Uvicorn + Pydantic + HTTPX</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="font-bold text-cyan-300 block">AI Vision Core</span>
            <p className="text-slate-300">API Key Vision Proxy (OpenAI GPT-4o / Google Gemini 1.5 Flash)</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="font-bold text-cyan-300 block">PDF Generation</span>
            <p className="text-slate-300">jsPDF + html2canvas hospital letterhead exporter</p>
          </div>
        </div>
      </div>

      {/* Safety & Compliance */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Clinical Safety & Ethical Standards
        </h3>

        <div className="space-y-3 text-xs text-slate-300">
          <p>
            MediVision AI operates strictly as a <strong>preliminary decision-support and screening tool</strong>. The system provides risk pattern indicators and early screening insights to aid healthcare professionals and individuals.
          </p>
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-1">
            <p className="font-bold">Important Clinical Disclaimer:</p>
            <p className="text-[11px] text-rose-200">
              The results produced by this platform do not constitute formal medical diagnosis, prescription, or treatment plans. Patients should always consult qualified medical doctors or radiologists for clinical evaluations.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
