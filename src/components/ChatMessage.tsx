import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

interface ChatMessageProps {
  isAi: boolean;
  message: string;
}

export function ChatMessage({ isAi, message }: ChatMessageProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedSection, setCopiedSection] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  useEffect(() => {
    if (isAi) {
      setIsTyping(true);
      setDisplayedText('');
      let currentText = '';
      let index = 0;
      
      const timer = setInterval(() => {
        if (index < message.length) {
          currentText += message[index];
          setDisplayedText(currentText);
          index++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 3); // Faster typing speed

      return () => clearInterval(timer);
    } else {
      setDisplayedText(message);
    }
  }, [message, isAi]);

  const handleCopySection = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedSection(index);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(message);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const formatMessage = (text: string) => {
    const sections = text.split('\n\n');
    return sections.map((section, index) => {
      if (section.includes(':')) {
        const [title, ...content] = section.split(':');
        return (
          <div key={index} className="mb-6 pb-6 border-b border-gray-800 last:border-0 group/section">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-gray-200 font-semibold mb-3">{title.trim()}:</h3>
                <p className="text-gray-300 leading-relaxed">{content.join(':').trim()}</p>
              </div>
              {!isTyping && (
                <button
                  onClick={() => handleCopySection(section, index)}
                  className="opacity-0 group-hover/section:opacity-100 transition-opacity duration-200 p-2 hover:bg-gray-700 rounded-lg"
                  title="Copy section"
                >
                  {copiedSection === index ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              )}
            </div>
          </div>
        );
      }
      return (
        <div key={index} className="mb-6 pb-6 border-b border-gray-800 last:border-0 group/section">
          <div className="flex items-start justify-between gap-4">
            <p className="text-gray-300 leading-relaxed flex-1">{section.trim()}</p>
            {!isTyping && (
              <button
                onClick={() => handleCopySection(section, index)}
                className="opacity-0 group-hover/section:opacity-100 transition-opacity duration-200 p-2 hover:bg-gray-700 rounded-lg"
                title="Copy section"
              >
                {copiedSection === index ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className={`px-6 py-6 ${isAi ? 'bg-[#111827]' : ''} rounded-xl`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-medium text-gray-300">
          {isAi ? 'Aesthetic Intelligence' : 'You'}
        </span>
        {isTyping && (
          <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></span>
        )}
      </div>
      <div className="prose prose-invert max-w-none">
        {isAi ? formatMessage(displayedText) : message}
      </div>
      {isAi && !isTyping && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            {copiedAll ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">Copy All</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}