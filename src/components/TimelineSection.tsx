import React, { useRef } from "react";
import { motion } from "motion/react";
import { Heart, ChevronRight, ChevronLeft, CalendarHeart } from "lucide-react";

interface TimelineSectionProps {
  onNext: () => void;
}

interface Milestone {
  id: number;
  title: string;
  stage: string;
  dateStr: string;
  description: string;
  illustration: React.ReactNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// 📸  PUT YOUR PHOTOS IN:  /public/photos/
//     Then update the paths below.
//     e.g. if your file is  public/photos/timeline1.jpg
//     the path here should be  "/photos/timeline1.jpg"
// ─────────────────────────────────────────────────────────────────────────────
const TIMELINE_PHOTOS: Record<number, string> = {
  1: "/photos/timeline1.jpg",
  2: "/photos/timeline2.jpg",
  3: "/photos/timeline3.jpg",
  4: "/photos/timeline4.jpg",
  5: "/photos/timeline5.jpg",
};

export default function TimelineSection({ onNext }: TimelineSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeftAction = () => {
    scrollContainerRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRightAction = () => {
    scrollContainerRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  const milestones: Milestone[] = [
    {
      id: 1,
      stage: "First Meeting",
      title: "Where It Began",
      dateStr: "The Magic Spark",
      description: "The moment my world suddenly shifted. I still remember the warmth, your nervous smile, and my heart realizing it would never be the same.",
      illustration: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-rose-300/40">
          <circle cx="40" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="60" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M47 50 L53 50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M50 35 H50 Q50 38 53 38" stroke="currentColor" strokeWidth="1" />
          <path d="M50 43 L50 40 Q47 40 47 43" stroke="currentColor" strokeWidth="1" />
        </svg>
      ),
    },
    {
      id: 2,
      stage: "First Laugh",
      title: "Sound of Happiness",
      dateStr: "Purest Harmony",
      description: "That sudden sweet sound. A melody that immediately dispelled all surrounding doubts, instilling a secret pact to make you smile every day.",
      illustration: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-purple-300/40">
          <path d="M50 30 Q30 30 30 50 Q30 70 50 70 Q70 70 70 50 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M40 45 Q42 42 45 45" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M55 45 Q57 42 60 45" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M42 55 Q50 63 58 55" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 3,
      stage: "First Date",
      title: "Exploring Together",
      dateStr: "Two Nomads",
      description: "Stepping into the unknown hand-in-hand. sharing heavy silences, and laughter that echoes in my mind.",
      illustration: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-amber-300/40">
          <polygon points="50,15 25,60 75,60" fill="none" stroke="currentColor" strokeWidth="2" />
          <polygon points="50,30 35,60 65,60" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="50" cy="10" r="2" fill="currentColor" />
          <path d="M15 80 L85 80" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 4,
      stage: "Favorite Memory",
      title: "Quiet Sanctuary",
      dateStr: "Our Secret Island",
      description: "A soft, dreamy evening with cozy silences. No heavy words, just breathing in absolute sync, counting your heartbeats like a safety rhythm.",
      illustration: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-blue-300/40">
          <path d="M20 70 C40 50, 60 50, 80 70" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M30 65 Q50 45 70 65" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="30" r="12" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,2" />
        </svg>
      ),
    },
    {
      id: 5,
      stage: "Special Moment",
      title: "Unspoken Promise",
      dateStr: "Tethered Hearts",
      description: "An intangible moment of complete clarity and trust. Realizing that no matter where our stories travel, my soul remains safely connected to you.",
      illustration: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-pink-300/40">
          <path d="M50 30 Q30 10 20 40 Q20 70 50 90 Q80 70 80 40 Q70 10 50 30 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="46" r="6" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full py-16 px-4 md:py-24 relative overflow-x-hidden z-10 flex flex-col justify-center items-center">

      {/* SECTION HEADER */}
      <div className="text-center mb-10">
        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] text-rose-300 bg-rose-500/10 border border-rose-500/20 uppercase block w-fit mx-auto mb-4">
          Chapter II • Our Lifetime Chronicles
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-white font-normal mb-2 tracking-wide">
          Our Story
        </h2>
        <p className="font-sans text-stone-300 text-xs md:text-sm font-light uppercase tracking-widest max-w-md mx-auto">
          Five timeless chapters framed in love and remembrance
        </p>
      </div>

      {/* SCROLL CONTROLS */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={scrollLeftAction}
          className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-stone-300 hover:text-white hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer"
          title="Scroll Left"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={scrollRightAction}
          className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-stone-300 hover:text-white hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer"
          title="Scroll Right"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* HORIZONTAL SCROLL CAROUSEL */}
      <div
        ref={scrollContainerRef}
        className="w-full max-w-6xl flex gap-6 overflow-x-auto pb-8 pt-4 px-6 snap-x scrollbar-thin scroll-smooth select-none"
        style={{ scrollbarWidth: "thin" }}
      >
        {milestones.map((mil, idx) => (
          <motion.div
            key={mil.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="w-[280px] sm:w-[320px] shrink-0 snap-center bg-stone-900/40 backdrop-blur-md rounded-2xl border border-white/10 p-5 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.4)] relative overflow-hidden group hover:border-rose-400/35 transition-all duration-300"
          >
            <div>
              {/* Milestone Stage Tag */}
              <div className="flex justify-between items-center mb-4">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-medium bg-rose-500/10 border border-rose-500/25 text-pink-300 tracking-wider">
                  {mil.stage}
                </span>
                <span className="text-[10px] font-mono text-stone-400 font-light flex items-center gap-1">
                  <CalendarHeart size={10} className="text-stone-500" />
                  {mil.dateStr}
                </span>
              </div>

              {/* Photo / Illustration */}
              <div className="w-full aspect-square bg-black/40 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center border border-white/5 shadow-inner">
                <img
                  src={TIMELINE_PHOTOS[mil.id]}
                  alt={mil.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                {/* Fallback illustration — hidden until onError fires */}
                <div
                  className="absolute inset-0 flex-col items-center justify-center p-3 text-center"
                  style={{ display: "none" }}
                >
                  {mil.illustration}
                </div>
              </div>

              {/* Info Text */}
              <h3 className="font-serif text-lg text-white font-medium tracking-wide mb-1.5 pl-0.5">
                {mil.title}
              </h3>
              <p className="font-sans text-stone-300 text-xs leading-relaxed font-light min-h-[64px] pl-0.5">
                {mil.description}
              </p>
            </div>

            {/* Card Footer */}
            <div className="pt-3 border-t border-white/5 mt-4 flex items-center justify-between text-stone-500">
              <Heart size={12} className="stroke-stone-500 fill-transparent group-hover:fill-rose-500 group-hover:stroke-rose-500 transition-colors" />
              <span className="font-mono text-[9px] tracking-widest text-[#c39797]">
                0{mil.id} / 05
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CONTINUE BUTTON */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <button
          id="timeline-continue-btn"
          onClick={onNext}
          className="px-10 py-3 bg-linear-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full font-serif font-light text-xs tracking-widest uppercase hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer duration-300 shadow-[0_10px_25px_rgba(244,63,94,0.35)] ring-2 ring-white/10 flex items-center gap-2"
        >
          <span>Reveal What's Next</span>
          <ChevronRight size={14} />
        </button>
      </motion.div>
    </div>
  );
}