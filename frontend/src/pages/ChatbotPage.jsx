import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  User,
  Send,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Activity,
  MessageSquare,
  Stethoscope,
  ShieldAlert,
  ChevronRight,
  FileSpreadsheet,
  Download
} from "lucide-react";
import { sendChatMessage } from "../services/chatbot";
import { generateChatbotReportPDF } from "../utils/pdfGenerator";
import { useAuth } from "../context/AuthContext";

/* ─── Markdown-lite renderer (bold, bullets, headings) ──────────────────── */
function renderMarkdown(text) {
  if (!text) return null;
  const lines = text.split("\n");
  const elements = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // ## Heading
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-base font-black text-slate-900 mt-4 mb-1">
          {line.replace("## ", "")}
        </h2>
      );
    }
    // **Bold label:** value
    else if (line.startsWith("**") && line.includes(":**")) {
      const [label, ...rest] = line.split(":**");
      const boldLabel = label.replace(/\*\*/g, "");
      const value = rest.join(":").replace(/\*\*/g, "").trim();
      elements.push(
        <p key={key++} className="text-xs text-slate-700 leading-relaxed">
          <span className="font-bold text-slate-900">{boldLabel}:</span>
          {value ? " " + value : ""}
        </p>
      );
    }
    // Bullet
    else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <li key={key++} className="text-xs text-slate-700 ml-4 list-disc">
          {line.slice(2).replace(/\*\*/g, "")}
        </li>
      );
    }
    // Empty
    else if (line.trim() === "") {
      elements.push(<div key={key++} className="h-1" />);
    }
    // Normal text — render inline bold
    else {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      elements.push(
        <p key={key++} className="text-xs text-slate-700 leading-relaxed">
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j} className="font-bold text-slate-900">
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    }
  }

  return <div className="space-y-0.5">{elements}</div>;
}

/* ─── Risk badge ─────────────────────────────────────────────────────────── */
function RiskBadge({ text }) {
  const lower = (text || "").toLowerCase();
  if (lower.includes("emergency"))
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-red-100 text-red-700 border border-red-300 animate-pulse">
        <AlertTriangle className="w-3 h-3" /> EMERGENCY
      </span>
    );
  if (lower.includes("high"))
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-orange-100 text-orange-700 border border-orange-300">
        <ShieldAlert className="w-3 h-3" /> HIGH RISK
      </span>
    );
  if (lower.includes("moderate"))
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-100 text-amber-700 border border-amber-200">
        <Activity className="w-3 h-3" /> MODERATE RISK
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700 border border-emerald-200">
      <CheckCircle className="w-3 h-3" /> LOW RISK
    </span>
  );
}

/* ─── Typing dots ────────────────────────────────────────────────────────── */
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
        <Bot className="w-3.5 h-3.5 text-[#0066FF]" />
      </div>
      <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-white border border-slate-200 shadow-sm">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-400"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Message bubble ─────────────────────────────────────────────────────── */
