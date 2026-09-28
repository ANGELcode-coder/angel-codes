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
              {/* Rotating neon ring around the portrait */}
              <div className="ring-conic absolute -inset-3 clip-corners">
                <div className="ring-conic-after" />
              </div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 clip-corners overflow-hidden border border-neon-violet/30 bg-void-2">
                <Image
                  src="/profile.jpg"
                  alt="Angel Zee Ngoh"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                />
                {/* Neon duotone wash */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,45,120,0.28),transparent_55%,rgba(0,245,255,0.28))] mix-blend-color"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 w-24 h-24 clip-corners bg-neon-pink/10 border border-neon-pink/40 flex items-center justify-center backdrop-blur-sm glow">
                <span className="text-2xl font-heading font-bold text-neon-pink">&lt;/&gt;</span>
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
                I&apos;m a Computer Engineering student and hands-on software developer with practical
                experience across full-stack development, REST APIs, databases, authentication,
                testing and deployment. My work spans management platforms, dashboards and internal
                digital solutions — including an engineering internship at NFC Bank that exposed me
                to how enterprise banking technology is actually delivered.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
                I&apos;m drawn to banking technology and digital financial services: secure
                authentication, role-based access control, reliable backends and payment-oriented
                system thinking. I enjoy turning ideas into scalable software that creates real-world
                impact, particularly for African communities.
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-neon-pink via-neon-cyan to-transparent" />

              {timelineEvents.map((event, i) => (
                <motion.div
                  key={event.year}
                  className="relative pl-10 pb-8 last:pb-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                  <div className="absolute left-2 top-1 w-3 h-3 rotate-45 bg-neon-lime border-2 border-background z-10 shadow-[0_0_10px_rgba(198,255,0,0.9)]" />
                  <div>
                    <span className="hud-label text-neon-cyan">{event.year}</span>
                    <p className="text-foreground font-medium mt-1.5">{event.event}</p>
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
