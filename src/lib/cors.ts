import { NextRequest } from "next/server";

/**
 * Helper to generate dynamic CORS headers based on CORS_ALLOWED_ORIGIN env
 */
export function getCorsHeaders(req?: NextRequest, allowedMethods: string = "GET, POST, OPTIONS") {
  const envOrigins = process.env.CORS_ALLOWED_ORIGIN || "*";
  const requestOrigin = req ? req.headers.get("origin") : null;

  let allowOrigin = "*";

  if (envOrigins !== "*") {
    const originsList = envOrigins.split(",").map((o) => o.trim());

    if (requestOrigin && originsList.includes(requestOrigin)) {
      allowOrigin = requestOrigin;
    } else if (originsList.includes("*")) {
      allowOrigin = "*";
    } else {
      allowOrigin = originsList[0] || "*";
    }
  }

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": allowedMethods,
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
  };
}
