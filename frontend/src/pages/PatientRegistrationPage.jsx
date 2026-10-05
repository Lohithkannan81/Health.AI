import React from 'react';
import { 
  User, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Pill, 
  Heart, 
  Scale, 
  UserPlus
} from 'lucide-react';
import { SAMPLE_PRESETS } from '../utils/sampleData';

export function PatientRegistrationPage({ patient, setPatient, onNextToSymptoms, showToast }) {
  const handleInputChange = (field, value) => {
    setPatient(prev => ({ ...prev, [field]: value }));
  };

  const handleLoadPreset = (preset) => {
    setPatient(preset.patient);
    if (showToast) showToast(`Loaded patient parameters for: ${preset.title}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patient.full_name || !patient.age) {
      if (showToast) showToast('Please enter patient full name and age.', 'error');
      return;
    }
    if (showToast) showToast('Patient profile registered! Proceed to upload symptoms.', 'success');
    onNextToSymptoms?.();
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="spatial-card-elevated rounded-3xl p-6 sm:p-8 space-y-3 border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111112] border border-amber-500/20 text-[#F6A80D] text-xs font-mono font-bold mb-2">
              <UserPlus className="w-3.5 h-3.5" />
              <span>Step 1 of 2 • Patient Registration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#F7F3F6] tracking-tight">
              Register Patient Profile
            </h1>
            <p className="text-xs text-[#A7A2A5] mt-1">
              Enter clinical demographics and medical parameters before uploading symptoms and diagnostic scans.
            </p>
          </div>

          <span className="text-xs font-mono bg-[#050505] text-[#F6A80D] px-3 py-1.5 rounded-xl border border-amber-500/20 shrink-0">
            Confidential Record
          </span>
        </div>

        {/* Demo Case Quick Presets */}
        <div className="flex items-center space-x-2 pt-2">
          <span className="text-xs text-[#F6A80D] font-mono font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#F6A80D]" /> Load Sample Case:
          </span>
          <div className="flex space-x-2 overflow-x-auto py-1">
            {SAMPLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleLoadPreset(preset)}
                className="px-3 py-1 rounded-xl bg-[#111112] hover:bg-[#171718] text-[#F7F3F6] border border-amber-500/20 text-xs font-mono whitespace-nowrap transition-all"
              >
                {preset.modality} Demo
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="spatial-card rounded-3xl p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-base font-extrabold text-[#F7F3F6] flex items-center gap-2">
            <User className="w-5 h-5 text-[#F6A80D]" /> Demographic Parameters
          </h3>
          <span className="text-xs text-[#6E696C] font-semibold">* Required fields</span>
        </div>

        {/* Patient Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#A7A2A5]">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={patient.full_name}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-3.5 py-2.5 rounded-xl input-dark-luxury text-xs placeholder:text-[#6E696C]"
            />
          </div>

          {/* Age */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#A7A2A5]">
              Age (Years) *
            </label>
            <input
              type="number"
              required
              min="1"
              max="120"
              value={patient.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              placeholder="e.g. 45"
              className="w-full px-3.5 py-2.5 rounded-xl input-dark-luxury text-xs placeholder:text-[#6E696C]"
            />
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#A7A2A5]">
              Gender
            </label>
            <select
              value={patient.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl input-dark-luxury text-xs"
            >
              <option value="Male" className="bg-[#050505] text-[#F7F3F6]">Male</option>
              <option value="Female" className="bg-[#050505] text-[#F7F3F6]">Female</option>
              <option value="Other" className="bg-[#050505] text-[#F7F3F6]">Other</option>
            </select>
          </div>

          {/* Height */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#A7A2A5] flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-[#F6A80D]" /> Height (cm)
            </label>
            <input
              type="number"
              value={patient.height}
              onChange={(e) => handleInputChange('height', e.target.value)}
              placeholder="e.g. 175"
              className="w-full px-3.5 py-2.5 rounded-xl input-dark-luxury text-xs placeholder:text-[#6E696C]"
            />
          </div>

          {/* Weight */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#A7A2A5] flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-[#F6A80D]" /> Weight (kg)
            </label>
            <input
              type="number"
              value={patient.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              placeholder="e.g. 70"
              className="w-full px-3.5 py-2.5 rounded-xl input-dark-luxury text-xs placeholder:text-[#6E696C]"
            />
          </div>

          {/* Blood Group */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#A7A2A5] flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-[#F6A80D]" /> Blood Group
            </label>
            <select
              value={patient.blood_group}
              onChange={(e) => handleInputChange('blood_group', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl input-dark-luxury text-xs"
            >
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                <option key={bg} value={bg} className="bg-[#050505] text-[#F7F3F6]">{bg}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Medical History & Current Medication */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#A7A2A5] flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#F6A80D]" /> Past Medical History
            </label>
            <textarea
              rows={3}
              value={patient.medical_history}
              onChange={(e) => handleInputChange('medical_history', e.target.value)}
              placeholder="e.g. Type 2 Diabetes, Hypertension, Asthma"
              className="w-full p-3 rounded-xl input-dark-luxury text-xs placeholder:text-[#6E696C]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#A7A2A5] flex items-center gap-1">
              <Pill className="w-3.5 h-3.5 text-[#F6A80D]" /> Current Medication
            </label>
            <textarea
              rows={3}
              value={patient.current_medication}
              onChange={(e) => handleInputChange('current_medication', e.target.value)}
              placeholder="e.g. Metformin 500mg, Lisinopril 10mg"
              className="w-full p-3 rounded-xl input-dark-luxury text-xs placeholder:text-[#6E696C]"
            />
          </div>

        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-[#A7A2A5] font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>End-to-End Ephemeral Buffer</span>
          </div>

          <button
            type="submit"
            className="btn-amber-primary px-6 py-3 rounded-2xl text-xs font-bold text-white flex items-center space-x-2 shadow-lg"
          >
            <span>Save & Proceed to Upload Symptoms</span>
            <ArrowRight className="w-4 h-4 text-[#F6A80D]" />
          </button>
        </div>

      </form>

    </div>
  );
}
