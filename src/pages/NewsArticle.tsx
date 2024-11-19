import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { newsService, type NewsArticle } from '../lib/news';
import { formatDate } from '../utils/date';
import { createSlug, getRelatedArticles } from '../utils/url';
import { useNews } from '../hooks/useNews';

export function NewsArticle() {
  const { id, slug } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { news } = useNews();
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await newsService.getArticleById(id);
        setArticle(data);
        if (data) {
          setRelatedArticles(getRelatedArticles(data, news));
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id, news]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B1220] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) return null;

  // Redirect to the correct URL if the slug doesn't match
  const correctSlug = createSlug(article.title);
  if (slug !== correctSlug) {
    return <Navigate to={`/news/${id}/${correctSlug}`} replace />;
  }

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/news"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to News
        </Link>

        <article className="max-w-3xl mx-auto">
          <Helmet>
            <title>{article.title} | Aesthetic Intelligence News</title>
            <meta name="description" content={article.summary} />
            <link rel="canonical" href={`/news/${id}/${correctSlug}`} />
          </Helmet>

          <header className="mb-8 pb-8 border-b border-gray-800">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(article.published_at)}
              </div>
              <span className="text-gray-600">•</span>
              <span>{article.source}</span>
            </div>
          </header>

          <div className="prose prose-invert max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.endsWith(':')) {
                return (
                  <h3 key={index} className="text-xl font-semibold mt-8 mb-4">
                    {paragraph}
                  </h3>
                );
              }
              
              if (paragraph.trim().startsWith('•')) {
                return (
                  <ul key={index} className="list-disc pl-4 mb-4">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i} className="text-gray-300">
                        {item.replace('•', '').trim()}
                      </li>
                    ))}
                  </ul>
                );
              }
              
              return (
                <p key={index} className="text-gray-300 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Related Articles */}
          <footer className="mt-12 pt-8 border-t border-gray-800">
            <h2 className="text-xl font-semibold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/news/${related.id}/${createSlug(related.title)}`}
                  className="group bg-[#1e293b]/30 border border-gray-800 rounded-xl p-4 hover:bg-[#1e293b]/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <Calendar className="w-3 h-3" />
                    {formatDate(related.published_at)}
                  </div>
                  <h3 className="text-sm font-medium group-hover:text-blue-400 transition-colors duration-200 mb-2">
                    {related.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2">{related.summary}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-blue-400 group-hover:text-blue-300">
                    Read article
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}