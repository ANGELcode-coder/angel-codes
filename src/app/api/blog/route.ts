import { NextResponse } from "next/server";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  url: string;
  tags: string[];
  source: "dev.to" | "Google Developers" | "local";
  coverImage?: string;
}

const localPosts: BlogPost[] = [
  {
    title: "Building Scalable REST APIs with Spring Boot",
    excerpt: "A comprehensive guide to building production-ready REST APIs using Spring Boot, JPA, and PostgreSQL with best practices for error handling, validation, and security.",
    date: "Mar 15, 2026",
    readTime: "8 min read",
    url: "/blog/building-scalable-apis-with-spring-boot",
    tags: ["Java", "Spring Boot", "REST"],
    source: "local",
  },
  {
    title: "Next.js App Router: A Deep Dive",
    excerpt: "Explore the Next.js App Router pattern — server components, layouts, data fetching, and how to build modern full-stack applications with React Server Components.",
    date: "Feb 20, 2026",
    readTime: "6 min read",
    url: "/blog/nextjs-app-router-deep-dive",
    tags: ["Next.js", "React", "TypeScript"],
    source: "local",
  },
  {
    title: "Cross-Platform Mobile Development with React Native",
    excerpt: "Learn how to build production-ready mobile apps for iOS and Android using React Native, Expo, and TypeScript with shared business logic and platform-specific UIs.",
    date: "Jan 10, 2026",
    readTime: "10 min read",
    tags: ["React Native", "Expo", "Mobile"],
    url: "/blog/react-native-cross-platform-development",
    source: "local",
  },
];

interface DevToArticle {
  title: string;
  description: string;
  published_at: string;
  reading_time_minutes: number;
  url: string;
  tags: string[];
  cover_image: string | null;
}

interface GoogleBlogEntry {
  title?: { $t?: string };
  content?: { $t?: string };
  published?: { $t?: string };
  updated?: { $t?: string };
  category?: { term: string }[];
  link?: { rel: string; href: string }[];
}

interface GoogleBlogFeed {
  feed?: {
    entry?: GoogleBlogEntry[];
  };
}

async function fetchDevTo(): Promise<BlogPost[]> {
  try {
    const res = await fetch("https://dev.to/api/articles?username=angelngoh&per_page=10", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data: DevToArticle[] = await res.json();
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
      tags: article.tags || [],
      source: "dev.to" as const,
      coverImage: article.cover_image || undefined,
    }));
  } catch {
    return [];
  }
}

async function fetchGoogleDevBlog(): Promise<BlogPost[]> {
  try {
    const res = await fetch("https://developers.googleblog.com/feeds/posts/default?alt=json&max-results=10", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data: GoogleBlogFeed = await res.json();
    const entries = data.feed?.entry || [];
    return entries.map((entry) => {
      const content = entry.content?.$t || "";
      const excerpt = content.replace(/<[^>]*>/g, "").slice(0, 200) + "...";
      const tags = (entry.category || []).map((c) => c.term);
      const pubDate = entry.published?.$t || entry.updated?.$t;
      return {
        title: entry.title?.$t || "",
        excerpt,
        date: pubDate
          ? new Date(pubDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "",
        readTime: "5 min read",
        url: entry.link?.find((l) => l.rel === "alternate")?.href || "",
        tags: tags.length > 0 ? tags : ["Google", "Developers"],
        source: "Google Developers" as const,
        coverImage: undefined,
      };
    });
  } catch {
    return [];
  }
}

export async function GET() {
  const [devToPosts, googlePosts] = await Promise.all([
    fetchDevTo(),
    fetchGoogleDevBlog(),
  ]);

  const allPosts = [...devToPosts, ...googlePosts, ...localPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return NextResponse.json({ posts: allPosts });
}
