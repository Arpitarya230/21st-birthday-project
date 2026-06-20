import React, { useState } from "react";
import { AppScreen } from "./types";
import AudioEngine from "./components/AudioEngine";
import BackgroundEffects from "./components/BackgroundEffects";
import Introduction from "./components/Introduction";
import TrustPrompt from "./components/TrustPrompt";
import ApologySection from "./components/ApologySection";
import TimelineSection from "./components/TimelineSection";
import ProposalSection from "./components/ProposalSection";
import BirthdayTransformation from "./components/BirthdayTransformation";
import { Heart, RefreshCw } from "lucide-react";

export default function App() {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.Intro);
  const [isMuted, setIsMuted] = useState(true);
  const [isCompletedBirthday, setIsCompletedBirthday] = useState(false);

  // Restart trigger
  const handleRestart = () => {
    setScreen(AppScreen.Intro);
    setIsCompletedBirthday(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0d0611] text-stone-100 font-sans selection:bg-rose-500 selection:text-white transition-colors duration-1000 overflow-x-hidden">
      
      {/* 1. DYNAMIC WATERFALL/PARTICLE CANVAS BACKGROUND */}
      <BackgroundEffects 
        currentScreen={screen} 
        isCompletedBirthday={isCompletedBirthday} 
      />

      {/* 2. PROCEDURAL ROMANTIC CINEMATIC SCORE SATELLITE */}
      <AudioEngine 
        isMuted={isMuted} 
        onToggleMute={() => setIsMuted(!isMuted)} 
      />

      {/* 3. APP SCREEN ROUTER WITH SHIFT ANIMATIONS */}
      <main className="relative w-full min-h-screen flex flex-col justify-between">
        
        {/* Soft elegant tiny global app header brand indicator */}
        <header className="w-full pt-6 px-6 flex justify-between items-center z-20 pointer-events-none select-none">
          <div className="flex items-center gap-2">
            <Heart size={14} className="text-rose-500 fill-rose-500/20 animate-pulse" />
            <span className="font-serif italic text-xs tracking-widest text-rose-gold">
              A Letter From My Heart
            </span>
          </div>
          
          <div className="font-mono text-[9px] tracking-widest text-stone-500 uppercase">
            {screen === AppScreen.Intro && "Prologue"}
            {screen === AppScreen.Trust && "Trust Gate"}
            {screen === AppScreen.Apology && "Chapter I"}
            {screen === AppScreen.Memories && "Chapter II"}
            {screen === AppScreen.Proposal && "Chapter III"}
            {(screen === AppScreen.Birthday || screen === AppScreen.Surprise || screen === AppScreen.Planner || screen === AppScreen.Final) && "Celebration"}
          </div>
        </header>

        {/* ACTIVE SCREEN CONTAINER */}
        <div className="w-full grow flex items-center justify-center">
          {screen === AppScreen.Intro && (
            <Introduction 
              onConfirm={() => setScreen(AppScreen.Trust)} 
              isMuted={isMuted}
              onUnmute={() => setIsMuted(false)}
            />
          )}

          {screen === AppScreen.Trust && (
            <TrustPrompt 
              onNext={() => setScreen(AppScreen.Apology)} 
            />
          )}

          {screen === AppScreen.Apology && (
            <ApologySection 
              onContinue={() => setScreen(AppScreen.Memories)} 
            />
          )}

          {screen === AppScreen.Memories && (
            <TimelineSection 
              onNext={() => setScreen(AppScreen.Proposal)} 
            />
          )}

          {screen === AppScreen.Proposal && (
            <ProposalSection 
              onYes={() => {
                setIsCompletedBirthday(true);
                setScreen(AppScreen.Birthday);
              }}
              onNeedTime={() => {
                // respected! But proceed to celebration safely in secondary friendly route
                setScreen(AppScreen.Birthday);
              }}
            />
          )}

          {screen === AppScreen.Birthday && (
            <BirthdayTransformation 
              onBackToStart={handleRestart} 
            />
          )}
        </div>

        {/* Soft non-invasive global footer */}
        <footer className="w-full py-4 text-center z-10 select-none">
          <p className="font-mono text-[9px] tracking-wider text-stone-500">
            © {new Date().getFullYear()} • Crafted with pure love, absolute honesty and growth
          </p>
        </footer>

      </main>
    </div>
  );
}
