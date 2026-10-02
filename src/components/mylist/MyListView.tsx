import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CONTENT } from '../../data/mockContent';
import { ContentCard } from '../common/ContentCard';
import { Bookmark, Film, Tv, Play } from 'lucide-react';

export const MyListView: React.FC = () => {
  const { myList, setActivePage, openPlayer } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'series' | 'live'>('all');

  const items = MOCK_CONTENT.filter((c) => myList.includes(c.id));
  const filtered = items.filter((c) => {
    if (filterType === 'all') return true;
    return c.type === filterType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Bookmark className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            <span>My List</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-600/30 text-purple-300 border border-purple-500/40">
              {items.length} Titles
            </span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Personal watchlist curated across all your devices
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center p-1 bg-slate-900 rounded-xl border border-white/10 self-start sm:self-auto">
          {[
            { id: 'all', label: 'All Titles' },
            { id: 'series', label: 'Series' },
            { id: 'live', label: 'Live TV' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterType === tab.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or Empty */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="font-display text-xl font-bold text-white mb-2">
            No items in this section
          </h3>
          <p className="text-slate-400 text-sm mb-6">
            Browse Onegai Aipri and Channel 0225 TV to add titles to your personal collection.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setActivePage('series')}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/30"
            >
              Explore Onegai Aipri
            </button>
            <button
              onClick={() => setActivePage('live')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-white/10 transition-all"
            >
              Channel 0225 TV Live
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {filtered.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
