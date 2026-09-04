import React from 'react';
import { Pi, Atom, FlaskConical, Sparkles, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  onSelectPrompt: (promptText: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectPrompt }) => {
  const cards = [
    {
      id: 'math',
      title: 'Mathematics',
      symbol: '🧮',
      icon: <Pi className="w-5 h-5 text-blue-400" />,
      topics: 'Symbolic Algebra • Calculus • Polynomials • Linear Systems',
      sample: 'Simplify 2x + 3x + 5.',
      accentBorder: 'hover:border-blue-500/50',
      accentBg: 'bg-blue-950/20 hover:bg-blue-950/30',
      accentText: 'text-blue-400',
    },
    {
      id: 'physics',
      title: 'Physics',
      symbol: '⚡',
      icon: <Atom className="w-5 h-5 text-orange-400" />,
      topics: 'Classical Mechanics • Kinematics • Dynamics • Energy',
      sample: 'A 5 kg object accelerates at 2 m/s^2. Find the force.',
      accentBorder: 'hover:border-amber-500/50',
      accentBg: 'bg-amber-950/20 hover:bg-amber-950/30',
      accentText: 'text-orange-400',
    },
    {
      id: 'chem',
      title: 'Chemistry',
      symbol: '🧪',
      icon: <FlaskConical className="w-5 h-5 text-emerald-400" />,
      topics: 'Stoichiometry • Molar Mass • Solutions • Acid-Base Equilibrium',
      sample: 'How many moles are in 18 g of water?',
      accentBorder: 'hover:border-emerald-500/50',
      accentBg: 'bg-emerald-950/20 hover:bg-emerald-950/30',
      accentText: 'text-emerald-400',
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-dark-900/40 backdrop-blur-xl text-center">
      <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3">
        <Sparkles className="w-5 h-5" />
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
        Your AI science assistant is ready.
      </h3>
      <p className="text-sm text-slate-400 max-w-md mx-auto mb-7">
        Ask a question to begin. Choose a domain below or type your problem statement above.
      </p>

      {/* 3 Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectPrompt(card.sample)}
            className={`group flex flex-col justify-between p-4 rounded-2xl border border-slate-800/90 ${card.accentBg} ${card.accentBorder} transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-700`}
            aria-label={`Select ${card.title} sample problem`}
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{card.symbol}</span>
                  <span className={`text-sm font-bold tracking-wide ${card.accentText}`}>
                    {card.title}
                  </span>
                </div>
                {card.icon}
              </div>

              <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                {card.topics}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/50 flex items-center justify-between text-xs text-slate-300 font-mono">
              <span className="truncate max-w-[170px]">&ldquo;{card.sample}&rdquo;</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;
