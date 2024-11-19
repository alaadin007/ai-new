import React, { useState } from 'react';
import { Lock, X, Save } from 'lucide-react';

interface UnlockModalProps {
  onUnlock: (password: string) => void;
  onClose: () => void;
}

export function UnlockModal({ onUnlock, onClose }: UnlockModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '0000') { // Default password
      onUnlock(password);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60]">
      <div className="bg-[#1e293b] rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-semibold">Save & Exit Form</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Return Device Message */}
        <div className="mb-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <p className="text-sm text-blue-400">
            Please return the device to clinic staff after saving your form.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Enter Clinic Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200 border-2 transition-colors duration-200 ${
                error ? 'border-red-500' : 'border-transparent'
              }`}
              placeholder="••••••••"
              required
            />
            {error && (
              <p className="text-sm text-red-400 mt-2">Incorrect password</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              <Save className="w-4 h-4" />
              Save & Exit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}