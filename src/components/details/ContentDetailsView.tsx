import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CONTENT } from '../../data/mockContent';
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
  Volume2,
  Sparkles,
  Layers
} from 'lucide-react';

export const ContentDetailsView: React.FC = () => {
  const {
    selectedContent,
    openPlayer,
    toggleMyList,
    isInMyList,
    setActivePage,
    addToast
  } = useApp();

  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedContent) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl font-bold text-white mb-2">No title selected</h2>
        <button
          onClick={() => setActivePage('home')}
          className="px-4 py-2 rounded-xl bg-purple-600 text-white font-medium text-sm"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const inWatchlist = isInMyList(selectedContent.id);
  const isSeries = selectedContent.type === 'series';

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
    addToast(`Link to "${selectedContent.title}" copied to clipboard!`, 'success');
    setTimeout(() => setCopiedLink(false), 2000);
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-[#07090e]/80 to-transparent w-full md:w-3/4" />
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#07090e]/80 to-transparent pointer-events-none" />

        {/* Back Navigation Button */}
        <div className="absolute top-20 left-4 sm:left-8 z-30">
          <button
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/15 text-xs font-semibold backdrop-blur-md transition-all active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Browse</span>
          </button>
        </div>

        {/* Hero Title & Core Quick Actions inside Backdrop */}
        <div className="absolute bottom-6 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Tag label */}
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
              <span>{isSeries ? 'StreamLay Original Series' : 'StreamLay Feature Film'}</span>
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
              <span>{selectedContent.year}</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-white text-xs border border-white/20">
                {selectedContent.rating}
              </span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>
                {selectedContent.type === 'movie'
                  ? selectedContent.duration
                  : `${selectedContent.seasonsCount || 1} Season${(selectedContent.seasonsCount || 1) > 1 ? 's' : ''}`}
              </span>
              {selectedContent.quality.map((q) => (
                <span key={q} className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-purple-900/40 text-purple-300 text-[11px] font-semibold border border-purple-500/30">
                  {q}
                </span>
              ))}
            </div>

            {/* CTA action bar */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => openPlayer(selectedContent.id)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Play Now</span>
              </button>

              <button
                onClick={() => toggleMyList(selectedContent.id)}
                className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border backdrop-blur-md text-sm font-semibold transition-all hover:scale-105 active:scale-95 ${
                  inWatchlist
                    ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                    : 'bg-black/60 border-white/20 text-slate-200 hover:border-white hover:text-white'
                }`}
              >
                {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{inWatchlist ? 'In My List' : 'Add to My List'}</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 text-slate-300 hover:text-white text-sm font-semibold transition-all active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedLink ? 'Copied!' : 'Share'}</span>
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
                <span className="text-slate-400 block mb-0.5">Genres</span>
                <span className="font-semibold text-white">{selectedContent.genres.join(', ')}</span>
              </div>
              <div className="border-t border-white/5 pt-2.5">
                <span className="text-slate-400 block mb-0.5">Director</span>
                <span className="font-semibold text-white">{selectedContent.director}</span>
              </div>
              <div className="border-t border-white/5 pt-2.5">
                <span className="text-slate-400 block mb-0.5">Starring Cast</span>
                <span className="font-semibold text-white">{selectedContent.cast.join(', ')}</span>
              </div>
              <div className="border-t border-white/5 pt-2.5">
                <span className="text-slate-400 block mb-0.5">Audio & Subtitles</span>
                <span className="font-semibold text-white">{selectedContent.language} · Dolby Atmos 5.1</span>
              </div>
              <div className="border-t border-white/5 pt-2.5 flex items-center justify-between">
                <span className="text-slate-400">Stream Quality</span>
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
              <h3 className="font-display text-lg font-bold text-white mb-2">Synopsis</h3>
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
                    Episodes
                  </h3>

                  {/* Season Selector */}
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-400 font-medium">Season:</label>
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
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-all">
                            <div className="w-9 h-9 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <Play className="w-4 h-4 fill-white ml-0.5" />
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
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {ep.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* You May Also Like Section */}
            <div className="mt-10">
              <ContentCarousel
                title="You May Also Like"
                subtitle="Similar high-rated titles in this genre"
                items={similarItems}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
