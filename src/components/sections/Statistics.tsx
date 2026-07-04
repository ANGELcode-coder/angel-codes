"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { statistics } from "@/lib/data";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function Statistics() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-royal-blue/5 via-transparent to-cyan/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {statistics.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm group"
              variants={cardVariants}
              custom={i}
              whileHover={{
                y: -6,
                borderColor: "#2563EB40",
                boxShadow: "0 20px 40px rgba(37,99,235,0.1)",
              }}
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gradient mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
