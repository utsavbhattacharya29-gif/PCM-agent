import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle, Circle, BrainCircuit } from 'lucide-react';

const STAGES = [
  'Parsing question...',
  'Searching knowledge...',
  'Solving...',
  'Verifying...',
  'Generating explanation...',
];

export const LoadingState: React.FC = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  // Cycle through visual stages progressively
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStageIndex((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 1100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="w-full max-w-3xl mx-auto mt-8 p-6 sm:p-8 rounded-3xl border border-slate-800/90 bg-dark-900/80 backdrop-blur-2xl text-center shadow-2xl shadow-blue-950/20"
      role="status"
      aria-live="polite"
    >
      {/* Central animated orbital ring */}
      <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5">
        <div className="absolute inset-0 rounded-full border-2 border-t-blue-500 border-r-amber-500 border-b-emerald-500 border-l-transparent animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-slate-800 border-dashed" />
        <BrainCircuit className="w-8 h-8 text-slate-300 animate-pulse" />
      </div>

      <h2 className="text-lg sm:text-xl font-bold text-white mb-1.5">
        Analyzing your problem...
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 mb-6 max-w-md mx-auto">
        Running specialized subject agent, symbolic solver, and rule-based verifier.
      </p>

      {/* Visual Pipeline Stages */}
      <div className="max-w-md mx-auto space-y-2.5 text-left bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60">
        {STAGES.map((stage, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;

          return (
            <div
              key={stage}
              className={`flex items-center gap-3 text-xs sm:text-sm transition-all duration-300 ${
                isDone
                  ? 'text-emerald-400 font-medium'
                  : isCurrent
                  ? 'text-blue-300 font-semibold'
                  : 'text-slate-400 opacity-60'
              }`}
            >
              {isDone ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-blue-400 animate-spin flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-slate-400 flex-shrink-0" />
              )}
              <span>{stage}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoadingState;
