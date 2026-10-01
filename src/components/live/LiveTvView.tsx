import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CHANNELS } from '../../data/mockContent';
import { LiveChannel } from '../../types';
import { Play, Star, Maximize, Volume2, VolumeX, Radio, Clock, Calendar, Check, Users } from 'lucide-react';

export const LiveTvView: React.FC = () => {
  const { startLivePlayback, favoriteChannels, toggleFavoriteChannel, isFavoriteChannel } = useApp();
  const [selectedChannel, setSelectedChannel] = useState<LiveChannel>(MOCK_CHANNELS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const categories = ['All', 'Sports', 'News', 'Cinema', 'Documentary', 'Music', 'Entertainment', 'Favorites'];

  const filteredChannels = MOCK_CHANNELS.filter((ch) => {
    if (activeCategory === 'Favorites') return isFavoriteChannel(ch.id);
    if (activeCategory === 'All') return true;
    return ch.category === activeCategory;
  });

  const handleSelectChannel = (ch: LiveChannel) => {
    setSelectedChannel(ch);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const isCurrentFav = isFavoriteChannel(selectedChannel.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28">
      {/* Page Title & LIVE status */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Live TV</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-600/20 border border-rose-500/40 text-rose-400 text-xs font-bold tracking-wider animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              LIVE
            </span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Over 100+ live broadcast streams, 24/7 sports, news, and cinema channels.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <Radio className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>Simulated Live Stream Buffer</span>
        </div>
      </div>

      {/* Featured Channel Video Preview Player Area */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl mb-8 group">
        <div className="relative aspect-video max-h-[500px] w-full bg-black">
          {/* Active video element for channel preview */}
          <video
            ref={videoRef}
            src={selectedChannel.streamUrl}
            autoPlay
            playsInline
            loop
            muted={isMuted}
            className="w-full h-full object-cover"
          />

          {/* Scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-black/20 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

          {/* Top Channel Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15">
              <span className="text-xl">{selectedChannel.logo}</span>
              <div>
                <span className="text-xs font-bold text-white block leading-tight">
                  {selectedChannel.name}
                </span>
                <span className="text-[10px] text-slate-400">CH {selectedChannel.number}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/90 transition-all"
                title={isMuted ? 'Unmute' : 'Mute'}
                aria-label="Toggle mute"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
              </button>

              <button
                onClick={() => startLivePlayback(selectedChannel)}
                className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/90 transition-all"
                title="Fullscreen Stream"
                aria-label="Fullscreen Stream"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Live Info & Quick Action */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-1.5 text-xs">
                <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px] tracking-wide">
                  ON AIR
                </span>
                <span className="text-purple-300 font-semibold">{selectedChannel.currentProgramTime}</span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="text-slate-300 flex items-center gap-1">
                  <Users className="w-3 h-3 text-slate-400" />
                  {selectedChannel.viewerCount}
                </span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-1 drop-shadow">
                {selectedChannel.currentProgram}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 drop-shadow">
                {selectedChannel.currentProgramDesc}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => toggleFavoriteChannel(selectedChannel.id)}
                className={`p-3 rounded-xl border backdrop-blur-md transition-all ${
                  isCurrentFav
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                    : 'bg-black/60 border-white/20 text-slate-300 hover:text-white'
                }`}
                title={isCurrentFav ? 'Remove Favorite' : 'Add to Favorites'}
              >
                <Star className={`w-4 h-4 ${isCurrentFav ? 'fill-amber-400' : ''}`} />
              </button>

              <button
                onClick={() => startLivePlayback(selectedChannel)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Watch Full Live Feed</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              {cat === 'Favorites' ? `★ Favorites (${favoriteChannels.length})` : cat}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Channels list on left + Interactive EPG Guide on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Channel Cards (Left Column, 5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
            Available Channels ({filteredChannels.length})
          </h3>

          <div className="space-y-2.5 max-h-[550px] overflow-y-auto pr-1">
            {filteredChannels.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/50 rounded-xl border border-white/5">
                <p className="text-slate-400 text-sm">No favorite channels added yet.</p>
                <p className="text-xs text-slate-500 mt-1">Click the star icon to pin your favorite channels here.</p>
              </div>
            ) : (
              filteredChannels.map((channel) => {
                const isSelected = selectedChannel.id === channel.id;
                const isFav = isFavoriteChannel(channel.id);

                return (
                  <div
                    key={channel.id}
                    onClick={() => handleSelectChannel(channel)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                      isSelected
                        ? 'bg-purple-950/40 border-purple-500/60 shadow-lg shadow-purple-950/40'
                        : 'bg-slate-900/80 hover:bg-slate-800/90 border-white/5'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center text-xl shrink-0 border border-white/10">
                      {channel.logo}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-display font-semibold text-white text-sm truncate">
                          {channel.name}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavoriteChannel(channel.id);
                          }}
                          className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
                          title="Favorite channel"
                        >
                          <Star className={`w-3.5 h-3.5 ${isFav ? 'text-amber-400 fill-amber-400' : ''}`} />
                        </button>
                      </div>

                      <div className="text-xs text-slate-300 truncate font-medium mt-0.5">
                        {channel.currentProgram}
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                        <span className="text-rose-400 font-bold uppercase">Live</span>
                        <span aria-hidden="true">·</span>
                        <span>{channel.currentProgramTime}</span>
                        <span aria-hidden="true">·</span>
                        <span>{channel.resolution}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* EPG Interactive Schedule (Right Column, 7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-purple-400" />
                <h3 className="font-display font-bold text-white text-base">
                  EPG Guide: {selectedChannel.name}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Today's Schedule</span>
            </div>

            {/* "On Now" Spotlight */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border border-purple-500/30 mb-5">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-purple-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  On Now ({selectedChannel.currentProgramTime})
                </span>
                <span className="text-slate-400">{selectedChannel.category}</span>
              </div>
              <h4 className="font-display text-lg font-bold text-white mb-1">
                {selectedChannel.currentProgram}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedChannel.currentProgramDesc}
              </p>
            </div>

            {/* "Coming Up" Timeline */}
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Coming Up Next
              </h4>

              <div className="space-y-3">
                {selectedChannel.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-3 rounded-xl bg-slate-950/50 border border-white/5 hover:border-white/20 transition-all"
                  >
                    <span className="text-xs font-bold text-purple-400 w-14 shrink-0 tabular-nums">
                      {item.time}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm text-slate-200 truncate">
                        {item.title}
                      </h5>
                      <span className="text-[11px] text-slate-500">
                        {item.genre} · {item.durationMinutes} min
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Play Trigger in EPG */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              HD Broadcast Stream · Low Latency Engine
            </span>
            <button
              onClick={() => startLivePlayback(selectedChannel)}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
            >
              Play Channel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
