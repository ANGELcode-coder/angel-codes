"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { TiltCard } from "@/components/ui/TiltCard";
import { DemoModal } from "@/components/ui/DemoModal";
import {
  projects,
  archivedProjects,
  type Project,
  type ProjectStatus,
} from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const STATUS_META: Record<
  ProjectStatus,
  { label: string; badge: string; dot: string }
> = {
  shipped: {
    label: "Shipped",
    badge:
      "hud-label text-neon-lime border-neon-lime/40 bg-neon-lime/10",
    dot: "bg-neon-lime",
  },
  progress: {
    label: "In progress",
    badge: "hud-label text-neon-amber border-neon-amber/40 bg-neon-amber/10",
    dot: "bg-neon-amber",
  },
  openSource: {
    label: "Open source",
    badge: "hud-label text-neon-cyan border-neon-cyan/40 bg-neon-cyan/10",
    dot: "bg-neon-cyan",
  },
  archive: {
    label: "Archived",
    badge: "hud-label text-neon-muted border-neon-violet/30 bg-neon-violet/5",
    dot: "bg-neon-violet",
  },
};

const FILTERS: Array<{ id: ProjectStatus | "all"; label: string }> = [
  { id: "all", label: "All" },
  { id: "shipped", label: "Shipped" },
  { id: "progress", label: "In progress" },
  { id: "openSource", label: "Open source" },
];

