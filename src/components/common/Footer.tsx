import React from 'react';
import { useApp } from '../../context/AppContext';
import { Play } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, isRtl, t } = useApp();

  return (
    <footer className="border-t border-white/5 bg-[#05070a] text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center">
            <Play className={`w-3 h-3 text-white fill-white ${isRtl ? 'mr-0.5' : 'ml-0.5'}`} />
          </div>
          <span className="font-display font-bold text-white text-base tracking-tight">
            StreamLay<span className="text-purple-400 font-extrabold">+</span>
          </span>
          <span className="text-slate-500 text-xs mx-2">{t('footer.copyright')}</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <button
            onClick={() => setActivePage('home')}
            className="hover:text-white transition-colors"
          >
            {t('nav.home')}
          </button>
          <button
            onClick={() => setActivePage('movies')}
            className="hover:text-white transition-colors"
          >
            {t('nav.movies')}
          </button>
          <button
            onClick={() => setActivePage('series')}
            className="hover:text-white transition-colors"
          >
            {t('nav.series')}
          </button>
          <button
            onClick={() => setActivePage('live')}
            className="hover:text-white transition-colors"
          >
            {t('nav.liveTv')}
          </button>
          <button
            onClick={() => setActivePage('mylist')}
            className="hover:text-white transition-colors"
          >
            {t('nav.myList')}
          </button>
          <button
            onClick={() => setActivePage('profile')}
            className="hover:text-white transition-colors"
          >
            {t('nav.profile')}
          </button>
        </div>

        <div className={`text-slate-500 text-[11px] text-center ${isRtl ? 'md:text-left' : 'md:text-right'}`}>
          <span>{t('footer.audioBadge')}</span>
        </div>
      </div>
    </footer>
  );
};
