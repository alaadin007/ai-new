import React from 'react';
import { X, Calendar } from 'lucide-react';

interface DateRangePickerProps {
  onClose: () => void;
  onSelect: (range: 'all' | '7d' | '30d' | '90d' | 'custom') => void;
}

export function DateRangePicker({ onClose, onSelect }: DateRangePickerProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e293b] rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-semibold">Select Date Range</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {[
            { label: 'Last 7 Days', value: '7d' },
            { label: 'Last 30 Days', value: '30d' },
            { label: 'Last 90 Days', value: '90d' },
            { label: 'All Time', value: 'all' },
            { label: 'Custom Range', value: 'custom' }
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => onSelect(value as any)}
              className="w-full px-4 py-3 bg-[#2d3b4f] hover:bg-[#374357] rounded-lg transition-colors duration-200 text-left text-gray-200"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}