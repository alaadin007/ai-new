import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kpwnctudzrtauxervuvn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtwd25jdHVkenJ0YXV4ZXJ2dXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MzkxMTQsImV4cCI6MjA0NzUxNTExNH0.JCOyadJ2AtTS9wOm9O8Km6JAay4dPsMt2s_r6CuJAWk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);