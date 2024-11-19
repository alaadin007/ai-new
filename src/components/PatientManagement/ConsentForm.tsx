import React, { useState, useRef, useEffect } from 'react';
import SignaturePad from 'signature_pad';
import { X, Download, Trash2, Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface ConsentTemplate {
  id: string;
  title: string;
  content: string;
}

interface ConsentFormProps {
  forms: ConsentTemplate[];
  onClose: () => void;
  onSign: (signatures: { formId: string; signature: string }[]) => void;
  onSaveAsTemplate?: (form: ConsentTemplate) => void;
}

export function ConsentForm({ forms, onClose, onSign, onSaveAsTemplate }: ConsentFormProps) {
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [signatures, setSignatures] = useState<{ formId: string; signature: string }[]>([]);
  const signaturePadRef = useRef<SignaturePad | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        backgroundColor: '#1e293b'
      });
    }

    return () => {
      if (signaturePadRef.current) {
        signaturePadRef.current.clear();
      }
    };
  }, [currentFormIndex]);

  const handleClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const handleSave = () => {
    if (signaturePadRef.current?.isEmpty()) {
      alert('Please provide a signature');
      return;
    }

    const signature = signaturePadRef.current?.toDataURL();
    if (signature) {
      setSignatures([...signatures, { 
        formId: forms[currentFormIndex].id, 
        signature 
      }]);

      if (currentFormIndex < forms.length - 1) {
        setCurrentFormIndex(currentFormIndex + 1);
        handleClear();
      } else {
        onSign([...signatures, { 
          formId: forms[currentFormIndex].id, 
          signature 
        }]);
      }
    }
  };

  const currentForm = forms[currentFormIndex];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e293b] rounded-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-200">{currentForm.title}</h3>
              <p className="text-sm text-gray-400 mt-1">
                Form {currentFormIndex + 1} of {forms.length}
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Form Navigation */}
          {forms.length > 1 && (
            <div className="flex items-center gap-2 mt-4">
              {forms.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFormIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentFormIndex
                      ? 'bg-blue-500 w-4'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-invert max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: currentForm.content }}
              className="space-y-6 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-6 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:mt-8 [&_h4]:mb-4 [&_p]:text-gray-300 [&_ul]:space-y-2 [&_li]:text-gray-300"
            />
          </div>
        </div>

        {/* Signature Section */}
        <div className="p-6 border-t border-gray-800 bg-[#161f2e]">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-300">Patient Signature</h4>
            <div className="flex items-center gap-4">
              <button
                onClick={handleClear}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
              {onSaveAsTemplate && (
                <button
                  onClick={() => onSaveAsTemplate(currentForm)}
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                >
                  <Download className="w-4 h-4" />
                  Save as Template
                </button>
              )}
            </div>
          </div>

          <div className="border border-gray-700 rounded-lg overflow-hidden mb-6 bg-[#1e293b]">
            <canvas
              ref={canvasRef}
              width={800}
              height={200}
              className="w-full touch-none"
            />
          </div>

          <div className="flex items-center justify-between">
            {currentFormIndex > 0 ? (
              <button
                onClick={() => setCurrentFormIndex(currentFormIndex - 1)}
                className="flex items-center gap-2 text-gray-400 hover:text-gray-300"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Form
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-4">
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
                {currentFormIndex === forms.length - 1 ? (
                  <>
                    <Check className="w-4 h-4" />
                    Complete & Sign
                  </>
                ) : (
                  <>
                    Next Form
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}