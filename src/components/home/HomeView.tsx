import React from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CONTENT, MOCK_CHANNELS } from '../../data/mockContent';
import { ContentItem } from '../../types';
import { HeroBanner } from '../common/HeroBanner';
import { ContentCarousel } from '../common/ContentCarousel';
import { ContentCard } from '../common/ContentCard';
import { Play, Tv, Sparkles, Radio, Star, Users, Info, Calendar, Clock } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { continueWatching, startLivePlayback, openDetails, openPlayer } = useApp();

  // Onegai Aipri as the main featured hero item
  const onegaiAipri = MOCK_CONTENT.find((c) => c.id === 'onegai-aipri') || MOCK_CONTENT[0];
  const channel0225 = MOCK_CHANNELS[0];

  // Continue Watching list
  const continueItems: ContentItem[] = [];
  for (const cw of continueWatching) {
    const item = MOCK_CONTENT.find((c) => c.id === cw.contentId);
    if (item) {
      continueItems.push({ ...item, progress: cw.progress });
    }
  }

  const seriesItems = MOCK_CONTENT.filter((c) => c.type === 'series');
  const liveItems = MOCK_CONTENT.filter((c) => c.type === 'live');

  return (
    <div className="pb-24 pt-0">
      {/* Hero Banner for Onegai Aipri */}
      {onegaiAipri && (
        <HeroBanner item={onegaiAipri} featuredCategory="Featured Anime Series" />
      )}

      {/* Main Content Area */}
      <div className="relative z-30 -mt-10 sm:-mt-16 space-y-6">
        {/* Continue Watching (if any) */}
        {continueItems.length > 0 && (
          <ContentCarousel
            title="Continue Watching"
            subtitle="Resume where you left off"
            items={continueItems}
            showProgress={true}
            aspectRatio="landscape"
          />
        )}

        {/* Channel 0225 TV Live Broadcast Spotlight Section */}
        {channel0225 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2.5">
                  <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
                  <span>24/7 Live Broadcast Spotlight</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-600/20 text-rose-400 text-[10px] font-bold border border-rose-500/30">
                    LIVE
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tune into Channel 0225 TV streaming non-stop entertainment worldwide
                </p>
              </div>

              <button
                onClick={() => startLivePlayback(channel0225)}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 active:scale-95 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Watch Live Now</span>
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-slate-900/90 border border-white/10 shadow-2xl p-6 sm:p-8 backdrop-blur-xl group">
              {/* Backdrop glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-950/60 via-slate-900/90 to-slate-950/90 pointer-events-none" />
              {channel0225.backdropUrl && (
                <img
                  src={channel0225.backdropUrl}
                  alt={channel0225.name}
                  referrerPolicy="no-referrer"
                  className="absolute right-0 top-0 bottom-0 w-full sm:w-2/3 h-full object-cover object-center opacity-30 mix-blend-overlay pointer-events-none group-hover:scale-105 transition-transform duration-700"
                />
              )}

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Channel Brand & Info (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-white/15 overflow-hidden flex items-center justify-center shadow-lg">
                      {channel0225.posterUrl ? (
                        <img
                          src={channel0225.posterUrl}
                          alt={channel0225.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl">{channel0225.logo}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight">
                          {channel0225.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300 text-[11px] font-semibold">
                          CH {channel0225.number}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="text-purple-300 font-semibold">{channel0225.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-400 font-semibold">{channel0225.resolution}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1 text-slate-300">
                          <Users className="w-3 h-3 text-slate-400" />
                          {channel0225.viewerCount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Current Program Details */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px] tracking-wider animate-pulse">
                        ON AIR
                      </span>
                      <span className="text-purple-300 font-semibold">{channel0225.currentProgramTime}</span>
                    </div>
                    <h4 className="font-display text-base sm:text-lg font-bold text-white mb-1">
                      {channel0225.currentProgram}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {channel0225.currentProgramDesc}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      onClick={() => startLivePlayback(channel0225)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Stream Live Now</span>
                    </button>

                    <button
                      onClick={() => openDetails(channel0225.id)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/15 transition-all active:scale-95"
                    >
                      <Info className="w-4 h-4 text-purple-300" />
                      <span>Channel Schedule</span>
                    </button>
                  </div>
                </div>

                {/* Upcoming Schedule Mini-Guide (5 cols) */}
                <div className="lg:col-span-5 bg-black/50 border border-white/10 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                    <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      Broadcast Lineup
                    </span>
                    <span className="text-slate-500">Live 24/7 Feed</span>
                  </div>

                  <div className="space-y-2">
                    {channel0225.schedule.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/60 border border-white/5 text-xs"
                      >
                        <span className="font-bold text-purple-400 w-12 shrink-0 tabular-nums">
                          {item.time}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-200 truncate">{item.title}</p>
                          <span className="text-[10px] text-slate-500">{item.genre} · {item.durationMinutes}m</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Featured Series Spotlight: Onegai Aipri */}
        {seriesItems.length > 0 && (
          <ContentCarousel
            title="Featured Television Series"
            subtitle="Sparkling idol stages and virtual academy adventures"
            items={seriesItems}
          />
        )}

        {/* All Available Titles Carousel */}
        <ContentCarousel
          title="All Available Streaming Content"
          subtitle="Explore our curated catalog of premier television series and 24/7 live networks"
          items={MOCK_CONTENT}
        />
      </div>
    </div>
  );
};
