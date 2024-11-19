import React from 'react';
import { FileText, Edit2, Trash2 } from 'lucide-react';

interface ConsentFormListItemProps {
  id: string;
  title: string;
  selected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ConsentFormList({
  forms,
  selectedForms,
  onSelectForm,
  onEditForm,
  onDeleteForm
}: {
  forms: ConsentFormListItemProps[];
  selectedForms: string[];
  onSelectForm: (formId: string) => void;
  onEditForm: (formId: string) => void;
  onDeleteForm: (formId: string) => void;
}) {
  return (
    <div className="space-y-2">
      {forms.map(form => (
        <div
          key={form.id}
          className={`flex items-center justify-between p-3 rounded-lg ${
            selectedForms.includes(form.id)
              ? 'bg-blue-500/10 border border-blue-500'
              : 'bg-[#2d3b4f] hover:bg-[#374357]'
          }`}
          onClick={() => onSelectForm(form.id)}
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-300">{form.title}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditForm(form.id);
              }}
              className="p-1 hover:bg-[#1e293b] rounded-lg"
            >
              <Edit2 className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteForm(form.id);
              }}
              className="p-1 hover:bg-[#1e293b] rounded-lg"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}