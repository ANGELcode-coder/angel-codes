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
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
        "bg-muted/50 border border-border/50 text-muted-foreground",
        "hover:border-royal-blue/50 hover:text-royal-blue transition-colors duration-300",
        className
      )}
      whileHover={{ scale: 1.05 }}
    >
      {name}
    </motion.span>
  );
}
