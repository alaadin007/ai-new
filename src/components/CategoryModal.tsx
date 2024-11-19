import React, { useState } from 'react';
import { Folder, Plus, X } from 'lucide-react';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categoryName: string) => void;
  existingCategories: string[];
}

export function CategoryModal({ isOpen, onClose, onSave, existingCategories }: CategoryModalProps) {
  const [newCategory, setNewCategory] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      onSave(newCategory.trim());
      setNewCategory('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0f1623] rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Folder className="w-5 h-5" />
            Save to Category
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">New Category</label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
              className="w-full px-4 py-2 bg-[#1e293b] rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 text-gray-200"
            />
          </div>

          {existingCategories.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Or choose existing category:</label>
              <div className="space-y-2">
                {existingCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      onSave(category);
                      onClose();
                    }}
                    className="w-full text-left px-4 py-2 bg-[#1e293b] hover:bg-[#2d3b4f] rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <Folder className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}