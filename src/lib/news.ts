import { supabase } from './supabase';
import { generateResponse } from './openai';

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  summary: string;
  content: string;
  published_at: string;
}

// Sample articles to show while database is being set up
const SAMPLE_ARTICLES: NewsArticle[] = [
  {
    id: '1',
    title: "BCAM Updates Complication Management Protocol",
    source: "British College of Aesthetic Medicine",
    summary: "New guidelines for managing dermal filler complications with updated vascular occlusion protocols.",
    content: `The British College of Aesthetic Medicine has released comprehensive new guidelines for managing dermal filler complications, with a particular focus on vascular occlusion protocols.

Key Updates:

• Immediate recognition protocols with detailed visual assessment guidelines
• Step-by-step emergency response procedures
• Updated hyaluronidase dosing recommendations
• Post-complication monitoring requirements`,
    published_at: new Date().toISOString()
  },
  {
    id: '2',
    title: "New Research on Combination Treatments",
    source: "Journal of Clinical Aesthetics",
    summary: "Latest research reveals optimal protocols for combining botulinum toxin treatments with dermal fillers.",
    content: `A groundbreaking study published in the Journal of Clinical Aesthetics demonstrates the benefits of properly sequenced combination treatments.

Key Findings:

• Optimal timing between toxin and filler treatments
• Synergistic effects in specific facial areas
• Patient satisfaction metrics
• Long-term results analysis`,
    published_at: new Date(Date.now() - 86400000).toISOString()
  }
];

export const newsService = {
  async getLatestNews(): Promise<NewsArticle[]> {
    return SAMPLE_ARTICLES;
  },

  async getArticleById(id: string): Promise<NewsArticle | null> {
    return SAMPLE_ARTICLES.find(article => article.id === id) || null;
  }
};