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
    <footer className="border-t border-border/50 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-heading font-bold text-gradient mb-3">
              Angel Codes
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {personalInfo.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="text-sm text-muted-foreground hover:text-royal-blue transition-colors text-left"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-3">
              {[
                { label: "GitHub", href: personalInfo.social.github },
                { label: "LinkedIn", href: personalInfo.social.linkedin },
                { label: "Dev.to", href: personalInfo.social.devto },
                { label: "Email", href: personalInfo.social.email },
              ].map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-royal-blue transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="mt-10 pt-6 border-t border-border/50 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {personalInfo.name}. Built with Next.js, TypeScript & Tailwind CSS.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
