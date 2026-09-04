import React, { useState } from 'react';
import { BookOpen, Copy, Check } from 'lucide-react';
import { MathRenderer } from './MathRenderer';

interface ExplanationCardProps {
  explanation: string;
}

interface StepItem {
  stage?: string;
  title: string;
  content: string;
  stepNumber?: number;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({ explanation }) => {
  const [copied, setCopied] = useState(false);

  if (!explanation) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(explanation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  // Attempt to parse explanation into logical steps if structured
  const steps = parseExplanationSteps(explanation);

  return (
    <div className="rounded-2xl border border-slate-800 bg-dark-900/80 backdrop-blur-xl p-5 sm:p-6 shadow-xl shadow-slate-950/30">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Step-by-Step Explanation
            </h2>
            <p className="text-xs text-slate-400">
              Derivation and calculation from symbolic reasoner
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          title="Copy explanation"
          aria-label="Copy explanation to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Content */}
      {steps.length > 1 ? (
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative pl-7 sm:pl-9 pb-3 border-l-2 border-slate-800 last:border-l-transparent"
            >
              {/* Step indicator node */}
              <div className="absolute -left-[13px] top-0 flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 border-2 border-blue-500/50 text-[11px] font-bold text-blue-400 font-mono shadow-sm">
                {step.stepNumber || idx + 1}
              </div>

              <div className="bg-slate-950/40 rounded-xl border border-slate-800/60 p-3.5 sm:p-4">
                {step.title && (
                  <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                    <span>{step.title}</span>
                  </div>
                )}
                <div className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                  <MathRenderer content={step.content} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Plain multi-paragraph explanation
        <div className="space-y-3 text-sm sm:text-base text-slate-200 leading-relaxed">
          {explanation.split('\n\n').map((paragraph, idx) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;
            return (
              <div key={idx} className="bg-slate-950/30 rounded-xl border border-slate-800/50 p-4">
                <MathRenderer content={trimmed} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

/**
 * Intelligent parser to detect standard 5-part structure or numbered steps:
 * 1. Principle / Formula
 * 2. Given Values
 * 3. Substitution
 * 4. Calculation
 * 5. Final Answer
 */
function parseExplanationSteps(raw: string): StepItem[] {
  const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const detectedSteps: StepItem[] = [];

  // Match prefixes like "1. Principle:", "Step 1:", "Given Values:", "Formula:", etc.
  const knownKeywords = [
    { key: 'principle', label: '1. Principle / Formula' },
    { key: 'formula', label: '1. Principle / Formula' },
    { key: 'given', label: '2. Given Values' },
    { key: 'substitut', label: '3. Substitution' },
    { key: 'calculat', label: '4. Calculation' },
    { key: 'solve', label: '4. Calculation' },
    { key: 'final answer', label: '5. Final Answer' },
    { key: 'answer', label: '5. Final Answer' },
  ];

  let currentTitle = '';
  let currentLines: string[] = [];
  let currentNumber = 1;

  for (const line of lines) {
    const numMatch = line.match(/^(\d+)[\.\)]\s*(.*)$/);
    const lower = line.toLowerCase();

    // Check if line matches a numbered step
    if (numMatch) {
      if (currentLines.length > 0 || currentTitle) {
        detectedSteps.push({
          stepNumber: currentNumber,
          title: currentTitle,
          content: currentLines.join('\n'),
        });
        currentLines = [];
        currentNumber++;
      }
      currentTitle = numMatch[2].includes(':') ? numMatch[2].split(':')[0].trim() : `Step ${numMatch[1]}`;
      const rest = numMatch[2].includes(':') ? numMatch[2].split(':').slice(1).join(':').trim() : numMatch[2];
      if (rest) currentLines.push(rest);
      continue;
    }

    // Check if line matches known keyword header (e.g., "Given Values:")
    const foundKeyword = knownKeywords.find(k => lower.startsWith(k.key) || lower.startsWith(`### ${k.key}`));
    if (foundKeyword && line.includes(':')) {
      if (currentLines.length > 0 || currentTitle) {
        detectedSteps.push({
          stepNumber: currentNumber,
          title: currentTitle,
          content: currentLines.join('\n'),
        });
        currentLines = [];
        currentNumber++;
      }
      const parts = line.split(':');
      currentTitle = parts[0].replace(/^#+\s*/, '').trim();
      const rest = parts.slice(1).join(':').trim();
      if (rest) currentLines.push(rest);
      continue;
    }

    currentLines.push(line);
  }

  if (currentLines.length > 0 || currentTitle) {
    detectedSteps.push({
      stepNumber: currentNumber,
      title: currentTitle,
      content: currentLines.join('\n'),
    });
  }

  return detectedSteps;
}

export default ExplanationCard;

