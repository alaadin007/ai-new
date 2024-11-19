import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchSectionProps {
  onSearch: (query: string) => void;
}

export function SearchSection({ onSearch }: SearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery('');
    }
  };

  const suggestions = [
    "What are the latest protocols for dermal fillers?",
    "How to manage vascular occlusion?",
    "Best practices for botulinum toxin injection"
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="flex items-center gap-2 text-2xl mb-4 text-gray-200 font-semibold">
        <Search className="w-6 h-6" />
        Ask Aesthetic Intelligence
      </h2>
      
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ask about aesthetic medicine procedures, protocols, or best practices..."
          className="w-full px-6 py-4 bg-[#1e293b] rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500 text-gray-200 placeholder-gray-400 pr-16"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2d3b4f] hover:bg-[#374357] p-2.5 rounded-lg transition-colors duration-200"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="text-left p-4 bg-[#1e293b] rounded-lg hover:bg-[#2d3b4f] transition-colors duration-200"
              onClick={() => onSearch(suggestion)}
            >
              <span className="text-sm text-gray-400 block mb-1">Popular Question</span>
              <span className="text-gray-200 font-medium block">{suggestion}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}