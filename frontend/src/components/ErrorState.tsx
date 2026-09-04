import React from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';

interface ErrorStateProps {
  onRetry: () => void;
  errorMessage?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  onRetry,
  errorMessage = 'Something went wrong while solving this problem.',
}) => {
  return (
    <div
      className="w-full max-w-3xl mx-auto mt-8 p-6 sm:p-8 rounded-3xl border border-red-900/50 bg-dark-900/90 backdrop-blur-xl text-center shadow-2xl shadow-red-950/20"
      role="alert"
      aria-live="assertive"
    >
      <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-4">
        <AlertOctagon className="w-6 h-6" />
      </div>

      <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
        {errorMessage}
      </h2>

      <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
        The backend service could not process the request. Please check if the problem statement is clear, or verify that the backend server is running.
      </p>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-sm font-semibold border border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-red-500/50"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
