import React from 'react';
import type { EmailRecord } from '../types';
import { ClassificationBadge } from '../components/common/Badges';
import { RiskGauge, ExplainabilityChart } from '../components/common/Visualizers';
import { updateEmailStatus, deleteEmailRecord } from '../services/storageService';
import { ArrowLeft, ShieldCheck, AlertOctagon, Trash2, UserX, Sparkles } from 'lucide-react';

interface EmailDetailsPageProps {
  email: EmailRecord | null;
  onNavigate: (route: string) => void;
  onEmailUpdated: () => void;
}

export const EmailDetailsPage: React.FC<EmailDetailsPageProps> = ({ email, onNavigate, onEmailUpdated }) => {
  if (!email) {
    return (
      <div className="p-12 text-center text-slate-400">
        <p>No email selected for inspection.</p>
        <button onClick={() => onNavigate('history')} className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg">
          Return to History
        </button>
      </div>
    );
  }

  const handleMarkSafe = () => {
    updateEmailStatus(email.id, 'safe');
    onEmailUpdated();
  };

  const handleBlockSender = () => {
    updateEmailStatus(email.id, 'blocked');
    onEmailUpdated();
  };

  const handleReportPhishing = () => {
    updateEmailStatus(email.id, 'flagged');
    onEmailUpdated();
  };

  const handleDelete = () => {
    deleteEmailRecord(email.id);
    onEmailUpdated();
    onNavigate('history');
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('history')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Email History</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleMarkSafe}
            className="px-3 py-1.5 rounded-lg bg-emerald-950/70 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/80 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Mark Safe</span>
          </button>
          <button
            onClick={handleBlockSender}
            className="px-3 py-1.5 rounded-lg bg-rose-950/70 text-rose-300 border border-rose-800/60 hover:bg-rose-900/80 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <UserX className="w-3.5 h-3.5" />
            <span>Block Sender</span>
          </button>
          <button
            onClick={handleReportPhishing}
            className="px-3 py-1.5 rounded-lg bg-purple-950/70 text-purple-300 border border-purple-800/60 hover:bg-purple-900/80 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Report Phishing</span>
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 border border-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Email Content Inspection */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
                Message ID: {email.id}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {new Date(email.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="w-20 font-semibold uppercase tracking-wider text-slate-500">From:</span>
                <span className="font-mono text-cyan-300 font-bold">{email.sender}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-20 font-semibold uppercase tracking-wider text-slate-500">To:</span>
                <span className="font-mono text-slate-300">{email.recipient}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-20 font-semibold uppercase tracking-wider text-slate-500">Subject:</span>
                <span className="font-bold text-slate-100 text-sm">{email.subject}</span>
              </div>
            </div>

            {/* Email Body Editor Frame (Sanitized View) */}
            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2 pb-1 border-b border-slate-900 flex items-center justify-between">
                <span>Sanitized Plain-Text Body</span>
                <span className="text-emerald-400 font-mono">XSS Protected</span>
              </div>
              <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed font-sans">
                {email.body}
              </pre>
            </div>

            {/* Extracted URLs Section */}
            {email.urls && email.urls.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Extracted URLs ({email.urls.length})
                </div>
                <div className="space-y-1 text-xs">
                  {email.urls.map((url, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-amber-300 flex items-center justify-between gap-2 overflow-x-auto">
                      <span className="truncate">{url}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 font-sans font-semibold shrink-0">
                        Untrusted Link
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Risk & Explainability Diagnosis */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/90 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-100">AI Risk Assessment</h3>
                <p className="text-xs text-slate-400">Automated NLP threat evaluation</p>
              </div>
              <ClassificationBadge classification={email.classification} />
            </div>

            <div className="flex items-center justify-center py-2">
              <RiskGauge score={email.riskScore} riskLevel={email.riskLevel} />
            </div>

            {/* Explainable AI */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Explainable AI Breakdown
              </h4>
              <ExplainabilityChart reasons={email.reasons} />
            </div>

            {/* Detected Indicators */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Threat Indicators
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {email.indicators.map((ind, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded text-xs font-semibold bg-rose-950/70 text-rose-300 border border-rose-800/60">
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Security Action Recommendation */}
            {email.recommendedAction && (
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/50 text-xs">
                <div className="font-bold text-cyan-300 uppercase tracking-wider mb-1">Recommended Action:</div>
                <p className="text-slate-300 leading-relaxed">{email.recommendedAction}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
