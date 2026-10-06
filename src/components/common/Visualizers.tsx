import React from 'react';
import type { ReasonFactor } from '../../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface RiskGaugeProps {
  score: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, riskLevel }) => {
  const getGaugeColor = () => {
    switch (riskLevel) {
      case 'low': return '#10b981'; // emerald-500
      case 'medium': return '#f59e0b'; // amber-500
      case 'high': return '#f97316'; // orange-500
      case 'critical': return '#ef4444'; // red-500
    }
  };

  const color = getGaugeColor();
  const strokeDashoffset = 283 - (283 * score) / 100;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-44 h-44 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            className="text-slate-800 stroke-current"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={color}
            strokeWidth="10"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold font-mono tracking-tight" style={{ color }}>
            {score}
          </span>
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold mt-1">
            Out of 100
          </span>
        </div>
      </div>
      <div className="mt-3 text-center">
        <span className="text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full text-slate-200 bg-slate-800/80 border border-slate-700">
          {riskLevel} RISK SCORE
        </span>
      </div>
    </div>
  );
};

interface ExplainabilityChartProps {
  reasons: ReasonFactor[];
}

export const ExplainabilityChart: React.FC<ExplainabilityChartProps> = ({ reasons }) => {
  const data = reasons.map(r => ({
    name: r.factor,
    percentage: r.percentage,
    description: r.description
  }));

  const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#3b82f6', '#8b5cf6'];

  return (
    <div className="w-full space-y-4">
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" domain={[0, 100]} unit="%" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <YAxis dataKey="name" type="category" stroke="#64748b" width={140} tick={{ fill: '#e2e8f0', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
              formatter={(val: any) => [`${val}% Contribution`, 'Risk Factor']}
            />
            <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
        {reasons.map((r, idx) => (
          <div key={idx} className="p-2.5 rounded bg-slate-900/60 border border-slate-800/80 flex items-start gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
              style={{ backgroundColor: COLORS[idx % COLORS.length] }}
            />
            <div>
              <div className="font-semibold text-slate-200 flex items-center justify-between gap-2">
                <span>{r.factor}</span>
                <span className="font-mono text-slate-400">{r.percentage}%</span>
              </div>
              <p className="text-slate-400 text-[11px] mt-0.5">{r.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
