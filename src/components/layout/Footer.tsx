"use client";

import { motion } from "framer-motion";
import { personalInfo, navLinks } from "@/lib/data";

export function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-neon-violet/25 bg-void-2/60">
      {/* Neon top edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-heading font-bold uppercase tracking-widest text-gradient mb-4">
              Angel Codes
            </h3>
            <p className="text-neon-muted text-sm leading-relaxed max-w-xs">
              {personalInfo.tagline}
            </p>
          </div>

          <div>
            <h4 className="hud-label text-neon-cyan mb-5">Navigation</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="group text-left font-mono text-xs uppercase tracking-widest text-neon-muted transition-colors hover:text-neon-pink"
                >
                  <span aria-hidden="true" className="text-neon-pink/50 group-hover:text-neon-pink">
                    &gt;
                  </span>{" "}
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="hud-label text-neon-cyan mb-5">Connect</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {[
                { label: "GitHub", href: personalInfo.social.github },
                { label: "LinkedIn", href: personalInfo.social.linkedin },
                { label: "Dev.to", href: personalInfo.social.devto },
                { label: "Email", href: personalInfo.social.email, internal: true },
              ].map(({ label, href, internal }) => (
                <motion.a
                  key={label}
                  href={href}
                  {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="font-mono text-xs uppercase tracking-widest text-neon-muted hover:text-neon-cyan transition-colors"
                  whileHover={{ x: 2 }}
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="mt-12 pt-6 border-t border-neon-violet/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs text-neon-muted">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className="hud-label text-neon-violet/70">
            Built with Next.js &middot; TypeScript &middot; Tailwind
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
