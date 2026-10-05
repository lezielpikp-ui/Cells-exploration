export interface Organelle {
  id: string;
  name: string;
  nickname: string;
  function: string;
  description: string;
  foundIn: 'both' | 'plant-only';
  category: 'energy' | 'control' | 'boundary' | 'manufacturing' | 'storage';
  badgeColor: string;
  accentBg: string;
  borderClass: string;
  memoryHook: string;
  plantOnly: boolean;
}

export const CELL_ORGANELLES: Organelle[] = [
  {
    id: 'nucleus',
    name: 'Nucleus',
    nickname: 'The Brain / Control Center',
    function: 'Controls all cell activities and stores DNA instructions.',
    description: 'The Brain — Controls cell activities and stores DNA instructions like a computer master chip.',
    foundIn: 'both',
    plantOnly: false,
    category: 'control',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    accentBg: 'bg-purple-500',
    borderClass: 'border-purple-400',
    memoryHook: 'Think of Nucleus like the "Boss" in the center office giving orders!'
  },
  {
    id: 'mitochondria',
    name: 'Mitochondria',
    nickname: 'The Powerhouse',
    function: 'Produces energy (cellular respiration) to power everything the cell does.',
    description: 'The Powerhouse — Produces energy for the cell by turning food and oxygen into fuel.',
    foundIn: 'both',
    plantOnly: false,
    category: 'energy',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    accentBg: 'bg-amber-500',
    borderClass: 'border-amber-400',
    memoryHook: 'Mighty Mitochondria gives the cell mighty muscle and energy!'
  },
  {
    id: 'cell-membrane',
    name: 'Cell Membrane',
    nickname: 'The Gatekeeper / Security Guard',
    function: 'Controls what enters and leaves the cell, keeping harmful things out.',
    description: 'The Gatekeeper — Controls what enters and leaves the cell, letting nutrients in and waste out.',
    foundIn: 'both',
    plantOnly: false,
    category: 'boundary',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    accentBg: 'bg-blue-500',
    borderClass: 'border-blue-400',
    memoryHook: 'The security gatekeeper checking who gets in and who stays out!'
  },
  {
    id: 'cytoplasm',
    name: 'Cytoplasm',
    nickname: 'The Jelly Floor',
    function: 'Jelly-like fluid that fills the cell, cushioning organelles and hosting chemical reactions.',
    description: 'The Jelly Floor — Clear jelly-like fluid where organelles float safely and chemical reactions occur.',
    foundIn: 'both',
    plantOnly: false,
    category: 'boundary',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    accentBg: 'bg-cyan-500',
    borderClass: 'border-cyan-400',
    memoryHook: 'Imagine swimming in strawberry jelly that holds everything in place!'
  },
  {
    id: 'ribosomes',
    name: 'Ribosomes',
    nickname: 'The Protein Builders',
    function: 'Tiny factories that assemble proteins needed for cell growth and repair.',
    description: 'The Protein Builders — Makes proteins for growth, repair, and building cell structures.',
    foundIn: 'both',
    plantOnly: false,
    category: 'manufacturing',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    accentBg: 'bg-rose-500',
    borderClass: 'border-rose-400',
    memoryHook: 'Ribosomes love eating "ribs" for protein to build strong blocks!'
  },
  {
    id: 'endoplasmic-reticulum',
    name: 'Endoplasmic Reticulum (ER)',
    nickname: 'The Highway System',
    function: 'Network of folded tubes that transports materials and molecules across the cell.',
    description: 'The Highway System — Folded tunnels that transport proteins and lipids across the cell.',
    foundIn: 'both',
    plantOnly: false,
    category: 'manufacturing',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    accentBg: 'bg-indigo-500',
    borderClass: 'border-indigo-400',
    memoryHook: 'ER is like an Emergency Roadway or highway zooming packages across town!'
  },
  {
    id: 'golgi-apparatus',
    name: 'Golgi Apparatus',
    nickname: 'The Post Office',
    function: 'Receives, modifies, sorts, and packages proteins into vesicles for delivery.',
    description: 'The Post Office — Modifies, packs, and ships proteins wherever they are needed.',
    foundIn: 'both',
    plantOnly: false,
    category: 'manufacturing',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
    accentBg: 'bg-orange-500',
    borderClass: 'border-orange-400',
    memoryHook: 'Golgi packages like golden postal boxes with express shipping labels!'
  },
  {
    id: 'vacuole',
    name: 'Vacuole',
    nickname: 'The Storage Tank',
    function: 'Stores water, food nutrients, and waste materials (Huge in plants, tiny in animals).',
    description: 'The Storage Tank — Stores water, nutrients, and waste. Giant central tank in plant cells!',
    foundIn: 'both',
    plantOnly: false,
    category: 'storage',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    accentBg: 'bg-sky-500',
    borderClass: 'border-sky-400',
    memoryHook: 'Vacuole is like a giant vacuum water bladder holding refreshing water!'
  },
  {
    id: 'cell-wall',
    name: 'Cell Wall',
    nickname: 'The Armor / Sturdy Wall (plant only)',
    function: 'Rigid outer layer made of cellulose that provides structure, shape, and protection.',
    description: 'The Armor — Rigid outer box that protects plant cells and keeps the plant standing tall.',
    foundIn: 'plant-only',
    plantOnly: true,
    category: 'boundary',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    accentBg: 'bg-emerald-600',
    borderClass: 'border-emerald-500',
    memoryHook: 'Plant armor! Animal cells don\'t have this, which is why animals can bend and move soft!'
  },
  {
    id: 'chloroplast',
    name: 'Chloroplast',
    nickname: 'The Solar Panel / Food Factory (plant only)',
    function: 'Captures sunlight using chlorophyll to make sugar and food via photosynthesis.',
    description: 'The Solar Panel — Absorbs green sunlight to cook sweet sugar food through photosynthesis.',
    foundIn: 'plant-only',
    plantOnly: true,
    category: 'energy',
    badgeColor: 'bg-lime-100 text-lime-900 border-lime-300',
    accentBg: 'bg-lime-500',
    borderClass: 'border-lime-500',
    memoryHook: 'Chloroplast = Green solar panels cooking plant pancakes with sunlight!'
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  nicknameHint: string;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which part is the POWERHOUSE that gives energy to the cell?',
    options: ['Nucleus', 'Mitochondria', 'Vacuole', 'Ribosomes'],
    correctAnswer: 'Mitochondria',
    nicknameHint: 'it’s the powerhouse!',
    explanation: 'Mitochondria produces all the energy needed by the cell through cellular respiration!'
  },
  {
    id: 2,
    question: 'Which cell part is known as "The Brain" that controls all cell activities and stores DNA?',
    options: ['Cytoplasm', 'Nucleus', 'Cell Wall', 'Golgi Apparatus'],
    correctAnswer: 'Nucleus',
    nicknameHint: 'it’s the control center & brain!',
    explanation: 'The Nucleus is the control center holding all the DNA instructions!'
  },
  {
    id: 3,
    question: 'Which part acts like "The Gatekeeper" controlling what enters and leaves the cell?',
    options: ['Cell Membrane', 'Chloroplast', 'Endoplasmic Reticulum', 'Mitochondria'],
    correctAnswer: 'Cell Membrane',
    nicknameHint: 'it’s the gatekeeper security guard!',
    explanation: 'The Cell Membrane surrounds the cell and regulates what passes inside and outside.'
  },
  {
    id: 4,
    question: 'Which tough outer part is "The Armor" found ONLY in plant cells to keep them standing tall?',
    options: ['Cell Membrane', 'Cell Wall', 'Cytoplasm', 'Ribosomes'],
    correctAnswer: 'Cell Wall',
    nicknameHint: 'it’s the sturdy armor (plant only)!',
    explanation: 'Cell Wall is a rigid cellulose box found ONLY in plants, giving them strength and structure.'
  },
  {
    id: 5,
    question: 'Which part acts like "The Solar Panel" absorbing sunlight to make food (plant only)?',
    options: ['Mitochondria', 'Vacuole', 'Chloroplast', 'Nucleus'],
    correctAnswer: 'Chloroplast',
    nicknameHint: 'it’s the green solar food factory!',
    explanation: 'Chloroplasts contain chlorophyll that absorbs sunlight to perform photosynthesis!'
  },
  {
    id: 6,
    question: 'Which clear jelly-like fluid fills the cell like "The Jelly Floor" where organelles float?',
    options: ['Cytoplasm', 'Cell Membrane', 'Vacuole', 'Golgi Apparatus'],
    correctAnswer: 'Cytoplasm',
    nicknameHint: 'it’s the jelly floor!',
    explanation: 'Cytoplasm is the watery jelly that fills the cell and lets chemical reactions take place.'
  },
  {
    id: 7,
    question: 'Which tiny parts are "The Protein Builders" that assemble proteins for cell growth and repair?',
    options: ['Vacuoles', 'Ribosomes', 'Chloroplasts', 'Nucleus'],
    correctAnswer: 'Ribosomes',
    nicknameHint: 'they are the protein building factories!',
    explanation: 'Ribosomes translate genetic codes to assemble essential protein chains for the cell.'
  },
  {
    id: 8,
    question: 'Which organelle is "The Storage Tank" storing water and nutrients (huge in plant cells)?',
    options: ['Vacuole', 'Mitochondria', 'Cell Wall', 'Endoplasmic Reticulum'],
    correctAnswer: 'Vacuole',
    nicknameHint: 'it’s the big water storage tank!',
    explanation: 'The Vacuole stores water, food, and minerals. Plants have one giant central vacuole!'
  }
];

