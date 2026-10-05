import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, Eye, CheckCircle2, FileText, Layers, Activity } from 'lucide-react';
import { IMAGE_MODALITIES } from '../utils/sampleData';

export function ImageUploader({ imageFile, imagePreview, onImageChange, onRemoveImage, onOpenZoom }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageChange(file, reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
          Upload Medical Image / Scan <span className="text-slate-500 font-normal">(Optional)</span>
        </label>
        <span className="text-[11px] text-cyan-400 font-medium">PNG, JPG, SVG, DICOM supported</span>
      </div>

      {/* Modality Chips */}
      <div className="flex flex-wrap gap-1.5 py-1">
        {IMAGE_MODALITIES.map((mod) => (
          <span
            key={mod.name}
            className="px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] text-slate-400 font-medium flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            {mod.name}
          </span>
        ))}
      </div>

      {/* Drag & Drop Area or Preview */}
      {!imagePreview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]'
              : 'border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-900/40'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />

          <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6 animate-bounce" />
          </div>

          <h4 className="text-sm font-semibold text-slate-200">
            Drag & Drop medical image here, or <span className="text-cyan-400 underline">browse</span>
          </h4>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Supports X-Rays, MRIs, CT Scans, Ultrasounds, Cutaneous Skin Lesions, Retinal Eye Scans & Diagnostic Reports.
          </p>
        </div>
      ) : (
        /* Image Preview Box */
        <div className="relative rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0 group">
            <img
              src={imagePreview}
              alt="Medical Scan Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => onOpenZoom(imagePreview)}
              className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-cyan-300 text-xs font-semibold transition-opacity gap-1"
            >
              <Eye className="w-4 h-4" /> Click to Zoom
            </button>
          </div>

          <div className="flex-1 min-w-0 space-y-1.5 text-left">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <h4 className="text-xs font-bold text-white truncate">
                {imageFile ? imageFile.name : 'Medical Image Loaded'}
              </h4>
            </div>
            <p className="text-[11px] text-slate-400">
              Attached for AI Vision Feature Extraction & Pattern Analysis
            </p>
            <div className="flex items-center space-x-2 pt-1">
              <button
                type="button"
                onClick={() => onOpenZoom(imagePreview)}
                className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-medium hover:bg-cyan-500/30 transition-all flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> Full Zoom View
              </button>
              <button
                type="button"
                onClick={onRemoveImage}
                className="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-medium hover:bg-rose-500/20 transition-all flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Remove Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
