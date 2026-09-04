import React from 'react';
import { Sparkles, ShieldCheck, BookOpenCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="text-center pt-8 pb-6 sm:pt-12 sm:pb-8 max-w-3xl mx-auto px-4">
      {/* Mini badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300 mb-6 shadow-sm">
        <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping" />
        <span className="text-slate-200">Symbolic Solvers &amp; Rule-Based Verifiers</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[1.15]">
        Ask. Solve.{' '}
        <span className="bg-gradient-to-r from-blue-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
          Understand.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
        Get intelligent solutions to Mathematics, Physics, and Chemistry problems with verified answers and step-by-step explanations.
      </p>

      {/* Trust badges */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Formally Verified</span>
        </div>
        <div className="flex items-center gap-1.5">
          <BookOpenCheck className="w-4 h-4 text-blue-400" />
          <span>Knowledge Grounded</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Multi-Agent Architecture</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
