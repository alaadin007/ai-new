import React from 'react';
import { LogOut, User, Settings } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface UserProfileProps {
  user: any;
  subscription: any;
}

export function UserProfile({ user, subscription }: UserProfileProps) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="absolute bottom-0 left-0 w-64 bg-[#0f1623] p-4 border-t border-gray-800">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center">
          <User className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-200 truncate">
            {user.email}
          </p>
          <p className="text-xs text-gray-400">
            {subscription?.status === 'active' ? 'Pro Plan' : 'Free Plan'}
          </p>
        </div>
      </div>
      
      <div className="space-y-1">
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#1e293b] rounded-lg transition-colors duration-200">
          <Settings className="w-4 h-4" />
          Settings
        </button>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#1e293b] rounded-lg transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}