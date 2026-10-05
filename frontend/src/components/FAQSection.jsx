import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What can I build with the platform?',
      a: 'You can build high-performance WebGL 3D glass interfaces, autonomous AI visual intelligence applications, real-time analytics platforms, and enterprise data processing software.'
    },
    {
      q: 'How does the intelligent system work?',
      a: 'Our platform combines hardware-accelerated WebGL physical optics with multi-modal neural network pipelines that execute stream inference under 0.8ms.'
    },
    {
      q: 'Is my data secure?',
      a: 'Yes. All data streaming runs in ephemeral zero-knowledge memory buffers with SOC2 Type II, HIPAA alignment, and TLS 1.3 hardware-level encryption.'
    },
    {
      q: 'Can I integrate my existing tools?',
      a: 'Absolutely. We provide REST APIs, WebSocket real-time feeds, Python SDKs, and pre-built React/Next.js component libraries for instant drop-in integration.'
    },
    {
      q: 'Can I customize the experience?',
      a: 'Yes. Every glass element, 3D refraction parameter, color palette, and micro-interaction is completely customizable through our unified design system tokens.'
    }
  ];

  return (
    <section id="faq" className="w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      
      {/* Section Heading */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>KNOWLEDGE BASE</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Frequently Asked <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-400">
            Questions.
          </span>
        </h2>
      </div>

      {/* Expandable Dark Glass Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-white/[0.06] border-white/25 shadow-[0_12px_36px_rgba(56,189,248,0.1)]'
                  : 'bg-white/[0.025] border-white/10 hover:bg-white/[0.04] hover:border-white/15'
              }`}
            >
              {/* Question Row */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between space-x-4 focus:outline-none"
              >
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                  isOpen ? 'bg-cyan-500 text-white border-cyan-400' : 'bg-white/[0.05] text-slate-300 border-white/15'
                }`}>
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              {/* Answer Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium border-t border-white/10">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
