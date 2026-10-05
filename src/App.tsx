/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { LearnMode } from './components/LearnMode';
import { QuizChallenge } from './components/QuizChallenge';
import { MatchUpGame } from './components/MatchUpGame';
import { QuickReferenceTable } from './components/QuickReferenceTable';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800">
      
      {/* Top Bar Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeHero
            onSelectAnimal={() => setActiveTab('learn-animal')}
            onSelectPlant={() => setActiveTab('learn-plant')}
            onSelectQuiz={() => setActiveTab('quiz')}
            onSelectMatch={() => setActiveTab('match')}
            onSelectTable={() => setActiveTab('table')}
          />
        )}

        {activeTab === 'learn-animal' && (
          <LearnMode
            initialCellType="animal"
            onGoToQuiz={() => setActiveTab('quiz')}
            onGoToMatch={() => setActiveTab('match')}
          />
        )}

        {activeTab === 'learn-plant' && (
          <LearnMode
            initialCellType="plant"
            onGoToQuiz={() => setActiveTab('quiz')}
            onGoToMatch={() => setActiveTab('match')}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizChallenge
            onGoToLearn={() => setActiveTab('learn-animal')}
            onGoToMatch={() => setActiveTab('match')}
          />
        )}

        {activeTab === 'match' && (
          <MatchUpGame
            onGoToQuiz={() => setActiveTab('quiz')}
          />
        )}

        {activeTab === 'table' && (
          <QuickReferenceTable />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={(tab) => setActiveTab(tab)} />

    </div>
  );
}
