export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .split('-')
    .slice(0, 6)
    .join('-');
}

export function getRelatedArticles(currentArticle: any, allArticles: any[], limit = 3) {
  return allArticles
    .filter(article => article.id !== currentArticle.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
}