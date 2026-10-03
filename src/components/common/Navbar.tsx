import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';
import { Search, User, Play, Globe, Check, ChevronDown } from 'lucide-react';
import { AVATARS } from '../../data/mockContent';
import { SUPPORTED_LANGUAGES, Language } from '../../i18n/translations';

export const Navbar: React.FC = () => {
  const { activePage, setActivePage, userName, userProfile, language, setLanguage, isRtl, t } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { label: string; page: PageView }[] = [
    { label: t('nav.home'), page: 'home' },
    { label: t('nav.movies'), page: 'movies' },
    { label: t('nav.series'), page: 'series' },
    { label: t('nav.liveTv'), page: 'live' },
    { label: t('nav.myList'), page: 'mylist' },
  ];

  const currentAvatar = AVATARS.find((a) => a.id === userProfile.avatarId) || AVATARS[0];
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090e]/95 backdrop-blur-md border-b border-white/5 py-3 shadow-xl shadow-black/40'
          : 'bg-gradient-to-b from-[#07090e]/95 via-[#07090e]/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element with glowing accent) */}
        <button
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2.5 group text-left focus:outline-none shrink-0"
          aria-label="StreamLay Plus Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform duration-200">
            <Play className={`w-4 h-4 text-white fill-white ${isRtl ? 'mr-0.5' : 'ml-0.5'}`} />
          </div>
          <span className="font-display font-bold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            StreamLay<span className="text-purple-400 font-extrabold">+</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links (Clean text with subtle underline) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const isActive = activePage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => setActivePage(item.page)}
                className={`text-sm font-medium transition-all relative py-1 focus:outline-none whitespace-nowrap ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Language Switcher, Search & Profile) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              aria-label="Select Language"
              title="Select Language / Changer de langue / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="uppercase tracking-wider font-bold">{currentLangObj.code}</span>
              <ChevronDown className="w-3 h-3 opacity-60 shrink-0" />
            </button>

            {showLangMenu && (
              <div
                className={`absolute top-full mt-2 w-44 p-1.5 rounded-2xl bg-slate-950/95 border border-white/15 backdrop-blur-xl shadow-2xl z-50 animate-fade-in ${
                  isRtl ? 'left-0' : 'right-0'
                }`}
              >
                <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10 mb-1">
                  {t('onboarding.selectLanguage')}
                </div>
                <div className="space-y-0.5">
                  {SUPPORTED_LANGUAGES.map((langOpt) => {
                    const isSelected = language === langOpt.code;
                    return (
                      <button
                        key={langOpt.code}
                        onClick={() => {
                          setLanguage(langOpt.code as Language);
                          setShowLangMenu(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all ${
                          isSelected
                            ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                            : 'text-slate-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{langOpt.flag}</span>
                          <span className="font-medium">{langOpt.nativeName}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={() => setActivePage('search')}
            className={`p-2 rounded-xl transition-colors flex items-center gap-2 text-sm focus:outline-none ${
              activePage === 'search'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
            aria-label={t('nav.search')}
            title={t('nav.search')}
          >
            <Search className="w-4 h-4" />
            <span className="hidden xl:inline text-xs text-slate-400 font-normal">{t('nav.search')}</span>
          </button>

          {/* Profile Button */}
          <button
            onClick={() => setActivePage('profile')}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-purple-500/40 transition-all focus:outline-none"
            aria-label={t('nav.profile')}
            title={t('nav.profile')}
          >
            <div
              className={`w-8 h-8 rounded-full bg-gradient-to-tr ${currentAvatar.gradient} flex items-center justify-center text-xs font-bold text-white shadow-md border border-white/20`}
            >
              {userName ? userName.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
            </div>
            {userName && (
              <span className="hidden sm:inline text-xs font-medium text-slate-300 max-w-[90px] truncate">
                {userName}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
