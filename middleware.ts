import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Apply only to API routes; pages/UI unaffected
export const config = {
  matcher: ["/api/(.*)"],
};


