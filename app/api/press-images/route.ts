import { NextResponse } from "next/server";

type PressImageRequest = {
  urls?: unknown;
};

function normalizeImageUrl(raw: string, baseUrl: string) {
  try {
    return new URL(raw, baseUrl).toString();
  } catch {
    return null;
  }
}

function extractMetaImage(html: string, baseUrl: string) {
  const ogImageMatch =
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i);

  if (ogImageMatch?.[1]) {
    return normalizeImageUrl(ogImageMatch[1], baseUrl);
  }

  const twitterImageMatch =
    html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["'][^>]*>/i);

  if (twitterImageMatch?.[1]) {
    return normalizeImageUrl(twitterImageMatch[1], baseUrl);
  }

  return null;
}

export async function POST(req: Request) {
  let body: PressImageRequest | null = null;
  try {
    body = (await req.json()) as PressImageRequest;
  } catch {
    return NextResponse.json({ images: {} }, { status: 400 });
  }

  const urls = Array.isArray(body?.urls) ? body?.urls : [];
  if (!urls.every((url) => typeof url === "string")) {
    return NextResponse.json({ images: {} }, { status: 400 });
  }

  const images: Record<string, string> = {};

  await Promise.all(
    urls.map(async (url) => {
      try {
        const res = await fetch(url, {
          headers: {
            "User-Agent": "HonorRolePressBot/1.0",
            Accept: "text/html",
          },
          cache: "no-store",
        });

        if (!res.ok) return;
        const html = await res.text();
        const imageUrl = extractMetaImage(html, url);
        if (imageUrl) {
          images[url] = imageUrl;
        }
      } catch {
        // Ignore single failures
      }
    })
  );

  return NextResponse.json({ images });
}
