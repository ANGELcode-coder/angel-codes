import { NextResponse } from "next/server";
import { DEV_TO_USERNAME } from "@/lib/site";
import { blogPosts } from "@/lib/blog/posts";

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  url: string;
  tags: string[];
  source: "dev.to" | "Google Developers" | "local";
  coverImage?: string;
}

/** Written articles that live in this repo, mapped to the API shape. */
const localPosts: BlogPost[] = blogPosts.map((post) => ({
  title: post.title,
  excerpt: post.excerpt,
  date: post.date,
  readTime: post.readTime,
  url: `/blog/${post.slug}`,
  tags: post.tags,
  source: "local",
  coverImage: post.coverImage,
}));

interface DevToArticle {
  title: string;
  description: string;
  published_at: string;
  reading_time_minutes: number;
  url: string;
  tag_list: string[];
  cover_image: string | null;
}

/**
 * Fetches published dev.to articles for the configured handle.
 *
 * The handle previously pointed at `angelngoh`, which does not exist — the real
 * account is `angel_zeengoh_0fc1818af4`. Any failure resolves to an empty list
 * so the section degrades to local posts instead of erroring.
 */
async function fetchDevTo(): Promise<BlogPost[]> {
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${DEV_TO_USERNAME}&per_page=30`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];

    const data = (await res.json()) as DevToArticle[];
    if (!Array.isArray(data)) return [];

    return data.map((article) => ({
      title: article.title,
      excerpt: article.description || "",
      date: new Date(article.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      readTime: `${article.reading_time_minutes} min read`,
      url: article.url,
      tags: article.tag_list || [],
      source: "dev.to" as const,
      coverImage: article.cover_image || undefined,
    }));
  } catch {
    return [];
  }
}

export async function GET() {
  const devToPosts = await fetchDevTo();
  const allPosts = [...devToPosts, ...localPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return NextResponse.json({ posts: allPosts });
}