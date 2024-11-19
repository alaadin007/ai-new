import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useNews } from '../hooks/useNews';
import { createSlug } from '../utils/url';
import { formatDate } from '../utils/date';

export function NewsSection() {
  const { news, isLoading } = useNews();

  if (isLoading) {
    return (
      <div className="space-y-1.5">
        {[1, 2].map((i) => (
          <div key={`loading-${i}`} className="animate-pulse">
            <div className="h-3 bg-gray-700 rounded w-1/4 mb-1"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const displayNews = news.slice(0, 2);

  return (
    <div className="space-y-1.5">
      {displayNews.map((article) => (
        <Link
          key={article.id}
          to={`/news/${article.id}/${createSlug(article.title)}`}
          className="block text-[11px] text-gray-300 hover:text-gray-200 transition-colors duration-200 bg-[#1e293b]/50 p-2 rounded-lg"
        >
          <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-1">
            <Calendar className="w-3 h-3" />
            {formatDate(article.published_at)}
          </div>
          <span className="line-clamp-2">{article.title}</span>
        </Link>
      ))}
    </div>
  );
}