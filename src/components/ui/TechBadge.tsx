"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export function TechBadge({ name, className }: TechBadgeProps) {
  return (
    <motion.span
      className={cn(
        "inline-flex items-center px-2.5 py-1 clip-corners-sm font-mono text-xs",
        "bg-void-3/60 border border-neon-violet/25 text-neon-muted",
        "hover:border-neon-pink/60 hover:text-neon-pink hover:shadow-[0_0_14px_-2px_rgba(255,45,120,0.6)] transition-colors duration-300",
        className
      )}
      whileHover={{ scale: 1.05 }}
    >
      {name}
    </motion.span>
  );
}
