import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { VerificationResult } from '../types';

interface VerificationCardProps {
  verification: VerificationResult;
}

export const VerificationCard: React.FC<VerificationCardProps> = ({ verification }) => {
  if (!verification) return null;

  const isValid = verification.valid === true;

  return (
    <div
      className={`rounded-xl border p-4 sm:p-4.5 transition-all backdrop-blur-md ${
        isValid
          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300 shadow-lg shadow-emerald-950/20'
          : 'bg-amber-950/20 border-amber-500/30 text-amber-300 shadow-lg shadow-amber-950/20'
      }`}
      role="region"
      aria-label="Verification Result"
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 ${
            isValid
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
          }`}
        >
          {isValid ? (
            <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
          ) : (
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isValid ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {isValid ? '✓ Verified by Rule Engine' : '⚠ Verification Notice'}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              <ShieldCheck className="w-3 h-3 text-slate-400" />
              Symbolic Consistency Check
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
            {verification.message || (isValid ? 'The result is mathematically and physically consistent.' : 'Result could not be formally verified.')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationCard;

