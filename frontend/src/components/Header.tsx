import React from 'react';
import { Sparkles, Info, RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '../services/api';

interface HeaderProps {
  onReset: () => void;
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset, onOpenAbout }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-dark-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3.5 cursor-pointer group focus:outline-none"
          tabIndex={0}
          role="button"
          aria-label="PCM Agent Home"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onReset(); }}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-amber-500 to-emerald-500 p-[1.5px] shadow-lg shadow-blue-500/10 group-hover:shadow-blue-500/25 transition-all">
            <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-slate-100 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                PCM Agent
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold text-blue-400 bg-blue-950/80 border border-blue-800/60 rounded-full">
                v1.0
              </span>
            </div>
            <span className="text-xs text-slate-400 tracking-normal hidden md:inline-block">
              AI-powered Mathematics, Physics &amp; Chemistry Assistant
            </span>
          </div>
        </div>

        {/* Navigation & Controls */}
        <nav className="flex items-center gap-2 sm:gap-4" aria-label="Main Navigation">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            title="Start new problem"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden xs:inline">Home</span>
          </button>

          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            title="About PCM Agent Architecture"
          >
            <Info className="w-3.5 h-3.5 text-blue-400" />
            <span>About</span>
          </button>

          {/* Backend Status Indicator */}
          <div 
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-400 bg-slate-900/40 border border-slate-800/60 rounded-md font-mono"
            title={`Backend endpoint: ${API_BASE_URL}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-slate-400">API</span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

