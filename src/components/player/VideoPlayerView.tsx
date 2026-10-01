import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CONTENT } from '../../data/mockContent';
import { Episode } from '../../types';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Volume1,
  Maximize,
  Minimize,
  Subtitles,
  Settings,
  SkipForward,
  ArrowLeft,
  Info,
  Check,
  FastForward,
  Keyboard,
  AlertCircle,
  RefreshCw,
  Sliders
} from 'lucide-react';

export const VideoPlayerView: React.FC = () => {
  const {
    activePlayback,
    stopPlayback,
    selectedContent,
    selectedEpisode,
    openPlayer,
    updateProgress,
    setActivePage,
    addToast
  } = useApp();

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [selectedQuality, setSelectedQuality] = useState<string>('Auto (4K UHD)');
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>('English [CC]');
  const [selectedAudio, setSelectedAudio] = useState<string>('English Original (5.1)');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false);
  const [showSubtitlesMenu, setShowSubtitlesMenu] = useState<boolean>(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState<boolean>(false);
  const [showInfoOverlay, setShowInfoOverlay] = useState<boolean>(false);

  // Auto-hide controls timer
  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    if (isPlaying) {
      hideControlsTimeout.current = setTimeout(() => {
        if (!showSettingsMenu && !showSubtitlesMenu && !showShortcutsModal) {
          setShowControls(false);
        }
      }, 3500);
    }
  }, [isPlaying, showSettingsMenu, showSubtitlesMenu, showShortcutsModal]);

  useEffect(() => {
    const handleMouseMove = () => resetControlsTimer();
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    };
  }, [resetControlsTimer]);

  // Video event handlers
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      setCurrentTime(cur);
      const dur = videoRef.current.duration || 1;
      const pct = Math.floor((cur / dur) * 100);

      // Periodically update progress in context
      if (activePlayback?.contentId && Math.floor(cur) % 5 === 0) {
        updateProgress(activePlayback.contentId, pct, activePlayback.episodeId);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const seekRelative = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const togglePictureInPicture = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (videoRef.current) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      addToast('Picture-in-picture is not supported on this browser', 'warning');
    }
  };

  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSettingsMenu(false);
    addToast(`Playback speed set to ${speed}x`, 'info');
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if focus is on an input
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'arrowleft':
          e.preventDefault();
          seekRelative(-10);
          break;
        case 'arrowright':
          e.preventDefault();
          seekRelative(10);
          break;
        case 'arrowup':
          e.preventDefault();
          setVolume((v) => {
            const nv = Math.min(1, v + 0.1);
            if (videoRef.current) videoRef.current.volume = nv;
            return nv;
          });
          break;
        case 'arrowdown':
          e.preventDefault();
          setVolume((v) => {
            const nv = Math.max(0, v - 0.1);
            if (videoRef.current) videoRef.current.volume = nv;
            return nv;
          });
          break;
        case 'escape':
          if (isFullscreen) {
            document.exitFullscreen().catch(() => {});
          } else {
            handleExit();
          }
          break;
      }
      resetControlsTimer();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, volume, duration, isFullscreen, resetControlsTimer]);

  const handleExit = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    stopPlayback();
    if (selectedContent) {
      setActivePage('details');
    } else {
      setActivePage('home');
    }
  };

  // Format seconds to mm:ss or hh:mm:ss
  const formatTime = (timeInSec: number) => {
    if (isNaN(timeInSec)) return '00:00';
    const h = Math.floor(timeInSec / 3600);
    const m = Math.floor((timeInSec % 3600) / 60);
    const s = Math.floor(timeInSec % 60);
    if (h > 0) {
      return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    }
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Next episode logic
  const getNextEpisode = (): Episode | null => {
    if (!selectedContent || selectedContent.type !== 'series' || !selectedContent.seasons) return null;
    const allEpisodes = selectedContent.seasons.flatMap((s) => s.episodes);
    if (!selectedEpisode) return allEpisodes[1] || null;
    const currentIndex = allEpisodes.findIndex((e) => e.id === selectedEpisode.id);
    if (currentIndex !== -1 && currentIndex < allEpisodes.length - 1) {
      return allEpisodes[currentIndex + 1];
    }
    return null;
  };

  const nextEpisode = getNextEpisode();

  const handleNextEpisode = () => {
    if (selectedContent && nextEpisode) {
      openPlayer(selectedContent.id, nextEpisode.id);
      addToast(`Playing Next: ${nextEpisode.title}`, 'info');
    }
  };

  const videoSource = activePlayback?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center select-none overflow-hidden"
      onMouseMove={resetControlsTimer}
      onClick={() => {
        setShowSettingsMenu(false);
        setShowSubtitlesMenu(false);
      }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoSource}
        playsInline
        className="w-full h-full object-contain cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 pointer-events-none z-30">
          <div className="w-14 h-14 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin mb-3" />
          <span className="text-white text-xs font-semibold tracking-wider uppercase">Loading Stream...</span>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-30 p-6 text-center">
          <AlertCircle className="w-12 h-12 text-rose-500 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Video playback interrupted</h3>
          <p className="text-slate-400 text-sm max-w-md mb-4">
            The media stream could not be loaded. Please verify your connection and retry.
          </p>
          <button
            onClick={() => {
              setHasError(false);
              setIsLoading(true);
              if (videoRef.current) {
                videoRef.current.load();
                videoRef.current.play().catch(() => {});
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/30"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Playback</span>
          </button>
        </div>
      )}

      {/* Skip Intro Button (first 90s) */}
      {currentTime > 5 && currentTime < 90 && !activePlayback?.isLive && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            seekRelative(80);
            addToast('Skipped intro', 'info');
          }}
          className="absolute bottom-24 right-8 z-30 px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-purple-600 border border-white/20 hover:border-purple-500 text-white text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-2xl transition-all active:scale-95 animate-fade-in"
        >
          Skip Intro (+80s)
        </button>
      )}

      {/* Top Overlay Bar */}
      <div
        className={`absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-4 sm:p-6 flex items-center justify-between transition-opacity duration-300 ${
          showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleExit();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"
            aria-label="Exit player"
            title="Exit player (Esc)"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-white text-base sm:text-lg drop-shadow">
                {activePlayback?.title || 'StreamLay Stream'}
              </h2>
              {activePlayback?.isLive && (
                <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px] tracking-wider animate-pulse">
                  LIVE
                </span>
              )}
            </div>
            {activePlayback?.subtitle && (
              <p className="text-xs text-slate-300 drop-shadow">{activePlayback.subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowInfoOverlay(!showInfoOverlay);
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition-all"
            title="Title Information"
          >
            <Info className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowShortcutsModal(true);
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition-all"
            title="Keyboard Shortcuts"
          >
            <Keyboard className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info Popover Overlay */}
      {showInfoOverlay && selectedContent && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-20 left-6 z-40 max-w-sm p-4 rounded-2xl bg-slate-950/95 border border-white/20 backdrop-blur-xl shadow-2xl text-xs text-slate-300 animate-fade-in"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white text-sm">{selectedContent.title}</span>
            <span className="text-amber-400 font-bold">{selectedContent.score} ★</span>
          </div>
          <p className="text-slate-400 leading-relaxed mb-3">{selectedContent.description}</p>
          <div className="space-y-1 text-[11px] text-slate-500">
            <div>Cast: {selectedContent.cast.join(', ')}</div>
            <div>Director: {selectedContent.director}</div>
            <div>Format: {selectedQuality} · Dolby Atmos 5.1</div>
          </div>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-6 transition-opacity duration-300 ${
          showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Seek Bar (disabled for pure live streams) */}
        {!activePlayback?.isLive && (
          <div className="relative group/seeker mb-3">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 hover:h-2.5 bg-slate-700/80 rounded-lg cursor-pointer transition-all duration-150 outline-none"
            />
          </div>
        )}

        {/* Controls Row */}
        <div className="flex items-center justify-between gap-4">
          {/* Left Controls: Play, Rewind, Fast Forward, Volume, Time */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-2.5 rounded-full bg-white hover:bg-slate-200 text-slate-950 transition-all hover:scale-105 active:scale-95 shadow-lg"
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
            </button>

            {!activePlayback?.isLive && (
              <>
                <button
                  onClick={() => seekRelative(-10)}
                  className="p-2 text-slate-300 hover:text-white transition-colors"
                  title="Rewind 10s"
                  aria-label="Rewind 10 seconds"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => seekRelative(10)}
                  className="p-2 text-slate-300 hover:text-white transition-colors"
                  title="Forward 10s"
                  aria-label="Forward 10 seconds"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Volume */}
            <div className="flex items-center gap-2 group/volume ml-1">
              <button
                onClick={toggleMute}
                className="p-1.5 text-slate-300 hover:text-white transition-colors"
                title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-20 h-1 bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Time Indicator */}
            <div className="text-xs text-slate-300 font-medium tabular-nums ml-2">
              {activePlayback?.isLive ? (
                <span className="text-rose-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  LIVE STREAM
                </span>
              ) : (
                <span>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              )}
            </div>
          </div>

          {/* Right Controls: Next Episode, Subtitles, Settings, PiP, Fullscreen */}
          <div className="flex items-center gap-2">
            {nextEpisode && (
              <button
                onClick={handleNextEpisode}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white text-xs font-semibold border border-white/10 transition-all mr-1"
                title={`Next: ${nextEpisode.title}`}
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Next Episode</span>
              </button>
            )}

            {/* Subtitles Button & Popover */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSubtitlesMenu(!showSubtitlesMenu);
                  setShowSettingsMenu(false);
                }}
                className={`p-2 rounded-lg transition-colors ${
                  showSubtitlesMenu ? 'bg-purple-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
                title="Subtitles & Audio"
              >
                <Subtitles className="w-4 h-4" />
              </button>

              {showSubtitlesMenu && (
                <div className="absolute bottom-12 right-0 w-64 p-3 rounded-2xl bg-slate-950/95 border border-white/20 backdrop-blur-xl shadow-2xl text-xs z-50 animate-fade-in">
                  <div className="font-bold text-white mb-2 pb-1 border-b border-white/10">
                    Subtitles (CC)
                  </div>
                  <div className="space-y-1 mb-3">
                    {['Off', 'English [CC]', 'Spanish', 'French', 'German'].map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          setSelectedSubtitle(sub);
                          setShowSubtitlesMenu(false);
                          addToast(`Subtitles set to ${sub}`, 'info');
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                          selectedSubtitle === sub
                            ? 'bg-purple-600/30 text-purple-300 font-semibold'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span>{sub}</span>
                        {selectedSubtitle === sub && <Check className="w-3.5 h-3.5 text-purple-400" />}
                      </button>
                    ))}
                  </div>

                  <div className="font-bold text-white mb-2 pb-1 border-b border-white/10">
                    Audio Track
                  </div>
                  <div className="space-y-1">
                    {[
                      'English Original (5.1)',
                      'Spanish (Stereo)',
                      'French (Stereo)',
                      'Director Commentary'
                    ].map((aud) => (
                      <button
                        key={aud}
                        onClick={() => {
                          setSelectedAudio(aud);
                          setShowSubtitlesMenu(false);
                          addToast(`Audio track set to ${aud}`, 'info');
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                          selectedAudio === aud
                            ? 'bg-purple-600/30 text-purple-300 font-semibold'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{aud}</span>
                        {selectedAudio === aud && <Check className="w-3.5 h-3.5 text-purple-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quality & Speed Settings Popover */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSettingsMenu(!showSettingsMenu);
                  setShowSubtitlesMenu(false);
                }}
                className={`p-2 rounded-lg transition-colors ${
                  showSettingsMenu ? 'bg-purple-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
                title="Playback Settings"
              >
                <Settings className="w-4 h-4" />
              </button>

              {showSettingsMenu && (
                <div className="absolute bottom-12 right-0 w-56 p-3 rounded-2xl bg-slate-950/95 border border-white/20 backdrop-blur-xl shadow-2xl text-xs z-50 animate-fade-in">
                  <div className="font-bold text-white mb-2 pb-1 border-b border-white/10">
                    Video Quality
                  </div>
                  <div className="space-y-1 mb-3">
                    {['Auto (4K UHD)', '1080p Full HD', '720p HD', 'Data Saver (480p)'].map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setSelectedQuality(q);
                          setShowSettingsMenu(false);
                          addToast(`Quality set to ${q}`, 'info');
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                          selectedQuality === q
                            ? 'bg-purple-600/30 text-purple-300 font-semibold'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span>{q}</span>
                        {selectedQuality === q && <Check className="w-3.5 h-3.5 text-purple-400" />}
                      </button>
                    ))}
                  </div>

                  <div className="font-bold text-white mb-2 pb-1 border-b border-white/10">
                    Playback Speed
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                      <button
                        key={s}
                        onClick={() => changeSpeed(s)}
                        className={`py-1 rounded text-center font-medium ${
                          playbackSpeed === s
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Picture-in-Picture */}
            <button
              onClick={togglePictureInPicture}
              className="p-2 text-slate-300 hover:text-white transition-colors hidden sm:block"
              title="Picture in Picture"
            >
              <FastForward className="w-4 h-4" />
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 text-slate-300 hover:text-white transition-colors"
              title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showShortcutsModal && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fade-in"
        >
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-950 border border-white/15 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-purple-400" />
                Keyboard Shortcuts
              </h3>
              <button
                onClick={() => setShowShortcutsModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-900 border border-white/10"
              >
                Close (Esc)
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Play / Pause</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-white font-mono border border-white/10">
                  Space / K
                </kbd>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Fullscreen</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-white font-mono border border-white/10">
                  F
                </kbd>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Mute Toggle</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-white font-mono border border-white/10">
                  M
                </kbd>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Seek ±10s</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-white font-mono border border-white/10">
                  ← / →
                </kbd>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Volume ±10%</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-white font-mono border border-white/10">
                  ↑ / ↓
                </kbd>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Exit Player</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-white font-mono border border-white/10">
                  Esc
                </kbd>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
