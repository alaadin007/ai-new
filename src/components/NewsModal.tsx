import React from 'react';
import { X } from 'lucide-react';
import type { NewsArticle } from '../lib/news';

interface NewsModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export function NewsModal({ article, onClose }: NewsModalProps) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0f1623] rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-200">{article.title}</h3>
            <p className="text-sm text-gray-400 mt-1">
              {new Date(article.published_at).toLocaleDateString()} • {article.source}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            Read full article on {article.source} →
          </a>
        </div>
      </div>
    </div>
  );
}