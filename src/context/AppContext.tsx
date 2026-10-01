import React, { createContext, useContext, useState, useEffect } from 'react';
import { ContentItem, LiveChannel, PageView, ToastMessage, UserProfile, Episode, VideoServer } from '../types';
import { MOCK_CONTENT, MOCK_CHANNELS } from '../data/mockContent';

export interface ActivePlaybackState {
  title: string;
  videoUrl: string;
  posterUrl: string;
  contentId?: string;
  episodeId?: string;
  isLive?: boolean;
  subtitle?: string;
  rating?: string;
  genres?: string[];
  currentServer?: string;
  availableServers?: VideoServer[];
}

interface AppContextType {
  userName: string;
  setUserName: (name: string) => void;
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  selectedContentId: string | null;
  setSelectedContentId: (id: string | null) => void;
  selectedContent: ContentItem | null;
  selectedEpisode: Episode | null;
  activePlayback: ActivePlaybackState | null;
  startPlayback: (item: ContentItem, episode?: Episode, server?: VideoServer) => void;
  switchServer: (server: VideoServer) => void;
  startLivePlayback: (channel: LiveChannel) => void;
  stopPlayback: () => void;
  myList: string[];
  toggleMyList: (contentId: string) => void;
  isInMyList: (contentId: string) => boolean;
  continueWatching: { contentId: string; progress: number; episodeId?: string; updatedAt: number }[];
  updateProgress: (contentId: string, progress: number, episodeId?: string) => void;
  removeFromContinueWatching: (contentId: string) => void;
  favoriteChannels: string[];
  toggleFavoriteChannel: (channelId: string) => void;
  isFavoriteChannel: (channelId: string) => boolean;
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openDetails: (contentId: string) => void;
  openPlayer: (contentId: string, episodeId?: string) => void;
  signOut: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  email: 'streamlay633@gmail.com',
  avatarId: 'avatar-1',
  subscriptionPlan: 'StreamLay Ultra 4K HDR',
  planRenewalDate: 'November 15, 2026',
  language: 'English (US)',
  audioLanguage: 'English Original (Dolby Atmos)',
  subtitleLanguage: 'English [CC]',
  autoPlayNext: true,
  notificationsEnabled: true,
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserNameState] = useState<string>(() => {
    return localStorage.getItem('streamlay_user_name') || '';
  });

  const [activePage, setActivePage] = useState<PageView>(() => {
    const savedName = localStorage.getItem('streamlay_user_name');
    return savedName ? 'home' : 'onboarding';
  });

  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(null);

  const [activePlayback, setActivePlayback] = useState<ActivePlaybackState | null>(null);

  const [myList, setMyList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('streamlay_my_list');
      return saved ? JSON.parse(saved) : ['cyber-odyssey', 'stellar-drift', 'abyssal-rift'];
    } catch {
      return ['cyber-odyssey', 'stellar-drift', 'abyssal-rift'];
    }
  });

  const [continueWatching, setContinueWatching] = useState<
    { contentId: string; progress: number; episodeId?: string; updatedAt: number }[]
  >(() => {
    try {
      const saved = localStorage.getItem('streamlay_continue_watching');
      return saved
        ? JSON.parse(saved)
        : [
            { contentId: 'cyber-odyssey', progress: 45, updatedAt: Date.now() - 3600000 },
            { contentId: 'stellar-drift', progress: 30, episodeId: 'sd-s1-e2', updatedAt: Date.now() - 7200000 },
            { contentId: 'crimson-veil', progress: 72, updatedAt: Date.now() - 14400000 }
          ];
    } catch {
      return [
        { contentId: 'cyber-odyssey', progress: 45, updatedAt: Date.now() - 3600000 },
        { contentId: 'stellar-drift', progress: 30, episodeId: 'sd-s1-e2', updatedAt: Date.now() - 7200000 }
      ];
    }
  });

  const [favoriteChannels, setFavoriteChannels] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('streamlay_fav_channels');
      return saved ? JSON.parse(saved) : ['streamlay-premier-sports', 'cinema-plus-action'];
    } catch {
      return ['streamlay-premier-sports', 'cinema-plus-action'];
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('streamlay_user_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    const name = localStorage.getItem('streamlay_user_name') || '';
    return { ...DEFAULT_PROFILE, name };
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (userName) {
      localStorage.setItem('streamlay_user_name', userName);
      setUserProfile((prev) => ({ ...prev, name: userName }));
    }
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('streamlay_my_list', JSON.stringify(myList));
  }, [myList]);

  useEffect(() => {
    localStorage.setItem('streamlay_continue_watching', JSON.stringify(continueWatching));
  }, [continueWatching]);

  useEffect(() => {
    localStorage.setItem('streamlay_fav_channels', JSON.stringify(favoriteChannels));
  }, [favoriteChannels]);

  useEffect(() => {
    localStorage.setItem('streamlay_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setUserName = (name: string) => {
    setUserNameState(name);
    localStorage.setItem('streamlay_user_name', name);
    setUserProfile((prev) => ({ ...prev, name }));
  };

  const toggleMyList = (contentId: string) => {
    const exists = myList.includes(contentId);
    const item = MOCK_CONTENT.find((c) => c.id === contentId);
    const title = item ? item.title : 'Title';

    if (exists) {
      setMyList((prev) => prev.filter((id) => id !== contentId));
      addToast(`Removed "${title}" from My List`, 'info');
    } else {
      setMyList((prev) => [contentId, ...prev]);
      addToast(`Added "${title}" to My List`, 'success');
    }
  };

  const isInMyList = (contentId: string) => myList.includes(contentId);

  const toggleFavoriteChannel = (channelId: string) => {
    const exists = favoriteChannels.includes(channelId);
    const ch = MOCK_CHANNELS.find((c) => c.id === channelId);
    const name = ch ? ch.name : 'Channel';

    if (exists) {
      setFavoriteChannels((prev) => prev.filter((id) => id !== channelId));
      addToast(`Removed ${name} from favorites`, 'info');
    } else {
      setFavoriteChannels((prev) => [...prev, channelId]);
      addToast(`Added ${name} to favorite channels`, 'success');
    }
  };

  const isFavoriteChannel = (channelId: string) => favoriteChannels.includes(channelId);

  const updateProgress = (contentId: string, progress: number, episodeId?: string) => {
    setContinueWatching((prev) => {
      const filtered = prev.filter((item) => item.contentId !== contentId);
      if (progress >= 95) {
        return filtered;
      }
      return [{ contentId, progress, episodeId, updatedAt: Date.now() }, ...filtered];
    });
  };

  const removeFromContinueWatching = (contentId: string) => {
    setContinueWatching((prev) => prev.filter((item) => item.contentId !== contentId));
    addToast('Removed from Continue Watching', 'info');
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
    if (updates.name) {
      setUserNameState(updates.name);
    }
    addToast('Profile preferences updated', 'success');
  };

  const openDetails = (contentId: string) => {
    setSelectedContentId(contentId);
    setActivePage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPlayer = (contentId: string, episodeId?: string) => {
    const item = MOCK_CONTENT.find((c) => c.id === contentId);
    if (!item) return;

    let targetEpisode: Episode | undefined;
    if (episodeId && item.seasons) {
      for (const season of item.seasons) {
        const found = season.episodes.find((e) => e.id === episodeId);
        if (found) {
          targetEpisode = found;
          break;
        }
      }
    } else if (item.type === 'series' && item.seasons?.[0]?.episodes?.[0]) {
      targetEpisode = item.seasons[0].episodes[0];
    }

    startPlayback(item, targetEpisode);
  };

  const startPlayback = (item: ContentItem, episode?: Episode, server?: VideoServer) => {
    setSelectedContentId(item.id);
    setSelectedEpisodeId(episode ? episode.id : null);

    const availableServers: VideoServer[] = episode?.servers || item.servers || [
      { id: 'primary', name: item.serverName || 'Primary Server', url: episode ? episode.videoUrl : item.videoUrl, quality: 'Auto' }
    ];
    const targetServer = server || availableServers[0];

    setActivePlayback({
      title: episode ? `${item.title}: ${episode.title}` : item.title,
      subtitle: episode ? `S${episode.seasonNumber} : E${episode.episodeNumber}` : `${item.year} · ${item.duration || ''}`,
      videoUrl: targetServer ? targetServer.url : (episode ? episode.videoUrl : item.videoUrl),
      posterUrl: episode ? episode.thumbnailUrl : item.backdropUrl,
      contentId: item.id,
      episodeId: episode?.id,
      isLive: false,
      rating: item.rating,
      genres: item.genres,
      currentServer: targetServer?.name || 'Primary Server',
      availableServers
    });

    setActivePage('player');
    window.scrollTo({ top: 0 });
  };

  const switchServer = (server: VideoServer) => {
    setActivePlayback((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        videoUrl: server.url,
        currentServer: server.name
      };
    });
    addToast(`Switched server to ${server.name}`, 'info');
  };

  const startLivePlayback = (channel: LiveChannel) => {
    setActivePlayback({
      title: channel.name,
      subtitle: `LIVE: ${channel.currentProgram}`,
      videoUrl: channel.streamUrl,
      posterUrl: '/assets/images/live_broadcast_studio_1790849707271.jpg',
      isLive: true,
      rating: 'LIVE',
      genres: [channel.category, channel.resolution]
    });
    setActivePage('player');
    window.scrollTo({ top: 0 });
  };

  const stopPlayback = () => {
    setActivePlayback(null);
  };

  const signOut = () => {
    localStorage.removeItem('streamlay_user_name');
    setUserNameState('');
    setUserProfile((prev) => ({ ...prev, name: '' }));
    setActivePlayback(null);
    setActivePage('onboarding');
    addToast('Signed out of StreamLay Plus', 'info');
  };

  const selectedContent = selectedContentId ? MOCK_CONTENT.find((c) => c.id === selectedContentId) || null : null;
  const selectedEpisode =
    selectedContent && selectedEpisodeId && selectedContent.seasons
      ? selectedContent.seasons.flatMap((s) => s.episodes).find((e) => e.id === selectedEpisodeId) || null
      : null;

  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName,
        activePage,
        setActivePage,
        selectedContentId,
        setSelectedContentId,
        selectedContent,
        selectedEpisode,
        activePlayback,
        startPlayback,
        switchServer,
        startLivePlayback,
        stopPlayback,
        myList,
        toggleMyList,
        isInMyList,
        continueWatching,
        updateProgress,
        removeFromContinueWatching,
        favoriteChannels,
        toggleFavoriteChannel,
        isFavoriteChannel,
        userProfile,
        updateUserProfile,
        toasts,
        addToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        openDetails,
        openPlayer,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
