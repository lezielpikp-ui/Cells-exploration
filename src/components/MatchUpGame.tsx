import React, { useState, useEffect } from 'react';
import { MATCH_ITEMS, MatchPair } from '../data/cellData';
import { sound } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import { RotateCcw, Check, Sparkles, Trophy, HelpCircle, ArrowRight } from 'lucide-react';

interface MatchUpGameProps {
  onGoToQuiz?: () => void;
}

export const MatchUpGame: React.FC<MatchUpGameProps> = ({ onGoToQuiz }) => {
  // Shuffled items for each column
  const [parts, setParts] = useState<MatchPair[]>([]);
  const [nicknames, setNicknames] = useState<MatchPair[]>([]);
  const [functions, setFunctions] = useState<MatchPair[]>([]);

  // Selected state for tap-to-match
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [selectedNickId, setSelectedNickId] = useState<string | null>(null);
  const [selectedFuncId, setSelectedFuncId] = useState<string | null>(null);

  // Completed matches (set of match IDs that are successfully matched)
  const [completedMatches, setCompletedMatches] = useState<Set<string>>(new Set());

  // Error shake flash state
  const [errorFlash, setErrorFlash] = useState<boolean>(false);

  // Initialize and shuffle
  const initializeGame = () => {
    sound.playPop();
    const shuffledParts = [...MATCH_ITEMS].sort(() => Math.random() - 0.5);
    const shuffledNicks = [...MATCH_ITEMS].sort(() => Math.random() - 0.5);
    const shuffledFuncs = [...MATCH_ITEMS].sort(() => Math.random() - 0.5);

    setParts(shuffledParts);
    setNicknames(shuffledNicks);
    setFunctions(shuffledFuncs);
    setCompletedMatches(new Set());
    setSelectedPartId(null);
    setSelectedNickId(null);
    setSelectedFuncId(null);
    setErrorFlash(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // Check if a completed set is formed
  useEffect(() => {
    if (selectedPartId && selectedNickId && selectedFuncId) {
      if (selectedPartId === selectedNickId && selectedNickId === selectedFuncId) {
        // MATCH SUCCESS!
        sound.playMatch();
        setCompletedMatches(prev => {
          const next = new Set(prev);
          next.add(selectedPartId);
          if (next.size === MATCH_ITEMS.length) {
            // ALL COMPLETED!
            setTimeout(() => {
              sound.playFanfare();
              triggerConfetti();
            }, 300);
          }
          return next;
        });
        setSelectedPartId(null);
        setSelectedNickId(null);
        setSelectedFuncId(null);
      } else {
        // Mismatch!
        sound.playIncorrect();
        setErrorFlash(true);
        setTimeout(() => {
          setSelectedPartId(null);
          setSelectedNickId(null);
          setSelectedFuncId(null);
          setErrorFlash(false);
        }, 700);
      }
    }
  }, [selectedPartId, selectedNickId, selectedFuncId]);

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, type: 'part' | 'nick' | 'func', id: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ type, id }));
  };

  const handleDropOnSlot = (targetType: 'part' | 'nick' | 'func', targetId: string, e: React.DragEvent) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      if (!data || !data.id) return;

      if (data.type === 'part') setSelectedPartId(data.id);
      if (data.type === 'nick') setSelectedNickId(data.id);
      if (data.type === 'func') setSelectedFuncId(data.id);

      if (targetType === 'part') setSelectedPartId(targetId);
      if (targetType === 'nick') setSelectedNickId(targetId);
      if (targetType === 'func') setSelectedFuncId(targetId);
    } catch {
      // ignore
    }
  };

  const isGameWon = completedMatches.size === MATCH_ITEMS.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Title Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hands-On Match-Up Game</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
          Connect Part ➔ Nickname ➔ Function! 🧩
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-xl mx-auto">
          Tap or drag one card from each column to link the <strong>Organelle</strong>, its <strong>Nickname</strong>, and its <strong>Function</strong>!
        </p>
      </div>

      {/* Game Board */}
      <div className="bg-white rounded-3xl p-4 sm:p-8 border-2 border-rose-200 shadow-md relative">
        
        {/* Progress header & Restart */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Matched Pairs:
            </span>
            <span className="font-heading text-xl font-bold text-rose-600">
              {completedMatches.size} / {MATCH_ITEMS.length}
            </span>
            <div className="hidden sm:flex gap-1">
              {MATCH_ITEMS.map((_, i) => (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full transition-all ${
                    i < completedMatches.size ? 'bg-emerald-500 scale-110' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={initializeGame}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Shuffle / Reset</span>
          </button>
        </div>

        {/* Current Selection Status Bar */}
        <div className="mb-6 p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold">Active Trio:</span>
            <span className={`px-2 py-0.5 rounded-md font-semibold ${selectedPartId ? 'bg-amber-200 text-amber-950' : 'bg-white/60 text-slate-400'}`}>
              {selectedPartId ? MATCH_ITEMS.find(m => m.id === selectedPartId)?.organelleName : '1. Pick Part'}
            </span>
            <span>➔</span>
            <span className={`px-2 py-0.5 rounded-md font-semibold ${selectedNickId ? 'bg-amber-200 text-amber-950' : 'bg-white/60 text-slate-400'}`}>
              {selectedNickId ? MATCH_ITEMS.find(m => m.id === selectedNickId)?.nickname : '2. Pick Nickname'}
            </span>
            <span>➔</span>
            <span className={`px-2 py-0.5 rounded-md font-semibold ${selectedFuncId ? 'bg-amber-200 text-amber-950' : 'bg-white/60 text-slate-400'}`}>
              {selectedFuncId ? '3. Function Selected' : '3. Pick Function'}
            </span>
          </div>

          {errorFlash && (
            <span className="text-rose-600 font-bold animate-bounce">
              Oops! Those don't match — Try again! 💡
            </span>
          )}
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Column 1: Cell Part */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs">
                1
              </span>
              <h2 className="font-heading text-sm font-bold text-slate-800 uppercase tracking-wider">
                Cell Part (Organelle)
              </h2>
            </div>

            <div className="space-y-3">
              {parts.map(item => {
                const isMatched = completedMatches.has(item.id);
                const isSelected = selectedPartId === item.id;

                return (
                  <div
                    key={item.id}
                    draggable={!isMatched}
                    onDragStart={e => handleDragStart(e, 'part', item.id)}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => handleDropOnSlot('part', item.id, e)}
                    onClick={() => {
                      if (isMatched) return;
                      sound.playPop();
                      setSelectedPartId(prev => prev === item.id ? null : item.id);
                    }}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-2 select-none ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 opacity-80 cursor-default'
                        : isSelected
                        ? 'bg-amber-100 border-amber-500 shadow-sm scale-102 ring-2 ring-amber-300'
                        : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 shadow-2xs'
                    }`}
                  >
                    <div>
                      <div className="font-heading font-bold text-base text-slate-900">
                        {item.organelleName}
                      </div>
                      {item.plantOnly && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                          Plant Only
                        </span>
                      )}
                    </div>
                    {isMatched ? (
                      <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <span className="text-xs text-slate-400">⚡</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Nickname */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs">
                2
              </span>
              <h2 className="font-heading text-sm font-bold text-slate-800 uppercase tracking-wider">
                Fun Nickname
              </h2>
            </div>

            <div className="space-y-3">
              {nicknames.map(item => {
                const isMatched = completedMatches.has(item.id);
                const isSelected = selectedNickId === item.id;

                return (
                  <div
                    key={item.id}
                    draggable={!isMatched}
                    onDragStart={e => handleDragStart(e, 'nick', item.id)}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => handleDropOnSlot('nick', item.id, e)}
                    onClick={() => {
                      if (isMatched) return;
                      sound.playPop();
                      setSelectedNickId(prev => prev === item.id ? null : item.id);
                    }}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-2 select-none ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 opacity-80 cursor-default'
                        : isSelected
                        ? 'bg-amber-100 border-amber-500 shadow-sm scale-102 ring-2 ring-amber-300'
                        : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/40 shadow-2xs'
                    }`}
                  >
                    <div className="font-heading font-semibold text-sm text-slate-900">
                      "{item.nickname}"
                    </div>
                    {isMatched ? (
                      <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <span className="text-xs text-slate-400">🏷️</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 3: Function */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-900 flex items-center justify-center font-bold text-xs">
                3
              </span>
              <h2 className="font-heading text-sm font-bold text-slate-800 uppercase tracking-wider">
                Function (What it does)
              </h2>
            </div>

            <div className="space-y-3">
              {functions.map(item => {
                const isMatched = completedMatches.has(item.id);
                const isSelected = selectedFuncId === item.id;

                return (
                  <div
                    key={item.id}
                    draggable={!isMatched}
                    onDragStart={e => handleDragStart(e, 'func', item.id)}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => handleDropOnSlot('func', item.id, e)}
                    onClick={() => {
                      if (isMatched) return;
                      sound.playPop();
                      setSelectedFuncId(prev => prev === item.id ? null : item.id);
                    }}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-2 select-none ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 opacity-80 cursor-default'
                        : isSelected
                        ? 'bg-amber-100 border-amber-500 shadow-sm scale-102 ring-2 ring-amber-300'
                        : 'bg-white border-slate-200 hover:border-teal-300 hover:bg-teal-50/40 shadow-2xs'
                    }`}
                  >
                    <div className="text-xs font-medium text-slate-800 leading-snug">
                      {item.functionShort}
                    </div>
                    {isMatched ? (
                      <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <span className="text-xs text-slate-400">⚙️</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Victory Banner Overlay when All Matched */}
        {isGameWon && (
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-100 via-teal-100 to-amber-100 rounded-3xl border-2 border-emerald-400 text-center animate-pulse-subtle">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-3xl mx-auto mb-3 shadow-sm">
              🎉
            </div>
            <h3 className="font-heading text-2xl font-black text-emerald-950 mb-1">
              You Matched Every Single Part! Outstanding! ⭐⭐⭐
            </h3>
            <p className="text-slate-700 text-sm max-w-lg mx-auto mb-5">
              You know the parts, nicknames, and functions by heart! You are officially ready for any science test!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={initializeGame}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-heading font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Play Again (New Shuffle) 🔄
              </button>
              {onGoToQuiz && (
                <button
                  onClick={onGoToQuiz}
                  className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-heading font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Take the 8-Question Quiz</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
