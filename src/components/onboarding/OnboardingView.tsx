import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../i18n/translations';
import { Play, Sparkles, ArrowRight, ArrowLeft, ShieldCheck, Film, Globe } from 'lucide-react';

export const OnboardingView: React.FC = () => {
  const { setUserName, setActivePage, addToast, language, setLanguage, isRtl, t } = useApp();
  const [nameInput, setNameInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setError(t('onboarding.errorEmptyName'));
      return;
    }
    setUserName(trimmed);
    addToast(t('toast.welcome', { name: trimmed }), 'success');
    setActivePage('home');
  };

  const handleQuickStart = (sampleName: string) => {
    setUserName(sampleName);
    addToast(t('toast.welcome', { name: sampleName }), 'success');
    setActivePage('home');
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#07090e] px-4 py-12">
      {/* Background with blurred cinematic theater artwork and subtle dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/onboarding_cinema_bg_1790849672978.jpg"
          alt="StreamLay Cinema Theater"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter blur-sm scale-105 opacity-40 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/85 to-[#07090e]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
      </div>

      {/* Language Switcher pill in top right corner */}
      <div className={`absolute top-6 ${isRtl ? 'left-6' : 'right-6'} z-20 flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-xl`}>
        <Globe className="w-4 h-4 text-purple-400 ml-1.5 rtl:mr-1.5 rtl:ml-0" />
        {SUPPORTED_LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
              language === lang.code
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang.nativeName}
          </button>
        ))}
      </div>

      {/* Main Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-2xl bg-[#0d121f]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-950/40 text-center animate-fade-in">
        {/* StreamLay Plus Logo */}
        <div className="inline-flex items-center justify-center gap-2.5 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-600/40">
            <Play className="w-6 h-6 text-white fill-white ml-0.5 rtl:mr-0.5 rtl:ml-0" />
          </div>
          <span className="font-display font-black text-3xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
            StreamLay<span className="text-purple-400 font-extrabold">+</span>
          </span>
        </div>

        {/* Headings */}
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          {t('onboarding.welcome')}
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
          {t('onboarding.subtitle')}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left rtl:text-right">
          <div>
            <label htmlFor="name-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              {t('onboarding.whoIsWatching')}
            </label>
            <div className="relative">
              <input
                id="name-input"
                type="text"
                autoFocus
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  if (error) setError('');
                }}
                placeholder={t('onboarding.enterYourName')}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/15 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500 text-base transition-all outline-none"
              />
            </div>
            {error && (
              <p className="text-rose-400 text-xs mt-1.5 font-medium">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white text-base bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 active:scale-[0.98] transition-all shadow-lg shadow-purple-600/30"
          >
            <span>{t('onboarding.continue')}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Quick guest options for instant evaluation */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs text-slate-400 mb-3">{t('onboarding.quickStart')}</p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {['Alex Rivers', 'Jordan Lee', 'Elena Ward'].map((guest) => (
              <button
                key={guest}
                onClick={() => handleQuickStart(guest)}
                className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-purple-900/40 border border-white/10 hover:border-purple-500/40 text-xs font-medium text-slate-300 hover:text-white transition-all whitespace-nowrap"
              >
                {guest}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal feature cues */}
        <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Film className="w-3 h-3 text-purple-400" />
            4K HDR VOD
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Dolby Atmos
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{t('onboarding.liveTvChannels')}</span>
        </div>
      </div>
    </div>
  );
};
