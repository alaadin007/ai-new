import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';

interface NewLocationModalProps {
  onClose: () => void;
}

export function NewLocationModal({ onClose }: NewLocationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    isMainBranch: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Create location:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e293b] rounded-xl p-6 max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-semibold">Add New Location</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Location Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Address
            </label>
            <textarea
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isMainBranch}
                onChange={e => setFormData({ ...formData, isMainBranch: e.target.checked })}
                className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-300">Set as Main Branch</span>
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-800">
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
              Add Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}