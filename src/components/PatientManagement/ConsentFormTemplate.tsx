import React from 'react';
import { FileText, Edit2, Trash2 } from 'lucide-react';

interface ConsentFormTemplateProps {
  id: string;
  title: string;
  content: string;
  selected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ConsentFormTemplate({
  title,
  selected,
  onSelect,
  onEdit,
  onDelete
}: ConsentFormTemplateProps) {
  return (
    <div
      className={`relative group cursor-pointer p-4 rounded-lg border ${
        selected
          ? 'border-blue-500 bg-blue-500/10'
          : 'border-gray-700 hover:border-gray-600 bg-[#2d3b4f]'
      }`}
      onClick={onSelect}
    >
      <FileText className="w-8 h-8 text-gray-400 mb-2" />
      <h4 className="text-sm font-medium text-gray-300 mb-1">{title}</h4>
      
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {onEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1 hover:bg-[#374357] rounded-lg mr-1"
          >
            <Edit2 className="w-4 h-4 text-gray-400" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 hover:bg-[#374357] rounded-lg"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        )}
      </div>
    </div>
  );
}