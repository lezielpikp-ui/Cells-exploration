import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Microscope, BookOpen, HelpCircle, Puzzle, Table } from 'lucide-react';
import { sound } from '../utils/audio';

export type ActiveTab = 'home' | 'learn-animal' | 'learn-plant' | 'quiz' | 'match' | 'table';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isMuted, setIsMuted] = useState(sound.isMuted());

  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
    if (!next) {
      sound.playPop();
    }
  };

  const navItems: Array<{ id: ActiveTab; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Home', icon: <Microscope className="w-4 h-4" /> },
    { id: 'learn-animal', label: 'Animal Cell', icon: <BookOpen className="w-4 h-4 text-amber-500" /> },
    { id: 'learn-plant', label: 'Plant Cell', icon: <Sparkles className="w-4 h-4 text-emerald-500" /> },
    { id: 'quiz', label: 'Quiz (8 Qs)', icon: <HelpCircle className="w-4 h-4 text-violet-500" /> },
    { id: 'match', label: 'Match-Up Game', icon: <Puzzle className="w-4 h-4 text-rose-500" /> },
    { id: 'table', label: 'Reference Table', icon: <Table className="w-4 h-4 text-sky-500" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand title wordmark */}
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('home');
          }}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-teal-400 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-xl" role="img" aria-label="Microscope cell">🔬</span>
          </div>
          <div>
            <div className="font-heading text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
              Cell Explorer
            </div>
            <div className="text-[11px] font-medium text-emerald-600 -mt-0.5 tracking-wide">
              Living Biology Adventure
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navItems.map(item => {
            const isActive = activeTab === item.id || 
              (item.id === 'learn-animal' && activeTab === 'learn-animal') ||
              (item.id === 'learn-plant' && activeTab === 'learn-plant');

            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playPop();
                  setActiveTab(item.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-100/90 text-amber-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Sound toggle & Quick Action) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            title={isMuted ? 'Sound is OFF (Click to turn ON)' : 'Sound is ON (Click to Mute)'}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              isMuted
                ? 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 shadow-xs'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse-subtle" />}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Sound ON'}</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('quiz');
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Start Quiz</span>
          </button>
        </div>

      </div>

      {/* Mobile sub-navigation bar */}
      <div className="md:hidden flex items-center justify-around border-t border-amber-100 bg-amber-50/70 px-2 py-1.5 overflow-x-auto">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playPop();
                setActiveTab(item.id);
              }}
              className={`flex flex-col items-center py-1 px-2 text-[11px] font-semibold rounded-lg shrink-0 transition-colors ${
                isActive ? 'text-amber-900 bg-amber-200/70' : 'text-slate-600'
              }`}
            >
              {item.icon}
              <span className="mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
