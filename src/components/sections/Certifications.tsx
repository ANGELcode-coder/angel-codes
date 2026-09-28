"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications, upcomingCertifications } from "@/lib/data";
import { FileText, ExternalLink, Clock } from "lucide-react";

const categories = [
  { id: "all", label: "All" },
  { id: "artificial-intelligence", label: "AI" },
  { id: "software", label: "Software" },
  { id: "cloud", label: "Cloud" },
  { id: "digital-skills", label: "Digital Skills" },
];

export function Certifications() {
  const [activeCategory, setActiveCategory] = useState("all");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered =
    activeCategory === "all"
      ? certifications
      : certifications.filter((c) => c.category === activeCategory);

  return (
    <SectionWrapper id="certifications" className="bg-void-2/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Certifications"
          subtitle="Professional certifications and credentials"
        />

        <div ref={ref} className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 clip-corners-sm font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-neon-pink text-void glow"
                  : "bg-void-3/50 text-neon-muted border border-neon-violet/20 hover:text-neon-cyan hover:border-neon-cyan/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          layout
        >
          {filtered.map((cert, i) => (
            <motion.div
              key={cert.title}
              className="group relative p-5 clip-corners-sm bg-card/70 border border-neon-violet/20 hover:border-neon-pink/50 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -4 }}
              layout
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-pink to-transparent opacity-40 group-hover:opacity-100 transition-opacity"
              />
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 clip-corners-sm bg-neon-pink/10 border border-neon-pink/25 flex items-center justify-center flex-shrink-0 group-hover:bg-neon-pink/20 group-hover:shadow-[0_0_16px_-2px_rgba(255,45,120,0.8)] transition-all">
                  <FileText className="w-5 h-5 text-neon-pink" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-heading font-semibold text-foreground truncate">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-neon-muted mt-0.5">
                    {cert.issuer} &middot; {cert.year}
                  </p>
                  <span className="inline-block mt-2 px-2 py-0.5 hud-label text-neon-violet border border-neon-violet/25">
                    {cert.category.replace("-", " ")}
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-neon-muted opacity-0 group-hover:opacity-100 group-hover:text-neon-pink transition-all" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-neon-muted py-12 font-mono text-sm">
            No certifications in this category yet.
          </p>
        )}

        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-sm font-heading font-bold uppercase tracking-[0.25em] text-neon-amber mb-2">
              Upcoming Certifications
            </h3>
            <p className="text-sm text-neon-muted">
              Currently preparing for these certifications
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            layout
          >
            {upcomingCertifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                className="group relative p-5 clip-corners-sm bg-void-3/30 border border-dashed border-neon-amber/25 hover:border-neon-amber/60 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05 + 0.3, duration: 0.4 }}
                whileHover={{ y: -4 }}
                layout
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 clip-corners-sm bg-neon-amber/10 border border-neon-amber/25 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-neon-amber" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-heading font-semibold text-foreground truncate">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-mono text-neon-muted mt-0.5">{cert.issuer}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 hud-label text-neon-violet border border-neon-violet/25">
                      {cert.category.replace("-", " ")}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="inline-block px-2 py-0.5 hud-label text-neon-amber bg-neon-amber/10">
                    In Progress
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
