import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center px-4 py-6 md:py-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Top Branding Bar */}
      <div className="w-full max-w-[1280px] mb-6">
        <div className="flex items-center justify-between">
          {/* Left: Invisiblebots Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <span className="text-white font-black text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>IB</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-gray-950 animate-pulse" />
            </div>
            <div>
              <h1 className="text-white text-lg md:text-xl font-bold tracking-tight leading-tight">
                Invisiblebots
              </h1>
              <p className="text-cyan-400/80 text-[11px] font-semibold uppercase tracking-[0.2em]">
                Sports Streaming
              </p>
            </div>
          </div>

          {/* Right: Live indicator */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
              <span className="text-white/40 text-xs">Powered by</span>
              <span className="text-white/70 text-xs font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>IB Player</span>
            </div>
            <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/30 rounded-lg px-3 py-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-red-400 text-xs font-bold tracking-wide">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Match Title */}
      <div className="w-full max-w-[1280px] mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/20 p-2 rounded-lg">
            <span className="text-xl">🏏</span>
          </div>
          <div>
            <h2 className="text-white text-base md:text-lg font-semibold tracking-tight">
              India vs Australia
            </h2>
            <p className="text-gray-400 text-xs">
              Women's Test Match • Live Coverage • Willow TV
            </p>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <VideoPlayer />

      {/* Match Info */}
      <div className="w-full max-w-[1280px] mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <img
              src="https://flagcdn.com/w40/in.png"
              alt="India"
              className="w-8 h-6 object-cover rounded"
            />
            <span className="text-white font-semibold">India Women</span>
          </div>
          <p className="text-gray-400 text-sm">
            National women's cricket team
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center">
          <span className="text-gray-400 text-xs uppercase tracking-widest mb-1">
            Match Format
          </span>
          <span className="text-white font-bold text-lg">Test Match</span>
          <span className="text-cyan-400 text-xs mt-1">Multi-Day • Willow TV</span>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <img
              src="https://flagcdn.com/w40/au.png"
              alt="Australia"
              className="w-8 h-6 object-cover rounded"
            />
            <span className="text-white font-semibold">Australia Women</span>
          </div>
          <p className="text-gray-400 text-sm">
            National women's cricket team
          </p>
        </div>
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="w-full max-w-[1280px] mt-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5">
          <h3 className="text-white/60 text-xs uppercase tracking-widest mb-3 font-semibold">
            Keyboard Shortcuts
          </h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {[
              ['Space / K', 'Play / Pause'],
              ['← →', 'Seek ±10s'],
              ['↑ ↓', 'Volume'],
              ['M', 'Mute'],
              ['F', 'Fullscreen'],
            ].map(([key, desc]) => (
              <div key={key} className="flex items-center gap-2">
                <kbd className="bg-white/10 text-white/70 px-2 py-0.5 rounded text-xs font-mono border border-white/10">
                  {key}
                </kbd>
                <span className="text-gray-400 text-xs">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Branded Footer */}
      <footer className="w-full max-w-[1280px] mt-10 mb-4">
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 flex items-center justify-center">
              <span className="text-white font-black text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>IB</span>
            </div>
            <div>
              <p className="text-white/50 text-sm font-medium">
                Built by <span className="text-cyan-400 font-semibold">Invisiblebots</span>
              </p>
              <p className="text-white/25 text-[10px]">
                Next-Gen Sports Streaming Technology
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/20 text-xs">
              © {new Date().getFullYear()} Invisiblebots
            </span>
            <span className="text-white/10">•</span>
            <span className="text-white/20 text-xs">
              All rights reserved
            </span>
            <span className="text-white/10">•</span>
            <span className="text-cyan-400/40 text-xs font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              IB Player v1.0
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
