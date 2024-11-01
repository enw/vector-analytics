import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Plot from 'react-plotly.js';
import { fetchTSNEData, fetchRawData } from '../lib/api';
import DataTable from './DataTable';
import SettingsPanel from './SettingsPanel';

interface DashboardProps {
  selectedView: string;
  config: {
    connectionString: string;
    selectedTables: string[];
  };
  onConfigChange: (config: { connectionString: string; selectedTables: string[] }) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ selectedView, config, onConfigChange }) => {
  const { data: tsneData } = useQuery({
    queryKey: ['tsne', config],
    queryFn: () => fetchTSNEData(config),
    enabled: !!config.connectionString && config.selectedTables.length > 0,
  });

  const { data: rawData } = useQuery({
    queryKey: ['raw', config],
    queryFn: () => fetchRawData(config),
    enabled: !!config.connectionString && config.selectedTables.length > 0,
  });

  const renderTSNEPlot = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">T-SNE Visualization</h2>
      {tsneData ? (
        <Plot
          data={[
            {
              type: 'scatter',
              mode: 'markers',
              x: tsneData.x || [],
              y: tsneData.y || [],
              marker: {
                size: 8,
                color: tsneData.clusters || [],
                colorscale: 'Viridis',
              },
              text: tsneData.labels || [],
              hoverinfo: 'text',
            },
          ]}
          layout={{
            autosize: true,
            height: 600,
            margin: { l: 40, r: 40, t: 40, b: 40 },
            hovermode: 'closest',
            showlegend: false,
            xaxis: { showgrid: false, zeroline: false },
            yaxis: { showgrid: false, zeroline: false },
          }}
          config={{ responsive: true }}
          className="w-full"
        />
      ) : (
        <div className="text-gray-500">Configure database connection in settings first</div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (selectedView) {
      case 'tsne':
        return renderTSNEPlot();
      case 'data':
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Raw Data</h2>
            {rawData ? (
              <DataTable data={rawData} />
            ) : (
              <div className="text-gray-500">Configure database connection in settings first</div>
            )}
          </div>
        );
      case 'settings':
        return <SettingsPanel config={config} onConfigChange={onConfigChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Data Analytics</h1>
      </div>
      <div className="grid gap-6">{renderContent()}</div>
    </div>
  );
}

export default Dashboard;