import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CONTENT, MOCK_CHANNELS } from '../../data/mockContent';
import { Episode, Season } from '../../types';
import { ContentCarousel } from '../common/ContentCarousel';
import {
  Play,
  Plus,
  Check,
  Share2,
  Star,
  Clock,
  Calendar,
  Film,
  Tv,
  ArrowLeft,
  ArrowRight,
  Volume2,
  Sparkles,
  Layers,
  Radio,
  ExternalLink,
  Signal
} from 'lucide-react';

export const ContentDetailsView: React.FC = () => {
  const {
    selectedContent,
    openPlayer,
    startPlayback,
    startLivePlayback,
    toggleMyList,
    isInMyList,
    setActivePage,
    addToast,
    isRtl,
    t
  } = useApp();

  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  if (!selectedContent) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl font-bold text-white mb-2">{t('details.noTitleSelected')}</h2>
        <button
          onClick={() => setActivePage('home')}
          className="px-4 py-2 rounded-xl bg-purple-600 text-white font-medium text-sm"
        >
          {t('action.returnHome')}
        </button>
      </div>
    );
  }

  const inWatchlist = isInMyList(selectedContent.id);
  const isSeries = selectedContent.type === 'series';
  const isLive = selectedContent.type === 'live' || selectedContent.id === 'channel-0225-tv';
  const liveChannel = MOCK_CHANNELS.find(
    (ch) => ch.id === selectedContent.id || ch.name.toLowerCase() === selectedContent.title.toLowerCase()
  );

  // Similar titles
  const similarItems = MOCK_CONTENT.filter(
    (c) =>
      c.id !== selectedContent.id &&
      (c.type === selectedContent.type || c.genres.some((g) => selectedContent.genres.includes(g)))
  ).slice(0, 6);

  const activeSeason = isSeries && selectedContent.seasons
    ? selectedContent.seasons.find((s) => s.seasonNumber === selectedSeasonNumber) || selectedContent.seasons[0]
    : null;

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    addToast(t('toast.linkCopied', { title: selectedContent.title }), 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePlayLiveOrVod = () => {
    if (liveChannel) {
      startLivePlayback(liveChannel);
    } else {
      openPlayer(selectedContent.id);
    }
  };

  return (
    <div className="min-h-screen pb-28 pt-0">
      {/* Cinematic Full-Width Backdrop Header */}
      <div className="relative w-full h-[65vh] min-h-[460px] max-h-[700px] overflow-hidden">
        <img
          src={selectedContent.backdropUrl}
          alt={selectedContent.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />

        {/* Cinematic Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/70 to-transparent" />
        <div
          className={`absolute inset-0 z-10 w-full md:w-3/4 ${
            isRtl
              ? 'bg-gradient-to-l from-[#07090e] via-[#07090e]/80 to-transparent'
              : 'bg-gradient-to-r from-[#07090e] via-[#07090e]/80 to-transparent'
          }`}
        />
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#07090e]/80 to-transparent pointer-events-none" />

        {/* Back Navigation Button */}
        <div className={`absolute top-20 z-30 flex items-center gap-3 ${isRtl ? 'right-4 sm:right-8' : 'left-4 sm:left-8'}`}>
          <button
            onClick={() => setActivePage(isLive ? 'live' : 'home')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/15 text-xs font-semibold backdrop-blur-md transition-all active:scale-95"
          >
            <BackIcon className="w-3.5 h-3.5" />
            <span>{isLive ? t('action.backToLive') : t('action.backToBrowse')}</span>
          </button>
        </div>

        {/* Hero Title & Core Quick Actions inside Backdrop */}
        <div className="absolute bottom-6 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Tag label */}
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
              {isLive ? (
                <span className="flex items-center gap-2 text-rose-400 font-extrabold bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  {t('details.liveChannelBadge')}
                </span>
              ) : isSeries ? (
                <span>{t('details.originalSeries')}</span>
              ) : (
                <span>{t('details.featureFilm')}</span>
              )}
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-3">
              {selectedContent.title}
            </h1>

            {/* Clean unboxed metadata with separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium mb-4">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {selectedContent.score.toFixed(1)} IMDb
              </span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>{selectedContent.releaseDate || selectedContent.year}</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-white text-xs border border-white/20">
                {selectedContent.rating}
              </span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>
                {isLive ? (
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">24/7 {t('label.live')}</span>
                ) : selectedContent.type === 'movie' ? (
                  selectedContent.duration
                ) : (
                  `${selectedContent.seasonsCount || 1} ${(selectedContent.seasonsCount || 1) > 1 ? t('label.seasons') : t('label.seasonSingular')}`
                )}
              </span>
              {selectedContent.subtitles && selectedContent.subtitles.length > 0 && (
                <>
                  <span aria-hidden="true" className="text-slate-500">·</span>
                  <span className="text-purple-300 font-medium">Sub: {selectedContent.subtitles.join(', ')}</span>
                </>
              )}
              {selectedContent.serverName && (
                <>
                  <span aria-hidden="true" className="text-slate-500">·</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {selectedContent.serverName}
                  </span>
                </>
              )}
              {selectedContent.quality.map((q) => (
                <span key={q} className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-purple-900/40 text-purple-300 text-[11px] font-semibold border border-purple-500/30">
                  {q}
                </span>
              ))}
            </div>

            {/* CTA action bar */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handlePlayLiveOrVod}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all"
              >
                <Play className={`w-4 h-4 fill-white ${isRtl ? 'mr-0.5' : 'ml-0.5'}`} />
                <span>{isLive ? t('action.watchLive') : t('action.playNow')}</span>
              </button>

              {/* Direct Server Selector if multiple servers exist */}
              {selectedContent.servers && selectedContent.servers.length > 1 && (
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md">
                  <span className="text-[11px] text-slate-400 font-semibold px-2 hidden sm:inline">{t('label.server')}:</span>
                  {selectedContent.servers.map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => startPlayback(selectedContent, undefined, srv)}
                      className="px-3 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-purple-600 hover:text-white text-slate-200 transition-all active:scale-95 flex items-center gap-1.5"
                      title={`Play on ${srv.name}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{srv.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {isLive && (
                <button
                  onClick={() => setActivePage('live')}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 text-slate-200 hover:text-white text-sm font-semibold transition-all active:scale-95 backdrop-blur-md"
                >
                  <Tv className="w-4 h-4 text-purple-400" />
                  <span>{t('nav.liveTv')}</span>
                </button>
              )}

              <button
                onClick={() => toggleMyList(selectedContent.id)}
                className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border backdrop-blur-md text-sm font-semibold transition-all hover:scale-105 active:scale-95 ${
                  inWatchlist
                    ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                    : 'bg-black/60 border-white/20 text-slate-200 hover:border-white hover:text-white'
                }`}
              >
                {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{inWatchlist ? t('action.inMyList') : t('action.addToMyList')}</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 text-slate-300 hover:text-white text-sm font-semibold transition-all active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedLink ? t('action.copied') : t('action.share')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Poster & Technical Specs (4 cols) */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-w-[280px] mx-auto lg:mx-0 mb-6">
              <img
                src={selectedContent.posterUrl}
                alt={selectedContent.title}
                referrerPolicy="no-referrer"
                className="w-full aspect-[2/3] object-cover"
              />
            </div>

            {/* Spec Sheet */}
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-3.5 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block mb-0.5">{t('label.genres')}</span>
                <span className="font-semibold text-white">
                  {selectedContent.genres.map((g) => t(`genre.${g}`) || g).join(', ')}
                </span>
              </div>
              {selectedContent.releaseDate && (
                <div className="border-t border-white/5 pt-2.5">
                  <span className="text-slate-400 block mb-0.5">{t('label.releaseDate')}</span>
                  <span className="font-semibold text-white">{selectedContent.releaseDate}</span>
                </div>
              )}
              <div className="border-t border-white/5 pt-2.5">
                <span className="text-slate-400 block mb-0.5">{t('label.ageRating')}</span>
                <span className="font-semibold text-white">{selectedContent.rating}</span>
              </div>
              <div className="border-t border-white/5 pt-2.5">
                <span className="text-slate-400 block mb-0.5">{t('label.directorStudio')}</span>
                <span className="font-semibold text-white">{selectedContent.director}</span>
              </div>
              <div className="border-t border-white/5 pt-2.5">
                <span className="text-slate-400 block mb-0.5">{t('label.starringCast')}</span>
                <span className="font-semibold text-white">{selectedContent.cast.join(', ')}</span>
              </div>
              <div className="border-t border-white/5 pt-2.5">
                <span className="text-slate-400 block mb-0.5">{t('label.audioSubtitles')}</span>
                <span className="font-semibold text-white">
                  {selectedContent.language}
                  {selectedContent.subtitles && selectedContent.subtitles.length > 0
                    ? ` · Sub: ${selectedContent.subtitles.join(', ')}`
                    : ' · Dolby Atmos 5.1'}
                </span>
              </div>
              {selectedContent.servers && selectedContent.servers.length > 0 ? (
                <div className="border-t border-white/5 pt-2.5">
                  <span className="text-slate-400 block mb-1">{t('label.streamingServers')}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedContent.servers.map((srv) => (
                      <span
                        key={srv.id}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-950/60 text-purple-300 font-semibold text-xs border border-purple-500/30"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{srv.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ) : selectedContent.serverName ? (
                <div className="border-t border-white/5 pt-2.5">
                  <span className="text-slate-400 block mb-0.5">{t('label.server')}</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-purple-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {selectedContent.serverName}
                  </span>
                </div>
              ) : null}
              <div className="border-t border-white/5 pt-2.5 flex items-center justify-between">
                <span className="text-slate-400">{t('label.streamQuality')}</span>
                <div className="flex gap-1">
                  {selectedContent.quality.map((q) => (
                    <span key={q} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-purple-300 font-bold border border-white/10">
                      {q}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Synopsis & Episode Browser (8 cols) */}
          <div className="lg:col-span-8">
            <div className="mb-8">
              <h3 className="font-display text-lg font-bold text-white mb-2">{t('details.synopsis')}</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {selectedContent.longDescription || selectedContent.description}
              </p>
            </div>

            {/* Series Seasons & Episode Guide */}
            {isSeries && selectedContent.seasons && (
              <div className="mb-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
                  <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-400" />
                    {t('details.episodes')}
                  </h3>

                  {/* Season Selector */}
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-400 font-medium">{t('label.season')}:</label>
                    <select
                      value={selectedSeasonNumber}
                      onChange={(e) => setSelectedSeasonNumber(Number(e.target.value))}
                      className="bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/15 focus:outline-none focus:border-purple-500"
                    >
                      {selectedContent.seasons.map((s) => (
                        <option key={s.seasonNumber} value={s.seasonNumber}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Episode List Cards */}
                {activeSeason && (
                  <div className="space-y-3">
                    {activeSeason.episodes.map((ep) => (
                      <div
                        key={ep.id}
                        onClick={() => openPlayer(selectedContent.id, ep.id)}
                        className="group p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-4"
                      >
                        {/* Thumbnail with hover play overlay */}
                        <div className="relative w-full sm:w-44 aspect-video rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-white/10">
                          <img
                            src={ep.thumbnailUrl}
                            alt={ep.title}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const match = ep.id.match(/onegai-aipri-s1-e(\d+)/);
                              if (match && !e.currentTarget.src.includes(`onegai_aipri_ep${match[1]}.jpg`)) {
                                e.currentTarget.src = `/assets/images/onegai_aipri_ep${match[1]}.jpg`;
                              } else if (selectedContent?.backdropUrl) {
                                e.currentTarget.src = selectedContent.backdropUrl;
                              }
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-all">
                            <div className="w-9 h-9 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <Play className={`w-4 h-4 fill-white ${isRtl ? 'mr-0.5' : 'ml-0.5'}`} />
                            </div>
                          </div>
                          {ep.progress !== undefined && ep.progress > 0 && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/60">
                              <div
                                className="h-full bg-purple-500"
                                style={{ width: `${ep.progress}%` }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Episode Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="font-display font-semibold text-white text-sm group-hover:text-purple-300 transition-colors">
                              {ep.title}
                            </h4>
                            <span className="text-xs text-slate-400 shrink-0 tabular-nums">
                              {ep.duration}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-2">
                            {ep.description}
                          </p>

                          {/* Quick Server Switchers for Episode */}
                          {ep.servers && ep.servers.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap pt-1" onClick={(e) => e.stopPropagation()}>
                              <span className="text-[10px] text-slate-500 font-semibold uppercase">{t('details.playOn')}</span>
                              {ep.servers.map((srv) => (
                                <button
                                  key={srv.id}
                                  onClick={() => startPlayback(selectedContent, ep, srv)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-purple-600 text-slate-300 hover:text-white text-[11px] font-semibold border border-white/10 hover:border-purple-500 transition-all active:scale-95 shadow-sm"
                                  title={`Play Episode on ${srv.name}`}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                  <span>{srv.name}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Live TV Channel Guide & Broadcast Lineup for Live Channels */}
            {isLive && (
              <div className="mb-10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                    <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
                    {t('details.liveSchedule')}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">{t('details.updatedRealTime')}</span>
                </div>

                {/* On Air Now Banner */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-slate-900 border border-purple-500/40 shadow-xl relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold tracking-wider uppercase animate-pulse">
                          {t('label.onAirNow')}
                        </span>
                        <span className="text-xs text-purple-300 font-semibold">
                          {liveChannel?.currentProgramTime || 'Live 24/7'}
                        </span>
                      </div>
                      <h4 className="font-display text-lg sm:text-xl font-bold text-white mb-1">
                        {liveChannel?.currentProgram || selectedContent.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                        {liveChannel?.currentProgramDesc || selectedContent.description}
                      </p>
                    </div>

                    <button
                      onClick={handlePlayLiveOrVod}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all shrink-0"
                    >
                      <Play className={`w-4 h-4 fill-white ${isRtl ? 'mr-0.5' : 'ml-0.5'}`} />
                      <span>{t('action.watchLive')}</span>
                    </button>
                  </div>
                </div>

                {/* Program Slots */}
                {liveChannel?.schedule && liveChannel.schedule.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {t('live.broadcastTimeline')}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {liveChannel.schedule.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/15 transition-all"
                        >
                          <span className="text-xs font-bold text-purple-400 w-12 shrink-0 tabular-nums">
                            {item.time}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-xs sm:text-sm text-slate-200 truncate">
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
                )}

                {/* Live Feed Technical Specs Box */}
                <div className="p-4 rounded-xl bg-slate-900/40 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <Signal className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="text-slate-300">
                      {t('details.liveStatus')} <span className="text-emerald-400 font-bold">{t('label.online')}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <span>{t('label.protocol')}: <strong className="text-white">HLS (.m3u8)</strong></span>
                    <span>·</span>
                    <span>{t('label.format')}: <strong className="text-white">1080p FHD</strong></span>
                    <span>·</span>
                    <span>{t('label.latency')}: <strong className="text-white">{t('label.ultraLow')}</strong></span>
                  </div>
                </div>
              </div>
            )}

            {/* You May Also Like Section */}
            {similarItems.length > 0 && (
              <div className="mt-10">
                <ContentCarousel
                  title={t('details.youMayAlsoLike')}
                  subtitle={t('details.moreOnStreamLay')}
                  items={similarItems}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
