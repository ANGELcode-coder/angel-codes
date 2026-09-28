import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/blog/posts";
import { ShareButtons } from "@/components/blog/ShareButtons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Angel Zee Ngoh`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const siteUrl = "https://angelcodes.vercel.app";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-background">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" /> Back to blog
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 font-mono text-[10px] text-neon-pink bg-neon-pink/10 border border-neon-pink/25"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
          <ShareButtons url={postUrl} title={post.title} />
        </header>

        <div className="border-t border-border/50 pt-8">
          <div className="prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-code:text-neon-pink prose-pre:bg-card prose-pre:border prose-pre:border-border/50 prose-a:text-neon-pink max-w-none">
            {post.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-xl font-heading font-bold text-foreground mt-8 mb-4">
                    {line.slice(3)}
                  </h2>
                );
              }
              if (line.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-lg font-heading font-semibold text-foreground mt-6 mb-3">
                    {line.slice(4)}
                  </h3>
                );
              }
              if (line.startsWith("```")) {
                return null;
              }
              if (line.startsWith("`")) {
                return (
                  <code key={i} className="text-sm bg-muted/30 px-1.5 py-0.5 rounded">
                    {line.replace(/`/g, "")}
                  </code>
                );
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={i} className="text-muted-foreground ml-4">
                    {line.slice(2)}
                  </li>
                );
              }
              if (line.trim() === "") {
                return <br key={i} />;
              }
              return (
                <p key={i} className="text-muted-foreground mb-4 leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8">
          <ShareButtons url={postUrl} title={post.title} />
        </div>
      </article>
    </div>
  );
}
