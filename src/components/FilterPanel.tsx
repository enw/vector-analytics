import React from 'react';
import { Filter } from 'lucide-react';

interface FilterPanelProps {
  dateRange: { start: Date; end: Date };
  selectedTags: string[];
  onDateRangeChange: (range: { start: Date; end: Date }) => void;
  onTagsChange: (tags: string[]) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  dateRange,
  selectedTags,
  onDateRangeChange,
  onTagsChange,
}) => {
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
      <Filter className="h-5 w-5 text-gray-500" />
      <div className="space-y-2">
        <div className="flex space-x-4">
          <input
            type="date"
            value={dateRange.start.toISOString().split('T')[0]}
            onChange={(e) =>
              onDateRangeChange({ ...dateRange, start: new Date(e.target.value) })
            }
            className="px-3 py-2 border rounded-md text-sm"
          />
          <input
            type="date"
            value={dateRange.end.toISOString().split('T')[0]}
            onChange={(e) =>
              onDateRangeChange({ ...dateRange, end: new Date(e.target.value) })
            }
            className="px-3 py-2 border rounded-md text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['Important', 'Review', 'Archived'].map((tag) => (
            <button
              key={tag}
              onClick={() =>
                onTagsChange(
                  selectedTags.includes(tag)
                    ? selectedTags.filter((t) => t !== tag)
                    : [...selectedTags, tag]
                )
              }
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTags.includes(tag)
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;