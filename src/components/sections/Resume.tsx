"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateResume } from "@/lib/generateResume";

export function Resume() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleDownload = () => {
    const doc = generateResume();
    doc.save("Angel_Zee_Ngoh_Resume.pdf");
  };

  return (
    <SectionWrapper id="resume">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Resume"
          subtitle="Download my resume or view online"
        />

        <div ref={ref} className="max-w-3xl mx-auto">
          <motion.div
            className="clip-corners bg-card/70 border border-neon-violet/25 backdrop-blur-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[1/1.4] bg-gradient-to-br from-neon-pink/10 via-neon-violet/10 to-neon-cyan/10 grid-flat flex items-center justify-center border-b border-neon-violet/20">
              <div className="text-center">
                <FileText className="w-16 h-16 text-neon-pink/50 mx-auto mb-4" />
                <h3 className="text-xl font-heading font-bold uppercase tracking-wide text-gradient">
                  Angel Zee Ngoh — Resume
                </h3>
                <p className="text-sm font-mono text-neon-muted mt-2">
                  Software Engineer & Full-Stack Developer
                </p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="hud-label text-neon-cyan mb-3">
                    Experience
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "Software Developer — Digimark Consulting",
                      "Engineering Intern — NFC Bank SA",
                      "Freelance Software Developer",
                    ].map((item) => (
                      <li key={item} className="text-sm text-foreground flex items-start gap-2">
                        <span aria-hidden="true" className="text-neon-lime font-mono mt-0.5">&gt;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="hud-label text-neon-cyan mb-3">
                    Education
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "B.Sc. Software Engineering — YIBS, 2025–2026",
                      "HND Computer Software Engineering — YIBS, 2023–2025",
                      "24+ Microsoft & industry certifications",
                    ].map((item) => (
                      <li key={item} className="text-sm text-foreground flex items-start gap-2">
                        <span aria-hidden="true" className="text-neon-lime font-mono mt-0.5">&gt;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="hud-label text-neon-cyan mb-3">
                  Core Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "TypeScript", "JavaScript", "Python", "Java", "Kotlin", "SQL",
                    "React", "Next.js", "Vite", "Tailwind CSS",
                    "Node.js", "Express", "NestJS", "REST APIs",
                    "PostgreSQL", "MySQL", "Supabase", "Docker",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 clip-corners-sm font-mono text-xs text-neon-muted bg-void-3/60 border border-neon-violet/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleDownload}
                  className="flex-1 gap-2 h-11"
                >
                  <Download className="w-4 h-4" />
                  Download Resume (PDF)
                </Button>
                <Button
                  variant="neon"
                  className="flex-1 gap-2 h-11"
                  onClick={() => {
                    const doc = generateResume();
                    const blob = doc.output("bloburl");
                    window.open(blob, "_blank");
                  }}
                >
                  <FileText className="w-4 h-4" />
                  View Online
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
