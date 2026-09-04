import React, { useRef, useEffect } from 'react';
import { XCircle, Loader2, CornerDownLeft } from 'lucide-react';
import { ExampleQuestions } from './ExampleQuestions';

interface QuestionInputProps {
  question: string;
  setQuestion: (val: string) => void;
  onSolve: () => void;
  onClear: () => void;
  isLoading: boolean;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({
  question,
  setQuestion,
  onSolve,
  onClear,
  isLoading,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height slightly as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.max(110, Math.min(scrollHeight, 260))}px`;
    }
  }, [question]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter or Cmd+Enter submits
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isLoading && question.trim()) {
        onSolve();
      }
    }
  };

  const handleSelectExample = (exampleText: string) => {
    setQuestion(exampleText);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const isQuestionEmpty = !question.trim();

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="relative rounded-2xl border border-slate-800/90 bg-dark-900/90 shadow-2xl shadow-blue-950/20 backdrop-blur-xl p-3 sm:p-4 focus-within:border-slate-700 transition-all">
        {/* Textarea */}
        <label htmlFor="problem-input" className="sr-only">
          Ask a Mathematics, Physics, or Chemistry question
        </label>
        <textarea
          id="problem-input"
          ref={textareaRef}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={3}
          placeholder="Ask a Mathematics, Physics, or Chemistry question..."
          className="w-full resize-none bg-transparent text-slate-100 placeholder-slate-400 text-sm sm:text-base leading-relaxed focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed font-mono"
        />

        {/* Action Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/70 mt-2">
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="hidden sm:inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-300">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-300">Enter</kbd> to solve
            </span>
            {question.length > 0 && (
              <span className="text-slate-400">{question.length} chars</span>
            )}
          </div>

          <div className="flex items-center gap-2.5 justify-end">
            {/* Clear Button */}
            <button
              type="button"
              onClick={onClear}
              disabled={isQuestionEmpty || isLoading}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-xl transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-700"
              aria-label="Clear question"
            >
              <XCircle className="w-4 h-4" />
              <span>Clear</span>
            </button>

            {/* Solve Problem Button */}
            <button
              type="button"
              onClick={onSolve}
              disabled={isQuestionEmpty || isLoading}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-500 rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-dark-900 active:scale-[0.98]"
              aria-label="Solve Problem"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Solving...</span>
                </>
              ) : (
                <>
                  <span>Solve Problem</span>
                  <CornerDownLeft className="w-4 h-4 text-blue-200" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Example Prompts */}
      <ExampleQuestions
        onSelectQuestion={handleSelectExample}
        disabled={isLoading}
      />
    </div>
  );
};

export default QuestionInput;

