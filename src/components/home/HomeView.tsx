import React from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CONTENT } from '../../data/mockContent';
import { ContentItem } from '../../types';
import { HeroBanner } from '../common/HeroBanner';
import { ContentCarousel } from '../common/ContentCarousel';

export const HomeView: React.FC = () => {
  const { continueWatching } = useApp();

  const featuredItem = MOCK_CONTENT.find((item) => item.featured) || MOCK_CONTENT[0];

  // Continue Watching list
  const continueItems: ContentItem[] = [];
  for (const cw of continueWatching) {
    const item = MOCK_CONTENT.find((c) => c.id === cw.contentId);
    if (item) {
      continueItems.push({ ...item, progress: cw.progress });
    }
  }

  const trendingItems = MOCK_CONTENT.filter((c) => c.trending);
  const popularMovies = MOCK_CONTENT.filter((c) => c.type === 'movie' && (c.isPopular || c.score >= 8.5));
  const popularSeries = MOCK_CONTENT.filter((c) => c.type === 'series' && (c.isPopular || c.score >= 8.8));
  const newReleases = MOCK_CONTENT.filter((c) => c.isNew || c.year === 2026);
  const recommendedItems = MOCK_CONTENT.filter((c) => c.score >= 8.6).slice(0, 8);

  return (
    <div className="pb-24 pt-0">
      {/* Hero Banner */}
      <HeroBanner item={featuredItem} featuredCategory="StreamLay Original" />

      {/* Carousels container with negative margin to pull under hero fade */}
      <div className="relative z-30 -mt-10 sm:-mt-16 space-y-2">
        {/* Continue Watching (if any) */}
        {continueItems.length > 0 && (
          <ContentCarousel
            title="Continue Watching"
            subtitle="Resume where you left off"
            items={continueItems}
            showProgress={true}
            aspectRatio="landscape"
          />
        )}

        {/* Trending Now */}
        <ContentCarousel
          title="Trending Now"
          subtitle="Most-watched titles across StreamLay Plus today"
          items={trendingItems}
        />

        {/* Popular Movies */}
        <ContentCarousel
          title="Popular Movies"
          subtitle="Top rated blockbusters and Hollywood favorites"
          items={popularMovies}
        />

        {/* Popular Series */}
        <ContentCarousel
          title="Popular Series"
          subtitle="Binge-worthy seasons and viral releases"
          items={popularSeries}
        />

        {/* New Releases */}
        <ContentCarousel
          title="New Releases"
          subtitle="Freshly added films and season premieres"
          items={newReleases}
        />

        {/* Recommended For You */}
        <ContentCarousel
          title="Recommended For You"
          subtitle="Curated picks based on high global ratings"
          items={recommendedItems}
        />
      </div>
    </div>
  );
};
