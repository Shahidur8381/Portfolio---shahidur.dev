import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const res = await fetch("https://api.shahidur.dev/api/personal", {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      const resumeUrl = data?.resumeUrl || data?.resume;
      if (resumeUrl && typeof resumeUrl === "string" && resumeUrl.trim().length > 0) {
        return NextResponse.redirect(resumeUrl.trim(), 307);
      }
    }
  } catch (error) {
    console.error("[Resume Redirect] Failed to fetch resume from backend:", error);
  }

  // Fallback to dynamic contact route if resume is not yet uploaded
  const url = new URL(request.url);
  return NextResponse.redirect(new URL("/contact/linkedin", url), 307);
}
