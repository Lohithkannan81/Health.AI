import React from 'react';
import { User, Activity, AlertTriangle, Sparkles, FileText, Pill, Heart, Scale, ArrowRight } from 'lucide-react';
import { VoiceInput } from './VoiceInput';
import { SAMPLE_PRESETS } from '../utils/sampleData';

export function PatientForm({
  patient,
  setPatient,
  symptoms,
  setSymptoms,
  onSubmit,
  onLoadPreset,
  isSubmitting
}) {
  const handleInputChange = (field, value) => {
    setPatient(prev => ({ ...prev, [field]: value }));
  };

  const handleSpeechText = (text) => {
    setSymptoms(prev => (prev ? `${prev} ${text}` : text));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      
      {/* Header & Quick Presets Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" /> Patient Clinical Profile
          </h3>
          <p className="text-xs text-slate-400">Enter demographic & medical parameters for AI evaluation</p>
        </div>

        {/* 1-Click Demo Presets */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-cyan-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Demo Cases:
          </span>
          <div className="flex space-x-1.5 overflow-x-auto py-1">
            {SAMPLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onLoadPreset(preset)}
                className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 text-xs font-medium whitespace-nowrap transition-all"
                title={`Load sample ${preset.title}`}
              >
                {preset.modality} Case
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Patient Demographic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            required
            value={patient.full_name || ''}
            onChange={(e) => handleInputChange('full_name', e.target.value)}
            placeholder="e.g. Jane Doe"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Age <span className="text-rose-400">*</span>
          </label>
          <input
            type="number"
            required
            min="1"
            max="120"
            value={patient.age || ''}
            onChange={(e) => handleInputChange('age', e.target.value)}
            placeholder="e.g. 45"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Gender <span className="text-rose-400">*</span>
          </label>
          <select
            value={patient.gender || 'Male'}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other / Non-Binary</option>
          </select>
        </div>

        {/* Height */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Height</label>
          <input
            type="text"
            value={patient.height || ''}
            onChange={(e) => handleInputChange('height', e.target.value)}
            placeholder="e.g. 175 cm"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Weight</label>
          <input
            type="text"
            value={patient.weight || ''}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            placeholder="e.g. 72 kg"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Blood Group</label>
          <select
            value={patient.blood_group || 'O+'}
            onChange={(e) => handleInputChange('blood_group', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition-all"
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
      </div>

      {/* Medical History & Current Medication */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Medical History</label>
          <input
            type="text"
            value={patient.medical_history || ''}
            onChange={(e) => handleInputChange('medical_history', e.target.value)}
            placeholder="e.g. Hypertension, Asthma, Diabetes"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Current Medication</label>
          <input
            type="text"
            value={patient.current_medication || ''}
            onChange={(e) => handleInputChange('current_medication', e.target.value)}
            placeholder="e.g. Lisinopril 10mg, Metformin"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>
      </div>

      {/* Symptoms & Severity Dropdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Clinical Symptoms Description <span className="text-rose-400">*</span>
          </label>
          <VoiceInput onSpeechText={handleSpeechText} disabled={isSubmitting} />
        </div>

        <textarea
          required
          rows={4}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Describe onset, duration, pain characteristics, temperature, location, and associated discomfort..."
          className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-y"
        />

        {/* Severity Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="w-full sm:w-64">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Perceived Severity</label>
            <select
              value={patient.severity || 'Moderate'}
              onChange={(e) => handleInputChange('severity', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
            >
              <option value="Low">Low - Mild discomfort</option>
              <option value="Moderate">Moderate - Noticeable interference</option>
              <option value="Severe">Severe - Acute / Intense symptoms</option>
              <option value="Critical">Critical - High distress / Urgency</option>
            </select>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Detailed descriptions enhance AI pattern accuracy</span>
          </div>
        </div>
      </div>
    </form>
  );
}
