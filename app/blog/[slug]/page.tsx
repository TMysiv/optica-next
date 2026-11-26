import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPostBySlug, getPostOgImage } from '@/lib/posts';
import { pageMetadata, siteOrgSchema, withBrand } from '@/lib/seo';
import { config } from '@/lib/config';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { PostCard } from '@/components/Blog/PostCard';
import { ArticleBody } from '@/components/Blog/ArticleBody';
import { ArticleCta } from '@/components/Blog/ArticleCta';
import { PostCover, categoryChip, formatPostDate } from '@/components/Blog/PostCover';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return pageMetadata({
    title: withBrand(post.seoTitle ?? post.title),
    description: post.description,
    path: `/blog/${slug}`,
    image: getPostOgImage(slug),
    imageAlt: post.title,
    type: 'article',
    publishedTime: post.date,
  });
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDC00]';

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${config.domain}/blog/${slug}`;
  const others = getAllPosts().filter((p) => p.slug !== slug);
  // Prefer posts from the same category for "Читайте також"
  // Split after the first section so the call-to-action sits inside the text
  const secondSection = post.html.indexOf('<h2', post.html.indexOf('<h2') + 1);
  const [intro, rest] = secondSection > 0 ? [post.html.slice(0, secondSection), post.html.slice(secondSection)] : [post.html, ''];
  const related = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: { '@type': 'ImageObject', url: `${config.domain}${getPostOgImage(slug)}`, width: 1200, height: 630 },
    inLanguage: 'uk',
    author: siteOrgSchema,
    publisher: siteOrgSchema,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Головна', item: config.domain },
      { '@type': 'ListItem', position: 2, name: 'Блог', item: `${config.domain}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  return (
    <main className="min-h-screen overflow-hidden text-white" style={{ background: '#233955' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Header */}
      <section style={{ background: 'radial-gradient(1100px 480px at 85% 0%, rgba(0,179,220,0.22), transparent 60%), rgba(0,0,0,0.18)' }}>
        <div className="mx-auto max-w-[1170px] px-4 pb-[48px] pt-[130px] md:pb-[64px] md:pt-[140px]">
          <Breadcrumbs items={[{ label: 'Головна', href: '/' }, { label: 'Блог', href: '/blog' }, { label: post.title }]} />

          <div className="grid grid-cols-1 items-center gap-[32px] lg:grid-cols-[1.3fr_1fr] lg:gap-[56px]">
            <div>
              <div className="mb-[18px] flex flex-wrap items-center gap-[12px] text-[14px] text-white/50">
                <span className={`rounded-full border px-[10px] py-[3px] text-[11px] font-semibold uppercase tracking-[1.2px] ${categoryChip[post.category] ?? 'border-white/20 bg-white/10 text-white/70'}`}>
                  {post.category}
                </span>
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readTime} читання</span>
              </div>
              <h1 className="text-[32px] font-extrabold leading-[1.12] tracking-[-0.02em] md:text-[46px]">{post.title}</h1>
              <p className="mt-[16px] max-w-[640px] text-[17px] leading-[1.6] text-white/70 md:text-[18px]">{post.description}</p>
            </div>
            <div className="hidden aspect-[16/10] overflow-hidden rounded-[24px] lg:block" style={{ boxShadow: '0 0 0 1px rgba(0,179,220,0.3), 0 40px 80px -30px rgba(0,0,0,0.7)' }}>
              <PostCover slug={post.slug} category={post.category} size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Body + sidebar */}
      <div className="mx-auto grid max-w-[1170px] grid-cols-1 gap-[40px] px-4 pt-[48px] md:pt-[64px] lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-[56px]">
        <article className="blog-content min-w-0 max-w-[760px]">
          <ArticleBody html={intro} />
          {rest && <ArticleCta />}
          {rest && <ArticleBody html={rest} />}
        </article>

        <aside className="lg:pt-[6px]">
          <div className="sticky top-[125px] flex flex-col gap-[16px]">
            <div className="rounded-[24px] p-[24px]" style={{ background: 'linear-gradient(160deg, #2E4A70 0%, #263F60 100%)', boxShadow: '0 0 0 1px rgba(255,220,0,0.45)' }}>
              <p className="m-0 text-[12px] font-semibold uppercase tracking-[1.5px] text-[#7FE3FF]">GPON від Укртелеком</p>
              <p className="m-0 mt-[8px] text-[22px] font-extrabold leading-[1.2]">Інтернет до 1 Гбіт/с, що працює без світла</p>
              <p className="m-0 mt-[12px] flex items-baseline gap-[6px]">
                <span className="text-[15px] text-white/60">від</span>
                <span className="text-[44px] font-extrabold leading-none text-[#FFDC00]">{config.internetPrice}</span>
                <span className="text-[15px] font-semibold text-white/80">грн/міс</span>
              </p>
              <Link
                href="/pidkliuchennia"
                data-connect-modal
                className={`mt-[18px] block rounded-[14px] bg-[#FFDC00] py-[15px] text-center text-[16px] font-bold text-[#233955] no-underline transition-colors duration-200 hover:bg-[#00B3DC] hover:text-white ${focusRing}`}
              >
                Залишити заявку
              </Link>
              <Link href="/taryfy" className="mt-[10px] block text-center text-[14px] text-white/70 underline underline-offset-4 hover:text-white">
                Переглянути тарифи
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1170px] px-4 pt-[64px] md:pt-[88px]" aria-labelledby="related-title">
          <div className="mb-[24px] flex flex-wrap items-end justify-between gap-[12px]">
            <h2 id="related-title" className="text-[28px] font-extrabold md:text-[36px]">Читайте також</h2>
            <Link href="/blog" className="text-[15px] font-medium text-[#7FE3FF] no-underline hover:text-white">Усі статті →</Link>
          </div>
          <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <div className="pb-[80px] md:pb-[100px]" />
    </main>
  );
}
