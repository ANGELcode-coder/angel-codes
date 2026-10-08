import { NextResponse } from "next/server";
import { SITE_URL, SITE_NAME, AUTHOR_NAME } from "@/lib/site";
import { blogPosts } from "@/lib/blog/posts";

/**
 * Atom feed for the portfolio's own written articles.
 *
 * Previously this fetched its own `/api/blog` route over `http://localhost:3000`,
 * which never resolves in production — so the feed was always empty. Importing
 * the posts directly removes the network hop and the failure mode.
 */
export async function GET() {
  const escapeXml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const itemsXml = blogPosts
    .map(
      (post) => `  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${SITE_URL}/blog/${post.slug}"/>
    <id>${SITE_URL}/blog/${post.slug}</id>
    <published>${new Date(post.date).toISOString()}</published>
    <updated>${new Date(post.date).toISOString()}</updated>
    <summary type="html">${escapeXml(post.excerpt)}</summary>
    ${post.tags.map((tag) => `<category term="${escapeXml(tag)}"/>`).join("\n    ")}
  </entry>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE_NAME)} Blog</title>
  <subtitle>Articles on software engineering, fintech and open source by ${escapeXml(AUTHOR_NAME)}</subtitle>
  <link href="${SITE_URL}/feed.xml" rel="self"/>
  <link href="${SITE_URL}"/>
  <updated>${new Date().toISOString()}</updated>
  <id>${SITE_URL}/</id>
  <author>
    <name>${escapeXml(AUTHOR_NAME)}</name>
  </author>
${itemsXml}
</feed>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}