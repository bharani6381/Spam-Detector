import React, { useState } from 'react';
import type { EmailRecord } from '../types';
import { FileText, Download, Printer, Sparkles, CheckCircle2 } from 'lucide-react';

interface ReportsPageProps {
  emails: EmailRecord[];
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ emails }) => {
  const [reportType, setReportType] = useState<'executive' | 'technical' | 'compliance'>('executive');
  const [generatedAt, setGeneratedAt] = useState<string>(new Date().toLocaleString());
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedAt(new Date().toLocaleString());
      setIsGenerating(false);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['Report Title', 'Type', 'Generated Date', 'Total Scanned', 'Detection Rate', 'Threats Blocked'];
    const row = ['MailShield Executive Threat Report', reportType, generatedAt, '128,540', '96.8%', '4,182'];
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), row.join(',')].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `MailShield_Security_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Generator Controls */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-cyan-400 shrink-0" />
          <div>
            <h3 className="text-xs font-bold text-slate-100">Executive Security Audit & Threat Report</h3>
            <p className="text-[11px] text-slate-400">Generate structured compliance and threat intelligence documents</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={reportType}
            onChange={e => setReportType(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="executive">Executive Summary Report</option>
            <option value="technical">Technical SOC Audit Report</option>
            <option value="compliance">ISO / NIS2 Compliance Report</option>
          </select>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Generating...' : 'Generate Report'}</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Container */}
      <div id="printable-report" className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 print:bg-white print:text-black print:p-0">
        {/* Document Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <div className="text-2xl font-extrabold text-slate-100 tracking-tight">MailShield <span className="text-cyan-400">AI</span></div>
            <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">
              {reportType.toUpperCase()} SECURITY INTELLIGENCE AUDIT
            </div>
          </div>
          <div className="text-right text-xs text-slate-400 font-mono">
            <div>Generated: {generatedAt}</div>
            <div>Classification: CONFIDENTIAL / SOC-2</div>
          </div>
        </div>

        {/* Section 1: Executive KPI Metrics */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">1. Key Performance Indicators</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <div className="text-[10px] uppercase text-slate-400">Total Scanned</div>
              <div className="text-xl font-extrabold text-slate-100 font-mono mt-0.5">{(128540 + emails.length).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-slate-400">Spam Volume</div>
              <div className="text-xl font-extrabold text-rose-400 font-mono mt-0.5">34,218 (26.6%)</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-slate-400">Phishing Attempts</div>
              <div className="text-xl font-extrabold text-purple-400 font-mono mt-0.5">4,182 (3.2%)</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-slate-400">Detection Accuracy</div>
              <div className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5">96.8%</div>
            </div>
          </div>
        </div>

        {/* Section 2: Top Threats Identified */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">2. Critical Threat Vectors Identified</h4>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="font-semibold text-slate-200">Credential Theft via Spoofed Microsoft 365 OAuth</span>
              <span className="font-mono text-rose-400 font-bold">1,240 Attacks Blocked</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="font-semibold text-slate-200">Executive Wire Transfer BEC Spear-Phishing</span>
              <span className="font-mono text-amber-400 font-bold">148 Targeted Attempts</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="font-semibold text-slate-200">Weaponized Invoice PDF Malware Droppers</span>
              <span className="font-mono text-purple-400 font-bold">630 Payload Attachments</span>
            </div>
          </div>
        </div>

        {/* Section 3: Predictive & BI Impact */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">3. Business Intelligence & Predictive Summary</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Over the past 30-day evaluation period, MailShield AI saved an estimated <strong>1,425 employee productivity hours</strong>, translating into <strong>$64,125.00 USD in financial savings</strong> for the organization. Predictive models project a <strong>+18.4% increase</strong> in phishing attempts over the upcoming 7 days.
          </p>
        </div>

        {/* Section 4: Security Recommendations */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">4. Recommended Remediation Plan</h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Enforce mandatory WebAuthn FIDO2 hardware tokens for C-suite and AP staff.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Block incoming emails with attachments from newly registered domains (&lt; 30 days old).</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Conduct quarterly phishing simulation training focusing on spoofed payment verification lures.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
