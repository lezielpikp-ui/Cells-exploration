import React from 'react';
import { Organelle } from '../data/cellData';
import { sound } from '../utils/audio';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface InteractiveCellDiagramProps {
  cellType: 'animal' | 'plant';
  selectedOrganelleId: string;
  onSelectOrganelle: (organelleId: string) => void;
}

export const InteractiveCellDiagram: React.FC<InteractiveCellDiagramProps> = ({
  cellType,
  selectedOrganelleId,
  onSelectOrganelle
}) => {
  const isSelected = (id: string) => selectedOrganelleId === id;

  const handleClick = (id: string) => {
    sound.playPop();
    onSelectOrganelle(id);
  };

  return (
    <div className="relative w-full aspect-[4/3] max-h-[500px] bg-gradient-to-b from-sky-50 to-amber-50/50 rounded-3xl p-3 sm:p-4 border-2 border-amber-200/80 shadow-md flex items-center justify-center overflow-hidden select-none">
      
      {/* Background cute grid dots */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#059669 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Banner Tag */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-xs border ${
          cellType === 'animal'
            ? 'bg-amber-100 text-amber-900 border-amber-300'
            : 'bg-emerald-100 text-emerald-900 border-emerald-300'
        }`}>
          {cellType === 'animal' ? '🐾 Animal Cell (Round & Flexible)' : '🌱 Plant Cell (Boxy & Sturdy)'}
        </span>

        {cellType === 'plant' && (
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-lime-200 text-lime-950 border border-lime-400 animate-pulse">
            <Sparkles className="w-3 h-3 text-emerald-700" />
            Features Cell Wall & Chloroplasts!
          </span>
        )}
      </div>

      {/* Hint text */}
      <div className="absolute bottom-3 left-3 right-3 text-center sm:text-left z-10 pointer-events-none">
        <span className="inline-block text-xs font-semibold bg-white/90 backdrop-blur-xs text-slate-700 px-3 py-1 rounded-xl shadow-xs border border-slate-200">
          👆 Tap or click any cell part to discover its nickname!
        </span>
      </div>

      {/* SVG Diagram Canvas */}
      {cellType === 'animal' ? (
        /* ANIMAL CELL SVG */
        <svg
          viewBox="0 0 600 480"
          className="w-full h-full max-h-[460px] filter drop-shadow-sm transition-all"
        >
          <defs>
            {/* Cytoplasm Jelly Gradient */}
            <radialGradient id="animalCytoplasm" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="70%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#7dd3fc" />
            </radialGradient>

            {/* Nucleus Gradient */}
            <radialGradient id="nucleusGrad" cx="40%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#d8b4fe" />
              <stop offset="60%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7e22ce" />
            </radialGradient>

            {/* Mitochondria Gradient */}
            <linearGradient id="mitoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="50%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>

            {/* Glow Filter for Active Selection */}
            <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#f59e0b" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* 1. Cell Membrane (Outer Border) */}
          <g
            onClick={() => handleClick('cell-membrane')}
            className="cursor-pointer transition-transform hover:opacity-95"
            tabIndex={0}
            role="button"
            aria-label="Cell Membrane"
          >
            {/* Outer Membrane border */}
            <path
              d="M 300,40 C 460,45 560,130 550,260 C 540,380 430,440 290,445 C 150,450 45,370 50,240 C 55,120 160,35 300,40 Z"
              fill="none"
              stroke={isSelected('cell-membrane') ? '#2563eb' : '#38bdf8'}
              strokeWidth={isSelected('cell-membrane') ? 14 : 9}
              className={isSelected('cell-membrane') ? 'animate-pulse' : ''}
            />
            {/* Inner Membrane accent line */}
            <path
              d="M 298,46 C 454,51 548,133 540,258 C 532,374 426,432 292,437 C 158,442 57,364 60,240 C 63,126 164,43 298,46 Z"
              fill="none"
              stroke="#0284c7"
              strokeWidth={2}
              strokeDasharray="6 4"
            />
          </g>

          {/* 2. Cytoplasm (Jelly Floor fill) */}
          <g
            onClick={() => handleClick('cytoplasm')}
            className="cursor-pointer transition-transform"
            tabIndex={0}
            role="button"
            aria-label="Cytoplasm"
          >
            <path
              d="M 298,48 C 450,53 540,134 532,256 C 524,370 422,428 290,433 C 160,438 65,360 68,240 C 71,130 166,45 298,48 Z"
              fill="url(#animalCytoplasm)"
              opacity={isSelected('cytoplasm') ? 0.95 : 0.8}
              stroke={isSelected('cytoplasm') ? '#0284c7' : 'none'}
              strokeWidth={isSelected('cytoplasm') ? 4 : 0}
            />
            {/* Friendly cytoplasm floating ripples */}
            <circle cx="150" cy="140" r="40" fill="#ffffff" opacity="0.25" />
            <circle cx="450" cy="340" r="35" fill="#ffffff" opacity="0.25" />
            <circle cx="420" cy="130" r="30" fill="#ffffff" opacity="0.25" />
          </g>

          {/* 3. Endoplasmic Reticulum (ER Highway) - Folds wrapped near nucleus */}
          <g
            onClick={() => handleClick('endoplasmic-reticulum')}
            className="cursor-pointer group"
            filter={isSelected('endoplasmic-reticulum') ? 'url(#activeGlow)' : undefined}
            tabIndex={0}
            role="button"
            aria-label="Endoplasmic Reticulum"
          >
            <path
              d="M 180,180 C 160,190 150,220 160,250 C 170,270 190,280 200,300"
              fill="none"
              stroke={isSelected('endoplasmic-reticulum') ? '#4f46e5' : '#818cf8'}
              strokeWidth={isSelected('endoplasmic-reticulum') ? 14 : 10}
              strokeLinecap="round"
            />
            <path
              d="M 160,165 C 135,185 125,230 140,265 C 150,290 180,310 185,325"
              fill="none"
              stroke={isSelected('endoplasmic-reticulum') ? '#6366f1' : '#a5b4fc'}
              strokeWidth={isSelected('endoplasmic-reticulum') ? 12 : 8}
              strokeLinecap="round"
            />
            <path
              d="M 140,150 C 110,180 100,235 120,280 C 135,310 165,335 170,350"
              fill="none"
              stroke={isSelected('endoplasmic-reticulum') ? '#4f46e5' : '#c7d2fe'}
              strokeWidth={isSelected('endoplasmic-reticulum') ? 10 : 7}
              strokeLinecap="round"
            />
          </g>

          {/* 4. Nucleus & Nucleolus (The Brain) */}
          <g
            onClick={() => handleClick('nucleus')}
            className="cursor-pointer group"
            filter={isSelected('nucleus') ? 'url(#activeGlow)' : undefined}
            tabIndex={0}
            role="button"
            aria-label="Nucleus"
          >
            {/* Outer nuclear envelope */}
            <circle
              cx="260"
              cy="235"
              r="68"
              fill="url(#nucleusGrad)"
              stroke={isSelected('nucleus') ? '#f59e0b' : '#6b21a8'}
              strokeWidth={isSelected('nucleus') ? 6 : 4}
              className="group-hover:scale-102 transition-transform origin-center"
            />
            {/* Pores */}
            <circle cx="210" cy="210" r="3" fill="#ffffff" opacity="0.6" />
            <circle cx="310" cy="220" r="3" fill="#ffffff" opacity="0.6" />
            <circle cx="280" cy="290" r="3" fill="#ffffff" opacity="0.6" />
            <circle cx="225" cy="275" r="3" fill="#ffffff" opacity="0.6" />

            {/* Inner Nucleolus */}
            <circle
              cx="250"
              cy="225"
              r="26"
              fill="#581c87"
              stroke="#e9d5ff"
              strokeWidth="2"
            />

            {/* Chromatin / DNA squiggles */}
            <path
              d="M 235,215 Q 245,205 255,215 T 265,225"
              stroke="#f3e8ff"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 275,255 Q 285,245 295,260 T 305,250"
              stroke="#e9d5ff"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            {/* Cute Cartoon Eyes & Smile on Nucleus */}
            <circle cx="242" cy="222" r="3" fill="#ffffff" />
            <circle cx="258" cy="222" r="3" fill="#ffffff" />
            <path d="M 246,230 Q 250,234 254,230" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          </g>

          {/* 5. Mitochondria (The Powerhouse) - Top Right & Bottom Right */}
          <g
            onClick={() => handleClick('mitochondria')}
            className="cursor-pointer group"
            filter={isSelected('mitochondria') ? 'url(#activeGlow)' : undefined}
            tabIndex={0}
            role="button"
            aria-label="Mitochondria"
          >
            {/* Mitochondria 1 (Top right) */}
            <g transform="translate(380, 110) rotate(25)">
              <ellipse
                cx="40"
                cy="22"
                rx="44"
                ry="24"
                fill="url(#mitoGrad)"
                stroke={isSelected('mitochondria') ? '#dc2626' : '#c2410c'}
                strokeWidth={isSelected('mitochondria') ? 5 : 3}
                className="group-hover:scale-105 transition-transform"
              />
              {/* Cristae wavy folds inside */}
              <path
                d="M 12,22 C 20,12 25,32 35,12 C 45,32 55,12 65,30"
                fill="none"
                stroke="#fff7ed"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 20,24 C 28,15 32,28 42,16 C 52,28 58,16 66,22"
                fill="none"
                stroke="#fed7aa"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>

            {/* Mitochondria 2 (Bottom right) */}
            <g transform="translate(360, 310) rotate(-35)">
              <ellipse
                cx="35"
                cy="20"
                rx="38"
                ry="21"
                fill="url(#mitoGrad)"
                stroke={isSelected('mitochondria') ? '#dc2626' : '#c2410c'}
                strokeWidth={isSelected('mitochondria') ? 5 : 3}
              />
              <path
                d="M 12,20 C 18,10 24,28 32,10 C 40,28 48,10 56,26"
                fill="none"
                stroke="#fff7ed"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>

            {/* Mitochondria 3 (Left side) */}
            <g transform="translate(100, 290) rotate(40)">
              <ellipse
                cx="30"
                cy="18"
                rx="34"
                ry="18"
                fill="url(#mitoGrad)"
                stroke={isSelected('mitochondria') ? '#dc2626' : '#c2410c'}
                strokeWidth={isSelected('mitochondria') ? 4 : 2.5}
              />
              <path
                d="M 10,18 C 16,10 20,24 28,10 C 34,24 40,10 48,22"
                fill="none"
                stroke="#fff7ed"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          </g>

          {/* 6. Golgi Apparatus (The Post Office) - Folded pancakes */}
          <g
            onClick={() => handleClick('golgi-apparatus')}
            className="cursor-pointer group"
            filter={isSelected('golgi-apparatus') ? 'url(#activeGlow)' : undefined}
            tabIndex={0}
            role="button"
            aria-label="Golgi Apparatus"
            transform="translate(330, 200) rotate(15)"
          >
            <path
              d="M 20,10 C 40,5 60,8 75,18"
              fill="none"
              stroke={isSelected('golgi-apparatus') ? '#ea580c' : '#f97316'}
              strokeWidth={isSelected('golgi-apparatus') ? 10 : 7}
              strokeLinecap="round"
            />
            <path
              d="M 15,22 C 38,15 62,18 80,30"
              fill="none"
              stroke={isSelected('golgi-apparatus') ? '#ea580c' : '#fb923c'}
              strokeWidth={isSelected('golgi-apparatus') ? 10 : 7}
              strokeLinecap="round"
            />
            <path
              d="M 12,34 C 36,26 65,30 85,42"
              fill="none"
              stroke={isSelected('golgi-apparatus') ? '#ea580c' : '#fdba74'}
              strokeWidth={isSelected('golgi-apparatus') ? 10 : 7}
              strokeLinecap="round"
            />
            {/* Vesicles budding off */}
            <circle cx="88" cy="18" r="5" fill="#f97316" />
            <circle cx="94" cy="34" r="6" fill="#fb923c" />
            <circle cx="8" cy="20" r="4.5" fill="#f97316" />
          </g>

          {/* 7. Vacuoles (Animal has small vacuoles) */}
          <g
            onClick={() => handleClick('vacuole')}
            className="cursor-pointer group"
            filter={isSelected('vacuole') ? 'url(#activeGlow)' : undefined}
            tabIndex={0}
            role="button"
            aria-label="Vacuole"
          >
            {/* Small Vacuole 1 */}
            <circle
              cx="200"
              cy="110"
              r="22"
              fill="#e0f2fe"
              stroke={isSelected('vacuole') ? '#0284c7' : '#38bdf8'}
              strokeWidth={isSelected('vacuole') ? 5 : 3}
            />
            <ellipse cx="194" cy="104" rx="6" ry="3" fill="#ffffff" opacity="0.7" />

            {/* Small Vacuole 2 */}
            <circle
              cx="450"
              cy="240"
              r="18"
              fill="#e0f2fe"
              stroke={isSelected('vacuole') ? '#0284c7' : '#38bdf8'}
              strokeWidth={isSelected('vacuole') ? 4 : 2.5}
            />
            <ellipse cx="445" cy="235" rx="5" ry="2.5" fill="#ffffff" opacity="0.7" />
          </g>

          {/* 8. Ribosomes (Tiny Protein Builders - Dots) */}
          <g
            onClick={() => handleClick('ribosomes')}
            className="cursor-pointer group"
            filter={isSelected('ribosomes') ? 'url(#activeGlow)' : undefined}
            tabIndex={0}
            role="button"
            aria-label="Ribosomes"
          >
            {[
              [170, 160], [150, 190], [130, 210], [145, 240], [165, 270],
              [190, 310], [210, 320], [240, 340], [330, 140], [350, 170],
              [420, 200], [400, 260], [280, 120], [300, 110], [340, 360]
            ].map(([x, y], idx) => (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r={isSelected('ribosomes') ? 6.5 : 4.5}
                fill={isSelected('ribosomes') ? '#e11d48' : '#f43f5e'}
                stroke="#ffe4e6"
                strokeWidth={1}
                className={isSelected('ribosomes') ? 'animate-ping' : ''}
              />
            ))}
          </g>

          {/* Interactive Pin Labels */}
          <g className="pointer-events-none">
            {/* Nucleus pin */}
            <g transform="translate(260, 235)">
              <circle cx="0" cy="0" r="14" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">🧠</text>
            </g>

            {/* Mitochondria pin */}
            <g transform="translate(420, 130)">
              <circle cx="0" cy="0" r="14" fill="#ea580c" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">⚡</text>
            </g>

            {/* Cell Membrane pin */}
            <g transform="translate(530, 180)">
              <circle cx="0" cy="0" r="14" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">🛡️</text>
            </g>

            {/* Ribosome pin */}
            <g transform="translate(145, 240)">
              <circle cx="0" cy="0" r="12" fill="#e11d48" stroke="#ffffff" strokeWidth="1.5" />
              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">🔨</text>
            </g>
          </g>
        </svg>
      ) : (
        /* PLANT CELL SVG */
        <svg
          viewBox="0 0 600 480"
          className="w-full h-full max-h-[460px] filter drop-shadow-sm transition-all"
        >
          <defs>
            {/* Plant Cell Wall Pattern / Color */}
            <linearGradient id="cellWallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="50%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>

            {/* Plant Cytoplasm */}
            <radialGradient id="plantCytoplasm" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ecfdf5" />
              <stop offset="70%" stopColor="#d1fae5" />
              <stop offset="100%" stopColor="#a7f3d0" />
            </radialGradient>

            {/* Giant Central Vacuole */}
            <radialGradient id="giantVacuole" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#f0f9ff" />
              <stop offset="60%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#7dd3fc" />
            </radialGradient>

            {/* Chloroplast Green */}
            <radialGradient id="chloroplastGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#bef264" />
              <stop offset="60%" stopColor="#65a30d" />
              <stop offset="100%" stopColor="#3f6212" />
            </radialGradient>
          </defs>

          {/* 1. Cell Wall (PLANT ONLY - Rigid outer armor) */}
          <g
            onClick={() => handleClick('cell-wall')}
            className="cursor-pointer transition-transform"
            tabIndex={0}
            role="button"
            aria-label="Cell Wall (Plant only)"
          >
            {/* Thick boxy outer wall */}
            <rect
              x="30"
              y="30"
              width="540"
              height="420"
              rx="46"
              fill="none"
              stroke={isSelected('cell-wall') ? '#047857' : '#15803d'}
              strokeWidth={isSelected('cell-wall') ? 22 : 16}
              className={isSelected('cell-wall') ? 'animate-pulse' : ''}
            />
            {/* Rigid cell wall segments */}
            <rect
              x="38"
              y="38"
              width="524"
              height="404"
              rx="40"
              fill="none"
              stroke="#86efac"
              strokeWidth={3}
              strokeDasharray="16 6"
            />
          </g>

          {/* 2. Cell Membrane (Inside the wall) */}
          <g
            onClick={() => handleClick('cell-membrane')}
            className="cursor-pointer"
            tabIndex={0}
            role="button"
            aria-label="Cell Membrane"
          >
            <rect
              x="52"
              y="52"
              width="496"
              height="376"
              rx="30"
              fill="none"
              stroke={isSelected('cell-membrane') ? '#0284c7' : '#38bdf8'}
              strokeWidth={isSelected('cell-membrane') ? 8 : 4}
            />
          </g>

          {/* 3. Cytoplasm Jelly Fill */}
          <g
            onClick={() => handleClick('cytoplasm')}
            className="cursor-pointer"
            tabIndex={0}
            role="button"
            aria-label="Cytoplasm"
          >
            <rect
              x="56"
              y="56"
              width="488"
              height="368"
              rx="28"
              fill="url(#plantCytoplasm)"
              opacity={isSelected('cytoplasm') ? 0.95 : 0.8}
            />
          </g>

          {/* 4. Giant Central Vacuole (Takes up huge central room) */}
          <g
            onClick={() => handleClick('vacuole')}
            className="cursor-pointer group"
            filter={isSelected('vacuole') ? 'url(#activeGlow)' : undefined}
            tabIndex={0}
            role="button"
            aria-label="Vacuole"
          >
            <path
              d="M 230,120 C 380,90 470,140 480,260 C 490,360 410,400 290,390 C 200,380 200,300 210,210 C 215,160 200,130 230,120 Z"
              fill="url(#giantVacuole)"
              stroke={isSelected('vacuole') ? '#0284c7' : '#38bdf8'}
              strokeWidth={isSelected('vacuole') ? 6 : 4}
              className="group-hover:scale-102 transition-transform"
            />
            {/* Water reflections in vacuole */}
            <path
              d="M 270,160 C 330,140 400,160 430,220"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.6"
            />
            <circle cx="360" cy="270" r="18" fill="#ffffff" opacity="0.3" />
            <text x="340" y="250" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">
              💧 Huge Storage Tank!
            </text>
          </g>

          {/* 5. Nucleus (Pushed towards side because of huge vacuole!) */}
          <g
            onClick={() => handleClick('nucleus')}
            className="cursor-pointer group"
            filter={isSelected('nucleus') ? 'url(#activeGlow)' : undefined}
            tabIndex={0}
            role="button"
            aria-label="Nucleus"
          >
            <circle
              cx="140"
              cy="210"
              r="54"
              fill="url(#nucleusGrad)"
              stroke={isSelected('nucleus') ? '#f59e0b' : '#6b21a8'}
              strokeWidth={isSelected('nucleus') ? 6 : 4}
            />
            {/* Nucleolus */}
            <circle cx="132" cy="202" r="20" fill="#581c87" stroke="#e9d5ff" strokeWidth="2" />
            {/* Face */}
            <circle cx="126" cy="199" r="2.5" fill="#ffffff" />
            <circle cx="138" cy="199" r="2.5" fill="#ffffff" />
            <path d="M 129,206 Q 132,209 135,206" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          </g>

          {/* 6. Chloroplasts (PLANT ONLY - Solar Panels!) */}
          <g
            onClick={() => handleClick('chloroplast')}
            className="cursor-pointer group"
            filter={isSelected('chloroplast') ? 'url(#activeGlow)' : undefined}
            tabIndex={0}
            role="button"
            aria-label="Chloroplast (Plant only)"
          >
            {/* Chloroplast 1 (Top Left) */}
            <g transform="translate(100, 85) rotate(-20)">
              <ellipse
                cx="35"
                cy="22"
                rx="40"
                ry="22"
                fill="url(#chloroplastGrad)"
                stroke={isSelected('chloroplast') ? '#eab308' : '#4d7c0f'}
                strokeWidth={isSelected('chloroplast') ? 5 : 3}
                className="group-hover:scale-105 transition-transform"
              />
              {/* Thylakoids stacks (coin pancakes) */}
              <rect x="15" y="14" width="10" height="4" rx="2" fill="#d9f99d" />
              <rect x="15" y="20" width="10" height="4" rx="2" fill="#d9f99d" />
              <rect x="15" y="26" width="10" height="4" rx="2" fill="#d9f99d" />
              <rect x="32" y="12" width="10" height="4" rx="2" fill="#d9f99d" />
              <rect x="32" y="18" width="10" height="4" rx="2" fill="#d9f99d" />
              <rect x="32" y="24" width="10" height="4" rx="2" fill="#d9f99d" />
              <rect x="48" y="14" width="10" height="4" rx="2" fill="#d9f99d" />
              <rect x="48" y="20" width="10" height="4" rx="2" fill="#d9f99d" />
            </g>

            {/* Chloroplast 2 (Bottom Left) */}
            <g transform="translate(105, 330) rotate(15)">
              <ellipse
                cx="35"
                cy="22"
                rx="38"
                ry="21"
                fill="url(#chloroplastGrad)"
                stroke={isSelected('chloroplast') ? '#eab308' : '#4d7c0f'}
                strokeWidth={isSelected('chloroplast') ? 5 : 3}
              />
              <rect x="18" y="14" width="9" height="3.5" rx="1.5" fill="#d9f99d" />
              <rect x="18" y="19" width="9" height="3.5" rx="1.5" fill="#d9f99d" />
              <rect x="18" y="24" width="9" height="3.5" rx="1.5" fill="#d9f99d" />
              <rect x="33" y="13" width="9" height="3.5" rx="1.5" fill="#d9f99d" />
              <rect x="33" y="18" width="9" height="3.5" rx="1.5" fill="#d9f99d" />
              <rect x="33" y="23" width="9" height="3.5" rx="1.5" fill="#d9f99d" />
              <rect x="47" y="15" width="9" height="3.5" rx="1.5" fill="#d9f99d" />
              <rect x="47" y="20" width="9" height="3.5" rx="1.5" fill="#d9f99d" />
            </g>

            {/* Chloroplast 3 (Top Right corner) */}
            <g transform="translate(430, 80) rotate(25)">
              <ellipse
                cx="35"
                cy="22"
                rx="38"
                ry="21"
                fill="url(#chloroplastGrad)"
                stroke={isSelected('chloroplast') ? '#eab308' : '#4d7c0f'}
                strokeWidth={isSelected('chloroplast') ? 5 : 3}
              />
              <rect x="18" y="14" width="9" height="3.5" rx="1.5" fill="#d9f99d" />
              <rect x="18" y="19" width="9" height="3.5" rx="1.5" fill="#d9f99d" />
              <rect x="33" y="13" width="9" height="3.5" rx="1.5" fill="#d9f99d" />
              <rect x="33" y="18" width="9" height="3.5" rx="1.5" fill="#d9f99d" />
              <rect x="47" y="15" width="9" height="3.5" rx="1.5" fill="#d9f99d" />
            </g>
          </g>

          {/* 7. Mitochondria in plant cell */}
          <g
            onClick={() => handleClick('mitochondria')}
            className="cursor-pointer group"
            filter={isSelected('mitochondria') ? 'url(#activeGlow)' : undefined}
            tabIndex={0}
            role="button"
            aria-label="Mitochondria"
          >
            <g transform="translate(190, 345) rotate(-25)">
              <ellipse
                cx="30"
                cy="18"
                rx="34"
                ry="18"
                fill="url(#mitoGrad)"
                stroke={isSelected('mitochondria') ? '#dc2626' : '#c2410c'}
                strokeWidth={isSelected('mitochondria') ? 5 : 3}
              />
              <path
                d="M 10,18 C 16,10 20,24 28,10 C 34,24 40,10 48,22"
                fill="none"
                stroke="#fff7ed"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
            <g transform="translate(240, 75) rotate(15)">
              <ellipse
                cx="26"
                cy="16"
                rx="30"
                ry="16"
                fill="url(#mitoGrad)"
                stroke={isSelected('mitochondria') ? '#dc2626' : '#c2410c'}
                strokeWidth={isSelected('mitochondria') ? 4 : 2.5}
              />
              <path
                d="M 8,16 C 14,9 18,22 25,9 C 30,22 36,9 43,19"
                fill="none"
                stroke="#fff7ed"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          </g>

          {/* 8. Endoplasmic Reticulum (Near nucleus) */}
          <g
            onClick={() => handleClick('endoplasmic-reticulum')}
            className="cursor-pointer group"
            filter={isSelected('endoplasmic-reticulum') ? 'url(#activeGlow)' : undefined}
            tabIndex={0}
            role="button"
            aria-label="Endoplasmic Reticulum"
          >
            <path
              d="M 120,270 C 110,290 120,310 135,320"
              fill="none"
              stroke={isSelected('endoplasmic-reticulum') ? '#4f46e5' : '#818cf8'}
              strokeWidth={isSelected('endoplasmic-reticulum') ? 11 : 8}
              strokeLinecap="round"
            />
            <path
              d="M 140,275 C 135,295 145,315 155,325"
              fill="none"
              stroke={isSelected('endoplasmic-reticulum') ? '#6366f1' : '#a5b4fc'}
              strokeWidth={isSelected('endoplasmic-reticulum') ? 9 : 6}
              strokeLinecap="round"
            />
          </g>

          {/* 9. Golgi Apparatus */}
          <g
            onClick={() => handleClick('golgi-apparatus')}
            className="cursor-pointer group"
            filter={isSelected('golgi-apparatus') ? 'url(#activeGlow)' : undefined}
            tabIndex={0}
            role="button"
            aria-label="Golgi Apparatus"
            transform="translate(85, 270) rotate(-15)"
          >
            <path
              d="M 10,10 C 25,6 40,8 50,15"
              fill="none"
              stroke={isSelected('golgi-apparatus') ? '#ea580c' : '#f97316'}
              strokeWidth={isSelected('golgi-apparatus') ? 8 : 6}
              strokeLinecap="round"
            />
            <path
              d="M 8,18 C 23,13 38,15 48,22"
              fill="none"
              stroke={isSelected('golgi-apparatus') ? '#ea580c' : '#fb923c'}
              strokeWidth={isSelected('golgi-apparatus') ? 8 : 6}
              strokeLinecap="round"
            />
          </g>

          {/* 10. Ribosomes (Tiny protein dots) */}
          <g
            onClick={() => handleClick('ribosomes')}
            className="cursor-pointer group"
            filter={isSelected('ribosomes') ? 'url(#activeGlow)' : undefined}
            tabIndex={0}
            role="button"
            aria-label="Ribosomes"
          >
            {[
              [95, 170], [80, 210], [90, 240], [175, 300], [200, 315],
              [160, 95], [190, 85], [380, 80], [420, 380], [360, 400], [480, 370]
            ].map(([x, y], idx) => (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r={isSelected('ribosomes') ? 6 : 4}
                fill={isSelected('ribosomes') ? '#e11d48' : '#f43f5e'}
                stroke="#ffe4e6"
                strokeWidth={1}
              />
            ))}
          </g>

          {/* Pin Badges for Plant diagram */}
          <g className="pointer-events-none">
            {/* Cell Wall Tag */}
            <g transform="translate(30, 240)">
              <circle cx="0" cy="0" r="14" fill="#15803d" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">🛡️</text>
            </g>

            {/* Chloroplast Tag */}
            <g transform="translate(130, 95)">
              <circle cx="0" cy="0" r="14" fill="#65a30d" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">☀️</text>
            </g>

            {/* Large Vacuole Tag */}
            <g transform="translate(350, 160)">
              <circle cx="0" cy="0" r="14" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">💧</text>
            </g>
          </g>
        </svg>
      )}

      {/* Floating Plant Only Highlights Indicator */}
      {cellType === 'plant' && (
        <div className="absolute top-3 right-3 hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm border border-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Cell Wall & Chloroplast = Plant Only!</span>
        </div>
      )}

    </div>
  );
};
