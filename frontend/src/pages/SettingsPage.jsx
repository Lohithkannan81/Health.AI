import React, { useState } from 'react';
import { Settings, Sun, Moon, Save, ShieldCheck } from 'lucide-react';

export function SettingsPage({ isDark, toggleTheme, showToast }) {
  const [provider, setProvider] = useState(() => localStorage.getItem('medivision_ai_provider') || 'gemini');
  const [hospitalName, setHospitalName] = useState(() => localStorage.getItem('medivision_hospital_name') || 'MediVision Medical Center');

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('medivision_ai_provider', provider);
    localStorage.setItem('medivision_hospital_name', hospitalName.trim());
    if (showToast) showToast('Settings saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#0066FF]" /> Platform System Settings
        </h2>
        <p className="text-xs text-slate-500 mt-1">Configure clinical facility preferences and diagnostic model behavior</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Backend API Connection Status */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Backend AI Engine Status</h3>
              <p className="text-xs text-slate-500">Google Gemini 1.5 API key is securely managed on the backend server</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-emerald-800 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Server Environment Key Loaded (No Frontend Input Required)</span>
            </div>
            <span className="font-mono font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 text-[10px]">
              ONLINE
            </span>
          </div>
        </div>

        {/* Model Provider Selection */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Preferred AI Diagnostic Model
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              provider === 'gemini'
                ? 'bg-blue-50 border-[#0066FF] text-slate-900'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <input
                type="radio"
                name="provider"
                value="gemini"
                checked={provider === 'gemini'}
                onChange={() => setProvider('gemini')}
                className="hidden"
              />
              <span className="font-bold text-xs block text-[#0066FF]">Google Gemini 1.5 (Recommended)</span>
              <span className="text-[10px] text-slate-500 mt-1 block">Primary multimodal vision & diagnostic intelligence</span>
            </label>

            <label className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              provider === 'auto'
                ? 'bg-blue-50 border-[#0066FF] text-slate-900'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <input
                type="radio"
                name="provider"
                value="auto"
                checked={provider === 'auto'}
                onChange={() => setProvider('auto')}
                className="hidden"
              />
              <span className="font-bold text-xs block text-slate-900">Auto Detect</span>
              <span className="text-[10px] text-slate-500 mt-1 block">Tries Gemini first, then OpenAI or clinical engine</span>
            </label>

            <label className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              provider === 'openai'
                ? 'bg-blue-50 border-[#0066FF] text-slate-900'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <input
                type="radio"
                name="provider"
                value="openai"
                checked={provider === 'openai'}
                onChange={() => setProvider('openai')}
                className="hidden"
              />
              <span className="font-bold text-xs block text-slate-900">OpenAI GPT-4o</span>
              <span className="text-[10px] text-slate-500 mt-1 block">Secondary alternative model</span>
            </label>
          </div>
        </div>

        {/* Facility Branding */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Hospital & Facility Preferences
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Hospital / Clinic Facility Name (For PDF Report Headers)
            </label>
            <input
              type="text"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#0066FF] focus:bg-white"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-[#0066FF] hover:bg-blue-600 text-white font-bold text-sm shadow-xl shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all"
        >
          <Save className="w-4 h-4 text-white" />
          <span>Save Facility Settings</span>
        </button>

      </form>
    </div>
  );
}
