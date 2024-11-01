import React from 'react';
import { BarChart3, Database, Settings } from 'lucide-react';

interface SidebarProps {
  selectedView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedView, onViewChange }) => {
  const menuItems = [
    { id: 'tsne', icon: BarChart3, label: 'T-SNE View' },
    { id: 'data', icon: Database, label: 'Raw Data' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="bg-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out shadow-lg">
      <div className="flex items-center justify-center">
        <Database className="h-8 w-8 text-indigo-600" />
        <span className="text-2xl font-semibold text-gray-800 ml-2">Analytics</span>
      </div>
      <nav className="mt-10">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`flex items-center py-2.5 px-4 rounded transition duration-200 w-full ${
              selectedView === item.id
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="mx-4 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;