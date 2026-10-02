import React, { useState } from 'react';
import { ContentItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { Play, Plus, Check, Info, Star, Film, Tv, Radio } from 'lucide-react';

interface ContentCardProps {
  item: ContentItem;
  showProgress?: boolean;
  progressOverride?: number;
  onRemoveContinue?: () => void;
  aspectRatio?: 'poster' | 'landscape';
}

export const ContentCard: React.FC<ContentCardProps> = ({
  item,
  showProgress = false,
  progressOverride,
  onRemoveContinue,
  aspectRatio = 'poster'
}) => {
  const { openDetails, openPlayer, toggleMyList, isInMyList, continueWatching } = useApp();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const inWatchlist = isInMyList(item.id);
  const continueItem = continueWatching.find((c) => c.contentId === item.id);
  const progress = progressOverride !== undefined ? progressOverride : continueItem?.progress;

  const imgSrc = aspectRatio === 'landscape' && item.backdropUrl ? item.backdropUrl : item.posterUrl;

  return (
    <div
      className="group relative flex-none cursor-pointer transition-all duration-300 transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-xl"
      onClick={() => openDetails(item.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDetails(item.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${item.title} (${item.year})`}
    >
      {/* Visual Container */}
      <div
        className={`relative overflow-hidden rounded-xl bg-slate-900 border border-white/5 shadow-md shadow-black/40 group-hover:shadow-2xl group-hover:shadow-purple-950/40 group-hover:border-purple-500/30 transition-all duration-300 ${
          aspectRatio === 'landscape'
            ? 'w-64 sm:w-72 aspect-video'
            : 'w-36 sm:w-44 md:w-52 aspect-[2/3]'
        }`}
      >
        {/* Fallback container with rich gradient in case image is loading or fails */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950/60 to-purple-950/60 flex flex-col items-center justify-center p-3 text-center transition-opacity duration-300 ${
            imageLoaded && !imageError ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {item.type === 'live' ? (
            <Radio className="w-8 h-8 text-rose-400 mb-2 animate-pulse" />
          ) : item.type === 'movie' ? (
            <Film className="w-8 h-8 text-purple-400/60 mb-2" />
          ) : (
            <Tv className="w-8 h-8 text-indigo-400/60 mb-2" />
          )}
          <span className="font-display text-xs font-semibold text-slate-300 line-clamp-2">
            {item.title}
          </span>
          <span className="text-[10px] text-slate-500 mt-1">{item.year}</span>
        </div>

        {/* Real Image */}
        {!imageError && (
          <img
            src={imgSrc}
            alt={item.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Top Indicators: subtle unboxed badge */}
        <div className="absolute top-2 left-2 z-10 pointer-events-none flex items-center gap-1.5">
          {item.type === 'live' ? (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase text-white bg-rose-600/90 backdrop-blur-md rounded border border-rose-500/40 flex items-center gap-1 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE
            </span>
          ) : item.quality?.[0] ? (
            <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-slate-200 bg-black/60 backdrop-blur-md rounded border border-white/10">
              {item.quality[0]}
            </span>
          ) : null}
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 z-20">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openPlayer(item.id);
              }}
              className="p-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/50 hover:scale-110 active:scale-95 transition-all"
              aria-label={`Play ${item.title}`}
              title="Play Now"
            >
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMyList(item.id);
              }}
              className={`p-2 rounded-full border transition-all hover:scale-110 active:scale-95 ${
                inWatchlist
                  ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                  : 'bg-black/60 border-white/20 text-slate-200 hover:border-white hover:text-white'
              }`}
              aria-label={inWatchlist ? 'Remove from My List' : 'Add to My List'}
              title={inWatchlist ? 'Remove from My List' : 'Add to My List'}
            >
              {inWatchlist ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                openDetails(item.id);
              }}
              className="p-2 rounded-full bg-black/60 border border-white/20 text-slate-200 hover:border-white hover:text-white transition-all hover:scale-110 active:scale-95 ml-auto"
              aria-label={`Details for ${item.title}`}
              title="Details & Episodes"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          <h4 className="font-display font-semibold text-white text-sm line-clamp-1">
            {item.title}
          </h4>

          {/* Clean unboxed metadata with separators */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-300 mt-0.5">
            <span className="flex items-center gap-0.5 text-amber-400 font-medium">
              <Star className="w-3 h-3 fill-amber-400" />
              {item.score.toFixed(1)}
            </span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>{item.year}</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>{item.rating}</span>
          </div>

          <div className="text-[10px] text-slate-400 truncate mt-0.5">
            {item.genres.slice(0, 2).join(', ')}
          </div>
        </div>

        {/* Watch progress bar (at bottom) */}
        {showProgress && progress !== undefined && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/60 z-10">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}
      </div>

      {/* Static Subtitle below card for legibility when not hovering */}
      <div className="mt-2 px-0.5">
        <h3 className="font-display text-xs sm:text-sm font-medium text-slate-200 line-clamp-1 group-hover:text-purple-300 transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
          <span>{item.year}</span>
          <span aria-hidden="true">·</span>
          <span>
            {item.type === 'live'
              ? '24/7 Live'
              : item.type === 'movie'
              ? item.duration || 'Movie'
              : `${item.seasonsCount || 1} Season${(item.seasonsCount || 1) > 1 ? 's' : ''}`}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-400 flex items-center gap-0.5">
            <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
            {item.score.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};
