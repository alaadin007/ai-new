import React from 'react';
import { Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center space-x-2 bg-[#1E2A47]/30 backdrop-blur-sm border border-[#ffffff0d] w-fit mx-auto px-6 py-2.5 rounded-full mb-8">
        <Sparkles className="w-5 h-5 text-blue-400" />
        <span className="text-gray-300">AI-Powered Aesthetic Medicine Assistant</span>
      </div>

      <h1 className="glow-text text-6xl md:text-7xl font-bold mb-6 tracking-tight">
        Aesthetic Intelligence
      </h1>

      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        Your AI-powered guide to aesthetic medicine knowledge. Get instant answers, protocols, and expert guidance.
      </p>
    </div>
  );
}