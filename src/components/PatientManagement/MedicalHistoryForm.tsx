import React, { useState } from 'react';
import { X, History } from 'lucide-react';
import { QuestionCategories } from './QuestionCategories';
import { INITIAL_CATEGORIES, INITIAL_QUESTIONS } from './medicalHistoryData';

interface FormData {
  questions: Record<string, boolean | string>;
  notes: string;
  categories: typeof INITIAL_CATEGORIES;
}

interface MedicalHistoryFormProps {
  onClose: () => void;
  existingData?: {
    questions: Record<string, boolean | string>;
    notes: string;
    lastUpdated?: string;
  };
}

export function MedicalHistoryForm({ onClose, existingData }: MedicalHistoryFormProps) {
  const [formData, setFormData] = useState<FormData>({
    questions: existingData?.questions || {},
    notes: existingData?.notes || '',
    categories: INITIAL_CATEGORIES
  });

  const handleQuestionChange = (questionId: string, value: boolean | string) => {
    setFormData(prev => ({
      ...prev,
      questions: {
        ...prev.questions,
        [questionId]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating medical history:', {
      ...formData,
      lastUpdated: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#2d3b4f] rounded-lg w-full max-w-4xl mx-4 flex flex-col" style={{ maxHeight: 'calc(100vh - 2rem)' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h3 className="text-lg font-semibold text-gray-200">Medical History Assessment</h3>
            {existingData?.lastUpdated && (
              <div className="flex items-center gap-1 mt-1 text-sm text-gray-400">
                <History className="w-3 h-3" />
                Last updated: {new Date(existingData.lastUpdated).toLocaleDateString()}
              </div>
            )}
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <QuestionCategories
              formData={formData}
              onQuestionChange={handleQuestionChange}
              initialQuestions={INITIAL_QUESTIONS}
            />

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Additional Notes & Details
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Please provide additional details for any 'Yes' answers marked with *"
                className="w-full px-4 py-3 bg-[#1e293b] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 h-32"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
          >
            Save Assessment
          </button>
        </div>
      </div>
    </div>
  );
}