import { DEV_TO_USERNAME } from "./site";

/**
 * Fetches the user's published articles from the dev.to public API.
 *
 * Returns an empty list rather than throwing when the handle has no posts or
 * the network is unavailable, so the blog section degrades gracefully instead
 * of breaking the page.
 */
export async function fetchDevToArticles(): Promise<
  Array<{ title: string; description: string; url: string; published_at: string; reading_time_minutes: number; tag_list: string[] }>
> {
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${DEV_TO_USERNAME}&per_page=30`,
      {
        headers: { Accept: "application/vnd.forem.api-v1+json" },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}