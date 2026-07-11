import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Fruit {
  id: number;
  x: number;
  y: number;
  type: "normal" | "golden" | "rotten";
  emoji: string;
  speed: number;
  width: number;
  height: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

const FRUIT_TYPES = [
  { emoji: "🍓", type: "normal", color: "#e63946" },
  { emoji: "🍊", type: "normal", color: "#f4a261" },
  { emoji: "🍋", type: "normal", color: "#e9c46a" },
  { emoji: "🍇", type: "normal", color: "#7209b7" },
  { emoji: "🍉", type: "normal", color: "#2a9d8f" },
  { emoji: "🍎", type: "normal", color: "#d90429" },
  { emoji: "🍑", type: "normal", color: "#f4a261" },
];

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let fruits: Fruit[] = [];
    let particles: Particle[] = [];
    let basket = { x: canvas.width / 2 - 40, y: canvas.height - 60, width: 80, height: 40 };
    let currentLives = 3;
    let currentScore = 0;
    let spawnRate = 1500;
    let lastSpawn = 0;
    let lastDifficultyIncrease = performance.now();
    let speedMultiplier = 1;
    let fruitIdCounter = 0;
    let particleIdCounter = 0;
    
    // Controls
    let leftPressed = false;
    let rightPressed = false;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") leftPressed = true;
      if (e.key === "ArrowRight" || e.key === "d") rightPressed = true;
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") leftPressed = false;
      if (e.key === "ArrowRight" || e.key === "d") rightPressed = false;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const x = (e.clientX - rect.left) * scaleX;
      basket.x = Math.max(0, Math.min(canvas.width - basket.width, x - basket.width / 2));
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const x = (e.touches[0].clientX - rect.left) * scaleX;
      basket.x = Math.max(0, Math.min(canvas.width - basket.width, x - basket.width / 2));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    const spawnFruit = (timestamp: number) => {
      if (timestamp - lastSpawn > spawnRate) {
        lastSpawn = timestamp;
        
        const rand = Math.random();
        let type: "normal" | "golden" | "rotten" = "normal";
        let fruitDef = FRUIT_TYPES[Math.floor(Math.random() * FRUIT_TYPES.length)];
        let emoji = fruitDef.emoji;
        
        if (rand < 0.05) {
          type = "golden";
          emoji = "🌟";
        } else if (rand > 0.85) {
          type = "rotten";
          emoji = "☠️";
        }
        
        fruits.push({
          id: fruitIdCounter++,
          x: Math.random() * (canvas.width - 30) + 15,
          y: -30,
          type,
          emoji,
          speed: (Math.random() * 2 + 2) * speedMultiplier,
          width: 30,
          height: 30
        });
      }
    };
    
    const spawnParticles = (x: number, y: number, color: string) => {
      for (let i = 0; i < 15; i++) {
        particles.push({
          id: particleIdCounter++,
          x,
          y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 1,
          maxLife: Math.random() * 20 + 20,
          color
        });
      }
    };

    const update = (timestamp: number) => {
      // Increase difficulty
      if (timestamp - lastDifficultyIncrease > 30000) {
        lastDifficultyIncrease = timestamp;
        speedMultiplier += 0.2;
        spawnRate = Math.max(500, spawnRate - 200);
      }
      
      // Move basket keyboard
      if (leftPressed) basket.x = Math.max(0, basket.x - 7);
      if (rightPressed) basket.x = Math.min(canvas.width - basket.width, basket.x + 7);
      
      // Update fruits
      for (let i = fruits.length - 1; i >= 0; i--) {
        const f = fruits[i];
        f.y += f.speed;
        
        // Collision with basket
        if (
          f.y + f.height > basket.y && 
          f.y < basket.y + basket.height && 
          f.x + f.width > basket.x && 
          f.x - f.width < basket.x + basket.width
        ) {
          if (f.type === "rotten") {
            currentLives--;
            spawnParticles(f.x, f.y, "#333");
          } else if (f.type === "golden") {
            currentScore += 50;
            spawnParticles(f.x, f.y, "#f4a261");
          } else {
            currentScore += 10;
            spawnParticles(f.x, f.y, "#e63946");
          }
          setScore(currentScore);
          fruits.splice(i, 1);
        } else if (f.y > canvas.height) {
          if (f.type !== "rotten") {
            currentLives--;
          }
          fruits.splice(i, 1);
        }
      }
      
      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }
      
      if (currentLives <= 0) {
        setIsPlaying(false);
        setIsGameOver(true);
      }
    };

    const draw = () => {
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#a8dadc"); // Sky blue
      gradient.addColorStop(0.8, "#f1faee"); // Horizon
      gradient.addColorStop(0.8, "#2d6a4f"); // Grass
      gradient.addColorStop(1, "#1b4332");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw fruits
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "24px Arial";
      
      fruits.forEach(f => {
        if (f.type === "golden") {
          ctx.shadowColor = "#f4a261";
          ctx.shadowBlur = 10;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillText(f.emoji, f.x, f.y);
        ctx.shadowBlur = 0;
      });
      
      // Draw particles
      particles.forEach(p => {
        ctx.globalAlpha = 1 - (p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;
      
      // Draw basket
      ctx.fillStyle = "#bc6c25";
      ctx.beginPath();
      ctx.moveTo(basket.x, basket.y);
      ctx.lineTo(basket.x + basket.width, basket.y);
      ctx.lineTo(basket.x + basket.width - 10, basket.y + basket.height);
      ctx.lineTo(basket.x + 10, basket.y + basket.height);
      ctx.fill();
      
      // Draw score & lives
      ctx.fillStyle = "#153226";
      ctx.font = "bold 24px Fredoka, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`Score: ${currentScore}`, 20, 30);
      
      ctx.textAlign = "right";
      let livesText = "";
      for (let i=0; i<currentLives; i++) livesText += "❤️ ";
      ctx.fillText(livesText, canvas.width - 20, 30);
    };

    const gameLoop = (timestamp: number) => {
      spawnFruit(timestamp);
      update(timestamp);
      draw();
      
      if (currentLives > 0) {
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isPlaying, isGameOver]);

  const startGame = () => {
    const audio = new Audio(`${import.meta.env.BASE_URL}sounds/game-start.mp3`);
    audio.volume = 0.6;
    audio.play().catch(() => {
      // Autoplay can be blocked until the user has interacted with the page;
      // the click that triggers startGame counts as that interaction in
      // most browsers, so this catch is just a safety net.
    });
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
  };

  return (
    <div className="relative w-full max-w-[480px] mx-auto rounded-xl overflow-hidden shadow-2xl border-4 border-primary/20 aspect-[3/4] bg-[#a8dadc]">
      <canvas
        ref={canvasRef}
        width={480}
        height={640}
        className="w-full h-full block cursor-none touch-none"
      />
      
      {!isPlaying && !isGameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-10 p-6 text-center">
          <div className="text-6xl animate-bounce mb-6">🍓</div>
          <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-md">Harvest Fruit</h2>
          <p className="text-white/90 mb-8 font-medium">Catch the falling fruits! Avoid the rotten ones.</p>
          <Button size="lg" className="text-xl px-12 py-6 rounded-full shadow-xl hover:scale-105 transition-transform" onClick={startGame}>
            PLAY NOW
          </Button>
        </div>
      )}
      
      {isGameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-10 p-6 text-center animate-in fade-in zoom-in duration-300">
          <h2 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">Game Over</h2>
          <div className="bg-white/10 p-6 rounded-2xl border border-white/20 mb-8 w-full max-w-xs">
            <p className="text-white/80 text-lg uppercase tracking-wider mb-1">Final Score</p>
            <p className="text-6xl font-bold text-accent drop-shadow-md">{score}</p>
          </div>
          <Button size="lg" className="text-xl px-12 py-6 rounded-full shadow-xl hover:scale-105 transition-transform bg-primary text-primary-foreground" onClick={startGame}>
            PLAY AGAIN
          </Button>
        </div>
      )}
    </div>
  );
}
