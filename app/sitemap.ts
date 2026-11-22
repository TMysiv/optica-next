import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { config } from '@/lib/config';
import { promos } from '@/lib/promos';
import { tariffs } from '@/lib/tariffs';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `${config.domain}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const promoUrls = promos.map((promo) => ({
    url: `${config.domain}/aktsii/${promo.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const tariffUrls = tariffs.map((tariff) => ({
    url: `${config.domain}/taryfy/${tariff.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: config.domain,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${config.domain}/aktsii`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${config.domain}/internet-bez-svitla`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${config.domain}/pidkliuchennia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${config.domain}/taryfy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${config.domain}/abonentam`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${config.domain}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...tariffUrls,
    ...promoUrls,
    ...postUrls,
  ];
}
