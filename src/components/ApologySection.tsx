import React from "react";
import { motion } from "motion/react";
import { Heart, MailOpen } from "lucide-react";

interface ApologySectionProps {
  onContinue: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// 📸  PUT YOUR PHOTOS IN:  /public/photos/
//     Then update the three paths below.
//     e.g. if your file is  public/photos/memory1.jpg
//     the path here should be  "/photos/memory1.jpg"
// ─────────────────────────────────────────────────────────────────────────────
const PHOTOS = {
  1: "/photos/memory1.jpg",
  2: "/photos/memory2.jpg",
  3: "/photos/memory3.jpg",
};

const CAPTIONS = {
  1: "Where it felt like home",
  2: "That radiant laughter",
  3: "Captured forever",
};

// Fallback illustrated cards shown when no photo file exists at the path
function DefaultCard({ index }: { index: number }) {
  if (index === 1) {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full text-rose-300/30 p-8">
        <path d="M50 15 Q25 15 25 35 Q50 35 50 35 Q50 35 75 35 Q75 15 50 15 Z" fill="currentColor" />
        <line x1="50" y1="35" x2="50" y2="70" stroke="currentColor" strokeWidth="2" />
        <path d="M50 70 Q55 75 60 70" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M38 55 Q35 50 38 45 Q41 40 45 45 Q49 40 52 45 Q55 50 52 55 L45 61 Z" fill="rgba(244,63,94,0.15)" stroke="rgba(244,63,94,0.4)" strokeWidth="1" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full text-purple-300/30 p-8">
        <rect x="25" y="45" width="20" height="25" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M45 50 Q50 52 45 60" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="55" y="45" width="20" height="25" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M55 50 Q50 52 55 60" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M35 30 Q37 20 35 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M65 30 Q67 20 65 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full text-amber-300/30 p-8">
      <polygon points="50,20 53,35 68,35 56,44 60,59 50,50 40,59 44,44 32,35 47,35" fill="rgba(253,186,116,0.15)" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
      <circle cx="80" cy="75" r="3" fill="currentColor" />
      <circle cx="75" cy="25" r="1.5" fill="currentColor" />
    </svg>
  );
}

export default function ApologySection({ onContinue }: ApologySectionProps) {
  const rotations: Record<number, string> = { 1: "-2deg", 2: "1.5deg", 3: "-1deg" };
  const hoverRotations: Record<number, string> = { 1: "-0.5deg", 2: "3deg", 3: "1deg" };

  return (
    <div className="min-h-screen w-full py-16 px-4 md:py-24 relative overflow-y-auto max-w-6xl mx-auto z-10 flex flex-col items-center">

      {/* Chapter label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-4xl mb-4 text-center"
      >
        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] text-rose-300 bg-rose-500/10 border border-rose-500/20 uppercase">
          Chapter I • A Heartfelt Regret
        </span>
      </motion.div>

      {/* THREE POLAROID CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-6 mb-12">
        {([1, 2, 3] as const).map((id) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: id * 0.15, duration: 0.6 }}
            whileHover={{ scale: 1.03, rotate: hoverRotations[id], translateY: -6 }}
            className="bg-white/95 p-4 rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.35)] text-stone-800 border border-white relative flex flex-col justify-between overflow-hidden"
            style={{ rotate: rotations[id] }}
          >
            {/* Photo frame */}
            <div className="w-full aspect-square bg-[#0f0e13] rounded-lg overflow-hidden relative flex items-center justify-center shadow-inner">
              <img
                src={PHOTOS[id]}
                alt={`Memory ${id}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Hide broken img and show fallback via state-free CSS trick
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              {/* Fallback: hidden by default, shown by onError above */}
              <div
                className="absolute inset-0 flex-col items-center justify-center p-4 text-center text-stone-500/80"
                style={{ display: "none" }}
              >
                <DefaultCard index={id} />
                <span className="font-serif italic text-xs block text-stone-400 mt-2">
                  {id === 1 ? "Days in the Rain" : id === 2 ? "Cozy Smiles" : "Glow in the Dark"}
                </span>
              </div>
            </div>

            {/* Caption */}
            <div className="pt-4 pb-2 text-center border-t border-stone-200/50 mt-4">
              <p className="font-cursive text-2xl text-rose-700/90 leading-none">
                {CAPTIONS[id]}
              </p>
              <p className="font-mono text-[9px] tracking-widest uppercase text-stone-400 mt-1.5">
                • Photo {id} •
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* APOLOGY LETTER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl bg-stone-900/40 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 relative flex flex-col"
      >
        {/* Simulated teardrops */}
        <div className="absolute top-4 right-10 flex gap-2 opacity-30 pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-300/60 blur-[0.5px] animate-pulse"></div>
          <div className="w-1 h-3 rounded-full bg-blue-200/40 blur-[0.5px]"></div>
        </div>

        {/* Envelope icon */}
        <div className="text-rose-400/80 mb-6 flex items-center justify-center self-center w-12 h-12 bg-white/5 rounded-full border border-white/10">
          <MailOpen size={20} className="animate-pulse" />
        </div>

        <div className="font-serif text-stone-200 text-left leading-relaxed space-y-6 text-sm md:text-base selection:bg-rose-500 selection:text-white">
          <h3 className="font-serif text-xl italic text-rose-300 mb-8 border-b border-rose-300/10 pb-2">
            My Love,
          </h3>

          <p className="indent-4 leading-loose">
            I know I made mistakes.
          </p>

          <p className="indent-4 leading-loose">
            Mistakes that hurt someone who deserved nothing but love, respect, honesty, and care.
          </p>

          <p className="indent-4 leading-loose">
            Looking back, I realize how much I took for granted the beautiful presence you brought into my life.
          </p>

          <div className="my-8 pl-4 border-l-2 border-rose-400/40 italic text-stone-100 bg-white/5 py-4 pr-4 rounded-r-xl">
            <p className="font-serif mb-2 text-stone-100">
              "You were not just a person in my life."
            </p>
            <p className="font-serif text-rose-300">
              You became my peace. My comfort. My happiness. My favorite part of every day.
            </p>
          </div>

          <p className="indent-4 leading-loose">I cannot change the past.</p>

          <p className="indent-4 leading-loose">
            But I can acknowledge it, learn from it, and become better because of it.
          </p>

          <p className="indent-4 leading-loose">
            If there is one thing I want you to know, it is this:
          </p>

          <div className="space-y-1 font-serif text-stone-100 font-semibold text-center py-4 bg-rose-500/5 rounded-xl border border-rose-500/10 mb-6">
            <p className="text-xl">You mattered.</p>
            <p className="text-xl text-rose-300">You still matter.</p>
            <p className="text-xl text-rose-400 font-cursive italic tracking-wide">
              And you will always be one of the most important people I have ever known.
            </p>
          </div>

          <p className="indent-4 leading-loose">
            Life has felt quieter without your smile. Days feel longer without our conversations. And every memory reminds me how lucky I was to have you.
          </p>

          <p className="indent-4 leading-loose font-serif font-semibold text-rose-300 text-lg border-t border-rose-300/10 pt-4 mt-6">
            I am truly sorry.
          </p>

          <div className="text-right italic text-stone-400 pr-4 mt-4">
            <p className="text-base text-rose-400 font-medium">Not because I lost you.</p>
            <p className="font-serif">But because I hurt someone I deeply loved.</p>
          </div>
        </div>

        {/* Continue button */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col items-center justify-center gap-4 text-center">
          <span className="text-xs font-serif tracking-wider text-rose-300 animate-pulse font-light">
            Ready to see what's next?
          </span>
          <button
            id="apology-continue-btn"
            onClick={onContinue}
            className="px-10 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full font-serif italic text-sm tracking-widest uppercase hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer duration-300 shadow-[0_10px_25px_rgba(244,63,94,0.3)] ring-2 ring-white/10 flex items-center justify-center gap-1"
          >
            <span>Continue</span>
            <Heart size={14} className="fill-white" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}