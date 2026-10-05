import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileSpreadsheet, Search, Trash2, Download, Calendar,
  Activity, MessageSquare, ChevronDown, ChevronUp, Bot, User, Stethoscope, Sparkles
} from "lucide-react";
import { generateMedicalReportPDF, generateChatbotReportPDF, generateImageAnalysisReportPDF } from "../utils/pdfGenerator";
import { useAuth } from "../context/AuthContext";

function MiniMarkdown({ text }) {
  if (!text) return null;
  const lines = text.split("\n");
  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => {
        if (line.startsWith("## "))
          return <p key={i} className="font-black text-slate-900 text-xs mt-2">{line.replace("## ", "")}</p>;
        if (line.startsWith("**") && line.includes(":**")) {
          const parts = line.split(":**");
          const label = parts[0].replace(/\*\*/g, "");
          const val = parts.slice(1).join(":").replace(/\*\*/g, "").trim();
          return (
            <p key={i} className="text-[11px] text-slate-700">
              <span className="font-bold text-slate-900">{label}:</span> {val}
            </p>
          );
        }
        if (line.startsWith("- ") || line.startsWith("* "))
          return <li key={i} className="text-[11px] text-slate-600 ml-3 list-disc">{line.slice(2)}</li>;
        if (line.trim() === "") return <div key={i} className="h-1" />;
        const ps = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-[11px] text-slate-700 leading-relaxed">
            {ps.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
          </p>
        );
      })}
    </div>
  );
}

function RiskBadge({ text = "" }) {
  const t = text.toLowerCase();
  if (t.includes("emergency")) return <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-100 text-red-700 border border-red-300">EMERGENCY</span>;
  if (t.includes("high")) return <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-orange-100 text-orange-700 border border-orange-200">HIGH RISK</span>;
  if (t.includes("moderate")) return <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-700 border border-amber-200">MODERATE</span>;
  return <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700 border border-emerald-200">LOW RISK</span>;
}