function StatusPill({ status }: { status: ProjectStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 h-5 px-2 border",
        meta.badge
      )}
    >
      <span aria-hidden="true" className={cn("w-1.5 h-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  );
}

function ProjectLinks({
  project,
  onOpenDemo,
}: {
  project: Project;
  onOpenDemo: (url: string, title: string) => void;
}) {
  if (!project.repo && !project.live) return null;
  return (
    <div className="flex items-center gap-4">
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-neon-muted hover:text-neon-pink transition-colors"
        >
          <SiGithub className="w-3.5 h-3.5" />
          Source
        </a>
      )}
      {project.live && (
        <button
          onClick={() => onOpenDemo(project.live as string, project.title)}
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-neon-muted hover:text-neon-cyan transition-colors cursor-pointer"
        >
          <Monitor className="w-3.5 h-3.5" />
          Live demo
        </button>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  isInView,
  onOpenDemo,
}: {
  project: Project;
  index: number;
  isInView: boolean;
  onOpenDemo: (url: string, title: string) => void;
}) {
  return (
    <TiltCard tiltDegree={3}>
      <motion.article
        className={cn(
          "group relative p-6 h-full flex flex-col clip-corners-sm bg-card/70 backdrop-blur-sm border transition-all duration-300",
          project.status === "archive"
            ? "border-neon-violet/20 hover:border-neon-violet/50"
            : "border-neon-violet/20 hover:border-neon-pink/50 hover:shadow-[0_0_28px_-6px_rgba(255,45,120,0.5)]"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.08, duration: 0.5 }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        />

        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-heading font-bold uppercase tracking-wide text-foreground group-hover:text-neon-pink transition-colors">
            {project.title}
          </h3>
          <StatusPill status={project.status} />
        </div>

        <p className="text-xs font-mono text-neon-muted mb-3">{project.tagline}</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {project.outcome && (
          <p className="text-xs text-neon-cyan/80 font-mono mb-4 leading-relaxed">
            <span aria-hidden="true">&gt;&gt; </span>
            {project.outcome}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 5).map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
          {project.technologies.length > 5 && (
            <span className="font-mono text-xs text-neon-muted self-center">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <ProjectLinks project={project} onOpenDemo={onOpenDemo} />
      </motion.article>
    </TiltCard>
  );
}

/** The flagship project gets a full-width deep dive. */
function FeaturedProject({
  project,
  isInView,
  onOpenDemo,
}: {
  project: Project;
  isInView: boolean;
  onOpenDemo: (url: string, title: string) => void;
}) {
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard className="relative group" tiltDegree={4}>
        <div className="aspect-video clip-corners bg-gradient-to-br from-neon-pink/20 via-neon-violet/20 to-neon-cyan/20 border border-neon-violet/30 grid-flat flex items-center justify-center overflow-hidden">
          <div className="text-center px-6">
            <span className="text-5xl mb-3 block" aria-hidden="true">
              🆔
            </span>
            <span className="block text-lg font-heading font-bold uppercase tracking-wide text-gradient">
              {project.title}
            </span>
            <span className="block mt-2 font-mono text-xs text-neon-muted">
              {project.technologies.slice(0, 4).join(" · ")}
            </span>
          </div>
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
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Badge
              variant="outline"
              className="h-6 gap-1.5 px-2.5 hud-label text-neon-pink border-neon-pink/40 bg-neon-pink/10"
            >
              Flagship
            </Badge>
            <StatusPill status={project.status} />
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-wide text-foreground">
            {project.title}
          </h3>
          <p className="text-neon-muted font-mono text-sm mt-1">{project.tagline}</p>
        </div>

        <p className="text-muted-foreground leading-relaxed">{project.description}</p>

        {project.outcome && (
          <p className="text-xs text-neon-cyan/80 font-mono leading-relaxed">
            <span aria-hidden="true">&gt;&gt; </span>
            {project.outcome}
          </p>
        )}

        {project.problem && (
          <div>
            <h4 className="hud-label text-neon-cyan mb-2">Problem</h4>
            <p className="text-sm text-muted-foreground">{project.problem}</p>
          </div>
        )}

        {project.solution && (
          <div>
            <h4 className="hud-label text-neon-cyan mb-2">Solution</h4>
            <p className="text-sm text-muted-foreground">{project.solution}</p>
          </div>
        )}

        {project.features && project.features.length > 0 && (
          <div>
            <h4 className="hud-label text-neon-cyan mb-3">Key features</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feat) => (
                <li
                  key={feat}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 mt-1.5 rotate-45 bg-neon-lime flex-shrink-0"
                  />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>

        {project.lessonsLearned && (
          <div className="relative p-4 clip-corners-sm bg-void-3/40 border border-neon-violet/20">
            <p className="text-sm font-mono text-neon-muted">
              <span aria-hidden="true" className="text-neon-cyan">
                &gt;&gt;&nbsp;
              </span>
              {project.lessonsLearned}
            </p>
          </div>
        )}

        {project.repo && (
          <div className="pt-1">
            <a href={project.repo} target="_blank" rel="noopener noreferrer">
              <motion.button
                type="button"
                className="bg-neon-pink hover:brightness-110 text-void clip-corners-sm px-5 py-2.5 font-heading font-semibold uppercase tracking-wider text-sm inline-flex items-center gap-2 cursor-pointer glow"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <SiGithub className="w-4 h-4" />
                Source code
              </motion.button>
            </a>
          </div>
        )}

        {project.live && (
          <button
            onClick={() => onOpenDemo(project.live as string, project.title)}
            className="ml-3 mt-1 clip-corners-sm px-5 py-2.5 font-heading font-semibold uppercase tracking-wider text-sm inline-flex items-center gap-2 border border-neon-cyan/50 bg-neon-cyan/5 text-neon-cyan hover:bg-neon-cyan hover:text-void transition-colors cursor-pointer"
          >
            <Monitor className="w-4 h-4" />
            Live demo
          </button>
        )}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState<ProjectStatus | "all">("all");
  const [demoUrl, setDemoUrl] = useState<string | null>(null);
  const [demoTitle, setDemoTitle] = useState("");

  const openDemo = (url: string, title: string) => {
    setDemoUrl(url);
    setDemoTitle(title);
  };

  const featured = projects.find((p) => p.slug === "refugeeid");
  const rest = projects.filter((p) => p.slug !== "refugeeid");

  const counts = rest.reduce<Record<string, number>>((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});

  const visible =
    filter === "all" ? rest : rest.filter((p) => p.status === filter);

  return (
    <>
      <SectionWrapper id="projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Projects"
            subtitle="What I've built, what's in progress, and what you can read or run"
          />

          <div ref={ref} className="space-y-16">
            {featured && (
              <FeaturedProject
                project={featured}
                isInView={isInView}
                onOpenDemo={openDemo}
              />
            )}

            <div>
              {/* Tier filters */}
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {FILTERS.map((f) => {
                  const isActive = filter === f.id;
                  const count =
                    f.id === "all" ? rest.length : counts[f.id] || 0;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setFilter(f.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "px-4 py-2 clip-corners-sm font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer",
                        isActive
                          ? "bg-neon-pink text-void glow"
                          : "bg-void-3/50 border border-neon-violet/20 text-neon-muted hover:text-neon-cyan hover:border-neon-cyan/50"
                      )}
                    >
                      {f.label}
                      <span
                        className={cn(
                          "ml-2 opacity-60",
                          isActive ? "text-void" : "text-neon-muted"
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {visible.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visible.map((project, i) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      index={i}
                      isInView={isInView}
                      onOpenDemo={openDemo}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-neon-muted font-mono text-sm py-12">
                  Nothing in this category yet.
                </p>
              )}
            </div>

            {/* Archive — early work, listed plainly */}
            {archivedProjects.length > 0 && (
              <div>
                <Reveal className="text-center mb-8">
                  <h3 className="text-sm font-heading font-bold uppercase tracking-[0.25em] text-neon-violet mb-2">
                    Archive
                  </h3>
                  <p className="text-sm text-neon-muted max-w-xl mx-auto">
                    Earlier coursework and learning artefacts. Listed for
                    completeness rather than presented as finished work.
                  </p>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {archivedProjects.map((item, i) => (
                    <motion.a
                      key={item.title}
                      href={item.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-5 clip-corners-sm bg-void-3/30 border border-neon-violet/20 hover:border-neon-violet/50 transition-all duration-300 block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-mono text-sm text-neon-muted group-hover:text-neon-violet transition-colors">
                          {item.title}
                        </h4>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neon-muted shrink-0 group-hover:text-neon-violet transition-colors" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 font-mono text-[10px] text-neon-muted border border-neon-violet/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            )}
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