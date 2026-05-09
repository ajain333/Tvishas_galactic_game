/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Trophy, 
  Timer, 
  Info, 
  ChevronRight, 
  Star,
  RefreshCcw,
  Zap,
  Globe,
  Ghost,
  Volume2,
  VolumeX
} from 'lucide-react';
import { QuestionAnimation } from './components/QuestionAnimation';
import { questions, type Question } from './questions';

type GameState = 'START' | 'INSTRUCTIONS' | 'PLAYING' | 'GAME_OVER' | 'LEADERBOARD';

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>('START');
  const [playerName, setPlayerName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and handle background music
  useEffect(() => {
    const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13d6935.mp3?filename=space-ambient-creative-commons-background-music-1443.mp3");
    audio.loop = true;
    audio.volume = 0.2;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else if (gameState !== 'START') {
        audioRef.current.play().catch(e => console.log("Audio play blocked until interaction:", e));
      }
    }
  }, [isMuted, gameState]);

  // Load leaderboard from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('galactic_quest_leaderboard');
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  }, []);

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'PLAYING' && timeLeft > 0 && !showExplanation) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setScore((prev) => Math.max(0, prev - 3)); // Deduct 3 points per second
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'PLAYING') {
      endGame();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, showExplanation]);

  const startGame = useCallback(() => {
    // Select all available questions (up to 18)
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled);
    setScore(0);
    setTimeLeft(60);
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
    setShowFeedback(null);
    setGameState('PLAYING');
  }, []);

  const handleAnswer = (option: string) => {
    const isCorrect = option === selectedQuestions[currentQuestionIndex].correctAnswer;
    
    if (isCorrect) {
      setScore((prev) => prev + 100);
      setShowFeedback('correct');
    } else {
      setScore((prev) => Math.max(0, prev - 25));
      setShowFeedback('incorrect');
    }

    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowFeedback(null);
    setShowExplanation(false);
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    setGameState('GAME_OVER');
    const newEntry: LeaderboardEntry = {
      name: playerName || 'Anonymous Explorer',
      score: score,
      date: new Date().toLocaleDateString()
    };
    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('galactic_quest_leaderboard', JSON.stringify(updatedLeaderboard));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center font-sans overflow-hidden border-8 border-[#1e293b]">
      {/* Space Background Theme */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=1920')`,
            filter: 'brightness(0.3) contrast(1.1)'
          }}
        />
        <div className="absolute inset-0 bg-[#020617]/40 backdrop-blur-[2px]" />
        
        {/* Dynamic Star Layers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: Math.random() * 0.5 + 0.2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: Math.random() * 3 + 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]"
            />
          ))}
          
          {/* Subtle Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} 
          />
        </div>
      </div>

      {/* Footer text from design */}
      <footer className="fixed bottom-0 left-0 right-0 h-12 bg-black/80 border-t-2 border-cyan-500/50 flex items-center justify-between px-8 z-50 backdrop-blur-xl">
        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
          Grade 4 Science Talent Search | By Tvisha Jain 4RP
        </p>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-[9px] text-white/40 tracking-widest font-black uppercase overflow-hidden whitespace-nowrap">
            <span className="animate-pulse">• System Active</span>
            <span className="text-cyan-500/30">|</span>
            <span>Galactic Grid Sync: Optimal</span>
          </div>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-3 group transition-all hover:bg-cyan-500/20 px-4 py-1.5 rounded-full border border-cyan-500/20"
          >
            <span className="text-[10px] font-black uppercase text-cyan-400 tracking-widest hidden sm:inline">
              {isMuted ? 'Muted' : 'Audio Active'}
            </span>
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-red-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
            )}
          </button>
        </div>
      </footer>

      <AnimatePresence mode="wait">
        {gameState === 'START' && (
          <motion.div 
            key="start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="z-10 w-full max-w-md text-center space-y-8 p-10 bg-indigo-950/40 border-4 border-cyan-500 rounded-[40px] backdrop-blur-md shadow-[0_0_50px_rgba(34,211,238,0.2)]"
          >
            <div className="space-y-4">
              <div className="flex flex-col mb-6">
                <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-bold">Mission Ready</span>
                <h1 className="text-5xl font-black italic uppercase text-white leading-none">
                  Galactic <span className="text-cyan-400">Quest</span>
                </h1>
              </div>
              <p className="text-cyan-400/60 uppercase tracking-widest text-xs font-bold">Science Talent Search Program</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-left text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-black ml-1">Pilot Identification</label>
                <input
                  type="text"
                  placeholder="ENTER CALLSIGN..."
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full bg-black/60 border-2 border-cyan-500/40 rounded-xl px-6 py-4 text-white placeholder:text-white/20 outline-none focus:border-cyan-400 transition-all font-mono uppercase tracking-widest"
                />
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  disabled={!playerName}
                  onClick={() => setGameState('INSTRUCTIONS')}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed text-black font-black py-5 rounded-xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-lg italic shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                >
                  Initiate Systems <ChevronRight size={24} />
                </button>
                <button
                  onClick={() => setGameState('LEADERBOARD')}
                  className="w-full bg-white/5 border-2 border-white/10 text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 uppercase tracking-widest italic text-sm"
                >
                  <Trophy size={18} className="text-cyan-400" /> View Hall of Fame
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'INSTRUCTIONS' && (
          <motion.div 
            key="instructions"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="z-10 w-full max-w-lg bg-black/60 border-4 border-cyan-500 p-10 rounded-[40px] backdrop-blur-md space-y-8 shadow-[0_0_50px_rgba(34,211,238,0.2)]"
          >
            <div className="flex items-center gap-4 border-b-2 border-cyan-500/30 pb-6">
              <div className="p-4 bg-cyan-500/20 rounded-2xl">
                <Info size={32} className="text-cyan-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black text-cyan-400 tracking-[0.3em]">Protocol Alpha</span>
                <h2 className="text-3xl font-black italic uppercase text-white">Mission Briefing</h2>
              </div>
            </div>

            <div className="space-y-6 text-white uppercase italic font-black">
              <div className="flex gap-4 items-center bg-white/5 p-4 rounded-xl border-l-4 border-cyan-500">
                <span className="text-cyan-400 text-2xl">01</span>
                <p className="text-sm">Clear <span className="text-cyan-400">{questions.length} planetary obstacles</span> using maximum velocity.</p>
              </div>
              <div className="flex gap-4 items-center bg-white/5 p-4 rounded-xl border-l-4 border-cyan-500">
                <span className="text-cyan-400 text-2xl">02</span>
                <p className="text-sm">Success: <span className="text-cyan-500 uppercase">+100 PTS</span> | Error: <span className="text-red-500 uppercase">-25 PTS</span></p>
              </div>
              <div className="flex gap-4 items-center bg-white/5 p-4 rounded-xl border-l-4 border-cyan-500">
                <span className="text-cyan-400 text-2xl">03</span>
                <p className="text-sm text-red-400">WARNING: Fuel depletion at <span className="underline">3 points per second</span>.</p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsMuted(false);
                startGame();
              }}
              className="w-full bg-cyan-500 text-black hover:bg-cyan-400 font-black py-6 rounded-xl transition-all shadow-xl shadow-cyan-500/20 uppercase tracking-widest text-xl italic"
            >
              Begin Launch Sequence
            </button>
          </motion.div>
        )}

        {gameState === 'PLAYING' && selectedQuestions.length > 0 && (
          <motion.div 
            key="playing"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="z-10 w-full max-w-6xl h-[700px] flex flex-col"
          >
            {/* Game Header */}
            <header className="h-24 bg-black/60 border-b-4 border-cyan-500 flex items-center justify-between px-10 backdrop-blur-md rounded-t-[40px]">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-black">Mission Progress</span>
                <h1 className="text-2xl font-black italic uppercase text-white">Objective {currentQuestionIndex + 1} of {selectedQuestions.length}</h1>
              </div>
              <div className="flex gap-12">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-cyan-400 uppercase tracking-[0.3em] font-black">Fuel Status</span>
                  <div className={`text-3xl font-black px-4 py-1 border-2 rounded-lg transition-colors ${timeLeft < 10 ? 'text-red-500 bg-red-600/20 border-red-500 animate-pulse' : 'text-white bg-cyan-600/10 border-cyan-500'}`}>
                    {timeLeft}s
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-cyan-400 uppercase tracking-[0.3em] font-black">Star Points</span>
                  <div className="text-4xl font-black text-cyan-400 tabular-nums">{score.toLocaleString()}</div>
                </div>
              </div>
            </header>

            <main className="flex-1 flex p-6 gap-6 overflow-hidden">
              {/* Sidebar */}
              <section className="w-72 flex flex-col gap-6">
                <div className="bg-indigo-950/40 border-2 border-indigo-500/50 p-4 rounded-2xl flex-1 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.1)] overflow-y-auto">
                  <h2 className="text-xs font-black uppercase mb-4 border-b border-indigo-400/30 pb-2 text-cyan-300 tracking-widest">Galactic Rankings</h2>
                  <div className="space-y-3">
                    {leaderboard.map((entry, idx) => (
                      <div key={idx} className={`flex justify-between items-center text-[10px] font-black p-2 rounded-lg border-l-4 ${idx === 0 ? 'bg-white/10 border-yellow-400 text-yellow-400' : 'bg-white/5 border-cyan-500/50 text-white/70'}`}>
                        <span className="truncate">{idx + 1}. {entry.name}</span>
                        <span>{entry.score}</span>
                      </div>
                    ))}
                    {leaderboard.length === 0 && <div className="text-[10px] uppercase text-white/30 text-center py-4 italic">No Data Acquired</div>}
                  </div>
                </div>
                
                <div className="bg-black/60 border-2 border-cyan-500/40 p-4 rounded-2xl h-40 shadow-inner">
                  <h2 className="text-[10px] uppercase font-black text-cyan-400 mb-2 tracking-widest">Navigation Logs</h2>
                  <ul className="text-[9px] space-y-2 uppercase leading-tight font-black text-white/60">
                    <li>• Success: <span className="text-cyan-400">+100 PTS</span></li>
                    <li>• Anomaly: <span className="text-red-400">-25 PTS</span></li>
                    <li>• Fuel Decay: <span className="text-orange-400">-3 PTS/S</span></li>
                    <li className="text-cyan-500 animate-pulse mt-2 underline italic">Current Target: OBJ {currentQuestionIndex + 1}/{selectedQuestions.length}</li>
                  </ul>
                </div>
              </section>

              {/* Main Interaction Area */}
              <section className="flex-1 flex flex-col gap-6">
                <div className="flex-1 bg-white/10 border-4 border-white/20 rounded-[40px] p-8 flex flex-col relative overflow-hidden backdrop-blur-md">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
                  
                  <AnimatePresence mode="wait">
                    {!showExplanation ? (
                      <motion.div
                        key="question"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col"
                      >
                        <div className="flex-1 flex gap-8 items-start relative z-10">
                          <div className="w-72 h-72 bg-black/40 rounded-[40px] border-4 border-cyan-500/30 flex-shrink-0 flex items-center justify-center p-4 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-cyan-900/10 animate-pulse group-hover:bg-cyan-900/20" />
                            <QuestionAnimation type={selectedQuestions[currentQuestionIndex].animationType} />
                            
                            {/* Prominent Question Badge */}
                            <div className="absolute top-4 left-4 bg-cyan-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase italic tracking-widest shadow-lg">
                              #{currentQuestionIndex + 1}
                            </div>
                          </div>
                          
                          <div className="flex-1 pt-6">
                            <div className="flex items-center gap-3 mb-6">
                              <span className="px-4 py-1.5 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-extrabold uppercase text-[11px] rounded-full tracking-[0.2em] shadow-inner">
                                Mission Task {currentQuestionIndex + 1} / {selectedQuestions.length}
                              </span>
                              <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/40 to-transparent" />
                            </div>
                            <h3 className="text-4xl font-black italic leading-tight uppercase text-white tracking-tight drop-shadow-lg">
                              {selectedQuestions[currentQuestionIndex].question}
                            </h3>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
                          {selectedQuestions[currentQuestionIndex].options.map((option, idx) => (
                            <motion.button
                              key={idx}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleAnswer(option)}
                              className="p-6 rounded-2xl text-lg font-black uppercase italic transition-all flex items-center gap-4 text-left border-2 bg-white/5 border-white/20 text-white hover:bg-cyan-500 hover:text-black hover:border-cyan-500"
                            >
                              <span className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center text-xs shrink-0">
                                {String.fromCharCode(65 + idx)}
                              </span>
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="explanation"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex-1 flex flex-col items-center relative z-10"
                      >
                        <div className="flex items-center gap-6 w-full mb-8">
                          <div className={`text-3xl font-black italic uppercase px-6 py-2 rounded-xl border-4 ${showFeedback === 'correct' ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-red-500 text-white border-red-400'}`}>
                            {showFeedback === 'correct' ? `Question ${currentQuestionIndex + 1} Success` : `Question ${currentQuestionIndex + 1} Failed`}
                          </div>
                          <div className="flex-1 h-1 bg-white/20 rounded-full" />
                        </div>

                        <div className="flex-1 flex gap-8 items-center bg-black/40 p-8 rounded-3xl border-2 border-white/10 w-full relative">
                          <div className="w-52 h-52 bg-slate-900 rounded-3xl border-4 border-cyan-400/50 flex-shrink-0 flex items-center justify-center p-2 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-cyan-900/10 animate-pulse group-hover:bg-cyan-900/20" />
                            <QuestionAnimation type={selectedQuestions[currentQuestionIndex].animationType} />
                          </div>

                          <div className="flex-1 space-y-4">
                            <div className="flex flex-col gap-1 mb-2">
                              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Correct Answer:</span>
                              <div className="text-2xl font-black italic text-cyan-400 uppercase leading-none">
                                {selectedQuestions[currentQuestionIndex].correctAnswer}
                              </div>
                            </div>
                            <div className="p-4 bg-cyan-500/10 border-l-4 border-cyan-500 rounded-lg">
                              <p className="text-xl font-black italic text-white uppercase leading-relaxed">
                                {selectedQuestions[currentQuestionIndex].explanation}
                              </p>
                            </div>
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400/60">
                              <Star size={12} className="fill-current" />
                              Knowledge Base Decrypted
                              <Star size={12} className="fill-current" />
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={nextQuestion}
                          className="mt-8 px-12 py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase italic tracking-widest text-xl rounded-xl transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] flex items-center gap-4"
                        >
                          Next Planetary Target <ChevronRight size={24} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
            </section>
          </main>
        </motion.div>
      )}

        {gameState === 'GAME_OVER' && (
          <motion.div 
            key="gameover"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="z-10 w-full max-w-md text-center space-y-8 p-10 bg-indigo-950/40 border-4 border-cyan-500 rounded-[40px] backdrop-blur-md shadow-[0_0_50px_rgba(34,211,238,0.2)]"
          >
            <div className="space-y-2">
              <div className="inline-block p-6 bg-cyan-500/10 border-2 border-cyan-500 rounded-full mb-4 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                <Trophy size={64} className="text-cyan-400" />
              </div>
              <span className="text-[10px] uppercase font-black text-cyan-400 tracking-[0.4em]">Mission Status</span>
              <h2 className="text-4xl font-black italic uppercase text-white leading-none">Mission Complete</h2>
              <p className="text-cyan-400/60 font-black uppercase text-xs tracking-widest mt-2 px-4 py-1 bg-white/5 rounded-full inline-block">Excellent Performance, Explorer {playerName}</p>
            </div>

            <div className="bg-black/60 rounded-3xl p-8 border-2 border-cyan-500/40 shadow-inner">
              <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/50 mb-4">Total Scientific Yield</p>
              <div className="text-7xl font-black text-white italic tracking-tighter shadow-cyan-400/20">
                {score.toLocaleString()}
              </div>
              <p className="text-[10px] uppercase tracking-[0.1em] font-black text-cyan-400 mt-2">Star Points Acquired</p>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => setGameState('LEADERBOARD')}
                className="w-full bg-cyan-500 text-black font-black py-5 rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest italic text-lg shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                View Hall of Fame <ChevronRight size={24} />
              </button>
              <button
                onClick={startGame}
                className="w-full bg-white/5 border-2 border-white/20 text-white font-black py-5 rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 uppercase tracking-widest italic"
              >
                Re-Launch Mission <RefreshCcw size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'LEADERBOARD' && (
          <motion.div 
            key="leaderboard"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="z-10 w-full max-w-lg bg-black/60 border-4 border-cyan-500 p-10 rounded-[40px] backdrop-blur-md space-y-8 shadow-[0_0_50px_rgba(34,211,238,0.2)]"
          >
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 bg-cyan-500/10 px-6 py-2 rounded-full border-2 border-cyan-500/40 mb-2">
                <Star size={20} className="text-yellow-400 fill-yellow-400" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-cyan-400">Galactic Hall of Fame</span>
                <Star size={20} className="text-yellow-400 fill-yellow-400" />
              </div>
              <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">Top Tier Explorers</h2>
            </div>

            <div className="space-y-4 font-mono">
              {leaderboard.length > 0 ? (
                leaderboard.map((entry, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${i === 0 ? 'bg-indigo-950/60 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.2)]' : 'bg-white/5 border-white/10'}`}
                  >
                    <div className="flex items-center gap-5">
                      <span className={`text-2xl font-black italic ${i === 0 ? 'text-yellow-400' : 'text-cyan-500/50'}`}>{i + 1}</span>
                      <div>
                        <p className={`font-black uppercase tracking-widest ${i === 0 ? 'text-yellow-400 border-b-2 border-yellow-400/30' : 'text-white'}`}>{entry.name}</p>
                        <p className="text-[9px] text-white/40 uppercase tracking-widest mt-1">LOGGED: {entry.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-black tabular-nums italic ${i === 0 ? 'text-yellow-400' : 'text-cyan-400'}`}>{entry.score.toLocaleString()}</p>
                      <p className="text-[9px] text-cyan-500/50 uppercase tracking-widest font-black">Points</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-white/20 uppercase font-black italic tracking-[0.3em]">No Mission Data Detected</div>
              )}
            </div>

            <button
              onClick={() => setGameState('START')}
              className="w-full bg-cyan-500 text-black font-black py-5 rounded-xl uppercase tracking-widest italic text-lg"
            >
              Return to Command Center
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Style for twinkling effect */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
