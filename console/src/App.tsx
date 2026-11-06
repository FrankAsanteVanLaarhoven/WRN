import React, { useState } from 'react';
import { ConsoleProvider, useConsole } from './store/consoleStore';
import { TopNav } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { CommandPalette } from './components/CommandPalette';
import { CommissionModal } from './components/CommissionModal';
import { NewGrantModal } from './components/NewGrantModal';
import { NewSealModal } from './components/NewSealModal';
import { ClientAuthModal } from './components/ClientAuthModal';

// WRN Production Console Views with Live Data & Workflows
import { ConsoleOverviewView } from './views/ConsoleOverviewView';
import { AuthView } from './views/AuthView';
import { DatabasesView } from './views/DatabasesView';
import { StorageView } from './views/StorageView';
import { FunctionsView } from './views/FunctionsView';
import { MessagingView } from './views/MessagingView';
import { SitesView } from './views/SitesView';
import { GitWorkflowView } from './views/GitWorkflowView';
import { WorkflowsView } from './views/WorkflowsView';
import { StepFunctionsView } from './views/StepFunctionsView';
import { IaCView } from './views/IaCView';
import { EnergyEfficiencyView } from './views/EnergyEfficiencyView';
import { FirewallView } from './views/FirewallView';
import { ActivityView } from './views/ActivityView';
import { ApiPlaygroundView } from './views/ApiPlaygroundView';
import { AgentMarketplaceView } from './views/AgentMarketplaceView';
import { ProjectSettingsView } from './views/ProjectSettingsView';
import { DomainsView } from './views/DomainsView';
import { ComputeCostAnalysisView } from './views/ComputeCostAnalysisView';
import { AgentHarnessView } from './views/AgentHarnessView';
import { VelvetParticleGrid } from './components/ui/VelvetParticleGrid';

// WRN Passport Coexistence & Foundry Views
import { OntologyView } from './views/OntologyView';
import { LineageDagView } from './views/LineageDagView';
import { AgentTraceView } from './views/AgentTraceView';
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
    { id: 'agent-trace' as const, label: 'Agent Trace', icon: Terminal },
    { id: 'grants' as const, label: 'Grants Studio', icon: KeyRound },
    { id: 'request-verifier' as const, label: 'RFC 9421', icon: FileCheck2 },
    { id: 'security-harness' as const, label: '14 Fixtures', icon: ShieldCheck },
    { id: 'policy-matrix' as const, label: '9-Zone Matrix', icon: LayoutGrid },
    { id: 'schemas' as const, label: 'Schemas', icon: FileJson },
    { id: 'evaluation' as const, label: 'KPIs', icon: BarChart3 },
    { id: 'sources' as const, label: 'Standards', icon: BookOpen },
  ];

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background text-slate-100 relative">
      {/* Subtle Velvet Feel Premium Grid Particle Backdrop */}
      <VelvetParticleGrid />

      <TopNav />

      {/* Full-width views for TopNav */}
      {topNavTab === 'workflows' && <WorkflowsView />}
      {topNavTab === 'step-functions' && <StepFunctionsView />}
      {topNavTab === 'marketplace' && <AgentMarketplaceView />}
      {topNavTab === 'domains' && <DomainsView />}
      {topNavTab === 'compute' && <ComputeCostAnalysisView />}
      {topNavTab === 'settings' && <ProjectSettingsView />}

      {/* Projects Console View (with WRN Left Sidebar) */}
      {topNavTab === 'projects' && (
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            onOpenCommission={() => setIsCommissionOpen(true)}
            onOpenNewGrant={() => setIsNewGrantOpen(true)}
          />

          <main className="flex-1 flex flex-col overflow-hidden relative">
            {projectServiceTab === 'overview' && <ConsoleOverviewView />}
            {projectServiceTab === 'apps' && <ConsoleOverviewView />}
            {projectServiceTab === 'api-keys' && <ConsoleOverviewView />}
            {projectServiceTab === 'playground' && <ApiPlaygroundView />}
            {projectServiceTab === 'auth' && <AuthView />}
            {projectServiceTab === 'databases' && <DatabasesView />}
            {projectServiceTab === 'storage' && <StorageView />}
            {projectServiceTab === 'functions' && <FunctionsView />}
            {projectServiceTab === 'messaging' && <MessagingView />}
            {projectServiceTab === 'sites' && <SitesView />}
            {projectServiceTab === 'git' && <GitWorkflowView />}
            {projectServiceTab === 'workflows' && <WorkflowsView />}
            {projectServiceTab === 'step-functions' && <StepFunctionsView />}
            {projectServiceTab === 'iac' && <IaCView />}
            {projectServiceTab === 'energy' && <EnergyEfficiencyView />}
            {projectServiceTab === 'activity' && <ActivityView />}
            {projectServiceTab === 'usage' && <ComputeCostAnalysisView />}
            {projectServiceTab === 'firewall' && <FirewallView />}
            {projectServiceTab === 'agents' && <AgentHarnessView />}

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
                  {activeTab === 'agent-trace' && <AgentTraceView />}
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
