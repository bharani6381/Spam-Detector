import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onNavigate: (route: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('secops@acme-corp.com');
  const [password, setPassword] = useState('demo123456');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20 mb-3">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">MailShield <span className="text-cyan-400">AI</span></h1>
          <p className="text-xs text-slate-400 mt-1">Sign in to access your threat intelligence dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Work Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-500/20 transition flex items-center justify-center gap-2 mt-6"
          >
            <span>Sign In to Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 mb-4 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              Demo Admin Account
            </span>
            <span className="font-mono text-[11px] text-cyan-400">secops@acme-corp.com</span>
          </div>

          <p className="text-xs text-slate-400">
            Don't have an account?{' '}
            <button onClick={() => onNavigate('register')} className="text-cyan-400 font-semibold hover:underline">
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
