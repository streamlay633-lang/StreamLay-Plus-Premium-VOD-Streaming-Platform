import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';
import { Home, Search, Tv, Bookmark, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activePage, setActivePage } = useApp();

  const items: { label: string; page: PageView; icon: React.FC<{ className?: string }> }[] = [
    { label: 'Home', page: 'home', icon: Home },
    { label: 'Search', page: 'search', icon: Search },
    { label: 'Live TV', page: 'live', icon: Tv },
    { label: 'My List', page: 'mylist', icon: Bookmark },
    { label: 'Profile', page: 'profile', icon: User },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07090e]/95 backdrop-blur-lg border-t border-white/10 px-3 py-2 flex items-center justify-around shadow-2xl"
      aria-label="Mobile Navigation"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.page;

        return (
          <button
            key={item.page}
            onClick={() => {
              setActivePage(item.page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-lg transition-colors min-w-[56px] ${
              isActive ? 'text-purple-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[11px] font-medium leading-none tracking-tight whitespace-nowrap">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
