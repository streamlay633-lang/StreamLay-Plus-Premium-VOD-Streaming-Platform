export type ContentType = 'movie' | 'series';

export interface VideoServer {
  id: string;
  name: string;
  url: string;
  quality?: string;
  isEmbed?: boolean;
}

export interface Episode {
  id: string;
  episodeNumber: number;
  seasonNumber: number;
  title: string;
  duration: string;
  description: string;
  thumbnailUrl: string;
  progress?: number;
  videoUrl: string;
  servers?: VideoServer[];
}

export interface Season {
  seasonNumber: number;
  title: string;
  episodes: Episode[];
}

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  description: string;
  longDescription?: string;
  backdropUrl: string;
  posterUrl: string;
  logoUrl?: string;
  year: number;
  releaseDate?: string;
  rating: string; // e.g. "PG-13", "TV-MA", "R", "6+"
  score: number; // e.g. 8.9
  duration?: string; // e.g. "2h 14m" (movies)
  seasonsCount?: number; // e.g. 4 (series)
  genres: string[];
  cast: string[];
  director: string;
  language: string;
  subtitles?: string[];
  serverName?: string;
  servers?: VideoServer[];
  quality: string[]; // e.g. ["4K UHD", "HDR10+", "Dolby Atmos"]
  featured?: boolean;
  trending?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  videoUrl: string;
  seasons?: Season[];
  progress?: number; // 0-100
}

export interface ProgramSlot {
  time: string;
  title: string;
  genre: string;
  durationMinutes: number;
}

export interface LiveChannel {
  id: string;
  name: string;
  category: 'News' | 'Sports' | 'Cinema' | 'Entertainment' | 'Documentary' | 'Music';
  number: number;
  logo: string;
  streamUrl: string;
  currentProgram: string;
  currentProgramDesc: string;
  currentProgramTime: string;
  nextProgram: string;
  nextProgramTime: string;
  schedule: ProgramSlot[];
  isFavorite?: boolean;
  resolution: string;
  viewerCount: string;
}

export type PageView =
  | 'onboarding'
  | 'home'
  | 'movies'
  | 'series'
  | 'live'
  | 'search'
  | 'details'
  | 'player'
  | 'profile'
  | 'mylist';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

export interface UserProfile {
  name: string;
  email: string;
  avatarId: string;
  subscriptionPlan: string;
  planRenewalDate: string;
  language: string;
  audioLanguage: string;
  subtitleLanguage: string;
  autoPlayNext: boolean;
  notificationsEnabled: boolean;
}
