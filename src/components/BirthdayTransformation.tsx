import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Calendar, Clock, Edit3, Heart, CheckCircle } from "lucide-react";
import { MeetingPlan } from "../types";

interface BirthdayTransformationProps {
  onBackToStart: () => void;
}

type BirthdaySubScreen = "GREETING" | "SURPRISE" | "PLANNER" | "FINAL";

// ─────────────────────────────────────────────────────────────────────────────
// 📸  PUT YOUR PHOTO IN:  /public/photos/
//     Then update the path below.
//     e.g. if your file is  public/photos/birthday-portrait.jpg
//     the path here should be  "/photos/birthday-portrait.jpg"
// ─────────────────────────────────────────────────────────────────────────────
const BIRTHDAY_PHOTO = "/photos/birthday-portrait.jpg";

export default function BirthdayTransformation({ onBackToStart }: BirthdayTransformationProps) {
  const [subStage, setSubStage] = useState<BirthdaySubScreen>("GREETING");
  const [isBoxOpened, setIsBoxOpened] = useState(false);
  const [showPhotoFallback, setShowPhotoFallback] = useState(false);

  // Date planner states
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingNotes, setMeetingNotes] = useState("");
  const [savedPlan, setSavedPlan] = useState<MeetingPlan | null>(() => {
    const raw = localStorage.getItem("meeting_plan_data");
    return raw ? JSON.parse(raw) : null;
  });
  const [savingEffect, setSavingEffect] = useState(false);

  const handleSaveMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingDate || !meetingTime) return;

    setSavingEffect(true);
    const newPlan: MeetingPlan = {
      date: meetingDate,
      time: meetingTime,
      notes: meetingNotes,
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      localStorage.setItem("meeting_plan_data", JSON.stringify(newPlan));
      setSavedPlan(newPlan);
      setSavingEffect(false);
      setTimeout(() => {
        setSubStage("FINAL");
      }, 1000);
    }, 1200);
  };

  const handleDeleteMeeting = () => {
    localStorage.removeItem("meeting_plan_data");
    setSavedPlan(null);
    setMeetingDate("");
    setMeetingTime("");
    setMeetingNotes("");
  };

  return (
    <div className="min-h-screen w-full relative py-12 px-4 md:py-20 z-10 overflow-y-auto flex flex-col items-center">
      
      {/* GLOBAL SCENARIO PROGRESS TRAIL */}
      <div className="flex gap-2 mb-8 items-center justify-center bg-black/30 backdrop-blur-sm p-1.5 rounded-full border border-white/5 text-xs">
        <button 
          onClick={() => setSubStage("GREETING")}
          className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${subStage === "GREETING" ? "bg-rose-500 text-white font-medium shadow" : "text-stone-400 hover:text-stone-200"}`}
        >
          Greeting 🎂
        </button>
        <span className="text-stone-600">/</span>
        <button 
          onClick={() => setSubStage("SURPRISE")}
          className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${subStage === "SURPRISE" ? "bg-rose-500 text-white font-medium shadow" : "text-stone-400 hover:text-stone-200"}`}
        >
          Surprise 🎁
        </button>
        <span className="text-stone-600">/</span>
        <button 
          onClick={() => setSubStage("PLANNER")}
          className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${subStage === "PLANNER" ? "bg-rose-500 text-white font-medium shadow" : "text-stone-400 hover:text-stone-200"}`}
        >
          Date ❤️
        </button>
        <span className="text-stone-600">/</span>
        <button 
          onClick={() => setSubStage("FINAL")}
          className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${subStage === "FINAL" ? "bg-rose-500 text-white font-medium shadow" : "text-stone-400 hover:text-stone-200"}`}
        >
          Closing 🌟
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* SUBSTAGE 1: HAPPY BIRTHDAY GREETING SCREEN */}
        {subStage === "GREETING" && (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-4"
          >
            {/* PORTRAIT IMAGE FRAME FOR Girlfriend (Left or Center Column) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative group/portrait">
                {/* Floating sparkle overlays */}
                <div className="absolute -top-4 -left-4 text-amber-300 animate-pulse">
                  <Sparkles size={24} />
                </div>
                <div className="absolute -bottom-4 -right-4 text-rose-400 animate-bounce">
                  <Heart size={20} className="fill-rose-400" />
                </div>

                {/* Main Luxury Frame */}
                <div className="w-[260px] h-[340px] sm:w-[280px] sm:h-[370px] bg-white p-3.5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-white/20 rotate-[-1.5deg] group-hover/portrait:rotate-[1deg] group-hover/portrait:scale-[1.02] transition-all duration-500 overflow-hidden relative flex flex-col justify-between">
                  <div className="w-full h-[85%] bg-stone-950 rounded-2xl overflow-hidden relative flex items-center justify-center">
                    <img
                      src={BIRTHDAY_PHOTO}
                      alt="The Birthday Girl"
                      className="w-full h-full object-cover"
                      onError={() => setShowPhotoFallback(true)}
                      style={{ display: showPhotoFallback ? "none" : "block" }}
                    />
                    {showPhotoFallback && (
                      <div className="flex flex-col items-center justify-center text-center p-4">
                        {/* Elegant drawn lineart mockup of woman or bouquet */}
                        <svg viewBox="0 0 100 100" className="w-28 h-28 text-pink-300/30">
                          <path d="M50 15 C45 35, 15 45, 50 85 C85 45, 55 35, 50 15 Z" fill="rgba(244,63,94,0.1)" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="50" cy="40" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <span className="text-[10px] font-sans italic text-stone-500 mt-2 block max-w-[150px]">
                          "The most radiant star in my sky"
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pb-1 text-center border-t border-stone-100/60 pt-3">
                    <span className="font-cursive text-3xl font-normal text-rose-600 leading-none block">
                      Forever Beautiful
                    </span>
                  </div>
                </div>
              </div>

              {/* Animated CSS Birthday Cake */}
              <div className="mt-8 flex flex-col items-center">
                {/* Cute visual placeholder cake layout */}
                <div className="relative flex flex-col items-center">
                  {/* Candlestick flame */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], y: [0, -1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-2.5 h-6 rounded-full bg-linear-to-t from-orange-400 to-yellow-300 shadow-[0_0_15px_#f97316] relative top-1 z-10"
                  />
                  {/* Candle bar */}
                  <div className="w-1.5 h-10 bg-white bg-[linear-linear(45deg,#f43f5e_25%,transparent_25%,transparent_50%,#f43f5e_50%,#f43f5e_75%,transparent_75%,transparent)] bg-[size:10px_10px] rounded-t-sm" />
                  
                  {/* Cake tier top */}
                  <div className="w-28 h-12 bg-pink-100 rounded-t-xl border-t border-rose-200 relative -mt-0.5 flex justify-around items-center px-2">
                    <span className="w-1.5 h-3 rounded-full bg-rose-400 animate-pulse opacity-60"></span>
                    <span className="w-1.5 h-3 rounded-full bg-rose-400 animate-pulse opacity-80"></span>
                    <span className="w-1.5 h-3 rounded-full bg-rose-400 animate-pulse opacity-60"></span>
                  </div>
                  {/* Cake tier base */}
                  <div className="w-36 h-14 bg-rose-300/60 rounded-t-lg -mt-1 shadow-md border-t border-rose-400/40 relative flex justify-center items-center">
                    <div className="absolute top-0 inset-x-0 h-4 bg-white/40 blur-[2px]" />
                    <span className="text-[10px] font-mono tracking-widest text-stone-200 font-light uppercase">
                      Sweet Love
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* HEARTFELT PROSE GREETINGS (Right Column) */}
            <div className="md:col-span-7 bg-stone-900/30 glassmorphism-dark p-6 md:p-10 rounded-3xl border border-white/5 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300/80 mb-2 block font-medium">
                Chapter III • The Celebration
              </span>
              <h2 className="font-serif text-3xl md:text-5.5xl text-white font-normal mb-1 leading-tight tracking-wide">
                HAPPY BIRTHDAY MY LOVE 🎂❤️
              </h2>
              
              <p className="font-sans text-stone-300 text-xs md:text-sm font-light uppercase tracking-[0.15em] mb-8 border-b border-white/5 pb-4">
                "Today isn't about the past. Today is about celebrating the beautiful person you are."
              </p>

              {/* Exact user birthday message */}
              <div className="font-serif text-stone-200 leading-relaxed text-sm md:text-base space-y-6 text-left selection:bg-pink-500">
                <p className="indent-4 leading-loose">
                  You deserve happiness.
                </p>
                <p className="indent-4 leading-loose">
                  You deserve peace.
                </p>
                <p className="indent-4 leading-loose">
                  You deserve success.
                </p>
                <p className="indent-4 leading-loose">
                  You deserve all the beautiful things this world has to offer.
                </p>

                {/* Sentimental center highlights */}
                <div className="my-6 pl-4 border-l border-pink-400/30 font-cursive italic text-2xl text-pink-300 tracking-wide leading-relaxed">
                  "Thank you for existing."
                </div>

                <p className="indent-4 leading-loose">
                  Thank you for every smile.
                </p>
                <p className="indent-4 leading-loose">
                  Thank you for every memory.
                </p>
                <p className="indent-4 leading-loose font-serif font-semibold text-rose-300">
                  And thank you for being someone truly unforgettable.
                </p>
              </div>

              {/* Surprise Trigger */}
              <div className="mt-10 pt-6 border-t border-white/5 flex justify-end">
                <button
                  id="bday-open-surprise-tab-btn"
                  onClick={() => setSubStage("SURPRISE")}
                  className="px-8 py-3 bg-linear-to-r from-pink-500 to-rose-500 text-white rounded-full font-serif italic text-xs tracking-widest uppercase hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer duration-300 hover:shadow-[0_8px_20px_rgba(236,72,153,0.3)] ring-1 ring-white/10 flex items-center gap-1.5"
                >
                  <span>Open Your Surprise 🎁</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* SUBSTAGE 2: SURPRISE BOX SECTION */}
        {subStage === "SURPRISE" && (
          <motion.div
            key="surprise"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="w-full max-w-xl text-center flex flex-col items-center mt-6"
          >
            <div className="mb-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] text-[#d4af37] bg-yellow-500/10 border border-yellow-500/20 uppercase">
                A Precious Box For You
              </span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl text-white font-normal mb-3 tracking-wide">
              Your Birthday Gift
            </h2>
            <p className="font-sans text-stone-400 text-xs md:text-sm tracking-widest uppercase max-w-sm mx-auto mb-10">
              Click the box below to unlock what lies inside
            </p>

            <div className="relative w-64 h-64 flex items-center justify-center mb-10">
              <AnimatePresence>
                {!isBoxOpened ? (
                  // Closed box with bouncy ambient hover
                  <motion.div
                    key="closed-box"
                    id="gift-box-closed"
                    onClick={() => setIsBoxOpened(true)}
                    whileHover={{ scale: 1.05, rotate: "2deg" }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
                      scale: { duration: 0.2 },
                      rotate: { duration: 0.2 }
                    }}
                    className="cursor-pointer group relative"
                  >
                    {/* Glowing background ring */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-36 bg-rose-500/20 blur-2xl group-hover:bg-rose-500/35 transition-all duration-300 rounded-full" />
                    
                    {/* Wrapped Box SVG illustration */}
                    <svg viewBox="0 0 100 100" className="w-40 h-40 text-rose-500 filter drop-shadow-2xl">
                      {/* Ribbon bow */}
                      <path d="M50 35 C42 22, 22 35, 50 35 Z" fill="#facc15" stroke="#facc15" strokeWidth="1" />
                      <path d="M50 35 C58 22, 78 35, 50 35 Z" fill="#facc15" stroke="#facc15" strokeWidth="1" />
                      {/* Box cover */}
                      <rect x="23" y="35" width="54" height="15" rx="3" fill="#e11d48" />
                      {/* Box bottom */}
                      <rect x="26" y="47" width="48" height="38" rx="2" fill="#be123c" />
                      {/* Yellow Center Ribbons */}
                      <rect x="47" y="32" width="6" height="53" fill="#facc15" />
                      <rect x="23" y="40" width="54" height="6" fill="#facc15" />
                      {/* Sparkles indicator */}
                      <circle cx="20" cy="20" r="3" fill="#facc15" className="animate-pulse" />
                      <circle cx="82" cy="70" r="2" fill="#fff" className="animate-pulse" />
                    </svg>
                  </motion.div>
                ) : (
                  // Opened gift revealing flowers and teddy bear!
                  <motion.div
                    key="opened-box-reveal"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="relative flex flex-col items-center"
                  >
                    {/* Glowing sunburst behind everything */}
                    <div className="absolute w-72 h-72 bg-linear-to-r from-pink-500/25 to-yellow-500/20 rounded-full blur-3xl -z-10" />

                    {/* Cute hand-made SVG Teddy Bear & Bouquet vector art */}
                    <div className="w-56 h-56 flex items-center justify-center relative">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-[#b45309]">
                        {/* THE TEDDY BEAR */}
                        {/* Ears */}
                        <circle cx="34" cy="36" r="10" fill="#a16207" />
                        <circle cx="34" cy="36" r="5" fill="#fbcfe8" />
                        <circle cx="66" cy="36" r="10" fill="#a16207" />
                        <circle cx="66" cy="36" r="5" fill="#fbcfe8" />
                        
                        {/* Arms hugging flowers */}
                        <ellipse cx="28" cy="62" rx="10" ry="6" fill="#78350f" transform="rotate(-30 28 62)" />
                        <ellipse cx="72" cy="62" rx="10" ry="6" fill="#78350f" transform="rotate(30 72 62)" />
                        
                        {/* Bear Head */}
                        <circle cx="50" cy="48" r="22" fill="#92400e" stroke="#78350f" strokeWidth="1" />
                        
                        {/* Muzzle */}
                        <ellipse cx="50" cy="54" rx="9" ry="6" fill="#fef08a" />
                        
                        {/* Nose and Mouth */}
                        <ellipse cx="50" cy="52" rx="3.5" ry="2" fill="#1e1b4b" />
                        <path d="M50 54 Q50 58 47 57 M50 54 Q50 58 53 57" stroke="#1e1b4b" strokeWidth="1.2" fill="none" />
                        
                        {/* Eyes containing sweet twinkle dots */}
                        <circle cx="42" cy="45" r="2.5" fill="#1e1b4b" />
                        <circle cx="42.5" cy="44.5" r="0.8" fill="#fff" />
                        <circle cx="58" cy="45" r="2.5" fill="#1e1b4b" />
                        <circle cx="58.5" cy="44.5" r="0.8" fill="#fff" />
                        
                        {/* Rosy blush */}
                        <circle cx="34" cy="51" r="3.5" fill="#f43f5e" opacity="0.4" />
                        <circle cx="66" cy="51" r="3.5" fill="#f43f5e" opacity="0.4" />

                        {/* FLOWERS Appearing in Bear's Lap */}
                        {/* Flower 1 (Rose Pink Center Left) */}
                        <g transform="translate(42, 70)">
                          <circle cx="0" cy="-6" r="6" fill="#f43f5e" />
                          <circle cx="-6" cy="0" r="6" fill="#f43f5e" />
                          <circle cx="6" cy="0" r="6" fill="#f43f5e" />
                          <circle cx="0" cy="6" r="6" fill="#f43f5e" />
                          <circle cx="0" cy="0" r="5" fill="#fef08a" />
                        </g>

                        {/* Flower 2 (Lavender violet Center Right) */}
                        <g transform="translate(60, 68)">
                          <circle cx="0" cy="-5" r="5" fill="#c084fc" />
                          <circle cx="-5" cy="0" r="5" fill="#c084fc" />
                          <circle cx="5" cy="0" r="5" fill="#c084fc" />
                          <circle cx="0" cy="5" r="5" fill="#c084fc" />
                          <circle cx="0" cy="0" r="4" fill="#fef08a" />
                        </g>

                        {/* Red Rose Tulip on left */}
                        <path d="M26 66 Q20 54 30 52 Q35 56 32 66 Z" fill="#e11d48" />
                        {/* Green leaves/ribbon bottom decoration */}
                        <path d="M42 78 Q50 82 58 78 Q50 84 42 78" fill="#22c55e" stroke="#15803d" strokeWidth="1" />

                        {/* Teddy Bear Body base hidden behind bouquet */}
                        <ellipse cx="50" cy="74" rx="16" ry="10" fill="#78350f" opacity="0.3" />
                      </svg>

                      {/* Floating hearts particles orbiting Teddy Bear (CSS Animated) */}
                      <span className="absolute top-2 left-6 text-rose-500 animate-bounce delay-100">
                        ❤️
                      </span>
                      <span className="absolute bottom-6 right-2 text-rose-400 animate-pulse delay-300 text-lg">
                        💝
                      </span>
                      <span className="absolute -top-4 right-10 text-amber-300 animate-ping text-xs">
                        ✨
                      </span>
                    </div>

                    {/* Cute surprise label */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-4"
                    >
                      <h4 className="font-cursive text-3.5xl text-rose-400">
                        Happy Birthday, sweetheart!
                      </h4>
                      <p className="font-serif text-sm text-stone-200 mt-2 max-w-xs mx-auto leading-relaxed italic">
                        "A small surprise for someone who means so much."
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Stepper buttons underneath */}
            <div className="flex gap-4 w-full justify-center">
              {isBoxOpened && (
                <button
                  id="surprise-proceed-to-planner-btn"
                  onClick={() => setSubStage("PLANNER")}
                  className="px-8 py-3.5 bg-linear-to-r from-pink-500 to-rose-500 text-white rounded-full font-serif font-light text-xs tracking-widest uppercase hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer duration-300 shadow-[0_8px_20px_rgba(236,72,153,0.3)] ring-1 ring-white/10 flex items-center gap-2"
                >
                  <span>Continue</span>
                  <CheckCircle size={14} />
                </button>
              )}
              
              <button
                onClick={() => setSubStage("GREETING")}
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-stone-400 hover:text-stone-300 rounded-full font-sans text-xs tracking-wider uppercase border border-white/5 hover:scale-105 transition-all duration-200"
              >
                Go Back
              </button>
            </div>
          </motion.div>
        )}

        {/* SUBSTAGE 3: DATE PLANNER INTERACTIVE PAGE */}
        {subStage === "PLANNER" && (
          <motion.div
            key="planner"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="w-full max-w-2xl bg-stone-950/40 glassmorphism-dark p-6 md:p-10 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.55)] flex flex-col items-center mt-4"
          >
            {/* Planner header */}
            <div className="text-center mb-8">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] text-rose-300 bg-rose-500/10 border border-rose-500/20 uppercase block w-fit mx-auto mb-3">
                Chapter IV • Rendezvous
              </span>
              <h2 className="font-serif text-3.5xl text-white font-normal mb-2 tracking-wide">
                Only If You're Comfortable...
              </h2>
              <p className="font-sans text-stone-300 text-xs md:text-sm max-w-md mx-auto font-light leading-relaxed">
                "If you'd ever like to meet and talk, I'd love that."
              </p>
            </div>

            {/* If a meeting is already saved to local storage, show the cute voucher receipt! */}
            {savedPlan ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-stone-950/40 border border-rose-500/20 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden"
              >
                {/* Stamp */}
                <div className="absolute top-2 right-2 border-2 border-dashed border-rose-500/40 text-rose-500/40 font-mono text-[9px] uppercase px-2 py-0.5 rounded rotate-12">
                  Reserved ❤️
                </div>

                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mb-4 mx-auto border border-rose-500/20 text-[#a2baf5]">
                  <Heart className="text-rose-400 fill-rose-500/10" size={24} />
                </div>

                <h4 className="font-serif text-lg text-white font-medium mb-1">
                  Our Rendezvous Ticket
                </h4>
                <p className="font-sans text-stone-400 text-[11px] uppercase tracking-wider mb-5">
                  Saved Securely in browser cache
                </p>

                <div className="space-y-3.5 text-left font-serif text-sm bg-white/5 p-4 rounded-xl border border-white/5 select-none mb-6">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-stone-400 text-xs flex items-center gap-1">
                      <Calendar size={12} className="text-rose-400" />
                      Date Selected:
                    </span>
                    <span className="text-white font-semibold">{savedPlan.date}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-stone-400 text-xs flex items-center gap-1">
                      <Clock size={12} className="text-rose-400" />
                      Time Selected:
                    </span>
                    <span className="text-white font-semibold">{savedPlan.time}</span>
                  </div>

                  {savedPlan.notes && (
                    <div className="pt-1.5">
                      <span className="text-stone-400 text-xs flex items-center gap-1 mb-1">
                        <Edit3 size={11} className="text-rose-400" />
                        Special Notes:
                      </span>
                      <p className="text-stone-300 text-xs italic leading-relaxed pl-1">
                        "{savedPlan.notes}"
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-[11px] font-sans text-stone-400 leading-relaxed max-w-sm mx-auto mb-4 italic">
                  "Let's finalize the details on WhatsApp whenever you feel comfortable. I'm looking forward to it."
                </p>

                <div className="flex gap-2.5 justify-center">
                  <button
                    id="planner-edit-saved-btn"
                    onClick={handleDeleteMeeting}
                    className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-stone-300 rounded-full text-xs font-sans hover:scale-105 transition-all text-[11px] border border-white/5 cursor-pointer"
                  >
                    Change Plan
                  </button>
                  <button
                    id="planner-proceed-to-final-btn"
                    onClick={() => setSubStage("FINAL")}
                    className="px-5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-[11px] rounded-full font-serif italic tracking-wide hover:scale-105 transition-all cursor-pointer shadow"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            ) : (
              // HTML Scheduler Form
              <form onSubmit={handleSaveMeeting} className="w-full max-w-md flex flex-col gap-5 text-left">
                
                {/* Date Picker Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-sans tracking-wide text-stone-300 uppercase pl-1 flex items-center gap-1">
                    <Calendar size={12} className="text-rose-400" />
                    Pick a Date ❤️
                  </label>
                  <input
                    id="planner-date-input"
                    type="date"
                    required
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-900/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400 placeholder-stone-500 font-mono text-sm"
                  />
                </div>

                {/* Time Picker Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-sans tracking-wide text-stone-300 uppercase pl-1 flex items-center gap-1">
                    <Clock size={12} className="text-rose-400" />
                    Pick a Time ⏰
                  </label>
                  <input
                    id="planner-time-input"
                    type="time"
                    required
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-900/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400 placeholder-stone-500 font-mono text-sm"
                  />
                </div>

                {/* Special Instructions / Notes */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-sans tracking-wide text-stone-300 uppercase pl-1 flex items-center gap-1">
                    <Edit3 size={11} className="text-rose-400" />
                    Any Little Notes/Preferences (Optional) 🌸
                  </label>
                  <textarea
                    id="planner-notes-input"
                    placeholder="e.g. Any favorite coffeeshop, or things you'd love to chat about..."
                    rows={3}
                    value={meetingNotes}
                    onChange={(e) => setMeetingNotes(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-900/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400 placeholder-stone-500 font-sans text-xs resize-none"
                  />
                </div>

                {/* Action button */}
                <button
                  id="planner-save-btn"
                  type="submit"
                  disabled={savingEffect}
                  className="w-full py-3.5 bg-linear-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 font-serif italic text-sm tracking-widest uppercase text-white rounded-xl hover:scale-[1.01] active:scale-95 transition-all outline-none cursor-pointer mt-2 shadow-[0_10px_25px_rgba(244,63,94,0.3)] ring-1 ring-white/10 flex items-center justify-center gap-2"
                >
                  {savingEffect ? (
                    <>
                      <div className="w-4.5 h-4.5 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                      <span>Saving Our Spot...</span>
                    </>
                  ) : (
                    <>
                      <span>Save Our Meeting ❤️</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        )}

        {/* SUBSTAGE 4: FINAL RETROSPECTIVE PAGE */}
        {subStage === "FINAL" && (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="w-full max-w-2xl bg-stone-950/40 glassmorphism-dark p-8 md:p-12 rounded-3xl text-center shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-white/10 flex flex-col items-center mt-4"
          >
            {/* Sunset glow ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px]" />

            <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-6 border border-rose-500/20 text-rose-400 animate-[pulse_2s_infinite]">
              <Heart size={26} className="fill-rose-500/40" />
            </div>

            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-stone-400 mb-6 block font-medium">
             CHAPTER • Our Unwritten Tomorrow
            </span>

            {/* Gratitude block */}
            <div className="font-serif text-stone-200 text-sm md:text-base leading-loose max-w-lg mx-auto space-y-6 text-left border-b border-white/5 pb-8 mb-8">
              <p className="font-serif text-lg text-rose-300 italic text-center mb-6">
                "No matter what happens next..."
              </p>
              
              <div className="space-y-1 font-serif text-center text-white text-base">
                <p>Thank you.</p>
                <p className="text-stone-300 font-light">For every memory.</p>
                <p className="text-stone-300 font-light">For every laugh.</p>
                <p className="text-stone-300 font-light">For every lesson.</p>
                <p className="text-stone-300 font-light">For every moment.</p>
                <p className="text-rose-300 italic font-cursive text-3xl pt-2 font-normal leading-relaxed">
                  And most importantly... For being you.
                </p>
              </div>
            </div>

            <h3 className="font-cursive text-4xl text-rose-400 mb-6">
              Happiest Birthday Sweetheart❤️
            </h3>

            {/* Respectful closing text */}
            <div className="bg-white/5 py-4 px-6 rounded-2xl border border-white/5 font-sans text-xs md:text-sm text-stone-300 max-w-md leading-relaxed mb-10 text-center">
              <p>
                {savedPlan 
                  ? `If you're comfortable meeting, let's meet at the chosen time (${savedPlan.date} @ ${savedPlan.time}).` 
                  : "If you're comfortable meeting, let's meet at the chosen time."}
              </p>
              <p className="mt-1.5 text-rose-300 font-medium">
                Venue can be discussed on WhatsApp.
              </p>
            </div>

            {/* Reset button if she wants to read again from step 1 */}
            <button
              id="final-reset-btn"
              onClick={onBackToStart}
              className="px-6 py-2 border border-white/10 hover:bg-white/5 text-stone-400 hover:text-stone-300 rounded-full font-mono text-[9px] tracking-widest uppercase transition-all duration-200 cursor-pointer"
            >
              Restart Letter
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}