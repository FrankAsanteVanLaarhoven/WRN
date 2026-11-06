import React, { useEffect, useRef } from 'react';
import { useConsole } from '../../store/consoleStore';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
}

export const VelvetParticleGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { illuminationColor } = useConsole();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates for subtle interactive gravity
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Parse current illumination color from CSS variables
    const getComputedRGB = () => {
      const style = getComputedStyle(document.documentElement);
      const rgb = style.getPropertyValue('--illum-rgb').trim();
      return rgb || '0, 229, 255';
    };

    // Initialize 48 luxury floating particles
    let particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 28000), 55);

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 1.5 + 0.8;
        const baseAlpha = Math.random() * 0.35 + 0.15;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius,
          alpha: baseAlpha,
          baseAlpha
        });
      }
    };

    initParticles();

    // Render loop
    let lastTime = performance.now();
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      const rgb = getComputedRGB();

      // Draw subtle connecting links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const linkAlpha = (1 - dist / 110) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${rgb}, ${linkAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particles & update position
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Cursor proximity glow & subtle deflection
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 0.8;
          p.x -= (dx / (dist || 1)) * force * 1.5;
          p.y -= (dy / (dist || 1)) * force * 1.5;
          p.alpha = Math.min(p.baseAlpha + (1 - dist / mouse.radius) * 0.45, 0.8);
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        // Move particle
        p.x += p.vx * (dt * 60);
        p.y += p.vy * (dt * 60);

        // Screen boundary wrap
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${p.alpha})`;
        ctx.shadowColor = `rgba(${rgb}, 0.5)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [illuminationColor]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Velvet Ambient Radial Gradients (Deep Obsidian + Soft Luminescence) */}
      <div 
        className="absolute inset-0 opacity-60 transition-opacity duration-1000"
        style={{
          background: `
            radial-gradient(circle at 50% -10%, rgba(var(--illum-rgb), 0.12) 0%, transparent 55%),
            radial-gradient(circle at 10% 40%, rgba(var(--illum-rgb), 0.05) 0%, transparent 45%),
            radial-gradient(circle at 90% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, #06070B 0%, transparent 70%)
          `
        }}
      />

      {/* 2. Premium Velvet Dot Grid Mesh (Ultra-Crisp 24px Micro-Pattern) */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0),
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 72px 72px, 72px 72px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 95%)'
        }}
      />

      {/* 3. Subtle Velvet Vignette Border Shadow */}
      <div 
        className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(4,5,8,0.85)]" 
      />

      {/* 4. Interactive Live Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-80"
      />
    </div>
  );
};

export default VelvetParticleGrid;
