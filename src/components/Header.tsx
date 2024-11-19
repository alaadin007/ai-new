import React from 'react';
import { Building2, Users2, BookOpen, Sparkles, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="glow-text text-xl font-semibold">
            Aesthetic Intelligence
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/patients"
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-gray-100 transition-colors duration-200"
            >
              <Stethoscope className="w-4 h-4" />
              <span>My Clinic</span>
            </Link>

            {[
              { name: 'Clinic Teams', icon: Users2, comingSoon: true },
              { name: 'Knowledge Base', icon: BookOpen, comingSoon: true },
              { name: 'Multi-Branch', icon: Building2, comingSoon: true },
              { name: 'AI Training', icon: Sparkles, comingSoon: true }
            ].map((item) => (
              <button
                key={item.name}
                className="group relative flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                disabled={item.comingSoon}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
                {item.comingSoon && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-medium bg-blue-500/20 text-blue-400 rounded-full">
                    Soon
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}