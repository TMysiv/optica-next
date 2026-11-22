import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getCategories } from '@/lib/posts';
import { config } from '@/lib/config';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { BlogGrid } from '@/components/Blog/BlogGrid';
import { PostCover, categoryChip, formatPostDate } from '@/components/Blog/PostCover';

const TITLE = 'Блог Укртелеком — корисні статті про GPON інтернет';
const DESCRIPTION =
  'Корисні статті про оптичний інтернет GPON: як вибрати роутер, покращити Wi-Fi, перевірити швидкість і залишатися на звʼязку під час відключень світла.';
const URL = `${config.domain}/blog`;

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/blog', imageAlt: 'Блог Укртелеком' });

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDC00]';

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();
  const [featured, ...rest] = posts;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Головна', item: config.domain },
      { '@type': 'ListItem', position: 2, name: 'Блог', item: URL },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITLE,
    description: DESCRIPTION,
    url: URL,
    publisher: { '@type': 'Organization', name: 'Укртелеком', url: config.domain },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${URL}/${p.slug}`, name: p.title })),
    },
  };

  return (
    <main className="min-h-screen overflow-hidden text-white" style={{ background: '#233955' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <section style={{ background: 'radial-gradient(1100px 480px at 85% 0%, rgba(0,179,220,0.22), transparent 60%), rgba(0,0,0,0.18)' }}>
        <div className="mx-auto max-w-[1170px] px-4 pb-[56px] pt-[130px] md:pb-[72px] md:pt-[140px]">
          <Breadcrumbs items={[{ label: 'Головна', href: '/' }, { label: 'Блог' }]} />
          <span className="inline-block rounded-full border border-[rgba(0,179,220,0.35)] bg-[rgba(0,179,220,0.15)] px-[12px] py-[5px] text-[12px] font-semibold uppercase tracking-[1.5px] text-[#7FE3FF]">
            Блог
          </span>
          <h1 className="mt-[18px] max-w-[760px] text-[38px] font-extrabold leading-[1.06] tracking-[-0.02em] sm:text-[50px] md:text-[60px]">
            Блог про домашній інтернет
          </h1>
          <p className="mt-[18px] max-w-[600px] text-[17px] leading-[1.6] text-white/70 md:text-[18px]">
            Роутери, Wi-Fi, швидкість і звʼязок без світла — пояснюємо простими словами.
          </p>
        </div>
      </section>

      {featured && (
        <section className="mx-auto max-w-[1170px] px-4 pt-[56px] md:pt-[72px]" aria-label="Нова стаття">
          <article
            className="group relative grid grid-cols-1 overflow-hidden rounded-[28px] transition-transform duration-300 hover:-translate-y-[4px] md:grid-cols-[1.1fr_1fr]"
            style={{ background: '#2C4362', boxShadow: '0 0 0 1px rgba(0,179,220,0.3), 0 30px 60px -30px rgba(0,179,220,0.45)' }}
          >
            <div className="aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[340px]">
              <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
                <PostCover slug={featured.slug} category={featured.category} size="lg" />
              </div>
            </div>
            <div className="flex flex-col justify-center p-[24px] md:p-[44px]">
              <div className="mb-[14px] flex flex-wrap items-center gap-[10px] text-[13px] text-white/45">
                <span className="rounded-full bg-[#FFDC00] px-[10px] py-[3px] text-[11px] font-bold uppercase tracking-[1.2px] text-[#233955]">Нове</span>
                <span className={`rounded-full border px-[10px] py-[3px] text-[11px] font-semibold uppercase tracking-[1.2px] ${categoryChip[featured.category] ?? ''}`}>
                  {featured.category}
                </span>
                <span>{featured.readTime}</span>
              </div>
              <h2 className="text-[26px] font-extrabold leading-[1.2] md:text-[32px]">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="text-white no-underline transition-colors group-hover:text-[#00B3DC] after:absolute after:inset-0 after:z-[1] after:content-['']"
                >
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-[14px] text-[16px] leading-[1.6] text-white/65">{featured.description}</p>
              <p className="mt-[18px] text-[14px] text-white/40">{formatPostDate(featured.date)}</p>
            </div>
          </article>
        </section>
      )}

      <section className="mx-auto max-w-[1170px] px-4 pt-[56px] md:pt-[72px]" aria-labelledby="all-posts-title">
        <h2 id="all-posts-title" className="mb-[20px] text-[28px] font-extrabold md:text-[36px]">Усі статті</h2>
        <BlogGrid posts={rest} categories={categories} />
      </section>

      <section className="mx-auto max-w-[1170px] px-4 pb-[80px] pt-[56px] md:pb-[100px] md:pt-[80px]">
        <div className="relative overflow-hidden rounded-[28px] px-[24px] py-[40px] md:px-[56px] md:py-[52px]" style={{ background: 'linear-gradient(120deg, #00B3DC 0%, #0A7FB8 55%, #1B4F86 100%)' }}>
          <div className="pointer-events-none absolute -right-[80px] -top-[80px] h-[280px] w-[280px] rounded-full bg-white/10" aria-hidden="true" />
          <div className="relative flex flex-col gap-[24px] md:flex-row md:items-center md:justify-between">
            <div>
              <p className="m-0 text-[26px] font-extrabold leading-tight md:text-[32px]">Готові до швидкого інтернету?</p>
              <p className="m-0 mt-[8px] text-[16px] text-white/85 md:text-[18px]">
                Оптичний GPON до 1 Гбіт/с від {config.internetPrice} грн/міс. Працює до 96 годин без світла.
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-wrap gap-[12px]">
              <Link
                href="/taryfy"
                className={`rounded-[14px] px-[28px] py-[18px] text-center text-[17px] font-bold text-white no-underline transition-colors duration-200 hover:bg-white/15 ${focusRing}`}
                style={{ border: '1px solid rgba(255,255,255,0.5)' }}
              >
                Тарифи
              </Link>
              <Link
                href="/pidkliuchennia"
                data-connect-modal
                className={`rounded-[14px] bg-[#FFDC00] px-[32px] py-[18px] text-center text-[17px] font-bold text-[#233955] no-underline transition-colors duration-200 hover:bg-white ${focusRing}`}
              >
                Залишити заявку
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
