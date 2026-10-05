import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, ArrowRight, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { PatientForm } from '../components/PatientForm';
import { ImageUploader } from '../components/ImageUploader';
import { LoadingScreen } from '../components/LoadingScreen';
import { ResultDashboard } from '../components/ResultDashboard';
import { analyzePatientData } from '../services/api';

export function AnalysisPage({ onOpenZoom, showToast }) {
  const [patient, setPatient] = useState({
    full_name: '',
    age: '',
    gender: 'Male',
    height: '',
    weight: '',
    blood_group: 'O+',
    medical_history: '',
    current_medication: '',
    severity: 'Moderate'
  });

  const [symptoms, setSymptoms] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [status, setStatus] = useState('idle'); // 'idle' | 'analyzing' | 'result' | 'error'
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

  const handleLoadPreset = (preset) => {
    setPatient(preset.patient);
    setSymptoms(preset.symptoms);
    setImagePreview(preset.image);
    setImageFile(null);
    if (showToast) showToast(`Loaded demo case: ${preset.title}`);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!symptoms.trim()) {
      setErrorMessage('Please describe the clinical symptoms before proceeding.');
      return;
    }

    setStatus('analyzing');
    setErrorMessage('');

    try {
      const response = await analyzePatientData({
        patient,
        symptoms,
        imageFile,
        imageBase64: imagePreview
      });

      if (response && response.analysis) {
        setAnalysisResult(response.analysis);
        setStatus('result');
        if (showToast) showToast('AI Clinical Analysis completed successfully!');

        // Save report to localStorage history
        const savedReports = JSON.parse(localStorage.getItem('medivision_reports_history') || '[]');
        const newReport = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          patient,
          symptoms,
          analysis: response.analysis,
          imagePreview: imagePreview ? imagePreview.slice(0, 10000) : null // Store snippet/thumbnail
        };
        localStorage.setItem('medivision_reports_history', JSON.stringify([newReport, ...savedReports]));
      } else {
        throw new Error('Received empty response from AI analysis engine.');
      }
    } catch (err) {
      console.error("Analysis Error:", err);
      setStatus('error');
      setErrorMessage(err.message || 'An error occurred during AI image & symptom analysis.');
      if (showToast) showToast('Analysis failed. Please check backend connection.', 'error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setAnalysisResult(null);
    setErrorMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6">
      
      {/* State 1: Loading Screen */}
      {status === 'analyzing' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl"
        >
          <LoadingScreen hasImage={!!(imageFile || imagePreview)} />
        </motion.div>
      )}

      {/* State 2: Result Dashboard */}
      {status === 'result' && analysisResult && (
        <ResultDashboard
          patient={patient}
          symptoms={symptoms}
          result={analysisResult}
          imagePreview={imagePreview}
          onAnalyzeAgain={handleReset}
          onOpenZoom={onOpenZoom}
          showToast={showToast}
        />
      )}

      {/* State 3: Analysis Form (Idle or Error) */}
      {(status === 'idle' || status === 'error') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-2xl shadow-2xl space-y-8"
        >
          {/* Form Banner Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" /> AI Medical Image & Symptom Screening
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight mt-1">
                New Clinical Case Analysis
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              HIPAA Compliant Session
            </span>
          </div>

          {/* Error Banner if any */}
          {status === 'error' && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start space-x-3 text-rose-300 text-xs">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-bold">Analysis Execution Error</h4>
                <p>{errorMessage}</p>
              </div>
              <button onClick={handleReset} className="text-xs font-bold underline hover:text-white">
                Retry
              </button>
            </div>
          )}

          {/* Form Component */}
          <PatientForm
            patient={patient}
            setPatient={setPatient}
            symptoms={symptoms}
            setSymptoms={setSymptoms}
            onSubmit={handleSubmit}
            onLoadPreset={handleLoadPreset}
            isSubmitting={status === 'analyzing'}
          />

          {/* Image Uploader Component */}
          <div className="border-t border-slate-800 pt-6">
            <ImageUploader
              imageFile={imageFile}
              imagePreview={imagePreview}
              onImageChange={handleImageChange}
              onRemoveImage={handleRemoveImage}
              onOpenZoom={onOpenZoom}
            />
          </div>

          {/* Large Submit Button */}
          <div className="pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-extrabold text-base shadow-xl shadow-cyan-500/25 flex items-center justify-center space-x-3 transition-all transform hover:scale-[1.01]"
            >
              <Stethoscope className="w-6 h-6 animate-pulse" />
              <span>Run AI Disease Screening Analysis</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
