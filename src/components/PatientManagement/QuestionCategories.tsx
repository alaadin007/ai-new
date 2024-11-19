import React from 'react';
import { INITIAL_CATEGORIES, INITIAL_QUESTIONS } from './medicalHistoryData';

interface QuestionCategoriesProps {
  formData: {
    questions: Record<string, { value: boolean; details?: string }>;
    notes: string;
  };
  onQuestionChange: (questionId: string, value: { value: boolean; details?: string }) => void;
}

export function QuestionCategories({ formData, onQuestionChange }: QuestionCategoriesProps) {
  return (
    <div className="space-y-6">
      {INITIAL_CATEGORIES.map((category) => (
        <div key={category.id} className="bg-[#1e293b] rounded-lg p-6">
          <h4 className="text-lg font-medium text-gray-200 mb-4">{category.name}</h4>
          <div className="grid grid-cols-2 gap-6">
            {INITIAL_QUESTIONS
              .filter(q => q.categoryId === category.id)
              .map((question) => (
                <div
                  key={question.id}
                  className="bg-[#2d3b4f] rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <label className="text-sm text-gray-300 flex-1">
                      {question.text}
                      {question.additionalDetails && <span className="text-blue-400 ml-1">*</span>}
                    </label>
                    <div className="flex items-center gap-2 ml-4">
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={question.id}
                          checked={formData.questions[question.id]?.value === true}
                          onChange={() => onQuestionChange(question.id, { value: true, details: '' })}
                          className="text-blue-500 focus:ring-blue-500 bg-[#1e293b] border-gray-600"
                        />
                        <span className="text-sm text-gray-300">Yes</span>
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={question.id}
                          checked={formData.questions[question.id]?.value === false}
                          onChange={() => onQuestionChange(question.id, { value: false })}
                          className="text-blue-500 focus:ring-blue-500 bg-[#1e293b] border-gray-600"
                        />
                        <span className="text-sm text-gray-300">No</span>
                      </label>
                    </div>
                  </div>

                  {formData.questions[question.id]?.value === true && question.additionalDetails && (
                    <div className="mt-2">
                      <textarea
                        value={formData.questions[question.id]?.details || ''}
                        onChange={(e) => onQuestionChange(question.id, {
                          value: true,
                          details: e.target.value.slice(0, 120) // Limit to roughly 2 lines
                        })}
                        placeholder="Add details (max 2 lines)"
                        rows={2}
                        maxLength={120}
                        className="w-full px-3 py-2 bg-[#1e293b] rounded-lg text-gray-200 text-sm resize-none"
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}