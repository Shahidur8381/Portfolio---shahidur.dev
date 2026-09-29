import { NextResponse } from "next/server";
import fallbackData from "@/src/data/portfolioData.json";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { platform: string } | Promise<{ platform: string }> }
) {
  const resolvedParams = await Promise.resolve(params);
  const rawPlatform = (resolvedParams?.platform || "").toLowerCase().trim();

  // 1. Try to fetch dynamic social links from backend
  try {
    const res = await fetch("https://api.shahidur.dev/api/social-links", {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : data?.socialLinks || data?.links || [];
      const match = list.find((item: any) => {
        const itemPlatform = (item.platform || item.icon || item.label || "").toLowerCase().trim();
        const isActive = item.isActive !== false && item.is_active !== false;
        return isActive && (itemPlatform === rawPlatform || item.platform?.toLowerCase() === rawPlatform);
      });

      if (match?.url && typeof match.url === "string" && match.url.trim().length > 0) {
        const targetUrl = match.url.trim();
        if (targetUrl.startsWith("mailto:")) {
          return new Response(null, {
            status: 307,
            headers: { Location: targetUrl },
          });
        }
        return NextResponse.redirect(targetUrl, 307);
      }
    }
  } catch (error) {
    console.error(`[Contact Redirect] Error resolving platform "${rawPlatform}" from backend:`, error);
  }

  // 2. Fallback to local default data if backend API is unreachable or platform not yet seeded
  const fallbackList = (fallbackData as any)?.socialLinks || [];
  const fallbackMatch = fallbackList.find((item: any) => {
    const itemPlatform = (item.platform || item.icon || item.label || "").toLowerCase().trim();
    return itemPlatform === rawPlatform;
  });

  if (fallbackMatch?.url) {
    const targetUrl = fallbackMatch.url.trim();
    if (targetUrl.startsWith("mailto:")) {
      return new Response(null, {
        status: 307,
        headers: { Location: targetUrl },
      });
    }
    return NextResponse.redirect(targetUrl, 307);
  }

  // 3. If no match at all, redirect to the contact section on the home page
  const url = new URL(request.url);
  return NextResponse.redirect(new URL("/#contact", url), 307);
}
