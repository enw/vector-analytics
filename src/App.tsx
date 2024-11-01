import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';

const queryClient = new QueryClient();

function App() {
  const [selectedView, setSelectedView] = useState('tsne');
  const [config, setConfig] = useState({
    connectionString: '',
    selectedTables: [] as string[],
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          selectedView={selectedView} 
          onViewChange={setSelectedView}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Dashboard 
            selectedView={selectedView} 
            config={config}
            onConfigChange={setConfig}
          />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;