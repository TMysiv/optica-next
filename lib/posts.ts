import fs from 'fs';
import path from 'path';
import { posts } from '@/content/posts';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';
import { config } from '@/lib/config';

export interface PostMeta {
  slug: string;
  title: string;
  /** Shorter <title> for search results (≤ 60 chars) when the headline is long; defaults to title */
  seoTitle?: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
}

export interface Post extends PostMeta {
  /** Article body as plain HTML (from content/posts/<slug>.html) */
  html: string;
}

const postsDir = path.join(process.cwd(), 'content/posts');

/**
 * Placeholders allowed in article HTML, replaced with values from the config.
 * Example: <strong>{{internetPrice}} грн/міс</strong>
 */
const placeholders: Record<string, string> = {
  internetPrice: config.internetPrice,
  phone: config.phone ?? '',
};

const fillPlaceholders = (html: string) =>
  html.replace(/\{\{(\w+)\}\}/g, (match, key: string) => placeholders[key] ?? match);

/** All posts, newest first */
export function getAllPosts(): PostMeta[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const meta = posts.find((p) => p.slug === slug);
  if (!meta) return null;

  const filePath = path.join(postsDir, `${slug}.html`);
  if (!fs.existsSync(filePath)) return null;

  return { ...meta, html: fillPlaceholders(fs.readFileSync(filePath, 'utf-8')) };
}

export function getCategories(): string[] {
  return Array.from(new Set(posts.map((p) => p.category)));
}

/** Social preview for a post: public/images/og/blog-<slug>.jpg if it exists, else the default banner */
export function getPostOgImage(slug: string): string {
  const file = `/images/og/blog-${slug}.jpg`;
  return fs.existsSync(path.join(process.cwd(), 'public', file)) ? file : DEFAULT_OG_IMAGE;
}
