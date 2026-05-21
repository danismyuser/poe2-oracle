// Next.js 16 proxy (replaces middleware). Runs in the Edge Runtime — no Node.js modules allowed.
// Uses jose for JWT verification (Edge-compatible); Prisma/bcrypt stay in API routes only.
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? "");

async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("auth-token")?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = pathname.startsWith("/dashboard");
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (isProtected && !(await isAuthenticated(req))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthPage && (await isAuthenticated(req))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
