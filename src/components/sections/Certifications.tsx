"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications, upcomingCertifications } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
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
    <SectionWrapper id="certifications" className="bg-card/30">
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-royal-blue text-white"
                  : "bg-muted/30 text-muted-foreground hover:text-foreground border border-border/50"
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
              className="group p-5 rounded-2xl bg-card/50 border border-border/50 hover:border-royal-blue/30 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -4 }}
              layout
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-royal-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-royal-blue/20 transition-colors">
                  <FileText className="w-5 h-5 text-royal-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-heading font-semibold text-foreground truncate">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {cert.issuer} &middot; {cert.year}
                  </p>
                  <Badge variant="secondary" className="mt-2 text-[10px] px-2 py-0 h-5">
                    {cert.category.replace("-", " ")}
                  </Badge>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No certifications in this category yet.
          </p>
        )}

        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-heading font-bold text-foreground">
              Upcoming Certifications
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
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
                className="group p-5 rounded-2xl bg-card/30 border border-dashed border-border/40 hover:border-royal-blue/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05 + 0.3, duration: 0.4 }}
                whileHover={{ y: -4 }}
                layout
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    <Clock className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-heading font-semibold text-foreground truncate">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                    <Badge variant="secondary" className="mt-2 text-[10px] px-2 py-0 h-5">
                      {cert.category.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-[10px] font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
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
