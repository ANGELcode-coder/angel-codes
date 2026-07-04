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

export function GitHubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/ANGELcode-coder/repos?sort=updated&per_page=8")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(
            data.map((repo: Record<string, unknown>) => ({
              name: String(repo.name || ""),
              description: String(repo.description || "No description"),
              stars: Number(repo.stargazers_count || 0),
              forks: Number(repo.forks_count || 0),
              lang: String(repo.language || "N/A"),
              url: String(repo.html_url || ""),
            }))
          );
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <SectionWrapper id="github">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="GitHub"
          subtitle="Open source contributions and projects"
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
              {repos.slice(0, 8).map((repo, i) => (
                <motion.a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-card/50 border border-border/50 hover:border-royal-blue/30 transition-all duration-300 group block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <SiGithub className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm font-mono font-medium text-foreground truncate">
                      {repo.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {repo.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {repo.lang !== "N/A" && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-royal-blue" />
                        {repo.lang}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" />
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
              <Button variant="outline" className="rounded-full gap-2">
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
