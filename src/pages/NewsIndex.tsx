import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { NewsLayout } from '../components/NewsLayout';
import { useNews } from '../hooks/useNews';
import { createSlug } from '../utils/url';
import { formatDate } from '../utils/date';

export function NewsIndex() {
  const { news, isLoading } = useNews();

  if (isLoading) {
    return (
      <NewsLayout>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={`loading-${i}`} className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
              <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </NewsLayout>
    );
  }

  return (
    <NewsLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((article) => (
          <Link
            key={article.id}
            to={`/news/${article.id}/${createSlug(article.title)}`}
            className="group bg-[#1e293b]/30 border border-gray-800 rounded-xl p-6 hover:bg-[#1e293b]/50 transition-all duration-200 flex flex-col"
          >
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <Calendar className="w-4 h-4" />
              {formatDate(article.published_at)}
            </div>
            
            <h2 className="text-lg font-medium group-hover:text-blue-400 transition-colors duration-200 mb-3">
              {article.title}
            </h2>
            
            <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">
              {article.summary}
            </p>
            
            <div className="text-sm text-gray-500">
              {article.source}
            </div>
          </Link>
        ))}
      </div>
    </NewsLayout>
  );
}