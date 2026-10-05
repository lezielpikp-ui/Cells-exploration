import React, { useState } from 'react';
import { CELL_ORGANELLES, Organelle } from '../data/cellData';
import { sound } from '../utils/audio';
import { Search, Sparkles, Filter, Volume2, Printer, Check, Eye, EyeOff } from 'lucide-react';

export const QuickReferenceTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'both' | 'plant-only'>('all');
  const [studyMode, setStudyMode] = useState<boolean>(false);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const handleToggleReveal = (id: string) => {
    sound.playPop();
    setRevealedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSpeech = (organelle: Organelle) => {
    sound.playPop();
    sound.speak(`${organelle.name}. Nickname: ${organelle.nickname}. ${organelle.description}`);
  };

  const handlePrint = () => {
    sound.playPop();
    window.print();
  };

  // Filtered list
  const filteredOrganelles = CELL_ORGANELLES.filter(item => {
    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'plant-only' && item.plantOnly) ||
      (filterType === 'both' && !item.plantOnly);

    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      item.name.toLowerCase().includes(term) ||
      item.nickname.toLowerCase().includes(term) ||
      item.function.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-800 bg-sky-100 px-3 py-1 rounded-full border border-sky-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Master Study Guide</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            Cell Parts Quick Reference Table 📋
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            A clean, easy-read reference table showing cell parts, their memorable nicknames, and their functions — with clear <span className="font-bold text-emerald-700">(plant only)</span> labels!
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playPop();
              setStudyMode(!studyMode);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              studyMode
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {studyMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-amber-600" />}
            <span>{studyMode ? 'Exit Flashcard Mode' : 'Flashcard Study Mode'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 transition-all cursor-pointer"
            title="Print Reference Table"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Print Table</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search part, nickname, or function..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <span className="text-xs font-bold text-slate-400 mr-1 hidden md:inline">Filter:</span>
          
          <button
            onClick={() => {
              sound.playPop();
              setFilterType('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filterType === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Parts ({CELL_ORGANELLES.length})
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setFilterType('both');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filterType === 'both'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Animal & Plant (8)
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setFilterType('plant-only');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filterType === 'plant-only'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🌱 Plant Only (2)
          </button>
        </div>

      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            {/* Table Head */}
            <thead>
              <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider">
                <th className="py-4 px-4 sm:px-6">Cell Part</th>
                <th className="py-4 px-4 sm:px-6">Fun Nickname</th>
                <th className="py-4 px-4 sm:px-6">What It Does (Function)</th>
                <th className="py-4 px-4 sm:px-6 whitespace-nowrap">Found In</th>
                <th className="py-4 px-4 sm:px-6 text-right">Listen</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
              {filteredOrganelles.length > 0 ? (
                filteredOrganelles.map((organelle, idx) => {
                  const isRevealed = revealedIds.has(organelle.id) || !studyMode;

                  return (
                    <tr
                      key={organelle.id}
                      className={`hover:bg-amber-50/40 transition-colors ${
                        organelle.plantOnly ? 'bg-emerald-50/30' : idx % 2 === 1 ? 'bg-slate-50/40' : ''
                      }`}
                    >
                      {/* Cell Part Column */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-heading font-extrabold text-slate-900 text-base flex items-center gap-2">
                          <span>{organelle.name}</span>
                          {organelle.plantOnly && (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                              (plant only)
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">
                          {organelle.category}
                        </div>
                      </td>

                      {/* Nickname Column */}
                      <td className="py-4 px-4 sm:px-6">
                        {isRevealed ? (
                          <div className="font-heading font-bold text-amber-900 text-sm">
                            ⭐ "{organelle.nickname}"
                          </div>
                        ) : (
                          <button
                            onClick={() => handleToggleReveal(organelle.id)}
                            className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-lg border border-amber-300 cursor-pointer"
                          >
                            Click to reveal nickname ❓
                          </button>
                        )}
                      </td>

                      {/* Function Column */}
                      <td className="py-4 px-4 sm:px-6">
                        {isRevealed ? (
                          <div>
                            <div className="font-medium text-slate-900">
                              {organelle.function}
                            </div>
                            <div className="text-xs text-slate-500 mt-1 italic">
                              Consistent phrasing: "{organelle.description}"
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleToggleReveal(organelle.id)}
                            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 cursor-pointer"
                          >
                            Click to reveal function ❓
                          </button>
                        )}
                      </td>

                      {/* Found In Column */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                        {organelle.plantOnly ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                            🌱 Plant Only
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            🐾 & 🌱 Both
                          </span>
                        )}
                      </td>

                      {/* Speech audio */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <button
                          onClick={() => handleSpeech(organelle)}
                          title={`Listen to ${organelle.name}`}
                          className="p-2 rounded-xl text-slate-400 hover:text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    No cell parts found matching "{searchTerm}". Try clearing your search!
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* Table Footer Summary */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>
            Showing <span className="font-bold text-slate-800">{filteredOrganelles.length}</span> of {CELL_ORGANELLES.length} cell components
          </div>
          <div className="font-semibold text-emerald-800 flex items-center gap-1.5">
            <span>💡 Remember:</span>
            <span>Cell Wall and Chloroplasts are ONLY in plant cells!</span>
          </div>
        </div>

      </div>

    </div>
  );
};
