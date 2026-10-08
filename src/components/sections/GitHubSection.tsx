"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Star, GitFork, Loader2 } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Button } from "@/components/ui/button";

interface Repo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  lang: string;
  url: string;
}

/**
 * Repositories intentionally left off this section.
 *
 * The API response is not curated — it returns whatever is public and recently
 * touched — so anything hidden from the portfolio has to be filtered out here or
 * it reappears regardless of the project data.
 */
const EXCLUDED_REPOS = new Set(["ANGELcode-coder", "yibs-crown-vote"]);

export function GitHubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch(
      "https://api.github.com/users/ANGELcode-coder/repos?sort=updated&per_page=100",
      { signal: controller.signal }
    )
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) return;

        setRepos(
          data
            .filter(
              (repo: Record<string, unknown>) =>
                !repo.fork && !EXCLUDED_REPOS.has(String(repo.name || ""))
            )
            .map((repo: Record<string, unknown>) => ({
              name: String(repo.name || ""),
              description: String(repo.description || "No description"),
              stars: Number(repo.stargazers_count || 0),
              forks: Number(repo.forks_count || 0),
              lang: String(repo.language || "N/A"),
              url: String(repo.html_url || ""),
            }))
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <SectionWrapper id="github">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="GitHub"
          subtitle="Public repositories you can read, run or contribute to"
        />

        <div ref={ref} className="space-y-8">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : repos.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">
              No repositories found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {repos.slice(0, 12).map((repo, i) => (
                <motion.a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-5 clip-corners-sm bg-card/70 border border-neon-violet/20 hover:border-neon-pink/50 hover:shadow-[0_0_26px_-6px_rgba(255,45,120,0.5)] transition-all duration-300 group block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="flex items-center gap-2 mb-3">
                    <SiGithub className="w-4 h-4 text-neon-pink flex-shrink-0" />
                    <span className="text-sm font-mono text-foreground group-hover:text-neon-pink transition-colors truncate">
                      {repo.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {repo.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs font-mono text-neon-muted">
                    {repo.lang !== "N/A" && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-neon-lime" />
                        {repo.lang}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-neon-amber" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3 text-neon-cyan" />
                      {repo.forks}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <a
              href="https://github.com/ANGELcode-coder"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="neon" className="gap-2 h-11">
                <SiGithub className="w-4 h-4" />
                View All Repositories
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
