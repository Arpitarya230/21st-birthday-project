import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Hourglass, ArrowRight } from "lucide-react";

interface ProposalSectionProps {
  onYes: () => void;
  onNeedTime: () => void;
}

export default function ProposalSection({ onYes, onNeedTime }: ProposalSectionProps) {
  const [showNeedTimeDialog, setShowNeedTimeDialog] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden z-10">
      <AnimatePresence mode="wait">
        {!showNeedTimeDialog ? (
          <motion.div
            key="proposal-form"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="w-full max-w-2xl bg-stone-950/40 glassmorphism-dark p-8 md:p-12 rounded-3xl text-center shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-white/10 flex flex-col items-center"
          >
            {/* Ambient Candle/Glow element indicator */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-linear-to-r from-transparent via-rose-400 to-transparent blur-[2px]" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <span className="px-3.5 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] text-[#d4af37] bg-amber-500/10 border border-amber-500/20 uppercase">
                The Final Decision
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-serif text-3xl md:text-4xl text-white font-normal mb-8 tracking-wide flex items-center gap-2"
            >
              One Last Question...
            </motion.h2>

            {/* Proposal Prose block */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-serif text-stone-200 text-sm md:text-base leading-loose max-w-xl mx-auto space-y-6 text-left border-y border-white/5 py-8"
            >
              <p className="indent-4 leading-loose">
                "If life gives people second chances, then today I am asking for mine.
              </p>
              <p className="indent-4 leading-loose">
                Not because I deserve it.
              </p>
              <p className="indent-4 leading-loose font-medium text-rose-300">
                But because what we had was worth fighting for.
              </p>
              <p className="indent-4 leading-loose">
                I cannot promise perfection. But I can promise growth. I can promise honesty. I can promise effort. And I can promise that I will never stop appreciating the person you are.
              </p>
              <p className="indent-4 leading-loose font-serif italic text-stone-300">
                Whether your answer is yes or no, I will always be grateful for every memory we created.
              </p>
              <p className="text-center font-semibold text-rose-400 text-base md:text-lg mt-8">
                But if your heart still has room for me, would you allow us to write one more chapter together?"
              </p>
            </motion.div>

            {/* Respectful Response Selection */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-10"
            >
              <button
                id="proposal-yes-btn"
                onClick={onYes}
                className="px-10 py-4 bg-linear-to-r from-rose-500 via-pink-500 to-rose-600 text-white rounded-full font-serif italic font-semibold text-sm tracking-widest uppercase shadow-[0_12px_30px_rgba(244,63,94,0.4)] hover:shadow-[0_15px_40px_rgba(244,63,94,0.6)] hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer duration-300 ring-2 ring-white/10 flex items-center justify-center gap-2"
              >
                <span>YES ❤️</span>
              </button>

              <button
                id="proposal-need-time-btn"
                onClick={() => setShowNeedTimeDialog(true)}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-stone-300 rounded-full font-sans text-xs tracking-widest uppercase border border-white/10 hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer duration-300 flex items-center justify-center gap-1.5"
              >
                <span>I NEED TIME 🌸</span>
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="need-time-dialog"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg glassmorphism-dark p-8 md:p-10 rounded-3xl text-center shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 border border-amber-500/20">
              <Hourglass className="text-[#d4af37] animate-spin-slow" size={24} />
            </div>

            <p className="font-serif text-lg md:text-xl text-stone-200 leading-relaxed font-light mb-4">
              "Take all the time in the world. I completely understand, and I appreciate your honesty more than anything."
            </p>

            <p className="font-sans text-stone-400 text-xs md:text-sm leading-relaxed mb-8 max-w-md">
              Your comfort, space, and peace are my priority. I will be right here, working on being the person you deserve.
            </p>

            <div className="flex flex-col gap-3 w-full items-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#c39797]">
                Today is also your special day...
              </span>
              <button
                id="proposal-proceed-anyway-btn"
                onClick={onNeedTime}
                className="px-8 py-3.5 bg-linear-to-r from-amber-500 to-rose-500 text-white rounded-full font-serif italic text-xs tracking-widest uppercase hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer duration-300 shadow-[0_8px_20px_rgba(245,158,11,0.2)] flex items-center gap-2"
              >
                <span>Celebrate Your Birthday anyway 🎂</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
