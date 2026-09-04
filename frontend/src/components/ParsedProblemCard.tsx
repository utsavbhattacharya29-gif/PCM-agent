import React, { useState } from 'react';
import { Cpu, ChevronDown, ChevronUp, Code2, Tag, Hash, HelpCircle } from 'lucide-react';
import type { ParsedProblem } from '../types';
import { MathRenderer } from './MathRenderer';

interface ParsedProblemCardProps {
  problem: ParsedProblem | undefined;
}

export const ParsedProblemCard: React.FC<ParsedProblemCardProps> = ({ problem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);

  if (!problem || typeof problem !== 'object' || Object.keys(problem).length === 0) {
    return null;
  }

  const {
    operation,
    formula,
    variables,
    unknown,
    topic,
    ...otherFields
  } = problem;

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-dark-900/60 backdrop-blur-md overflow-hidden transition-all">
      {/* Accordion Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-800/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-semibold text-slate-200">
                Parsed Problem
              </span>
              {operation && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-950/60 text-teal-300 border border-teal-800/60 uppercase font-mono">
                  {String(operation)}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Structured variables and target unknowns
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-xs font-medium hidden sm:inline">
            {isOpen ? 'Hide' : 'View'}
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 space-y-4 border-t border-slate-800/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Operation */}
            {operation && (
              <div className="rounded-xl border border-slate-800/70 bg-slate-950/40 p-3">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-teal-400" />
                  Operation
                </span>
                <span className="text-sm font-semibold text-teal-300 font-mono">
                  {String(operation)}
                </span>
              </div>
            )}

            {/* Formula */}
            {formula && (
              <div className="rounded-xl border border-slate-800/70 bg-slate-950/40 p-3 sm:col-span-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <Code2 className="w-3 h-3 text-blue-400" />
                  Formula
                </span>
                <div className="text-sm font-mono text-blue-300">
                  <MathRenderer content={String(formula)} />
                </div>
              </div>
            )}

            {/* Unknown */}
            {unknown && (
              <div className="rounded-xl border border-slate-800/70 bg-slate-950/40 p-3">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <HelpCircle className="w-3 h-3 text-amber-400" />
                  Target Unknown
                </span>
                <span className="text-sm font-semibold text-amber-300 font-mono">
                  <MathRenderer content={String(unknown)} />
                </span>
              </div>
            )}

            {/* Topic */}
            {topic && (
              <div className="rounded-xl border border-slate-800/70 bg-slate-950/40 p-3">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Topic
                </span>
                <span className="text-sm text-slate-300">
                  {String(topic)}
                </span>
              </div>
            )}
          </div>

          {/* Variables Grid */}
          {variables && typeof variables === 'object' && Object.keys(variables).length > 0 && (
            <div className="rounded-xl border border-slate-800/70 bg-slate-950/40 p-3.5 sm:p-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                <Hash className="w-3 h-3 text-purple-400" />
                Variables Extracted
              </span>
              <div className="flex flex-wrap gap-2">
                {Object.entries(variables).map(([key, val]) => (
                  <div
                    key={key}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono"
                  >
                    <span className="text-purple-400 font-semibold">{key}</span>
                    <span className="text-slate-500">=</span>
                    <span className="text-slate-200">
                      {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Any other miscellaneous fields */}
          {Object.keys(otherFields).length > 0 && (
            <div className="rounded-xl border border-slate-800/70 bg-slate-950/40 p-3.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Additional Parameters
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {Object.entries(otherFields).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">{k}:</span>
                    <span className="text-slate-200">{typeof v === 'object' ? JSON.stringify(v) : String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Raw JSON inspection toggle (secondary) */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setShowRawJson(!showRawJson)}
              className="text-[11px] text-slate-400 hover:text-slate-300 underline underline-offset-2 flex items-center gap-1"
            >
              <Code2 className="w-3 h-3" />
              {showRawJson ? 'Hide Raw Structure' : 'Inspect Raw Data'}
            </button>
          </div>

          {showRawJson && (
            <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400 overflow-x-auto">
              {JSON.stringify(problem, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default ParsedProblemCard;

