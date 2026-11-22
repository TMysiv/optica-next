import type { Metadata } from 'next';
import { config } from '@/lib/config';

export const SITE_NAME = 'Укртелеком';
/** Default social preview image (raster: social networks don't render SVG previews) */
export const DEFAULT_OG_IMAGE = '/images/desktop-banner.webp';

interface PageMetaInput {
  /** Full <title>, ideally ≤ 60 characters */
  title: string;
  /** Meta description, ideally 120–155 characters */
  description: string;
  /** Path of the page, e.g. "/taryfy" */
  path: string;
  /** Raster image for social previews (PNG/JPG/WebP, 1200×630) */
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  noindex?: boolean;
}

/** Complete, consistent metadata for a page: canonical, Open Graph and Twitter */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = 'website',
  publishedTime,
  noindex,
}: PageMetaInput): Metadata {
  const url = path === '/' ? config.domain : `${config.domain}${path}`;
  const images = [{ url: image, width: 1200, height: 630, alt: imageAlt ?? title }];

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale: 'uk_UA',
      title,
      description,
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

/** Append the brand to a title only while it stays within ~60 characters */
export function withBrand(title: string, max = 60): string {
  if (title.includes(SITE_NAME)) return title;
  const branded = `${title} | ${SITE_NAME}`;
  return branded.length <= max ? branded : title;
}

/** Raster social preview for an illustration: /images/promos/tv.svg → /images/og/tv.jpg */
export function ogFromIllustration(svgPath: string): string {
  const name = svgPath.split('/').pop()?.replace(/\.svg$/, '');
  return name ? `/images/og/${name}.jpg` : DEFAULT_OG_IMAGE;
}
