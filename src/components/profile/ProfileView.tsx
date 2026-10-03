import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CONTENT, AVATARS } from '../../data/mockContent';
import { getLocalizedContent } from '../../i18n/translations';
import { ContentItem } from '../../types';
import { ContentCard } from '../common/ContentCard';
import {
  User,
  Settings,
  Bookmark,
  Clock,
  Sparkles,
  CreditCard,
  Globe,
  Bell,
  Sliders,
  LogOut,
  Edit3,
  Check,
  Shield,
  Film,
  Tv,
  Trash2
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    userName,
    setUserName,
    userProfile,
    updateUserProfile,
    myList,
    continueWatching,
    removeFromContinueWatching,
    signOut,
    addToast,
    language,
    setLanguage,
    isRtl,
    t
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'mylist' | 'continue' | 'settings'>('overview');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName || 'StreamLay User');

  const currentAvatar = AVATARS.find((a) => a.id === userProfile.avatarId) || AVATARS[0];

  const myListItems = MOCK_CONTENT.filter((c) => myList.includes(c.id)).map((c) => getLocalizedContent(c, language));
  const continueItems: ContentItem[] = [];
  for (const cw of continueWatching) {
    const raw = MOCK_CONTENT.find((c) => c.id === cw.contentId);
    if (raw) {
      const item = getLocalizedContent(raw, language);
      continueItems.push({ ...item, progress: cw.progress });
    }
  }

  const favoriteLive = myListItems.filter((c) => c.type === 'live');
  const favoriteSeries = myListItems.filter((c) => c.type === 'series');

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      setIsEditingName(false);
      addToast(t('toast.profileUpdated') || 'Profile name updated!', 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 min-h-screen">
      {/* Profile Header Hero Card */}
      <div className="relative rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900/80 border border-white/10 p-6 sm:p-8 mb-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with selector popup trigger */}
          <div className="relative group">
            <div
              className={`w-24 h-24 rounded-2xl bg-gradient-to-tr ${currentAvatar.gradient} flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-purple-950/50 border-2 border-white/20`}
            >
              {userName ? userName.charAt(0).toUpperCase() : currentAvatar.icon}
            </div>
          </div>

          {/* Profile details */}
          <div className="flex-1 text-center sm:text-left rtl:sm:text-right">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
              {isEditingName ? (
                <div className="flex items-center gap-2 max-w-sm mx-auto sm:mx-0">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 border border-purple-500 text-white font-bold text-lg outline-none focus:ring-2 focus:ring-purple-500/20"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center sm:justify-start rtl:sm:justify-start gap-3">
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {userName || 'StreamLay User'}
                  </h1>
                  <button
                    onClick={() => {
                      setTempName(userName);
                      setIsEditingName(true);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                    title={t('action.edit') || 'Edit Name'}
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <p className="text-slate-400 text-xs sm:text-sm mb-3">{userProfile.email}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start rtl:sm:justify-start gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-purple-600/30 text-purple-300 font-semibold border border-purple-500/40">
                {userProfile.subscriptionPlan}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
                {t('profile.activeMember')}
              </span>
            </div>
          </div>

          {/* Quick Sign Out Action */}
          <div className="shrink-0 flex items-center">
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/40 border border-white/10 hover:border-rose-500/40 text-slate-300 hover:text-rose-300 text-xs font-semibold transition-all active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('profile.switchSignOut')}</span>
            </button>
          </div>
        </div>

        {/* Avatar picker strip */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <span className="text-xs text-slate-400 font-medium block mb-2">{t('profile.chooseAvatarMood')}</span>
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            {AVATARS.map((av) => (
              <button
                key={av.id}
                onClick={() => updateUserProfile({ avatarId: av.id })}
                className={`p-1.5 rounded-xl border transition-all flex items-center gap-2 ${
                  userProfile.avatarId === av.id
                    ? 'border-purple-500 bg-purple-600/20'
                    : 'border-white/10 hover:border-white/30 bg-slate-900/60'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${av.gradient} flex items-center justify-center text-sm`}>
                  {av.icon}
                </div>
                <span className="text-xs font-medium text-slate-300 px-1">{av.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: t('profile.overview'), icon: User },
          { id: 'mylist', label: `${t('profile.myList')} (${myListItems.length})`, icon: Bookmark },
          { id: 'continue', label: `${t('profile.continueWatching')} (${continueItems.length})`, icon: Clock },
          { id: 'settings', label: t('profile.preferencesSettings'), icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Subscription & Account Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400">{t('profile.subscription')}</span>
                  <CreditCard className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1">
                  StreamLay Ultra 4K
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {t('profile.ultraDesc')}
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400">{t('profile.renews')} {userProfile.planRenewalDate}</span>
                <span className="text-purple-400 font-bold">$19.99/mo</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">{t('profile.contentStored')}</span>
                  <Bookmark className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1">
                  {myListItems.length} {t('profile.titlesSaved')}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {favoriteSeries.length} {t('profile.televisionSeries')} · {favoriteLive.length} {t('profile.liveChannels')}
                </p>
              </div>
              <div className="pt-3 border-t border-white/5">
                <button
                  onClick={() => setActiveTab('mylist')}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center gap-1"
                >
                  <span>{t('profile.viewMyList')}</span>
                  <span>{isRtl ? '←' : '→'}</span>
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-400">{t('profile.audioVisuals')}</span>
                  <Shield className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1">
                  {t('profile.ultraHdReady')}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {t('profile.displayLanguage')}: {language.toUpperCase()} · {t('profile.defaultAudioLanguage')}: {userProfile.audioLanguage}
                </p>
              </div>
              <div className="pt-3 border-t border-white/5">
                <button
                  onClick={() => setActiveTab('settings')}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center gap-1"
                >
                  <span>{t('profile.adjustPreferences')}</span>
                  <span>{isRtl ? '←' : '→'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Continue Watching Section */}
          {continueItems.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  {t('profile.jumpBackIn')}
                </h3>
                <button
                  onClick={() => setActiveTab('continue')}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
                >
                  {t('profile.seeAll')} ({continueItems.length})
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {continueItems.slice(0, 6).map((item) => (
                  <ContentCard key={item.id} item={item} showProgress={true} />
                ))}
              </div>
            </div>
          )}

          {/* Quick My List Section */}
          {myListItems.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-indigo-400" />
                  {t('profile.recentlyAdded')}
                </h3>
                <button
                  onClick={() => setActiveTab('mylist')}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
                >
                  {t('profile.seeAll')} ({myListItems.length})
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {myListItems.slice(0, 6).map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: My List */}
      {activeTab === 'mylist' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-white">
              {t('profile.myWatchlist')} ({myListItems.length})
            </h2>
            <div className="text-xs text-slate-400">
              {favoriteSeries.length} {t('profile.televisionSeries')} · {favoriteLive.length} {t('profile.liveChannels')}
            </div>
          </div>

          {myListItems.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-white/5 max-w-md mx-auto">
              <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="font-display text-lg font-bold text-white mb-1">{t('profile.emptyListTitle')}</h3>
              <p className="text-xs text-slate-400 mb-4">
                {t('profile.emptyListDesc')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {myListItems.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Continue Watching */}
      {activeTab === 'continue' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-white">
              {t('profile.continueWatching')} ({continueItems.length})
            </h2>
            <span className="text-xs text-slate-400">{t('profile.syncedAcrossDevices')}</span>
          </div>

          {continueItems.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-white/5 max-w-md mx-auto">
              <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="font-display text-lg font-bold text-white mb-1">{t('profile.noInProgressTitle')}</h3>
              <p className="text-xs text-slate-400 mb-4">
                {t('profile.noInProgressDesc')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {continueItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between gap-3 group"
                >
                  <div className="w-28 aspect-video rounded-lg overflow-hidden bg-slate-950 shrink-0 relative">
                    <img
                      src={item.backdropUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/60">
                      <div className="h-full bg-purple-500" style={{ width: `${item.progress || 0}%` }} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-semibold text-white text-sm truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-purple-400 font-medium">
                      {item.progress}% {t('profile.completed')}
                    </p>
                    <span className="text-[11px] text-slate-500">{item.type === 'movie' ? t('details.featureFilm') : t('details.originalSeries')}</span>
                  </div>

                  <button
                    onClick={() => removeFromContinueWatching(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                    title={t('profile.removeFromHistory')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Settings */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl bg-slate-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="font-display text-xl font-bold text-white pb-3 border-b border-white/10">
            {t('profile.playbackExperienceSettings')}
          </h2>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Display Language */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="font-semibold text-white block">{t('profile.displayLanguage')}</span>
                <span className="text-xs text-slate-400">{t('profile.displayLanguageDesc')}</span>
              </div>
              <select
                value={language}
                onChange={(e) => {
                  const newLang = e.target.value as 'en' | 'fr' | 'ar';
                  setLanguage(newLang);
                  updateUserProfile({ language: newLang === 'ar' ? 'Arabic (العربية)' : newLang === 'fr' ? 'French (Français)' : 'English (US)' });
                }}
                className="bg-slate-800 text-slate-200 border border-white/10 rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500 text-xs font-medium cursor-pointer"
              >
                <option value="en">English (US)</option>
                <option value="fr">Français (French)</option>
                <option value="ar">العربية (Arabic)</option>
              </select>
            </div>

            {/* Audio Track Language */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
              <div>
                <span className="font-semibold text-white block">{t('profile.defaultAudioLanguage')}</span>
                <span className="text-xs text-slate-400">{t('profile.defaultAudioLanguageDesc')}</span>
              </div>
              <select
                value={userProfile.audioLanguage}
                onChange={(e) => updateUserProfile({ audioLanguage: e.target.value })}
                className="bg-slate-800 text-slate-200 border border-white/10 rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500 text-xs"
              >
                <option value="English Original (Dolby Atmos)">English Original (Dolby Atmos)</option>
                <option value="French (Français)">French (Français)</option>
                <option value="Arabic (العربية)">Arabic (العربية)</option>
                <option value="Japanese (日本語)">Japanese (日本語)</option>
              </select>
            </div>

            {/* Subtitles Language */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
              <div>
                <span className="font-semibold text-white block">{t('profile.defaultSubtitles')}</span>
                <span className="text-xs text-slate-400">{t('profile.defaultSubtitlesDesc')}</span>
              </div>
              <select
                value={userProfile.subtitleLanguage}
                onChange={(e) => updateUserProfile({ subtitleLanguage: e.target.value })}
                className="bg-slate-800 text-slate-200 border border-white/10 rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500 text-xs"
              >
                <option value="English [CC]">English [CC]</option>
                <option value="French">French (Français)</option>
                <option value="Arabic">Arabic (العربية)</option>
                <option value="Off">Off</option>
              </select>
            </div>

            {/* Autoplay Next Episode */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
              <div>
                <span className="font-semibold text-white block">{t('profile.autoplayNextEpisode')}</span>
                <span className="text-xs text-slate-400">{t('profile.autoplayNextEpisodeDesc')}</span>
              </div>
              <button
                onClick={() => updateUserProfile({ autoPlayNext: !userProfile.autoPlayNext })}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  userProfile.autoPlayNext ? 'bg-purple-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    userProfile.autoPlayNext ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
              <div>
                <span className="font-semibold text-white block">{t('profile.releaseAlerts')}</span>
                <span className="text-xs text-slate-400">{t('profile.releaseAlertsDesc')}</span>
              </div>
              <button
                onClick={() => updateUserProfile({ notificationsEnabled: !userProfile.notificationsEnabled })}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  userProfile.notificationsEnabled ? 'bg-purple-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    userProfile.notificationsEnabled ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
