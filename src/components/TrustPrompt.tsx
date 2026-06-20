import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, HeartHandshake, ShieldAlert, ArrowRight } from "lucide-react";

interface TrustPromptProps {
  onNext: () => void;
}

export default function TrustPrompt({ onNext }: TrustPromptProps) {
  const [step, setStep] = useState<"ask" | "question" | "no-response">("ask");

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden z-10">
      <AnimatePresence mode="wait">
        {step === "ask" && (
          <motion.div
            key="ask"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md text-center flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20"
            >
              <HelpCircle className="text-pink-300 animate-[bounce_3s_infinite]" size={22} />
            </motion.div>
            
            <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wide font-normal mb-8">
              Can I ask you something?
            </h2>

            <button
              id="trust-start-btn"
              onClick={() => setStep("question")}
              className="px-6 py-3 border border-rose-300/30 bg-rose-500/10 text-rose-200 rounded-full font-serif font-light text-sm tracking-widest uppercase hover:bg-rose-500/20 hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer duration-300"
            >
              Please ask
            </button>
          </motion.div>
        )}

        {step === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full max-w-lg glassmorphism-dark p-8 md:p-10 rounded-3xl text-center shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-6 border border-rose-500/20">
              <HeartHandshake className="text-pink-300" size={26} />
            </div>

            <p className="font-serif text-xl md:text-2xl text-stone-200 leading-relaxed font-light mb-8">
              "Do you still trust me enough to listen to what I have to say?"
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button
                id="trust-yes-btn"
                onClick={onNext}
                className="px-8 py-3 bg-linear-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium tracking-wide shadow-[0_10px_20px_rgba(244,63,94,0.3)] hover:scale-105 hover:translate-y-[-1px] active:scale-95 transition-all outline-none cursor-pointer duration-300"
              >
                YES 💖
              </button>

              <button
                id="trust-no-btn"
                onClick={() => setStep("no-response")}
                className="px-8 py-3 bg-white/5 hover:bg-white/10 text-stone-300 rounded-full font-medium tracking-wide border border-white/10 hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer duration-300"
              >
                NO 💔
              </button>
            </div>
          </motion.div>
        )}

        {step === "no-response" && (
          <motion.div
            key="no-response"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg glassmorphism-dark p-8 md:p-10 rounded-3xl text-center shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 border border-amber-500/20">
              <ShieldAlert className="text-amber-400" size={24} />
            </div>

            <p className="font-serif text-lg md:text-xl text-stone-200 leading-relaxed font-light mb-4">
              "I understand. Trust is earned, not requested. But thank you for reaching this far."
            </p>
            
            <p className="font-sans text-stone-400 text-xs md:text-sm leading-relaxed mb-8 max-w-md">
              Even if you don't trust me fully right now, I hope you find comfort in knowing that this letter holds my complete honesty.
            </p>

            <button
              id="trust-anyway-btn"
              onClick={onNext}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white rounded-full font-medium tracking-wide flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer duration-300 border border-white/20"
            >
              <span>Continue Anyway</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
