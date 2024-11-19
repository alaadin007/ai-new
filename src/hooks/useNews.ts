import { useState, useEffect } from 'react';
import { newsService, type NewsArticle } from '../lib/news';

export function useNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const articles = await newsService.getLatestNews();
        setNews(articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const getArticle = (id: string | undefined) => {
    if (!id) return null;
    return news.find(article => article.id === id);
  };

  return { news, isLoading, getArticle };
}