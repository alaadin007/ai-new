import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { INITIAL_CATEGORIES, INITIAL_QUESTIONS } from './medicalHistoryData';

interface FormData {
  questions: Record<string, { value: boolean; details?: string }>;
  notes: string;
}

export function PatientIntakeForm() {
  const [formData, setFormData] = useState<FormData>({
    questions: {},
    notes: ''
  });

  const handleQuestionChange = (questionId: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      questions: {
        ...prev.questions,
        [questionId]: { value, details: value ? (prev.questions[questionId]?.details || '') : undefined }
      }
    }));
  };

  const handleDetailsChange = (questionId: string, details: string) => {
    setFormData(prev => ({
      ...prev,
      questions: {
        ...prev.questions,
        [questionId]: { ...prev.questions[questionId], details }
      }
    }));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8">
            <p className="text-blue-400">
              Please answer all questions honestly and accurately. This information is important for your safety and treatment planning.
            </p>
          </div>

          {INITIAL_CATEGORIES.map((category) => (
            <div key={category.id} className="bg-[#1e293b] rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-200 mb-6">{category.name}</h4>
              <div className="space-y-4">
                {INITIAL_QUESTIONS
                  .filter(q => q.categoryId === category.id)
                  .map((question) => (
                    <div
                      key={question.id}
                      className="bg-[#2d3b4f] rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300 flex-1 mr-4">
                          {question.text}
                        </label>
                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={question.id}
                              checked={formData.questions[question.id]?.value === true}
                              onChange={() => handleQuestionChange(question.id, true)}
                              className="text-blue-500 focus:ring-blue-500 bg-[#1e293b] border-gray-600"
                            />
                            <span className="text-sm text-gray-300">Yes</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={question.id}
                              checked={formData.questions[question.id]?.value === false}
                              onChange={() => handleQuestionChange(question.id, false)}
                              className="text-blue-500 focus:ring-blue-500 bg-[#1e293b] border-gray-600"
                            />
                            <span className="text-sm text-gray-300">No</span>
                          </label>
                        </div>
                      </div>

                      {formData.questions[question.id]?.value === true && (
                        <div className="mt-3">
                          <textarea
                            value={formData.questions[question.id]?.details || ''}
                            onChange={(e) => handleDetailsChange(question.id, e.target.value)}
                            placeholder="Please provide details..."
                            rows={2}
                            maxLength={120}
                            className="w-full px-3 py-2 bg-[#1e293b] rounded-lg text-gray-200 text-sm resize-none border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                          />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}

          <div className="bg-[#1e293b] rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-200 mb-4">Additional Notes</h4>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional information you'd like to share..."
              rows={4}
              className="w-full px-4 py-3 bg-[#2d3b4f] rounded-lg text-gray-200 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      {/* Fixed Save & Exit Button */}
      <div className="sticky bottom-0 left-0 right-0 bg-[#1e293b] border-t border-gray-800 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => {}} // This will be handled by the parent component
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 text-lg font-medium"
          >
            <Save className="w-5 h-5" />
            Save & Exit
          </button>
        </div>
      </div>
    </div>
  );
}