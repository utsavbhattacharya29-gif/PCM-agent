import React from 'react';
import { Pi, Atom, FlaskConical, ArrowUpRight } from 'lucide-react';
import type { ExampleQuestion } from '../types';

export const EXAMPLE_QUESTIONS: ExampleQuestion[] = [
  {
    id: 'phys-1',
    subject: 'physics',
    title: 'Newtonian Force',
    question: 'A 5 kg object accelerates at 2 m/s^2. Find the force.',
    icon: 'Atom',
    badge: 'Physics',
  },
  {
    id: 'chem-1',
    subject: 'chemistry',
    title: 'Molar Mass',
    question: 'How many moles are in 18 g of water?',
    icon: 'FlaskConical',
    badge: 'Chemistry',
  },
  {
    id: 'math-1',
    subject: 'mathematics',
    title: 'Polynomial Simplification',
    question: 'Simplify 2x + 3x + 5.',
    icon: 'Pi',
    badge: 'Mathematics',
  },
];

interface ExampleQuestionsProps {
  onSelectQuestion: (question: string) => void;
  disabled?: boolean;
}

export const ExampleQuestions: React.FC<ExampleQuestionsProps> = ({
  onSelectQuestion,
  disabled = false,
}) => {
  return (
    <div className="w-full mt-4">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Example Problems (Click to populate)
        </span>
        <span className="text-[11px] text-slate-400">Press Solve when ready</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
        {EXAMPLE_QUESTIONS.map((item) => {
          const isMath = item.subject === 'mathematics';
          const isPhys = item.subject === 'physics';

          const borderHover = isMath
            ? 'hover:border-blue-500/50 hover:bg-blue-950/20'
            : isPhys
            ? 'hover:border-amber-500/50 hover:bg-amber-950/20'
            : 'hover:border-emerald-500/50 hover:bg-emerald-950/20';

          const iconColor = isMath
            ? 'text-blue-400'
            : isPhys
            ? 'text-orange-400'
            : 'text-emerald-400';

          return (
            <button
              key={item.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectQuestion(item.question)}
              className={`group text-left p-3 rounded-xl border border-slate-800/90 bg-slate-900/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-700 disabled:opacity-50 disabled:cursor-not-allowed ${borderHover}`}
              aria-label={`Insert example question: ${item.question}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  {isMath && <Pi className={`w-3.5 h-3.5 ${iconColor}`} />}
                  {isPhys && <Atom className={`w-3.5 h-3.5 ${iconColor}`} />}
                  {!isMath && !isPhys && <FlaskConical className={`w-3.5 h-3.5 ${iconColor}`} />}
                  <span className={`text-[11px] font-semibold tracking-wide uppercase ${iconColor}`}>
                    {item.badge}
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-mono line-clamp-2 group-hover:text-white transition-colors">
                &ldquo;{item.question}&rdquo;
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ExampleQuestions;
