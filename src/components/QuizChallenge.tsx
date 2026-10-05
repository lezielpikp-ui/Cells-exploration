import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/cellData';
import { sound } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Sparkles, BookOpen, Lightbulb } from 'lucide-react';

interface QuizChallengeProps {
  onGoToLearn?: () => void;
  onGoToMatch?: () => void;
}

export const QuizChallenge: React.FC<QuizChallengeProps> = ({
  onGoToLearn,
  onGoToMatch
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [wrongOptions, setWrongOptions] = useState<string[]>([]);
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'try-again'; message: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [answersHistory, setAnswersHistory] = useState<
    Array<{ questionId: number; question: string; correctAnswer: string; firstTryCorrect: boolean }>
  >([]);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isResolved || wrongOptions.includes(option)) return;

    if (option === currentQ.correctAnswer) {
      // Correct!
      sound.playSuccess();
      setIsResolved(true);
      const isFirstTry = wrongOptions.length === 0;
      if (isFirstTry) {
        setScore(prev => prev + 1);
      }
      setFeedback({
        type: 'correct',
        message: 'Great job! ✅'
      });
      setAnswersHistory(prev => [
        ...prev,
        {
          questionId: currentQ.id,
          question: currentQ.question,
          correctAnswer: currentQ.correctAnswer,
          firstTryCorrect: isFirstTry
        }
      ]);
    } else {
      // Wrong choice - prompt allows instant "Try again"
      sound.playIncorrect();
      setWrongOptions(prev => [...prev, option]);
      setFeedback({
        type: 'try-again',
        message: `Try again — ${currentQ.nicknameHint} 💡`
      });
    }
  };

  const handleNext = () => {
    sound.playPop();
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
      setWrongOptions([]);
      setIsResolved(false);
      setFeedback(null);
    } else {
      // Finished quiz!
      setQuizCompleted(true);
      sound.playFanfare();
      triggerConfetti();
    }
  };

  const handleRestart = () => {
    sound.playPop();
    setCurrentIndex(0);
    setWrongOptions([]);
    setIsResolved(false);
    setFeedback(null);
    setScore(0);
    setQuizCompleted(false);
    setAnswersHistory([]);
  };

  // Fun score message logic matching prompt specifications
  const getScoreMessage = (finalScore: number) => {
    if (finalScore === 8) {
      return {
        title: "8/8 — Wow, Master Cell Biologist! 🌟",
        subtitle: "Incredible job, Scientist! You know every single cell part and nickname like an expert!"
      };
    } else if (finalScore === 7) {
      return {
        title: "7/8 — You’re a Cell Expert! 🎉",
        subtitle: "Fantastic work! You have mastered cell structures and their awesome nicknames!"
      };
    } else if (finalScore >= 5) {
      return {
        title: `${finalScore}/8 — Great Job, Junior Scientist! 🔬`,
        subtitle: "Super effort! Review the Quick Reference Table to get a perfect 8/8!"
      };
    } else {
      return {
        title: `${finalScore}/8 — Keep Practicing, Explorer! 🚀`,
        subtitle: "Cells are fascinating! Use the Learn Mode diagrams and try again to power up your score!"
      };
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Quiz Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-violet-700 bg-violet-100 px-3 py-1 rounded-full border border-violet-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Quiz Challenge</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
          Test Your Cell Superpowers! ⚡
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          8 multiple-choice questions on cell parts, nicknames, and powerhouses!
        </p>
      </div>

      {!quizCompleted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-violet-200 shadow-md">
          
          {/* Progress bar & question counter */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span>Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="text-violet-700">First-Try Score: {score} / {currentIndex + (isResolved ? 1 : 0)}</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {currentQ.options.map((option, idx) => {
              const isWrong = wrongOptions.includes(option);
              const isCorrectAnswer = option === currentQ.correctAnswer;
              const isShowingCorrect = isResolved && isCorrectAnswer;

              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-violet-50 hover:border-violet-300 cursor-pointer';

              if (isShowingCorrect) {
                btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold shadow-xs cursor-default';
              } else if (isWrong) {
                btnStyle = 'bg-rose-50 border-rose-300 text-rose-800 line-through opacity-70 cursor-not-allowed';
              } else if (isResolved) {
                btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60 cursor-default';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={isResolved || isWrong}
                  className={`p-4 rounded-2xl border-2 text-left font-heading text-base font-semibold transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-white/80 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isShowingCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isWrong && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Feedback Callout */}
          {feedback && (
            <div className={`p-4 rounded-2xl border-2 mb-6 animate-pulse-subtle ${
              feedback.type === 'correct'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">
                  {feedback.type === 'correct' ? '✅' : '💡'}
                </span>
                <div>
                  <div className="font-heading font-extrabold text-base">
                    {feedback.message}
                  </div>
                  <div className="text-xs sm:text-sm mt-1 text-slate-700">
                    {feedback.type === 'correct'
                      ? currentQ.explanation
                      : 'Pick another choice above to discover the correct cell part!'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Next Button (Enabled when question is resolved) */}
          {isResolved && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-heading font-bold text-base rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <span>{currentIndex + 1 === QUIZ_QUESTIONS.length ? 'See Final Score 🎉' : 'Next Question ➔'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* QUIZ COMPLETED / RESULTS SCREEN */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-violet-200 shadow-xl text-center">
          
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-950 flex items-center justify-center text-4xl mx-auto mb-4 shadow-sm">
            🏆
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            {getScoreMessage(score).title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-6">
            {getScoreMessage(score).subtitle}
          </p>

          {/* Score Badge */}
          <div className="inline-block p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
              Final Challenge Score
            </span>
            <span className="font-heading text-4xl sm:text-5xl font-black text-amber-950">
              {score} / {QUIZ_QUESTIONS.length}
            </span>
          </div>

          {/* Quick Review List */}
          <div className="text-left bg-slate-50 rounded-2xl p-4 sm:p-6 mb-8 border border-slate-200 max-h-60 overflow-y-auto">
            <h3 className="font-heading text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">
              Question Summary:
            </h3>
            <div className="space-y-2">
              {QUIZ_QUESTIONS.map(q => {
                const hist = answersHistory.find(h => h.questionId === q.id);
                return (
                  <div key={q.id} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200/60 last:border-none">
                    <span className="font-medium text-slate-700 truncate pr-2">
                      {q.id}. {q.correctAnswer} — <span className="text-slate-500 font-normal">{q.explanation}</span>
                    </span>
                    <span className={`font-bold shrink-0 ${hist?.firstTryCorrect ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {hist?.firstTryCorrect ? 'First Try ✅' : 'Learned 💡'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-heading font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>

            {onGoToMatch && (
              <button
                onClick={onGoToMatch}
                className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-heading font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>Play Match-Up Game</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {onGoToLearn && (
              <button
                onClick={onGoToLearn}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-bold text-sm rounded-xl transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Review Diagrams</span>
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
