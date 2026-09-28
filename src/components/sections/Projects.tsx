"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { TiltCard } from "@/components/ui/TiltCard";
import { DemoModal } from "@/components/ui/DemoModal";
import { projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const featured = projects[0];
  const rest = projects.slice(1);
  const [demoUrl, setDemoUrl] = useState<string | null>(null);
  const [demoTitle, setDemoTitle] = useState("");

  const openDemo = (url: string, title: string) => {
    setDemoUrl(url);
    setDemoTitle(title);
  };

  return (
    <>
      <SectionWrapper id="projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Featured Projects"
            subtitle="Real-world applications I've built"
          />

          <div ref={ref} className="space-y-16">
            <motion.div
              key={featured.title}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="relative group" tiltDegree={5}>
                <div className="aspect-video clip-corners bg-gradient-to-br from-neon-pink/20 via-neon-violet/20 to-neon-cyan/20 border border-neon-violet/30 grid-flat flex items-center justify-center overflow-hidden">
                  <div className="text-center" style={{ transform: "translateZ(30px)" }}>
                    <span className="text-5xl mb-2 block">🆔</span>
                    <span className="text-lg font-heading font-bold uppercase tracking-wide text-gradient">{featured.title}</span>
                  </div>
                  {/* Corner brackets */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-70"
                    style={{
                      background:
                        "linear-gradient(to right, #ff2d78 2px, transparent 2px) 0 0 / 28px 2px no-repeat, linear-gradient(to bottom, #ff2d78 2px, transparent 2px) 0 0 / 2px 28px no-repeat, linear-gradient(to left, #00f5ff 2px, transparent 2px) 100% 100% / 28px 2px no-repeat, linear-gradient(to top, #00f5ff 2px, transparent 2px) 100% 100% / 2px 28px no-repeat",
                    }}
                  />
                </div>
              </TiltCard>

              <div className="space-y-5">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.2 }}
                >
                  <Badge variant="outline" className="mb-3 h-6 gap-1.5 px-2.5 hud-label text-neon-pink border-neon-pink/40 bg-neon-pink/10">
                    Featured Project
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-wide text-foreground">
                    {featured.title}
                  </h3>
                  <p className="text-neon-muted font-mono text-sm mt-1">{featured.tagline}</p>
                </motion.div>

                <motion.p
                  className="text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  {featured.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="hud-label text-neon-cyan mb-2">Problem</h4>
                  <p className="text-sm text-muted-foreground">{featured.problem}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  <h4 className="hud-label text-neon-cyan mb-2">Solution</h4>
                  <p className="text-sm text-muted-foreground">{featured.solution}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <h4 className="hud-label text-neon-cyan mb-3">Key Features</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {featured.features.map((feat, fi) => (
                      <motion.li
                        key={feat}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + fi * 0.05 }}
                      >
                        <span aria-hidden="true" className="w-1.5 h-1.5 mt-1.5 rotate-45 bg-neon-lime flex-shrink-0" />
                        {feat}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  {featured.technologies.map((tech) => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                </motion.div>

                {featured.lessonsLearned && (
                  <motion.div
                    className="relative p-4 clip-corners-sm bg-void-3/40 border border-neon-violet/20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 }}
                  >
                    <p className="text-sm font-mono text-neon-muted">
                      <span aria-hidden="true" className="text-neon-cyan">&gt;&gt;&nbsp;</span>
                      {featured.lessonsLearned}
                    </p>
                  </motion.div>
                )}

                <motion.div
                  className="flex gap-3 pt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 }}
                >
                  <a href={featured.github} target="_blank" rel="noopener noreferrer">
                    <motion.button
                      className="bg-neon-pink hover:brightness-110 text-void clip-corners-sm px-5 py-2.5 font-heading font-semibold uppercase tracking-wider text-sm inline-flex items-center gap-2 cursor-pointer glow"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <SiGithub className="w-4 h-4" />
                      Source Code
                    </motion.button>
                  </a>
                  {featured.live !== "#" && (
                    <motion.button
                      onClick={() => openDemo(featured.live, featured.title)}
                      className="clip-corners-sm px-5 py-2.5 font-heading font-semibold uppercase tracking-wider text-sm inline-flex items-center gap-2 border border-neon-cyan/50 bg-neon-cyan/5 text-neon-cyan hover:bg-neon-cyan hover:text-void transition-colors cursor-pointer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Monitor className="w-4 h-4" />
                      Live Demo
                    </motion.button>
                  )}
                </motion.div>
              </div>
            </motion.div>

            <div>
              <motion.h3
                className="text-sm font-heading font-bold uppercase tracking-[0.25em] text-neon-cyan mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                More Projects
              </motion.h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((project, i) => (
                  <TiltCard key={project.title} tiltDegree={4}>
                    <motion.div
                      className="group relative p-6 clip-corners-sm bg-card/70 border border-neon-violet/20 backdrop-blur-sm h-full hover:border-neon-pink/50 hover:shadow-[0_0_28px_-6px_rgba(255,45,120,0.5)] transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="flex items-start justify-between mb-3" style={{ transform: "translateZ(20px)" }}>
                        <h4 className="text-base font-heading font-bold uppercase tracking-wide text-foreground group-hover:text-neon-pink transition-colors">
                          {project.title}
                        </h4>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1" style={{ transform: "translateZ(10px)" }}>{project.tagline}</p>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4" style={{ transform: "translateZ(10px)" }}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4" style={{ transform: "translateZ(15px)" }}>
                        {project.technologies.slice(0, 4).map((tech) => (
                          <TechBadge key={tech} name={tech} />
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="text-xs text-muted-foreground self-center">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3" style={{ transform: "translateZ(20px)" }}>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-pink transition-colors">
                          <SiGithub className="w-4 h-4" />
                        </a>
                        {project.live !== "#" && (
                          <button
                            onClick={() => openDemo(project.live, project.title)}
                            className="text-muted-foreground hover:text-neon-pink transition-colors cursor-pointer"
                            aria-label="Live demo"
                          >
                            <Monitor className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <DemoModal
        url={demoUrl || ""}
        title={demoTitle}
        open={!!demoUrl}
        onClose={() => setDemoUrl(null)}
      />
    </>
  );
}
