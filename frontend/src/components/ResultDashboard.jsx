import React, { useState } from 'react';
import { 
  Download, 
  Printer, 
  Copy, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  Activity, 
  Stethoscope, 
  Heart, 
  TestTube, 
  UserCheck, 
  Eye, 
  AlertTriangle,
  Sparkles,
  Info,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ConfidenceGauge } from './ConfidenceGauge';
import { SeverityBar } from './SeverityBar';
import { generateMedicalReportPDF } from '../utils/pdfGenerator';

export function ResultDashboard({
  patient,
  symptoms,
  result,
  imagePreview,
  onAnalyzeAgain,
  onOpenZoom,
  showToast
}) {
  const [showTests, setShowTests] = useState(false);
  const [showLifestyle, setShowLifestyle] = useState(false);

  const handleDownloadPDF = () => {
    try {
      generateMedicalReportPDF({ patient, symptoms, result, imagePreview });
      if (showToast) showToast('Medical Report PDF downloaded successfully!');
    } catch (e) {
      console.error("PDF download failed:", e);
      if (showToast) showToast('Failed to generate PDF report', 'error');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyJSON = () => {
    const textToCopy = `MEDIVISION AI CLINICAL SCREENING REPORT\n` +
      `----------------------------------------\n` +
      `Patient: ${patient.full_name || 'Anonymous'} (${patient.age || 'N/A'}y, ${patient.gender || 'N/A'})\n` +
      `Possible Finding: ${result.possible_disease}\n` +
      `Confidence: ${result.confidence}\n` +
      `Severity: ${result.severity}\n` +
      `Specialist: ${result.specialist}\n` +
      `Recommended Tests: ${result.tests ? result.tests.join(', ') : 'N/A'}\n` +
      `Disclaimer: ${result.disclaimer}`;

    navigator.clipboard.writeText(textToCopy);
    if (showToast) showToast('Report summary copied to clipboard!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 print:p-0"
    >
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm print:hidden">
        <div>
          <span className="text-xs font-bold text-[#0066ff] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#0066ff]" /> Clinical AI Screening Report
          </span>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Diagnostic Analysis Complete</h2>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white font-extrabold text-xs shadow-md shadow-[#0066ff]/20 flex items-center gap-1.5 transition-all"
          >
            <Download className="w-4 h-4" /> Download PDF Report
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5 transition-all"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
          <button
            onClick={handleCopyJSON}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5 transition-all"
          >
            <Copy className="w-4 h-4" /> Copy Summary
          </button>
          <button
            onClick={onAnalyzeAgain}
            className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066ff] font-extrabold text-xs border border-blue-200 flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-4 h-4" /> New Screening
          </button>
        </div>
      </div>

      {/* Main Clean Report Document Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Header: Primary Finding Banner */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-[#0066ff] uppercase tracking-wider flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-[#0066ff]" /> Primary Screening Finding
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              {result.possible_disease}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                Severity: {result.severity || 'Moderate'}
              </span>
            </div>
          </div>

          <div className="sm:text-right shrink-0">
            <span className="text-[11px] text-slate-500 font-medium block">Recommended Specialist</span>
            <span className="text-xs font-bold text-[#0066ff] bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl inline-block mt-1">
              👨‍⚕️ {result.specialist || 'General Medicine'}
            </span>
          </div>
        </div>

        {/* Section 1: Patient Info & Clinical Observations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Patient Symptoms Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
              <FileText className="w-4 h-4 text-[#0066ff]" /> Symptoms & Observations
            </h4>
            
            <div className="text-xs text-slate-700 space-y-1">
              <span className="font-semibold text-slate-500 block text-[11px]">Reported Symptoms:</span>
              <p className="italic text-slate-800 font-medium bg-white p-2.5 rounded-xl border border-slate-200">"{symptoms}"</p>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-[#0066ff] uppercase tracking-wider block">Key AI Evaluation Points:</span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {result.summary && result.summary.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0066ff] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Medical Image Findings Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
              <Eye className="w-4 h-4 text-[#0066ff]" /> Attached Scan Visual Findings
            </h4>

            {imagePreview ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 cursor-pointer" onClick={() => onOpenZoom(imagePreview)}>
                  <img src={imagePreview} alt="Medical scan" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <span className="text-[11px] font-bold text-[#0066ff] uppercase tracking-wider block">Radiologic Visual Pattern Analysis:</span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {result.image_findings && result.image_findings.map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] shrink-0 mt-1.5" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center space-y-1">
                <Info className="w-5 h-5 text-slate-400 mx-auto" />
                <p className="text-xs text-slate-600 font-medium">No medical scan image attached.</p>
                <p className="text-[11px] text-slate-400">Analysis performed based on clinical symptoms.</p>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Expandable Accordions for Diagnostic Tests & Lifestyle Care */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Collapsible Recommended Diagnostic Tests */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <button
              onClick={() => setShowTests(!showTests)}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2 hover:text-[#0066ff] transition-colors"
            >
              <div className="flex items-center gap-2">
                <TestTube className="w-4 h-4 text-[#0066ff]" /> Recommended Diagnostic Tests
              </div>
              <div className="flex items-center gap-1 text-[#0066ff] font-extrabold text-[11px]">
                <span>{showTests ? 'Hide' : 'Click to View'}</span>
                {showTests ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
            </button>
            
            {showTests && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2 pt-1"
              >
                {result.tests && result.tests.map((test, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0066ff] shrink-0" />
                    <span>{test}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Collapsible Lifestyle & Preventive Recommendations */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <button
              onClick={() => setShowLifestyle(!showLifestyle)}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2 hover:text-[#0066ff] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#0066ff]" /> Lifestyle & Preventive Recommendations
              </div>
              <div className="flex items-center gap-1 text-[#0066ff] font-extrabold text-[11px]">
                <span>{showLifestyle ? 'Hide' : 'Click to View'}</span>
                {showLifestyle ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
            </button>

            {showLifestyle && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2 text-xs text-slate-700 pt-1"
              >
                {result.lifestyle && result.lifestyle.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-white border border-slate-200">
                    <span className="text-[#0066ff] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 space-y-1">
          <p className="font-bold text-slate-700">Medical Screening Disclaimer</p>
          <p className="text-[11px] text-slate-500 max-w-3xl mx-auto">
            {result.disclaimer || "This report is AI-generated for educational and early screening purposes only and should not replace professional medical diagnosis."}
          </p>
        </div>

      </div>

    </motion.div>
  );
}
