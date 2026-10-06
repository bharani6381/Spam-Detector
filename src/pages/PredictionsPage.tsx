import React from 'react';
import { initialForecast } from '../data/mockData';
import { TrendingUp, AlertTriangle, ShieldCheck, Sparkles, ArrowUpRight, Zap, Target, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const PredictionsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <div>
            <h3 className="text-xs font-bold text-slate-100">Predictive Threat Intelligence Engine</h3>
            <p className="text-[11px] text-slate-400">Time-series forecasting based on historical spam vector patterns</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-amber-950/80 text-amber-300 border border-amber-800/80 shrink-0">
          Demo Time-Series Model (ARIMA/LSTM Vector)
        </span>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Daily Spam</span>
          <div className="text-2xl font-extrabold text-slate-100 font-mono mt-1">2,340</div>
          <div className="text-xs text-slate-400 mt-1">Baseline daily baseline</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Predicted 7-Day Spam</span>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">3,180</div>
          <div className="text-xs text-slate-400 mt-1">Projected peak volume</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Predicted Threat Growth</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-5 h-5 text-rose-400" />
            <span>+18.4%</span>
          </div>
          <div className="text-xs text-rose-400/80 font-semibold mt-1">Surge expected in credential lures</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Forecast Confidence</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">87.0%</div>
          <div className="text-xs text-slate-400 mt-1">Based on 90-day time vector</div>
        </div>
      </div>

      {/* Main 7-Day Forecasting Chart */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              7-Day Spam Activity & Confidence Range Forecast
            </h3>
            <p className="text-xs text-slate-400">Historical trend combined with upper and lower bound confidence intervals</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={initialForecast}>
              <defs>
                <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
              <Area type="monotone" dataKey="upperBound" stroke="transparent" fill="#38bdf8" fillOpacity={0.15} name="Upper Bound (+95% CI)" />
              <Area type="monotone" dataKey="historical" stroke="#3b82f6" strokeWidth={2} fill="url(#histGrad)" name="Historical Volume" />
              <Area type="monotone" dataKey="predicted" stroke="#06b6d4" strokeWidth={3} fill="url(#predGrad)" name="Predicted Volume" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dynamic Predictive Insights Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          Automated AI Predictive Insights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Rising Spam Activity Surge</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100">Predicted +18.4% Volume Increase over Next 7 Days</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Historical vector analysis indicates a high probability of automated botnet campaigns initiating credential harvesting drives targeting finance and HR endpoints.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>Increasing Phishing Risk</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100">Credential-Related Phishing Trend Upward</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Domain registration tracking identified 6 new spoofed domains mimicking SSO portals created in the last 48 hours.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
              <Activity className="w-4 h-4" />
              <span>Promotional Spam Peak</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100">Q4 Promotional Marketing Volume Surge Expected</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bulk commercial emails are predicted to peak around Friday afternoon. Review inbox auto-filter rules to avoid mailbox clutter.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Recommended Proactive Defense</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100">Increase Filtering Sensitivity for High-Risk TLDs</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Security analysts should elevate risk thresholds for top-level domains (.xyz, .top, .click) and require 2FA re-authentication on external wire requests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
