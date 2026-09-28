"use client";

import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";

const sectionIds = [
  "home", "about", "skills", "experience", "projects",
  "certifications", "github", "blog", "resume", "contact",
];

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "j" || e.key === "J") {
        const current = sectionIds.findIndex((id) => {
          const el = document.getElementById(id);
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top >= 0 && rect.top < window.innerHeight / 2;
        });
        const next = Math.min(current + 1, sectionIds.length - 1);
        document.getElementById(sectionIds[next])?.scrollIntoView({ behavior: "smooth" });
      }

      if (e.key === "k" || e.key === "K") {
        const current = sectionIds.findIndex((id) => {
          const el = document.getElementById(id);
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top >= 0 && rect.top < window.innerHeight / 2;
        });
        const prev = Math.max(current - 1, 0);
        document.getElementById(sectionIds[prev])?.scrollIntoView({ behavior: "smooth" });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      enableColorScheme
      disableTransitionOnChange
    >
      <TooltipProvider delay={200}>
        {children}
      </TooltipProvider>
    </ThemeProvider>
  );
}
