import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jhansi-dev.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/debug', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
