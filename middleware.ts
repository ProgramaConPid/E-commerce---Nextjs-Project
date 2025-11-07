import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const publicPaths = ["/pages/login", "/pages/register"];

  if (token && publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/pages/home", req.url));
  }

  const protectedPaths = [
    "/pages/home",
    "/pages/about",
    "/pages/blog",
    "/pages/contact",
  ];

  if (!token && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/pages/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/pages/:path*", 
  ],
};
