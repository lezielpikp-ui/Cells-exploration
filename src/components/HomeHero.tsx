import React from 'react';
import { sound } from '../utils/audio';
import { Sparkles, ArrowRight, HelpCircle, Puzzle, Table, BookOpen, ShieldCheck } from 'lucide-react';
import heroImg from '../assets/images/hero_cell_explorer_1791189995249.jpg';
import animalCellImg from '../assets/images/animal-cell.jpg'; // 👈 ADD correct path
import plantCellImg from '../assets/images/plant-cell.jpg';   // 👈 ADD correct path

interface HomeHeroProps {
  onSelectAnimal: () => void;
  onSelectPlant: () => void;
  onSelectQuiz: () => void;
  onSelectMatch: () => void;
  onSelectTable: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onSelectAnimal,
  onSelectPlant,
  onSelectQuiz,
  onSelectMatch,
  onSelectTable,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Hero Intro Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-amber-100 via-orange-50 to-emerald-100 p-6 sm:p-10 lg:p-12 border-3 border-amber-300 shadow-lg overflow-hidden mb-12">
        
        {/* Decorative background circles */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-200/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-200/50 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Text Zone */}
          <div className="lg:col-span-7">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-xs border border-amber-300 shadow-xs mb-4">
              <span className="text-xl">🔬</span>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Welcome Young Scientists!
              </span>
            </div>

            {/* Bright, colourful title */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
              <span className="text-amber-500">Cell</span>{' '}
              <span className="text-emerald-600">Explorer</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-slate-800 font-extrabold mt-1">
                The Living Cell Adventure! 🚀
              </span>
            </h1>

            {/* Short welcome prompt */}
            <p className="mt-4 text-base sm:text-xl font-medium text-slate-700 leading-relaxed max-w-xl">
              "Hi Scientist! Let’s explore the amazing parts that make up living cells — and what each one does!"
            </p>

            {/* Sub-text reminder */}
            <p className="mt-2 text-sm text-slate-600 font-normal">
              Every organelle has a special superpower nickname: discover <span className="font-semibold text-amber-700">"The Powerhouse"</span>, <span className="font-semibold text-purple-700">"The Brain"</span>, and see why <span className="font-semibold text-emerald-800">"The Armor"</span> is only in plants!
            </p>

            {/* Two Big Primary Choice Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  sound.playPop();
                  onSelectAnimal();
                }}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-heading font-black text-lg shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <span className="text-2xl">🐾</span>
                <span>Animal Cell</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  onSelectPlant();
                }}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-heading font-black text-lg shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <span className="text-2xl">🌱</span>
                <span>Plant Cell</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>
            </div>

          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden border-4 border-white shadow-xl rotate-1 hover:rotate-0 transition-transform duration-300">
              <img
                src={heroImg}
                alt="Cell Explorer Friendly Science Adventure"
                className="w-full h-auto object-cover aspect-[16/9]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-xs p-2.5 rounded-2xl shadow-xs border border-amber-200 text-center">
                <span className="text-xs font-bold text-slate-800">
                  Ready to discover the secrets of life? Jump in! 🌟
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Two Big Feature Action Cards: Animal Cell vs Plant Cell */}
      <div className="mb-14">
        <div className="text-center mb-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
            Choose Your Cell Adventure
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Tap a card below to launch the interactive cartoon diagram and explore every part!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Animal Cell */}
          <div
            onClick={() => {
              sound.playPop();
              onSelectAnimal();
            }}
            className="group bg-white rounded-3xl p-6 border-3 border-amber-200 hover:border-amber-400 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative rounded-2xl overflow-hidden mb-5 border-2 border-amber-100 aspect-[4/3] bg-amber-50">
                <img
                  src={animalCellImg}
                  alt="Cartoon Animal Cell Diagram"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-amber-500 text-white font-heading font-bold text-xs px-3 py-1 rounded-full shadow-xs">
                  🐾 Animal Cell
                </div>
              </div>

              <h3 className="font-heading text-2xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Explore the Animal Cell
              </h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Meet the round, squishy cell that makes up humans, puppies, and birds! Discover the Mighty Mitochondria powerhouse, the Brain nucleus, and the Gatekeeper membrane.
              </p>

