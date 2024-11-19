import React from 'react';
import { Edit2, Trash2, FileText } from 'lucide-react';

interface ConsentTemplate {
  id: string;
  title: string;
  content: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

interface ConsentCategoryProps {
  category: Category;
  templates: ConsentTemplate[];
  view: 'grid' | 'list';
  onEditCategory: () => void;
  onDeleteCategory: () => void;
  onEditForm: (form: ConsentTemplate) => void;
  onDeleteForm: (formId: string) => void;
  onSelectForm: (formId: string) => void;
  selectedForms: string[];
}

export function ConsentCategory({
  category,
  templates,
  view,
  onEditCategory,
  onDeleteCategory,
  onEditForm,
  onDeleteForm,
  onSelectForm,
  selectedForms
}: ConsentCategoryProps) {
  return (
    <div className="bg-[#1e293b] rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-200">{category.name}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onEditCategory}
            className="p-1 hover:bg-[#374357] rounded-lg"
          >
            <Edit2 className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={onDeleteCategory}
            className="p-1 hover:bg-[#374357] rounded-lg"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-2 gap-4">
          {templates.map(template => (
            <div
              key={template.id}
              className={`relative group cursor-pointer p-4 rounded-lg border ${
                selectedForms.includes(template.id)
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600 bg-[#2d3b4f]'
              }`}
              onClick={() => onSelectForm(template.id)}
            >
              <FileText className="w-8 h-8 text-gray-400 mb-2" />
              <h4 className="text-sm font-medium text-gray-300 mb-1">{template.title}</h4>
              
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditForm(template);
                  }}
                  className="p-1 hover:bg-[#374357] rounded-lg mr-1"
                >
                  <Edit2 className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteForm(template.id);
                  }}
                  className="p-1 hover:bg-[#374357] rounded-lg"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {templates.map(template => (
            <div
              key={template.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                selectedForms.includes(template.id)
                  ? 'bg-blue-500/10 border border-blue-500'
                  : 'bg-[#2d3b4f] hover:bg-[#374357]'
              }`}
              onClick={() => onSelectForm(template.id)}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-300">{template.title}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditForm(template);
                  }}
                  className="p-1 hover:bg-[#1e293b] rounded-lg"
                >
                  <Edit2 className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteForm(template.id);
                  }}
                  className="p-1 hover:bg-[#1e293b] rounded-lg"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}