import React, { useState } from 'react';
import { X } from 'lucide-react';

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

interface ConsentFormEditorProps {
  form?: ConsentTemplate | null;
  categories: Category[];
  onSave: (form: ConsentTemplate) => void;
  onClose: () => void;
}

export function ConsentFormEditor({ form, categories, onSave, onClose }: ConsentFormEditorProps) {
  const [formData, setFormData] = useState<Omit<ConsentTemplate, 'id'>>({
    title: form?.title || '',
    content: form?.content || '',
    categoryId: form?.categoryId || categories[0]?.id || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: form?.id || Date.now().toString(),
      ...formData
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e293b] rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-200">
            {form ? 'Edit Consent Form' : 'Create Consent Form'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Category
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-3 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
              required
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={15}
              className="w-full px-3 py-2 bg-[#2d3b4f] rounded-lg text-gray-200 font-mono"
              required
            />
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              Save Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}