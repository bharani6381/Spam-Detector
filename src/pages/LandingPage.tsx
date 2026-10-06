import React from 'react';
import { Shield, Sparkles, AlertOctagon, TrendingUp, Calculator, LineChart, ArrowRight, FileSearch, ShieldCheck } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (route: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      {/* Header / Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-xl text-slate-100 tracking-tight">MailShield <span className="text-cyan-400">AI</span></span>
            <span className="text-[10px] text-slate-400 block uppercase tracking-widest font-semibold">Enterprise Email Defense</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button onClick={() => onNavigate('dashboard')} className="hover:text-cyan-400 transition">Dashboard</button>
          <button onClick={() => onNavigate('spam-detector')} className="hover:text-cyan-400 transition">Spam Detector</button>
          <button onClick={() => onNavigate('threat-intel')} className="hover:text-cyan-400 transition">Threat Intel</button>
          <button onClick={() => onNavigate('bi')} className="hover:text-cyan-400 transition">Business Intelligence</button>
          <button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition">About Architecture</button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('login')}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:text-white transition"
          >
            Sign In
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 lg:px-16 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[200px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-blue-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-md">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>AI-Powered Email Intelligence & Predictive Analytics Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Stop Spam Before It Becomes a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Cyber Threat</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            MailShield AI uses intelligent email content analysis, predictive analytics, and business intelligence to detect suspicious emails, calculate risk scores, and uncover emerging spam trends.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('spam-detector')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-base shadow-xl shadow-cyan-500/25 hover:from-blue-500 hover:to-cyan-400 transition flex items-center justify-center gap-3"
            >
              <FileSearch className="w-5 h-5" />
              <span>Analyze Email Now</span>
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-slate-900 border border-slate-700 text-slate-200 text-base hover:bg-slate-800 transition flex items-center justify-center gap-3"
            >
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>View Enterprise Dashboard</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">128,540</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Total Emails Scanned</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">96.8%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Detection Accuracy</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">4,182</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Phishing Threats Blocked</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">$142,500+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Est. Productivity Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-20 px-6 lg:px-16 bg-slate-950/60 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-100">Complete AI + Cybersecurity Intelligence Suite</h2>
            <p className="text-slate-400 mt-3 text-sm">Engineered to combine real-time NLP classification, explainable factor analysis, threat intelligence, and predictive forecasting into a unified workspace.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-blue-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                <FileSearch className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">AI Spam & Phishing Detection</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Deep text classification analyzing urgent language, spoofed headers, malicious URLs, credential prompts, and financial keywords in real time.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Explainable AI (XAI)</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Don’t just get a label. Understand exact risk factors (URL spoofing 32%, Urgent language 24%, Unknown domain 18%) visually formatted for security teams.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-purple-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">7-Day Predictive Forecasting</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Predict future spam volume spikes using historical time-series vector models and automated AI threat growth forecasts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-amber-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Business Intelligence & ROI</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Calculate corporate productivity hours saved and financial risk mitigation with an interactive business intelligence ROI modeler.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-emerald-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Threat Domain Intelligence</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Track top malicious sender domains, high-risk keyword clusters, and Business Email Compromise (BEC) attack vectors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-indigo-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Executive Compliance Reports</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Generate printable security audit reports detailing email metrics, risk distribution, threat trends, and remediation steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 lg:px-16 border-t border-slate-800/80 bg-slate-950 text-slate-500 text-xs flex flex-col md:flex-row items-center justify-between gap-4 mt-auto">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-slate-300">MailShield AI</span>
          <span>— Full-Stack Email Intelligence Platform</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('about')} className="hover:text-slate-300">About System</button>
          <button onClick={() => onNavigate('dashboard')} className="hover:text-slate-300">Dashboard</button>
          <button onClick={() => onNavigate('login')} className="hover:text-slate-300">Login</button>
        </div>
      </footer>
    </div>
  );
};
