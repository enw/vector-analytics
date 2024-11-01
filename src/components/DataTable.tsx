import React from 'react';
import { DataPoint } from '../lib/api';

interface DataTableProps {
  data: DataPoint[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vector</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((point) => (
            <tr key={point.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{point.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{point.label}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {point.created_at.toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{point.tags}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                [{point.vector.slice(0, 3).join(', ')}...]
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;