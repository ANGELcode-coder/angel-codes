"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    navLinks.forEach(({ href }) => {
      const el = document.getElementById(href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-void/85 backdrop-blur-xl border-b border-neon-violet/20 shadow-[0_1px_0_0_rgba(255,45,120,0.25),0_8px_30px_-12px_rgba(0,245,255,0.35)]"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.button
              onClick={() => scrollTo("#home")}
              className="flex items-center gap-2 font-heading font-bold uppercase tracking-widest text-gradient cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span aria-hidden="true" className="text-neon-pink font-mono text-sm">
                {"//"}
              </span>
              Angel Codes
            </motion.button>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className={cn(
                    "relative px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200",
                    activeSection === href.replace("#", "")
                      ? "text-neon-pink [text-shadow:0_0_10px_rgba(255,45,120,0.8)]"
                      : "text-neon-muted hover:text-neon-cyan"
                  )}
                >
                  {label}
                  {activeSection === href.replace("#", "") && (
                    <motion.div
                      className="absolute -bottom-px left-2 right-2 h-[2px] bg-gradient-to-r from-neon-pink to-neon-cyan shadow-[0_0_10px_rgba(255,45,120,0.9)]"
                      layoutId="navIndicator"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-neon-muted hover:text-neon-pink"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-void/97 backdrop-blur-lg pt-20 md:hidden grid-flat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center gap-2 p-4">
              {navLinks.map(({ label, href }, i) => (
                <motion.button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="w-full clip-corners-sm border border-neon-violet/20 bg-void-2/60 px-5 py-3 font-heading text-base font-semibold uppercase tracking-widest text-neon-muted transition-colors hover:border-neon-pink/60 hover:text-neon-pink"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
