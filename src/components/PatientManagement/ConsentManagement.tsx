import React, { useState } from 'react';
import { Search, Grid, List, Plus, Sparkles } from 'lucide-react';
import { ConsentFormEditor } from './ConsentFormEditor';
import { ConsentForm } from './ConsentForm';
import { AIConsentForm } from './AIConsentForm';
import { SignedConsents } from './SignedConsents';
import { BOTULINUM_TOXIN_TEMPLATES } from './consentFormTemplates';

interface ConsentTemplate {
  id: string;
  title: string;
  content: string;
  categoryId: string;
}

export function ConsentManagement() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [showAIForm, setShowAIForm] = useState(false);
  const [showConsentForm, setShowConsentForm] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [templates, setTemplates] = useState<ConsentTemplate[]>(BOTULINUM_TOXIN_TEMPLATES);

  const handleSelectForm = (formId: string) => {
    setSelectedForms(prev => 
      prev.includes(formId)
        ? prev.filter(id => id !== formId)
        : [...prev, formId]
    );
  };

  const handleCreateConsent = () => {
    if (selectedForms.length === 0) return;
    const selectedTemplates = templates.filter(t => selectedForms.includes(t.id));
    setShowConsentForm(true);
  };

  const handleSaveAIForm = (form: { title: string; content: string; signature: string }) => {
    // Save the AI-generated form
    const newTemplate: ConsentTemplate = {
      id: `ai-${Date.now()}`,
      title: form.title,
      content: form.content,
      categoryId: 'ai-generated'
    };
    setTemplates(prev => [...prev, newTemplate]);
    setShowAIForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Instructions Panel */}
      <div className="bg-[#2d3b4f] rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAIForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Sparkles className="w-4 h-4" />
              Intelligent Consent
            </button>

            <div className="text-sm text-gray-400">
              or select form(s) below and click
              <button
                onClick={handleCreateConsent}
                disabled={selectedForms.length === 0}
                className={`ml-2 px-3 py-1 rounded ${
                  selectedForms.length > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                Create Consent ({selectedForms.length})
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowCategoryModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Manage Categories
          </button>
        </div>
      </div>

      {/* Search and View Controls */}
      <div className="flex items-center justify-end gap-4">
        <div className="relative">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search consent forms..."
            className="w-64 px-4 py-2 pl-10 bg-[#2d3b4f] rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 bg-[#2d3b4f] rounded-lg p-1">
          <button
            onClick={() => setView('grid')}
            className={`p-1.5 rounded ${
              view === 'grid' ? 'bg-[#1e293b]' : 'hover:bg-[#374357]'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-1.5 rounded ${
              view === 'list' ? 'bg-[#1e293b]' : 'hover:bg-[#374357]'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Consent Form Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(template => (
          <div
            key={template.id}
            onClick={() => handleSelectForm(template.id)}
            className={`relative group cursor-pointer p-4 rounded-lg border ${
              selectedForms.includes(template.id)
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-700 hover:border-gray-600 bg-[#2d3b4f]'
            }`}
          >
            <h4 className="text-sm font-medium text-gray-300 mb-2">{template.title}</h4>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showAIForm && (
        <AIConsentForm
          onClose={() => setShowAIForm(false)}
          onSave={handleSaveAIForm}
        />
      )}

      {showConsentForm && selectedForms.length > 0 && (
        <ConsentForm
          forms={templates.filter(t => selectedForms.includes(t.id))}
          onClose={() => {
            setShowConsentForm(false);
            setSelectedForms([]);
          }}
          onSign={(signatures) => {
            console.log('Signed consents:', signatures);
            setShowConsentForm(false);
            setSelectedForms([]);
          }}
        />
      )}

      {/* Previously Signed Consents */}
      <SignedConsents />
    </div>
  );
}