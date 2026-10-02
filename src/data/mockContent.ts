import { ContentItem, LiveChannel } from '../types';

export const MOCK_CONTENT: ContentItem[] = [
  {
    id: 'onegai-aipri',
    title: 'Onegai Aipri',
    type: 'series',
    description:
      'At Private Paradime Academy, Himari Aozora longs to make 10,000 friends. When she stumbles upon the secret metaverse of AiPri Verse, she and her best friend Mitsuki transform into dazzling idols.',
    longDescription:
      'Welcome to Private Paradime Academy, a prestigious boarding school where dreams come alive! First-year student Himari Aozora arrives with a heartfelt dream to connect with everyone and make 10,000 friends. However, her world turns magical when she discovers the secret virtual gateway to AiPri Verse—an enchanting idol paradise accessible only through special AiPri cards and bracelets. Alongside her calm, collected roommate Mitsuki Hoshikawa, Himari steps onto the radiant live stage to debut as an AiPri idol, balancing secret sparkling performances, glamorous fashion coords, and daily school life.',
    backdropUrl: 'https://migabviadyfvzqgjtfom.supabase.co/storage/v1/object/public/TV%20Series/Onegai%20Aipri/Backdrop/Onegai%20Aipri%20-%20Backdrop.png',
    posterUrl: 'https://migabviadyfvzqgjtfom.supabase.co/storage/v1/object/public/TV%20Series/Onegai%20Aipri/Poster/Onegai%20Aipri%20-%20Poster.jpg',
    logoUrl: 'https://migabviadyfvzqgjtfom.supabase.co/storage/v1/object/public/TV%20Series/Onegai%20Aipri/Backdrop/Onegai%20Aipri%20-%20Backdrop.png',
    year: 2026,
    releaseDate: 'April 5, 2026',
    rating: '6+',
    score: 9.4,
    seasonsCount: 1,
    genres: ['Anime', 'Magical girl', 'Idol', 'Science fiction'],
    cast: ['Minori Fujidera (Himari Aozora)', 'Saki Hiratsuka (Mitsuki Hoshikawa)', 'Anna Yuruno', 'Kanna Nakamura'],
    director: 'Junichi Sato & OLM / Dongwoo A&E',
    language: 'Japanese',
    subtitles: ['English'],
    serverName: 'LuluStream',
    servers: [
      {
        id: 'lulustream',
        name: 'LuluStream',
        url: 'https://lulust.com/e/ej6qz8uzyivp',
        quality: '1080p FHD'
      },
      {
        id: 'doodstream',
        name: 'DoodStream',
        url: 'https://playmogo.com/e/jlarlo506i3k',
        quality: 'Fast Stream'
      }
    ],
    quality: ['1080p FHD', 'Stereo 2.0'],
    featured: true,
    trending: true,
    isNew: true,
    isPopular: true,
    videoUrl: 'https://lulust.com/e/ej6qz8uzyivp',
    progress: 0,
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        episodes: [
          {
            id: 'onegai-aipri-s1-e1',
            episodeNumber: 1,
            seasonNumber: 1,
            title: 'Please! Become an AiPri!',
            duration: '24:20',
            description:
              'Himari enters Private Paradime Academy and dreams of making thousands of friends. An unexpected encounter leads her to the secret virtual world of AiPri Verse, where her idol journey begins!',
            thumbnailUrl:
              '/assets/images/onegai_aipri_ep1.jpg',
            videoUrl: 'https://lulust.com/e/ej6qz8uzyivp',
            servers: [
              {
                id: 'lulustream',
                name: 'LuluStream',
                url: 'https://lulust.com/e/ej6qz8uzyivp',
                quality: '1080p FHD'
              },
              {
                id: 'doodstream',
                name: 'DoodStream',
                url: 'https://playmogo.com/e/jlarlo506i3k',
                quality: 'Fast Stream'
              }
            ],
            progress: 0
          },
          {
            id: 'onegai-aipri-s1-e2',
            episodeNumber: 2,
            seasonNumber: 1,
            title: "Let's make that dream come true♪",
            duration: '24:30',
            description:
              "Himari continues her dazzling idol journey in AiPri Verse alongside Mitsuki. Striving together on the radiant stage, they take their next steps to make everyone's sparkling dreams come true♪",
            thumbnailUrl:
              '/assets/images/onegai_aipri_ep2.jpg',
            videoUrl: 'https://lulust.com/e/1enk2xccx5r5',
            servers: [
              {
                id: 'lulustream',
                name: 'LuluStream',
                url: 'https://lulust.com/e/1enk2xccx5r5',
                quality: '1080p FHD'
              },
              {
                id: 'doodstream',
                name: 'DoodStream',
                url: 'https://playmogo.com/e/6fj07ncr9pia',
                quality: 'Fast Stream'
              }
            ],
            progress: 0
          }
        ]
      }
    ]
  },
  {
    id: 'channel-0225-tv',
    title: 'Channel 0225 TV',
    type: 'live',
    description:
      'Channel 0225 TV brings you 24/7 non-stop entertainment, live specials, culture, music, and exclusive broadcasts in crystal-clear high definition.',
    longDescription:
      'Channel 0225 TV is a premier 24/7 digital broadcast network streaming live worldwide. Experience dynamic entertainment, breaking feature specials, variety programs, live performances, and community highlights broadcast directly in high definition quality.',
    backdropUrl:
      'https://migabviadyfvzqgjtfom.supabase.co/storage/v1/object/public/Live%20Channels/Backdrop/Channel%200225%20TV%20-%20Backdrop.png',
    posterUrl:
      'https://migabviadyfvzqgjtfom.supabase.co/storage/v1/object/public/Live%20Channels/Poster/Channel%200225%20TV%20-%20Poster.png',
    logoUrl:
      'https://migabviadyfvzqgjtfom.supabase.co/storage/v1/object/public/Live%20Channels/Poster/Channel%200225%20TV%20-%20Poster.png',
    year: 2026,
    releaseDate: 'Live 24/7',
    rating: 'TV-PG',
    score: 9.6,
    duration: '24/7 Live Stream',
    genres: ['Live TV', 'Entertainment', 'Music', 'Variety'],
    cast: ['Live Network Hosts', 'Channel 0225 Personalities', 'Special Featured Performers'],
    director: 'Channel 0225 Network Broadcast Group',
    language: 'English',
    subtitles: ['English [Live CC]'],
    serverName: 'Official HLS Stream',
    servers: [
      {
        id: 'bozztv-hls',
        name: 'Official HLS Stream',
        url: 'https://lbgo.bozztv.com/ssh101/ssh101/channel0225tv/playlist.m3u8',
        quality: '1080p Live'
      }
    ],
    quality: ['1080p HD', 'Live HLS Stream', 'Stereo Audio'],
    featured: true,
    trending: true,
    isNew: true,
    isPopular: true,
    videoUrl: 'https://lbgo.bozztv.com/ssh101/ssh101/channel0225tv/playlist.m3u8',
    progress: 0
  }
];

