import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CONTENT } from '../../data/mockContent';
import { getLocalizedContent } from '../../i18n/translations';
import { Episode, VideoServer } from '../../types';
import {
  Play,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Clock,
  Tv,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Flame,
  CheckCircle2
} from 'lucide-react';

export const RecentlyAddedEpisodes: React.FC = () => {
  const {
    openPlayer,
    startPlayback,
    openDetails,
    continueWatching,
    language,
    isRtl,
    t
  } = useApp();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Retrieve Onegai AiPri from mock content and localize
  const rawAipri = MOCK_CONTENT.find((c) => c.id === 'onegai-aipri') || MOCK_CONTENT[0];
  const aipri = getLocalizedContent(rawAipri, language);

  const rawEpisodes: Episode[] = rawAipri.seasons?.[0]?.episodes || [];

  // Sort episodes: default is descending (newest episodes first: Ep 4 -> Ep 1)
  const episodes = [...rawEpisodes].sort((a, b) => {
    return sortOrder === 'desc'
      ? b.episodeNumber - a.episodeNumber
      : a.episodeNumber - b.episodeNumber;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      const sign = direction === 'left' ? (isRtl ? 1 : -1) : (isRtl ? -1 : 1);
      scrollRef.current.scrollBy({
        left: sign * scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!rawAipri || rawEpisodes.length === 0) {
    return null;
  }

  const BackArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="relative group/carousel my-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Container */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 text-pink-300 text-[11px] font-bold border border-pink-500/30 shadow-sm">
              <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" />
              <span>{t('home.newEpisodeBadge')}</span>
              <span className="text-white/40">·</span>
              <span className="text-purple-300">{t('home.episodeCardBadge')}</span>
            </span>

            <span className="text-xs text-slate-400 font-medium tabular-nums">
              ({rawEpisodes.length} {t('label.episodes')})
            </span>
          </div>

          <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>{t('home.recentlyAddedEpisodes')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 max-w-2xl">
            {t('home.recentlyAddedEpisodesSubtitle')}
          </p>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-2 self-start sm:self-end">
          {/* Order toggler (Newest vs Chronological) */}
          <button
            onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white text-xs font-medium transition-all active:scale-95"
            title="Toggle episode order"
          >
            {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
          </button>

          {/* View Series Guide button */}
          <button
            onClick={() => openDetails(rawAipri.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 hover:text-purple-200 border border-purple-500/30 text-xs font-semibold transition-all active:scale-95"
          >
            <span>{t('home.viewAllAipriEpisodes')}</span>
            <BackArrowIcon className="w-3.5 h-3.5" />
          </button>

          {/* Desktop Left / Right carousel arrows */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => scroll('left')}
              className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-purple-600 border border-white/10 hover:border-purple-500 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
              aria-label="Scroll episodes left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-purple-600 border border-white/10 hover:border-purple-500 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
              aria-label="Scroll episodes right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Episode Cards List */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-3 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        {episodes.map((ep) => {
          // Check for user watch progress on this episode
          const cw = continueWatching.find(
            (c) => c.contentId === rawAipri.id && c.episodeId === ep.id
          );
          const progress = cw ? cw.progress : ep.progress || 0;

          return (
            <div
              key={ep.id}
              className="group relative flex-none w-72 sm:w-80 md:w-[340px] flex flex-col rounded-2xl bg-slate-900/80 border border-white/10 hover:border-purple-500/50 shadow-xl hover:shadow-2xl hover:shadow-purple-950/40 transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => openPlayer(rawAipri.id, ep.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openPlayer(rawAipri.id, ep.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Play Episode ${ep.episodeNumber}: ${ep.title}`}
            >
              {/* Thumbnail Container (16:9 widescreen) */}
              <div className="relative aspect-video w-full bg-slate-950 overflow-hidden shrink-0">
                <img
                  src={ep.thumbnailUrl}
                  alt={ep.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    const fallback = `/assets/images/onegai_aipri_ep${ep.episodeNumber}.jpg`;
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    } else if (rawAipri.backdropUrl) {
                      e.currentTarget.src = rawAipri.backdropUrl;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Subtle vignette scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/20 to-black/40 pointer-events-none" />

                {/* Top Overlay Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white font-bold text-[10px] tracking-wider uppercase border border-white/15">
                      EP {ep.episodeNumber}
                    </span>

                    {ep.isNew && (
                      <span className="px-2 py-0.5 rounded bg-rose-600/90 backdrop-blur-md text-white font-black text-[10px] tracking-wider uppercase shadow-md shadow-rose-600/40 border border-rose-400/40 animate-pulse flex items-center gap-1">
                        <Flame className="w-2.5 h-2.5 fill-white" />
                        <span>{t('home.newEpisodeBadge')}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-slate-300 font-semibold text-[10px] tabular-nums border border-white/10 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-purple-400" />
                      <span>{ep.duration}</span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-purple-950/80 backdrop-blur-md text-purple-300 font-bold text-[10px] border border-purple-500/30">
                      1080p
                    </span>
                  </div>
                </div>

                {/* Hover Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-2xl shadow-purple-600/80 group-hover:scale-115 group-hover:bg-purple-500 transition-all duration-300 border border-white/20">
                    <Play className={`w-5 h-5 fill-white ${isRtl ? 'mr-0.5' : 'ml-0.5'}`} />
                  </div>
                </div>

                {/* Progress Bar (if watched partially) */}
                {progress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/80">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${Math.min(100, Math.max(5, progress))}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Episode Info Container */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
                      Episode {ep.episodeNumber} {ep.releaseDate ? `· ${ep.releaseDate}` : ''}
                    </span>
                    {progress >= 90 && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Watched</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                    {ep.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mt-1.5">
                    {ep.description}
                  </p>
                </div>

                {/* Streaming Server Chips & Direct Play Action */}
                <div className="pt-2 border-t border-white/5 space-y-2" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    <span>{t('label.streamingServers')}</span>
                    <button
                      onClick={() => openPlayer(rawAipri.id, ep.id)}
                      className="text-purple-400 hover:text-purple-300 font-bold transition-colors flex items-center gap-0.5"
                    >
                      <span>{t('home.watchEpisode')}</span>
                      <Play className="w-2.5 h-2.5 fill-current" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {ep.servers && ep.servers.length > 0 ? (
                      ep.servers.map((srv) => (
                        <button
                          key={srv.id}
                          onClick={() => startPlayback(rawAipri, ep, srv)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-purple-600 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 hover:border-purple-500 transition-all active:scale-95 shadow-sm group/btn"
                          title={`Play on ${srv.name} (${srv.quality || 'Auto'})`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover/btn:bg-white animate-pulse" />
                          <span>{srv.name}</span>
                          {srv.quality && (
                            <span className="text-[10px] text-slate-400 group-hover/btn:text-purple-100">
                              · {srv.quality}
                            </span>
                          )}
                        </button>
                      ))
                    ) : (
                      <button
                        onClick={() => openPlayer(rawAipri.id, ep.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all active:scale-95 shadow-md shadow-purple-600/30"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>{t('home.watchEpisode')}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
