import React, { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX, Sparkles } from "lucide-react";

export interface AudioEngineProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function AudioEngine({ isMuted, onToggleMute }: AudioEngineProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const droneOscsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize Web Audio API on first interaction
  const initSynth = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master output volume
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.06, ctx.currentTime); // keep it soft and cozy
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Start warm ambient pad (drones)
      startWarmDrone(ctx, masterGain);

      // Start scheduling sparkling cozy notes (piano/bell style)
      startBellsScheduler(ctx, masterGain);

      setIsPlaying(true);
    } catch (e) {
      console.warn("Web Audio API is not supported in this environment.", e);
    }
  };

  const startWarmDrone = (ctx: AudioContext, destination: AudioNode) => {
    // 3 subtle low/mid frequencies to form a comforting major 9th backdrop (C, G, E)
    const frequencies = [130.81, 196.0, 329.63]; // C3, G3, E4
    
    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      // Warm filter to make it softer
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      
      // Slow pulsing amplitude
      oscGain.gain.setValueAtTime(0.01 + idx * 0.005, ctx.currentTime);
      
      osc.connect(oscGain);
      oscGain.connect(filter);
      filter.connect(destination);
      
      osc.start();
      droneOscsRef.current.push(osc);

      // Create a slow volume breathing effect
      let direction = 1;
      const pulseInterval = setInterval(() => {
        if (!audioCtxRef.current || audioCtxRef.current.state === "suspended") return;
        const now = ctx.currentTime;
        const currentGain = oscGain.gain.value;
        let nextGain = currentGain + direction * 0.003;
        if (nextGain > 0.03) {
          nextGain = 0.03;
          direction = -1;
        } else if (nextGain < 0.005) {
          nextGain = 0.005;
          direction = 1;
        }
        oscGain.gain.linearRampToValueAtTime(nextGain, now + 1.5);
      }, 2000);

      // clean up on unmount or stop
      (osc as any).cleanupInterval = pulseInterval;
    });
  };

  const startBellsScheduler = (ctx: AudioContext, destination: AudioNode) => {
    // Elegant C major and A minor pentatonic scale frequencies (C4, D4, E4, G4, A4, C5, E5, G5)
    const bellFrequencies = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25, 783.99];
    
    const playSingleBell = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === "suspended" || isMuted) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const bellGain = ctx.createGain();
      const delay = ctx.createDelay();
      const delayFeedback = ctx.createGain();

      // Pick a random frequency
      const freq = bellFrequencies[Math.floor(Math.random() * bellFrequencies.length)];
      osc.frequency.setValueAtTime(freq, now);
      
      // Use triangle wave for a retro, warm, music-box bell tone
      osc.type = "sine";

      // Reverb/Delay simulation
      delay.delayTime.setValueAtTime(0.35, now);
      delayFeedback.gain.setValueAtTime(0.4, now);
      
      // Bell envelope (Immediate Attack, Slow Decay, Fadeout)
      bellGain.gain.setValueAtTime(0, now);
      bellGain.gain.linearRampToValueAtTime(0.08, now + 0.1); // attack
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0); // decay

      // Route osc to bellGain, then bellGain to output, and also to Delay Feedback Loop
      osc.connect(bellGain);
      bellGain.connect(destination);

      // Delay feedback chain
      bellGain.connect(delay);
      delay.connect(delayFeedback);
      delayFeedback.connect(delay);
      delayFeedback.connect(destination);

      osc.start(now);
      osc.stop(now + 3.2);
    };

    // Schedule a twinkling note every 1.5 to 3 seconds
    const scheduleNext = () => {
      const delayTime = 1200 + Math.random() * 2000;
      synthIntervalRef.current = window.setTimeout(() => {
        playSingleBell();
        scheduleNext();
      }, delayTime);
    };

    scheduleNext();
  };

  // Safe toggler
  useEffect(() => {
    if (!isMuted) {
      if (!audioCtxRef.current) {
        initSynth();
      } else if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.setValueAtTime(0.06, audioCtxRef.current!.currentTime);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      }
    }
  }, [isMuted]);

  // Cleanup synthesizer elements
  useEffect(() => {
    return () => {
      if (synthIntervalRef.current) clearTimeout(synthIntervalRef.current);
      droneOscsRef.current.forEach(osc => {
        try {
          osc.stop();
          if ((osc as any).cleanupInterval) clearInterval((osc as any).cleanupInterval);
        } catch (_) {}
      });
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        id="toggle-audio-btn"
        onClick={() => {
          if (!audioCtxRef.current) {
            initSynth();
          }
          onToggleMute();
        }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full glassmorphism text-xs font-sans font-medium hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer ${
          !isMuted 
            ? "text-rose-500 border-rose-300 shadow-[0_0_15px_rgba(251,113,133,0.3)] bg-white/40" 
            : "text-gray-500 border-gray-300 bg-white/20"
        }`}
        title="Toggle romantic ambient melody"
      >
        {!isMuted ? (
          <>
            <Volume2 size={14} className="animate-pulse" />
            <span className="hidden sm:inline">Melody On</span>
            <span className="flex gap-0.5 items-end h-2">
              <span className="w-0.5 bg-rose-500 h-2 animate-[pulse_0.8s_infinite]"></span>
              <span className="w-0.5 bg-rose-500 h-1.5 animate-[pulse_0.6s_infinite_0.1s]"></span>
              <span className="w-0.5 bg-rose-500 h-3 animate-[pulse_0.7s_infinite_0.2s]"></span>
            </span>
          </>
        ) : (
          <>
            <VolumeX size={14} />
            <span className="hidden sm:inline">Music Muted</span>
          </>
        )}
      </button>
      
      {/* Tiny hint helper for users to know they can click of if they want to enjoy local background noise */}
      {!isPlaying && (
        <span className="absolute right-0 -bottom-6 text-[10px] text-rose-300/80 font-mono tracking-wider animate-pulse whitespace-nowrap">
          Click to start melody
        </span>
      )}
    </div>
  );
}