              {/* Quick tags */}
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-xl">
                  ⚡ Mitochondria Powerhouse
                </span>
                <span className="bg-purple-50 text-purple-900 border border-purple-200 px-2.5 py-1 rounded-xl">
                  🧠 Brain Nucleus
                </span>
                <span className="bg-sky-50 text-sky-900 border border-sky-200 px-2.5 py-1 rounded-xl">
                  🛡️ Security Gatekeeper
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700">8 interactive parts</span>
              <span className="inline-flex items-center gap-1 font-heading text-sm font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
                Open Animal Cell <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Card 2: Plant Cell */}
          <div
            onClick={() => {
              sound.playPop();
              onSelectPlant();
            }}
            className="group bg-white rounded-3xl p-6 border-3 border-emerald-300 hover:border-emerald-500 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative rounded-2xl overflow-hidden mb-5 border-2 border-emerald-100 aspect-[4/3] bg-emerald-50">
                <img
                  src={plantCellImg}
                  alt="Cartoon Plant Cell Diagram"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-emerald-600 text-white font-heading font-bold text-xs px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <span>🌱 Plant Cell</span>
                  <span className="text-[10px] bg-emerald-700 px-1.5 py-0.2 rounded-md">Plant Only Features!</span>
                </div>
              </div>

              <h3 className="font-heading text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Explore the Plant Cell
              </h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Discover the sturdy green box cell that builds giant redwood trees and flowers! Features tough outer Cell Wall armor, green Solar Panel chloroplasts, and a giant water storage tank.
              </p>

              {/* Quick tags */}
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                <span className="bg-emerald-100 text-emerald-950 border border-emerald-300 px-2.5 py-1 rounded-xl font-bold">
                  ⭐ Armor Cell Wall (Plant Only)
                </span>
                <span className="bg-lime-100 text-lime-950 border border-lime-300 px-2.5 py-1 rounded-xl font-bold">
                  ☀️ Solar Chloroplast (Plant Only)
                </span>
                <span className="bg-sky-50 text-sky-900 border border-sky-200 px-2.5 py-1 rounded-xl">
                  💧 Giant Water Tank
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700">10 interactive parts</span>
              <span className="inline-flex items-center gap-1 font-heading text-sm font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                Open Plant Cell <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 3 Quick Activity Cards: Quiz, Match-Up, Reference Table */}
      <div>
        <div className="text-center mb-6">
          <h2 className="font-heading text-2xl font-extrabold text-slate-900">
            More Fun Ways to Learn! 🎯
          </h2>
          <p className="text-slate-600 text-sm mt-0.5">
            Test what you've learned and become a certified Cell Expert!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Quiz Challenge Card */}
          <div
            onClick={() => {
              sound.playPop();
              onSelectQuiz();
            }}
            className="group bg-white rounded-3xl p-6 border-2 border-violet-200 hover:border-violet-400 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                Quiz Challenge (8 Qs)
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Can you identify the powerhouse, the boss control room, and the plant armor? Instant feedback on every question with a score celebration!
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-bold text-violet-700">
              <span>8 Multiple Choice Questions</span>
              <span className="flex items-center gap-1">Start Quiz <ArrowRight className="w-3.5 h-3.5" /></span>
            </div>
          </div>

          {/* Match-Up Game Card */}
          <div
            onClick={() => {
              sound.playPop();
              onSelectMatch();
            }}
            className="group bg-white rounded-3xl p-6 border-2 border-rose-200 hover:border-rose-400 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Puzzle className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-rose-700 transition-colors">
                Match-Up Game
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Drag-and-drop or tap to connect: Organelle ➔ Nickname ➔ Function! Smooth, satisfying puzzle matching for touchscreens and laptops.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-bold text-rose-700">
              <span>Drag & Drop Matching</span>
              <span className="flex items-center gap-1">Play Game <ArrowRight className="w-3.5 h-3.5" /></span>
            </div>
          </div>

          {/* Reference Table Card */}
          <div
            onClick={() => {
              sound.playPop();
              onSelectTable();
            }}
            className="group bg-white rounded-3xl p-6 border-2 border-sky-200 hover:border-sky-400 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Table className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                Quick Reference Table
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Clean study table with all cell parts, nicknames, and simple descriptions. Includes flashcard study mode and printable classroom cheat-sheet!
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-bold text-sky-700">
              <span>Study Sheet & Flashcards</span>
              <span className="flex items-center gap-1">View Table <ArrowRight className="w-3.5 h-3.5" /></span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
