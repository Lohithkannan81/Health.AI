import React from 'react';
import { AlertCircle, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export function SeverityBar({ severityStr }) {
  const sev = (severityStr || 'Moderate').toLowerCase();

  let percent = 50;
  let label = 'Moderate Risk';
  let badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  let gradient = 'from-emerald-400 via-amber-400 to-rose-500';
  let icon = AlertTriangle;

  if (sev.includes('low') || sev.includes('mild')) {
    percent = 25;
    label = 'Low Risk / Mild';
    badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    icon = ShieldCheck;
  } else if (sev.includes('severe')) {
    percent = 75;
    label = 'Severe / High Priority';
    badgeColor = 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    icon = AlertCircle;
  } else if (sev.includes('critical')) {
    percent = 95;
    label = 'Critical / Urgent Care';
    badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse';
    icon = Zap;
  }

  const IconComp = icon;

  return (
    <div className="space-y-2 p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Assessed Severity</span>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border flex items-center gap-1 ${badgeColor}`}>
          <IconComp className="w-3.5 h-3.5" />
          {label}
        </span>
      </div>

      {/* Bar container */}
      <div className="relative w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 font-medium">
        <span>Mild (0%)</span>
        <span>Moderate (50%)</span>
        <span>Severe / Urgent (100%)</span>
      </div>
    </div>
  );
}
