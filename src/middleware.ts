import { withAuth } from "next-auth/middleware";

import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { toast } from "./components/ui/Toast";

const REQUEST_LIMIT_PER_HOUR = 10;

const redis = new Redis({
  url: process.env.REDIS_URL as string,
  token: process.env.REDIS_SECRET as string,
});

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(
    REQUEST_LIMIT_PER_HOUR,
    "1 h" // interval of 1 hour
  ),
});

export default withAuth(
  async function middleware(req) {
    // add Rate Limit for api routes
    const path = req.nextUrl.pathname; // relative path
    if (path.startsWith("/api")) {
      const ip = req.ip ?? "127.0.0.1";

      try {
        const { success, limit, remaining } = await rateLimit.limit(ip);

        console.log(success, limit, remaining);
        if (success === false)
          NextResponse.json({
            error: `Rate limit exceeded! Rate limit is ${REQUEST_LIMIT_PER_HOUR} per hour.`,
          });
      } catch (error) {
        NextResponse.json({
          error: "Internal Server Error",
        });
      }
    }

    // manage route protection
    const token = await getToken({ req });

    const isAuthenticated = token !== null;
    const isAuthPage = path.startsWith("/login");

    const sensitiveRoutes = ["/dashboard"];

    if (isAuthPage) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return null;
    }

    if (
      !isAuthenticated &&
      sensitiveRoutes.some((route) => path.startsWith(route))
    ) {
      toast({
        title: "Unauthenticated",
        message: "Please Sign in first.",
        type: "error",
      });
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/api/:path*"],
};
