import React from 'react';
import type { EmailRecord } from '../types';
import { RiskBadge, ClassificationBadge } from '../components/common/Badges';
import { Mail, ShieldAlert, AlertOctagon, Activity, ShieldCheck, Shield, ArrowUpRight, TrendingUp, ChevronRight, Eye } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis } from 'recharts';

interface DashboardPageProps {
  emails: EmailRecord[];
  onNavigate: (route: string, param?: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ emails, onNavigate }) => {
  const kpis = [
    { label: 'Total Emails Analyzed', value: '128,540', change: '+12.4%', icon: Mail, color: 'text-blue-400', bg: 'bg-blue-950/40 border-blue-800/50' },
    { label: 'Spam Detected', value: '34,218', change: '+8.1%', icon: ShieldAlert, color: 'text-rose-400', bg: 'bg-rose-950/40 border-rose-800/50' },
    { label: 'Phishing Attempts', value: '4,182', change: '+15.3%', icon: AlertOctagon, color: 'text-purple-400', bg: 'bg-purple-950/40 border-purple-800/50' },
    { label: 'Average Risk Score', value: '64.8', change: '-2.1 pts', icon: Activity, color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800/50' },
    { label: 'Detection Rate', value: '96.8%', change: '+0.4%', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800/50' },
    { label: 'Threats Blocked', value: '4,182', change: '+14.2%', icon: Shield, color: 'text-cyan-400', bg: 'bg-cyan-950/40 border-cyan-800/50' }
  ];

  const pieData = [
    { name: 'Legitimate', value: 91280, color: '#10b981' },
    { name: 'Spam', value: 34218, color: '#f43f5e' },
    { name: 'Phishing', value: 4182, color: '#a855f7' },
    { name: 'Promotional', value: 12400, color: '#3b82f6 font' },
    { name: 'Suspicious', value: 3820, color: '#f59e0b' }
  ];

  const trendData = [
    { time: '00:00', spam: 120, phishing: 12 },
    { time: '04:00', spam: 85, phishing: 8 },
    { time: '08:00', spam: 340, phishing: 45 },
    { time: '12:00', spam: 520, phishing: 82 },
    { time: '16:00', spam: 410, phishing: 64 },
    { time: '20:00', spam: 280, phishing: 30 }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className={`p-4 rounded-xl border backdrop-blur-md transition hover:scale-[1.02] ${kpi.bg}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</span>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <div className="text-2xl font-extrabold text-slate-100 font-mono tracking-tight">{kpi.value}</div>
              <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-emerald-400">
                <ArrowUpRight className="w-3 h-3" />
                <span>{kpi.change} vs last week</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spam & Phishing Trend Line */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Real-Time Spam & Phishing Threat Rate
              </h3>
              <p className="text-xs text-slate-400">Live hourly volume distribution across protected endpoints</p>
            </div>
            <button onClick={() => onNavigate('analytics')} className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1">
              Full Analytics <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="spamGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="phishGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
                <Area type="monotone" dataKey="spam" stroke="#f43f5e" fillOpacity={1} fill="url(#spamGrad)" name="Spam Volume" />
                <Area type="monotone" dataKey="phishing" stroke="#a855f7" fillOpacity={1} fill="url(#phishGrad)" name="Phishing Attacks" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Classification Breakdown Donut */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-100 mb-1">Email Distribution</h3>
            <p className="text-xs text-slate-400 mb-4">Breakdown of scanned email categories</p>
            <div className="h-44 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-lg font-extrabold text-slate-100 font-mono">145.8K</span>
                <span className="text-[10px] uppercase text-slate-400">Total Scans</span>
              </div>
            </div>
          </div>
          <div className="space-y-1.5 mt-2">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300 font-medium">{item.name}</span>
                </div>
                <span className="font-mono text-slate-400">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Flagged Emails Feed Table */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100">Recent High-Risk Scans</h3>
            <p className="text-xs text-slate-400">Most recently processed emails requiring analyst verification</p>
          </div>
          <button onClick={() => onNavigate('history')} className="text-xs font-semibold text-cyan-400 hover:underline">
            View All History →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Sender</th>
                <th className="py-3 px-3">Subject</th>
                <th className="py-3 px-3">Classification</th>
                <th className="py-3 px-3">Risk Score</th>
                <th className="py-3 px-3">Confidence</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {emails.slice(0, 5).map(email => (
                <tr key={email.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3 font-mono text-slate-300 max-w-[200px] truncate">{email.sender}</td>
                  <td className="py-3 px-3 font-medium text-slate-200 max-w-[280px] truncate">{email.subject}</td>
                  <td className="py-3 px-3">
                    <ClassificationBadge classification={email.classification} />
                  </td>
                  <td className="py-3 px-3">
                    <RiskBadge level={email.riskLevel} score={email.riskScore} showScore />
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-300">{email.confidence}%</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onNavigate('email-detail', email.id)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold text-xs transition inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
