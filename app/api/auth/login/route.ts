import { NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "hr_auth";

const VALID_EMAIL = "hi@honorrole.com";
const VALID_PASSWORD = "HRpw123!";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== "object" ||
    !("email" in body) ||
    !("password" in body) ||
    typeof (body as any).email !== "string" ||
    typeof (body as any).password !== "string"
  ) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const email = ((body as any).email as string).trim();
  const password = (body as any).password as string;

  if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
    return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: "1",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}

