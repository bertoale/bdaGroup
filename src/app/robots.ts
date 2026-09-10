import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.SITE_URL || "https://bestdealsasiagroup.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/login", "/api/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
