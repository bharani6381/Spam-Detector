import React, { useState } from 'react';
import { getApiEndpoint, setApiEndpoint, setDemoMode } from '../services/predictionService';
import { demoModelMetrics } from '../data/mockData';
import { Cpu, ToggleLeft, ToggleRight, Server, Sliders, CheckCircle2 } from 'lucide-react';

interface SettingsPageProps {
  demoMode: boolean;
  setDemoModeState: (val: boolean) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ demoMode, setDemoModeState }) => {
  const [apiEndpoint, setEndpoint] = useState<string>(getApiEndpoint());
  const [sensitivity, setSensitivity] = useState<number>(75);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setApiEndpoint(apiEndpoint);
    setDemoMode(demoMode);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleToggleMode = () => {
    const next = !demoMode;
    setDemoMode(next);
    setDemoModeState(next);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Engine & API Configuration */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              Prediction Engine Mode & Architecture Settings
            </h3>
          </div>

          {/* Toggle */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-200">Execution Mode</div>
              <p className="text-[11px] text-slate-400">
                Choose between client-side Demo NLP Engine or a live remote Python/FastAPI ML Backend.
              </p>
            </div>
            <button
              type="button"
              onClick={handleToggleMode}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                demoMode
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-800/80'
                  : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80'
              }`}
            >
              {demoMode ? (
                <>
                  <ToggleLeft className="w-5 h-5 text-amber-400" />
                  <span>Demo Mode Active</span>
                </>
              ) : (
                <>
                  <ToggleRight className="w-5 h-5 text-emerald-400" />
                  <span>Live API Endpoint Active</span>
                </>
              )}
            </button>
          </div>

          {/* API Endpoint Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Live FastAPI ML Endpoint URL
            </label>
            <input
              type="url"
              value={apiEndpoint}
              onChange={e => setEndpoint(e.target.value)}
              placeholder="http://localhost:8000/api/predict"
              disabled={demoMode}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono disabled:opacity-40"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Used when Live API is toggled ON. Must accept POST request formatted as <code>PredictionRequest</code> JSON.
            </p>
          </div>

          {/* Sensitivity Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Detection Risk Sensitivity Threshold
              </span>
              <span className="font-mono text-cyan-400 font-bold">{sensitivity}%</span>
            </div>
            <input
              type="range"
              min={50}
              max={95}
              value={sensitivity}
              onChange={e => setSensitivity(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-950 rounded cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Lower thresholds increase sensitivity (flags borderline promotional emails). Higher thresholds reduce false positives.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs hover:from-blue-500 hover:to-cyan-400 shadow-md transition flex items-center gap-2"
            >
              <span>Save Configuration</span>
            </button>

            {savedSuccess && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Settings saved successfully!
              </span>
            )}
          </div>
        </div>
      </form>

      {/* Section 2: Model Performance Metrics */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" />
            ML Model Performance Metrics (Evaluation)
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-400 border border-blue-800">
            Demo Model Metrics
          </span>
        </div>

        {/* 5 Core Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Accuracy</div>
            <div className="text-xl font-extrabold text-emerald-400 font-mono mt-1">{demoModelMetrics.accuracy}%</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Precision</div>
            <div className="text-xl font-extrabold text-cyan-400 font-mono mt-1">{demoModelMetrics.precision}%</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Recall</div>
            <div className="text-xl font-extrabold text-blue-400 font-mono mt-1">{demoModelMetrics.recall}%</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">F1 Score</div>
            <div className="text-xl font-extrabold text-purple-400 font-mono mt-1">{demoModelMetrics.f1Score}%</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center col-span-2 sm:col-span-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">ROC-AUC</div>
            <div className="text-xl font-extrabold text-amber-400 font-mono mt-1">{demoModelMetrics.rocAuc}%</div>
          </div>
        </div>

        {/* Confusion Matrix Table */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300">Validation Confusion Matrix</div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-center">
            <div className="p-3 rounded bg-emerald-950/40 border border-emerald-800/50">
              <div className="text-emerald-400 font-bold">True Positive (TP)</div>
              <div className="text-lg text-slate-100 font-extrabold mt-0.5">{demoModelMetrics.confusionMatrix.truePositive.toLocaleString()}</div>
            </div>
            <div className="p-3 rounded bg-amber-950/40 border border-amber-800/50">
              <div className="text-amber-400 font-bold">False Positive (FP)</div>
              <div className="text-lg text-slate-100 font-extrabold mt-0.5">{demoModelMetrics.confusionMatrix.falsePositive.toLocaleString()}</div>
            </div>
            <div className="p-3 rounded bg-rose-950/40 border border-rose-800/50">
              <div className="text-rose-400 font-bold">False Negative (FN)</div>
              <div className="text-lg text-slate-100 font-extrabold mt-0.5">{demoModelMetrics.confusionMatrix.falseNegative.toLocaleString()}</div>
            </div>
            <div className="p-3 rounded bg-blue-950/40 border border-blue-800/50">
              <div className="text-blue-400 font-bold">True Negative (TN)</div>
              <div className="text-lg text-slate-100 font-extrabold mt-0.5">{demoModelMetrics.confusionMatrix.trueNegative.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
