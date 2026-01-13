import { NextResponse, type NextRequest } from "next/server";

const AUTH_COOKIE_NAME = "hr_auth";

function isPublicPath(pathname: string) {
  // App routes
  if (pathname === "/login") return true;

  // API routes
  if (pathname.startsWith("/api")) return true;

  // Next.js internals & static assets
  if (pathname.startsWith("/_next")) return true;
  if (pathname === "/favicon.ico") return true;
  if (pathname === "/robots.txt") return true;
  if (pathname === "/sitemap.xml") return true;

  // Anything that looks like a file (e.g. /honorrolehero.mp4, /logo.svg)
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) return true;

  return false;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublicPath(pathname)) return NextResponse.next();

  const authed = req.cookies.get(AUTH_COOKIE_NAME)?.value === "1";
  if (authed) return NextResponse.next();

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("returnTo", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/:path*"],
};

