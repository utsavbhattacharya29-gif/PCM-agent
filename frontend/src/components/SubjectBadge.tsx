import React from 'react';
import { Pi, Atom, FlaskConical, HelpCircle } from 'lucide-react';
import type { SubjectType } from '../types';

interface SubjectBadgeProps {
  subject: SubjectType;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const SubjectBadge: React.FC<SubjectBadgeProps> = ({
  subject,
  size = 'md',
  showIcon = true,
  className = '',
}) => {
  const norm = (subject || '').toLowerCase().trim();

  let label = 'GENERAL SCIENCE';
  let badgeClasses = 'bg-slate-800/80 text-slate-300 border-slate-700/60 shadow-slate-900/30';
  let iconElement = <HelpCircle className="w-4 h-4" aria-hidden="true" />;

  if (norm.includes('math')) {
    label = 'MATHEMATICS';
    badgeClasses = 'bg-blue-950/60 text-blue-300 border-blue-500/30 shadow-blue-950/40 from-blue-600/10 to-purple-600/10';
    iconElement = <Pi className="w-4 h-4 text-blue-400" aria-hidden="true" />;
  } else if (norm.includes('physic')) {
    label = 'PHYSICS';
    badgeClasses = 'bg-amber-950/60 text-amber-300 border-amber-500/30 shadow-amber-950/40 from-orange-600/10 to-amber-600/10';
    iconElement = <Atom className="w-4 h-4 text-orange-400" aria-hidden="true" />;
  } else if (norm.includes('chem')) {
    label = 'CHEMISTRY';
    badgeClasses = 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30 shadow-emerald-950/40 from-emerald-600/10 to-teal-600/10';
    iconElement = <FlaskConical className="w-4 h-4 text-emerald-400" aria-hidden="true" />;
  }

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    md: 'text-xs px-3 py-1.5 gap-2 font-semibold tracking-wider',
    lg: 'text-sm px-4 py-2 gap-2.5 font-bold tracking-widest',
  }[size];

  return (
    <span
      className={`inline-flex items-center uppercase rounded-full border shadow-sm backdrop-blur-md transition-all ${badgeClasses} ${sizeClasses} ${className}`}
      role="status"
      aria-label={`Subject: ${label}`}
    >
      {showIcon && iconElement}
      <span>{label}</span>
    </span>
  );
};

export default SubjectBadge;

