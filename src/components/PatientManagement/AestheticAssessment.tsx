import React, { useState } from 'react';
import { Plus, History, Save, FileText, Send, Mail } from 'lucide-react';
import { AssessmentForm } from './AssessmentForm';
import { TreatmentPlanModal } from './TreatmentPlanModal';

interface CategoryDefinition {
  title: string;
  items: string[];
}

interface Assessment {
  id: string;
  date: string;
  type: 'initial' | 'followup';
  scores: {
    skinSurface: Record<string, number>;
    dynamicLines: Record<string, number>;
    staticLines: Record<string, number>;
    facialVolumeLoss: Record<string, number>;
    saggingSkin: Record<string, number>;
  };
  totalScore: number;
  provider: string;
}

export const ASSESSMENT_CATEGORIES: Record<string, CategoryDefinition> = {
  skinSurface: {
    title: 'Skin Surface',
    items: ['Pores', 'Skin Tone', 'Freckle Size', 'Skin Texture', 'Skin Thinning']
  },
  dynamicLines: {
    title: 'Dynamic Lines',
    items: ['Frown', 'Forehead', 'Crows Feet', 'Bunny Lines', 'Upper Lip Lines', 'Mentalis Crease', 'DAO (Sad Expression Lines)']
  },
  staticLines: {
    title: 'Static Lines',
    items: ['Sleep/Pillow Lines', 'Lower Cheek Vertical Lines', 'Nasolabial Creases', 'Lateral Chin Vertical Lines']
  },
  facialVolumeLoss: {
    title: 'Facial Volume Loss',
    items: ['Undereye circles', 'Cheeks', 'Lateral Cheeks', 'Lips', 'Nose Drooping']
  },
  saggingSkin: {
    title: 'Sagging Skin',
    items: ['Jowls/Jawline', 'Nasolabial Folds', 'Oral Commisure Fold', 'Eyebrow Hooding']
  }
};

export function AestheticAssessment() {
  const [showNewAssessment, setShowNewAssessment] = useState(false);
  const [showTreatmentPlan, setShowTreatmentPlan] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      id: '1',
      date: '2024-02-21',
      type: 'initial',
      scores: {
        skinSurface: { Pores: 1, 'Skin Tone': 1, 'Freckle Size': 0, 'Skin Texture': 1, 'Skin Thinning': 0 },
        dynamicLines: { Frown: 3, Forehead: 3, 'Crows Feet': 2, 'Bunny Lines': 0, 'Upper Lip Lines': 0, 'Mentalis Crease': 1, 'DAO (Sad Expression Lines)': 0 },
        staticLines: { 'Sleep/Pillow Lines': 0, 'Lower Cheek Vertical Lines': 0, 'Nasolabial Creases': 2, 'Lateral Chin Vertical Lines': 0 },
        facialVolumeLoss: { 'Undereye circles': 0, Cheeks: 2, 'Lateral Cheeks': 2, Lips: 2, 'Nose Drooping': 2 },
        saggingSkin: { 'Jowls/Jawline': 0, 'Nasolabial Folds': 2, 'Oral Commisure Fold': 0, 'Eyebrow Hooding': 0 }
      },
      totalScore: 24,
      provider: 'Dr. Johnson'
    }
  ]);

  const handleSaveAssessment = (assessment: Assessment) => {
    setAssessments(prev => [assessment, ...prev]);
    setShowNewAssessment(false);
  };

  const handleSendTreatmentPlan = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setShowTreatmentPlan(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-200">Aesthetic Assessment</h3>
          {assessments.length > 0 && (
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-400">
              <History className="w-3 h-3" />
              Last updated: {new Date(assessments[0].date).toLocaleDateString()} by {assessments[0].provider}
            </div>
          )}
        </div>
        <button
          onClick={() => setShowNewAssessment(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 text-sm"
        >
          <Plus className="w-4 h-4" />
          New Assessment
        </button>
      </div>

      {/* Severity Scale Legend */}
      <div className="mb-8 bg-[#1e293b] rounded-xl p-6">
        <h4 className="text-sm font-medium text-gray-400 mb-4">Severity Scale</h4>
        <div className="h-3 w-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-400 mb-2" />
        <div className="flex justify-between px-1 text-sm">
          <span className="text-emerald-400">None (0)</span>
          <span className="text-amber-400">Moderate (1-2)</span>
          <span className="text-red-400">Severe (3)</span>
        </div>
      </div>

      {/* Assessment History */}
      <div className="space-y-6">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="bg-[#1e293b] rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`px-3 py-1 rounded-full text-sm ${
                  assessment.type === 'initial' 
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'bg-purple-500/10 text-purple-400'
                }`}>
                  {assessment.type === 'initial' ? 'Initial Assessment' : 'Follow-up'}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FileText className="w-4 h-4" />
                  Total Score: {assessment.totalScore}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-400">
                  {new Date(assessment.date).toLocaleDateString()}
                </div>
                <button
                  onClick={() => handleSendTreatmentPlan(assessment)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors duration-200 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Send Treatment Plan
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {Object.entries(ASSESSMENT_CATEGORIES).map(([key, category]) => (
                <div key={key}>
                  <h4 className="text-gray-200 font-medium mb-4">{category.title}</h4>
                  <div className="space-y-2">
                    {category.items.map(item => (
                      <div key={item} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{item}</span>
                        <div className="flex items-center gap-1">
                          {[0, 1, 2, 3].map(score => {
                            const isSelected = assessment.scores[key][item] === score;
                            let bgColor = isSelected
                              ? score === 0
                                ? 'bg-emerald-500'
                                : score <= 2
                                  ? 'bg-amber-500'
                                  : 'bg-red-500'
                              : 'bg-[#2d3b4f]';
                            
                            return (
                              <div
                                key={score}
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${bgColor} ${
                                  isSelected ? 'text-white' : 'text-gray-400'
                                }`}
                              >
                                {score}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showNewAssessment && (
        <AssessmentForm
          onClose={() => setShowNewAssessment(false)}
          onSave={handleSaveAssessment}
          categories={ASSESSMENT_CATEGORIES}
          isInitial={assessments.length === 0}
        />
      )}

      {showTreatmentPlan && selectedAssessment && (
        <TreatmentPlanModal
          assessment={selectedAssessment}
          onClose={() => {
            setShowTreatmentPlan(false);
            setSelectedAssessment(null);
          }}
        />
      )}
    </div>
  );
}