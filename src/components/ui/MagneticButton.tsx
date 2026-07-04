"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit";
}

export function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = "primary",
  size = "md",
  disabled,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleLeave = () => setPosition({ x: 0, y: 0 });

  const baseStyles =
    "relative inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-full overflow-hidden group";

  const variantStyles = {
    primary: "bg-royal-blue hover:bg-royal-blue/90 text-white",
    outline: "border border-border/50 hover:border-royal-blue/50 text-foreground hover:text-royal-blue",
    ghost: "text-muted-foreground hover:text-foreground",
  };

  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs gap-1.5",
    md: "px-6 py-2.5 text-sm gap-2",
    lg: "px-8 py-3 text-base gap-2.5",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      type={href ? undefined : type}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={false}
      />
      {children}
    </Component>
  );
}
