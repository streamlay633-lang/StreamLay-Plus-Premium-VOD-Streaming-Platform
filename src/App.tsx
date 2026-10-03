import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { MobileNav } from './components/common/MobileNav';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { CustomCursor } from './components/common/CustomCursor';
import { OnboardingView } from './components/onboarding/OnboardingView';
import { HomeView } from './components/home/HomeView';
import { MoviesView } from './components/movies/MoviesView';
import { SeriesView } from './components/series/SeriesView';
import { LiveTvView } from './components/live/LiveTvView';
import { SearchView } from './components/search/SearchView';
import { ContentDetailsView } from './components/details/ContentDetailsView';
import { VideoPlayerView } from './components/player/VideoPlayerView';
import { ProfileView } from './components/profile/ProfileView';
import { MyListView } from './components/mylist/MyListView';

const MainAppContent: React.FC = () => {
  const { activePage, isRtl } = useApp();

  // If in onboarding, render fullscreen onboarding without top/bottom bars
  if (activePage === 'onboarding') {
    return (
      <main dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-[#07090e]">
        <CustomCursor />
        <OnboardingView />
        <ToastContainer />
      </main>
    );
  }

  // If in video player mode, render fullscreen video player
  if (activePage === 'player') {
    return (
      <main dir={isRtl ? 'rtl' : 'ltr'} className="fixed inset-0 bg-black z-50">
        <CustomCursor />
        <VideoPlayerView />
        <ToastContainer />
      </main>
    );
  }

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 relative">
      {/* Interactive Web Cursor Pointer */}
      <CustomCursor />

      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activePage === 'home' && <HomeView />}
        {activePage === 'movies' && <MoviesView />}
        {activePage === 'series' && <SeriesView />}
        {activePage === 'live' && <LiveTvView />}
        {activePage === 'search' && <SearchView />}
        {activePage === 'details' && <ContentDetailsView />}
        {activePage === 'profile' && <ProfileView />}
        {activePage === 'mylist' && <MyListView />}
      </main>

      {/* Subtle Footer */}
      <Footer />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav />

      {/* Global Toast System */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
