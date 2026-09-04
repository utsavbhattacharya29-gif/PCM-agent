import React, { useState } from 'react';
import { Database, ChevronDown, ChevronUp, FileText, Bookmark } from 'lucide-react';
import type { RetrievedKnowledgeItem } from '../types';
import { MathRenderer } from './MathRenderer';

interface KnowledgeCardProps {
  knowledge: RetrievedKnowledgeItem[] | undefined;
}

export const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ knowledge }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!knowledge || !Array.isArray(knowledge) || knowledge.length === 0) {
    return null;
  }

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
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-semibold text-slate-200">
                Knowledge Used
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                {knowledge.length} {knowledge.length === 1 ? 'source' : 'sources'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Retrieved context and reference theorems
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
        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 space-y-3 border-t border-slate-800/60">
          {knowledge.map((item, idx) => {
            const docText = item.document || item.text || item.content || (typeof item === 'string' ? item : JSON.stringify(item));
            const score = item.score ?? item.relevance;
            const title = item.title || item.source || `Reference Document #${idx + 1}`;

            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800/70 bg-slate-950/40 p-3.5 sm:p-4 text-xs sm:text-sm space-y-2"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-800/50 pb-2">
                  <div className="flex items-center gap-2 text-slate-300 font-medium">
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="truncate">{title}</span>
                  </div>

                  {score !== undefined && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-950/50 border border-indigo-800/50 text-[11px] font-mono text-indigo-300">
                      <Bookmark className="w-3 h-3 text-indigo-400" />
                      <span>Relevance: {typeof score === 'number' ? score.toFixed(2) : score}</span>
                    </div>
                  )}
                </div>

                <div className="text-slate-300 font-mono text-xs sm:text-[13px] leading-relaxed break-words">
                  <MathRenderer content={docText} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default KnowledgeCard;

