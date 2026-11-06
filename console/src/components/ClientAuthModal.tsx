import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  X,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  UserCheck
} from 'lucide-react';

export const ClientAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    clientUser,
    loginClient,
    logoutClient
  } = useConsole();

  const [authMethod, setAuthMethod] = useState<'magic_link' | 'password'>('magic_link');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessMessage, setIsSuccessMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    loginClient(email, email.split('@')[0], 'Developer');
    setIsSuccessMessage(`Signed in as ${email}`);
    setTimeout(() => {
      setIsSuccessMessage(null);
      setIsAuthModalOpen(false);
    }, 800);
  };

  const handleOAuthLogin = (provider: 'Google' | 'GitHub' | 'Apple') => {
    loginClient(`${provider.toLowerCase()}@client.wrn.io`, `${provider} User`, 'Developer');
    setIsSuccessMessage(`Authenticated via ${provider}`);
    setTimeout(() => {
      setIsSuccessMessage(null);
      setIsAuthModalOpen(false);
    }, 800);
  };

  const handleQuickLogin = (email: string, name: string, role: 'Owner' | 'Developer' | 'Security Officer') => {
    loginClient(email, name, role);
    setIsSuccessMessage(`Welcome back, ${name}`);
    setTimeout(() => {
      setIsSuccessMessage(null);
      setIsAuthModalOpen(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-surface-elevated border border-border p-6 shadow-2xl transition-all neon-tube-card">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-surface transition-colors"
          aria-label="Close authentication modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface border border-border">
            <span
              className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: 'var(--illum-color)', borderTopColor: 'transparent' }}
            />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {clientUser ? 'Client Account & Session' : 'Sign in to your client account'}
          </h2>
          <p className="text-xs text-slate-400">
            {clientUser
              ? `Currently signed in as ${clientUser.email}`
              : 'Authenticate with Appwrite Auth to manage your projects, agents & deployments'}
          </p>
        </div>

        {isSuccessMessage && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center space-x-2">
            <UserCheck className="w-4 h-4 shrink-0" />
            <span>{isSuccessMessage}</span>
          </div>
        )}

        {clientUser ? (
          /* Active Client Session Card */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-surface border border-border space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-surface-elevated border border-illum flex items-center justify-center font-bold text-sm text-illum">
                  {clientUser.avatarInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{clientUser.name}</div>
                  <div className="text-xs font-mono text-slate-400 truncate">{clientUser.email}</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-illum-muted text-illum border border-illum-muted">
                  {clientUser.role}
                </span>
              </div>

              <div className="pt-2 border-t border-border/60 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                <div>Organization: <span className="text-slate-200">{clientUser.organization}</span></div>
                <div>User ID: <span className="text-slate-200">{clientUser.id}</span></div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="flex-1 py-2 rounded-lg bg-surface hover:bg-surface-elevated border border-border text-xs font-semibold text-slate-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  logoutClient();
                  setIsSuccessMessage('Logged out successfully');
                  setTimeout(() => setIsSuccessMessage(null), 1200);
                }}
                className="flex-1 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-semibold text-rose-400 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          /* Unauthenticated Login Forms */
          <div className="space-y-4">
            {/* Social OAuth Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleOAuthLogin('Google')}
                className="py-2 px-3 rounded-lg bg-surface border border-border hover-tube text-xs font-medium text-slate-200 flex items-center justify-center space-x-1.5 transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8 0-1.3.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleOAuthLogin('GitHub')}
                className="py-2 px-3 rounded-lg bg-surface border border-border hover-tube text-xs font-medium text-slate-200 flex items-center justify-center space-x-1.5 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </button>

              <button
                type="button"
                onClick={() => handleOAuthLogin('Apple')}
                className="py-2 px-3 rounded-lg bg-surface border border-border hover-tube text-xs font-medium text-slate-200 flex items-center justify-center space-x-1.5 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.01-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.74-.95 2.78 1.01.08 1.97-.53 2.59-1.28z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink mx-3 text-[11px] text-slate-500 uppercase font-mono tracking-wider">
                or email
              </span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1" htmlFor="auth-email">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    id="auth-email"
                    name="auth-email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-surface border border-border focus:border-illum text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {authMethod === 'password' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1" htmlFor="auth-password">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="auth-password"
                      name="auth-password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-surface border border-border focus:border-illum text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px]">
                <button
                  type="button"
                  onClick={() => setAuthMethod(authMethod === 'magic_link' ? 'password' : 'magic_link')}
                  className="text-slate-400 hover:text-illum transition-colors"
                >
                  {authMethod === 'magic_link' ? 'Use password instead' : 'Use magic link instead'}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 rounded-lg neon-tube-button text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
              >
                <span>{authMethod === 'magic_link' ? 'Send magic link' : 'Sign in'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick 1-Click Client Accounts */}
            <div className="pt-3 border-t border-border/60">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-2 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-illum" />
                <span>One-Click Client Profiles:</span>
              </div>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('frank@openmeta.io', 'Frank Van Laarhoven', 'Owner')}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-surface hover:bg-surface-elevated border border-border hover-tube text-xs flex items-center justify-between text-left transition-colors"
                >
                  <div>
                    <span className="font-semibold text-white">Frank Van Laarhoven</span>
                    <span className="text-slate-400 text-[11px] block font-mono">frank@openmeta.io</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-illum-muted text-illum font-mono">
                    Owner
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('security@wrn.io', 'Security Officer', 'Security Officer')}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-surface hover:bg-surface-elevated border border-border hover-tube text-xs flex items-center justify-between text-left transition-colors"
                >
                  <div>
                    <span className="font-semibold text-white">Security Officer</span>
                    <span className="text-slate-400 text-[11px] block font-mono">security@wrn.io</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface border border-border text-slate-300 font-mono">
                    Security
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-border/40 text-[11px] text-center text-slate-500 flex items-center justify-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Secured with Appwrite Auth & WRN RFC 9421 Passports</span>
        </div>
      </div>
    </div>
  );
};
