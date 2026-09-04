import React, { useEffect } from 'react';
import { X, Database, Layers, Sparkles } from 'lucide-react';
import { API_BASE_URL } from '../services/api';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-dark-900 p-6 sm:p-8 shadow-2xl shadow-blue-950/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-700"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 id="about-modal-title" className="text-xl font-bold text-white tracking-tight">
              About PCM Agent
            </h2>
            <p className="text-xs text-slate-400">
              Autonomous Science Assistant Architecture
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          <strong className="text-white">PCM Agent</strong> (&ldquo;Ask. Solve. Understand.&rdquo;) is an AI-powered education and problem-solving platform engineered for Mathematics, Physics, and Chemistry. Instead of relying solely on statistical next-token prediction, it leverages specialized subject agents, semantic parsers, domain retrievers, symbolic computer algebra solvers, and formal verifiers.
        </p>

        {/* Pipeline Architecture Diagram */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:p-5 mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            End-to-End System Flow
          </h3>

          <div className="flex flex-col gap-2 text-xs font-mono">
            {[
              { step: '1', title: 'User Question', desc: 'Natural language physics, chemistry, or math prompt' },
              { step: '2', title: 'Subject Router', desc: 'Classifies domain: Mathematics, Physics, or Chemistry' },
              { step: '3', title: 'Domain Agent & Parser', desc: 'Extracts known variables, formulas, and unknown targets' },
              { step: '4', title: 'Knowledge Retriever', desc: 'Fetches scientific theorems, laws, and molar constants' },
              { step: '5', title: 'Symbolic Solver', desc: 'Executes exact symbolic algebra (SymPy / exact units)' },
              { step: '6', title: 'Formal Verifier', desc: 'Validates dimensional correctness & constraints' },
              { step: '7', title: 'Explanation Generator', desc: 'Constructs pedagogical step-by-step breakdown' },
            ].map((node) => (
              <div key={node.step} className="flex items-center gap-2.5 p-2 rounded-lg bg-dark-900/60 border border-slate-800/60">
                <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-blue-400 flex-shrink-0">
                  {node.step}
                </span>
                <span className="font-semibold text-slate-200">{node.title}:</span>
                <span className="text-slate-400 truncate">{node.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Backend Configuration */}
        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4 text-xs text-slate-400 space-y-1.5 font-mono">
          <div className="text-slate-300 font-semibold mb-1 flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>API Service Details</span>
          </div>
          <div>Endpoint: <span className="text-slate-200">{API_BASE_URL}/solve</span></div>
          <div>Config: <span className="text-slate-200">VITE_API_URL</span> environment variable</div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
