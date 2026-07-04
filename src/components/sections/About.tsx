"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { timelineEvents } from "@/lib/data";
import Image from "next/image";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          subtitle="My journey into software engineering and beyond"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <motion.div
            className="lg:col-span-2 flex justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl border border-border/50 overflow-hidden">
                <Image
                  src="/profile.jpg"
                  alt="Angel Zee Ngoh"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-royal-blue/10 border border-royal-blue/30 flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl font-heading font-bold text-gradient">&lt;/&gt;</span>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-3">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
                My journey into software engineering started with curiosity about how digital products are built. Since then, I&apos;ve developed applications ranging from management systems to decentralized identity solutions and AI-powered mobile apps. I specialize in full-stack development with React, Next.js, React Native, and Java Spring Boot, while continuously expanding into cloud technologies and machine learning. I enjoy transforming ideas into scalable software that creates real-world impact, particularly for African communities.
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-royal-blue via-cyan to-transparent" />

              {timelineEvents.map((event, i) => (
                <motion.div
                  key={event.year}
                  className="relative pl-10 pb-8 last:pb-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                  <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-royal-blue border-2 border-background z-10" />
                  <div>
                    <span className="text-sm font-heading font-bold text-gradient">
                      {event.year}
                    </span>
                    <p className="text-foreground font-medium mt-1">{event.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
