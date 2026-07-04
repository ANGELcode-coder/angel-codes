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
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-royal-blue/20 via-indigo/20 to-cyan/20 border border-border/50 flex items-center justify-center overflow-hidden">
                  <div className="text-center" style={{ transform: "translateZ(30px)" }}>
                    <span className="text-5xl mb-2 block">🆔</span>
                    <span className="text-lg font-heading font-bold text-gradient">{featured.title}</span>
                  </div>
                </div>
              </TiltCard>

              <div className="space-y-5">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.2 }}
                >
                  <Badge variant="secondary" className="mb-3">Featured Project</Badge>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                    {featured.title}
                  </h3>
                  <p className="text-muted-foreground mt-1">{featured.tagline}</p>
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
                  <h4 className="text-sm font-heading font-semibold text-foreground mb-2">Problem</h4>
                  <p className="text-sm text-muted-foreground">{featured.problem}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  <h4 className="text-sm font-heading font-semibold text-foreground mb-2">Solution</h4>
                  <p className="text-sm text-muted-foreground">{featured.solution}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <h4 className="text-sm font-heading font-semibold text-foreground mb-2">Key Features</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {featured.features.map((feat, fi) => (
                      <motion.li
                        key={feat}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + fi * 0.05 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-royal-blue flex-shrink-0" />
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
                    className="p-4 rounded-xl bg-muted/30 border border-border/30"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 }}
                  >
                    <p className="text-sm text-muted-foreground italic">
                      &ldquo;{featured.lessonsLearned}&rdquo;
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
                      className="bg-royal-blue hover:bg-royal-blue/90 text-white rounded-full px-5 py-2 text-sm inline-flex items-center gap-2 cursor-pointer"
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
                      className="rounded-full px-5 py-2 text-sm inline-flex items-center gap-2 border border-border/50 text-foreground hover:border-royal-blue/50 hover:text-royal-blue transition-colors cursor-pointer"
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
                className="text-xl font-heading font-bold text-foreground mb-6 text-center"
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
                      className="group p-6 rounded-2xl bg-card/50 border border-border/50 h-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                      whileHover={{ borderColor: "rgba(37, 99, 235, 0.3)" }}
                    >
                      <div className="flex items-start justify-between mb-3" style={{ transform: "translateZ(20px)" }}>
                        <h4 className="text-lg font-heading font-semibold text-foreground group-hover:text-royal-blue transition-colors">
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
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-royal-blue transition-colors">
                          <SiGithub className="w-4 h-4" />
                        </a>
                        {project.live !== "#" && (
                          <button
                            onClick={() => openDemo(project.live, project.title)}
                            className="text-muted-foreground hover:text-royal-blue transition-colors cursor-pointer"
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
