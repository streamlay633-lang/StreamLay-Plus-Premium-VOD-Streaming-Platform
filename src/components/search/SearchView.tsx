import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CONTENT, MOCK_CHANNELS, GENRES } from '../../data/mockContent';
import { getLocalizedContent } from '../../i18n/translations';
import { ContentCard } from '../common/ContentCard';
import { ContentItem, LiveChannel } from '../../types';
import { Search, X, Filter, Tv, Film, Sparkles, SlidersHorizontal } from 'lucide-react';

export const SearchView: React.FC = () => {
  const { searchQuery, setSearchQuery, openDetails, startLivePlayback, isFavoriteChannel, toggleFavoriteChannel, language, isRtl, t } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'movie' | 'series' | 'live'>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('All Genres');
  const [selectedRating, setSelectedRating] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Quick suggestions
  const suggestions = ['Onegai Aipri', 'Channel 0225 TV', 'Anime', 'Idol', 'Live TV', 'Entertainment'];

  // Simulate smooth reactive search state
  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, activeTab, selectedGenre, selectedRating, selectedYear, sortBy]);

  const filteredItems = useMemo(() => {
    let list: ContentItem[] = MOCK_CONTENT.map((c) => getLocalizedContent(c, language));

    // Filter by Tab
    if (activeTab === 'movie') {
      list = list.filter((item) => item.type === 'movie');
    } else if (activeTab === 'series') {
      list = list.filter((item) => item.type === 'series');
    }

    // Filter by Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.genres.some((g) => g.toLowerCase().includes(q)) ||
          item.cast.some((c) => c.toLowerCase().includes(q)) ||
          item.director.toLowerCase().includes(q)
      );
    }

    // Filter by Genre
    if (selectedGenre !== 'All Genres') {
      list = list.filter((item) => item.genres.includes(selectedGenre));
    }

    // Filter by Rating
    if (selectedRating !== 'All') {
      list = list.filter((item) => item.rating.includes(selectedRating));
    }

    // Filter by Year
    if (selectedYear !== 'All') {
      list = list.filter((item) => item.year.toString() === selectedYear);
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === 'rating') return b.score - a.score;
      if (sortBy === 'year') return b.year - a.year;
      return a.title.localeCompare(b.title);
    });

    return list;
  }, [searchQuery, activeTab, selectedGenre, selectedRating, selectedYear, sortBy, language]);

  const filteredChannels = useMemo(() => {
    if (activeTab === 'movie' || activeTab === 'series') return [];
    let channels: LiveChannel[] = [...MOCK_CHANNELS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      channels = channels.filter(
        (ch) =>
          ch.name.toLowerCase().includes(q) ||
          ch.category.toLowerCase().includes(q) ||
          ch.currentProgram.toLowerCase().includes(q)
      );
    }
    return channels;
  }, [searchQuery, activeTab]);

  const totalResults =
    activeTab === 'live'
      ? filteredChannels.length
      : filteredItems.length + (activeTab === 'all' ? filteredChannels.length : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 min-h-screen">
      {/* Top Search Input Box */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="relative">
          <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-slate-400`}>
            <Search className="w-5 h-5 text-purple-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className={`w-full ${isRtl ? 'pr-12 pl-12' : 'pl-12 pr-12'} py-4 rounded-2xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 text-base sm:text-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 shadow-2xl transition-all`}
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={`absolute inset-y-0 ${isRtl ? 'left-0 pl-4' : 'right-0 pr-4'} flex items-center text-slate-400 hover:text-white transition-colors`}
              aria-label={t('action.clear') || 'Clear search'}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Tags */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar pb-1 text-xs">
          <span className="text-slate-400 flex items-center gap-1 shrink-0 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            {t('search.trending')}:
          </span>
          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => setSearchQuery(item)}
              className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-purple-900/40 text-slate-300 hover:text-white border border-white/10 hover:border-purple-500/40 transition-all shrink-0"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        {/* Filter Tabs */}
        <div className="flex items-center p-1 bg-slate-900/80 rounded-xl border border-white/10">
          {(
            [
              { id: 'all', label: t('search.allResults') },
              { id: 'series', label: t('search.series') },
              { id: 'live', label: t('search.liveTv') },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Toggle Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
              showFilters
                ? 'bg-purple-600/20 border-purple-500/50 text-purple-300'
                : 'bg-slate-900/80 border-white/10 text-slate-300 hover:border-white/30'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{t('search.filters')}</span>
          </button>
        </div>
      </div>

      {/* Expandable Advanced Filters */}
      {showFilters && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-900/60 border border-white/10 mb-6 animate-fade-in text-xs">
          <div>
            <label className="block text-slate-400 mb-1.5 font-medium">{t('search.genre')}</label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full bg-slate-800 text-slate-200 border border-white/10 rounded-lg p-2 focus:outline-none focus:border-purple-500"
            >
              <option value="All Genres">{t('search.allGenres')}</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1.5 font-medium">{t('search.rating')}</label>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="w-full bg-slate-800 text-slate-200 border border-white/10 rounded-lg p-2 focus:outline-none focus:border-purple-500"
            >
              <option value="All">{t('search.allRatings')}</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="TV-14">TV-14</option>
              <option value="TV-MA">TV-MA</option>
              <option value="R">R</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1.5 font-medium">{t('search.year')}</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-slate-800 text-slate-200 border border-white/10 rounded-lg p-2 focus:outline-none focus:border-purple-500"
            >
              <option value="All">{t('search.allYears')}</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1.5 font-medium">{t('search.sortBy')}</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'year' | 'title')}
              className="w-full bg-slate-800 text-slate-200 border border-white/10 rounded-lg p-2 focus:outline-none focus:border-purple-500"
            >
              <option value="rating">{t('search.topRated')}</option>
              <option value="year">{t('search.releaseYear')}</option>
              <option value="title">{t('search.titleAz')}</option>
            </select>
          </div>
        </div>
      )}

      {/* Results Count & Query text */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
        <span>
          {t('search.showingResults', { count: String(totalResults) })}{' '}
          {searchQuery && (
            <span>
              {t('search.forQuery')}{' '}"<span className="text-purple-300 font-semibold">{searchQuery}</span>"
            </span>
          )}
        </span>
        {(searchQuery || selectedGenre !== 'All Genres' || selectedRating !== 'All' || selectedYear !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedGenre('All Genres');
              setSelectedRating('All');
              setSelectedYear('All');
            }}
            className="text-purple-400 hover:text-purple-300 font-medium hover:underline"
          >
            {t('search.resetFilters')}
          </button>
        )}
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="animate-pulse flex flex-col gap-2">
              <div className="aspect-[2/3] bg-slate-800/80 rounded-xl" />
              <div className="h-4 bg-slate-800/80 rounded w-3/4" />
              <div className="h-3 bg-slate-800/60 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : totalResults === 0 ? (
        /* Empty State */
        <div className="py-20 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-display text-xl font-bold text-white mb-2">{t('search.noResults')}</h3>
          <p className="text-sm text-slate-400 mb-6">
            {t('search.noResultsDesc', { query: searchQuery })}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Onegai Aipri', 'Channel 0225 TV', 'Anime', 'Live TV'].map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs text-slate-300 hover:text-white hover:border-purple-500"
              >
                {t('action.searchFor', { term }) || `Search "${term}"`}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Results Grid */
        <div className="space-y-10">
          {/* Live Channels section if matching */}
          {(activeTab === 'all' || activeTab === 'live') && filteredChannels.length > 0 && (
            <div>
              <h2 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Tv className="w-4 h-4 text-purple-400" />
                {t('search.liveChannels')} ({filteredChannels.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredChannels.map((channel) => (
                  <div
                    key={channel.id}
                    onClick={() => startLivePlayback(channel)}
                    className="p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-purple-500/50 hover:bg-slate-800/90 transition-all cursor-pointer group flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                      {channel.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-display font-semibold text-white text-sm truncate group-hover:text-purple-300">
                          {channel.name}
                        </h4>
                        <span className="px-1.5 py-0.5 rounded bg-rose-600/20 text-rose-400 text-[10px] font-bold border border-rose-500/30">
                          {t('details.liveChannelBadge')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 truncate mt-0.5">
                        {channel.currentProgram}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                        <span>{channel.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{channel.resolution}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Series Grid */}
          {activeTab !== 'live' && filteredItems.length > 0 && (
            <div>
              {activeTab === 'all' && filteredChannels.length > 0 && (
                <h2 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Film className="w-4 h-4 text-indigo-400" />
                  {t('search.series')} ({filteredItems.length})
                </h2>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5">
                {filteredItems.map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
