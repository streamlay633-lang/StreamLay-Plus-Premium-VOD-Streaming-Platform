import React, { useState, useMemo } from 'react';
import { MOCK_CONTENT, GENRES } from '../../data/mockContent';
import { HeroBanner } from '../common/HeroBanner';
import { ContentCarousel } from '../common/ContentCarousel';
import { ContentCard } from '../common/ContentCard';
import { Film, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';

export const MoviesView: React.FC = () => {
  const [activeGenre, setActiveGenre] = useState<string>('All Genres');
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');
  const [viewMode, setViewMode] = useState<'carousels' | 'grid'>('carousels');

  const allMovies = useMemo(() => {
    return MOCK_CONTENT.filter((c) => c.type === 'movie');
  }, []);

  const featuredMovie = allMovies[0];

  const filteredMovies = useMemo(() => {
    let list = [...allMovies];
    if (activeGenre !== 'All Genres') {
      list = list.filter((m) => m.genres.includes(activeGenre));
    }
    list.sort((a, b) => {
      if (sortBy === 'rating') return b.score - a.score;
      if (sortBy === 'year') return b.year - a.year;
      return a.title.localeCompare(b.title);
    });
    return list;
  }, [allMovies, activeGenre, sortBy]);

  const trendingMovies = allMovies.filter((m) => m.trending);
  const popularMovies = allMovies.filter((m) => m.isPopular || m.score >= 8.5);
  const newReleases = allMovies.filter((m) => m.isNew || m.year === 2026);
  const topRated = [...allMovies].sort((a, b) => b.score - a.score);

  // Genre specific slices
  const sciFiMovies = allMovies.filter((m) => m.genres.includes('Sci-Fi'));
  const actionMovies = allMovies.filter((m) => m.genres.includes('Action'));
  const dramaMovies = allMovies.filter((m) => m.genres.includes('Drama'));
  const thrillerMovies = allMovies.filter((m) => m.genres.includes('Thriller'));

  return (
    <div className="pb-28 pt-0">
      {/* Featured Movie Hero */}
      <HeroBanner item={featuredMovie} featuredCategory="Featured Movie" />

      {/* Filter and View Mode Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-30 mb-8">
        <div className="p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {['All Genres', 'Action', 'Sci-Fi', 'Thriller', 'Drama', 'Comedy', 'Horror', 'Documentary'].map((g) => (
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
              <Film className="w-5 h-5 text-purple-400" />
              {activeGenre === 'All Genres' ? 'All Feature Films' : `${activeGenre} Movies`}
              <span className="text-xs text-slate-500 font-sans tabular-nums font-normal">
                ({filteredMovies.length})
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredMovies.map((movie) => (
              <ContentCard key={movie.id} item={movie} />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <ContentCarousel title="Trending Movies" subtitle="Current cinema sensations" items={trendingMovies} />
          <ContentCarousel title="Popular Movies" subtitle="Most watched blockbusters" items={popularMovies} />
          <ContentCarousel title="New Releases" subtitle="2026 festival and theatrical releases" items={newReleases} />
          <ContentCarousel title="Top Rated Cinema" subtitle="Highest IMDb critical acclaim" items={topRated} />
          <ContentCarousel title="Action & High Octane" items={actionMovies} />
          <ContentCarousel title="Sci-Fi & Cyberpunk Visions" items={sciFiMovies} />
          <ContentCarousel title="Thrilling Mysteries" items={thrillerMovies} />
          <ContentCarousel title="Dramatic Masterpieces" items={dramaMovies} />
        </div>
      )}
    </div>
  );
};
