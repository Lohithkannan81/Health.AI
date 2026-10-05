import React from 'react';
import { 
  Stethoscope, 
  ArrowRight, 
  Sparkles, 
  Upload
} from 'lucide-react';
import { VoiceInput } from '../components/VoiceInput';

export function SymptomUploadPage({ 
  patient, 
  symptoms, 
  setSymptoms, 
  onBackToRegistration,
  onNextToScan,
  showToast 
}) {
  const handleSpeechText = (text) => {
    setSymptoms(prev => (prev ? `${prev} ${text}` : text));
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6 font-sans">

      {/* Clinical Form */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">

        {/* Symptoms Input Field */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[#0066FF]" /> Patient Symptoms &amp; Clinical Observations
            </h3>
            {/* Voice Input Trigger */}
            <VoiceInput onSpeechResult={handleSpeechText} />
          </div>

          <textarea
            rows={5}
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe patient symptoms (e.g., persistent dry cough, chest pain on deep inspiration, fever for 3 days, dyspnea)..."
            className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all shadow-inner"
          />

          {/* Quick Symptom Chips */}
          <div className="space-y-2 pt-1">
            <p className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" /> Quick-select clinical symptoms:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                "🫁 Shortness of breath & dyspnea",
                "🫀 Chest tightness & pressure",
                "🌡️ High fever & chills",
                "🩻 Productive cough & congestion",
                "🧴 Cutaneous rash & erythema",
                "🧠 Severe headache & dizziness",
                "🦴 Lumbar spine pain & joint stiffness",
                "🤢 Abdominal pain & nausea"
              ].map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const cleanChip = chip.replace(/^[^\s]+\s*/, '');
                    setSymptoms(prev => prev ? `${prev}, ${cleanChip}` : cleanChip);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-[#0066FF] border border-slate-200 text-slate-700 text-xs font-medium transition-all"
                >
                  + {chip}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Next: Go to Scan Upload Page */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onNextToScan}
            className="inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0EA5E9] hover:from-blue-600 hover:to-sky-600 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Upload className="w-4 h-4 text-white" />
            <span>Next: Attach Medical Scan</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>
    </div>
  );
}


