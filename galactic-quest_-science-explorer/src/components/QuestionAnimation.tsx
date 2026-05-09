import { motion } from 'motion/react';
import { Rocket, Globe, Star, Signal, GraduationCap, Bird, Compass, Zap, Satellite } from 'lucide-react';

interface AnimationProps {
  type: string;
}

export const QuestionAnimation = ({ type }: AnimationProps) => {
  const containerVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const renderContent = () => {
    switch (type) {
      case 'gas-planet':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-full relative overflow-hidden"
              style={{ background: 'radial-gradient(circle at 30% 30%, #ec4899, #8b5cf6, #1e1b4b)' }}
            >
              <div className="absolute inset-0 opacity-30 bg-black/20" />
              <motion.div 
                animate={{ x: [-20, 20] }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
                className="absolute top-1/4 left-0 w-full h-3 bg-white/10 blur-sm" 
              />
              <motion.div 
                animate={{ x: [20, -20] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
                className="absolute top-2/3 left-0 w-full h-2 bg-pink-400/10 blur-sm" 
              />
            </motion.div>
            <motion.div 
              animate={{ rotateX: [70, 75, 70], rotateZ: [0, 360] }}
              transition={{ rotateZ: { duration: 15, repeat: Infinity, ease: "linear" } }}
              className="absolute w-48 h-16 rounded-[100%] border-4 border-cyan-400/20" 
            />
          </div>
        );
      case 'orbit-venus':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-14 h-14 bg-yellow-500 rounded-full shadow-[0_0_40px_#eab308]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute w-36 h-36 border border-white/5 rounded-full"
            >
              <div className="absolute top-0 left-1/2 -ml-3 w-6 h-6 bg-orange-400 rounded-full border-2 border-orange-600 shadow-[0_0_10px_#fb923c]" />
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-52 h-52 border border-white/5 rounded-full"
            >
              <div className="absolute top-0 left-1/2 -ml-4 w-8 h-8 bg-blue-500 rounded-full border-2 border-blue-700 shadow-[0_0_15px_#3b82f6]" />
            </motion.div>
          </div>
        );
      case 'capsule-descent':
        return (
          <motion.div 
            animate={{ y: [-10, 10, -10], x: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="flex gap-1 mb-1">
              <motion.div animate={{ height: [20, 40, 20] }} className="w-0.5 bg-white/20" />
              <motion.div animate={{ height: [40, 20, 40] }} className="w-0.5 bg-white/20" />
            </div>
            <div className="w-28 h-12 bg-orange-500 rounded-t-full border-b-4 border-orange-700 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-4">
                <div className="w-10 h-0.5 bg-white/40" />
                <div className="w-10 h-0.5 bg-white/40" />
              </div>
            </div>
            <div className="w-16 h-12 bg-slate-400 rounded-b-xl border-t-2 border-slate-500" />
          </motion.div>
        );
      case 'star-fire':
        return (
          <div className="relative flex items-center justify-center scale-125">
            <motion.div
              animate={{ scale: [1, 1.1, 1], filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 bg-orange-500 rounded-full shadow-[0_0_60px_#f97316]"
            />
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                  x: Math.cos(i * 45 * Math.PI / 180) * 80,
                  y: Math.sin(i * 45 * Math.PI / 180) * 80
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="absolute w-3 h-3 bg-yellow-400 rounded-full blur-sm"
              />
            ))}
          </div>
        );
      case 'galaxy-swirl':
        return (
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="relative w-48 h-48 flex items-center justify-center opacity-80"
          >
            <div className="w-6 h-6 bg-white rounded-full shadow-[0_0_30px_white]" />
            {[...Array(60)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${i * 6}deg) translateX(${15 + i * 0.8}px)`,
                  opacity: 1 - (i / 60)
                }}
              />
            ))}
          </motion.div>
        );
      case 'bird-stars':
        return (
          <div className="relative w-full h-full bg-black/20 rounded-xl">
             {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.1, 1, 0.1] }}
                transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: Math.random() }}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{ 
                  left: `${Math.random() * 90 + 5}%`, 
                  top: `${Math.random() * 90 + 5}%` 
                }}
              />
            ))}
            <motion.div
              animate={{ x: [-100, 300] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 flex flex-col gap-4"
            >
              <Bird className="w-8 h-8 text-cyan-400" />
            </motion.div>
          </div>
        );
      case 'moon-footprint':
        return (
          <div className="flex flex-col items-center justify-center bg-slate-700 w-32 h-32 rounded-full border-4 border-slate-600 shadow-[inset_0_5px_15px_rgba(0,0,0,0.5)]">
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ delay: 0.5 }}
              className="w-16 h-24 bg-slate-900 rounded-full rotate-12 relative"
              style={{ borderRadius: '50% 50% 40% 40%' }}
            >
              <div className="absolute inset-x-2 top-2 h-4 bg-slate-800 rounded-full overflow-hidden flex gap-1">
                {[...Array(5)].map((_, i) => <div key={i} className="flex-1 bg-slate-700" />)}
              </div>
            </motion.div>
          </div>
        );
      case 'hot-blue-star':
        return (
          <div className="relative scale-110">
            <motion.div
              animate={{ scale: [1, 1.05, 1], filter: ['blur(0px)', 'blur(4px)', 'blur(0px)'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-32 h-32 bg-cyan-400 rounded-full shadow-[0_0_70px_#22d3ee]"
            />
            <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/40 font-black">HIGH ENERGY</div>
          </div>
        );
      case 'rocket-launch':
        return (
          <div className="h-44 w-full flex flex-col items-center justify-end overflow-hidden">
            <motion.div 
              animate={{ y: [0, -250], opacity: [1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeIn" }}
              className="flex flex-col items-center"
            >
              <Rocket className="w-16 h-16 text-cyan-400" />
              <motion.div 
                animate={{ height: [40, 120, 40], width: [10, 20, 10] }}
                className="bg-orange-500 blur-md rounded-b-full shadow-[0_0_20px_#f97316]" 
              />
            </motion.div>
          </div>
        );
      case 'infinite-space':
        return (
          <div className="relative w-48 h-48 flex items-center justify-center overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2.5, opacity: [0, 0.4, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: i * 1.25, ease: "easeOut" }}
                className="absolute w-32 h-32 border border-cyan-400/30 rounded-full"
              />
            ))}
            <div className="absolute bg-white/5 w-1 h-1 rounded-full animate-pulse" />
          </div>
        );
      case 'phone-signal':
        return (
          <div className="flex flex-col items-center gap-6">
            <Globe className="w-20 h-20 text-cyan-500 animate-pulse" />
            <div className="flex gap-3">
              {[0, 1, 2, 3, 4].map(i => (
                <motion.div
                  key={i}
                  animate={{ height: [12, 40, 12] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                  className="w-2.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"
                />
              ))}
            </div>
          </div>
        );
      case 'cosmonaut':
        return (
          <div className="relative flex flex-col items-center gap-2">
             <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <div className="w-28 h-28 bg-white rounded-full border-4 border-slate-300 relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-200 to-white" />
                <div className="absolute top-4 left-4 right-4 h-12 bg-slate-900/90 rounded-full border-t-2 border-white/20" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] text-slate-400 font-bold tracking-widest uppercase">USSR-SPEC</div>
              </div>
              <div className="w-32 h-14 bg-white rounded-t-3xl shadow-lg border-x-4 border-slate-300" />
            </motion.div>
            <div className="w-36 h-3 bg-black/20 rounded-full blur-md" />
          </div>
        );
      case 'sun-gravity':
        return (
          <div className="relative w-48 h-48 flex items-center justify-center">
            <div className="w-18 h-18 bg-yellow-500 rounded-full shadow-[0_0_50px_#eab308] border-2 border-yellow-400/30" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              className="absolute w-36 h-36 border-2 border-dashed border-white/10 rounded-full"
            >
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full border-2 border-white/50 shadow-lg flex items-center justify-center overflow-hidden"
              >
                <div className="w-1/2 h-full bg-slate-800/20 rotate-45" />
              </motion.div>
            </motion.div>
          </div>
        );
      case 'school-degree':
        return (
          <div className="flex flex-col items-center gap-6">
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [-1, 1, -1] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="relative"
            >
              <GraduationCap className="w-24 h-24 text-cyan-400" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] px-2 py-1 rounded font-black italic shadow-lg"
              >
                 Ph.D SPACE
              </motion.div>
            </motion.div>
            <div className="flex gap-4">
              <div className="w-12 h-1 bg-cyan-400/20 rounded-full" />
              <div className="w-20 h-1 bg-cyan-400/40 rounded-full" />
              <div className="w-12 h-1 bg-cyan-400/20 rounded-full" />
            </div>
          </div>
        );
      case 'sun-light':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-blue-400 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-500" />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="w-40 h-40 bg-yellow-200 rounded-full blur-[60px]"
            />
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/20 blur-[10px]" />
            <div className="absolute inset-0 p-4 opacity-5">
              {[...Array(30)].map((_, i) => <Star key={i} className="w-2 h-2 absolute" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }} />)}
            </div>
          </div>
        );
      case 'space-station':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="relative flex items-center justify-center scale-90"
          >
            <div className="w-12 h-12 bg-slate-300 border-2 border-slate-500 rounded-sm relative z-10" />
            {[0, 90, 180, 270].map(rot => (
              <div key={rot} className="absolute" style={{ transform: `rotate(${rot}deg) translateX(40px)` }}>
                <div className="w-16 h-10 bg-cyan-500/20 border border-cyan-400/50 flex flex-wrap gap-1 p-1">
                  {[...Array(6)].map((_, i) => <div key={i} className="flex-1 bg-cyan-400/30 rounded-sm" />)}
                </div>
              </div>
            ))}
            <div className="absolute w-36 h-36 border border-white/5 rounded-full" />
          </motion.div>
        );
      case 'moon-phase-shift':
        return (
          <div className="relative w-40 h-40 flex items-center justify-center">
             <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
            <div className="w-32 h-32 bg-slate-800 rounded-full overflow-hidden relative">
              <motion.div
                animate={{ x: [-64, 128] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-yellow-100 rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2)]"
              />
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstripe-dark.png')]" />
            </div>
          </div>
        );
      case 'rocket-base':
        return (
          <div className="flex flex-col items-center justify-end w-full h-full pb-4">
             <motion.div
              animate={{ y: [2, 0, 2] }}
              transition={{ duration: 0.2, repeat: Infinity }}
              className="relative p-8 border-x-4 border-slate-700 bg-slate-800/40 rounded-t-3xl"
            >
              <Rocket className="w-20 h-20 text-slate-300" />
              <div className="absolute -left-4 bottom-0 w-4 h-16 bg-slate-600 rounded-l-full" />
              <div className="absolute -right-4 bottom-0 w-4 h-16 bg-slate-600 rounded-r-full" />
            </motion.div>
            <div className="w-56 h-4 bg-slate-900 border-2 border-slate-700 rounded-full shadow-lg" />
            <div className="flex gap-2 mt-2">
              <div className="w-3 h-3 bg-red-500/40 rounded-full animate-blink" />
              <div className="w-3 h-3 bg-green-500/40 rounded-full" />
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center gap-4 opacity-40">
            <Rocket className="w-16 h-16 text-cyan-400 animate-pulse" />
          </div>
        );
    }
  };

  if (!type) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Rocket className="w-12 h-12 text-cyan-500/20 animate-pulse" />
      </div>
    );
  }

  return (
    <motion.div 
      key={type}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="w-full h-full flex items-center justify-center overflow-hidden p-4 rounded-xl"
    >
      {renderContent()}
    </motion.div>
  );
};
