import { NextRequest } from "next/server";

// In-memory store for tracking requests
const rateLimitStore = new Map();
const RATE_LIMIT_TIME_FRAME = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per 15 minutes

function rateLimit(request: NextRequest): boolean {
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip");

  const now = Date.now();

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, lastRequest: now });
  } else {
    const rateLimitData = rateLimitStore.get(ip);
    if (now - rateLimitData.lastRequest > RATE_LIMIT_TIME_FRAME) {
      // Reset the rate limit for the IP if the time frame has passed
      rateLimitStore.set(ip, { count: 1, lastRequest: now });
    } else {
      // Increment the request count for the IP
      rateLimitData.count++;
      rateLimitData.lastRequest = now;

      if (rateLimitData.count > RATE_LIMIT_MAX_REQUESTS) {
        return false; // Rate limit exceeded
      }
    }
  }

  return true; // Within the rate limit
}

export default rateLimit;
