import fs from 'fs';
import path from 'path';

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

const postsDir = path.join(process.cwd(), 'content/posts');

function parseFrontmatter(raw: string): { meta: Record<string, string>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta: Record<string, string> = {};
  match[1].split('\n').forEach((line) => {
    const [key, ...rest] = line.split(':');
    if (key) meta[key.trim()] = rest.join(':').trim().replace(/^"|"$/g, '');
  });

  return { meta, content: match[2].trim() };
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'));

  return files
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const { meta } = parseFrontmatter(raw);
      return {
        slug,
        title: meta.title || '',
        description: meta.description || '',
        date: meta.date || '',
        category: meta.category || '',
        readTime: meta.readTime || '5 хв',
      };
    })
    .sort((a, b) => {
      const aIsCity = a.category === 'Підключення' ? 1 : 0;
      const bIsCity = b.category === 'Підключення' ? 1 : 0;
      if (aIsCity !== bIsCity) return aIsCity - bIsCity;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { meta, content } = parseFrontmatter(raw);

  return {
    slug,
    title: meta.title || '',
    description: meta.description || '',
    date: meta.date || '',
    category: meta.category || '',
    readTime: meta.readTime || '5 хв',
    content,
  };
}
