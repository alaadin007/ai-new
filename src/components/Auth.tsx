import React from 'react';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';

export function Auth() {
  return (
    <div className="w-full max-w-md p-6 bg-[#0f1623] rounded-xl">
      <SupabaseAuth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#2563eb',
                brandAccent: '#1d4ed8',
                inputBackground: '#1e293b',
                inputText: '#fff',
                inputPlaceholder: '#94a3b8',
              },
            },
          },
          className: {
            container: 'auth-container',
            button: 'auth-button',
            input: 'auth-input',
          },
        }}
        providers={['google', 'microsoft', 'github']}
        redirectTo={window.location.origin}
      />
    </div>
  );
}