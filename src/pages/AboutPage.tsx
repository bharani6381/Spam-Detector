import React from 'react';
import { Shield, Cpu, Layout, Server, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const pipelineSteps = [
    { title: 'Email Ingestion', desc: 'Raw MIME/Header extraction & body parsing', icon: '01' },
    { title: 'Text Cleaning', desc: 'HTML stripping, Unicode normalization, tokenization', icon: '02' },
    { title: 'NLP Preprocessing', desc: 'Stopword removal, lemmatization (spaCy/NLTK)', icon: '03' },
    { title: 'Feature Extraction', desc: 'TF-IDF, BERT embeddings, URL & domain analysis', icon: '04' },
    { title: 'Machine Learning Model', desc: 'Gradient Boosting / Transformer Ensemble', icon: '05' },
    { title: 'Classification & Risk', desc: 'Categorize (Spam/Phishing) + 0-100 Risk Score', icon: '06' },
    { title: 'Explainable AI (XAI)', desc: 'SHAP / Factor percentage breakdown', icon: '07' },
    { title: 'Persistence & BI', desc: 'Store in Supabase / Postgres & render BI dashboard', icon: '08' },
    { title: 'Time-Series Forecast', desc: 'Predict 7-day spam volume spikes', icon: '09' }
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Overview Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-900 border border-blue-800/50 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-cyan-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Final-Year Capstone & Portfolio Project Demonstration</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
          MailShield AI – Spam Email Intelligence & Prediction Platform
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          MailShield AI solves real-world enterprise cybersecurity threats by combining Artificial Intelligence, Machine Learning, Natural Language Processing, Business Intelligence, and Time-Series Forecasting into a unified full-stack application.
        </p>
      </div>

      {/* Recommended System Architecture Pipeline Diagram */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          Recommended End-to-End ML Pipeline Architecture
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {pipelineSteps.map((step, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1 relative">
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded">
                STEP {step.icon}
              </span>
              <div className="text-xs font-bold text-slate-100 mt-1">{step.title}</div>
              <p className="text-[11px] text-slate-400 leading-normal">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Technology Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-3">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Layout className="w-4 h-4 text-cyan-400" />
            Frontend Technology Stack
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> React 19 + TypeScript + Vite</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tailwind CSS v4 (Glassmorphism Cybersecurity Theme)</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Recharts Data Visualizations</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Lucide Vector Icon Suite</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-3">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Server className="w-4 h-4 text-purple-400" />
            Backend & ML Pipeline Stack
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Python 3.11 + FastAPI microservice REST framework</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> scikit-learn + HuggingFace Transformers (BERT)</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> NLTK / spaCy NLP Tokenization & Lemmatization</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> PostgreSQL / Supabase Relational Schema</li>
          </ul>
        </div>
      </div>

      {/* Capstone Value Summary */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          Real-World Problem Solving Value
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Traditional rule-based filters fail against rapidly mutating spam vector techniques. MailShield AI transforms raw email text into structured security intelligence, offering security teams instant risk scoring, explainable decision factors, and corporate ROI metrics.
        </p>
      </div>
    </div>
  );
};
