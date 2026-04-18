import { NextResponse } from "next/server";
import { auth } from "@/auth";

const roleHome = {
  ADMIN: "/dashboard/admin",
  REALTOR: "/dashboard/realtor",
  BUYER: "/dashboard/buyer",
} as const;

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user;

  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      const url = new URL("/login", req.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    const role = user.role;
    const home = roleHome[role];

    if (pathname === "/dashboard") {
      return NextResponse.redirect(new URL(home, req.url));
    }
    if (pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL(home, req.url));
    }
    if (pathname.startsWith("/dashboard/realtor") && role !== "REALTOR" && role !== "ADMIN") {
      return NextResponse.redirect(new URL(home, req.url));
    }
    if (pathname.startsWith("/dashboard/buyer") && role !== "BUYER" && role !== "ADMIN") {
      return NextResponse.redirect(new URL(home, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
