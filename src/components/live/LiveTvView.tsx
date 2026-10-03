import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CHANNELS } from '../../data/mockContent';
import { LiveChannel } from '../../types';
import { Play, Star, Maximize, Volume2, VolumeX, Radio, Clock, Calendar, Check, Users, Info } from 'lucide-react';
import Hls from 'hls.js';

export const LiveTvView: React.FC = () => {
  const { startLivePlayback, favoriteChannels, toggleFavoriteChannel, isFavoriteChannel, openDetails, isRtl, t } = useApp();
  const [selectedChannel, setSelectedChannel] = useState<LiveChannel>(MOCK_CHANNELS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const categories = [
    { id: 'All', label: t('cat.All') },
    { id: 'Entertainment', label: t('cat.Entertainment') },
    { id: 'Music', label: t('cat.Music') },
    { id: 'Favorites', label: `★ ${t('cat.Favorites')} (${favoriteChannels.length})` }
  ];

  const filteredChannels = MOCK_CHANNELS.filter((ch) => {
    if (activeCategory === 'Favorites') return isFavoriteChannel(ch.id);
    if (activeCategory === 'All') return true;
    return ch.category === activeCategory;
  });

  // HLS stream playback support for preview video
  useEffect(() => {
    let hls: Hls | null = null;
    const video = videoRef.current;
    if (!video) return;

    if (selectedChannel.streamUrl.includes('.m3u8')) {
      if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 30
        });
        hls.loadSource(selectedChannel.streamUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {});
        });
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls?.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls?.recoverMediaError();
                break;
              default:
                hls?.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = selectedChannel.streamUrl;
        video.play().catch(() => {});
      }
    } else {
      video.src = selectedChannel.streamUrl;
      video.play().catch(() => {});
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [selectedChannel.streamUrl]);

  const handleSelectChannel = (ch: LiveChannel) => {
    setSelectedChannel(ch);
  };

  const isCurrentFav = isFavoriteChannel(selectedChannel.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28">
      {/* Page Title & LIVE status */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>{t('live.pageTitle')}</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-600/20 border border-rose-500/40 text-rose-400 text-xs font-bold tracking-wider animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              {t('label.live')}
            </span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {t('live.subtitle')}
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <Radio className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>{t('live.feedStatus')}</span>
        </div>
      </div>

      {/* Featured Channel Video Preview Player Area */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl mb-8 group">
        <div className="relative aspect-video max-h-[500px] w-full bg-black">
          {/* Active video element for channel preview */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            loop
            muted={isMuted}
            poster={selectedChannel.backdropUrl || selectedChannel.posterUrl}
            className="w-full h-full object-cover"
          />

          {/* Scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-black/20 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

          {/* Top Channel Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15">
              {selectedChannel.posterUrl ? (
                <img
                  src={selectedChannel.posterUrl}
                  alt={selectedChannel.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-lg object-cover"
                />
              ) : (
                <span className="text-xl">{selectedChannel.logo}</span>
              )}
              <div>
                <span className="text-xs font-bold text-white block leading-tight">
                  {selectedChannel.name}
                </span>
                <span className="text-[10px] text-slate-400 tabular-nums">CH {selectedChannel.number}</span>
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
                <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px] tracking-wide animate-pulse">
                  {t('label.onAir')}
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
                title={isCurrentFav ? t('action.removeFromMyList') : t('action.addToMyList')}
              >
                <Star className={`w-4 h-4 ${isCurrentFav ? 'fill-amber-400' : ''}`} />
              </button>

              <button
                onClick={() => openDetails(selectedChannel.id)}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/15 transition-all active:scale-95"
                title={t('action.channelDetails')}
              >
                <Info className="w-4 h-4 text-purple-300" />
                <span>{t('action.details')}</span>
              </button>

              <button
                onClick={() => startLivePlayback(selectedChannel)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all"
              >
                <Play className={`w-4 h-4 fill-white ${isRtl ? 'mr-0.5' : 'ml-0.5'}`} />
                <span>{t('action.watchLive')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Channels list on left + Interactive EPG Guide on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Channel Cards (Left Column, 5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
            {t('live.availableChannels')} ({filteredChannels.length})
          </h3>

          <div className="space-y-2.5 max-h-[550px] overflow-y-auto pr-1">
            {filteredChannels.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/50 rounded-xl border border-white/5">
                <p className="text-slate-400 text-sm">{t('live.noFavorites')}</p>
                <p className="text-xs text-slate-500 mt-1">{t('live.noFavoritesDesc')}</p>
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
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-xl shrink-0 border border-white/10 overflow-hidden relative">
                      {channel.posterUrl ? (
                        <img
                          src={channel.posterUrl}
                          alt={channel.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{channel.logo}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-display font-semibold text-white text-sm truncate">
                          {channel.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openDetails(channel.id);
                            }}
                            className="p-1 text-slate-400 hover:text-purple-300 transition-colors"
                            title={t('action.channelDetails')}
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
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
                      </div>

                      <div className="text-xs text-slate-300 truncate font-medium mt-0.5">
                        {channel.currentProgram}
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                        <span className="text-rose-400 font-bold uppercase">{t('label.live')}</span>
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
                  {t('live.epgGuide')}: {selectedChannel.name}
                </h3>
              </div>
              <button
                onClick={() => openDetails(selectedChannel.id)}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
              >
                <span>{t('action.channelDetails')}</span>
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* "On Now" Spotlight */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border border-purple-500/30 mb-5">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-purple-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  {t('live.onNow')} ({selectedChannel.currentProgramTime})
                </span>
                <span className="text-slate-400">{t(`cat.${selectedChannel.category}`) || selectedChannel.category}</span>
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
                {t('live.comingUpNext')}
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
                        {t(`genre.${item.genre}`) || item.genre} · {item.durationMinutes} {t('label.min')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Play Trigger in EPG */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              {t('live.hdNote')}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openDetails(selectedChannel.id)}
                className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Info className="w-3.5 h-3.5 text-purple-300" />
                <span>{t('action.channelDetails')}</span>
              </button>
              <button
                onClick={() => startLivePlayback(selectedChannel)}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              >
                <Play className={`w-3.5 h-3.5 fill-white ${isRtl ? 'mr-0.5' : 'ml-0.5'}`} />
                <span>{t('action.playChannel')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
