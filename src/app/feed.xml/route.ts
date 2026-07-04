import { NextResponse } from "next/server";

interface FeedPost {
  title: string;
  excerpt: string;
  date: string;
  url: string;
  source: string;
}

export async function GET() {
  let posts: FeedPost[] = [];
  try {
    const res = await fetch("http://localhost:3000/api/blog", {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      posts = (data.posts || []).map((p: Record<string, unknown>) => ({
        title: String(p.title || ""),
        excerpt: String(p.excerpt || ""),
        date: String(p.date || ""),
        url: String(p.url || ""),
        source: String(p.source || ""),
      }));
    }
  } catch {}

  const siteUrl = "https://angelcodes.vercel.app";

  const itemsXml = posts
    .map(
      (p) => `    <entry>
      <title>${p.title.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</title>
      <link href="${p.url.replace(/&/g, "&amp;")}"/>
      <updated>${new Date(p.date).toISOString()}</updated>
      <summary type="html">${p.excerpt.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</summary>
      <category term="${p.source}" />
    </entry>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Angel Codes Blog</title>
  <link href="${siteUrl}/feed.xml" rel="self"/>
  <link href="${siteUrl}"/>
  <updated>${new Date().toISOString()}</updated>
  <id>${siteUrl}/</id>
  <author>
    <name>Angel Zee Ngoh</name>
  </author>
${itemsXml}
</feed>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
