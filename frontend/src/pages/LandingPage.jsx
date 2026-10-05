import React from 'react';
import { 
  Activity, 
  Stethoscope, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  TrendingUp,
  Brain,
  Zap,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { IMAGE_MODALITIES } from '../utils/sampleData';

export function LandingPage({ onStartAnalysis, onLearnMore }) {
  // Recent Clinical Cases Mock Data
  const recentCases = [
    { id: 'CR-9042', patient: 'Anonymous #802', modality: 'Chest X-Ray', severity: 'High', date: '2026-07-29', confidence: '98.6%', status: 'Report Ready' },
    { id: 'CR-9041', patient: 'Anonymous #799', modality: 'Brain MRI', severity: 'Low', date: '2026-07-28', confidence: '99.1%', status: 'Completed' },
    { id: 'CR-9040', patient: 'Anonymous #795', modality: 'Abdominal CT', severity: 'Moderate', date: '2026-07-28', confidence: '97.4%', status: 'Completed' },
    { id: 'CR-9039', patient: 'Anonymous #791', modality: 'Dermoscopy', severity: 'Low', date: '2026-07-27', confidence: '98.9%', status: 'Completed' },
  ];

  return (
    <div className="space-y-10 py-4 pb-16 font-sans">
      
      {/* DASHBOARD HERO HEADER */}
      <section className="relative overflow-hidden pt-2">
        <div className="spatial-card-elevated rounded-3xl p-6 sm:p-8 relative border border-white/10">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111112] border border-amber-500/20 text-[#F6A80D] text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#F6A80D] animate-pulse" />
                <span>SPATIAL CLINICAL SUITE • ANALYTICS CORE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F7F3F6] tracking-tight leading-tight">
                Clinical Intelligence <span className="text-[#F6A80D]">Dashboard</span>
              </h1>

              <p className="text-xs sm:text-sm text-[#A7A2A5] leading-relaxed font-medium">
                High-speed AI computer vision analysis for Radiographs, MRI Scans, CT Scans, Dermoscopy, and Symptom Risk Patterns.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onStartAnalysis}
                  className="btn-amber-primary px-5 py-3 rounded-2xl text-xs font-bold text-white flex items-center space-x-2 shadow-xl"
                >
                  <Stethoscope className="w-4 h-4 text-[#F6A80D]" />
                  <span>Start New Case Analysis</span>
                  <ArrowRight className="w-4 h-4 text-[#F6A80D]" />
                </button>

                <button
                  onClick={onLearnMore}
                  className="btn-secondary-dark px-5 py-3 rounded-2xl text-xs font-semibold text-[#F7F3F6] flex items-center space-x-2"
                >
                  <span>Architecture & Safety</span>
                </button>
              </div>
            </div>

            {/* Quick System Badge */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <div className="p-4 rounded-2xl bg-[#050505] border border-white/10 text-left space-y-1">
                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span>HIPAA Protocol Active</span>
                </div>
                <p className="text-[10px] text-[#A7A2A5]">Zero database patient data footprint</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#050505] border border-white/10 text-left space-y-1">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#F6A80D] font-mono">
                  <Zap className="w-4 h-4" />
                  <span>v4.8 Spatial Core Online</span>
                </div>
                <p className="text-[10px] text-[#A7A2A5]">Hardware GPU cluster proxy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 SPATIAL ANALYTICS STAT CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Total Screenings */}
        <div className="spatial-card rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#A7A2A5]">Total Cases Analyzed</span>
            <div className="w-8 h-8 rounded-xl bg-[#171718] border border-amber-500/20 text-[#F6A80D] flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-[#F7F3F6] tracking-tight">1,482</span>
            <span className="ml-2 text-xs font-bold text-emerald-400 font-mono inline-flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +12.4%
            </span>
          </div>
          <p className="text-[10px] text-[#6E696C]">Total radiographs & scans screened</p>
        </div>

        {/* Stat 2: Diagnostic Accuracy */}
        <div className="spatial-card rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#A7A2A5]">Neural Accuracy Rate</span>
            <div className="w-8 h-8 rounded-xl bg-[#171718] border border-amber-500/20 text-[#F6A80D] flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-[#F6A80D] tracking-tight">98.4%</span>
            <span className="ml-2 text-xs font-bold text-[#F6A80D] font-mono">Clinical Grade</span>
          </div>
          <p className="text-[10px] text-[#6E696C]">Cross-validated anomaly detection</p>
        </div>

        {/* Stat 3: Avg Inference Speed */}
        <div className="spatial-card rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#A7A2A5]">Avg Inference Speed</span>
            <div className="w-8 h-8 rounded-xl bg-[#171718] border border-amber-500/20 text-[#F6A80D] flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-[#F7F3F6] tracking-tight">0.78s</span>
            <span className="ml-2 text-xs font-bold text-emerald-400 font-mono">Real-time</span>
          </div>
          <p className="text-[10px] text-[#6E696C]">High-speed vision processing</p>
        </div>

        {/* Stat 4: High Risk Flagged */}
        <div className="spatial-card rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#A7A2A5]">High Risk Alerts</span>
            <div className="w-8 h-8 rounded-xl bg-[#171718] border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-amber-400 tracking-tight">14</span>
            <span className="ml-2 text-xs font-bold text-amber-300 font-mono">Flagged</span>
          </div>
          <p className="text-[10px] text-[#6E696C]">Requires urgent clinical review</p>
        </div>

      </section>

      {/* INTERACTIVE DATA CHARTS SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Weekly Screening Volume Trend */}
        <div className="lg:col-span-7 spatial-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-sm font-bold text-[#F7F3F6] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#F6A80D]" /> Weekly Screening Volume Trend
              </h3>
              <p className="text-[11px] text-[#A7A2A5]">Diagnostic image evaluation throughput over the last 7 days</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-1 rounded-lg bg-amber-500/10 text-[#F6A80D] border border-amber-500/20">
              Live Stream
            </span>
          </div>

          {/* SVG Area Chart Representation */}
          <div className="h-56 relative flex items-end pt-6">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradAmber" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F6A80D" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#F6A80D" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

              {/* Area Gradient Fill */}
              <path
                d="M 0 120 Q 80 50, 160 80 T 320 30 T 500 45 L 500 150 L 0 150 Z"
                fill="url(#chartGradAmber)"
              />

              {/* Stroke Line */}
              <path
                d="M 0 120 Q 80 50, 160 80 T 320 30 T 500 45"
                fill="none"
                stroke="#F6A80D"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data Points */}
              <circle cx="80" cy="65" r="4" fill="#F6A80D" stroke="#ffffff" strokeWidth="2" />
              <circle cx="160" cy="80" r="4" fill="#F6A80D" stroke="#ffffff" strokeWidth="2" />
              <circle cx="320" cy="30" r="5" fill="#F6A80D" stroke="#ffffff" strokeWidth="2" />
              <circle cx="500" cy="45" r="4" fill="#F6A80D" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#A7A2A5] pt-2 border-t border-white/5">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Chart 2: Modality Breakdown */}
        <div className="lg:col-span-5 spatial-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-sm font-bold text-[#F7F3F6] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#F6A80D]" /> Modality Distribution
              </h3>
              <p className="text-[11px] text-[#A7A2A5]">Share of imaging types processed</p>
            </div>
            <span className="text-[10px] font-mono text-[#A7A2A5]">Total: 100%</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'X-Ray Radiography', pct: '42%', color: 'bg-[#F6A80D]' },
              { name: 'Brain & Spine MRI', pct: '28%', color: 'bg-[#AE3A13]' },
              { name: 'CT Tomography', pct: '18%', color: 'bg-amber-600' },
              { name: 'Cutaneous Dermoscopy', pct: '12%', color: 'bg-emerald-500' },
            ].map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#A7A2A5] font-medium">{m.name}</span>
                  <span className="font-bold text-[#F7F3F6] font-mono">{m.pct}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#050505] overflow-hidden border border-white/5">
                  <div className={`h-full rounded-full ${m.color}`} style={{ width: m.pct }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-[#171718] border border-amber-500/20 text-[#F6A80D] text-xs flex items-center gap-2 mt-4 font-mono">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#F6A80D]" />
            <span>X-Ray & MRI account for 70% of clinical workload</span>
          </div>
        </div>

      </section>

      {/* RECENT CLINICAL CASES DATA TABLE */}
      <section className="spatial-card rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-sm font-bold text-[#F7F3F6] flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-[#F6A80D]" /> Recent AI Screening Cases
            </h3>
            <p className="text-[11px] text-[#A7A2A5]">Real-time clinical image processing queue & report history</p>
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 rounded-xl bg-[#171718] border border-white/10 text-[#A7A2A5] hover:text-[#F7F3F6] text-xs font-semibold flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#F6A80D]" />
              <span>Filter Cases</span>
            </button>
            <button 
              onClick={onStartAnalysis}
              className="btn-amber-primary px-3.5 py-1.5 text-xs font-bold text-white shadow-md"
            >
              + New Case
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#A7A2A5]">
            <thead>
              <tr className="border-b border-white/10 text-[#6E696C] text-[11px] font-mono font-semibold">
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Patient Profile</th>
                <th className="py-3 px-4">Modality</th>
                <th className="py-3 px-4">Severity Risk</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentCases.map((row) => (
                <tr key={row.id} className="hover:bg-[#171718] transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[#F6A80D] font-bold">{row.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#F7F3F6]">{row.patient}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-[#050505] border border-white/10 text-[#A7A2A5] font-mono text-[10px]">
                      {row.modality}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                      row.severity === 'High'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : row.severity === 'Moderate'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}>
                      {row.severity} Risk
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#F7F3F6] font-mono">{row.confidence}</td>
                  <td className="py-3.5 px-4 text-[#A7A2A5] font-mono">{row.date}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={onStartAnalysis}
                      className="px-3 py-1 rounded-lg bg-[#171718] hover:bg-[#050505] text-[#F6A80D] border border-amber-500/30 text-[11px] font-semibold transition-all"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SUPPORTED MODALITIES SECTION */}
      <section className="space-y-6 text-center">
        <div>
          <h2 className="text-2xl font-bold text-[#F7F3F6] tracking-tight">Supported Diagnostic Modalities</h2>
          <p className="text-xs text-[#A7A2A5] mt-1">Multi-modal AI vision trained across diverse clinical imaging types</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {IMAGE_MODALITIES.map((mod) => (
            <div
              key={mod.name}
              className="spatial-card p-4 rounded-2xl text-center space-y-2 cursor-pointer"
              onClick={onStartAnalysis}
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-[#171718] text-[#F6A80D] flex items-center justify-center border border-amber-500/20">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-[#F7F3F6]">{mod.name}</h4>
              <p className="text-[10px] text-[#6E696C] leading-tight">{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
