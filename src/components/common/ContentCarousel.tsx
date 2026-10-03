import React, { useRef } from 'react';
import { ContentItem } from '../../types';
import { ContentCard } from './ContentCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ContentCarouselProps {
  title: string;
  items: ContentItem[];
  subtitle?: string;
  showProgress?: boolean;
  aspectRatio?: 'poster' | 'landscape';
}

export const ContentCarousel: React.FC<ContentCarouselProps> = ({
  title,
  items,
  subtitle,
  showProgress = false,
  aspectRatio = 'poster'
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      const isRtl = document.documentElement.dir === 'rtl';
      // In RTL, left arrow means advancing backwards in logical reading direction
      const sign = direction === 'left' ? (isRtl ? 1 : -1) : (isRtl ? -1 : 1);
      scrollRef.current.scrollBy({
        left: sign * scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <section className="relative group/carousel my-6 sm:my-8">
      {/* Header */}
      <div className="flex items-end justify-between mb-3 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
            {title}
            <span className="text-xs font-normal text-slate-500 font-sans tabular-nums">
              ({items.length})
            </span>
          </h2>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        {/* Carousel arrows */}
        <div className="hidden sm:flex items-center gap-1.5 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-purple-600 border border-white/10 hover:border-purple-500 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-purple-600 border border-white/10 hover:border-purple-500 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal List */}
      <div
        ref={scrollRef}
        className="flex items-start gap-3 sm:gap-4 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8 scroll-smooth pb-2"
      >
        {items.map((item) => (
          <ContentCard
            key={item.id}
            item={item}
            showProgress={showProgress}
            aspectRatio={aspectRatio}
          />
        ))}
      </div>
    </section>
  );
};
