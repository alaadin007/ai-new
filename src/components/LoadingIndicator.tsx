import React, { useState, useEffect } from 'react';

const loadingStates = [
  { text: "Thinking...", duration: 1000 },
  { text: "Searching Medical Databases...", duration: 2000 },
  { text: "Analyzing Clinical Studies...", duration: 2000 },
  { text: "Reviewing Latest Research...", duration: 2000 },
  { text: "Consulting Treatment Guidelines...", duration: 2000 },
  { text: "Validating Protocols...", duration: 2000 },
  { text: "Preparing Response...", duration: 1000 }
];

export function LoadingIndicator() {
  const [currentState, setCurrentState] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const cycleState = () => {
      if (currentState < loadingStates.length - 1) {
        timeoutId = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            setCurrentState(prev => prev + 1);
            setIsVisible(true);
          }, 200);
        }, loadingStates[currentState].duration);
      }
    };

    cycleState();
    return () => clearTimeout(timeoutId);
  }, [currentState]);

  return (
    <div className="px-6 py-6 bg-[#111827] rounded-xl">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-300">
          Aesthetic Intelligence
        </span>
        <div className={`flex items-center gap-2 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-sm text-blue-400">{loadingStates[currentState].text}</span>
          <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}