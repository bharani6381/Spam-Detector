import React, { useState, useMemo } from 'react';
import type { BIInputs } from '../types';
import { calculateBIMetrics } from '../services/storageService';
import { Calculator, DollarSign, Clock, Info } from 'lucide-react';

export const BIPage: React.FC = () => {
  const [inputs, setInputs] = useState<BIInputs>({
    employees: 250,
    emailsPerEmployeePerDay: 45,
    spamPercentage: 32,
    reviewTimeSeconds: 15,
    hourlyCost: 45
  });

  const results = useMemo(() => {
    return calculateBIMetrics(inputs);
  }, [inputs]);

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/50 flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-cyan-300 uppercase tracking-wider block">Enterprise Productivity & ROI Modeler</span>
          <p className="mt-0.5">
            These values are estimated metrics calculated for analytical modeling and budget justification purposes based on your organization's custom parameters.
          </p>
        </div>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Configurable BI Inputs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-cyan-400" />
                Organization Parameters
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Interactive Inputs</span>
            </div>

            {/* Input 1: Employees */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Number of Employees</span>
                <span className="font-mono text-cyan-400 font-bold">{inputs.employees}</span>
              </div>
              <input
                type="range"
                min={10}
                max={5000}
                step={10}
                value={inputs.employees}
                onChange={e => setInputs({ ...inputs, employees: Number(e.target.value) })}
                className="w-full accent-cyan-500 bg-slate-950 rounded cursor-pointer"
              />
            </div>

            {/* Input 2: Emails per employee per day */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Average Daily Emails per Employee</span>
                <span className="font-mono text-cyan-400 font-bold">{inputs.emailsPerEmployeePerDay}</span>
              </div>
              <input
                type="range"
                min={10}
                max={200}
                step={5}
                value={inputs.emailsPerEmployeePerDay}
                onChange={e => setInputs({ ...inputs, emailsPerEmployeePerDay: Number(e.target.value) })}
                className="w-full accent-cyan-500 bg-slate-950 rounded cursor-pointer"
              />
            </div>

            {/* Input 3: Spam Percentage */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Estimated Spam Percentage</span>
                <span className="font-mono text-amber-400 font-bold">{inputs.spamPercentage}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={75}
                step={1}
                value={inputs.spamPercentage}
                onChange={e => setInputs({ ...inputs, spamPercentage: Number(e.target.value) })}
                className="w-full accent-amber-500 bg-slate-950 rounded cursor-pointer"
              />
            </div>

            {/* Input 4: Manual review time */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Avg. Manual Review Time per Spam</span>
                <span className="font-mono text-cyan-400 font-bold">{inputs.reviewTimeSeconds} sec</span>
              </div>
              <input
                type="range"
                min={5}
                max={60}
                step={1}
                value={inputs.reviewTimeSeconds}
                onChange={e => setInputs({ ...inputs, reviewTimeSeconds: Number(e.target.value) })}
                className="w-full accent-cyan-500 bg-slate-950 rounded cursor-pointer"
              />
            </div>

            {/* Input 5: Hourly cost */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Average Employee Hourly Cost ($)</span>
                <span className="font-mono text-emerald-400 font-bold">${inputs.hourlyCost} / hr</span>
              </div>
              <input
                type="range"
                min={15}
                max={200}
                step={5}
                value={inputs.hourlyCost}
                onChange={e => setInputs({ ...inputs, hourlyCost: Number(e.target.value) })}
                className="w-full accent-emerald-500 bg-slate-950 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Impact & ROI Dashboard */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/90 space-y-6">
            <h3 className="text-sm font-bold text-slate-100 border-b border-slate-800 pb-3">
              Calculated Business Impact & Return on Investment (ROI)
            </h3>

            {/* Big Impact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Hours Saved */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/60 to-slate-900 border border-blue-800/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-300">Productivity Impact</span>
                  <Clock className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
                  {results.hoursSavedMonthly.toLocaleString()} <span className="text-sm font-sans font-medium text-slate-400">hrs/mo</span>
                </div>
                <p className="text-xs text-slate-300">
                  <span className="font-bold text-cyan-300">{results.hoursSavedAnnual.toLocaleString()} hours</span> saved per year by avoiding manual spam sorting.
                </p>
              </div>

              {/* Card 2: Financial Savings */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-800/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Financial Impact</span>
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">
                  ${results.productivitySavingsMonthly.toLocaleString()} <span className="text-sm font-sans font-medium text-slate-400">/mo</span>
                </div>
                <p className="text-xs text-slate-300">
                  <span className="font-bold text-emerald-300">${results.annualSavings.toLocaleString()}</span> annual productivity savings returned to company.
                </p>
              </div>
            </div>

            {/* Secondary KPI Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="text-[10px] uppercase font-bold text-slate-400">Total Monthly Spam</div>
                <div className="text-xl font-extrabold text-slate-100 font-mono mt-1">{results.totalSpamMonthly.toLocaleString()}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="text-[10px] uppercase font-bold text-slate-400">High Risk Threats Prevented</div>
                <div className="text-xl font-extrabold text-amber-400 font-mono mt-1">{results.threatsPreventedCount.toLocaleString()}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="text-[10px] uppercase font-bold text-slate-400">Spam Identification Rate</div>
                <div className="text-xl font-extrabold text-emerald-400 font-mono mt-1">96.8%</div>
              </div>
            </div>

            {/* Mathematical Formula Footnote */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-400 space-y-1">
              <div className="text-slate-300 font-bold uppercase tracking-wider font-sans mb-1">Calculation Methodology:</div>
              <div>Time Saved = Spam Emails Blocked × Average Review Time</div>
              <div>Productivity Savings = Time Saved × Hourly Cost</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
