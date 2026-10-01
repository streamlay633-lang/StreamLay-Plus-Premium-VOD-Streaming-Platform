import React, { useState, useMemo } from 'react';
import { MOCK_CONTENT } from '../../data/mockContent';
import { HeroBanner } from '../common/HeroBanner';
import { ContentCarousel } from '../common/ContentCarousel';
import { ContentCard } from '../common/ContentCard';
import { Tv, SlidersHorizontal, Sparkles } from 'lucide-react';

export const SeriesView: React.FC = () => {
  const [activeGenre, setActiveGenre] = useState<string>('All Genres');
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');
  const [viewMode, setViewMode] = useState<'carousels' | 'grid'>('carousels');

  const allSeries = useMemo(() => {
    return MOCK_CONTENT.filter((c) => c.type === 'series');
  }, []);

  const featuredSeries = allSeries[0] || MOCK_CONTENT[2];

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
  const popularSeries = allSeries.filter((s) => s.isPopular || s.score >= 8.8);
  const newSeries = allSeries.filter((s) => s.isNew || s.year === 2026);

  // Genre slices
  const sciFiSeries = allSeries.filter((s) => s.genres.includes('Sci-Fi'));
  const dramaSeries = allSeries.filter((s) => s.genres.includes('Drama'));
  const actionSeries = allSeries.filter((s) => s.genres.includes('Action'));
  const crimeSeries = allSeries.filter((s) => s.genres.includes('Crime'));

  return (
    <div className="pb-28 pt-0">
      {/* Featured Series Hero */}
      <HeroBanner item={featuredSeries} featuredCategory="StreamLay Original Series" />

      {/* Filter and View Mode Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-30 mb-8">
        <div className="p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {['All Genres', 'Sci-Fi', 'Drama', 'Action', 'Crime', 'Animation', 'Mystery'].map((g) => (
              <button
                key={g}
                onClick={() => {
                  setActiveGenre(g);
                  if (g !== 'All Genres') setViewMode('grid');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeGenre === g
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-800 text-slate-200 border border-white/10 rounded-md px-2 py-1 focus:outline-none"
              >
                <option value="rating">Top Rated</option>
                <option value="year">Newest</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>

            <div className="flex items-center p-0.5 rounded-lg bg-slate-800 border border-white/10 text-xs">
              <button
                onClick={() => setViewMode('carousels')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'carousels' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Curated
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'grid' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Grid
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
              {activeGenre === 'All Genres' ? 'All Television Series' : `${activeGenre} Series`}
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
          <ContentCarousel title="Trending Series" subtitle="Most watched episodes this week" items={trendingSeries} />
          <ContentCarousel title="Popular Series" subtitle="Long-running critical sensations" items={popularSeries} />
          <ContentCarousel title="New Series & Premieres" subtitle="Newly released seasons" items={newSeries} />
          <ContentCarousel title="Sci-Fi & Cosmic Sagas" items={sciFiSeries} />
          <ContentCarousel title="Intense Dramas" items={dramaSeries} />
          <ContentCarousel title="Adrenaline & Action" items={actionSeries} />
          <ContentCarousel title="Underworld & Crime" items={crimeSeries} />
        </div>
      )}
    </div>
  );
};
