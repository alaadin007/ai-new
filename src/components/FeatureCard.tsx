import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-1000"></div>
      <div className="relative bg-[#1E2A47]/30 backdrop-blur-sm border border-[#ffffff0d] rounded-2xl p-8 hover:bg-[#1E2A47]/50 transition-all duration-300">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}