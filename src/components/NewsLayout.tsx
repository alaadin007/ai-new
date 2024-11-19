import React from 'react';
import { ChevronLeft, Calendar, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsLayoutProps {
  children: React.ReactNode;
}

export function NewsLayout({ children }: NewsLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0B1220]">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to AI Assistant
        </Link>
        
        <div className="border-b border-gray-800 pb-8 mb-8">
          <h1 className="glow-text text-4xl font-bold mb-4">Aesthetic Medicine News</h1>
          <p className="text-gray-400">Latest updates and insights from the world of aesthetic medicine</p>
        </div>

        {children}
      </div>
    </div>
  );
}