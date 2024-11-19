// Update the imports at the top
import { Globe, ArrowUpRight, Instagram, Facebook, TikTok, Heart } from 'lucide-react';

// Then update the Xiaohongshu link section:
{socialMedia.xiaohongshu && (
  <a
    href={`https://xiaohongshu.com/${socialMedia.xiaohongshu}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-3 bg-[#2d3b4f] hover:bg-[#374357] rounded-xl transition-colors duration-200 group"
  >
    <Heart className="w-5 h-5 text-red-400" />
    <span className="text-sm">Xiaohongshu</span>
    <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
  </a>
)}