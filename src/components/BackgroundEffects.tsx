import React, { useEffect, useRef } from "react";
import { AppScreen } from "../types";

interface BackgroundEffectsProps {
  currentScreen: AppScreen;
  isCompletedBirthday: boolean;
}

export default function BackgroundEffects({ currentScreen, isCompletedBirthday }: BackgroundEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle definitions
    interface Spark {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      life: number;
      maxLife: number;
    }

    interface Firefly {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      angle: number;
      angleSpeed: number;
      alpha: number;
      color: string;
    }

    interface Raindrop {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
    }

    interface Heart {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      scale: number;
      pulseSpeed: number;
      pulseAngle: number;
    }

    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      oscillation: number;
      oscillationSpeed: number;
      rotation: number;
      rotationSpeed: number;
      alpha: number;
    }

    interface Balloon {
      x: number;
      y: number;
      size: number;
      color: string;
      speedY: number;
      oscillation: number;
      oscillationSpeed: number;
      curve: number;
    }

    interface Confetti {
      x: number;
      y: number;
      size: number;
      color: string;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
    }

    interface FireworkParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
      fade: number;
      gravity: number;
    }

    interface FireworkLaunch {
      x: number;
      y: number;
      tx: number;
      ty: number;
      speed: number;
      angle: number;
      distanceToTarget: number;
      distanceTraveled: number;
      coordinates: Array<[number, number]>;
      coordinateCount: number;
    }

    // Pools
    let sparks: Spark[] = [];
    let fireflies: Firefly[] = [];
    let raindrops: Raindrop[] = [];
    let hearts: Heart[] = [];
    let petals: Petal[] = [];
    let balloons: Balloon[] = [];
    let confettis: Confetti[] = [];
    let fireworks: FireworkParticle[] = [];
    let fireworkLaunches: FireworkLaunch[] = [];

    // Helper: random colors
    const romanticColors = [
      "rgba(251, 113, 133, 0.7)", // light pink
      "rgba(244, 63, 94, 0.7)",  // rose
      "rgba(192, 132, 252, 0.7)", // light purple
      "rgba(217, 70, 239, 0.7)",  // fuchsia
      "rgba(253, 186, 116, 0.7)", // warm gold
    ];

    const birthdayColors = [
      "#FF5E7E", "#FF88AA", "#FFD154", "#3BE5B6", "#44B4FF", "#C77DFF"
    ];

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initializers
    const initPools = () => {
      // Fireflies (always active for starry romantic vibe)
      fireflies = Array.from({ length: 40 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.02,
        alpha: Math.random() * 0.5 + 0.3,
        color: romanticColors[Math.floor(Math.random() * romanticColors.length)],
      }));

      // Rain (for Apology)
      raindrops = Array.from({ length: 120 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 15 + 10,
        speed: Math.random() * 8 + 6,
        opacity: Math.random() * 0.3 + 0.1,
      }));

      // Hearts
      hearts = Array.from({ length: 25 }, () => ({
        x: Math.random() * width,
        y: height + Math.random() * 100,
        size: Math.random() * 12 + 6,
        speedY: -(Math.random() * 0.8 + 0.4),
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.4,
        scale: 1,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseAngle: Math.random() * Math.PI,
      }));

      // Rose Petals (for Proposal/Romantic)
      petals = Array.from({ length: 30 }, () => ({
        x: Math.random() * width,
        y: -Math.random() * height,
        size: Math.random() * 10 + 6,
        speedY: Math.random() * 0.8 + 0.6,
        speedX: (Math.random() - 0.5) * 0.5,
        oscillation: Math.random() * Math.PI * 2,
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        alpha: Math.random() * 0.6 + 0.4,
      }));

      // Balloons (for Birthday)
      balloons = Array.from({ length: 15 }, () => ({
        x: Math.random() * width,
        y: height + Math.random() * 400,
        size: Math.random() * 25 + 15,
        color: birthdayColors[Math.floor(Math.random() * birthdayColors.length)],
        speedY: -(Math.random() * 1.0 + 0.8),
        oscillation: Math.random() * Math.PI * 2,
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        curve: Math.random() * 0.4 + 0.1,
      }));

      // Confettis (for Birthday transition)
      confettis = Array.from({ length: 60 }, () => ({
        x: Math.random() * width,
        y: -10 - Math.random() * 100,
        size: Math.random() * 8 + 5,
        color: birthdayColors[Math.floor(Math.random() * birthdayColors.length)],
        speedY: Math.random() * 1.5 + 1.5,
        speedX: (Math.random() - 0.5) * 1.0,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      }));
    };

    initPools();

    // Spawn Fireworks
    const launchFirework = (originX: number, targetX: number, targetY: number) => {
      fireworkLaunches.push({
        x: originX,
        y: height,
        tx: targetX,
        ty: targetY,
        speed: 3,
        angle: Math.atan2(targetY - height, targetX - originX),
        distanceToTarget: Math.hypot(originX - targetX, height - targetY),
        distanceTraveled: 0,
        coordinateCount: 3,
        coordinates: Array.from({ length: 3 }, () => [originX, height])
      });
    };

    const explodeFirework = (x: number, y: number) => {
      const color = birthdayColors[Math.floor(Math.random() * birthdayColors.length)];
      const particleCount = 60 + Math.floor(Math.random() * 40);
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;
        fireworks.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: color,
          alpha: 1.0,
          fade: Math.random() * 0.015 + 0.01,
          gravity: 0.06
        });
      }
    };

    // Auto trigger rare firework launched in Birthday screens
    let fireworkTimer = 0;

    // Helper: draw beautiful SVG path for Heart
    const drawHeartShape = (context: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      context.beginPath();
      context.moveTo(x, y + size / 4);
      context.quadraticCurveTo(x, y, x - size / 2, y);
      context.quadraticCurveTo(x - size, y, x - size, y + size / 2);
      context.quadraticCurveTo(x - size, y + (size * 3) / 4, x, y + size);
      context.quadraticCurveTo(x + size, y + (size * 3) / 4, x + size, y + size / 2);
      context.quadraticCurveTo(x + size, y, x + size / 2, y);
      context.quadraticCurveTo(x, y, x, y + size / 4);
      context.closePath();
    };

    // Main Animation loop
    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // Determine colors based on active screen and birthday state
      const isBirthdayScreen = 
        currentScreen === AppScreen.Birthday ||
        currentScreen === AppScreen.Surprise ||
        currentScreen === AppScreen.Planner ||
        currentScreen === AppScreen.Final ||
        isCompletedBirthday;

      const isApologyScreen = (currentScreen === AppScreen.Apology);
      const isProposalScreen = (currentScreen === AppScreen.Proposal);

      // Gradient backgrounds
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (isBirthdayScreen) {
        // Luxury, festive, dreamy gold and royal purple/pink sunset
        bgGrad.addColorStop(0, "#190823"); // deep dark purple
        bgGrad.addColorStop(0.5, "#300c3b"); // dark violet
        bgGrad.addColorStop(1, "#5b154a"); // beautiful magenta/wine
      } else if (isApologyScreen) {
        // Soft melancholic romantic slate
        bgGrad.addColorStop(0, "#0d0b13");
        bgGrad.addColorStop(0.5, "#181423");
        bgGrad.addColorStop(1, "#211b30");
      } else {
        // Default Rose gold warm purple gradients (luxury, premium)
        bgGrad.addColorStop(0, "#0d0611"); // near black/deep plum
        bgGrad.addColorStop(0.4, "#1b0a24"); // deep violet
        bgGrad.addColorStop(1, "#2a1226"); // rich dark rose gold
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw soft glowing lanterns/nebula circles on the background
      ctx.save();
      const circleCount = 3;
      for (let i = 0; i < circleCount; i++) {
        const glowGrad = ctx.createRadialGradient(
          width * (i === 0 ? 0.2 : i === 1 ? 0.8 : 0.5),
          height * (i === 0 ? 0.3 : i === 1 ? 0.7 : 0.4),
          0,
          width * (i === 0 ? 0.2 : i === 1 ? 0.8 : 0.5),
          height * (i === 0 ? 0.3 : i === 1 ? 0.7 : 0.4),
          width * 0.4
        );
        const col = isBirthdayScreen ? "rgba(236,72,153,0.04)" : isApologyScreen ? "rgba(162,186,245,0.03)" : "rgba(195,151,151,0.05)";
        glowGrad.addColorStop(0, col);
        glowGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(
          width * (i === 0 ? 0.2 : i === 1 ? 0.8 : 0.5),
          height * (i === 0 ? 0.3 : i === 1 ? 0.7 : 0.4),
          width * 0.4,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.restore();

      // RENDER: Fireflies (stars floating) - Always present, soft sparklies
      fireflies.forEach((p) => {
        p.angle += p.angleSpeed;
        p.x += p.speedX + Math.cos(p.angle) * 0.15;
        p.y += p.speedY + Math.sin(p.angle) * 0.15;

        // Wrap around
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.save();
        ctx.shadowBlur = p.size * 4;
        ctx.shadowColor = p.color;
        
        // pulsing brightness
        const currentAlpha = p.alpha * (0.6 + Math.sin(p.angle) * 0.4);
        ctx.fillStyle = p.color.replace("0.7", currentAlpha.toFixed(2));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // RENDER: Rain effect (only on APOLOGY screen)
      if (isApologyScreen) {
        raindrops.forEach((r) => {
          r.y += r.speed;
          if (r.y > height) {
            r.y = -r.length;
            r.x = Math.random() * width;
          }
          ctx.strokeStyle = `rgba(186, 210, 255, ${r.opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x, r.y + r.length);
          ctx.stroke();
        });
      }

      // RENDER: Rose Petals (only in custom modes like PROPOSAL)
      if (isProposalScreen || isBirthdayScreen) {
        petals.forEach((p) => {
          p.oscillation += p.oscillationSpeed;
          p.rotation += p.rotationSpeed;
          p.y += p.speedY;
          p.x += p.speedX + Math.sin(p.oscillation) * 0.5;

          if (p.y > height + p.size) {
            p.y = -p.size - Math.random() * 100;
            p.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          
          // Beautiful dark-pink petal gradient structure
          const petalGrad = ctx.createLinearGradient(0, 0, p.size, p.size);
          // petal colors
          petalGrad.addColorStop(0, "#f43f5e"); // real rose pink
          petalGrad.addColorStop(1, "#b91c1c"); // deep rich red
          ctx.fillStyle = petalGrad;
          ctx.globalAlpha = p.alpha;
          
          // drawn petal silhouette
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      // RENDER: HEARTS (active in Proposal, Birthday, Intro etc.)
      if (currentScreen === AppScreen.Proposal || currentScreen === AppScreen.Intro || isBirthdayScreen) {
        hearts.forEach((h) => {
          h.pulseAngle += h.pulseSpeed;
          h.y += h.speedY;
          h.x += h.speedX + Math.sin(h.pulseAngle) * 0.2;

          if (h.y < -h.size) {
            h.y = height + h.size + Math.random() * 50;
            h.x = Math.random() * width;
          }

          ctx.save();
          // Heart scale pulse
          const currentScale = 1.0 + Math.sin(h.pulseAngle) * 0.15;
          ctx.shadowBlur = h.size * 1.5;
          ctx.shadowColor = "rgba(244, 63, 94, 0.4)";
          ctx.fillStyle = `rgba(244, 63, 94, ${h.opacity * 0.65})`;
          drawHeartShape(ctx, h.x, h.y, h.size * currentScale);
          ctx.fill();
          ctx.restore();
        });
      }

      // RENDER: BALLOONS (only on Birthday transform and onward)
      if (isBirthdayScreen) {
        balloons.forEach((b) => {
          b.oscillation += b.oscillationSpeed;
          b.y += b.speedY;
          b.x += Math.sin(b.oscillation) * b.curve;

          if (b.y < -b.size * 2) {
            b.y = height + b.size * 2 + Math.random() * 300;
            b.x = Math.random() * width;
          }

          ctx.save();
          // balloon sphere
          ctx.shadowBlur = b.size * 0.5;
          ctx.shadowColor = b.color;
          ctx.globalAlpha = 0.8;
          ctx.fillStyle = b.color;
          ctx.beginPath();
          ctx.ellipse(b.x, b.y, b.size * 0.85, b.size, 0, 0, Math.PI * 2);
          ctx.fill();
          
          // balloon string block
          ctx.strokeStyle = "rgba(255,255,255,0.4)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(b.x, b.y + b.size);
          ctx.quadraticCurveTo(b.x - 5, b.y + b.size + 15, b.x, b.y + b.size + 40);
          ctx.stroke();

          // tiny knot at base
          ctx.fillStyle = b.color;
          ctx.beginPath();
          ctx.moveTo(b.x, b.y + b.size);
          ctx.lineTo(b.x - 4, b.y + b.size + 6);
          ctx.lineTo(b.x + 4, b.y + b.size + 6);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        });

        // RENDER: CONFETTI (especially in Birthday state)
        confettis.forEach((c) => {
          c.rotation += c.rotationSpeed / 5;
          c.y += c.speedY;
          c.x += c.speedX;

          if (c.y > height + 20) {
            c.y = -20;
            c.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(c.x, c.y);
          ctx.rotate((c.rotation * Math.PI) / 180);
          ctx.fillStyle = c.color;
          ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
          ctx.restore();
        });

        // Auto Firework launcher
        fireworkTimer++;
        if (fireworkTimer > 80) {
          fireworkTimer = 0;
          // launching spot
          const launchX = Math.random() * width;
          const targetX = Math.random() * width * 0.8 + width * 0.1;
          const targetY = Math.random() * height * 0.5 + height * 0.1;
          launchFirework(launchX, targetX, targetY);
        }

        // Process firework launches
        fireworkLaunches.forEach((f, index) => {
          f.distanceTraveled += f.speed;
          if (f.distanceTraveled < f.distanceToTarget) {
            const nextX = f.x + Math.cos(f.angle) * f.distanceTraveled;
            const nextY = f.y + Math.sin(f.angle) * f.distanceTraveled;
            f.coordinates.pop();
            f.coordinates.unshift([nextX, nextY]);

            ctx.save();
            ctx.strokeStyle = "#fff3a1";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(f.coordinates[f.coordinates.length - 1][0], f.coordinates[f.coordinates.length - 1][1]);
            ctx.lineTo(nextX, nextY);
            ctx.stroke();
            ctx.restore();
          } else {
            // Explode!
            explodeFirework(f.tx, f.ty);
            fireworkLaunches.splice(index, 1);
          }
        });

        // Process exploding firework particles
        fireworks.forEach((fp, index) => {
          fp.vy += fp.gravity;
          fp.x += fp.vx;
          fp.y += fp.vy;
          fp.alpha -= fp.fade;

          if (fp.alpha <= 0) {
            fireworks.splice(index, 1);
          } else {
            ctx.save();
            ctx.globalAlpha = fp.alpha;
            ctx.fillStyle = fp.color;
            ctx.shadowBlur = fp.alpha * 4;
            ctx.shadowColor = fp.color;
            ctx.beginPath();
            ctx.arc(fp.x, fp.y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentScreen, isCompletedBirthday]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
