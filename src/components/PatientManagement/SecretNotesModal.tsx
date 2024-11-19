import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

interface SecretNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  existingNotes?: string;
}

export function SecretNotesModal({ isOpen, onClose, patientId, existingNotes = '' }: SecretNotesModalProps) {
  const [notes, setNotes] = useState(existingNotes);

  if (!isOpen) return null;

  const handleSave = () => {
    // In production, this would securely save to your database
    console.log('Saving secret notes for patient:', patientId, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0f1623] rounded-xl p-6 max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-red-400" />
            <h3 className="text-xl font-semibold">Confidential Notes</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add private notes here..."
          className="w-full h-64 px-4 py-3 bg-[#1e293b] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 text-gray-200 mb-6"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
          >
            Save Notes
          </button>
        </div>
      </div>
    </div>
  );
}