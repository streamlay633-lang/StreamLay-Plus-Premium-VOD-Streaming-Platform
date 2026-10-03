import React, { useState } from 'react';
import { ContentItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { Play, Info, Plus, Check, Star, Volume2, VolumeX } from 'lucide-react';

interface HeroBannerProps {
  item: ContentItem;
  featuredCategory?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ item, featuredCategory }) => {
  const { openPlayer, openDetails, toggleMyList, isInMyList, isRtl, t } = useApp();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const inWatchlist = isInMyList(item.id);

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] max-h-[750px] overflow-hidden select-none">
      {/* Background Image Container with dark gradient scrims */}
      <div className="absolute inset-0 z-0">
        <img
          src={item.backdropUrl}
          alt={item.title}
          referrerPolicy="no-referrer"
          loading="eager"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center transform scale-100 transition-opacity duration-700 ${
            imageLoaded ? 'opacity-90' : 'opacity-0'
          }`}
        />

        {/* Ambient fallback gradient if image takes a second to load */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-[#07090e] via-[#0d1424] to-[#1e1435] transition-opacity duration-500 ${
            imageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />

        {/* Cinematic gradient overlays: Text scrim & Bottom smooth fade to canvas */}
        <div
          className={`absolute inset-0 z-10 w-full md:w-3/4 ${
            isRtl
              ? 'bg-gradient-to-l from-[#07090e] via-[#07090e]/75 to-transparent'
              : 'bg-gradient-to-r from-[#07090e] via-[#07090e]/75 to-transparent'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/40 to-transparent z-10" />
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#07090e]/80 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-14 sm:pb-20">
        <div className="max-w-2xl">
          {/* Subtle Category or Original text label */}
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span>{featuredCategory || t('home.featuredCategory')}</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-balance mb-3 drop-shadow-md">
            {item.title}
          </h1>

          {/* Clean unboxed metadata with separators */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium mb-3">
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {item.score.toFixed(1)} IMDb
            </span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>{item.year}</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="px-1.5 py-0.5 rounded bg-white/10 text-white text-xs border border-white/15">
              {item.rating}
            </span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>
              {item.type === 'live'
                ? `24/7 ${t('label.live')}`
                : item.type === 'movie'
                ? item.duration
                : `${item.seasonsCount || 1} ${(item.seasonsCount || 1) > 1 ? t('label.seasons') : t('label.seasonSingular')}`}
            </span>
            {item.quality?.[0] && (
              <>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="text-purple-300 text-xs font-semibold">{item.quality[0]}</span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6 max-w-xl drop-shadow">
            {item.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openPlayer(item.id)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-200 transition-all shadow-xl shadow-white/10 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>{t('action.watchNow')}</span>
            </button>

            <button
              onClick={() => openDetails(item.id)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 text-white font-medium text-sm backdrop-blur-md border border-white/15 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <Info className="w-4 h-4" />
              <span>{t('action.moreInfo')}</span>
            </button>

            <button
              onClick={() => toggleMyList(item.id)}
              className={`p-3 rounded-xl border backdrop-blur-md transition-all hover:scale-105 active:scale-95 focus:outline-none ${
                inWatchlist
                  ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                  : 'bg-black/40 border-white/20 text-slate-300 hover:text-white hover:border-white'
              }`}
              aria-label={inWatchlist ? t('action.removeFromMyList') : t('action.addToMyList')}
              title={inWatchlist ? t('action.inMyList') : t('action.addToMyList')}
            >
              {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>

            {/* Mute ambient indicator */}
            <div className={`hidden sm:flex items-center ${isRtl ? 'mr-auto' : 'ml-auto'}`}>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/15 text-slate-300 hover:text-white transition-all text-xs"
                title={isMuted ? 'Unmute' : 'Mute'}
                aria-label="Toggle sound preview"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
