import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "SUPER_SECRET_KAYCEELAW_KEY_2026"
);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_token")?.value;

  // 1. Allow public access to the login page and auth API
  if (pathname === "/admin/login" || pathname.startsWith("/api/auth")) {
    // If already logged in and trying to access /admin/login, send to /admin dashboard
    if (token && pathname === "/admin/login") {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL("/admin", request.url));
      } catch {
        // Token invalid/expired, let them stay on login
      }
    }
    return NextResponse.next();
  }

  // 2. Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      // Verify JWT signature and expiration
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      // Token is invalid or expired
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
      response.cookies.delete("admin_token");
      return response;
    }
  }

  return NextResponse.next();
}

// Apply proxy only to /admin and /api routes
export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
};