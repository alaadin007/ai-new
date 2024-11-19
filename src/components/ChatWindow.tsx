import React, { useRef, useEffect } from 'react';
import { Send, Folder } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { LoadingIndicator } from './LoadingIndicator';

interface ChatWindowProps {
  messages: Array<{ isAi: boolean; message: string }>;
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSendMessage: () => void;
  onSaveToCategory: () => void;
  isVisible: boolean;
  isLoading: boolean;
}

export function ChatWindow({ 
  messages, 
  newMessage, 
  setNewMessage, 
  onSendMessage, 
  onSaveToCategory,
  isVisible, 
  isLoading 
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (!isVisible) return null;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="bg-[#0f1623] rounded-xl overflow-hidden">
        <div className="h-[500px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
          {messages.map((msg, index) => (
            <ChatMessage key={index} isAi={msg.isAi} message={msg.message} />
          ))}
          {isLoading && <LoadingIndicator />}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 bg-[#0f1623] border-t border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={onSaveToCategory}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#1e293b] hover:bg-[#2d3b4f] rounded-lg transition-colors duration-200 text-sm"
            >
              <Folder className="w-4 h-4" />
              Save to Category
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
              placeholder="Type your follow-up question..."
              className="w-full px-4 py-3 bg-[#1e293b] rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500 text-gray-200 pr-12"
            />
            <button
              onClick={onSendMessage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2d3b4f] hover:bg-[#374357] p-2 rounded-lg transition-colors duration-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}