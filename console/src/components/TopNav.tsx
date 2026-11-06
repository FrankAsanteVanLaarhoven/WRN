import React, { useState, useRef, useEffect } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  Search,
  BookOpen,
  Plus,
  Headphones,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Palette,
  Check,
  LogIn,
  User,
  LogOut,
  Shield
} from 'lucide-react';
import { TopNavTab, ILLUMINATION_OPTIONS, IlluminationColor } from '../types/console';

export const TopNav: React.FC = () => {
  const {
    topNavTab,
    setTopNavTab,
    setIsCmdKOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    illuminationColor,
    setIlluminationColor,
    clientUser,
    logoutClient,
    setIsAuthModalOpen
  } = useConsole();

  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const colorMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (colorMenuRef.current && !colorMenuRef.current.contains(e.target as Node)) {
        setIsColorMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks: { id: TopNavTab; label: string }[] = [
    { id: 'projects', label: 'Projects' },
    { id: 'ai-experience', label: 'AI Experience & Security' },
    { id: 'backend-architecture', label: 'Backend Architecture' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'domains', label: 'Domains & NGINX' },
    { id: 'compute', label: 'Compute & Costs' },
    { id: 'settings', label: 'Settings' }
  ];

  const currentIllum = ILLUMINATION_OPTIONS.find(o => o.id === illuminationColor) || ILLUMINATION_OPTIONS[0];

  return (
    <header className="h-14 border-b border-border/80 bg-surface px-4 flex items-center justify-between select-none z-30 sticky top-0">
      {/* Left: Brand & Project Switcher */}
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-1.5 rounded-md bg-surface-elevated text-slate-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        {/* Logo - Minimalist at rest, illuminates neon tube ONLY on hover */}
        <div className="flex items-center space-x-2.5">
          <div
            className="w-7 h-7 rounded-lg bg-surface-elevated border border-border flex items-center justify-center relative group cursor-pointer transition-all hover-tube"
            title="WRN Coexistence Platform"
          >
            <span
              className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: 'var(--illum-color)', borderTopColor: 'transparent' }}
            />
          </div>

          {/* Project Switcher */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-surface-elevated border border-border text-xs">
            <span className="w-5 h-5 rounded bg-surface border border-border text-slate-300 font-bold flex items-center justify-center text-[10px] font-mono">
              PP
            </span>
            <span className="font-semibold text-slate-200">Personal projects</span>
            <span className="text-slate-500">/</span>
            <span className="font-bold font-mono text-illum">DAC</span>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-surface border border-border text-slate-400">
              Free
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
        </div>

        {/* Subnav Tabs */}
        <nav className="hidden lg:flex items-center space-x-1 ml-4 pl-3 border-l border-border/60">
          {navLinks.map(link => {
            const isActive = topNavTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setTopNavTab(link.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${isActive
                  ? 'active-tube-tab'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-surface-elevated/40'
                  }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right: Illumination Switcher, Search, Icons, Upgrade Button, Profile */}
      <div className="flex items-center space-x-2.5">
        {/* Changeable Illumination Palette Selector */}
        <div className="relative" ref={colorMenuRef}>
          <button
            onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-surface-elevated border border-border hover:border-illum-muted text-xs text-slate-300 transition-colors"
            title="Change Platform Illumination Color (White, Green, Blue, etc.)"
            aria-label="Select Illumination Color"
          >
            <Palette className="w-3.5 h-3.5 text-slate-400" />
            <span
              className="w-2.5 h-2.5 rounded-full transition-all"
              style={{ backgroundColor: currentIllum.hex, boxShadow: '0 0 6px var(--illum-glow)' }}
            />
            <span className="hidden sm:inline font-mono text-[11px] text-slate-300">{currentIllum.label}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Color Switcher Dropdown */}
          {isColorMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-48 p-2 rounded-xl bg-surface-elevated border border-border shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 px-2 py-1 mb-1 border-b border-border/60 flex items-center justify-between">
                <span>Illumination Color</span>
                <span className="text-[9px] text-slate-500">Hover Tube</span>
              </div>
              <div className="space-y-0.5">
                {ILLUMINATION_OPTIONS.map(opt => {
                  const isSelected = illuminationColor === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setIlluminationColor(opt.id as IlluminationColor);
                        setIsColorMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-left transition-colors ${isSelected
                        ? 'bg-surface font-semibold text-white'
                        : 'text-slate-300 hover:bg-surface/60 hover:text-white'
                        }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{
                            backgroundColor: opt.hex,
                            boxShadow: isSelected ? `0 0 8px ${opt.hex}` : 'none'
                          }}
                        />
                        <span>{opt.label}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-illum" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Search */}
        <button
          onClick={() => setIsCmdKOpen(true)}
          className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-surface-elevated border border-border hover:border-illum-muted text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono text-xs">Search...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] font-mono text-slate-500">
            ⌘K
          </kbd>
        </button>

        {/* Top Icons */}
        <div className="hidden md:flex items-center space-x-1 text-slate-400">
          <button className="p-1.5 rounded-md hover:bg-surface-elevated hover:text-white" title="Documentation">
            <BookOpen className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-md hover:bg-surface-elevated hover:text-white" title="Create">
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-md hover:bg-surface-elevated hover:text-white" title="Support">
            <Headphones className="w-4 h-4" />
          </button>
        </div>

        {/* Upgrade Button - Sleek at rest, neon tube on hover */}
        <button
          className="px-3 py-1.5 rounded-lg neon-tube-button text-xs font-bold flex items-center space-x-1 cursor-pointer transition-all hover:scale-105"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>Upgrade</span>
        </button>

        {/* Client Login & Account Profile (Replaces static openmeta avatar) */}
        {!clientUser ? (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-3 py-1.5 rounded-lg border border-border bg-surface-elevated hover-tube text-xs font-semibold text-slate-200 flex items-center space-x-1.5 transition-all"
            title="Log in to Client Account"
          >
            <LogIn className="w-3.5 h-3.5 text-illum" />
            <span>Client Login</span>
          </button>
        ) : (
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 pl-1.5 pr-2 py-1 rounded-lg bg-surface-elevated border border-border hover-tube text-xs transition-all"
              aria-label="Client Account Menu"
            >
              <div
                className="w-6 h-6 rounded-full bg-surface border border-border flex items-center justify-center text-[10px] font-bold text-illum"
              >
                {clientUser.avatarInitials}
              </div>
              <span className="hidden xl:inline text-xs font-medium text-slate-200 max-w-[110px] truncate">
                {clientUser.name}
              </span>
              <span className="hidden sm:inline text-[9px] px-1.5 py-0.2 rounded bg-illum-muted text-illum font-mono">
                {clientUser.role}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Client Account Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-60 p-2.5 rounded-xl bg-surface-elevated border border-border shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-2 rounded-lg bg-surface border border-border/80 mb-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-7 h-7 rounded-full bg-surface-elevated border border-illum flex items-center justify-center font-bold text-xs text-illum">
                      {clientUser.avatarInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-white truncate">{clientUser.name}</div>
                      <div className="text-[10px] font-mono text-slate-400 truncate">{clientUser.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-border/60 text-[10px] text-slate-400">
                    <span>Role: <strong className="text-illum">{clientUser.role}</strong></span>
                    <span>Org: <strong className="text-slate-200">{clientUser.organization}</strong></span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full px-2 py-1.5 rounded-lg text-left text-slate-300 hover:bg-surface hover:text-white flex items-center space-x-2 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Switch Client Account</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setTopNavTab('settings');
                    }}
                    className="w-full px-2 py-1.5 rounded-lg text-left text-slate-300 hover:bg-surface hover:text-white flex items-center space-x-2 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-slate-400" />
                    <span>Project & API Settings</span>
                  </button>

                  <div className="border-t border-border/60 my-1 pt-1">
                    <button
                      onClick={() => {
                        logoutClient();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-2 py-1.5 rounded-lg text-left text-rose-400 hover:bg-rose-500/10 flex items-center space-x-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
