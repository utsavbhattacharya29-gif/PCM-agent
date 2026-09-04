import React, { useState, useRef } from 'react';
import type { SolveResponse } from '../types';
import { solveProblem } from '../services/api';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { QuestionInput } from '../components/QuestionInput';
import { ResultCard } from '../components/ResultCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { AboutModal } from '../components/AboutModal';

export const Home: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<SolveResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSolve = async () => {
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await solveProblem(question);
      setResponse(data);
      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: unknown) {
      setResponse(null);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong while solving this problem.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setQuestion('');
    setResponse(null);
    setError(null);
  };

  const handleReset = () => {
    handleClear();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectExample = (promptText: string) => {
    setQuestion(promptText);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-950 text-slate-100 selection:bg-blue-600/30 selection:text-blue-200">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <Header
        onReset={handleReset}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Hero Section */}
        <Hero />

        {/* Question Input Section */}
        <QuestionInput
          question={question}
          setQuestion={setQuestion}
          onSolve={handleSolve}
          onClear={handleClear}
          isLoading={isLoading}
        />

        {/* Dynamic Display Area (Results / Loading / Error / Empty) */}
        <div ref={resultsRef} className="scroll-mt-24">
          {isLoading && <LoadingState />}

          {!isLoading && error && (
            <ErrorState
              errorMessage={error}
              onRetry={handleSolve}
            />
          )}

          {!isLoading && !error && response && (
            <ResultCard data={response} />
          )}

          {!isLoading && !error && !response && (
            <EmptyState onSelectPrompt={handleSelectExample} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-dark-950/80 py-8 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">PCM Agent</span>
            <span>&bull;</span>
            <span>Mathematics, Physics &amp; Chemistry Assistant</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Symbolic Solvers</span>
            <span>&bull;</span>
            <span>Rule-Based Verifiers</span>
            <span>&bull;</span>
            <span>Vector Retrievers</span>
          </div>
        </div>
      </footer>

      {/* Architecture / About Dialog */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
};

export default Home;

