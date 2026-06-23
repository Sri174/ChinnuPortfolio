import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

interface ParticlesProps {
  className?: string;
  density?: number; // particles per 10,000 px^2
  maxSpeed?: number;
  color?: string;
  linkDistance?: number;
}

export default function Particles({
  className,
  density = 0.06, // subtle by default
  maxSpeed = 0.3,
  color = "255, 255, 255", // rgb (white)
  linkDistance = 120,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const initParticles = () => {
      particlesRef.current = [];
      const area = (width * height) / 10000;
      const count = Math.min(300, Math.max(40, Math.floor(area * density)));
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() * 2 - 1) * maxSpeed,
          vy: (Math.random() * 2 - 1) * maxSpeed,
          r: Math.random() * 1.8 + 0.7,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // draw links first for nicer layering
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p1 = particlesRef.current[i];
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDistance) {
            const alpha = 0.12 * (1 - dist / linkDistance);
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // draw particles
      for (const p of particlesRef.current) {
        // move
        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // glow dot
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grd.addColorStop(0, `rgba(${color}, 0.9)`);
        grd.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${color}, 0.9)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    initParticles();
    draw();
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [density, maxSpeed, color, linkDistance]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 -z-10 opacity-35 ${className ?? ""}`}
    />
  );
}
