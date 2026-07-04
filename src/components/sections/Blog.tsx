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
    <SectionWrapper id="blog" className="bg-card/30">
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
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                filter === s
                  ? "bg-royal-blue text-white"
                  : "bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground"
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
                className="group p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-royal-blue/30 transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                    post.source === "dev.to"
                      ? "bg-royal-blue/10 text-royal-blue"
                      : post.source === "Google Developers"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-purple-500/10 text-purple-500"
                      }`}
                    >
                      {post.source}
                    </span>
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-muted/30 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-heading font-semibold text-foreground group-hover:text-royal-blue transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-royal-blue transition-colors" />
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
            <Button variant="outline" className="rounded-full gap-2">
              View All Articles
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
