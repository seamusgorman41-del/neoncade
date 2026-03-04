import React, { useState, useEffect } from 'react';
import { Search, Gamepad2, X, Maximize2, ExternalLink, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // In a real app, we might fetch this, but here we import it
    setGames(gamesData);
  }, []);

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-green-500 selection:text-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setSelectedGame(null)}
          >
            <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Gamepad2 className="text-black" size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tighter uppercase italic">
              Neon<span className="text-green-500">Arcade</span>
            </h1>
          </div>

          {!selectedGame && (
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input
                type="text"
                placeholder="Search unblocked games..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-green-500/50 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60 hover:text-white"
            >
              <Maximize2 size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              {/* Mobile Search */}
              <div className="relative md:hidden">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  type="text"
                  placeholder="Search games..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-green-500/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Hero Section */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-green-900/20 to-black border border-white/5 p-8 md:p-12">
                <div className="relative z-10 max-w-2xl">
                  <span className="text-green-500 font-mono text-sm tracking-widest uppercase mb-4 block">Premium Unblocked Collection</span>
                  <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Play Anywhere, <br/>Stay <span className="text-green-500 italic">Unblocked.</span></h2>
                  <p className="text-white/60 text-lg mb-8">High-performance web games curated for the best experience. No downloads, no limits, just pure arcade fun.</p>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-green-500 text-black px-8 py-3 rounded-full font-bold hover:bg-green-400 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                      Explore All
                    </button>
                    <button className="bg-white/5 border border-white/10 px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                      Trending Now
                    </button>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-green-500/10 pointer-events-none" />
              </div>

              {/* Games Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <motion.div
                    key={game.id}
                    whileHover={{ y: -8 }}
                    className="group relative bg-[#151515] rounded-2xl overflow-hidden border border-white/5 hover:border-green-500/30 transition-all cursor-pointer"
                    onClick={() => setSelectedGame(game)}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img 
                        src={game.thumbnail} 
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">PLAY NOW</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-lg group-hover:text-green-500 transition-colors">{game.title}</h3>
                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono bg-white/5 px-2 py-1 rounded">{game.category}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredGames.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-white/40 text-lg italic">No games found matching your search...</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col h-[calc(100vh-12rem)]"
            >
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                >
                  <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                  Back to Arcade
                </button>
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold">{selectedGame.title}</h2>
                  <div className="h-4 w-px bg-white/10" />
                  <a 
                    href={selectedGame.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60 hover:text-white"
                    title="Open in new tab"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              <div className="flex-1 bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              
              <div className="mt-6 flex items-center justify-between text-white/40 text-sm font-mono">
                <div className="flex gap-6">
                  <span>CATEGORY: {selectedGame.category.toUpperCase()}</span>
                  <span>STATUS: ONLINE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  LIVE SERVER
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
              <Gamepad2 className="text-white/40" size={18} />
            </div>
            <h1 className="text-xl font-bold tracking-tighter uppercase italic opacity-50">
              NeonArcade
            </h1>
          </div>
          <p className="text-white/40 text-sm">© 2024 NeonArcade. All games are property of their respective owners.</p>
          <div className="flex gap-6 text-white/40 text-sm">
            <a href="#" className="hover:text-green-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-green-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-green-500 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
