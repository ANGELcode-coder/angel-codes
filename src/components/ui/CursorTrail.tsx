"use client";

import { useEffect, useRef } from "react";

interface CursorTrailProps {
  color?: string;
  dotCount?: number;
  dotSize?: number;
  maxOpacity?: number;
  springStiffness?: number;
  springDamping?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  el: HTMLDivElement | null;
}

export function CursorTrail({
  color = "#2563eb",
  dotCount = 14,
  dotSize = 5,
  maxOpacity = 0.65,
  springStiffness = 0.08,
  springDamping = 0.82,
}: CursorTrailProps) {
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: Particle[] = [];
    for (let i = 0; i < dotCount; i++) {
      const el = document.createElement("div");
      el.style.cssText = `
        position: fixed;
        width: ${dotSize}px;
        height: ${dotSize}px;
        border-radius: 50%;
        background: ${color};
        pointer-events: none;
        will-change: transform, opacity;
        z-index: 9999;
        opacity: 0;
      `;
      container.appendChild(el);
      particles.push({
        x: -200,
        y: -200,
        vx: 0,
        vy: 0,
        el,
      });
    }
    particlesRef.current = particles;

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const update = () => {
      let prevX = mouseRef.current.x;
      let prevY = mouseRef.current.y;

      particles.forEach((p, i) => {
        const targetX = i === 0 ? prevX : particles[i - 1].x;
        const targetY = i === 0 ? prevY : particles[i - 1].y;

        const jitterX = (Math.random() - 0.5) * 1.8;
        const jitterY = (Math.random() - 0.5) * 1.8;

        const dx = (targetX + jitterX) - p.x;
        const dy = (targetY + jitterY) - p.y;

        p.vx += dx * springStiffness;
        p.vy += dy * springStiffness;
        p.vx *= springDamping;
        p.vy *= springDamping;

        p.x += p.vx;
        p.y += p.vy;

        const dist = Math.hypot(p.x - mouseRef.current.x, p.y - mouseRef.current.y);
        const maxDist = 120 + i * 20;
        const opacity = dist < maxDist ? maxOpacity * (1 - i / particles.length) * (1 - dist / maxDist) : 0;
        const scale = 1 - i / particles.length * 0.55;

        if (p.el) {
          p.el.style.transform = `translate(${p.x - dotSize / 2}px, ${p.y - dotSize / 2}px) scale(${scale})`;
          p.el.style.opacity = String(opacity);
        }

        prevX = p.x;
        prevY = p.y;
      });

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouse);
      particles.forEach((p) => p.el?.remove());
    };
  }, [color, dotCount, dotSize, maxOpacity, springStiffness, springDamping]);

  return <div ref={containerRef} aria-hidden="true" />;
}
