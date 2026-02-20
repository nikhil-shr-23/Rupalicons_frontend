
import { NextResponse } from "next/server";

interface InstagramMedia {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  like_count?: number;
  comments_count?: number;
}

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token || token.startsWith("IGQVJV...")) { // Check for missing or placeholder token
    return NextResponse.json(
      { error: "Instagram Access Token not configured" },
      { status: 500 }
    );
  }

  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,like_count,comments_count&access_token=${token}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    
    if (!response.ok) {
        const errorData = await response.json();
        console.error("Instagram API Error:", errorData);
        return NextResponse.json({ error: "Failed to fetch from Instagram" }, { status: response.status });
    }

    const data = await response.json();
    
    const posts = data.data
        .filter((item: InstagramMedia) => item.media_type === "VIDEO" || item.media_type === "CAROUSEL_ALBUM") // Include albums as they might contain videos or be relevant
        .slice(0, 10) // Limit to top 10
        .map((item: InstagramMedia) => ({
            id: item.id,
            image: item.thumbnail_url || item.media_url, // thumbnail_url is for videos
            permalink: item.permalink,
            caption: item.caption,
            likes: item.like_count || 0, // like_count might not be available depending on permission scope, falling back
            comments: item.comments_count || 0,
            media_type: item.media_type
        }));

    return NextResponse.json({ data: posts });
  } catch (error) {
    console.error("Instagram Fetch Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
