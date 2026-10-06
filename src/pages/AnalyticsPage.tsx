import React, { useState } from 'react';
import { LineChart as LineChartIcon, BarChart3, PieChart as PieChartIcon, Calendar, Filter } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, BarChart, Bar } from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '30d' | '90d'>('30d');

  // Interactive datasets mapped by selected time range
  const trendData = {
    today: [
      { label: '00:00', volume: 120, spamRate: 15 },
      { label: '04:00', volume: 80, spamRate: 12 },
      { label: '08:00', volume: 340, spamRate: 28 },
      { label: '12:00', volume: 520, spamRate: 35 },
      { label: '16:00', volume: 410, spamRate: 30 },
      { label: '20:00', volume: 280, spamRate: 22 }
    ],
    '7d': [
      { label: 'Mon', volume: 2100, spamRate: 24 },
      { label: 'Tue', volume: 2450, spamRate: 27 },
      { label: 'Wed', volume: 2300, spamRate: 25 },
      { label: 'Thu', volume: 2800, spamRate: 31 },
      { label: 'Fri', volume: 2950, spamRate: 34 },
      { label: 'Sat', volume: 1400, spamRate: 18 },
      { label: 'Sun', volume: 1250, spamRate: 16 }
    ],
    '30d': [
      { label: 'Week 1', volume: 14200, spamRate: 22 },
      { label: 'Week 2', volume: 16800, spamRate: 26 },
      { label: 'Week 3', volume: 18500, spamRate: 29 },
      { label: 'Week 4', volume: 19200, spamRate: 32 }
    ],
    '90d': [
      { label: 'Month 1', volume: 42000, spamRate: 21 },
      { label: 'Month 2', volume: 48500, spamRate: 25 },
      { label: 'Month 3', volume: 54150, spamRate: 28 }
    ]
  }[timeRange];

  const categoryData = [
    { category: 'Credential Theft', count: 4182, fill: '#a855f7' },
    { category: 'Financial Scam', count: 3240, fill: '#f43f5e' },
    { category: 'Fake Offers', count: 6890, fill: '#f59e0b' },
    { category: 'Malware Droppers', count: 1850, fill: '#ef4444' },
    { category: 'Promotional Abuse', count: 12400, fill: '#3b82f6' },
    { category: 'Phishing URLs', count: 3820, fill: '#8b5cf6' }
  ];

  const riskDistData = [
    { risk: 'Low (0-25)', count: 91280, color: '#10b981' },
    { risk: 'Medium (26-50)', count: 12400, color: '#f59e0b' },
    { risk: 'High (51-75)', count: 20678, color: '#f97316' },
    { risk: 'Critical (76-100)', count: 4182, color: '#ef4444' }
  ];

  const classificationDonut = [
    { name: 'Legitimate', value: 91280, color: '#10b981' },
    { name: 'Spam', value: 34218, color: '#f43f5e' },
    { name: 'Phishing', value: 4182, color: '#a855f7' },
    { name: 'Promotional', value: 12400, color: '#3b82f6' },
    { name: 'Suspicious', value: 3820, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-6">
      {/* Time Range Filter Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Analytics Timeframe:</span>
        </div>
        <div className="flex items-center gap-2">
          {(['today', '7d', '30d', '90d'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                timeRange === range
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Row 1: Line Chart & Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Spam Trend Line Chart */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <LineChartIcon className="w-4 h-4 text-cyan-400" />
              Spam Volume Trend ({timeRange.toUpperCase()})
            </h3>
            <p className="text-xs text-slate-400">Total volume of scanned email traffic over selected duration</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="label" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
                <Line type="monotone" dataKey="volume" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 4 }} name="Total Emails" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Classification Distribution Donut */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-emerald-400" />
              Classification Breakdown
            </h3>
            <p className="text-xs text-slate-400">Proportion of scanned emails across categories</p>
            <div className="h-48 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={classificationDonut} innerRadius={55} outerRadius={75} paddingAngle={3} dataKey="value">
                    {classificationDonut.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/80">
            {classificationDonut.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 font-medium truncate">{item.name}</span>
                <span className="font-mono text-slate-400 ml-auto">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Threat Categories & Risk Spectrum */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Threat Categories Bar Chart */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              Specific Threat Vector Distribution
            </h3>
            <p className="text-xs text-slate-400">Categorized breakdown of malicious payloads and lures</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
                <XAxis dataKey="category" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-15} textAnchor="end" />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Level Distribution */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-400" />
              Risk Score Spectrum
            </h3>
            <p className="text-xs text-slate-400">Total volume grouped by risk level thresholds</p>
          </div>
          <div className="space-y-3 pt-2">
            {riskDistData.map((r, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-200">{r.risk}</span>
                  <span className="font-mono" style={{ color: r.color }}>{r.count.toLocaleString()} emails</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(100, (r.count / 128540) * 100)}%`,
                      backgroundColor: r.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
