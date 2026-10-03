import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CONTENT } from '../../data/mockContent';
import { getLocalizedContent } from '../../i18n/translations';
import { HeroBanner } from '../common/HeroBanner';
import { ContentCarousel } from '../common/ContentCarousel';
import { ContentCard } from '../common/ContentCard';
import { Tv, SlidersHorizontal, Sparkles } from 'lucide-react';

export const SeriesView: React.FC = () => {
  const { language, isRtl, t } = useApp();
  const [activeGenre, setActiveGenre] = useState<string>('All Genres');
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');
  const [viewMode, setViewMode] = useState<'carousels' | 'grid'>('carousels');

  const allSeries = useMemo(() => {
    return MOCK_CONTENT.filter((c) => c.type === 'series');
  }, []);

  const rawFeaturedSeries = allSeries[0];
  const featuredSeries = rawFeaturedSeries ? getLocalizedContent(rawFeaturedSeries, language) : null;

  const filteredSeries = useMemo(() => {
    let list = [...allSeries];
    if (activeGenre !== 'All Genres') {
      list = list.filter((s) => s.genres.includes(activeGenre));
    }
    list.sort((a, b) => {
      if (sortBy === 'rating') return b.score - a.score;
      if (sortBy === 'year') return b.year - a.year;
      return a.title.localeCompare(b.title);
    });
    return list;
  }, [allSeries, activeGenre, sortBy]);

  const trendingSeries = allSeries.filter((s) => s.trending);
  const animeSeries = allSeries.filter((s) => s.genres.includes('Anime') || s.genres.includes('Idol') || s.genres.includes('Magical girl'));

  const genreOptions = [
    { id: 'All Genres', label: t('label.allGenres') },
    { id: 'Anime', label: t('genre.Anime') },
    { id: 'Magical girl', label: t('genre.Magical girl') },
    { id: 'Idol', label: t('genre.Idol') },
    { id: 'Science fiction', label: t('genre.Science fiction') },
  ];

  return (
    <div className="pb-28 pt-0">
      {/* Featured Series Hero */}
      {featuredSeries && (
        <HeroBanner item={featuredSeries} featuredCategory={t('series.featuredHeroCategory')} />
      )}

      {/* Filter and View Mode Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-30 mb-8">
        <div className="p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {genreOptions.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  setActiveGenre(g.id);
                  if (g.id !== 'All Genres') setViewMode('grid');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeGenre === g.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{t('label.sortBy')}:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-800 text-slate-200 border border-white/10 rounded-md px-2 py-1 focus:outline-none text-xs"
              >
                <option value="rating">{t('label.topRated')}</option>
                <option value="year">{t('label.newest')}</option>
                <option value="title">{t('label.titleAZ')}</option>
              </select>
            </div>

            <div className="flex items-center p-0.5 rounded-lg bg-slate-800 border border-white/10 text-xs">
              <button
                onClick={() => setViewMode('carousels')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'carousels' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t('label.curated')}
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'grid' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t('label.grid')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Display: Carousels or Grid */}
      {viewMode === 'grid' || activeGenre !== 'All Genres' ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <Tv className="w-5 h-5 text-purple-400" />
              {activeGenre === 'All Genres'
                ? t('series.allSeries')
                : `${t(`genre.${activeGenre}`) || activeGenre} ${t('series.seriesLabel')}`}
              <span className="text-xs text-slate-500 font-sans tabular-nums font-normal">
                ({filteredSeries.length})
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredSeries.map((series) => (
              <ContentCard key={series.id} item={series} />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {trendingSeries.length > 0 && (
            <ContentCarousel
              title={t('series.trendingTitle')}
              subtitle={t('series.trendingSubtitle')}
              items={trendingSeries}
            />
          )}
          {animeSeries.length > 0 && (
            <ContentCarousel
              title={t('series.animeTitle')}
              subtitle={t('series.animeSubtitle')}
              items={animeSeries}
            />
          )}
        </div>
      )}
    </div>
  );
};
