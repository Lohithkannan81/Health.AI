import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileImage,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Download,
  MessageSquare,
  Activity,
  ShieldAlert,
  Info,
  Layers,
  ZoomIn,
  X,
  Stethoscope,
  ChevronRight,
  FileCheck
} from 'lucide-react';
import { analyzeMedicalImage } from '../services/api';
import { generateImageAnalysisReportPDF } from '../utils/pdfGenerator';
import { useAuth } from '../context/AuthContext';

const SUPPORTED_MODALITIES = [
  { id: 'chest', name: 'Chest X-Ray', desc: 'Pulmonary infiltrates, pneumonia, nodules' },
  { id: 'derm', name: 'Skin Lesion', desc: 'Dermoscopic rash & cutaneous atypical mole screening' },
  { id: 'brain', name: 'Brain MRI / CT', desc: 'Cerebrovascular & structural head scans' },
  { id: 'ortho', name: 'Bone & Joint X-Ray', desc: 'Fractures, disc space & joint alignment' },
  { id: 'dental', name: 'Dental Radiograph', desc: 'Caries, bone loss & apical lesions' },
  { id: 'eye', name: 'Retinal Scan', desc: 'Optic disc & vascular macula evaluation' },
];

export function ImageAnalysisPage({ onNavigateChatbot, onOpenZoom, showToast }) {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageMeta, setImageMeta] = useState(null);
  const [userNotes, setUserNotes] = useState('');
  
  const [status, setStatus] = useState('idle'); // 'idle' | 'validating' | 'analyzing' | 'result' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef(null);

  // File selection & client validation handler
  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;

    // 1. File Type Check
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(selectedFile.type.toLowerCase())) {
      const err = 'Unsupported file format! Please upload a JPG, PNG, or WEBP medical image.';
      setErrorMessage(err);
      if (showToast) showToast(err, 'error');
      return;
    }

    // 2. File Size Check (10MB)
    const maxBytes = 10 * 1024 * 1024;
    if (selectedFile.size > maxBytes) {
      const err = `File size (${(selectedFile.size / (1024 * 1024)).toFixed(2)}MB) exceeds maximum limit of 10MB.`;
      setErrorMessage(err);
      if (showToast) showToast(err, 'error');
      return;
    }

    setErrorMessage('');
    setFile(selectedFile);

    // Read preview & inspect dimensions
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewUrl = e.target.result;
      setPreview(previewUrl);

      const img = new Image();
      img.onload = () => {
        setImageMeta({
          fileName: selectedFile.name,
          fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
          mimeType: selectedFile.type || 'image/png',
          dimensions: `${img.width} x ${img.height} px`,
          width: img.width,
          height: img.height
        });
      };
      img.src = previewUrl;
    };
    reader.readAsDataURL(selectedFile);

    if (showToast) showToast('Medical image attached and validated!');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
    setImageMeta(null);
    setErrorMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Submit Image for AI Analysis
  const handleRunAnalysis = async (e) => {
    if (e) e.preventDefault();
    if (!file && !preview) {
      setErrorMessage('Please select or drag a medical image to analyze.');
      return;
    }

    setStatus('analyzing');
    setErrorMessage('');

    try {
      const response = await analyzeMedicalImage({
        imageFile: file,
        imageBase64: preview,
        userNotes
      });

      if (response && response.success && response.analysis) {
        setAnalysisResult(response.analysis);
        setStatus('result');

        if (showToast) showToast('AI Vision Image Analysis Completed!');

        // Save session to localStorage history
        const historyItem = {
          id: Date.now(),
          userEmail: user?.email || 'anonymous',
          type: 'image_analysis',
          timestamp: new Date().toISOString(),
          imageType: response.analysis.image_type,
          summary: response.analysis.overall_assessment,
          confidence: response.analysis.confidence,
          result: response.analysis,
          imagePreview: preview ? preview.slice(0, 15000) : null
        };
        const savedHistory = JSON.parse(localStorage.getItem('medivision_reports_history') || '[]');
        localStorage.setItem('medivision_reports_history', JSON.stringify([historyItem, ...savedHistory]));
      } else {
        throw new Error('Invalid response structure returned by analysis engine.');
      }
    } catch (err) {
      console.error('Image analysis error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to complete AI medical image analysis.');
      if (showToast) showToast(err.message || 'Image analysis failed.', 'error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setAnalysisResult(null);
    setErrorMessage('');
    handleRemoveImage();
    setUserNotes('');
  };

  const handleDownloadPDF = () => {
    if (!analysisResult) return;
    generateImageAnalysisReportPDF({
      analysis: analysisResult,
      imagePreview: preview,
      userNotes
    });
    if (showToast) showToast('Downloading AI Image Analysis PDF Report...');
  };

  const handleAskChatbot = () => {
    if (!analysisResult) return;
    if (onNavigateChatbot) {
      onNavigateChatbot(analysisResult);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6 font-sans">
      
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>AI-BASED MEDICAL IMAGE VISION ENGINE</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Medical Image Analysis & Early Disease Detection
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
              Upload diagnostic images (Radiographs, MRI, CT, Dermoscopy) for instant AI visual feature extraction, abnormality detection, and preliminary screening insights.
            </p>
          </div>

          <div className="hidden lg:flex flex-col gap-2 shrink-0">
            <div className="px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs font-mono">
              <span className="text-slate-400 block text-[10px]">FORMATS SUPPORTED</span>
              <span className="font-bold text-slate-800">JPG, PNG, WEBP (&lt; 10MB)</span>
            </div>
            <div className="px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-left text-xs font-mono">
              <span className="text-emerald-600 block text-[10px]">RECOGNITION CORE</span>
              <span className="font-bold text-emerald-700">Gemini 2.5 Vision Engine</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 1. UPLOAD & PREPROCESSING STAGE (IDLE / ERROR / ANALYZING) ────────────────── */}
      {(status === 'idle' || status === 'error' || status === 'analyzing') && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          {/* Error Banner */}
          {status === 'error' && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start space-x-3 text-rose-700 text-xs">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-bold">Analysis Error</h4>
                <p>{errorMessage}</p>
              </div>
              <button onClick={() => setStatus('idle')} className="text-xs font-bold underline">
                Dismiss
              </button>
            </div>
          )}

          {/* Loading State Overlay */}
          {status === 'analyzing' ? (
            <div className="p-10 rounded-3xl bg-white border border-slate-200 shadow-xl text-center space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto shadow-sm">
                <Activity className="w-8 h-8 text-[#0066FF] animate-spin" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-lg font-black text-slate-900">Processing Medical Image...</h3>
                <p className="text-xs text-slate-500">
                  Running automated file validation, color space normalization, and deep multi-modal vision feature extraction.
                </p>
              </div>

              {/* Workflow Stepper Progress */}
              <div className="max-w-md mx-auto grid grid-cols-3 gap-2 text-[11px] font-mono font-bold text-left pt-2">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Validated</span>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#0066FF] animate-pulse" />
                  <span>Preprocessing</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Vision Analysis</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Drag & Drop Box */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#0066FF]" /> 1. Upload Medical Image
                  </h3>

                  {!preview ? (
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
                        dragActive
                          ? 'border-[#0066FF] bg-blue-50/50 scale-[0.99]'
                          : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                        className="hidden"
                      />

                      <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4 text-[#0066FF]">
                        <FileImage className="w-8 h-8" />
                      </div>

                      <h4 className="text-sm font-extrabold text-slate-900">
                        Drag and drop your medical image here
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 mb-4">
                        or click to browse from your computer (JPG, PNG, WEBP up to 10MB)
                      </p>

                      <span className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-sm">
                        Select File
                      </span>
                    </div>
                  ) : (
                    /* Image Preview Card */
                    <div className="space-y-4">
                      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 group max-h-80 flex items-center justify-center">
                        <img
                          src={preview}
                          alt="Medical Scan Preview"
                          className="max-h-80 object-contain w-auto mx-auto"
                        />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => onOpenZoom && onOpenZoom(preview)}
                            className="p-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs flex items-center gap-1.5 shadow-lg"
                          >
                            <ZoomIn className="w-4 h-4 text-[#0066FF]" /> Inspect Fullscreen
                          </button>
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="p-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg"
                          >
                            <X className="w-4 h-4" /> Change Image
                          </button>
                        </div>
                      </div>

                      {/* Image Metadata Bar */}
                      {imageMeta && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono bg-slate-50 p-3 rounded-2xl border border-slate-200">
                          <div>
                            <span className="text-slate-400 block text-[10px]">FILE NAME</span>
                            <span className="font-bold text-slate-800 truncate block max-w-[120px]">
                              {imageMeta.fileName}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">RESOLUTION</span>
                            <span className="font-bold text-slate-800">{imageMeta.dimensions}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">SIZE</span>
                            <span className="font-bold text-slate-800">{imageMeta.fileSize}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">VALIDATION</span>
                            <span className="font-bold text-emerald-600 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Ready
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Clinical Notes (Optional) */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-[#0066FF]" />
                      Clinical Context / Patient Symptoms (Optional)
                    </label>
                    <textarea
                      value={userNotes}
                      onChange={(e) => setUserNotes(e.target.value)}
                      placeholder="Enter optional clinical notes or symptoms (e.g., Persistent cough for 2 weeks, skin spot itching)..."
                      rows={3}
                      className="w-full p-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>

                  {/* Run Button */}
                  <button
                    onClick={handleRunAnalysis}
                    disabled={!preview}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0EA5E9] hover:from-blue-600 hover:to-sky-600 text-white font-extrabold text-sm shadow-xl shadow-blue-500/20 flex items-center justify-center space-x-2 disabled:opacity-40 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Run AI Medical Vision Analysis</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>

                </div>
              </div>

              {/* Right Column: Supported Modalities Guide */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#0066FF]" /> Supported Image Modalities
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    The vision engine recognizes key radiological and clinical features across standard medical image categories:
                  </p>

                  <div className="space-y-2.5">
                    {SUPPORTED_MODALITIES.map((mod) => (
                      <div
                        key={mod.id}
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3 text-xs"
                      >
                        <ChevronRight className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-slate-900">{mod.name}</h4>
                          <p className="text-[11px] text-slate-500">{mod.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-start space-x-2">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>Note:</strong> Non-medical images or unreadable scans will automatically return an inconclusive notification.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </motion.div>
      )}

      {/* ── 2. STRUCTURED RESULTS DISPLAY STAGE ───────────────────────────────────────── */}
      {status === 'result' && analysisResult && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          {/* Status Banner */}
          <div className="bg-emerald-500 text-white rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <FileCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-emerald-100">
                  AI VISION SCREENING COMPLETE
                </span>
                <h2 className="text-xl font-black text-white">{analysisResult.image_type}</h2>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-2 shadow-sm transition-all"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>Download Report PDF</span>
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold flex items-center space-x-1.5 transition-all"
              >
                <RotateCcw className="w-4 h-4 text-slate-700" />
                <span>New Scan</span>
              </button>
            </div>
          </div>

          {/* Workflow Stepper (Complete) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-4 grid grid-cols-3 gap-3 text-xs font-mono font-bold">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>✓ Image Uploaded</span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>✓ Image Validated</span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>✓ AI Analysis Complete</span>
            </div>
          </div>

          {/* Main Grid: Image Preview + Specifications vs AI Findings */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Box: Uploaded Image & Specs */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Analyzed Scan Preview
                </h3>

                {preview && (
                  <div
                    onClick={() => onOpenZoom && onOpenZoom(preview)}
                    className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 cursor-pointer group flex items-center justify-center max-h-72"
                  >
                    <img src={preview} alt="Analyzed Scan" className="max-h-72 object-contain w-auto mx-auto" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                      <ZoomIn className="w-4 h-4 text-sky-400" /> Click to Zoom
                    </div>
                  </div>
                )}

                {/* Specs Box */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px]">IMAGE TYPE</span>
                    <span className="font-bold text-slate-900">{analysisResult.image_type}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">IMAGE QUALITY</span>
                    <span className={`font-bold ${analysisResult.image_quality === 'Good' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {analysisResult.image_quality}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">RESOLUTION</span>
                    <span className="font-bold text-slate-900">{analysisResult.resolution || 'Standard'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">CONFIDENCE</span>
                    <span className="font-bold text-[#0066FF]">{analysisResult.confidence}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box: Visual Findings & Possible Conditions */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Inconclusive / Poor Quality Warning if applicable */}
              {(analysisResult.image_type.includes('Non-Medical') || analysisResult.overall_assessment.includes('Unable to provide a reliable analysis')) && (
                <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                  <div className="flex items-center space-x-2 font-bold text-sm text-amber-700">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>Inconclusive Image Analysis</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed font-medium">
                    {analysisResult.overall_assessment}
                  </p>
                </div>
              )}

              {/* Observed Findings Cards */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center justify-between">
                  <span>AI Visual Findings</span>
                  <span className="text-xs font-mono font-normal text-slate-400">
                    {analysisResult.findings?.length || 0} features observed
                  </span>
                </h3>

                <div className="space-y-3">
                  {analysisResult.findings && analysisResult.findings.length > 0 ? (
                    analysisResult.findings.map((f, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-xs font-bold text-[#0066FF] block">{f.finding}</span>
                        <p className="text-xs text-slate-600 leading-relaxed">{f.description}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">No specific focal abnormalities identified in this scan.</p>
                  )}
                </div>
              </div>

              {/* Possible Conditions Cards */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-black text-slate-900 tracking-tight">
                  Possible Conditions & Risk Alignment
                </h3>

                <div className="space-y-3">
                  {analysisResult.possible_conditions && analysisResult.possible_conditions.length > 0 ? (
                    analysisResult.possible_conditions.map((c, i) => {
                      const l = (c.likelihood || '').toLowerCase();
                      let badgeStyle = 'bg-blue-100 text-blue-700 border-blue-200';
                      if (l.includes('high')) badgeStyle = 'bg-rose-100 text-rose-700 border-rose-200';
                      if (l.includes('moderate')) badgeStyle = 'bg-amber-100 text-amber-700 border-amber-200';

                      return (
                        <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">{c.condition}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${badgeStyle}`}>
                              {c.likelihood} Likelihood
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">{c.reason}</p>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-slate-400 italic">No clinical conditions identified.</p>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Card: Overall Assessment & Recommendation */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Overall Preliminary Assessment
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {analysisResult.overall_assessment}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Clinical Recommendations
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {analysisResult.recommendation}
                </p>
              </div>

            </div>

            {/* Action Bar: Chatbot Follow-up & PDF Download */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <button
                onClick={handleAskChatbot}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0EA5E9] hover:from-blue-600 hover:to-sky-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-center space-x-2 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Ask AI Chatbot About This Result</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={handleDownloadPDF}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>Generate Official Medical PDF Report</span>
              </button>

            </div>
          </div>

          {/* Mandatory Clinical Disclaimer Banner */}
          <div className="p-5 rounded-3xl bg-blue-50 border border-blue-200 flex items-start space-x-3 text-blue-900 text-xs">
            <ShieldAlert className="w-5 h-5 text-[#0066FF] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-bold">Medical Disclaimer & Clinical Notice:</h5>
              <p className="text-[11px] text-blue-700 leading-relaxed">
                {analysisResult.disclaimer || 'This system provides AI-assisted preliminary analysis for educational and screening purposes only. It is not a substitute for professional medical diagnosis. Please consult a qualified healthcare professional for medical advice.'}
              </p>
            </div>
          </div>

        </motion.div>
      )}

    </div>
  );
}
