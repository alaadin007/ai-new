import React, { useState } from 'react';
import { X, Send, Plus, Trash2, AlertCircle, Link2, Sparkles } from 'lucide-react';

interface TreatmentPlanModalProps {
  assessment: any;
  onClose: () => void;
}

interface Treatment {
  id: string;
  name: string;
  priority: 'high' | 'medium' | 'low';
  details: string;
  url?: string;
  generatedDescription?: string;
}

const PRIORITY_COLORS = {
  high: 'bg-red-500',
  medium: 'bg-amber-500',
  low: 'bg-emerald-500'
};

export function TreatmentPlanModal({ assessment, onClose }: TreatmentPlanModalProps) {
  const [personalMessage, setPersonalMessage] = useState('');
  const [treatments, setTreatments] = useState<Treatment[]>([
    {
      id: '1',
      name: 'Treatment 1',
      priority: 'high',
      details: '',
      url: 'https://harleystreetinstitute.com'
    }
  ]);
  const [isSending, setIsSending] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);

  const handleAddTreatment = () => {
    setTreatments(prev => [...prev, {
      id: Date.now().toString(),
      name: `Treatment ${prev.length + 1}`,
      priority: 'medium',
      details: '',
      url: 'https://harleystreetinstitute.com'
    }]);
  };

  const handleRemoveTreatment = (id: string) => {
    setTreatments(prev => prev.filter(t => t.id !== id));
  };

  const handleUpdateTreatment = (id: string, field: keyof Treatment, value: string) => {
    setTreatments(prev => prev.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  const handleUpdatePriority = (id: string, priority: 'high' | 'medium' | 'low') => {
    setTreatments(prev => prev.map(t => 
      t.id === id ? { ...t, priority } : t
    ));
  };

  const handleGenerateMessage = async () => {
    setIsGeneratingMessage(true);
    try {
      // In production, this would call your OpenAI API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const message = `Dear [Patient Name],

It was wonderful meeting you today. I hope you found our consultation informative and helpful. As discussed, I've prepared a personalized treatment plan based on our assessment of your aesthetic goals.

Please take your time to review the recommendations below. Remember, we're here to support you on your aesthetic journey and answer any questions you may have.

Best regards,
Dr. Matthew`;

      setPersonalMessage(message);
    } finally {
      setIsGeneratingMessage(false);
    }
  };

  const handleGenerateDescription = async (id: string) => {
    setIsGenerating(true);
    try {
      // In production, this would call your OpenAI API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const treatment = treatments.find(t => t.id === id);
      if (!treatment) return;

      const generatedText = `Based on our consultation today, I recommend ${treatment.name.toLowerCase()} as a ${
        treatment.priority} priority treatment. I believe this would be particularly beneficial for you because ${
        treatment.details}. In my experience, patients with similar concerns have seen excellent results with this approach. 
        I'll ensure your comfort throughout the procedure and provide comprehensive aftercare guidance to optimize your results.

- Dr. Matthew`;

      setTreatments(prev => prev.map(t => 
        t.id === id ? { ...t, generatedDescription: generatedText } : t
      ));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = async () => {
    setIsSending(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onClose();
    } catch (error) {
      console.error('Error sending treatment plan:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e293b] rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Treatment Plan</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Assessment Summary */}
        <div className="mb-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <h4 className="text-sm font-medium text-blue-400 mb-2">Assessment Summary</h4>
          <p className="text-sm text-gray-300">
            Total Score: {assessment.totalScore} • Date: {new Date(assessment.date).toLocaleDateString()}
          </p>
        </div>

        {/* Personal Message */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-medium text-gray-200">Personal Message</h4>
            <button
              onClick={handleGenerateMessage}
              disabled={isGeneratingMessage}
              className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-200 text-sm disabled:bg-purple-800 disabled:cursor-wait"
            >
              {isGeneratingMessage ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Message
                </>
              )}
            </button>
          </div>
          <textarea
            value={personalMessage}
            onChange={(e) => setPersonalMessage(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 bg-[#2d3b4f] rounded-lg text-gray-200"
            placeholder="Add a personal message to your patient..."
          />
        </div>

        {/* Treatment Recommendations */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium text-gray-200">Recommended Treatments</h4>
            <button
              onClick={handleAddTreatment}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#2d3b4f] hover:bg-[#374357] rounded-lg transition-colors duration-200 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Treatment
            </button>
          </div>

          {treatments.map((treatment) => (
            <div key={treatment.id} className="bg-[#2d3b4f] rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Treatment Name
                      </label>
                      <input
                        type="text"
                        value={treatment.name}
                        onChange={e => handleUpdateTreatment(treatment.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 bg-[#1e293b] rounded-lg text-gray-200"
                        placeholder="e.g., Botox Treatment"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Priority Level
                      </label>
                      <div className="flex items-center gap-4">
                        {(['low', 'medium', 'high'] as const).map((priority) => (
                          <button
                            key={priority}
                            type="button"
                            onClick={() => handleUpdatePriority(treatment.id, priority)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                              treatment.priority === priority
                                ? `${PRIORITY_COLORS[priority]} ring-2 ring-offset-2 ring-offset-[#2d3b4f] ring-white/20`
                                : 'bg-[#1e293b] hover:bg-[#374357]'
                            }`}
                          >
                            <span className="sr-only">{priority} priority</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Treatment Details
                    </label>
                    <textarea
                      value={treatment.details}
                      onChange={e => handleUpdateTreatment(treatment.id, 'details', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 bg-[#1e293b] rounded-lg text-gray-200"
                      placeholder="Enter treatment details..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Treatment URL (Optional)
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          value={treatment.url}
                          onChange={e => handleUpdateTreatment(treatment.id, 'url', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 bg-[#1e293b] rounded-lg text-gray-200"
                          placeholder="https://..."
                        />
                      </div>
                      <button
                        onClick={() => handleGenerateDescription(treatment.id)}
                        disabled={isGenerating}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-200 disabled:bg-purple-800 disabled:cursor-wait"
                      >
                        {isGenerating ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Generate Description
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {treatment.generatedDescription && (
                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <p className="text-sm text-gray-300">{treatment.generatedDescription}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleRemoveTreatment(treatment.id)}
                  className="p-2 hover:bg-[#374357] rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Warning */}
        <div className="flex items-start gap-3 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20 mb-6">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-amber-400 mb-1">Important Note</h4>
            <p className="text-sm text-gray-300">
              This treatment plan will be sent to the patient's email along with their assessment results 
              and any generated treatment descriptions.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={isSending}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 disabled:bg-blue-800 disabled:cursor-wait"
          >
            {isSending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send to Patient
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}