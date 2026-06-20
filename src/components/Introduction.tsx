import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

interface IntroductionProps {
  onConfirm: () => void;
  isMuted: boolean;
  onUnmute: () => void;
}

export default function Introduction({ onConfirm, isMuted, onUnmute }: IntroductionProps) {
  const [declined, setDeclined] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden z-10">
      <AnimatePresence mode="wait">
        {!declined ? (
          <motion.div
            key="welcome-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-lg glassmorphism-dark p-8 md:p-10 rounded-3xl text-center shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-6 border border-rose-500/20"
            >
              <Heart className="text-rose-400 fill-rose-500/20 animate-[pulse_2s_infinite]" size={28} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-serif text-3xl md:text-4xl text-white tracking-wide font-normal mb-4"
            >
              Before You Continue...
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="font-sans text-stone-300 text-sm md:text-base leading-relaxed mb-6 font-light"
            >
              I made this only for you. Every word comes from my heart. It contains my regrets, my love, and a celebrations of the beautiful person you are.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="font-sans text-rose-200 text-sm md:text-base font-medium mb-8"
            >
              Are you comfortable viewing what's ahead?
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            >
              <button
                id="intro-yes-btn"
                onClick={() => {
                  if (isMuted) {
                    onUnmute(); // automatically unmute to start the music on confirming comfort!
                  }
                  onConfirm();
                }}
                className="px-8 py-3.5 bg-linear-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium tracking-wide flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(244,63,94,0.35)] hover:shadow-[0_12px_30px_rgba(244,63,94,0.5)] hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer duration-300 ring-2 ring-white/10"
              >
                <span>YES ❤️</span>
              </button>

              <button
                id="intro-no-btn"
                onClick={() => setDeclined(true)}
                className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-stone-300 rounded-full font-medium tracking-wide border border-white/10 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer duration-300"
              >
                <span>NO 🌸</span>
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="decline-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg glassmorphism-dark p-8 md:p-10 rounded-3xl text-center shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="w-16 h-16 rounded-full bg-stone-500/10 flex items-center justify-center mb-6 border border-stone-500/20"
            >
              <AlertCircle className="text-pink-300" size={28} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-serif text-lg md:text-xl text-stone-200 leading-relaxed mb-8 font-light"
            >
              "That's completely okay. Your comfort means more to me than anything else."
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              id="intro-go-back-btn"
              onClick={() => setDeclined(false)}
              className="flex items-center gap-2 text-rose-400 hover:text-rose-300 text-xs font-mono uppercase tracking-wider outline-none cursor-pointer hover:underline"
            >
              <RefreshCw size={12} className="animate-spin-slow" />
              <span>I changed my mind</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
