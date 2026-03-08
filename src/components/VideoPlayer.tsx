import React, { useRef, useState, useEffect, useCallback } from 'react';
import Hls from 'hls.js';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  SkipBack,
  SkipForward,
  Loader2,
} from 'lucide-react';

const VIDEO_URL =
  'https://amg01269-amg01269c1-sportstribal-emea-5204.playouts.now.amagi.tv/ts-eu-w1-n2/playlist/amg01269-willowtvfast-willowplus-sportstribalemea/playlist.m3u8';

const formatTime = (seconds: number): string => {
  if (!isFinite(seconds) || isNaN(seconds)) return '00:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [qualityLevels, setQualityLevels] = useState<{ height: number; bitrate: number; index: number }[]>([]);
  const [currentQuality, setCurrentQuality] = useState(-1); // -1 = auto
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPos, setHoverPos] = useState(0);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    setShowControls(true);
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
        setShowQualityMenu(false);
      }
    }, 3500);
  }, [isPlaying]);

  // Initialize HLS
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
      });
      hlsRef.current = hls;

      hls.loadSource(VIDEO_URL);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
        const levels = data.levels.map((level, index) => ({
          height: level.height,
          bitrate: level.bitrate,
          index,
        }));
        // Sort by height descending
        levels.sort((a, b) => b.height - a.height);
        setQualityLevels(levels);
        setIsLoading(false);
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_event, data) => {
        if (hls.autoLevelEnabled) {
          setCurrentQuality(-1);
        } else {
          setCurrentQuality(data.level);
        }
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = VIDEO_URL;
      video.addEventListener('loadedmetadata', () => {
        setIsLoading(false);
        video.play().catch(() => {});
      });
    }
  }, []);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };
    const onDurationChange = () => {
      setDuration(video.duration);
      setIsLive(!isFinite(video.duration));
    };
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);
    const onVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('durationchange', onDurationChange);
    video.addEventListener('waiting', onWaiting);
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('volumechange', onVolumeChange);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('durationchange', onDurationChange);
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('volumechange', onVolumeChange);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const video = videoRef.current;
      if (!video) return;
      resetInactivityTimer();

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          video.paused ? video.play() : video.pause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          video.currentTime = Math.min(duration, video.currentTime + 10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          video.volume = Math.min(1, video.volume + 0.1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          video.volume = Math.max(0, video.volume - 0.1);
          break;
        case 'm':
          e.preventDefault();
          video.muted = !video.muted;
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [duration, resetInactivityTimer]);

  // Fullscreen change detection
  useEffect(() => {
    const handler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // Mouse movement on container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = () => resetInactivityTimer();
    const onLeave = () => {
      if (isPlaying) {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        inactivityTimer.current = setTimeout(() => {
          setShowControls(false);
          setShowQualityMenu(false);
        }, 2000);
      }
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    container.addEventListener('touchstart', onMove);

    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      container.removeEventListener('touchstart', onMove);
    };
  }, [isPlaying, resetInactivityTimer]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.paused ? video.play() : video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const val = parseFloat(e.target.value);
    video.volume = val;
    video.muted = val === 0;
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const bar = progressRef.current;
    if (!video || !bar || isLive) return;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * duration;
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    if (!bar || isLive) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverTime(ratio * duration);
    setHoverPos(e.clientX - rect.left);
  };

  const handleProgressLeave = () => {
    setHoverTime(null);
  };

  const changeQuality = (levelIndex: number) => {
    const hls = hlsRef.current;
    if (!hls) return;
    if (levelIndex === -1) {
      hls.currentLevel = -1; // auto
      setCurrentQuality(-1);
    } else {
      hls.currentLevel = levelIndex;
      setCurrentQuality(levelIndex);
    }
    setShowQualityMenu(false);
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  };

  const goLive = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.seekable.length > 0) {
      video.currentTime = video.seekable.end(video.seekable.length - 1);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedProgress = duration > 0 ? (buffered / duration) * 100 : 0;

  const getQualityLabel = (height: number): string => {
    if (height >= 2160) return '4K';
    if (height >= 1440) return '1440p';
    if (height >= 1080) return '1080p';
    if (height >= 720) return '720p';
    if (height >= 480) return '480p';
    if (height >= 360) return '360p';
    if (height >= 240) return '240p';
    return `${height}p`;
  };

  const currentQualityLabel = (): string => {
    if (currentQuality === -1) {
      const hls = hlsRef.current;
      if (hls && hls.currentLevel >= 0 && hls.levels[hls.currentLevel]) {
        return `Auto (${getQualityLabel(hls.levels[hls.currentLevel].height)})`;
      }
      return 'Auto';
    }
    const level = qualityLevels.find((l) => l.index === currentQuality);
    return level ? getQualityLabel(level.height) : 'Auto';
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[1280px] mx-auto bg-black rounded-xl overflow-hidden shadow-2xl shadow-black/50 group select-none ${
        showControls ? 'cursor-default' : 'cursor-none'
      }`}
      style={{ aspectRatio: '16/9' }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('.controls-area')) return;
        togglePlay();
        resetInactivityTimer();
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain bg-black"
        playsInline
        autoPlay
      />

      {/* Persistent Watermark - Always visible */}
      <div className="absolute top-3 right-3 z-40 pointer-events-none">
        <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-white/10">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 flex items-center justify-center shrink-0">
            <span className="text-white font-black text-[7px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>IB</span>
          </div>
          <span className="text-white/60 text-[10px] font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Invisiblebots</span>
        </div>
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20 pointer-events-none">
          <Loader2 className="w-14 h-14 text-white animate-spin" />
        </div>
      )}

      {/* Big Play Button (when paused & not loading) */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none gap-5">
          <div className="bg-gradient-to-br from-cyan-500/20 to-purple-700/20 backdrop-blur-md rounded-full p-6 border border-cyan-400/30 shadow-2xl shadow-cyan-500/20">
            <Play className="w-16 h-16 text-white fill-white" />
          </div>
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 flex items-center justify-center">
              <span className="text-white font-black text-[8px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>IB</span>
            </div>
            <span className="text-white/70 text-xs font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Invisiblebots Player</span>
          </div>
        </div>
      )}

      {/* Top Gradient Bar */}
      <div
        className={`controls-area absolute top-0 left-0 right-0 z-30 transition-all duration-500 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-gradient-to-b from-black/80 via-black/40 to-transparent px-5 pt-4 pb-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* IB Brand Logo */}
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 flex items-center justify-center shadow-lg shadow-cyan-500/30 shrink-0">
                <span className="text-white font-black text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>IB</span>
              </div>
              {/* Live Badge */}
              {isLive && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goLive();
                  }}
                  className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 transition px-3 py-1 rounded-md text-xs font-bold text-white tracking-wide"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  LIVE
                </button>
              )}
              <div>
                <h1 className="text-white text-sm md:text-base font-semibold tracking-wide">
                  🏏 IND vs AUS — Women's Test Match
                </h1>
                <p className="text-white/60 text-xs mt-0.5">
                  Invisiblebots • Live Cricket
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div
        className={`controls-area absolute bottom-0 left-0 right-0 z-30 transition-all duration-500 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-14 pb-4 px-4 md:px-5">
          {/* Progress Bar */}
          {!isLive && (
            <div
              ref={progressRef}
              className="relative h-2 group/progress cursor-pointer mb-4 mx-1"
              onClick={(e) => {
                e.stopPropagation();
                handleProgressClick(e);
              }}
              onMouseMove={handleProgressHover}
              onMouseLeave={handleProgressLeave}
            >
              {/* Hover time tooltip */}
              {hoverTime !== null && (
                <div
                  className="absolute -top-9 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-40"
                  style={{ left: hoverPos }}
                >
                  {formatTime(hoverTime)}
                </div>
              )}
              {/* Background Track */}
              <div className="absolute inset-0 bg-white/20 rounded-full overflow-hidden group-hover/progress:h-3 group-hover/progress:-top-0.5 transition-all">
                {/* Buffered */}
                <div
                  className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
                  style={{ width: `${bufferedProgress}%` }}
                />
                {/* Played */}
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {/* Thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity z-10"
                style={{ left: `${progress}%` }}
              />
            </div>
          )}

          {/* Live progress indicator */}
          {isLive && (
            <div className="relative h-1 mb-4 mx-1 rounded-full overflow-hidden bg-white/20">
              <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-r from-transparent to-red-500 rounded-full animate-pulse" />
            </div>
          )}

          {/* Controls Row */}
          <div className="flex items-center justify-between gap-2">
            {/* Left Controls */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Play / Pause */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="p-2 rounded-lg hover:bg-white/10 transition text-white"
                title={isPlaying ? 'Pause (K)' : 'Play (K)'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-white" />
                ) : (
                  <Play className="w-6 h-6 fill-white" />
                )}
              </button>

              {/* Skip Back */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  skip(-10);
                }}
                className="p-2 rounded-lg hover:bg-white/10 transition text-white hidden md:flex"
                title="Rewind 10s"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              {/* Skip Forward */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  skip(10);
                }}
                className="p-2 rounded-lg hover:bg-white/10 transition text-white hidden md:flex"
                title="Forward 10s"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              {/* Volume */}
              <div className="flex items-center gap-1 group/vol">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="p-2 rounded-lg hover:bg-white/10 transition text-white"
                  title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <div className="w-0 overflow-hidden group-hover/vol:w-24 transition-all duration-300">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    onClick={(e) => e.stopPropagation()}
                    className="w-20 h-1 accent-white cursor-pointer"
                  />
                </div>
              </div>

              {/* Time Display */}
              <span className="text-white/80 text-xs md:text-sm font-mono ml-1 tabular-nums">
                {isLive ? (
                  <span className="text-red-400 font-semibold text-xs">● LIVE</span>
                ) : (
                  `${formatTime(currentTime)} / ${formatTime(duration)}`
                )}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Quality Selector */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowQualityMenu((prev) => !prev);
                  }}
                  className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-white/10 transition text-white"
                  title="Quality"
                >
                  <Settings className={`w-5 h-5 transition-transform duration-300 ${showQualityMenu ? 'rotate-90' : ''}`} />
                  <span className="text-xs font-medium hidden md:inline">
                    {currentQualityLabel()}
                  </span>
                </button>

                {/* Quality Menu */}
                {showQualityMenu && (
                  <div
                    className="absolute bottom-full right-0 mb-2 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden min-w-[200px] z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                      <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                        Quality
                      </span>
                      <span className="text-cyan-400/50 text-[9px] font-bold tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        IB Player
                      </span>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => changeQuality(-1)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition hover:bg-white/10 ${
                          currentQuality === -1 ? 'text-cyan-400 font-semibold' : 'text-white/80'
                        }`}
                      >
                        <span>Auto</span>
                        {currentQuality === -1 && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        )}
                      </button>
                      {qualityLevels.map((level) => (
                        <button
                          key={level.index}
                          onClick={() => changeQuality(level.index)}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition hover:bg-white/10 ${
                            currentQuality === level.index ? 'text-cyan-400 font-semibold' : 'text-white/80'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {getQualityLabel(level.height)}
                            {level.height >= 1080 && (
                              <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded font-bold">
                                HD
                              </span>
                            )}
                          </span>
                          <span className="text-white/40 text-xs">
                            {(level.bitrate / 1000000).toFixed(1)} Mbps
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                className="p-2 rounded-lg hover:bg-white/10 transition text-white"
                title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5" />
                ) : (
                  <Maximize className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