export interface MatchPair {
  id: string;
  organelleName: string;
  nickname: string;
  functionShort: string;
  plantOnly?: boolean;
}

export const MATCH_ITEMS: MatchPair[] = [
  {
    id: 'm1',
    organelleName: 'Mitochondria',
    nickname: 'The Powerhouse',
    functionShort: 'Produces energy for the cell'
  },
  {
    id: 'm2',
    organelleName: 'Nucleus',
    nickname: 'The Brain / Control Center',
    functionShort: 'Controls cell activities & stores DNA'
  },
  {
    id: 'm3',
    organelleName: 'Cell Membrane',
    nickname: 'The Gatekeeper',
    functionShort: 'Controls what enters and leaves'
  },
  {
    id: 'm4',
    organelleName: 'Cell Wall',
    nickname: 'The Armor (Plant Only)',
    functionShort: 'Provides rigid structure & protection',
    plantOnly: true
  },
  {
    id: 'm5',
    organelleName: 'Chloroplast',
    nickname: 'The Solar Panel (Plant Only)',
    functionShort: 'Absorbs sunlight to make food',
    plantOnly: true
  },
  {
    id: 'm6',
    organelleName: 'Vacuole',
    nickname: 'The Storage Tank',
    functionShort: 'Stores water, food, and wastes'
  }
];
