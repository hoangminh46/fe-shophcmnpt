import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = [
  "/profile",
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("accessToken")?.value || "";
  const refreshToken = request.cookies.get("refreshToken")?.value || "";

  const isProtectedRoute = protectedRoutes.some(route => 
    path === route || path.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !token && !refreshToken) {
    const authUrl = new URL("/auth", request.url);
    authUrl.searchParams.set("sessionExpired", "true");
    return NextResponse.redirect(authUrl);
  }
}

export const config = {
  matcher: [
    "/profile/:path*",
  ]
};
