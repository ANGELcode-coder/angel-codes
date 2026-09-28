"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExternalLink, Calendar, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  url: string;
  tags: string[];
  source: "dev.to" | "Google Developers";
  coverImage?: string;
}

export function Blog() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "dev.to" | "Google Developers" | "local">("all");

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "all" ? posts : posts.filter((p) => p.source === filter);
  const sources = ["all", "dev.to", "Google Developers", "local"] as const;

  return (
    <SectionWrapper id="blog" className="bg-void-2/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Blog"
          subtitle="Articles and tutorials on software engineering"
        />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {sources.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 clip-corners-sm font-mono text-xs uppercase tracking-widest transition-all cursor-pointer ${
                filter === s
                  ? "bg-neon-pink text-void glow"
                  : "bg-void-3/50 border border-neon-violet/20 text-neon-muted hover:text-neon-cyan hover:border-neon-cyan/50"
              }`}
            >
              {s === "all" ? "All Sources" : s}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No articles found.</p>
        ) : (
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.a
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 clip-corners-sm bg-card/70 border border-neon-violet/20 hover:border-neon-pink/50 hover:shadow-[0_0_28px_-6px_rgba(255,45,120,0.5)] transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span
                      className="px-2 py-0.5 hud-label text-neon-pink bg-neon-pink/10 border border-neon-pink/25"
                    >
                      {post.source}
                    </span>
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 font-mono text-[10px] text-neon-muted bg-void-3/60 border border-neon-violet/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-heading font-semibold text-foreground group-hover:text-neon-pink transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-neon-violet/15">
                  <div className="flex items-center gap-3 text-xs font-mono text-neon-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neon-muted group-hover:text-neon-pink transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>
        )}

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <a
            href="https://dev.to/angelngoh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="neon" className="gap-2 h-11">
              View All Articles
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
