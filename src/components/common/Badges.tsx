import React from 'react';
import type { EmailClassification, RiskLevel } from '../../types';
import { ShieldCheck, AlertTriangle, AlertOctagon, ShieldAlert, Tag } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  score?: number;
  showScore?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, score, showScore = false }) => {
  const styles = {
    low: 'bg-emerald-950/70 text-emerald-400 border-emerald-800/60',
    medium: 'bg-amber-950/70 text-amber-400 border-amber-800/60',
    high: 'bg-orange-950/70 text-orange-400 border-orange-800/60',
    critical: 'bg-red-950/80 text-red-400 border-red-800/80 animate-pulse'
  };

  const icons = {
    low: <ShieldCheck className="w-3.5 h-3.5" />,
    medium: <AlertTriangle className="w-3.5 h-3.5" />,
    high: <AlertTriangle className="w-3.5 h-3.5" />,
    critical: <AlertOctagon className="w-3.5 h-3.5" />
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[level]}`}>
      {icons[level]}
      <span className="uppercase tracking-wider">{level} RISK</span>
      {showScore && score !== undefined && <span className="font-mono ml-1 opacity-90">({score}/100)</span>}
    </span>
  );
};

interface ClassificationBadgeProps {
  classification: EmailClassification;
}

export const ClassificationBadge: React.FC<ClassificationBadgeProps> = ({ classification }) => {
  const styles = {
    legitimate: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50',
    spam: 'bg-rose-900/40 text-rose-300 border-rose-700/50',
    phishing: 'bg-purple-900/50 text-purple-300 border-purple-700/50',
    promotional: 'bg-blue-900/40 text-blue-300 border-blue-700/50',
    suspicious: 'bg-amber-900/40 text-amber-300 border-amber-700/50'
  };

  const icons = {
    legitimate: <ShieldCheck className="w-3.5 h-3.5" />,
    spam: <ShieldAlert className="w-3.5 h-3.5" />,
    phishing: <AlertOctagon className="w-3.5 h-3.5" />,
    promotional: <Tag className="w-3.5 h-3.5" />,
    suspicious: <AlertTriangle className="w-3.5 h-3.5" />
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border uppercase tracking-wider ${styles[classification]}`}>
      {icons[classification]}
      {classification}
    </span>
  );
};
