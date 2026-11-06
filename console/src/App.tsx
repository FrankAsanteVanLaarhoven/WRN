import React, { useState } from 'react';
import { ConsoleProvider, useConsole } from './store/consoleStore';
import { TopNav } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { CommandPalette } from './components/CommandPalette';
import { CommissionModal } from './components/CommissionModal';
import { NewGrantModal } from './components/NewGrantModal';
import { NewSealModal } from './components/NewSealModal';

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

const MainLayout: React.FC = () => {
  const { activeTab } = useConsole();
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);
  const [isNewGrantOpen, setIsNewGrantOpen] = useState(false);
  const [isNewSealOpen, setIsNewSealOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background text-slate-100">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onOpenCommission={() => setIsCommissionOpen(true)}
          onOpenNewGrant={() => setIsNewGrantOpen(true)}
          onOpenNewSeal={() => setIsNewSealOpen(true)}
        />
        <main className="flex-1 flex flex-col overflow-hidden relative">
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
        </main>
      </div>

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

