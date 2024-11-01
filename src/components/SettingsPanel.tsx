import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTableList } from '../lib/api';

interface SettingsPanelProps {
  config: {
    connectionString: string;
    selectedTables: string[];
  };
  onConfigChange: (config: { connectionString: string; selectedTables: string[] }) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ config, onConfigChange }) => {
  const [connectionString, setConnectionString] = useState(config.connectionString);

  const { data: tables = [] } = useQuery({
    queryKey: ['tables', connectionString],
    queryFn: () => fetchTableList(connectionString),
    enabled: !!connectionString,
  });

  const handleSave = () => {
    onConfigChange({
      ...config,
      connectionString,
    });
  };

  const toggleTable = (table: string) => {
    const newTables = config.selectedTables.includes(table)
      ? config.selectedTables.filter(t => t !== table)
      : [...config.selectedTables, table];
    
    onConfigChange({
      ...config,
      selectedTables: newTables,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Database Configuration</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="connection" className="block text-sm font-medium text-gray-700">
              PostgreSQL Connection String
            </label>
            <input
              id="connection"
              type="text"
              value={connectionString}
              onChange={(e) => setConnectionString(e.target.value)}
              placeholder="postgresql://user:password@localhost:5432/dbname"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Save Connection
          </button>
        </div>
      </div>

      {tables.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">Select Tables</h3>
          <div className="space-y-2">
            {tables.map((table) => (
              <label key={table} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.selectedTables.includes(table)}
                  onChange={() => toggleTable(table)}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="text-gray-700">{table}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPanel;