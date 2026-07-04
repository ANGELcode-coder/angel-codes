import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog | Angel Zee Ngoh",
  description: "Articles on software engineering, full-stack development, and mobile development.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
        >
          ← Back to home
        </Link>

        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          Blog
        </h1>
        <p className="text-muted-foreground mb-12">
          Thoughts, tutorials, and deep dives on software engineering.
        </p>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-royal-blue/30 transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-royal-blue/10 text-royal-blue"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-heading font-semibold text-foreground group-hover:text-royal-blue transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
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
                  <span className="text-sm text-royal-blue flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
