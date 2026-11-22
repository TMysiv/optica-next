import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { config } from '@/lib/config';
import { pageMetadata, ogFromIllustration } from '@/lib/seo';
import { tariffs, getTariffBySlug, tariffService } from '@/lib/tariffs';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { ConnectTariffButton } from '@/components/TariffPlanCard/ConnectTariffButton';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return tariffs.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tariff = getTariffBySlug(slug);
  if (!tariff) return {};

  return pageMetadata({
    title: `Тариф «${tariff.name}» — ${tariff.priceFrom ? 'від ' : ''}${tariff.price} грн/міс | Укртелеком`,
    description: tariff.summary,
    path: `/taryfy/${tariff.slug}`,
    image: ogFromIllustration(tariff.cover),
    imageAlt: tariff.coverAlt,
  });
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDC00]';

export default async function TariffPage({ params }: Props) {
  const { slug } = await params;
  const tariff = getTariffBySlug(slug);
  if (!tariff) notFound();

  const url = `${config.domain}/taryfy/${tariff.slug}`;
  const otherTariffs = tariffs.filter((t) => t.slug !== tariff.slug);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Головна', item: config.domain },
      { '@type': 'ListItem', position: 2, name: 'Тарифи', item: `${config.domain}/taryfy` },
      { '@type': 'ListItem', position: 3, name: tariff.name, item: url },
    ],
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Тариф ${tariff.name} — Укртелеком`,
    description: tariff.summary,
    image: `${config.domain}${ogFromIllustration(tariff.cover)}`,
    brand: { '@type': 'Brand', name: 'Укртелеком' },
    offers: {
      '@type': 'Offer',
      price: tariff.price,
      priceCurrency: 'UAH',
      availability: 'https://schema.org/InStock',
      url,
    },
  };

  return (
    <main className="min-h-screen overflow-hidden text-white" style={{ background: '#233955' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <section style={{ background: 'radial-gradient(1100px 480px at 85% 0%, rgba(0,179,220,0.22), transparent 60%), rgba(0,0,0,0.18)' }}>
        <div className="mx-auto max-w-[1170px] px-4 pb-[56px] pt-[130px] md:pb-[80px] md:pt-[140px]">
          <Breadcrumbs items={[{ label: 'Головна', href: '/' }, { label: 'Тарифи', href: '/taryfy' }, { label: tariff.name }]} />

          <div className="grid grid-cols-1 items-center gap-[36px] lg:grid-cols-[1.05fr_1fr] lg:gap-[56px]">
            <div className="relative order-1 aspect-[16/9] overflow-hidden rounded-[24px] lg:order-2" style={{ boxShadow: '0 0 0 1px rgba(0,179,220,0.35), 0 40px 80px -30px rgba(0,0,0,0.7)' }}>
              <Image src={tariff.cover} alt={tariff.coverAlt} fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
              {tariff.badge && (
                <span className="absolute right-[16px] top-[16px] rounded-full bg-[#FFDC00] px-[12px] py-[5px] text-[13px] font-bold text-[#233955]">
                  {tariff.badge}
                </span>
              )}
            </div>

            <div className="order-2 lg:order-1">
              <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-[#7FE3FF]">{tariff.kind}</p>
              <h1 className="mt-[10px] text-[40px] font-extrabold leading-[1.05] tracking-[-0.02em] md:text-[58px]">
                Тариф «{tariff.name}»
              </h1>
              <p className="mt-[16px] max-w-[540px] text-[17px] leading-[1.6] text-white/70 md:text-[18px]">{tariff.summary}</p>

              <div className="mt-[28px] flex flex-wrap items-end gap-x-[28px] gap-y-[20px]">
                <p className="m-0 flex items-baseline gap-[8px]">
                  {tariff.priceFrom && <span className="text-[18px] font-medium text-white/60">від</span>}
                  <span className="bg-gradient-to-r from-[#FFDC00] to-[#FCD246] bg-clip-text text-[72px] font-extrabold leading-none tracking-[-0.03em] text-transparent md:text-[84px]">
                    {tariff.price}
                  </span>
                  <span className="text-[18px] font-semibold text-white/80">грн/міс</span>
                </p>
                <ConnectTariffButton
                  service={tariffService(tariff.name)}
                  className={`cursor-pointer rounded-[14px] bg-[#FFDC00] px-[44px] py-[18px] text-[17px] font-bold uppercase text-[#233955] transition-colors duration-200 hover:bg-[#00B3DC] hover:text-white ${focusRing}`}
                />
              </div>
              {tariff.extraPrice && (
                <p className="mt-[12px] text-[14px] text-white/55">Ціна відома на 2 роки · з 13-го місяця — {tariff.extraPrice} грн/міс</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1170px] px-4 pt-[56px] md:pt-[80px]" aria-labelledby="included-title">
        <h2 id="included-title" className="mb-[24px] text-[28px] font-extrabold md:text-[36px]">Що входить у тариф «{tariff.name}»</h2>
        <ul className="m-0 grid list-none grid-cols-1 gap-[16px] p-0 sm:grid-cols-2 lg:grid-cols-4">
          {tariff.description.map((item) => (
            <li
              key={item}
              className="flex flex-col gap-[14px] rounded-[20px] p-[22px]"
              style={{ background: '#2C4362', boxShadow: '0 0 0 1px rgba(0,179,220,0.22)' }}
            >
              <svg aria-hidden="true" className="h-[32px] w-[32px]" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#00B3DC" fillOpacity="0.18" />
                <path d="M9.5 16.4l4.3 4.3L22.5 12" stroke="#7FE3FF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[16px] font-medium leading-[1.45] text-white/90">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-[1170px] px-4 pt-[56px] md:pt-[80px]" aria-labelledby="terms-title">
        <h2 id="terms-title" className="mb-[24px] text-[28px] font-extrabold md:text-[36px]">Умови тарифу «{tariff.name}»</h2>
        <div className="rounded-[24px] px-[20px] py-[8px] md:px-[40px]" style={{ background: '#2C4362', boxShadow: '0 0 0 1px rgba(0,179,220,0.25)' }}>
          <dl className="m-0">
            {tariff.keyTerms.map((term) => (
              <div
                key={term.title}
                className="grid grid-cols-1 gap-[6px] border-t border-white/10 py-[18px] first:border-t-0 md:grid-cols-[240px_1fr] md:gap-[40px]"
              >
                <dt className="text-[15px] font-semibold text-white">{term.title}</dt>
                <dd className="m-0 text-[15px] leading-[1.65] text-white/70">{term.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <details className="group mt-[16px] rounded-[20px]" style={{ background: 'rgba(255,255,255,0.03)', boxShadow: '0 0 0 1px rgba(255,255,255,0.08)' }}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-[16px] px-[20px] py-[16px] text-[15px] font-semibold text-white/80 hover:text-white md:px-[40px] [&::-webkit-details-marker]:hidden">
            Повні умови тарифу
            <svg aria-hidden="true" className="h-[20px] w-[20px] flex-shrink-0 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 20 20" fill="none">
              <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <div className="border-t border-white/10 px-[4px] py-[24px] text-white/80 md:px-[20px]">
            {tariff.modalElement}
          </div>
        </details>
      </section>

      {otherTariffs.length > 0 && (
        <section className="mx-auto max-w-[1170px] px-4 pt-[56px] md:pt-[80px]" aria-labelledby="other-title">
          <div className="mb-[24px] flex flex-wrap items-end justify-between gap-[12px]">
            <h2 id="other-title" className="text-[28px] font-extrabold md:text-[36px]">Інші тарифи</h2>
            <Link href="/taryfy" className="text-[15px] font-medium text-[#7FE3FF] no-underline hover:text-white">Порівняти всі тарифи →</Link>
          </div>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
            {otherTariffs.map((t) => (
              <Link
                key={t.slug}
                href={`/taryfy/${t.slug}`}
                className={`group flex items-center gap-[18px] overflow-hidden rounded-[20px] p-[12px] text-white no-underline transition-colors hover:bg-white/5 ${focusRing}`}
                style={{ background: '#2C4362', boxShadow: '0 0 0 1px rgba(0,179,220,0.22)' }}
              >
                <div className="relative aspect-[16/9] w-[150px] flex-shrink-0 overflow-hidden rounded-[12px]">
                  <Image src={t.cover} alt={t.coverAlt} fill sizes="150px" className="object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <div>
                  <p className="m-0 text-[12px] font-semibold uppercase tracking-[1.2px] text-[#7FE3FF]">{t.kind}</p>
                  <p className="m-0 mt-[4px] text-[19px] font-bold leading-[1.2] transition-colors group-hover:text-[#00B3DC]">{t.name}</p>
                  <p className="m-0 mt-[4px] text-[15px] font-semibold text-[#FFDC00]">{t.priceFrom ? 'від ' : ''}{t.price} грн/міс</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1170px] px-4 pb-[80px] pt-[56px] md:pb-[100px] md:pt-[80px]">
        <div className="relative overflow-hidden rounded-[28px] px-[24px] py-[40px] md:px-[56px] md:py-[52px]" style={{ background: 'linear-gradient(120deg, #00B3DC 0%, #0A7FB8 55%, #1B4F86 100%)' }}>
          <div className="pointer-events-none absolute -right-[80px] -top-[80px] h-[280px] w-[280px] rounded-full bg-white/10" aria-hidden="true" />
          <div className="relative flex flex-col gap-[24px] md:flex-row md:items-center md:justify-between">
            <div>
              <p className="m-0 text-[26px] font-extrabold leading-tight md:text-[32px]">Підключіть «{tariff.name}»</p>
              <p className="m-0 mt-[8px] text-[16px] text-white/85 md:text-[18px]">
                Залиште заявку або зателефонуйте <a href={`tel:+38${config.phone}`} className="font-bold text-white underline-offset-4 hover:underline">{config.phone}</a>
              </p>
            </div>
            <ConnectTariffButton
              service={tariffService(tariff.name)}
              className={`flex-shrink-0 cursor-pointer rounded-[14px] bg-[#FFDC00] px-[40px] py-[18px] text-[17px] font-bold uppercase text-[#233955] transition-colors duration-200 hover:bg-white ${focusRing}`}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
