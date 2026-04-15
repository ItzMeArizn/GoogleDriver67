/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Gamepad2, X, Play, Home, Flame, Puzzle, Trophy, Settings, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import gamesData from './data/games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  const categories = useMemo(() => {
    const cats = new Set(gamesData.map(g => g.category));
    return Array.from(cats);
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handlePlayGame = (game) => {
    setSelectedGame(game);
    setIsPlayerOpen(true);
  };

  const leaderboard = [
    { rank: '01', name: 'Pixel Warrior', score: '1,240,500 pts', badge: 'PRO' },
    { rank: '02', name: 'CyberMage', score: '980,200 pts' },
    { rank: '03', name: 'NoobMaster69', score: '875,000 pts' },
    { rank: '04', name: 'ArcadeQueen', score: '760,000 pts' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#090912] text-white">
      {/* Header */}
      <header className="h-[72px] glass sticky top-0 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <h1 className="nebula-logo text-2xl font-black tracking-tighter">NEBULA ARCADE</h1>
        </div>

        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9494b8]" />
          <Input 
            placeholder="Search 500+ unblocked games..." 
            className="pl-10 bg-[#090912] border-[#7000ff] rounded-full text-[#9494b8] focus:ring-[#7000ff]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#9494b8] hidden sm:block">Logged in as Guest_92</span>
          <div className="w-8 h-8 rounded-full bg-[#ff007a] flex items-center justify-center shadow-[0_0_10px_#ff007a]">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-20 bg-[#15152a] border-r border-[#7000ff]/20 flex flex-col items-center py-6 gap-6 hidden sm:flex">
          <button 
            onClick={() => setActiveNav('home')}
            className={`nebula-nav-icon w-12 h-12 rounded-xl flex items-center justify-center ${activeNav === 'home' ? 'active' : ''}`}
          >
            <Home className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveNav('trending')}
            className={`nebula-nav-icon w-12 h-12 rounded-xl flex items-center justify-center ${activeNav === 'trending' ? 'active' : ''}`}
          >
            <Flame className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveNav('games')}
            className={`nebula-nav-icon w-12 h-12 rounded-xl flex items-center justify-center ${activeNav === 'games' ? 'active' : ''}`}
          >
            <Gamepad2 className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveNav('puzzles')}
            className={`nebula-nav-icon w-12 h-12 rounded-xl flex items-center justify-center ${activeNav === 'puzzles' ? 'active' : ''}`}
          >
            <Puzzle className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveNav('trophy')}
            className={`nebula-nav-icon w-12 h-12 rounded-xl flex items-center justify-center ${activeNav === 'trophy' ? 'active' : ''}`}
          >
            <Trophy className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveNav('settings')}
            className={`nebula-nav-icon w-12 h-12 rounded-xl flex items-center justify-center mt-auto ${activeNav === 'settings' ? 'active' : ''}`}
          >
            <Settings className="w-6 h-6" />
          </button>
        </nav>

        {/* Main Content Area */}
        <ScrollArea className="flex-1">
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Featured Hero */}
              <div className="nebula-hero rounded-3xl h-[360px] relative overflow-hidden group">
                <div className="absolute top-5 left-5 bg-[#ff007a] px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                  Trending Now
                </div>
                <div className="absolute bottom-6 left-6 max-w-md">
                  <h2 className="text-4xl font-black mb-2">Vortex Runner</h2>
                  <p className="text-[#9494b8] text-sm mb-4">Master the laws of physics in this hyper-speed neon odyssey.</p>
                  <Button 
                    className="bg-[#00dfd8] text-black hover:bg-[#00dfd8]/80 rounded-full px-8 font-bold"
                    onClick={() => handlePlayGame(gamesData[0])}
                  >
                    Play Fullscreen
                  </Button>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#7000ff]/20 to-transparent pointer-events-none" />
              </div>

              {/* Categories Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                <Button 
                  variant={selectedCategory === null ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="rounded-full border border-white/10"
                >
                  All Games
                </Button>
                {categories.map(cat => (
                  <Button 
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className="rounded-full border border-white/10"
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {/* Game Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredGames.map((game) => (
                    <motion.div
                      key={game.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="nebula-card group h-full flex flex-col overflow-hidden">
                        <div className="relative aspect-video bg-[#232344] overflow-hidden">
                          <img 
                            src={game.thumbnail} 
                            alt={game.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button 
                              size="icon" 
                              className="bg-[#00dfd8] text-black rounded-full"
                              onClick={() => handlePlayGame(game)}
                            >
                              <Play className="w-5 h-5 fill-current" />
                            </Button>
                          </div>
                        </div>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-bold">{game.title}</CardTitle>
                          <CardDescription className="text-[11px] text-[#9494b8]">
                            {game.category} • {Math.floor(Math.random() * 10)}k playing
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Sidebar - Leaderboard */}
            <div className="space-y-6">
              <div className="nebula-sidebar rounded-3xl p-6 border border-[#7000ff]/10">
                <h2 className="text-lg font-bold text-[#00dfd8] mb-6">Global Leaderboard</h2>
                <div className="space-y-4">
                  {leaderboard.map((item) => (
                    <div key={item.rank} className="flex items-center gap-4 pb-4 border-b border-white/5 last:border-0">
                      <div className="text-2xl font-black opacity-20 w-8">{item.rank}</div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold">{item.name}</h4>
                        <p className="text-[11px] text-[#9494b8]">{item.score}</p>
                      </div>
                      {item.badge && (
                        <div className="bg-[#2a2a4d] text-[#00dfd8] text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                          {item.badge}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center text-[10px] text-[#9494b8] leading-relaxed">
                  Unblocked Games Database v4.2.0<br />
                  Loaded {gamesData.length} entries from database.json
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Game Player Dialog */}
      <Dialog open={isPlayerOpen} onOpenChange={setIsPlayerOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 overflow-hidden bg-[#090912] border-[#7000ff]/20">
          <DialogHeader className="p-4 border-b border-[#7000ff]/20 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#7000ff] flex items-center justify-center shadow-[0_0_10px_#7000ff]">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <DialogTitle className="text-lg font-bold">{selectedGame?.title}</DialogTitle>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsPlayerOpen(false)}
              className="rounded-full hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogHeader>
          <div className="flex-1 bg-black relative">
            {selectedGame && (
              <iframe 
                src={selectedGame.url}
                className="w-full h-full border-0"
                title={selectedGame.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
