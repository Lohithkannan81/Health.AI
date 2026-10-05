import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ImageModal({ isOpen, onClose, imageSrc, title }) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  if (!isOpen || !imageSrc) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.3, 0.6));
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-cyan-400" />
              {title || 'Medical Image Viewer'}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleRotate}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                title="Rotate 90°"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 font-medium"
              >
                Reset
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Image Display Area */}
          <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-slate-950/90 min-h-[400px]">
            <img
              src={imageSrc}
              alt="Medical Scan Zoom"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transition: 'transform 0.2s ease-out'
              }}
              className="max-h-[65vh] object-contain rounded-lg shadow-xl cursor-grab active:cursor-grabbing"
            />
          </div>

          {/* Footer controls status */}
          <div className="px-6 py-2.5 border-t border-slate-800 bg-slate-950/60 text-xs text-slate-400 flex items-center justify-between">
            <span>Zoom Level: {Math.round(zoom * 100)}%</span>
            <span>Rotation: {rotation}°</span>
            <span className="text-[11px] text-cyan-400">High-Resolution Diagnostic Canvas</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
