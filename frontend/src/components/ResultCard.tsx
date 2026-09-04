import React, { useState } from 'react';
import { Check, Copy, Sparkles } from 'lucide-react';
import type { SolveResponse } from '../types';
import { SubjectBadge } from './SubjectBadge';
import { MathRenderer } from './MathRenderer';
import { VerificationCard } from './VerificationCard';
import { ExplanationCard } from './ExplanationCard';
import { KnowledgeCard } from './KnowledgeCard';
import { ParsedProblemCard } from './ParsedProblemCard';

interface ResultCardProps {
  data: SolveResponse;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  const [answerCopied, setAnswerCopied] = useState(false);

  if (!data || !data.result) return null;

  const { subject, question, result } = data;
  const normSubject = (subject || '').toLowerCase();

  // Subject glow accents
  let containerGlow = 'border-slate-800 shadow-blue-950/20';
  let answerGradient = 'from-blue-600/10 via-indigo-600/5 to-transparent border-blue-500/30';
  let answerAccentText = 'text-blue-400';

  if (normSubject.includes('math')) {
    containerGlow = 'border-blue-900/60 shadow-blue-950/30';
    answerGradient = 'from-blue-600/15 via-purple-600/10 to-transparent border-blue-500/40';
    answerAccentText = 'text-blue-300';
  } else if (normSubject.includes('physic')) {
    containerGlow = 'border-amber-900/60 shadow-amber-950/30';
    answerGradient = 'from-orange-600/15 via-amber-600/10 to-transparent border-amber-500/40';
    answerAccentText = 'text-amber-300';
  } else if (normSubject.includes('chem')) {
    containerGlow = 'border-emerald-900/60 shadow-emerald-950/30';
    answerGradient = 'from-emerald-600/15 via-teal-600/10 to-transparent border-emerald-500/40';
    answerAccentText = 'text-emerald-300';
  }

  const handleCopyAnswer = async () => {
    try {
      const textToCopy = typeof result.result === 'object' ? JSON.stringify(result.result) : String(result.result);
      await navigator.clipboard.writeText(textToCopy);
      setAnswerCopied(true);
      setTimeout(() => setAnswerCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section 
      className={`w-full max-w-3xl mx-auto space-y-6 mt-8 p-4 sm:p-7 rounded-3xl border bg-dark-900/90 backdrop-blur-2xl shadow-2xl transition-all ${containerGlow}`}
      aria-label="Problem Solution Results"
    >
      {/* Subject & Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <SubjectBadge subject={subject} size="md" />
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Domain Verified
          </span>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          PCM Pipeline Complete
        </div>
      </div>

      {/* User Question Echo */}
      {question && (
        <div className="text-xs sm:text-sm text-slate-400 italic bg-slate-950/40 px-3.5 py-2 rounded-xl border border-slate-800/50">
          <span className="text-slate-400 font-medium not-italic mr-1.5 font-sans">Query:</span>
          &ldquo;{question}&rdquo;
        </div>
      )}

      {/* Prominent Primary Answer Box */}
      <div className={`relative rounded-2xl border p-5 sm:p-7 bg-gradient-to-br ${answerGradient} shadow-xl backdrop-blur-xl overflow-hidden`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">
              Computed Final Answer
            </span>
          </div>

          <button
            onClick={handleCopyAnswer}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            title="Copy final answer"
            aria-label="Copy final answer"
          >
            {answerCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Big Answer Render */}
        <div className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white py-2 break-words font-mono ${answerAccentText}`}>
          <MathRenderer content={result.result} displayMode={false} />
        </div>
      </div>

      {/* Verification Card */}
      {result.verification && (
        <VerificationCard verification={result.verification} />
      )}

      {/* Step-by-Step Explanation */}
      {result.explanation && (
        <ExplanationCard explanation={result.explanation} />
      )}

      {/* Collapsible Parsed Problem */}
      {result.problem && (
        <ParsedProblemCard problem={result.problem} />
      )}

      {/* Collapsible Retrieved Knowledge */}
      {result.retrieved_knowledge && (
        <KnowledgeCard knowledge={result.retrieved_knowledge} />
      )}
    </section>
  );
};

export default ResultCard;

