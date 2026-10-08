"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Webhook,
  Smartphone,
  FlaskConical,
  PenTool,
  Wallet,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, type Service } from "@/lib/data.community";
import { cn } from "@/lib/utils";

const ICONS: Record<Service["icon"], React.ElementType> = {
  code: Code2,
  api: Webhook,
  database: Wallet,
  mobile: Smartphone,
  test: FlaskConical,
  write: PenTool,
  design: PenTool,
};

const ACCENT = [
  "text-neon-pink",
  "text-neon-cyan",
  "text-neon-lime",
  "text-neon-violet",
  "text-neon-amber",
  "text-neon-pink",
  "text-neon-cyan",
  "text-neon-violet",
];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="services" className="bg-void-2/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Services"
          subtitle="What I can take on, end to end"
        />

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service, i) => {
            const Icon = ICONS[service.icon];
            const accent = ACCENT[i % ACCENT.length];

            return (
              <motion.article
                key={service.id}
                className="group relative p-6 clip-corners-sm bg-card/70 border border-neon-violet/20 backdrop-blur-sm hover:border-neon-pink/50 hover:shadow-[0_0_28px_-6px_rgba(255,45,120,0.5)] transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />

                <div
                  className={cn(
                    "w-10 h-10 clip-corners-sm flex items-center justify-center mb-4 border border-neon-violet/25 bg-void-3/60 transition-colors group-hover:border-current",
                    accent
                  )}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>

                <h3 className="text-base font-heading font-bold uppercase tracking-wide text-foreground mb-2">
                  {service.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {service.summary}
                </p>

                <ul className="space-y-1.5 pt-3 border-t border-neon-violet/15">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="text-xs font-mono text-neon-muted flex items-start gap-2"
                    >
                      <span
                        aria-hidden="true"
                        className="text-neon-lime mt-0.5 shrink-0"
                      >
                        &gt;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}