import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url, title } = await request.json();

    if (!url || !title) {
      return NextResponse.json(
        { error: "Missing url or title" },
        { status: 400 }
      );
    }

    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const userId = process.env.LINKEDIN_USER_ID;

    if (!accessToken || !userId) {
      return NextResponse.json(
        {
          error: "LinkedIn not configured. Falls back to share dialog.",
          fallbackUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        },
        { status: 501 }
      );
    }

    const body = {
      author: `urn:li:person:${userId}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: `Check out my latest article: ${title}\n\n${url}`,
          },
          shareMediaCategory: "ARTICLE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };

    const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("LinkedIn API error:", errText);
      return NextResponse.json(
        {
          error: "LinkedIn API error",
          fallbackUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("LinkedIn share error:", error);
    return NextResponse.json(
      {
        error: "Failed to share on LinkedIn",
        fallbackUrl: "",
      },
      { status: 500 }
    );
  }
}
