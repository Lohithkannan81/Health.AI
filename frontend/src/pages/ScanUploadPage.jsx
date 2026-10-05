import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  AlertCircle,
  Activity,
  Upload,
  ChevronLeft,
  ScanLine,
  ShieldCheck
} from 'lucide-react';
import { ImageUploader } from '../components/ImageUploader';
import { LoadingScreen } from '../components/LoadingScreen';
import { ResultDashboard } from '../components/ResultDashboard';
import { analyzePatientData } from '../services/api';
import { useAuth } from '../context/AuthContext';

export function ScanUploadPage({
  patient,
  symptoms,
  onBackToSymptoms,
  onOpenZoom,
  showToast
}) {
  const { user } = useAuth();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageChange = (file, previewUrl) => {
    setImageFile(file);
    setImagePreview(previewUrl);
    if (showToast) showToast('Medical image attached successfully!');
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (showToast) showToast('Image removed.');
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!symptoms.trim()) {
      setErrorMessage('No symptoms provided. Please go back and enter symptoms first.');
      return;
    }
    setStatus('analyzing');
    setErrorMessage('');
    try {
      const response = await analyzePatientData({ patient, symptoms, imageFile, imageBase64: imagePreview });
      if (response && response.analysis) {
        setAnalysisResult(response.analysis);
        setStatus('result');
        if (showToast) showToast('AI Clinical Vision Analysis finished!');
        const savedReports = JSON.parse(localStorage.getItem('medivision_reports_history') || '[]');
        const newReport = {
          id: Date.now(),
          userEmail: user?.email || 'anonymous',
          timestamp: new Date().toISOString(),
          patient,
          symptoms,
          analysis: response.analysis,
          imagePreview: imagePreview ? imagePreview.slice(0, 10000) : null
        };
        localStorage.setItem('medivision_reports_history', JSON.stringify([newReport, ...savedReports]));
      } else {
        throw new Error('Received empty response from AI analysis engine.');
      }
    } catch (err) {
      console.error('Analysis Error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'An error occurred during AI screening.');
      if (showToast) showToast('Analysis failed. Please check backend API server.', 'error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setAnalysisResult(null);
    setErrorMessage('');
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6 font-sans">
      {status === 'analyzing' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl">
          <LoadingScreen hasImage={!!(imageFile || imagePreview)} />
        </motion.div>
      )}
      {status === 'result' && analysisResult && (
        <ResultDashboard patient={patient} symptoms={symptoms} result={analysisResult} imagePreview={imagePreview} onAnalyzeAgain={handleReset} onOpenZoom={onOpenZoom} showToast={showToast} />
      )}
      {(status === 'idle' || status === 'error') && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <button type="button" onClick={onBackToSymptoms} className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-[#0066FF] transition-colors mb-2">
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Symptoms</span>
                </button>
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0066FF] text-xs font-semibold mb-1 ml-0 block w-fit">
                  <ScanLine className="w-3.5 h-3.5 inline mr-1" />
                  Step 2 - Medical Scan Upload
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Attach Medical Scan</h1>
                <p className="text-xs text-slate-500 mt-1">Upload an X-Ray, CT Scan, MRI, or Dermoscopy image for AI-powered visual analysis. This step is optional.</p>
              </div>
              {symptoms && (
                <div className="flex items-start space-x-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono shrink-0 max-w-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">Symptoms: "{symptoms.slice(0, 60)}{symptoms.length > 60 ? '...' : ''}"</span>
                </div>
              )}
            </div>
          </div>
          {status === 'error' && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start space-x-3 text-rose-700 text-xs">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1"><h4 className="font-bold">Analysis Error</h4><p>{errorMessage}</p></div>
              <button onClick={handleReset} className="text-xs font-bold underline">Retry</button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#0066FF]" /> Attach Medical Scan (X-Ray / MRI / CT / Dermoscopy)
              </h3>
              <ImageUploader imageFile={imageFile} imagePreview={imagePreview} onImageChange={handleImageChange} onRemoveImage={handleRemoveImage} onOpenZoom={onOpenZoom} />
            </div>
            <div className="pt-4 border-t border-slate-100">
              <button type="submit" className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0EA5E9] hover:from-blue-600 hover:to-sky-600 text-white font-extrabold text-sm shadow-xl shadow-blue-500/20 flex items-center justify-center space-x-3 transition-all transform hover:scale-[1.01]">
                <Activity className="w-5 h-5 text-white animate-pulse" />
                <span>Run AI Disease Screening Analysis</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}
