import React from 'react';
import { Globe, ArrowUpRight, Instagram, Facebook } from 'lucide-react';
import { TikTokIcon } from './icons/TikTok';

// Update the TikTok link in the social media section:
{socialMedia.tiktok && (
  <a
    href={`https://tiktok.com/@${socialMedia.tiktok}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
  >
    <TikTokIcon className="w-5 h-5" />
    <span className="sr-only">TikTok</span>
  </a>
)}

// ... rest of the component remains the same