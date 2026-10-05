import React, { useState, useEffect } from 'react';
import { MATCH_ITEMS, MatchPair } from '../data/cellData';
import { sound } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import { RotateCcw, CheckCircle2, Sparkles, ArrowRight, HelpCircle, AlertCircle } from 'lucide-react';

interface MatchUpGameProps {
  onGoToQuiz?: () => void;
}

export const MatchUpGame: React.FC<MatchUpGameProps> = ({ onGoToQuiz }) => {
  // Slots state: maps organelleId -> { nicknameId: string | null, functionId: string | null }
  const [placedSlots, setPlacedSlots] = useState<{
    [organelleId: string]: { nicknameId: string | null; functionId: string | null };
  }>({});

  // Active selected item in the bank (for click-to-place on touch/tablets)
  const [selectedBankItem, setSelectedBankItem] = useState<{
    type: 'nick' | 'func';
    id: string;
    text: string;
  } | null>(null);

  // Shuffled banks
  const [shuffledNicks, setShuffledNicks] = useState<MatchPair[]>([]);
  const [shuffledFuncs, setShuffledFuncs] = useState<MatchPair[]>([]);

  // Feedback banner state
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Initialize
  const initializeGame = () => {
    sound.playPop();
    const initialSlots: { [key: string]: { nicknameId: string | null; functionId: string | null } } = {};
    MATCH_ITEMS.forEach(item => {
      initialSlots[item.id] = { nicknameId: null, functionId: null };
    });
    setPlacedSlots(initialSlots);
    setShuffledNicks([...MATCH_ITEMS].sort(() => Math.random() - 0.5));
    setShuffledFuncs([...MATCH_ITEMS].sort(() => Math.random() - 0.5));
    setSelectedBankItem(null);
    setFeedback(null);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // Check if bank item is already placed
  const isNickPlaced = (id: string) => {
    return Object.values(placedSlots).some(slot => slot.nicknameId === id);
  };

  const isFuncPlaced = (id: string) => {
    return Object.values(placedSlots).some(slot => slot.functionId === id);
  };

  // Attempt to place an item into an organelle slot
  const handlePlaceItem = (organelleId: string, slotType: 'nick' | 'func', droppedItemId: string) => {
    const isCorrect = organelleId === droppedItemId;

    if (isCorrect) {
      sound.playMatch();
      setPlacedSlots(prev => {
        const next = {
          ...prev,
          [organelleId]: {
            ...prev[organelleId],
            [slotType === 'nick' ? 'nicknameId' : 'functionId']: droppedItemId
          }
        };

        // Check if all are completed
        const allCompleted = MATCH_ITEMS.every(
          item => next[item.id]?.nicknameId === item.id && next[item.id]?.functionId === item.id
        );

        if (allCompleted) {
          setTimeout(() => {
            sound.playFanfare();
            triggerConfetti();
          }, 350);
        }

        return next;
      });

      setFeedback({
        type: 'success',
        message: 'Perfect match! ✅'
      });
      setSelectedBankItem(null);
    } else {
      sound.playIncorrect();
      const targetOrganelle = MATCH_ITEMS.find(m => m.id === organelleId);
      setFeedback({
        type: 'error',
        message: `Try again — that doesn't match ${targetOrganelle?.organelleName}! 💡`
      });
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, type: 'nick' | 'func', id: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ type, id }));
    setSelectedBankItem({
      type,
      id,
      text: type === 'nick' ? MATCH_ITEMS.find(m => m.id === id)?.nickname || '' : MATCH_ITEMS.find(m => m.id === id)?.functionShort || ''
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, organelleId: string, slotType: 'nick' | 'func') => {
    e.preventDefault();
    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (!dataStr) return;
      const data = JSON.parse(dataStr);
      if (data.type === slotType) {
        handlePlaceItem(organelleId, slotType, data.id);
      } else {
        sound.playIncorrect();
        setFeedback({
          type: 'error',
          message: `Oops! That's a ${data.type === 'nick' ? 'nickname' : 'function'}! Drop it in the ${data.type === 'nick' ? 'Nickname' : 'Function'} column! 💡`
        });
      }
    } catch {
      // ignore
    }
  };

  // Handle clicking a slot when an item is selected from bank
  const handleSlotClick = (organelleId: string, slotType: 'nick' | 'func') => {
    sound.playPop();
    if (!selectedBankItem) return;

    if (selectedBankItem.type !== slotType) {
      sound.playIncorrect();
      setFeedback({
        type: 'error',
        message: `Oops! You selected a ${selectedBankItem.type === 'nick' ? 'nickname' : 'function'}. Tap a ${selectedBankItem.type === 'nick' ? 'Nickname' : 'Function'} slot! 💡`
      });
      return;
    }

    handlePlaceItem(organelleId, slotType, selectedBankItem.id);
  };

  // Count fully matched organelles
  const fullyMatchedCount = MATCH_ITEMS.filter(
    item => placedSlots[item.id]?.nicknameId === item.id && placedSlots[item.id]?.functionId === item.id
  ).length;

  const isGameWon = fullyMatchedCount === MATCH_ITEMS.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Title Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Match-Up Game</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
          Match Cell Part ➔ Nickname ➔ Function! 🧩
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-xl mx-auto">
          <strong>Drag and drop</strong> or <strong>tap</strong> the tiles from the bank below into the matching organelle slots!
        </p>
      </div>

      {/* Main Game Container */}
      <div className="bg-white rounded-3xl p-4 sm:p-8 border-2 border-rose-200 shadow-md">
        
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Completed Parts:
            </span>
            <span className="font-heading text-xl font-black text-rose-600">
              {fullyMatchedCount} / {MATCH_ITEMS.length}
            </span>
            <div className="flex gap-1.5">
              {MATCH_ITEMS.map((item, idx) => {
                const complete = placedSlots[item.id]?.nicknameId === item.id && placedSlots[item.id]?.functionId === item.id;
                return (
                  <div
                    key={idx}
                    className={`w-3.5 h-3.5 rounded-full transition-all ${
                      complete ? 'bg-emerald-500 scale-110 shadow-xs' : 'bg-slate-200'
                    }`}
                    title={item.organelleName}
                  />
                );
              })}
            </div>
          </div>

          <button
            onClick={initializeGame}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Shuffle / Reset</span>
          </button>
        </div>

        {/* Feedback / Instructions banner */}
        {feedback ? (
          <div className={`mb-6 p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-bold flex items-center justify-between gap-3 animate-pulse-subtle ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}>
            <span>{feedback.message}</span>
            <button
              onClick={() => setFeedback(null)}
              className="text-xs underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        ) : (
          <div className="mb-6 p-3 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <span>
              💡 <strong>Tip for tablets:</strong> Tap any tile in the bank below, then tap its matching slot to place it!
            </span>
            {selectedBankItem && (
              <span className="font-bold bg-amber-200 px-2 py-0.5 rounded-md">
                Active: "{selectedBankItem.text}"
              </span>
            )}
          </div>
        )}

        {/* Matching Table / Workbench */}
        <div className="space-y-4 mb-8">
          {MATCH_ITEMS.map(item => {
            const currentSlot = placedSlots[item.id] || { nicknameId: null, functionId: null };
            const isNickMatched = currentSlot.nicknameId === item.id;
            const isFuncMatched = currentSlot.functionId === item.id;
            const isRowComplete = isNickMatched && isFuncMatched;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border-2 transition-all grid grid-cols-1 md:grid-cols-12 gap-3 items-center ${
                  isRowComplete
                    ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Organelle Name (4 cols) */}
                <div className="md:col-span-4 flex items-center justify-between pr-2">
                  <div>
                    <div className="font-heading font-extrabold text-slate-900 text-base flex items-center gap-2">
                      <span>{item.organelleName}</span>
                      {item.plantOnly && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Plant Only
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {isRowComplete ? '⭐ Fully Connected!' : 'Needs nickname & function'}
                    </div>
                  </div>

                  {isRowComplete && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                </div>

                {/* Nickname Drop Slot (4 cols) */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={e => handleDrop(e, item.id, 'nick')}
                  onClick={() => !isNickMatched && handleSlotClick(item.id, 'nick')}
                  className={`md:col-span-4 p-3 rounded-xl border-2 border-dashed transition-all flex items-center justify-between text-xs cursor-pointer min-h-[50px] ${
                    isNickMatched
                      ? 'bg-amber-100/80 border-amber-400 text-amber-950 font-bold border-solid'
                      : selectedBankItem?.type === 'nick'
                      ? 'bg-amber-50 border-amber-400 hover:bg-amber-100 animate-pulse'
                      : 'bg-white border-slate-300 text-slate-400 hover:border-amber-400'
                  }`}
                >
                  {isNickMatched ? (
                    <div className="flex items-center justify-between w-full">
                      <span>⭐ "{item.nickname}"</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
                    </div>
                  ) : (
                    <span className="italic">
                      {selectedBankItem?.type === 'nick' ? '👉 Tap to drop Nickname here' : 'Drop Nickname here...'}
                    </span>
                  )}
                </div>

                {/* Function Drop Slot (4 cols) */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={e => handleDrop(e, item.id, 'func')}
                  onClick={() => !isFuncMatched && handleSlotClick(item.id, 'func')}
                  className={`md:col-span-4 p-3 rounded-xl border-2 border-dashed transition-all flex items-center justify-between text-xs cursor-pointer min-h-[50px] ${
                    isFuncMatched
                      ? 'bg-teal-100/80 border-teal-400 text-teal-950 font-medium border-solid'
                      : selectedBankItem?.type === 'func'
                      ? 'bg-teal-50 border-teal-400 hover:bg-teal-100 animate-pulse'
                      : 'bg-white border-slate-300 text-slate-400 hover:border-teal-400'
                  }`}
                >
                  {isFuncMatched ? (
                    <div className="flex items-center justify-between w-full">
                      <span>⚙️ {item.functionShort}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
                    </div>
                  ) : (
                    <span className="italic">
                      {selectedBankItem?.type === 'func' ? '👉 Tap to drop Function here' : 'Drop Function here...'}
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Tile Banks (Nicknames and Functions) */}
        {!isGameWon ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
            
            {/* Nicknames Bank */}
            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-sm text-amber-950 flex items-center gap-1.5">
                  <span>🏷️ Nickname Tiles Bank</span>
                </h3>
                <span className="text-[11px] text-amber-800 font-medium">
                  {shuffledNicks.filter(n => !isNickPlaced(n.id)).length} left
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {shuffledNicks.map(item => {
                  const placed = isNickPlaced(item.id);
                  const isSelected = selectedBankItem?.type === 'nick' && selectedBankItem.id === item.id;

                  if (placed) return null;

                  return (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={e => handleDragStart(e, 'nick', item.id)}
                      onClick={() => {
                        sound.playPop();
                        setSelectedBankItem(prev =>
                          prev?.id === item.id ? null : { type: 'nick', id: item.id, text: item.nickname }
                        );
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all cursor-grab active:cursor-grabbing select-none shadow-2xs ${
                        isSelected
                          ? 'bg-amber-400 text-amber-950 border-amber-600 scale-105 ring-2 ring-amber-300'
                          : 'bg-white hover:bg-amber-100 text-amber-950 border-amber-300 hover:border-amber-400'
                      }`}
                    >
                      <span>"{item.nickname}"</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Functions Bank */}
            <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-sm text-teal-950 flex items-center gap-1.5">
                  <span>⚙️ Function Tiles Bank</span>
                </h3>
                <span className="text-[11px] text-teal-800 font-medium">
                  {shuffledFuncs.filter(f => !isFuncPlaced(f.id)).length} left
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {shuffledFuncs.map(item => {
                  const placed = isFuncPlaced(item.id);
                  const isSelected = selectedBankItem?.type === 'func' && selectedBankItem.id === item.id;

                  if (placed) return null;

                  return (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={e => handleDragStart(e, 'func', item.id)}
                      onClick={() => {
                        sound.playPop();
                        setSelectedBankItem(prev =>
                          prev?.id === item.id ? null : { type: 'func', id: item.id, text: item.functionShort }
                        );
                      }}
                      className={`p-2.5 rounded-xl text-xs font-medium border-2 transition-all cursor-grab active:cursor-grabbing select-none shadow-2xs flex items-center justify-between ${
                        isSelected
                          ? 'bg-teal-500 text-white border-teal-700 scale-102 ring-2 ring-teal-300'
                          : 'bg-white hover:bg-teal-100 text-teal-950 border-teal-300 hover:border-teal-400'
                      }`}
                    >
                      <span>{item.functionShort}</span>
                      <span className="text-[10px] text-teal-600 opacity-60">drag ➔</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        ) : (
          /* Victory Banner when All Completed */
          <div className="p-6 bg-gradient-to-r from-emerald-100 via-teal-100 to-amber-100 rounded-3xl border-2 border-emerald-400 text-center animate-pulse-subtle">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-3xl mx-auto mb-3 shadow-sm">
              🎉
            </div>
            <h3 className="font-heading text-2xl font-black text-emerald-950 mb-1">
              You Matched Every Single Part! Outstanding! ⭐⭐⭐
            </h3>
            <p className="text-slate-700 text-sm max-w-lg mx-auto mb-5">
              You have completely connected every cell organelle to its nickname and function! You are a master cell biologist!
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
