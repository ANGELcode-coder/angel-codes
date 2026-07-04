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
            className="rounded-2xl bg-card/50 border border-border/50 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[1/1.4] bg-gradient-to-br from-royal-blue/10 via-indigo/10 to-cyan/10 flex items-center justify-center border-b border-border/50">
              <div className="text-center">
                <FileText className="w-16 h-16 text-royal-blue/40 mx-auto mb-4" />
                <h3 className="text-xl font-heading font-bold text-gradient">
                  Angel Zee Ngoh - Resume
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Software Engineer & Full-Stack Developer
                </p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Experience
                  </h4>
                  <ul className="space-y-2">
                    {["Software Developer - Digimark Consulting", "Engineer Intern - NFC Bank", "Software Engineering Student - YIBS"].map(
                      (item) => (
                        <li key={item} className="text-sm text-foreground flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-royal-blue" />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Education
                  </h4>
                  <ul className="space-y-2">
                    {["Software Engineering - YIBS", "AI Certifications - Microsoft", "Prompt Engineering - Google AI"].map(
                      (item) => (
                        <li key={item} className="text-sm text-foreground flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-royal-blue" />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React", "Next.js", "React Native", "TypeScript", "Java",
                    "Python", "Tailwind CSS", "Docker", "Git", "PostgreSQL",
                    "MySQL", "Prompt Engineering", "Google Gemini", "Vertex AI",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-muted/30 text-muted-foreground border border-border/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleDownload}
                  className="flex-1 rounded-full gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Resume (PDF)
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-full gap-2"
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
