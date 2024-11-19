import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

interface AssessmentFormProps {
  onClose: () => void;
  onSave: (assessment: any) => void;
  categories: any;
  isInitial: boolean;
}

export function AssessmentForm({ onClose, onSave, categories, isInitial }: AssessmentFormProps) {
  const [scores, setScores] = useState(() => {
    const initialScores = {};
    Object.entries(categories).forEach(([category, { items }]: [string, any]) => {
      initialScores[category] = {};
      items.forEach(item => {
        initialScores[category][item] = 0;
      });
    });
    return initialScores;
  });

  const calculateTotal = () => {
    return Object.values(scores).reduce((total: number, category: any) => {
      return total + Object.values(category).reduce((sum: number, score: number) => sum + score, 0);
    }, 0);
  };

  const handleSave = () => {
    onSave({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      type: isInitial ? 'initial' : 'followup',
      scores,
      totalScore: calculateTotal(),
      provider: 'Dr. Johnson'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e293b] rounded-xl p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">
            {isInitial ? 'Initial Assessment' : 'Follow-up Assessment'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Severity Scale Legend */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-400" />
          </div>
          <div className="flex justify-between px-1 text-xs">
            <span className="text-emerald-400">None (0)</span>
            <span className="text-amber-400">Moderate (1-2)</span>
            <span className="text-red-400">Severe (3)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          {Object.entries(categories).map(([key, category]: [string, any]) => (
            <div key={key}>
              <h4 className="text-gray-200 font-medium mb-4">{category.title}</h4>
              <div className="space-y-4">
                {category.items.map(item => (
                  <div key={item} className="bg-[#2d3b4f] rounded-lg p-4">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{item}</span>
                        <div className="flex items-center gap-2">
                          {[0, 1, 2, 3].map(score => (
                            <button
                              key={score}
                              onClick={() => setScores(prev => ({
                                ...prev,
                                [key]: { ...prev[key], [item]: score }
                              }))}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors duration-200 ${
                                scores[key][item] === score
                                  ? score === 0
                                    ? 'bg-emerald-500 text-white'
                                    : score <= 2
                                      ? 'bg-amber-500 text-white'
                                      : 'bg-red-500 text-white'
                                  : 'bg-[#374357] text-gray-400 hover:bg-[#424f6e]'
                              }`}
                            >
                              {score}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-800">
          <div className="text-lg">
            <span className="text-gray-400">Total Score:</span>
            <span className="ml-2 text-gray-200 font-semibold">{calculateTotal()}</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              <Save className="w-4 h-4" />
              Save Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}