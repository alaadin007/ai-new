import React, { useState, useRef, useEffect } from 'react';
import { X, AlertCircle, Sparkles, Lightbulb } from 'lucide-react';
import SignaturePad from 'signature_pad';
import { generateConsentForm } from '../../lib/openai';

interface AIConsentFormProps {
  onClose: () => void;
  onSave: (form: { title: string; content: string; signature: string }) => void;
}

const LOADING_TIPS = [
  {
    content: "Did you know? Proper consent forms are crucial for both patient safety and legal protection. They ensure patients make informed decisions about their treatments."
  },
  {
    content: "Tip: Clear communication about potential risks and benefits helps build trust with patients and leads to better treatment outcomes."
  },
  {
    content: "Best Practice: Regular updates to consent forms help maintain compliance with current medical guidelines and legal requirements."
  }
];

export function AIConsentForm({ onClose, onSave }: AIConsentFormProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [generatedForm, setGeneratedForm] = useState<{ title: string; content: string } | null>(null);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        backgroundColor: '#2D3B4F'
      });
    }

    return () => {
      if (signaturePadRef.current) {
        signaturePadRef.current.clear();
      }
    };
  }, [generatedForm]);

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setCurrentTipIndex(prev => (prev + 1) % LOADING_TIPS.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError('');

    try {
      const form = await generateConsentForm(prompt);
      setGeneratedForm(form);
    } catch (err) {
      console.error('Error generating form:', err);
      setError('Failed to generate consent form. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const handleSave = () => {
    if (!generatedForm || !signaturePadRef.current) return;

    if (signaturePadRef.current.isEmpty()) {
      setError('Please provide a signature before saving');
      return;
    }

    onSave({
      title: generatedForm.title,
      content: generatedForm.content,
      signature: signaturePadRef.current.toDataURL()
    });
  };

  return (
    <div className="fixed inset-0 bg-[#0B1220]/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1E293B] rounded-2xl shadow-xl p-8 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto border border-gray-800">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/10 p-2 rounded-xl">
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-100">Create Personalized Consent</h3>
              <p className="text-sm text-gray-400 mt-1">Tailored to your patient's specific needs</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!generatedForm ? (
          <div className="space-y-6">
            {isGenerating ? (
              <div className="py-12 space-y-8">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-400 border-t-transparent"></div>
                </div>
                <div className="text-center space-y-4">
                  <p className="text-gray-300">Creating your personalized consent form...</p>
                  <div className="max-w-lg mx-auto transition-all duration-500">
                    <div className="bg-[#2D3B4F] rounded-xl p-6">
                      <div className="flex items-center gap-2 text-blue-400 mb-3">
                        <Lightbulb className="w-4 h-4" />
                        <span className="font-medium">Clinical Insight</span>
                      </div>
                      <p className="text-gray-300">
                        {LOADING_TIPS[currentTipIndex].content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Describe the medical situation and specific considerations
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-[#2D3B4F] rounded-xl focus:ring-2 focus:ring-blue-500 border-none text-gray-200 placeholder-gray-500"
                    placeholder="Example: Patient with hooded eyelids discussing higher risk of eyebrow dropping..."
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-4 bg-red-500/10 rounded-xl text-red-400">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
                    isGenerating || !prompt.trim()
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  Create Personalized Consent Form
                </button>

                <div className="mt-8 bg-[#2D3B4F] rounded-xl p-6">
                  <h4 className="text-sm font-medium text-gray-200 mb-3">Example Situations:</h4>
                  <ul className="space-y-3">
                    {[
                      'Patient with hooded eyelids discussing higher risk of eyebrow dropping',
                      'Patient on blood thinners requiring special considerations',
                      'Patient with history of cold sores needing antiviral medication'
                    ].map((example, index) => (
                      <li 
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="prose max-w-none">
              <div className="bg-[#2D3B4F] rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-gray-100 mt-0">
                  {generatedForm.title}
                </h2>
                <div 
                  className="text-gray-300 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-100 [&_h3]:mt-6 [&_h3]:mb-4 [&_h4]:text-lg [&_h4]:font-medium [&_h4]:text-gray-200 [&_h4]:mt-6 [&_h4]:mb-3 [&_ul]:space-y-2 [&_li]:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: generatedForm.content }}
                />
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-200">Patient Signature</h4>
                <button
                  onClick={handleClearSignature}
                  className="text-sm text-gray-400 hover:text-gray-300"
                >
                  Clear Signature
                </button>
              </div>
              <div className="border border-gray-700 rounded-xl overflow-hidden mb-6">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={200}
                  className="w-full touch-none bg-[#2D3B4F]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-400 hover:text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Complete & Sign
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}