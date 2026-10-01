import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';
import { Search, User, Play, Sparkles } from 'lucide-react';
import { AVATARS } from '../../data/mockContent';

export const Navbar: React.FC = () => {
  const { activePage, setActivePage, userName, userProfile } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Movies', page: 'movies' },
    { label: 'Series', page: 'series' },
    { label: 'Live TV', page: 'live' },
    { label: 'My List', page: 'mylist' },
  ];

  const currentAvatar = AVATARS.find((a) => a.id === userProfile.avatarId) || AVATARS[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090e]/90 backdrop-blur-md border-b border-white/5 py-3 shadow-xl shadow-black/40'
          : 'bg-gradient-to-b from-[#07090e]/90 via-[#07090e]/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element with glowing accent) */}
        <button
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2 group text-left focus:outline-none"
          aria-label="StreamLay Plus Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform duration-200">
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          </div>
          <span className="font-display font-bold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            StreamLay<span className="text-purple-400 font-extrabold">+</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links (Clean text with subtle underline) */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = activePage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => setActivePage(item.page)}
                className={`text-sm font-medium transition-all relative py-1 focus:outline-none ${
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

        {/* Zone 3: Primary Actions (Search & Profile) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage('search')}
            className={`p-2 rounded-full transition-colors flex items-center gap-2 text-sm focus:outline-none ${
              activePage === 'search'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
            aria-label="Search movies, series and channels"
          >
            <Search className="w-4 h-4" />
            <span className="hidden xl:inline text-xs text-slate-400 font-normal">Search</span>
          </button>

          <button
            onClick={() => setActivePage('profile')}
            className="flex items-center gap-2.5 p-1 rounded-full hover:ring-2 hover:ring-purple-500/40 transition-all focus:outline-none"
            aria-label="User Profile"
          >
            <div
              className={`w-8 h-8 rounded-full bg-gradient-to-tr ${currentAvatar.gradient} flex items-center justify-center text-xs font-bold text-white shadow-md border border-white/20`}
            >
              {userName ? userName.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
            </div>
            {userName && (
              <span className="hidden sm:inline text-xs font-medium text-slate-300 max-w-[100px] truncate">
                {userName}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
