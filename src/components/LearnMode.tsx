import React, { useState } from 'react';
import { CELL_ORGANELLES, Organelle } from '../data/cellData';
import { InteractiveCellDiagram } from './InteractiveCellDiagram';
import { sound } from '../utils/audio';
import { Volume2, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface LearnModeProps {
  initialCellType?: 'animal' | 'plant';
  onGoToQuiz?: () => void;
  onGoToMatch?: () => void;
}

export const LearnMode: React.FC<LearnModeProps> = ({
  initialCellType = 'animal',
  onGoToQuiz,
  onGoToMatch
}) => {
  const [cellType, setCellType] = useState<'animal' | 'plant'>(initialCellType);
  const [selectedId, setSelectedId] = useState<string>('mitochondria');
  const [viewMode, setViewMode] = useState<'diagram' | 'compare'>('diagram');

  const selectedOrganelle: Organelle =
    CELL_ORGANELLES.find(o => o.id === selectedId) || CELL_ORGANELLES[1];

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleSpeech = () => {
    sound.playPop();
    const textToSpeak = `${selectedOrganelle.name}. Nickname: ${selectedOrganelle.nickname}. ${selectedOrganelle.description} ${
      selectedOrganelle.plantOnly ? 'Remember, this is found only in plant cells!' : ''
    }`;
    sound.speak(textToSpeak);
  };

  // Filter available organelles for cell type
  const availableOrganelles = CELL_ORGANELLES.filter(o => {
    if (cellType === 'animal' && o.plantOnly) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header and Switcher Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Interactive Laboratory</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-semibold text-emerald-700">Learn Mode</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            Explore Living Cells 🔬
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
            Click any cell part in the diagram or pick from the list below to learn its special <span className="font-bold text-emerald-700">nickname</span> and what it does!
          </p>
        </div>

        {/* Big Switcher Pills */}
        <div className="flex items-center gap-2 p-1.5 bg-amber-100/80 rounded-2xl border border-amber-200 shrink-0 self-start md:self-auto">
          <button
            onClick={() => {
              sound.playPop();
              setCellType('animal');
              setViewMode('diagram');
              // If selected organelle is plant-only, switch to mitochondria
              if (selectedOrganelle.plantOnly) setSelectedId('mitochondria');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading text-sm font-bold transition-all cursor-pointer ${
              cellType === 'animal' && viewMode === 'diagram'
                ? 'bg-white text-amber-950 shadow-sm'
                : 'text-amber-800 hover:text-amber-950 hover:bg-white/60'
            }`}
          >
            <span>🐾 Animal Cell</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setCellType('plant');
              setViewMode('diagram');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading text-sm font-bold transition-all cursor-pointer ${
              cellType === 'plant' && viewMode === 'diagram'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-amber-800 hover:text-amber-950 hover:bg-white/60'
            }`}
          >
            <span>🌱 Plant Cell</span>
            <span className="text-[10px] bg-emerald-800/40 px-1.5 py-0.5 rounded-md text-emerald-100">Special</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setViewMode('compare');
            }}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-heading text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'compare'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compare</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'diagram' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center: Interactive Cartoon Diagram & Organelle Quick Pills (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Interactive SVG Diagram */}
            <InteractiveCellDiagram
              cellType={cellType}
              selectedOrganelleId={selectedId}
              onSelectOrganelle={handleSelect}
            />

            {/* Quick Picker Buttons */}
            <div className="bg-white rounded-2xl p-4 border border-amber-200/70 shadow-xs">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Select Organelle in {cellType === 'animal' ? 'Animal' : 'Plant'} Cell:
                </span>
                <span className="text-xs font-medium text-emerald-700">
                  {availableOrganelles.length} parts to discover
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {availableOrganelles.map(organelle => {
                  const isCur = organelle.id === selectedId;
                  return (
                    <button
                      key={organelle.id}
                      onClick={() => {
                        sound.playPop();
                        handleSelect(organelle.id);
                      }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isCur
                          ? 'bg-amber-500 text-white border-amber-600 shadow-sm scale-102'
                          : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      <span>{organelle.name}</span>
                      {organelle.plantOnly && (
                        <span className="text-[10px] px-1 py-0.2 bg-emerald-600 text-white rounded font-normal">
                          Plant Only
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Plant Only Notice for Animal Cell */}
            {cellType === 'animal' && (
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Missing something? </span>
                  <span>Animal cells do <strong>NOT</strong> have a <strong>Cell Wall</strong> or <strong>Chloroplasts</strong>! Switch to the <strong>Plant Cell</strong> above to explore those special armor and solar panel parts!</span>
                </div>
              </div>
            )}
          </div>

          {/* Right: Organelle Inspector Spotlight Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-md relative overflow-hidden">
              
              {/* Color Header Accent Stripe */}
              <div className={`h-2 -mt-6 -mx-6 mb-5 ${selectedOrganelle.accentBg}`} />

              {/* Plant Only Big Banner Alert */}
              {selectedOrganelle.plantOnly ? (
                <div className="mb-4 p-3 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center gap-2.5 text-emerald-950 animate-pulse-subtle">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    🌱
                  </div>
                  <div>
                    <div className="text-xs font-black tracking-wide uppercase text-emerald-700">
                      Plant Cell Exclusive!
                    </div>
                    <div className="text-xs font-bold">
                      Animal cells do NOT have this organelle!
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-500">
                  <span className="inline-flex items-center gap-1 text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Found in BOTH Animal & Plant Cells
                  </span>
                </div>
              )}

              {/* Title & Speech Button */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-900">
                    {selectedOrganelle.name}
                  </h2>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">
                    Category: {selectedOrganelle.category.toUpperCase()}
                  </div>
                </div>

                <button
                  onClick={handleSpeech}
                  title="Listen to description"
                  className="p-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition-all"
                  aria-label="Read description out loud"
                >
                  <Volume2 className="w-5 h-5 text-amber-800" />
                </button>
              </div>

              {/* Nickname Spotlight */}
              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  Helpful Nickname:
                </div>
                <div className="font-heading text-xl font-extrabold text-amber-950 mt-0.5">
                  ⭐ "{selectedOrganelle.nickname}"
                </div>
              </div>

              {/* Consistent Phrasing Box: "The [nickname] — [function]" */}
              <div className="mt-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  How to Remember (Consistent Phrasing):
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 font-medium text-sm leading-relaxed">
                  <span className="font-bold text-slate-900">"{selectedOrganelle.description}"</span>
                </div>
              </div>

              {/* Function Detail */}
              <div className="mt-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  What It Does (Function):
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {selectedOrganelle.function}
                </p>
              </div>

              {/* Memory Hook */}
              <div className="mt-4 p-3.5 bg-violet-50 rounded-2xl border border-violet-200 text-xs text-violet-950 flex items-start gap-2.5">
                <span className="text-lg">💡</span>
                <div>
                  <span className="font-bold">Memory Trick: </span>
                  <span>{selectedOrganelle.memoryHook}</span>
                </div>
              </div>

              {/* Quick Action Navigation */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-xs text-slate-400 font-medium">Ready to test yourself?</span>
                <div className="flex items-center gap-2">
                  {onGoToQuiz && (
                    <button
                      onClick={onGoToQuiz}
                      className="flex items-center gap-1 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <span>Take Quiz</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onGoToMatch && (
                    <button
                      onClick={onGoToMatch}
                      className="flex items-center gap-1 px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <span>Match Game</span>
                    </button>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* COMPARISON VIEW */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-2">
              Animal Cell vs. Plant Cell Showdown! ⚡
            </h2>
            <p className="text-slate-600 text-sm text-center mb-8">
              Notice the key differences: Plant cells have special extra layers and food-making factories that animal cells don't have!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Animal Cell Card */}
              <div className="p-6 rounded-3xl bg-amber-50/60 border-2 border-amber-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center text-2xl mb-4">
                    🐾
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
                    Animal Cells
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✔</span>
                      <span><strong>Shape:</strong> Round, flexible, and irregular.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✔</span>
                      <span><strong>Vacuoles:</strong> Small, multiple temporary storage bubbles.</span>
                    </li>
                    <li className="flex items-start gap-2 text-rose-700">
                      <span className="font-bold">❌</span>
                      <span><strong>NO Cell Wall:</strong> Animals can bend, run, and flex!</span>
                    </li>
                    <li className="flex items-start gap-2 text-rose-700">
                      <span className="font-bold">❌</span>
                      <span><strong>NO Chloroplasts:</strong> Animals must eat food for energy!</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    sound.playPop();
                    setCellType('animal');
                    setViewMode('diagram');
                  }}
                  className="mt-6 w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-heading font-bold text-sm rounded-xl transition-colors cursor-pointer text-center"
                >
                  Explore Animal Cell Diagram →
                </button>
              </div>

              {/* Plant Cell Card */}
              <div className="p-6 rounded-3xl bg-emerald-50/80 border-2 border-emerald-400 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-200 text-emerald-950 flex items-center justify-center text-2xl mb-4">
                    🌱
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
                    Plant Cells
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✔</span>
                      <span><strong>Shape:</strong> Rigid rectangular, box-like sturdy shape.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✔</span>
                      <span><strong>Vacuole:</strong> One GIANT central vacuole filled with water.</span>
                    </li>
                    <li className="flex items-start gap-2 text-emerald-800 font-bold bg-emerald-100/60 p-1.5 rounded-lg border border-emerald-300">
                      <span>⭐</span>
                      <span><strong>HAS Cell Wall:</strong> Tough cellulose armor to stand tall!</span>
                    </li>
                    <li className="flex items-start gap-2 text-emerald-800 font-bold bg-emerald-100/60 p-1.5 rounded-lg border border-emerald-300">
                      <span>⭐</span>
                      <span><strong>HAS Chloroplasts:</strong> Green solar panels for photosynthesis!</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    sound.playPop();
                    setCellType('plant');
                    setViewMode('diagram');
                  }}
                  className="mt-6 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-sm rounded-xl transition-colors cursor-pointer text-center"
                >
                  Explore Plant Cell Diagram →
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
