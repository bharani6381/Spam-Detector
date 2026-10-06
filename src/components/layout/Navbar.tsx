import React from 'react';
import { Menu, Search, ToggleLeft, ToggleRight, PlusCircle, Bell, User } from 'lucide-react';
import { setDemoMode } from '../../services/predictionService';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onToggleMobileSidebar: () => void;
  demoMode: boolean;
  setDemoModeState: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onToggleMobileSidebar,
  demoMode,
  setDemoModeState
}) => {
  const titles: Record<string, { title: string; desc: string }> = {
    dashboard: { title: 'Security Control Center', desc: 'Real-time email intelligence, threat metrics, and active monitors.' },
    'spam-detector': { title: 'AI Spam & Phishing Analyzer', desc: 'Run deep NLP heuristics and risk scoring on suspicious emails.' },
    history: { title: 'Email Analysis Log', desc: 'Searchable repository of past email scans and classification records.' },
    'threat-intel': { title: 'Threat Intelligence Hub', desc: 'Active malicious domains, high-risk spam keywords, and vector patterns.' },
    analytics: { title: 'Security Analytics', desc: 'Interactive charts and classification distribution metrics.' },
    predictions: { title: 'Predictions & Forecasting', desc: '7-Day predictive threat forecast and automated AI security insights.' },
    bi: { title: 'Business Intelligence & ROI', desc: 'Calculate employee time saved, financial impact, and spam reduction.' },
    reports: { title: 'Executive Threat Reports', desc: 'Generate printable compliance & cybersecurity intelligence reports.' },
    settings: { title: 'System Configuration', desc: 'Adjust detection sensitivity, API thresholds, and notifications.' },
    about: { title: 'Architecture & Documentation', desc: 'Project overview, technology stack, and NLP/ML pipeline specifications.' },
    'email-detail': { title: 'Email Inspection View', desc: 'Comprehensive threat breakdown and security recommendations.' }
  };

  const currentInfo = titles[currentRoute] || { title: 'MailShield AI', desc: 'Email Intelligence Platform' };

  const handleToggleDemo = () => {
    const next = !demoMode;
    setDemoMode(next);
    setDemoModeState(next);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 lg:hidden hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
            {currentInfo.title}
          </h2>
          <p className="text-xs text-slate-400 hidden sm:block">{currentInfo.desc}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search bar preset */}
        <div className="relative hidden md:block w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search domain, subject..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') onNavigate('history');
            }}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Quick analyze email button */}
        <button
          onClick={() => onNavigate('spam-detector')}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-semibold hover:from-blue-500 hover:to-cyan-500 shadow-md shadow-blue-500/20 transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Analyze Email</span>
        </button>

        {/* Demo Mode / Live API Toggle */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 hidden sm:inline">
            Mode:
          </span>
          <button
            onClick={handleToggleDemo}
            className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded transition ${
              demoMode
                ? 'bg-amber-950/80 text-amber-300 border border-amber-800/80'
                : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80'
            }`}
            title="Click to toggle between Demo Heuristic Engine and Live API Endpoint"
          >
            {demoMode ? (
              <>
                <ToggleLeft className="w-4 h-4 text-amber-400" />
                <span>Demo Engine</span>
              </>
            ) : (
              <>
                <ToggleRight className="w-4 h-4 text-emerald-400" />
                <span>Live API</span>
              </>
            )}
          </button>
        </div>

        {/* Notification bell */}
        <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-1.5 right-1.5 animate-ping" />
        </button>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 text-xs font-bold">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
};
