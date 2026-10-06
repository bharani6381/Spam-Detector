import React, { useState } from 'react';
import type { EmailRecord, PredictionRequest, PredictionResponse } from '../types';
import { analyzeEmail } from '../services/predictionService';
import { saveEmailRecord } from '../services/storageService';
import { RiskGauge, ExplainabilityChart } from '../components/common/Visualizers';
import { ClassificationBadge, RiskBadge } from '../components/common/Badges';
import { SearchCheck, Sparkles, Send, RefreshCw, AlertOctagon, ArrowRight, Paperclip } from 'lucide-react';

interface SpamDetectorPageProps {
  onEmailAnalyzed: (email: EmailRecord) => void;
  onNavigate: (route: string, param?: string) => void;
  demoMode: boolean;
}

export const SpamDetectorPage: React.FC<SpamDetectorPageProps> = ({ onEmailAnalyzed, onNavigate, demoMode }) => {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('user@acme-corp.com');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [urlsInput, setUrlsInput] = useState('');
  const [hasAttachment, setHasAttachment] = useState(false);
  const [attachmentName, setAttachmentName] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [lastAnalyzedRecord, setLastAnalyzedRecord] = useState<EmailRecord | null>(null);

  // Preset sample emails for easy testing
  const presets = [
    {
      title: 'Phishing Spear Attack',
      sender: 'security-alert@bank-verify-online.xyz',
      subject: 'URGENT: Your Account Has Been Suspiciously Suspended',
      body: 'Dear Customer,\n\nWe detected an unauthorized login attempt from IP 192.168.4.12. To prevent permanent suspension, you MUST verify your account credentials within 24 hours.\n\nClick the link below immediately:\nhttp://bit.ly/bank-auth-secure-verify\n\nFailure to comply will result in account termination.',
      urls: 'http://bit.ly/bank-auth-secure-verify'
    },
    {
      title: 'Promotional Spam Lure',
      sender: 'promo-deals@exclusive-rewards-club.top',
      subject: 'CONGRATULATIONS! You won a $1,000 Amazon Gift Card!',
      body: 'You have been randomly chosen as today’s lucky winner! Claim your $1,000 Amazon Gift Card now before time runs out.\n\nVisit: http://185.220.101.5/claim-prize\n\nNo purchase necessary. Limited offer!',
      urls: 'http://185.220.101.5/claim-prize'
    },
    {
      title: 'Invoice BEC Scam',
      sender: 'billing-update@cloud-services-portal.com',
      subject: 'Action Required: Updated Invoice #INV-2026-8894',
      body: 'Dear Accounts Payable,\n\nPlease find attached the revised invoice for your monthly cloud infrastructure subscription. Kindly process wire transfer to our updated banking details.\n\nInvoice Amount: $14,850.00 USD',
      urls: ''
    },
    {
      title: 'Safe Internal Communication',
      sender: 'hr@acme-corp.com',
      subject: 'Q4 Annual Healthcare Benefits & Open Enrollment Window',
      body: 'Hi Everyone,\n\nOur annual Q4 healthcare open enrollment period begins next Monday, October 12th. Please review the updated benefit options attached to this email or visit our intranet HR portal at https://intranet.acme-corp.com/hr.\n\nBest regards,\nHR Benefits Team',
      urls: 'https://intranet.acme-corp.com/hr'
    }
  ];

  const loadPreset = (preset: typeof presets[0]) => {
    setSender(preset.sender);
    setSubject(preset.subject);
    setBody(preset.body);
    setUrlsInput(preset.urls);
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim() && !subject.trim()) return;

    setLoading(true);
    setResult(null);

    const urls = urlsInput
      .split('\n')
      .map(u => u.trim())
      .filter(Boolean);

    const request: PredictionRequest = {
      sender: sender || 'unknown-sender@unverified.org',
      recipient: recipient || 'user@company.com',
      subject,
      body,
      urls
    };

    try {
      const response = await analyzeEmail(request);
      setResult(response);

      // Create permanent email record
      const senderDomain = request.sender.includes('@') ? request.sender.split('@')[1] : 'unknown.org';
      const record: EmailRecord = {
        id: `msg-${Date.now()}`,
        sender: request.sender,
        recipient: request.recipient,
        subject: request.subject || '(No Subject)',
        body: request.body,
        urls: request.urls || [],
        classification: response.classification,
        confidence: response.confidence,
        riskScore: response.riskScore,
        riskLevel: response.riskLevel,
        reasons: response.reasons,
        indicators: response.indicators,
        createdAt: new Date().toISOString(),
        status: response.riskScore > 75 ? 'flagged' : 'active',
        senderDomain,
        attachments: hasAttachment && attachmentName ? [{ name: attachmentName, size: '1.2 MB', safe: response.riskScore < 50 }] : [],
        aiAnalysisSummary: response.aiAnalysisSummary,
        recommendedAction: response.recommendedAction
      };

      saveEmailRecord(record);
      setLastAnalyzedRecord(record);
      onEmailAnalyzed(record);
    } catch (err) {
      console.error('Email analysis failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Presets Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-xs font-semibold text-slate-300">Quick Test Presets:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => loadPreset(preset)}
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition"
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Email Input Form */}
        <div className="lg:col-span-6 space-y-4">
          <form onSubmit={handleAnalyze} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <SearchCheck className="w-4 h-4 text-cyan-400" />
                Email Intelligence Workbench
              </h3>
              {demoMode && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/80">
                  Demo AI Engine Active
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Sender Email
                </label>
                <input
                  type="email"
                  placeholder="security-alert@bank-online.xyz"
                  value={sender}
                  onChange={e => setSender(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Recipient Email
                </label>
                <input
                  type="email"
                  placeholder="target@acme-corp.com"
                  value={recipient}
                  onChange={e => setRecipient(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Subject Line
              </label>
              <input
                type="text"
                placeholder="URGENT: Verify your account immediately"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Email Body Content
              </label>
              <textarea
                rows={7}
                placeholder="Paste full raw email body text here..."
                value={body}
                onChange={e => setBody(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Extracted URLs (One per line)
              </label>
              <textarea
                rows={2}
                placeholder="http://bit.ly/bank-auth-verify"
                value={urlsInput}
                onChange={e => setUrlsInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={hasAttachment}
                  onChange={e => setHasAttachment(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                />
                <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                <span>Includes Attachment</span>
              </label>
              {hasAttachment && (
                <input
                  type="text"
                  placeholder="e.g. Invoice_Payment.pdf"
                  value={attachmentName}
                  onChange={e => setAttachmentName(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 flex-1 font-mono"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading || (!body.trim() && !subject.trim())}
              className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 text-white text-sm hover:from-blue-500 hover:to-cyan-500 shadow-xl shadow-cyan-500/20 disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Processing NLP Vector Analysis...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Analyze Email Risk</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: AI Analysis Result & Explainability */}
        <div className="lg:col-span-6 space-y-4">
          {result ? (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/90 space-y-6 animate-fadeIn">
              {/* Top Result Banner */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-3">
                  <RiskGauge score={result.riskScore} riskLevel={result.riskLevel} />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                      Classification Result
                    </div>
                    <div className="flex items-center gap-2">
                      <ClassificationBadge classification={result.classification} />
                      <RiskBadge level={result.riskLevel} />
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-2">
                      Confidence: <span className="font-bold text-slate-200">{result.confidence}%</span>
                    </div>
                  </div>
                </div>

                {lastAnalyzedRecord && (
                  <button
                    onClick={() => onNavigate('email-detail', lastAnalyzedRecord.id)}
                    className="px-3.5 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-cyan-300 text-xs font-semibold hover:bg-blue-600/30 transition flex items-center gap-1.5 shrink-0"
                  >
                    <span>Full Email View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Explainable AI Factor Breakdown */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Why Was This Email Flagged? (Explainable AI)
                </h4>
                <ExplainabilityChart reasons={result.reasons} />
              </div>

              {/* Detected Indicators Tag Cloud */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Detected Cyber Threat Indicators
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {result.indicators.map((ind, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded text-xs font-semibold bg-rose-950/60 text-rose-300 border border-rose-800/60 flex items-center gap-1"
                    >
                      <AlertOctagon className="w-3 h-3 text-rose-400" />
                      {ind}
                    </span>
                  ))}
                  {result.indicators.length === 0 && (
                    <span className="text-xs text-slate-400">No malicious indicators detected.</span>
                  )}
                </div>
              </div>

              {/* Recommended Security Action */}
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/40 text-xs space-y-1">
                <div className="font-bold text-cyan-300 uppercase tracking-wider">AI Recommended Action:</div>
                <p className="text-slate-300">{result.recommendedAction}</p>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800/80 border-dashed text-center flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
                <SearchCheck className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-300">Ready to Analyze Email</h4>
              <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
                Select one of the sample test presets above or paste raw email details to run instant NLP classification, risk scoring, and Explainable AI analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
