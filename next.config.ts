import type { NextConfig } from "next";

// Helper to extract host/port from CORS_ALLOWED_ORIGIN for Server Action CSRF check
const getActionAllowedOrigins = (): string[] => {
  const envOrigins =
    process.env.CORS_ALLOWED_ORIGIN ||
    process.env.CORS_ALLOWED_ORIGINS ||
    "";

  const parsed = envOrigins
    .split(",")
    .map((o) => o.trim().replace(/^https?:\/\//, "").replace(/\/+$/, ""))
    .filter((h) => h && h !== "*");

  return Array.from(
    new Set([
      ...parsed,
      "localhost:8095",
      "localhost:3000",
      "bestdealsasiagroup.com",
      "*.bestdealsasiagroup.com",
    ])
  );
};

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: getActionAllowedOrigins(),
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
