import React, { useState } from 'react';
import type { SpamKeyword, ThreatDomain } from '../types';
import { initialPatterns } from '../data/mockData';
import { addThreatDomain, getStoredDomains, getStoredKeywords } from '../services/storageService';
import { ShieldAlert, Globe, Tag, Plus } from 'lucide-react';

export const ThreatIntelligencePage: React.FC = () => {
  const [domains, setDomains] = useState<ThreatDomain[]>(getStoredDomains());
  const [keywords] = useState<SpamKeyword[]>(getStoredKeywords());
  const [newDomain, setNewDomain] = useState('');
  const [newThreatType, setNewThreatType] = useState<'Phishing' | 'Malware' | 'Spoofing' | 'Botnet'>('Phishing');

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain.trim()) return;

    const updated = addThreatDomain({
      domain: newDomain.trim().toLowerCase(),
      threatType: newThreatType,
      riskScore: 95,
      blockedCount: 1,
      firstSeen: new Date().toISOString().split('T')[0],
      status: 'Blocked'
    });
    setDomains(updated);
    setNewDomain('');
  };

  return (
    <div className="space-y-6">
      {/* Top Threat Add Bar */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
        <h3 className="text-sm font-bold text-slate-100 mb-2 flex items-center gap-2">
          <Globe className="w-4 h-4 text-cyan-400" />
          Add Suspicious Domain to Global Watchlist
        </h3>
        <form onSubmit={handleAddDomain} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="e.g. malicious-phishing-host.xyz"
            value={newDomain}
            onChange={e => setNewDomain(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono w-full"
          />
          <select
            value={newThreatType}
            onChange={e => setNewThreatType(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 w-full sm:w-auto"
          >
            <option value="Phishing">Phishing</option>
            <option value="Malware">Malware</option>
            <option value="Spoofing">Spoofing</option>
            <option value="Botnet">Botnet</option>
          </select>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs hover:from-blue-500 hover:to-cyan-400 transition flex items-center justify-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Block Domain</span>
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Top Suspicious Domains */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  Top Suspicious Domains
                </h3>
                <p className="text-xs text-slate-400">High-risk external mail servers sending flagged traffic</p>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400">{domains.length} Tracked</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Domain</th>
                    <th className="py-2.5 px-3">Threat Vector</th>
                    <th className="py-2.5 px-3">Risk</th>
                    <th className="py-2.5 px-3">Blocked Count</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {domains.map(dom => (
                    <tr key={dom.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-3 text-cyan-300 font-bold">{dom.domain}</td>
                      <td className="py-3 px-3 text-slate-300">{dom.threatType}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 font-bold border border-rose-800/80">
                          {dom.riskScore}/100
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-200">{dom.blockedCount.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 font-sans">
                          {dom.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Top Spam Keywords Tag Cloud */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
            <div className="pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-400" />
                Top High-Risk Spam Keywords
              </h3>
              <p className="text-xs text-slate-400">Extracted NLP tokens frequently triggering risk alerts</p>
            </div>

            <div className="space-y-2">
              {keywords.map(kw => (
                <div key={kw.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-amber-300 font-bold">"{kw.keyword}"</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-400">
                      {kw.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-400 text-[11px]">{kw.occurrences} hits</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-400 border border-rose-800">
                      Weight {kw.riskWeight}/10
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Attack Patterns Matrix */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
        <h3 className="text-sm font-bold text-slate-100 mb-4 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-purple-400" />
          Active Attack Pattern Vectors
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {initialPatterns.map(pat => (
            <div key={pat.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-100">{pat.name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-950 text-purple-300 border border-purple-800">
                  {pat.severity}
                </span>
              </div>
              <div className="text-[11px] font-mono text-cyan-400">{pat.vector}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{pat.description}</p>
              <div className="pt-2 border-t border-slate-900 text-[11px] text-emerald-400 font-medium">
                Mitigation: {pat.mitigation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
