import React from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CONTENT } from '../../data/mockContent';
import { Film, Play, Tv, ArrowRight, ArrowLeft } from 'lucide-react';

export const MoviesView: React.FC = () => {
  const { setActivePage, openPlayer, isRtl, t } = useApp();

  const onegaiAipri = MOCK_CONTENT.find((c) => c.id === 'onegai-aipri');
  const BackIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-28">
      <div className="max-w-md w-full text-center p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-purple-600/20">
          <Film className="w-8 h-8" />
        </div>

        <h1 className="font-display text-2xl font-extrabold text-white mb-2">
          {t('movies.noMovies')}
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {t('movies.noMoviesDesc')}
        </p>

        <div className="space-y-3">
          {onegaiAipri && (
            <button
              onClick={() => openPlayer(onegaiAipri.id)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-white text-sm bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/30 transition-all active:scale-95"
            >
              <Play className={`w-4 h-4 fill-white ${isRtl ? 'mr-0.5' : 'ml-0.5'}`} />
              <span>{t('movies.watchAipri')}</span>
            </button>
          )}

          <button
            onClick={() => setActivePage('live')}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-slate-200 text-sm bg-slate-800 hover:bg-slate-700 border border-white/10 transition-all active:scale-95"
          >
            <Tv className="w-4 h-4 text-rose-400" />
            <span>{t('movies.tuneChannel0225')}</span>
          </button>

          <button
            onClick={() => setActivePage('home')}
            className="w-full text-xs text-slate-400 hover:text-white pt-2 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>{t('action.returnHome')}</span>
            <BackIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
