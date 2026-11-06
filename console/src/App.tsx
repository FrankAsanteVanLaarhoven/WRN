import React, { useState } from 'react';
import { ConsoleProvider, useConsole } from './store/consoleStore';
import { TopNav } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { CommandPalette } from './components/CommandPalette';
import { CommissionModal } from './components/CommissionModal';
import { NewGrantModal } from './components/NewGrantModal';
import { NewSealModal } from './components/NewSealModal';
import { ClientAuthModal } from './components/ClientAuthModal';

// Appwrite UI Views
import { AppwriteOverviewView } from './views/AppwriteOverviewView';
import { AppwritePlaygroundView } from './views/AppwritePlaygroundView';
import { AppwriteMarketplaceView } from './views/AppwriteMarketplaceView';
import { AppwriteSettingsView } from './views/AppwriteSettingsView';
import { DomainsNginxView } from './views/DomainsNginxView';
import { ComputeCostAnalysisView } from './views/ComputeCostAnalysisView';
import { GrokAgentsHarnessView } from './views/GrokAgentsHarnessView';

// WRN Passport Coexistence & Foundry Views
import { OntologyView } from './views/OntologyView';
import { LineageDagView } from './views/LineageDagView';
import { DevinConsoleView } from './views/DevinConsoleView';
import { AccessGrantsView } from './views/AccessGrantsView';
import { SecurityHarnessView } from './views/SecurityHarnessView';
import { PolicyMatrixView } from './views/PolicyMatrixView';
import { EvaluationKpiView } from './views/EvaluationKpiView';
import { SourceRegisterView } from './views/SourceRegisterView';
import { RequestVerifierView } from './views/RequestVerifierView';
import { SchemasView } from './views/SchemasView';
import {
  Boxes,
  GitFork,
  Terminal,
  KeyRound,
  ShieldCheck,
  LayoutGrid,
  FileCheck2,
  FileJson,
  BarChart3,
  BookOpen
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { topNavTab, projectServiceTab, activeTab, setActiveTab } = useConsole();
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);
  const [isNewGrantOpen, setIsNewGrantOpen] = useState(false);
  const [isNewSealOpen, setIsNewSealOpen] = useState(false);

  const passportTabs = [
    { id: 'ontology' as const, label: 'Ontology', icon: Boxes },
    { id: 'lineage' as const, label: 'Sealed DAG', icon: GitFork },
    { id: 'devin-console' as const, label: 'Devin Trace', icon: Terminal },
    { id: 'grants' as const, label: 'Grants Studio', icon: KeyRound },
    { id: 'request-verifier' as const, label: 'RFC 9421', icon: FileCheck2 },
    { id: 'security-harness' as const, label: '14 Fixtures', icon: ShieldCheck },
    { id: 'policy-matrix' as const, label: '9-Zone Matrix', icon: LayoutGrid },
    { id: 'schemas' as const, label: 'Schemas', icon: FileJson },
    { id: 'evaluation' as const, label: 'KPIs', icon: BarChart3 },
    { id: 'sources' as const, label: 'Standards', icon: BookOpen },
  ];

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background text-slate-100">
      <TopNav />

      {/* Full-width views for Marketplace, Domains & NGINX, Compute, Settings */}
      {topNavTab === 'marketplace' && <AppwriteMarketplaceView />}
      {topNavTab === 'domains' && <DomainsNginxView />}
      {topNavTab === 'compute' && <ComputeCostAnalysisView />}
      {topNavTab === 'settings' && <AppwriteSettingsView />}

      {/* Projects Console View (with Appwrite Left Sidebar) */}
      {topNavTab === 'projects' && (
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            onOpenCommission={() => setIsCommissionOpen(true)}
            onOpenNewGrant={() => setIsNewGrantOpen(true)}
          />

          <main className="flex-1 flex flex-col overflow-hidden relative">
            {projectServiceTab === 'overview' && <AppwriteOverviewView />}
            {projectServiceTab === 'apps' && <AppwriteOverviewView />}
            {projectServiceTab === 'api-keys' && <AppwriteOverviewView />}
            {projectServiceTab === 'playground' && <AppwritePlaygroundView />}
            {projectServiceTab === 'auth' && <AppwriteOverviewView />}
            {projectServiceTab === 'databases' && <GrokAgentsHarnessView />}
            {projectServiceTab === 'storage' && <AppwriteOverviewView />}
            {projectServiceTab === 'functions' && <AppwriteOverviewView />}
            {projectServiceTab === 'messaging' && <AppwriteOverviewView />}
            {projectServiceTab === 'sites' && <DomainsNginxView />}
            {projectServiceTab === 'activity' && <DevinConsoleView />}
            {projectServiceTab === 'usage' && <ComputeCostAnalysisView />}
            {projectServiceTab === 'firewall' && <RequestVerifierView />}
            {projectServiceTab === 'grok-agents' && <GrokAgentsHarnessView />}

            {/* WRN Passport Coexistence & Foundry Mode */}
            {projectServiceTab === 'passport-foundry' && (
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Foundry Sub-Toolbar */}
                <div className="h-10 border-b border-border bg-surface-elevated/70 px-4 flex items-center space-x-1 overflow-x-auto text-xs font-mono shrink-0">
                  <span className="text-[11px] text-slate-400 mr-2 font-bold uppercase">WRN Foundry:</span>
                  {passportTabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md transition-all ${
                          isActive
                            ? 'active-tube-pill font-semibold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex-1 overflow-hidden">
                  {activeTab === 'ontology' && <OntologyView />}
                  {activeTab === 'lineage' && <LineageDagView onOpenNewSeal={() => setIsNewSealOpen(true)} />}
                  {activeTab === 'devin-console' && <DevinConsoleView />}
                  {activeTab === 'grants' && <AccessGrantsView onOpenNewGrant={() => setIsNewGrantOpen(true)} />}
                  {activeTab === 'request-verifier' && <RequestVerifierView />}
                  {activeTab === 'security-harness' && <SecurityHarnessView />}
                  {activeTab === 'policy-matrix' && <PolicyMatrixView />}
                  {activeTab === 'schemas' && <SchemasView />}
                  {activeTab === 'evaluation' && <EvaluationKpiView />}
                  {activeTab === 'sources' && <SourceRegisterView />}
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* Global Command Palette & Modals */}
      <CommandPalette
        onOpenCommission={() => setIsCommissionOpen(true)}
        onOpenNewGrant={() => setIsNewGrantOpen(true)}
        onOpenNewSeal={() => setIsNewSealOpen(true)}
      />

      <CommissionModal
        isOpen={isCommissionOpen}
        onClose={() => setIsCommissionOpen(false)}
      />

      <NewGrantModal
        isOpen={isNewGrantOpen}
        onClose={() => setIsNewGrantOpen(false)}
      />

      <NewSealModal
        isOpen={isNewSealOpen}
        onClose={() => setIsNewSealOpen(false)}
      />

      <ClientAuthModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ConsoleProvider>
      <MainLayout />
    </ConsoleProvider>
  );
};

export default App;