function ChatbotReportCard({ item, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const resultMsg = item.conversation?.find(m => m.role === "assistant" && m.content.includes("## Screening Result"));
  const riskMatch = resultMsg?.content.match(/\*\*Risk level:\*\*\s*([^\n*]+)/i);
  const riskLevel = riskMatch?.[1]?.trim() || "";

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#0066FF] border border-blue-200">
              <MessageSquare className="w-3 h-3" /> Chatbot Session
            </span>
            {riskLevel && <RiskBadge text={riskLevel} />}
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">{item.diseaseName}</h3>
          <p className="text-[11px] text-slate-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(item.timestamp).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            {" · "}
            {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <button onClick={onDelete} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all shrink-0">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex gap-3 text-[11px] text-slate-500">
        <span>Messages: {item.conversation?.length || 0}</span>
        <span>Answers: {item.conversation?.filter(m => m.role === "user").length || 0}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex-1 flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-xs font-semibold text-slate-600 hover:text-[#0066FF] transition-all"
        >
          <span>{expanded ? "Hide" : "View"} Full Conversation</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={() => generateChatbotReportPDF({ item })}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shrink-0"
        >
          <Download className="w-3.5 h-3.5" /> PDF
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="space-y-2 pt-1 max-h-96 overflow-y-auto pr-1">
              {item.conversation?.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${msg.role === "assistant" ? "bg-blue-50 border border-blue-200" : "bg-slate-100 border border-slate-200"}`}>
                    {msg.role === "assistant"
                      ? (msg.content.includes("## Screening Result") ? <Stethoscope className="w-3 h-3 text-[#0066FF]" /> : <Bot className="w-3 h-3 text-[#0066FF]" />)
                      : <User className="w-3 h-3 text-slate-500" />}
                  </div>
                  <div className={`max-w-[82%] px-3 py-2 rounded-xl ${msg.role === "user" ? "bg-gradient-to-r from-[#0066FF] to-[#0EA5E9] rounded-tr-sm" : msg.content.includes("## Screening Result") ? "bg-blue-50 border border-blue-200 rounded-tl-sm" : "bg-white border border-slate-200 rounded-tl-sm"}`}>
                    {msg.role === "user" ? <p className="text-white font-medium text-[11px]">{msg.content}</p> : <MiniMarkdown text={msg.content} />}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ImageAnalysisReportCard({ item, onDelete }) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-[#0066FF] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#0066FF]" /> AI Image Vision
          </span>
          <button onClick={onDelete} className="p-1 rounded text-slate-400 hover:text-rose-500 transition-all">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-start gap-3 pt-1">
          {item.imagePreview && (
            <img src={item.imagePreview} alt="Scan preview" className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-extrabold text-slate-900 truncate">{item.imageType || "Medical Scan Analysis"}</h3>
            <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{item.summary}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
        <button
          onClick={() => generateImageAnalysisReportPDF({ analysis: item.result || item, imagePreview: item.imagePreview })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
        >
          <Download className="w-3.5 h-3.5 text-sky-400" /> PDF Report
        </button>
        <span className="text-[10px] font-mono font-bold text-slate-400">
          Confidence: {item.confidence || 'Moderate'}
        </span>
      </div>
    </div>
  );
}

function AnalysisReportCard({ item, onDelete }) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
            <Calendar className="w-3 h-3" />{new Date(item.timestamp).toLocaleDateString()}
          </span>
          <button onClick={onDelete} className="p-1 rounded text-slate-400 hover:text-rose-500 transition-all">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <h3 className="text-sm font-extrabold text-slate-900 truncate">{item.analysis?.possible_disease || "Diagnostic Finding"}</h3>
        <p className="text-[11px] text-slate-500 line-clamp-2 italic">"{item.symptoms}"</p>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
        <button
          onClick={() => generateMedicalReportPDF({ patient: item.patient, symptoms: item.symptoms, result: item.analysis, imagePreview: item.imagePreview })}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
        >
          <Download className="w-3.5 h-3.5" /> PDF
        </button>
        <span className="text-[10px] text-slate-400 uppercase font-mono">{item.analysis?.confidence || ""}</span>
      </div>
    </div>
  );
}

export function ReportsPage({ onOpenZoom, showToast }) {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("medivision_reports_history") || "[]");
    if (user && user.email) {
      const userReports = saved.filter(r => !r.userEmail || r.userEmail === user.email);
      setReports(userReports);
    } else {
      setReports(saved);
    }
  }, [user]);

  const handleDelete = (id) => {
    const allSaved = JSON.parse(localStorage.getItem("medivision_reports_history") || "[]");
    const updatedAll = allSaved.filter(r => r.id !== id);
    localStorage.setItem("medivision_reports_history", JSON.stringify(updatedAll));
    setReports(prev => prev.filter(r => r.id !== id));
    if (showToast) showToast("Report deleted.");
  };

  const handleClearAll = () => {
    if (window.confirm("Clear all your saved reports?")) {
      const allSaved = JSON.parse(localStorage.getItem("medivision_reports_history") || "[]");
      const otherUsersReports = allSaved.filter(r => r.userEmail && r.userEmail !== user?.email);
      localStorage.setItem("medivision_reports_history", JSON.stringify(otherUsersReports));
      setReports([]);
      if (showToast) showToast("Your saved reports cleared.");
    }
  };

  const filteredReports = reports.filter(r => {
    const term = searchTerm.toLowerCase();
    const title = (r.diseaseName || r.analysis?.possible_disease || "").toLowerCase();
    return title.includes(term);
  });

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-[#0066FF]" /> Saved Reports
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Chatbot screening sessions and AI diagnostic reports</p>
        </div>
        {reports.length > 0 && (
          <button onClick={handleClearAll} className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-semibold flex items-center gap-1.5 transition-all">
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        )}
      </div>

      {reports.length > 0 && (
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by disease or condition..." className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#0066FF] transition-all" />
        </div>
      )}

      {filteredReports.length === 0 ? (
        <div className="p-14 text-center rounded-3xl bg-white border border-slate-200 space-y-3">
          <Activity className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No Reports Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchTerm ? "No report matches your search." : "Complete a chatbot screening session and it will be saved here automatically."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports.map(item => {
            if (item.type === "chatbot") {
              return <ChatbotReportCard key={item.id} item={item} onDelete={() => handleDelete(item.id)} />;
            } else if (item.type === "image_analysis") {
              return <ImageAnalysisReportCard key={item.id} item={item} onDelete={() => handleDelete(item.id)} />;
            } else {
              return <AnalysisReportCard key={item.id} item={item} onDelete={() => handleDelete(item.id)} />;
            }
          })}
        </div>
      )}
    </div>
  );
}