export const MOCK_CHANNELS: LiveChannel[] = [
  {
    id: 'channel-0225-tv',
    name: 'Channel 0225 TV',
    category: 'Entertainment',
    number: 225,
    logo: '📺',
    posterUrl: 'https://migabviadyfvzqgjtfom.supabase.co/storage/v1/object/public/Live%20Channels/Poster/Channel%200225%20TV%20-%20Poster.png',
    backdropUrl: 'https://migabviadyfvzqgjtfom.supabase.co/storage/v1/object/public/Live%20Channels/Backdrop/Channel%200225%20TV%20-%20Backdrop.png',
    logoUrl: 'https://migabviadyfvzqgjtfom.supabase.co/storage/v1/object/public/Live%20Channels/Poster/Channel%200225%20TV%20-%20Poster.png',
    description: 'Channel 0225 TV brings you 24/7 non-stop entertainment, live specials, culture, music, and exclusive broadcasts in crystal-clear high definition.',
    streamUrl: 'https://lbgo.bozztv.com/ssh101/ssh101/channel0225tv/playlist.m3u8',
    currentProgram: 'Channel 0225 TV Live Broadcast',
    currentProgramDesc: 'Non-stop 24/7 high-definition live stream broadcast featuring premium entertainment, concerts, network variety specials, and exclusive features.',
    currentProgramTime: 'Live 24/7',
    nextProgram: 'Prime Time Spotlight & Special Music Hours',
    nextProgramTime: 'Continuous',
    resolution: '1080p HD',
    viewerCount: '1.2M watching',
    isFavorite: true,
    schedule: [
      { time: '18:00', title: 'Network Warmup & Daily Highlights', genre: 'Entertainment', durationMinutes: 60 },
      { time: '19:00', title: 'Channel 0225 Prime Showcase', genre: 'Entertainment', durationMinutes: 120 },
      { time: '21:00', title: 'Live Special Features & Music Concerts', genre: 'Music', durationMinutes: 90 },
      { time: '22:30', title: 'Late Night Nightfall Broadcast', genre: 'Entertainment', durationMinutes: 90 },
      { time: '00:00', title: 'Midnight Chillout & Global Waves', genre: 'Music', durationMinutes: 120 }
    ]
  }
];

export const GENRES = [
  'All Genres',
  'Anime',
  'Magical girl',
  'Idol',
  'Science fiction',
  'Live TV',
  'Entertainment',
  'Music',
  'Variety'
];

export const AVATARS = [
  { id: 'avatar-1', label: 'Cosmic Violet', gradient: 'from-purple-500 via-indigo-600 to-blue-600', icon: '🚀' },
  { id: 'avatar-2', label: 'Crimson Blade', gradient: 'from-pink-500 via-rose-600 to-red-600', icon: '⚔️' },
  { id: 'avatar-3', label: 'Neon Cyber', gradient: 'from-emerald-400 via-teal-500 to-cyan-600', icon: '👾' },
  { id: 'avatar-4', label: 'Solar Flare', gradient: 'from-amber-400 via-orange-500 to-rose-600', icon: '⚡' },
  { id: 'avatar-5', label: 'Midnight Shadow', gradient: 'from-slate-700 via-slate-800 to-black', icon: '🌌' }
];
