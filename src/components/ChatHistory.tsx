import React, { useState } from 'react';
import { MessageSquare, Plus, Settings, User, LogOut, CreditCard, Folder, ChevronDown, ChevronRight } from 'lucide-react';
import { SubscriptionModal } from './SubscriptionModal';
import { CategoryModal } from './CategoryModal';

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  category?: string;
  messages: Array<{ isAi: boolean; message: string }>;
}

interface Category {
  name: string;
  sessions: ChatSession[];
}

interface ChatHistoryProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onSaveToCategory: (sessionId: string, category: string) => void;
}

export function ChatHistory({ 
  sessions, 
  currentSessionId, 
  onSelectSession, 
  onNewChat,
  onSaveToCategory 
}: ChatHistoryProps) {
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  // Group sessions by category
  const categories: Category[] = [];
  const uncategorized: ChatSession[] = [];

  sessions.forEach(session => {
    if (session.category) {
      const category = categories.find(c => c.name === session.category);
      if (category) {
        category.sessions.push(session);
      } else {
        categories.push({ name: session.category, sessions: [session] });
      }
    } else {
      uncategorized.push(session);
    }
  });

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const handleSaveToCategory = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setIsCategoryModalOpen(true);
  };

  const handleCategorySave = (categoryName: string) => {
    if (selectedSessionId) {
      onSaveToCategory(selectedSessionId, categoryName);
    }
  };

  return (
    <div className="w-64 bg-[#0f1623] flex flex-col h-screen">
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 m-4 px-4 py-2 bg-[#1e293b] hover:bg-[#1e293b]/80 rounded-lg transition-colors duration-200"
      >
        <Plus className="w-4 h-4" />
        <span>New Chat</span>
      </button>

      <div className="flex-1 overflow-y-auto px-2 py-2">
        {/* Categories */}
        {categories.map((category) => (
          <div key={category.name} className="mb-2">
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
            >
              {expandedCategories.has(category.name) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <Folder className="w-4 h-4" />
              <span className="text-sm">{category.name}</span>
            </button>

            {expandedCategories.has(category.name) && (
              <div className="ml-4">
                {category.sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => onSelectSession(session.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg mb-1 flex items-center gap-2 transition-colors duration-200 ${
                      currentSessionId === session.id
                        ? 'bg-[#1e293b] text-white'
                        : 'text-gray-300 hover:bg-[#1e293b]'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate text-sm">{session.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Uncategorized sessions */}
        {uncategorized.map((session) => (
          <button
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            className={`w-full text-left px-3 py-2 rounded-lg mb-1 flex items-center gap-2 transition-colors duration-200 ${
              currentSessionId === session.id
                ? 'bg-[#1e293b] text-white'
                : 'text-gray-300 hover:bg-[#1e293b]'
            }`}
          >
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <span className="truncate text-sm">{session.title}</span>
          </button>
        ))}
      </div>

      {/* Account Management Section */}
      <div className="border-t border-gray-800 p-4">
        <div className="relative">
          <button
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            className="flex items-center gap-3 w-full p-2 hover:bg-[#1e293b] rounded-lg transition-colors duration-200"
          >
            <div className="w-8 h-8 bg-[#1e293b] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm text-gray-300">Guest User</p>
              <p className="text-xs text-gray-500">Free Plan</p>
            </div>
          </button>

          {showAccountMenu && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-[#1e293b] rounded-lg shadow-lg border border-gray-800 overflow-hidden">
              <button
                onClick={() => setIsSubscriptionModalOpen(true)}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-[#2d3b4f] transition-colors duration-200"
              >
                <CreditCard className="w-4 h-4" />
                Upgrade Plan
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-[#2d3b4f] transition-colors duration-200"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-[#2d3b4f] transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <SubscriptionModal 
        isOpen={isSubscriptionModalOpen} 
        onClose={() => setIsSubscriptionModalOpen(false)} 
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleCategorySave}
        existingCategories={categories.map(c => c.name)}
      />
    </div>
  );
}