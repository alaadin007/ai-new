import React, { useState } from 'react';
import { History, UserPlus, Save } from 'lucide-react';
import { INITIAL_CATEGORIES, INITIAL_QUESTIONS } from './medicalHistoryData';
import { PatientIntakeForm } from './PatientIntakeForm';
import { UnlockModal } from './UnlockModal';

interface MedicalHistoryViewProps {
  questions: Record<string, boolean>;
  lastUpdated: string;
  provider: string;
  notes?: string;
  onStartIntake?: () => void;
}

export function MedicalHistoryView({ questions, lastUpdated, provider, notes }: MedicalHistoryViewProps) {
  const [showIntakeForm, setShowIntakeForm] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  const handleStartIntake = () => {
    setShowIntakeForm(true);
  };

  const handleUnlock = (password: string) => {
    // In production, verify password against clinic settings
    if (password === '0000') { // Default password
      setShowIntakeForm(false);
      setShowUnlockModal(false);
    }
  };

  if (showIntakeForm) {
    return (
      <>
        <div className="fixed inset-0 bg-[#0B1220] z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 bg-[#1e293b] border-b border-gray-800">
            <h2 className="text-xl font-semibold text-gray-200">Patient Medical History</h2>
            <button
              onClick={() => setShowUnlockModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 text-lg"
            >
              <Save className="w-5 h-5" />
              Save & Exit
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <PatientIntakeForm />
          </div>
        </div>

        {showUnlockModal && (
          <UnlockModal onUnlock={handleUnlock} onClose={() => setShowUnlockModal(false)} />
        )}
      </>
    );
  }

  // Display the medical history view
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-200">Medical History</h3>
          <div className="flex items-center gap-1 mt-1 text-sm text-gray-400">
            <History className="w-3 h-3" />
            Last updated: {new Date(lastUpdated).toLocaleDateString()} by {provider}
          </div>
        </div>
        <button
          onClick={handleStartIntake}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
        >
          <UserPlus className="w-4 h-4" />
          New Patient History
        </button>
      </div>

      {/* Rest of the medical history view */}
      {INITIAL_CATEGORIES.map((category) => (
        <div key={category.id} className="bg-[#1e293b] rounded-lg p-6">
          <h4 className="text-gray-200 font-medium mb-4">{category.name}</h4>
          <div className="grid grid-cols-2 gap-4">
            {INITIAL_QUESTIONS
              .filter(q => q.categoryId === category.id)
              .map((question) => (
                <div
                  key={question.id}
                  className="bg-[#2d3b4f] rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-sm text-gray-300">{question.text}</span>
                    <span className={`text-sm font-medium ml-4 ${
                      questions[question.id] ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {questions[question.id] ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {questions[question.id] && notes && (
                    <p className="mt-2 text-sm text-blue-400 bg-blue-500/10 p-2 rounded">
                      {notes}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}