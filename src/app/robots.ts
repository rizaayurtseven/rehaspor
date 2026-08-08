import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.APP_ORIGIN || "https://rehaspor.com.tr";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/v1/admin/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
