import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.PROD_URL!,
      lastModified: new Date(),
    },
    {
      url: `${process.env.PROD_URL!}projects`,
      lastModified: new Date(),
    },
  ]
}
