import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { markdownToHtml } from '@/lib/mdx';

interface Props {
  params: Promise<{ slug: string }>;
}

// Генеруємо всі сторінки статично при білді
export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Динамічні meta-теги для кожної статті
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const SITE_URL = process.env.NEXT_PUBLIC_SITE ?? 'https://yourdomain.com';

  return {
    title: `${post.title} | Укртелеком`,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  'Технології': 'bg-[rgba(0,179,220,0.15)] text-[#00B3DC] border-[rgba(0,179,220,0.3)]',
  'Практично': 'bg-[rgba(255,220,0,0.1)] text-[#FFDC00] border-[rgba(255,220,0,0.3)]',
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const SITE_URL = process.env.NEXT_PUBLIC_SITE ?? 'https://yourdomain.com';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Укртелеком' },
    publisher: {
      '@type': 'Organization',
      name: 'Укртелеком',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.svg` },
    },
  };

  const htmlContent = markdownToHtml(post.content);
  const allPosts = getAllPosts().filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <main className="min-h-screen" style={{ background: '#233955' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="max-w-[800px] mx-auto px-4 pt-[60px] pb-[80px]">

        {/* Назад */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-[14px] no-underline transition-colors mb-[40px]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Всі статті
        </Link>

        {/* Мета */}
        <div className="flex items-center gap-[12px] flex-wrap mb-[24px]">
          <span className={`text-[11px] font-semibold uppercase tracking-[1.5px] px-[10px] py-[4px] rounded-full border ${CATEGORY_COLORS[post.category] ?? 'bg-white/10 text-white/60 border-white/20'}`}>
            {post.category}
          </span>
          <span className="text-white/35 text-[13px]">
            {new Date(post.date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <span className="text-white/35 text-[13px] flex items-center gap-[6px]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {post.readTime}
          </span>
        </div>

        {/* Заголовок */}
        <h1 className="text-white text-[32px] md:text-[44px] font-bold leading-[1.2] mb-[32px]">
          {post.title}
        </h1>

        {/* Контент статті */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* CTA блок */}
        <div
          className="mt-[60px] rounded-[20px] p-[32px] text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,179,220,0.1) 0%, rgba(0,179,220,0.04) 100%)',
            border: '1px solid rgba(0,179,220,0.25)',
          }}
        >
          <p className="text-white text-[18px] font-semibold mb-[8px]">
            Готові підключити надійний GPON інтернет?
          </p>
          <p className="text-white/50 text-[14px] mb-[24px]">
            Тарифи від 99 грн/міс. Енергонезалежність до 96 годин.
          </p>
          <Link
            href="/#form-section"
            className="inline-block no-underline px-[40px] py-[16px] rounded-[12px] font-medium not-italic leading-[0.97] bg-[#00B3DC] text-white text-[20px] hover:bg-[#FFDC00] hover:text-black transition-all duration-200"
          >
            Залишити заявку
          </Link>
        </div>

        {/* Інші статті */}
        {allPosts.length > 0 && (
          <div className="mt-[60px]">
            <h2 className="text-white text-[22px] font-bold mb-[24px]">Читайте також</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              {allPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="no-underline group">
                  <div
                    className="rounded-[16px] p-[20px] transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <span className="text-white/40 text-[12px] block mb-[8px]">{p.category}</span>
                    <p className="text-white/80 text-[15px] font-medium leading-snug m-0 group-hover:text-[#00B3DC] transition-colors">
                      {p.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
