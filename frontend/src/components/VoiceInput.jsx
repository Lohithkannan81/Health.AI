import React from 'react';
import { Mic, MicOff, Volume2, AlertCircle } from 'lucide-react';
import { useSpeechToText } from '../hooks/useSpeechToText';

export function VoiceInput({ onSpeechText, disabled }) {
  const { isListening, isSupported, error, toggleListening } = useSpeechToText((text) => {
    if (onSpeechText) {
      onSpeechText(text);
    }
  });

  if (!isSupported) {
    return (
      <span className="text-[11px] text-slate-500 flex items-center gap-1 italic">
        <AlertCircle className="w-3 h-3" /> Voice dictation unavailable in this browser
      </span>
    );
  }

  return (
    <div className="inline-flex items-center space-x-2">
      <button
        type="button"
        onClick={toggleListening}
        disabled={disabled}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          isListening
            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse shadow-lg shadow-rose-500/20'
            : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20'
        }`}
        title={isListening ? "Click to stop voice recording" : "Dictate symptoms via Voice-to-Text"}
      >
        {isListening ? (
          <>
            <MicOff className="w-3.5 h-3.5 text-rose-400" />
            <span>Listening...</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          </>
        ) : (
          <>
            <Mic className="w-3.5 h-3.5 text-cyan-400" />
            <span>Voice Input</span>
          </>
        )}
      </button>

      {error && (
        <span className="text-[10px] text-rose-400 truncate max-w-[150px]">{error}</span>
      )}
    </div>
  );
}
