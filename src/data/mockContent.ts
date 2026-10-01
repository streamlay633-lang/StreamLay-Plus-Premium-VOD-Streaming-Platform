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
              'https://migabviadyfvzqgjtfom.supabase.co/storage/v1/object/public/TV%20Series/Onegai%20Aipri/Episodes%20Thumbnail/ej6qz8uzyivp.jpg',
            videoUrl: 'https://lulust.com/e/ej6qz8uzyivp',
            progress: 0
          }
        ]
      }
    ]
  },
  {
    id: 'cyber-odyssey',
    title: 'Cyber Odyssey: 2189',
    type: 'movie',
    description:
      'In a neon-drenched metropolis divided by neural networks, a renegade data courier unearths an ancient transmission that threatens the world’s sovereign artificial intelligences.',
    longDescription:
      'Set against the sprawling, multi-tiered megacity of Neo-Kyoto in the year 2189, Cyber Odyssey chronicles the high-stakes journey of Kaelen Vex, an elite neural courier whose consciousness harbors the final biometric key to the Citadel mainframe. Hunted by syndicate synthetics and military enforcers, Kaelen must cross the subterranean cyber-slums to deliver the broadcast before the global lockdown takes effect.',
    backdropUrl: '/assets/images/hero_cyber_odyssey_1790849659064.jpg',
    posterUrl: '/assets/images/poster_crimson_veil_1790849683496.jpg',
    year: 2026,
    rating: 'PG-13',
    score: 9.1,
    duration: '2h 24m',
    genres: ['Sci-Fi', 'Action', 'Thriller'],
    cast: ['Elena Rostova', 'Marcus Vance', 'David Chen', 'Sora Tanaka'],
    director: 'Denis Villeneuve-inspired Studio',
    language: 'English (Original), Japanese',
    quality: ['4K UHD', 'HDR10+', 'Dolby Vision', 'Dolby Atmos'],
    featured: true,
    trending: true,
    isPopular: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    progress: 45
  },
  {
    id: 'crimson-veil',
    title: 'Crimson Veil',
    type: 'movie',
    description:
      'A psychological neo-noir thriller about a weary detective untangling an enigmatic syndicate hiding in plain sight within the rainy alleyways of Manhattan.',
    longDescription:
      'Detective Julian Croft thought he had seen everything until an impossible robbery in an encrypted vault leaves only a crimson silk cipher. As detectives and corrupt officials clash in midnight precinct rooms, Julian enters an underground web where every ally might be a handler.',
    backdropUrl: '/assets/images/poster_crimson_veil_1790849683496.jpg',
    posterUrl: '/assets/images/poster_crimson_veil_1790849683496.jpg',
    year: 2025,
    rating: 'R',
    score: 8.8,
    duration: '2h 08m',
    genres: ['Thriller', 'Crime', 'Drama'],
    cast: ['Christian Sterling', 'Maya Lin', 'Arthur Pendelton'],
    director: 'Kathryn Sterling',
    language: 'English',
    quality: ['4K UHD', 'Dolby Atmos'],
    trending: true,
    isPopular: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    progress: 72
  },
  {
    id: 'stellar-drift',
    title: 'Stellar Drift',
    type: 'series',
    description:
      'When deep-space colony vessel Astraea loses orbital gravity near a dying magnetar, the surviving crew must navigate uncharted spatial rifts and alien anomalies.',
    longDescription:
      'Decades from Earth, the exploration cruiser Astraea faces a spatial collapse near an uncharted cosmic anomaly. Captain Teresa Ward must unite a fractured team of astrophysicists and colonial pioneers as temporal distortions begin rewriting their memories.',
    backdropUrl: '/assets/images/poster_stellar_drift_1790849695532.jpg',
    posterUrl: '/assets/images/poster_stellar_drift_1790849695532.jpg',
    year: 2026,
    rating: 'TV-MA',
    score: 9.3,
    seasonsCount: 2,
    genres: ['Sci-Fi', 'Drama', 'Mystery'],
    cast: ['Teresa Ward', 'Gabriel Soto', 'Chloe Dupont', 'Hassan Al-Mansoor'],
    director: 'Alfonso Cuarón-inspired Creative',
    language: 'English',
    quality: ['4K UHD', 'HDR10+', 'Dolby Atmos'],
    featured: true,
    trending: true,
    isNew: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    progress: 30,
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1: Event Horizon',
        episodes: [
          {
            id: 'sd-s1-e1',
            episodeNumber: 1,
            seasonNumber: 1,
            title: 'Episode 1: The Drift Begins',
            duration: '56m',
            description: 'The Astraea experiences catastrophic engine malfunction during deep hyper-transit.',
            thumbnailUrl: '/assets/images/poster_stellar_drift_1790849695532.jpg',
            progress: 100,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
          },
          {
            id: 'sd-s1-e2',
            episodeNumber: 2,
            seasonNumber: 1,
            title: 'Episode 2: Echoes in the Void',
            duration: '52m',
            description: 'Sensors detect an unidentified derelict structure radiating quantum signals.',
            thumbnailUrl: '/assets/images/poster_stellar_drift_1790849695532.jpg',
            progress: 45,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
          },
          {
            id: 'sd-s1-e3',
            episodeNumber: 3,
            seasonNumber: 1,
            title: 'Episode 3: Chrono Distortion',
            duration: '58m',
            description: 'Temporal ripples cause physical corridors of the ship to fold into past timelines.',
            thumbnailUrl: '/assets/images/poster_stellar_drift_1790849695532.jpg',
            progress: 0,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          },
          {
            id: 'sd-s1-e4',
            episodeNumber: 4,
            seasonNumber: 1,
            title: 'Episode 4: The Core Protocol',
            duration: '61m',
            description: 'The crew debates an irreversible jump through the singularity threshold.',
            thumbnailUrl: '/assets/images/poster_stellar_drift_1790849695532.jpg',
            progress: 0,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
          }
        ]
      },
      {
        seasonNumber: 2,
        title: 'Season 2: Singularity',
        episodes: [
          {
            id: 'sd-s2-e1',
            episodeNumber: 1,
            seasonNumber: 2,
            title: 'Episode 1: Beyond the Perimeter',
            duration: '54m',
            description: 'Arrival on the outer perimeter of a dyson ring system with no planetary bodies.',
            thumbnailUrl: '/assets/images/poster_stellar_drift_1790849695532.jpg',
            progress: 0,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
          }
        ]
      }
    ]
  },
  {
    id: 'aurora-protocol',
    title: 'Aurora Protocol',
    type: 'series',
    description:
      'In high-altitude Nordic research stations, satellite engineers discover an encoded rhythmic pulse within geomagnetic solar storms.',
    longDescription:
      'Dr. Freja Lind and her polar outpost team intercept a structured broadband signal synchronized with extreme polar auroras. As governments initiate global blackout drills, the signal reveals instructions for a machine constructed centuries ago beneath the permafrost.',
    backdropUrl: '/assets/images/hero_cyber_odyssey_1790849659064.jpg',
    posterUrl: '/assets/images/poster_crimson_veil_1790849683496.jpg',
    year: 2026,
    rating: 'TV-14',
    score: 8.9,
    seasonsCount: 1,
    genres: ['Sci-Fi', 'Mystery', 'Drama'],
    cast: ['Freja Lind', 'Lukas Becker', 'Ingrid Solheim'],
    director: 'Henrik Vanger',
    language: 'English, Swedish',
    quality: ['4K UHD', 'HDR10+'],
    isNew: true,
    trending: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        episodes: [
          {
            id: 'ap-s1-e1',
            episodeNumber: 1,
            seasonNumber: 1,
            title: 'Signal in the Permafrost',
            duration: '49m',
            description: 'A sudden geomagnetic flare knocks out Scandinavian power grids while triggering seismic pings.',
            thumbnailUrl: '/assets/images/hero_cyber_odyssey_1790849659064.jpg',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
          },
          {
            id: 'ap-s1-e2',
            episodeNumber: 2,
            seasonNumber: 1,
            title: 'Deep Array Seven',
            duration: '53m',
            description: 'Freja descends into a decommissioned Cold War bunker to activate the quantum receiver.',
            thumbnailUrl: '/assets/images/hero_cyber_odyssey_1790849659064.jpg',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
          }
        ]
      }
    ]
  },
  {
    id: 'midnight-velocity',
    title: 'Midnight Velocity',
    type: 'movie',
    description:
      'An underground street racing thriller spanning Tokyo, Monaco, and Frankfurt, driven by hybrid hypercars and high-stakes corporate espionage.',
    backdropUrl: '/assets/images/hero_cyber_odyssey_1790849659064.jpg',
    posterUrl: '/assets/images/poster_crimson_veil_1790849683496.jpg',
    year: 2025,
    rating: 'PG-13',
    score: 8.4,
    duration: '1h 58m',
    genres: ['Action', 'Thriller'],
    cast: ['Ryder Vance', 'Kira Sato', 'Giancarlo Rossi'],
    director: 'Michael Bay-style adrenaline team',
    language: 'English',
    quality: ['4K UHD', 'Dolby Atmos'],
    isPopular: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    id: 'the-last-sovereign',
    title: 'The Last Sovereign',
    type: 'series',
    description:
      'A sprawling historical fantasy epic of dynastic succession, iron legions, and mystic mountain orders vying for the Golden Spire.',
    backdropUrl: '/assets/images/onboarding_cinema_bg_1790849672978.jpg',
    posterUrl: '/assets/images/poster_stellar_drift_1790849695532.jpg',
    year: 2024,
    rating: 'TV-MA',
    score: 9.4,
    seasonsCount: 3,
    genres: ['Action', 'Drama', 'Fantasy'],
    cast: ['Rowan Thorne', 'Lady Valoria', 'High Chancellor Karr'],
    director: 'Gareth Edwards',
    language: 'English',
    quality: ['4K UHD', 'HDR10+', 'Dolby Atmos'],
    isPopular: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1: The Throne of Ash',
        episodes: [
          {
            id: 'tls-s1-e1',
            episodeNumber: 1,
            seasonNumber: 1,
            title: 'The Crown of Embers',
            duration: '64m',
            description: 'The King passes without naming an heir, triggering instant mobilization across five provinces.',
            thumbnailUrl: '/assets/images/onboarding_cinema_bg_1790849672978.jpg',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
          }
        ]
      }
    ]
  },
  {
    id: 'shadow-cartel',
    title: 'Shadow Cartel',
    type: 'series',
    description:
      'An intense cross-border intelligence drama tracing modern cyber warfare, untraceable crypto pipelines, and private military groups.',
    backdropUrl: '/assets/images/poster_crimson_veil_1790849683496.jpg',
    posterUrl: '/assets/images/poster_crimson_veil_1790849683496.jpg',
    year: 2025,
    rating: 'TV-MA',
    score: 8.7,
    seasonsCount: 2,
    genres: ['Crime', 'Drama', 'Thriller'],
    cast: ['Carlos Mendez', 'Sarah Jenkins', 'Anton Volkov'],
    director: 'Stefano Sollima',
    language: 'English, Spanish',
    quality: ['4K UHD'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    id: 'echoes-of-earth',
    title: 'Echoes of Earth',
    type: 'movie',
    description:
      'Breathtaking nature documentary exploring the hidden bio-luminescent depths of Mariana Trench to the highest ice peaks of the Himalayas.',
    backdropUrl: '/assets/images/live_broadcast_studio_1790849707271.jpg',
    posterUrl: '/assets/images/poster_stellar_drift_1790849695532.jpg',
    year: 2026,
    rating: 'G',
    score: 9.6,
    duration: '1h 48m',
    genres: ['Documentary'],
    cast: ['Narrated by Sir David Attenborough style'],
    director: 'Alastair Fothergill',
    language: 'English',
    quality: ['4K UHD', 'HDR10+', 'Dolby Atmos'],
    isNew: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'laugh-track-confessions',
    title: 'Laugh Track Confessions',
    type: 'movie',
    description:
      'A sharp, hilarious behind-the-scenes comedy about the chaotic writers’ room of television’s longest-running satirical sitcom.',
    backdropUrl: '/assets/images/onboarding_cinema_bg_1790849672978.jpg',
    posterUrl: '/assets/images/poster_crimson_veil_1790849683496.jpg',
    year: 2025,
    rating: 'PG-13',
    score: 8.2,
    duration: '1h 42m',
    genres: ['Comedy', 'Drama'],
    cast: ['Jason Miller', 'Rachel Bloom', 'Pete Davidson'],
    director: 'Armando Iannucci',
    language: 'English',
    quality: ['HD', '5.1 Audio'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    id: 'abyssal-rift',
    title: 'Abyssal Rift',
    type: 'movie',
    description:
      'Submarine crew discovers an ancient non-terrestrial bioluminescent ecosystem seven miles below the Pacific seabed.',
    backdropUrl: '/assets/images/hero_cyber_odyssey_1790849659064.jpg',
    posterUrl: '/assets/images/poster_stellar_drift_1790849695532.jpg',
    year: 2026,
    rating: 'PG-13',
    score: 8.6,
    duration: '2h 11m',
    genres: ['Sci-Fi', 'Horror', 'Action'],
    cast: ['Jessica Chastain', 'Karl Urban', 'Hiroyuki Sanada'],
    director: 'James Cameron style',
    language: 'English',
    quality: ['4K UHD', 'Dolby Atmos'],
    isNew: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    id: 'champions-arena',
    title: 'Champions Arena: Rise of Legends',
    type: 'series',
    description:
      'Inside the thrilling, high-stakes international competitive sports circuit where technological biometric suits enhance human athletic potential.',
    backdropUrl: '/assets/images/live_broadcast_studio_1790849707271.jpg',
    posterUrl: '/assets/images/poster_crimson_veil_1790849683496.jpg',
    year: 2025,
    rating: 'TV-14',
    score: 8.8,
    seasonsCount: 2,
    genres: ['Action', 'Drama'],
    cast: ['Zack Taylor', 'Chloe Zhao', 'Liam Davies'],
    director: 'Justin Lin',
    language: 'English',
    quality: ['4K UHD', 'HDR10+'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 'neon-tokyo-chronicles',
    title: 'Neon Tokyo Chronicles',
    type: 'series',
    description:
      'Stylish animated cyberpunk anime series following a group of underground synthetic musicians fighting megacorp surveillance.',
    backdropUrl: '/assets/images/hero_cyber_odyssey_1790849659064.jpg',
    posterUrl: '/assets/images/poster_stellar_drift_1790849695532.jpg',
    year: 2026,
    rating: 'TV-14',
    score: 9.1,
    seasonsCount: 1,
    genres: ['Animation', 'Sci-Fi', 'Action'],
    cast: ['Kenjiro Tsuda', 'Rie Takahashi', 'Mamoru Miyano'],
    director: 'Shinichiro Watanabe',
    language: 'Japanese, English Dub',
    quality: ['4K UHD', 'Dolby Atmos'],
    isNew: true,
    trending: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  },
  {
    id: 'whispers-in-the-dark',
    title: 'Whispers in the Dark',
    type: 'movie',
    description:
      'In a secluded gothic manor, an archivist restructures centuries of forbidden manuscripts only to discover the pages rearrange themselves at midnight.',
    backdropUrl: '/assets/images/onboarding_cinema_bg_1790849672978.jpg',
    posterUrl: '/assets/images/poster_crimson_veil_1790849683496.jpg',
    year: 2024,
    rating: 'R',
    score: 8.1,
    duration: '1h 52m',
    genres: ['Horror', 'Mystery', 'Drama'],
    cast: ['Anya Taylor-Joy style', 'Bill Nighy', 'Cillian Murphy'],
    director: 'Guillermo del Toro style',
    language: 'English',
    quality: ['4K UHD', '5.1 Audio'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  }
];

export const MOCK_CHANNELS: LiveChannel[] = [
  {
    id: 'streamlay-premier-sports',
    name: 'StreamLay Sports 1 HD',
    category: 'Sports',
    number: 101,
    logo: '⚡',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    currentProgram: 'Global Supercup: London vs Madrid',
    currentProgramDesc: 'Live coverage of the championship semi-final with multi-cam tactical replays and expert halftime analysis.',
    currentProgramTime: '20:00 - 22:30',
    nextProgram: 'Matchday Review & Post-Game Analysis',
    nextProgramTime: '22:30 - 23:30',
    resolution: '4K 60FPS',
    viewerCount: '1.4M watching',
    isFavorite: true,
    schedule: [
      { time: '19:00', title: 'Pre-Game Stadium Live', genre: 'Sports', durationMinutes: 60 },
      { time: '20:00', title: 'Global Supercup: Semi-Final', genre: 'Sports', durationMinutes: 150 },
      { time: '22:30', title: 'Matchday Review & Highlights', genre: 'Sports', durationMinutes: 60 },
      { time: '23:30', title: 'Championship Moments Classic', genre: 'Sports', durationMinutes: 90 }
    ]
  },
  {
    id: 'streamlay-news-24',
    name: 'StreamLay World News',
    category: 'News',
    number: 204,
    logo: '🌐',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    currentProgram: 'Prime World Dispatch: Global Economy Summit',
    currentProgramDesc: 'Live broadcast from Geneva featuring central bank directives, tech summit announcements, and live market updates.',
    currentProgramTime: '21:00 - 22:00',
    nextProgram: 'Late Night Global Perspectives',
    nextProgramTime: '22:00 - 23:00',
    resolution: '1080p 60FPS',
    viewerCount: '840K watching',
    isFavorite: false,
    schedule: [
      { time: '20:00', title: 'The Evening Report', genre: 'News', durationMinutes: 60 },
      { time: '21:00', title: 'Prime World Dispatch', genre: 'News', durationMinutes: 60 },
      { time: '22:00', title: 'Late Night Global Perspectives', genre: 'News', durationMinutes: 60 },
      { time: '23:00', title: 'Market Wrap Asia Morning', genre: 'News', durationMinutes: 60 }
    ]
  },
  {
    id: 'cinema-plus-action',
    name: 'Cinema+ Blockbuster',
    category: 'Cinema',
    number: 302,
    logo: '🎬',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    currentProgram: 'Cyber Odyssey: The Director’s Cut',
    currentProgramDesc: 'Special non-stop presentation of the award-winning sci-fi thriller in remastered Dolby Atmos.',
    currentProgramTime: '20:15 - 22:45',
    nextProgram: 'Midnight Noir: The Dark Corridor',
    nextProgramTime: '22:45 - 00:30',
    resolution: '4K HDR',
    viewerCount: '620K watching',
    isFavorite: true,
    schedule: [
      { time: '18:00', title: 'Neon Horizon', genre: 'Cinema', durationMinutes: 135 },
      { time: '20:15', title: 'Cyber Odyssey: Director’s Cut', genre: 'Cinema', durationMinutes: 150 },
      { time: '22:45', title: 'Midnight Noir: The Dark Corridor', genre: 'Cinema', durationMinutes: 105 }
    ]
  },
  {
    id: 'geo-pulse-discovery',
    name: 'GeoPulse Nature 4K',
    category: 'Documentary',
    number: 405,
    logo: '🌍',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    currentProgram: 'Secrets of the Oceanic Abyss',
    currentProgramDesc: 'Unexplored volcanic vents in the Mariana Trench captured with ultra-sensitive deep sea camera rigs.',
    currentProgramTime: '21:30 - 22:30',
    nextProgram: 'Prowlers of the Kalahari',
    nextProgramTime: '22:30 - 23:30',
    resolution: '4K Ultra HD',
    viewerCount: '310K watching',
    isFavorite: false,
    schedule: [
      { time: '20:00', title: 'Wild Scandinavia', genre: 'Documentary', durationMinutes: 90 },
      { time: '21:30', title: 'Secrets of the Oceanic Abyss', genre: 'Documentary', durationMinutes: 60 },
      { time: '22:30', title: 'Prowlers of the Kalahari', genre: 'Documentary', durationMinutes: 60 }
    ]
  },
  {
    id: 'pulse-live-music',
    name: 'Pulse Live Music & Festivals',
    category: 'Music',
    number: 510,
    logo: '🎧',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    currentProgram: 'Amsterdam Electronic Symphony 2026',
    currentProgramDesc: 'Live broadcast direct from the main stage with synchronized laser show and spatial audio.',
    currentProgramTime: '21:00 - 01:00',
    nextProgram: 'Club Chillout Afterhours',
    nextProgramTime: '01:00 - 04:00',
    resolution: '1080p 60FPS',
    viewerCount: '495K watching',
    isFavorite: false,
    schedule: [
      { time: '19:00', title: 'Festival Warmup Sessions', genre: 'Music', durationMinutes: 120 },
      { time: '21:00', title: 'Amsterdam Electronic Symphony', genre: 'Music', durationMinutes: 240 },
      { time: '01:00', title: 'Club Chillout Afterhours', genre: 'Music', durationMinutes: 180 }
    ]
  },
  {
    id: 'streamlay-comedy-hub',
    name: 'StreamLay Comedy Central',
    category: 'Entertainment',
    number: 620,
    logo: '✨',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    currentProgram: 'Stand-up Spotlight: Live from New York',
    currentProgramDesc: 'Top stand-up comedians perform an unhinged 90-minute live set in Greenwich Village.',
    currentProgramTime: '21:15 - 22:45',
    nextProgram: 'Late Night Sketch Hour',
    nextProgramTime: '22:45 - 23:45',
    resolution: '1080p',
    viewerCount: '275K watching',
    isFavorite: false,
    schedule: [
      { time: '20:00', title: 'Improv Battle Royale', genre: 'Entertainment', durationMinutes: 75 },
      { time: '21:15', title: 'Stand-up Spotlight: NY Live', genre: 'Entertainment', durationMinutes: 90 },
      { time: '22:45', title: 'Late Night Sketch Hour', genre: 'Entertainment', durationMinutes: 60 }
    ]
  }
];

export const GENRES = [
  'All Genres',
  'Anime',
  'Magical girl',
  'Idol',
  'Science fiction',
  'Action',
  'Sci-Fi',
  'Drama',
  'Thriller',
  'Comedy',
  'Horror',
  'Documentary',
  'Animation',
  'Crime',
  'Fantasy',
  'Mystery'
];

export const AVATARS = [
  { id: 'avatar-1', label: 'Cosmic Violet', gradient: 'from-purple-500 via-indigo-600 to-blue-600', icon: '🚀' },
  { id: 'avatar-2', label: 'Crimson Blade', gradient: 'from-pink-500 via-rose-600 to-red-600', icon: '⚔️' },
  { id: 'avatar-3', label: 'Neon Cyber', gradient: 'from-emerald-400 via-teal-500 to-cyan-600', icon: '👾' },
  { id: 'avatar-4', label: 'Solar Flare', gradient: 'from-amber-400 via-orange-500 to-rose-600', icon: '⚡' },
  { id: 'avatar-5', label: 'Midnight Shadow', gradient: 'from-slate-700 via-slate-800 to-black', icon: '🌌' }
];
