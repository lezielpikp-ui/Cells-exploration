import React from 'react';
import { Microscope, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

interface FooterProps {
  onSelectTab: (tab: 'home' | 'learn-animal' | 'learn-plant' | 'quiz' | 'match' | 'table') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="mt-16 bg-white border-t border-amber-200/80 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Brand Note */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
            🔬
          </div>
          <div>
            <div className="font-heading font-bold text-slate-900 text-base">
              Cell Explorer — The Living Cell Adventure
            </div>
            <div className="text-xs text-slate-500">
              Interactive science learning for students & classrooms · No login required
            </div>
          </div>
        </div>

        {/* Quick Nav links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
          <button
            onClick={() => {
              sound.playPop();
              onSelectTab('home');
            }}
            className="hover:text-emerald-700 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>·</span>
          <button
            onClick={() => {
              sound.playPop();
              onSelectTab('learn-animal');
            }}
            className="hover:text-emerald-700 transition-colors cursor-pointer"
          >
            Animal Cell
          </button>
          <span>·</span>
          <button
            onClick={() => {
              sound.playPop();
              onSelectTab('learn-plant');
            }}
            className="hover:text-emerald-700 transition-colors cursor-pointer"
          >
            Plant Cell
          </button>
          <span>·</span>
          <button
            onClick={() => {
              sound.playPop();
              onSelectTab('quiz');
            }}
            className="hover:text-emerald-700 transition-colors cursor-pointer"
          >
            Quiz Challenge
          </button>
          <span>·</span>
          <button
            onClick={() => {
              sound.playPop();
              onSelectTab('match');
            }}
            className="hover:text-emerald-700 transition-colors cursor-pointer"
          >
            Match-Up Game
          </button>
          <span>·</span>
          <button
            onClick={() => {
              sound.playPop();
              onSelectTab('table');
            }}
            className="hover:text-emerald-700 transition-colors cursor-pointer"
          >
            Reference Table
          </button>
        </div>

        {/* Encouraging Tag */}
        <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
          <span>Remember: Plant cells have</span>
          <span className="font-semibold text-emerald-700">Cell Wall & Chloroplasts! 🌱</span>
        </div>

      </div>
    </footer>
  );
};
