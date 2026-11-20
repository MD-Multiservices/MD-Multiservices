import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/mentions-legales"].map(path => ({ url: new URL(path, "https://www.mdmultiservices83.fr").href }));
}
