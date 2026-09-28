"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-gradient-to-r from-neon-pink via-neon-violet to-neon-cyan origin-left shadow-[0_0_12px_rgba(255,45,120,0.9)]"
      style={{ scaleX }}
    />
  );
}
