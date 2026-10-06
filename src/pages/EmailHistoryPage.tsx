import React, { useState, useMemo } from 'react';
import type { EmailRecord } from '../types';
import { ClassificationBadge, RiskBadge } from '../components/common/Badges';
import { Search, Download, Eye, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

interface EmailHistoryPageProps {
  emails: EmailRecord[];
  onNavigate: (route: string, param?: string) => void;
}

export const EmailHistoryPage: React.FC<EmailHistoryPageProps> = ({ emails, onNavigate }) => {
  const [search, setSearch] = useState('');
  const [classificationFilter, setClassificationFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'riskScore' | 'confidence'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const filteredEmails = useMemo(() => {
    return emails
      .filter(item => {
        const matchesSearch =
          item.sender.toLowerCase().includes(search.toLowerCase()) ||
          item.subject.toLowerCase().includes(search.toLowerCase()) ||
          item.body.toLowerCase().includes(search.toLowerCase());

        const matchesClass = classificationFilter === 'all' || item.classification === classificationFilter;
        const matchesRisk = riskFilter === 'all' || item.riskLevel === riskFilter;

        return matchesSearch && matchesClass && matchesRisk;
      })
      .sort((a, b) => {
        let valA: any = a.createdAt;
        let valB: any = b.createdAt;

        if (sortBy === 'riskScore') {
          valA = a.riskScore;
          valB = b.riskScore;
        } else if (sortBy === 'confidence') {
          valA = a.confidence;
          valB = b.confidence;
        }

        if (sortOrder === 'asc') return valA > valB ? 1 : -1;
        return valA < valB ? 1 : -1;
      });
  }, [emails, search, classificationFilter, riskFilter, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredEmails.length / pageSize) || 1;
  const paginatedEmails = filteredEmails.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const exportCSV = () => {
    const headers = ['ID', 'Date', 'Sender', 'Recipient', 'Subject', 'Classification', 'Risk Level', 'Risk Score', 'Confidence (%)'];
    const rows = filteredEmails.map(e => [
      e.id,
      new Date(e.createdAt).toLocaleString(),
      `"${e.sender}"`,
      `"${e.recipient}"`,
      `"${e.subject.replace(/"/g, '""')}"`,
      e.classification,
      e.riskLevel,
      e.riskScore,
      e.confidence
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MailShield_Analysis_History_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search by sender, subject, or content..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Classification Filter */}
          <select
            value={classificationFilter}
            onChange={e => {
              setClassificationFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Classifications</option>
            <option value="phishing">Phishing</option>
            <option value="spam">Spam</option>
            <option value="suspicious">Suspicious</option>
            <option value="promotional">Promotional</option>
            <option value="legitimate">Legitimate</option>
          </select>

          {/* Risk Level Filter */}
          <select
            value={riskFilter}
            onChange={e => {
              setRiskFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical font">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Export CSV button */}
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-cyan-300 transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Sender</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Classification</th>
                <th className="py-3.5 px-4">
                  <button
                    onClick={() => {
                      if (sortBy === 'riskScore') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      else { setSortBy('riskScore'); setSortOrder('desc'); }
                    }}
                    className="flex items-center gap-1 hover:text-slate-200"
                  >
                    <span>Risk Score</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-3.5 px-4">Confidence</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedEmails.map(email => (
                <tr
                  key={email.id}
                  onClick={() => onNavigate('email-detail', email.id)}
                  className="hover:bg-slate-800/40 cursor-pointer transition"
                >
                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    {new Date(email.createdAt).toLocaleDateString()} {new Date(email.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-200 font-medium max-w-[200px] truncate">{email.sender}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-200 max-w-[280px] truncate">{email.subject}</td>
                  <td className="py-3.5 px-4">
                    <ClassificationBadge classification={email.classification} />
                  </td>
                  <td className="py-3.5 px-4">
                    <RiskBadge level={email.riskLevel} score={email.riskScore} showScore />
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300 font-bold">{email.confidence}%</td>
                  <td className="py-3.5 px-4 text-right" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => onNavigate('email-detail', email.id)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold text-xs transition inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedEmails.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 text-xs">
                    No analyzed emails found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing <span className="font-semibold text-slate-200">{filteredEmails.length ? (currentPage - 1) * pageSize + 1 : 0}</span> to{' '}
            <span className="font-semibold text-slate-200">{Math.min(currentPage * pageSize, filteredEmails.length)}</span> of{' '}
            <span className="font-semibold text-slate-200">{filteredEmails.length}</span> records
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-slate-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-800"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
