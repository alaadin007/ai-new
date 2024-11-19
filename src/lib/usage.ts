import { supabase } from './supabase';

export interface UsageStats {
  queriesUsed: number;
  wordsUsed: number;
  subscriptionTier: 'free' | 'silver' | 'gold';
  queriesRemaining: number;
  wordsRemaining: number;
}

const LIMITS = {
  FREE_QUERIES: 10,
  SILVER_WORDS: 1_000_000, // 1 Million words
};

export const usageService = {
  async getUserUsage(userId: string): Promise<UsageStats> {
    const { data: usage, error } = await supabase
      .from('user_usage')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching usage:', error);
      return {
        queriesUsed: 0,
        wordsUsed: 0,
        subscriptionTier: 'free',
        queriesRemaining: LIMITS.FREE_QUERIES,
        wordsRemaining: 0
      };
    }

    const queriesRemaining = usage.subscription_tier === 'free' 
      ? LIMITS.FREE_QUERIES - usage.queries_used
      : Infinity;

    const wordsRemaining = usage.subscription_tier === 'silver'
      ? LIMITS.SILVER_WORDS - usage.words_used
      : 0;

    return {
      queriesUsed: usage.queries_used,
      wordsUsed: usage.words_used,
      subscriptionTier: usage.subscription_tier,
      queriesRemaining,
      wordsRemaining
    };
  },

  async incrementUsage(userId: string, wordCount: number): Promise<void> {
    const { error } = await supabase.rpc('increment_usage', {
      p_user_id: userId,
      p_word_count: wordCount
    });

    if (error) {
      console.error('Error incrementing usage:', error);
      throw error;
    }
  },

  async canMakeQuery(userId: string): Promise<boolean> {
    const usage = await this.getUserUsage(userId);
    
    if (usage.subscriptionTier === 'free') {
      return usage.queriesRemaining > 0;
    }
    
    if (usage.subscriptionTier === 'silver') {
      return usage.wordsRemaining > 0;
    }
    
    return true; // Gold tier has no limits
  }
};