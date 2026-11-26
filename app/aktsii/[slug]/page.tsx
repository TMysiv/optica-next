import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { config } from '@/lib/config';
import { pageMetadata, ogFromIllustration, siteOrgSchema, ukrtelecomSchema, withBrand } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { promos, getPromoBySlug, formatPromoDate } from '@/lib/promos';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return promos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const promo = getPromoBySlug(slug);
  if (!promo) return {};

  return pageMetadata({
    title: withBrand(`${promo.title} — ${promo.price} грн/міс`),
    description: `${promo.description ?? promo.title}. Умови акції, ціна та підключення онлайн від Укртелеком.`,
    path: `/aktsii/${promo.slug}`,
    image: ogFromIllustration(promo.image),
    imageAlt: promo.imageAlt,
  });
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDC00]';

export default async function PromoPage({ params }: Props) {
  const { slug } = await params;
  const promo = getPromoBySlug(slug);
  if (!promo) notFound();

  const url = `${config.domain}/aktsii/${promo.slug}`;
  const until = promo.validUntil ? formatPromoDate(promo.validUntil) : null;
  const otherPromos = promos.filter((p) => p.slug !== promo.slug);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Головна', item: config.domain },
      { '@type': 'ListItem', position: 2, name: 'Акції', item: `${config.domain}/aktsii` },
      { '@type': 'ListItem', position: 3, name: promo.title, item: url },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: promo.schemaName ?? promo.title,
    ...(promo.description ? { description: promo.description } : {}),
    image: `${config.domain}${ogFromIllustration(promo.image)}`,
    provider: ukrtelecomSchema,
    broker: siteOrgSchema,
    offers: {
      '@type': 'Offer',
      price: String(promo.price),
      priceCurrency: 'UAH',
      url,
      ...(promo.validUntil ? { priceValidUntil: promo.validUntil } : {}),
    },
  };

  return (
    <main className="min-h-screen text-white" style={{ background: '#233955' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="mx-auto max-w-[1170px] px-4 pb-[72px] pt-[130px] md:pb-[96px] md:pt-[140px]">
        <Breadcrumbs items={[{ label: 'Головна', href: '/' }, { label: 'Акції', href: '/aktsii' }, { label: promo.title }]} />

        <div className="grid grid-cols-1 gap-[32px] md:grid-cols-[1.1fr_1fr] md:items-center md:gap-[56px]">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[24px]" style={{ boxShadow: '0 0 0 1px rgba(0,179,220,0.25)' }}>
            <Image
              src={promo.image}
              alt={promo.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 620px, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            {(promo.badge || until) && (
              <div className="mb-[14px] flex flex-wrap items-center gap-[10px] text-[14px]">
                {promo.badge && (
                  <span className="rounded-full bg-[#FFDC00] px-[12px] py-[4px] font-semibold text-[#233955]">{promo.badge}</span>
                )}
                {until && <span className="text-white/60">Діє до {until}</span>}
              </div>
            )}
            <h1 className="text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[48px]">
              {promo.title}{' '}
              <span className="mt-[10px] block text-[18px] font-bold tracking-normal text-[#7FE3FF] md:text-[22px]">— акція від Укртелеком</span>
            </h1>
            {promo.description && (
              <p className="mt-[16px] text-[17px] leading-[1.6] text-white/70 md:text-[19px]">{promo.description}</p>
            )}
            <p className="mt-[24px] flex items-baseline gap-[10px]">
              <span className="text-[72px] font-extrabold leading-none tracking-[-0.04em] md:text-[88px]">{promo.price}</span>
              <span className="text-[18px] font-semibold text-white/80">{promo.unit ?? 'грн/міс.'}</span>
            </p>
            <Link
              href="/pidkliuchennia"
                data-connect-modal
              className={`mt-[24px] inline-block rounded-[14px] bg-[#FFDC00] px-[40px] py-[18px] text-center text-[17px] font-bold text-[#233955] no-underline transition-colors duration-200 hover:bg-[#00B3DC] hover:text-white ${focusRing}`}
            >
              Підключити
            </Link>
          </div>
        </div>

        {promo.content && promo.content.length > 0 && (
          <section className="mt-[56px] max-w-[800px]">
            <h2 className="mb-[16px] text-[26px] font-bold md:text-[32px]">Про акцію</h2>
            {promo.content.map((paragraph, i) => (
              <p key={i} className="mb-[14px] text-[17px] leading-[1.7] text-white/75">{paragraph}</p>
            ))}
          </section>
        )}

        <section className="mt-[48px] rounded-[24px] p-[24px] md:p-[40px]" style={{ background: '#2C4362', boxShadow: '0 0 0 1px rgba(0,179,220,0.25)' }}>
          <h2 className="mb-[8px] text-[24px] font-bold md:text-[28px]">Умови акції</h2>
          <dl className="m-0">
            {promo.conditions.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-1 gap-[6px] border-t border-white/10 py-[18px] first:border-t-0 md:grid-cols-[260px_1fr] md:gap-[40px]"
              >
                <dt className="text-[15px] font-semibold">{item.title}</dt>
                <dd className="m-0 max-w-[640px] text-[15px] leading-[1.7] text-white/65">{item.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        {otherPromos.length > 0 && (
          <section className="mt-[56px]">
            <h2 className="mb-[20px] text-[24px] font-bold md:text-[28px]">Інші акції</h2>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
              {otherPromos.map((p) => (
                <Link
                  key={p.slug}
                  href={`/aktsii/${p.slug}`}
                  className={`group flex items-center gap-[16px] overflow-hidden rounded-[20px] p-[12px] text-white no-underline transition-colors hover:bg-white/5 ${focusRing}`}
                  style={{ background: '#2C4362', boxShadow: '0 0 0 1px rgba(0,179,220,0.2)' }}
                >
                  <div className="relative aspect-[16/9] w-[140px] flex-shrink-0 overflow-hidden rounded-[12px]">
                    <Image src={p.image} alt={p.imageAlt} fill sizes="140px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[17px] font-bold leading-[1.25] group-hover:text-[#00B3DC] transition-colors">{p.title}</p>
                    <p className="mt-[4px] text-[14px] text-white/60">від {p.price} {p.unit ?? 'грн/міс.'}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
