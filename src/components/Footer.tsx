import React from 'react';
import { GraduationCap, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NewsSection } from './NewsSection';

export function Footer() {
  return (
    <footer className="py-2 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-4">
          {/* First News Column */}
          <div>
            <div className="h-5 mb-1.5">
              <Link to="/news" className="group flex items-center gap-2">
                <Newspaper className="w-3 h-3 text-blue-400" />
                <h3 className="text-xs font-semibold text-gray-200 group-hover:text-gray-100 transition-colors duration-200">Latest News</h3>
              </Link>
            </div>
            <NewsSection />
          </div>

          {/* Second News Column */}
          <div>
            <div className="h-5 mb-1.5"></div>
            <NewsSection />
          </div>

          {/* Online Courses Column */}
          <div>
            <div className="h-5 mb-1.5">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3 h-3 text-emerald-400" />
                <h3 className="text-xs font-semibold text-emerald-200">Online Approved Courses</h3>
              </div>
            </div>
            <div className="space-y-1.5">
              <a
                href="https://www.harleystreetinstitute.com/course?courseid=masseter-botox"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[11px] text-emerald-300 hover:text-emerald-200 transition-colors duration-200 bg-[#1e293b]/50 p-2 rounded-lg"
              >
                Masseter Botox Course
                <span className="block text-emerald-400/60 text-[10px]">Master the art of masseter injections</span>
              </a>
              <a
                href="https://www.harleystreetinstitute.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[11px] text-emerald-300 hover:text-emerald-200 transition-colors duration-200 bg-[#1e293b]/50 p-2 rounded-lg"
              >
                Advanced Dermal Fillers
                <span className="block text-emerald-400/60 text-[10px]">Comprehensive training for facial enhancement</span>
              </a>
            </div>
          </div>
        </div>

        {/* Harley Street Institute Link */}
        <div className="mt-2 pt-1 border-t border-gray-800/50">
          <div className="text-center">
            <a
              href="https://harleystreetinstitute.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-gray-400 hover:text-gray-300 transition-colors duration-200"
            >
              Harley Street Institute
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}