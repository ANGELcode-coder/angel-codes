"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Download, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { SiGithub, SiDevdotto } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { TextReveal } from "@/components/ui/TextReveal";
import { GlowFollower } from "@/components/ui/GlowFollower";

const floatingSnippets = [
  '{ "code": "build" }',
  "const app = new App();",
  "<Portfolio />",
  "npm run dev",
  "git push origin main",
  "async function build()",
  "import React from 'react'",
  "export default App",
  "docker-compose up",
  "npx create-next-app",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <GlowFollower color="rgba(37, 99, 235, 0.06)" size={500}>
        <div className="absolute inset-0 bg-gradient-to-b from-royal-blue/5 via-transparent to-deep-space -z-10" />

        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-royal-blue/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-cyan/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo/5 rounded-full blur-3xl" />
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
          {floatingSnippets.map((snippet, i) => (
            <motion.div
              key={i}
              className="absolute text-xs font-mono text-royal-blue/40"
              style={{
                left: `${10 + (i * 7) % 80}%`,
                top: `${5 + (i * 11) % 85}%`,
                rotate: `${(i % 3) * 5 - 5}deg`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.3, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 4 + (i % 3) * 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut",
              }}
            >
              {snippet}
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.p
              className="text-sm md:text-base font-mono text-royal-blue mb-4 tracking-wider"
              variants={itemVariants}
            >
              Hi, I&apos;m
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              variants={itemVariants}
            >
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-royal-blue/30 flex-shrink-0"
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              >
                <Image
                  src="/profile.jpg"
                  alt="Angel Zee Ngoh"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <TextReveal
                text="ANGEL ZEE NGOH"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold"
                delay={0.4}
                as="h1"
              />
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8"
              variants={itemVariants}
            >
              {["Software Engineer", "Full-Stack Developer", "AI Enthusiast", "Prompt Engineer"].map((role, i) => (
                <motion.span
                  key={role}
                  className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border border-border/50 bg-card/50 text-muted-foreground cursor-default"
                  whileHover={{ scale: 1.05, borderColor: "#2563EB", color: "#2563EB" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                >
                  {role}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
              variants={itemVariants}
            >
              {personalInfo.tagline}
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 mb-12"
              variants={itemVariants}
            >
              <motion.button
                className="bg-royal-blue hover:bg-royal-blue/90 text-white rounded-full px-6 h-11 gap-2 inline-flex items-center group cursor-pointer"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
              <motion.button
                className="rounded-full px-6 h-11 gap-2 inline-flex items-center border border-border/50 text-foreground hover:border-royal-blue/50 hover:text-royal-blue transition-colors cursor-pointer"
                onClick={() => document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </motion.button>
              <motion.button
                className="rounded-full px-6 h-11 gap-2 inline-flex items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </motion.button>
            </motion.div>

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
                  className="text-muted-foreground hover:text-royal-blue transition-colors"
                  whileHover={{ y: -3, scale: 1.15, rotate: [0, -5, 5, 0] }}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </motion.a>
              ))}
              <motion.a
                href={personalInfo.social.email}
                className="text-muted-foreground hover:text-royal-blue transition-colors"
                whileHover={{ y: -3, scale: 1.15, rotate: [0, -5, 5, 0] }}
                aria-label="Email"
              >
                <Mail className="w-5 h-5 md:w-6 md:h-6" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </GlowFollower>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1, y: [0, 8, 0] } : {}}
        transition={{ delay: 1.5, y: { repeat: Infinity, duration: 2 } }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-royal-blue"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
