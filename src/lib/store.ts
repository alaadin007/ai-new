import { create } from 'zustand';
import { supabase } from './supabase';

interface Message {
  id: string;
  content: string;
  isAi: boolean;
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  category?: string;
  messages: Message[];
  timestamp: string;
}

interface ChatState {
  sessions: ChatSession[];
  currentSessionId: string | null;
  isLoading: boolean;
  error: string | null;
  fetchSessions: () => Promise<void>;
  createSession: (title: string) => Promise<string>;
  addMessage: (sessionId: string, content: string, isAi: boolean) => Promise<void>;
  setCurrentSession: (sessionId: string | null) => void;
  updateSessionCategory: (sessionId: string, category: string) => Promise<void>;
}

export const useChatStore = create<ChatState>()((set, get) => ({
  sessions: [],
  currentSessionId: null,
  isLoading: false,
  error: null,

  fetchSessions: async () => {
    set({ isLoading: true });
    try {
      const { data: sessions, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ sessions: sessions || [], isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch sessions', isLoading: false });
    }
  },

  createSession: async (title: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert([{ title }])
        .select()
        .single();

      if (error) throw error;

      const newSession = {
        ...data,
        messages: [],
        timestamp: new Date().toISOString()
      };

      set(state => ({
        sessions: [newSession, ...state.sessions],
        currentSessionId: newSession.id
      }));

      return newSession.id;
    } catch (error) {
      set({ error: 'Failed to create session' });
      throw error;
    }
  },

  addMessage: async (sessionId: string, content: string, isAi: boolean) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([{ session_id: sessionId, content, is_ai: isAi }])
        .select()
        .single();

      if (error) throw error;

      const newMessage = {
        id: data.id,
        content: data.content,
        isAi: data.is_ai,
        timestamp: new Date().toISOString()
      };

      set(state => ({
        sessions: state.sessions.map(session =>
          session.id === sessionId
            ? {
                ...session,
                messages: [...session.messages, newMessage]
              }
            : session
        )
      }));
    } catch (error) {
      set({ error: 'Failed to add message' });
    }
  },

  setCurrentSession: (sessionId: string | null) => {
    set({ currentSessionId: sessionId });
  },

  updateSessionCategory: async (sessionId: string, category: string) => {
    try {
      const { error } = await supabase
        .from('chat_sessions')
        .update({ category })
        .eq('id', sessionId);

      if (error) throw error;

      set(state => ({
        sessions: state.sessions.map(session =>
          session.id === sessionId
            ? { ...session, category }
            : session
        )
      }));
    } catch (error) {
      set({ error: 'Failed to update category' });
    }
  }
}));