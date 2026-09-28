"use client";

import { useRef, useState, ReactNode } from "react";

interface GlowFollowerProps {
  children: ReactNode;
  className?: string;
  color?: string;
  size?: number;
}

export function GlowFollower({
  children,
  className,
  color = "rgba(255, 45, 120, 0.09)",
  size = 400,
}: GlowFollowerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: "50%", y: "50%" });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x: `${x}%`, y: `${y}%` });
  };

  return (
    <div
      ref={ref}
      className={`relative ${className || ""}`}
      onMouseMove={handleMouse}
      style={{ overflow: "hidden" }}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-300 ease-out"
        style={{
          background: `radial-gradient(${size}px circle at ${position.x} ${position.y}, ${color}, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
