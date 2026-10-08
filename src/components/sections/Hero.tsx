"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Download, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { SiGithub, SiDevdotto } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { GlitchText } from "@/components/ui/GlitchText";
import { GlowFollower } from "@/components/ui/GlowFollower";
import { Magnetic } from "@/components/ui/Magnetic";

const roles = [
  "Software Engineer",
  "Full-Stack Developer",
  "Backend & APIs",
  "AI Enthusiast",
];

const consoleLines = [
  { prompt: ">", text: "initialising portfolio.exe" },
  { prompt: ">", text: "loading skill matrix ...... done" },
  { prompt: ">", text: "scaling backend services ...... ok" },
  { prompt: ">", text: "status: online" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Perspective grid floor + flat tech grid */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-flat opacity-60" />
        <div className="grid-floor" />
      </div>

      {/* Neon bloom behind the headline */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[640px] h-[420px] bg-neon-violet/20 rounded-full blur-[120px] animate-pulse-neon" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-neon-pink/15 rounded-full blur-[110px] animate-pulse-neon [animation-delay:1.2s]" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-neon-cyan/15 rounded-full blur-[110px] animate-pulse-neon [animation-delay:2.2s]" />
      </div>

      <GlowFollower color="rgba(255, 45, 120, 0.07)" size={520}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* HUD status strip */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 mb-8 px-4 py-2 clip-corners-sm border border-neon-cyan/30 bg-neon-cyan/5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-neon-lime animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-lime" />
              </span>
              <span className="hud-label text-neon-cyan">
                Available for new work
              </span>
            </motion.div>

            {/* Avatar with rotating conic neon ring */}
            <motion.div
              className="flex items-center justify-center gap-4 md:gap-6 mb-6"
              variants={itemVariants}
            >
              <motion.div
                className="relative w-16 h-16 md:w-20 md:h-20 shrink-0"
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              >
                <div className="ring-conic absolute -inset-1.5 rounded-2xl">
                  <div className="ring-conic-after" />
                </div>
                <div className="absolute inset-0 overflow-hidden clip-corners-sm bg-void-2">
                  <Image
                    src="/profile.jpg"
                    alt="Angel Zee Ngoh"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </motion.div>

              <div className="text-left">
                <p className="hud-label text-neon-muted mb-1.5">Hello, I&apos;m</p>
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold uppercase leading-none tracking-tight">
                  <GlitchText
                    text="Angel Zee Ngoh"
                    className="block"
                    srText="Angel Zee Ngoh"
                  />
                </h1>
              </div>
            </motion.div>

            {/* Role chips */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8"
              variants={itemVariants}
            >
              {roles.map((role, i) => (
                <motion.span
                  key={role}
                  className="px-3 py-1.5 md:px-4 md:py-2 clip-corners-sm text-xs md:text-sm font-mono uppercase tracking-wider border border-neon-pink/25 bg-neon-pink/5 text-neon-text cursor-default transition-colors hover:border-neon-pink hover:text-neon-pink hover:glow"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                >
                  {role}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              className="text-base md:text-lg text-neon-muted max-w-xl mx-auto mb-10 leading-relaxed"
              variants={itemVariants}
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 mb-12"
              variants={itemVariants}
            >
              <Magnetic>
                <button
                  type="button"
                  className="relative bg-neon-pink text-void font-heading font-semibold uppercase tracking-wider text-sm clip-corners-sm px-7 h-12 gap-2 inline-flex items-center group cursor-pointer glow hover:brightness-110 transition-[filter]"
                  onClick={() => scrollTo("projects")}
                >
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Magnetic>

              <Magnetic>
                <button
                  type="button"
                  className="clip-corners-sm px-7 h-12 gap-2 inline-flex items-center border border-neon-cyan/50 bg-neon-cyan/5 font-heading font-semibold uppercase tracking-wider text-sm text-neon-cyan hover:bg-neon-cyan hover:text-void hover:glow-cyan transition-colors cursor-pointer"
                  onClick={() => scrollTo("resume")}
                >
                  <Download className="w-4 h-4" />
                  Resume
                </button>
              </Magnetic>

              <Magnetic>
                <a
                  href={personalInfo.social.email}
                  className="clip-corners-sm px-7 h-12 gap-2 inline-flex items-center border border-neon-violet/50 bg-neon-violet/5 font-heading font-semibold uppercase tracking-wider text-sm text-neon-violet hover:bg-neon-violet hover:text-void transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
              </Magnetic>
            </motion.div>

            {/* Social row */}
            <motion.div
              className="flex items-center justify-center gap-6"
              variants={itemVariants}
            >
              {[
                { icon: SiGithub, href: personalInfo.social.github, label: "GitHub" },
                { icon: FaLinkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
                { icon: SiDevdotto, href: personalInfo.social.devto, label: "Dev.to" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-muted hover:text-neon-pink hover:drop-shadow-[0_0_8px_rgba(255,45,120,0.8)] transition-colors"
                  whileHover={{ y: -3, scale: 1.15 }}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </motion.a>
              ))}
              <motion.a
                href={personalInfo.social.email}
                className="text-neon-muted hover:text-neon-cyan hover:drop-shadow-[0_0_8px_rgba(0,245,255,0.8)] transition-colors"
                whileHover={{ y: -3, scale: 1.15 }}
                aria-label="Email"
              >
                <Mail className="w-5 h-5 md:w-6 md:h-6" />
              </motion.a>
            </motion.div>

            {/* Boot console */}
            <motion.div
              variants={itemVariants}
              className="mt-14 inline-block text-left clip-corners-sm border border-neon-violet/25 bg-void-2/70 backdrop-blur-sm px-4 md:px-5 py-3.5 max-w-full overflow-hidden"
            >
              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-neon-pink/80" />
                <span className="w-2 h-2 rounded-full bg-neon-amber/80" />
                <span className="w-2 h-2 rounded-full bg-neon-lime/80" />
                <span className="hud-label text-neon-muted ml-2">guest@angelcodes</span>
              </div>
              <div className="font-mono text-[11px] md:text-xs leading-relaxed">
                {consoleLines.map((line, i) => (
                  <motion.div
                    key={line.text}
                    initial={{ opacity: 0, x: -6 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1 + i * 0.22, duration: 0.3 }}
                    className="flex gap-2"
                  >
                    <span className="text-neon-lime shrink-0">{line.prompt}</span>
                    <span
                      className={
                        i === consoleLines.length - 1
                          ? "text-neon-lime"
                          : "text-neon-muted"
                      }
                    >
                      {line.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </GlowFollower>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1, y: [0, 8, 0] } : {}}
        transition={{ delay: 1.5, y: { repeat: Infinity, duration: 2 } }}
      >
        <motion.div
          className="w-5 h-8 clip-corners-sm border border-neon-cyan/40 flex items-start justify-center p-1.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden="true"
        >
          <motion.div
            className="w-1 h-2 bg-neon-cyan"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