function MessageBubble({ msg, isLast, onDownloadPDF }) {
  const isBot = msg.role === "assistant";
  const isResult = isBot && msg.content.includes("## Screening Result");

  if (isBot && isResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-start gap-2 w-full"
      >
        <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
          <Stethoscope className="w-3.5 h-3.5 text-[#0066FF]" />
        </div>
        <div className="flex-1 bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200 rounded-2xl rounded-tl-sm p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-[#0066FF] uppercase tracking-wider">Screening Result</span>
            <RiskBadge text={msg.content} />
          </div>
          <div className="border-t border-blue-100 pt-3">
            {renderMarkdown(msg.content.replace("## Screening Result", "").trim())}
          </div>
          {onDownloadPDF && (
            <div className="border-t border-blue-100 pt-3 flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[11px] text-slate-500 font-medium">Official Screening Summary</span>
              <button
                onClick={onDownloadPDF}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" />
                Download PDF Report
              </button>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  if (isBot) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-start gap-2"
      >
        <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
          <Bot className="w-3.5 h-3.5 text-[#0066FF]" />
        </div>
        <div className="max-w-[78%] bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
          {renderMarkdown(msg.content)}
        </div>
      </motion.div>
    );
  }

  // User message
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-2 flex-row-reverse"
    >
      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
        <User className="w-3.5 h-3.5 text-slate-500" />
      </div>
      <div className="max-w-[78%] bg-gradient-to-r from-[#0066FF] to-[#0EA5E9] rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
        <p className="text-xs text-white font-medium leading-relaxed">{msg.content}</p>
      </div>
    </motion.div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */
export function ChatbotPage({ showToast, onNavigateReports, imageAnalysisContext }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [started, setStarted] = useState(() => !!imageAnalysisContext);
  const [isComplete, setIsComplete] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || isLoading) return;

    const userMsg = { role: "user", content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setStarted(true);

    try {
      const reply = await sendChatMessage(newMessages, imageAnalysisContext);
      const botMsg = { role: "assistant", content: reply };
      setMessages((prev) => [...prev, botMsg]);

      // Detect if this is the final screening result
      if (reply.includes("## Screening Result")) {
        setIsComplete(true);

        // ── Extract disease name from result ──────────────────────────
        const causeMatch = reply.match(/\*\*Possible cause \/ condition:\*\*\s*([^\n*]+)/i)
          || reply.match(/\*\*Primary symptom:\*\*\s*([^\n*]+)/i);
        const diseaseName = (causeMatch?.[1] || "Screening Session").trim().slice(0, 60);

        // ── Save full conversation to report history ───────────────────
        const allMessages = [...newMessages, { role: "assistant", content: reply }];
        const reportTitle = `${diseaseName} — ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`;
        const newReport = {
          id: Date.now(),
          userEmail: user?.email || 'anonymous',
          type: "chatbot",
          timestamp: new Date().toISOString(),
          title: reportTitle,
          diseaseName,
          conversation: allMessages,
        };
        const saved = JSON.parse(localStorage.getItem("medivision_reports_history") || "[]");
        localStorage.setItem("medivision_reports_history", JSON.stringify([newReport, ...saved]));
        if (showToast) showToast("Screening session saved to Reports!");
      }

    } catch (err) {
      const errMsg = { role: "assistant", content: `**Error:** ${err.message}\n\nPlease make sure your Gemini API key is set in Settings.` };
      setMessages((prev) => [...prev, errMsg]);
      if (showToast) showToast("Chatbot error: " + err.message, "error");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleDownloadPDF = () => {
    if (messages.length === 0) return;
    const resultMsg = messages.find(m => m.role === "assistant" && m.content.includes("## Screening Result"));
    const causeMatch = resultMsg?.content.match(/\*\*Possible cause \/ condition:\*\*\s*([^\n*]+)/i)
      || resultMsg?.content.match(/\*\*Primary symptom:\*\*\s*([^\n*]+)/i);
    const diseaseName = (causeMatch?.[1] || "Screening Session").trim().slice(0, 60);

    const item = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      diseaseName,
      conversation: messages,
    };
    generateChatbotReportPDF({ item });
    if (showToast) showToast("Downloading Medical Screening PDF Report...");
  };

  const handleReset = () => {
    setMessages([]);
    setInput("");
    setIsLoading(false);
    setStarted(false);
    setIsComplete(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showYesNo = !isComplete && started && !isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "assistant";

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 flex flex-col h-[calc(100vh-80px)] font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shadow-sm">
            <MessageSquare className="w-5 h-5 text-[#0066FF]" />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight">Symptom Screening Chatbot</h1>
            <p className="text-[11px] text-slate-500 font-medium">AI-guided YES/NO diagnostic screening</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onNavigateReports && (
            <button
              onClick={onNavigateReports}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Saved Reports
            </button>
          )}
          {started && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              New Session
            </button>
          )}
        </div>
      </div>

      {/* Active Image Analysis Context Banner */}
      {imageAnalysisContext && (
        <div className="mb-3 p-3 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs text-blue-900 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-ping" />
            <span className="font-bold">Active Image Context:</span>
            <span>{imageAnalysisContext.image_type || 'Medical Scan Analysis'}</span>
          </div>
          <span className="text-[11px] font-mono text-[#0066FF] font-semibold">
            Ask follow-up questions below
          </span>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-3 pr-1 min-h-0">
        
        {/* Welcome state */}
        {!started && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
          >
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-50 to-sky-100 border border-blue-200 flex items-center justify-center shadow-sm">
              <Stethoscope className="w-8 h-8 text-[#0066FF]" />
            </div>
            <div className="space-y-2 max-w-sm">
              <h2 className="text-xl font-black text-slate-900">Medical Symptom Screening</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Describe your symptom below and I will guide you through a structured YES/NO screening to assess your condition.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full max-w-sm text-left">
              {[
                "I have a persistent cough",
                "I have chest pain",
                "I have a severe headache",
                "I have skin rash"
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-xs font-medium text-slate-700 hover:text-[#0066FF] transition-all text-left"
                >
                  <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                  {s}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 max-w-xs">
              This is a preliminary screening tool, not a clinical diagnosis. Always consult a healthcare professional.
            </p>
          </motion.div>
        )}

        {/* Messages */}
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <MessageBubble
              key={i}
              msg={msg}
              isLast={i === messages.length - 1}
              onDownloadPDF={handleDownloadPDF}
            />
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <TypingIndicator />
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick Yes / No buttons */}
      <AnimatePresence>
        {showYesNo && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex gap-2 mb-2 shrink-0"
          >
            <button
              onClick={() => sendMessage("Yes")}
              className="flex-1 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-extrabold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              ✓ Yes
            </button>
            <button
              onClick={() => sendMessage("No")}
              className="flex-1 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-extrabold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              ✗ No
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area */}
      {!isComplete && (
        <div className="shrink-0 flex gap-2 mt-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder={started ? "Type your answer or use Yes / No above…" : "Describe your symptom (e.g., I have a cough)…"}
            className="flex-1 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all shadow-sm disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            className="w-11 h-11 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0EA5E9] hover:from-blue-600 hover:to-sky-600 text-white flex items-center justify-center shadow-md transition-all hover:scale-[1.05] active:scale-[0.97] disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Action buttons after completion */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="shrink-0 pt-2 flex flex-col sm:flex-row gap-2.5"
        >
          <button
            onClick={handleDownloadPDF}
            className="flex-1 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-sky-400" />
            Download PDF Report
          </button>
          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Start New Screening
          </button>
          {onNavigateReports && (
            <button
              onClick={onNavigateReports}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0EA5E9] hover:from-blue-600 hover:to-sky-600 text-white font-bold text-xs sm:text-sm shadow-lg transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              View in Saved Reports
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
