import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { config } from '@/lib/config';
import { pageMetadata } from '@/lib/seo';
import { promos, formatPromoDate } from '@/lib/promos';

const hasPromos = promos.length > 0;
const minPrice = hasPromos ? Math.min(...promos.map((p) => p.price)) : null;

const TITLE = minPrice
  ? `Акції на інтернет від Укртелеком — від ${minPrice} грн/міс`
  : 'Акції на інтернет від Укртелеком';
const DESCRIPTION = minPrice
  ? `Акційні пропозиції на інтернет від Укртелеком — від ${minPrice} грн/міс. Перевірте умови акцій та залиште заявку на підключення онлайн.`
  : 'Акційні пропозиції на інтернет від Укртелеком. Залиште заявку на підключення онлайн.';

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/aktsii' });

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Головна', item: config.domain },
    { '@type': 'ListItem', position: 2, name: 'Акції', item: `${config.domain}/aktsii` },
  ],
};

const offersSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Акції на інтернет від Укртелеком',
  itemListElement: promos.map((promo, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${config.domain}/aktsii/${promo.slug}`,
    name: promo.schemaName ?? promo.title,
  })),
};

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDC00]';

export default function AktsiiPage() {
  return (
    <main className="min-h-screen text-white" style={{ background: '#233955' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {hasPromos && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offersSchema) }} />
      )}

      <section style={{ background: 'rgba(0,0,0,0.18)' }}>
        <div className="mx-auto max-w-[1170px] px-4 pb-[120px] pt-[130px] md:pb-[140px] md:pt-[140px]">
          <h1 className="text-[38px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[50px] md:text-[60px]">
            Акції на інтернет від Укртелеком
          </h1>
          <p className="mt-[20px] text-[17px] leading-[1.6] text-white/65 md:text-[19px]">
            Оберіть акцію, перевірте умови й залиште заявку онлайн.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-[72px] max-w-[1170px] px-4 pb-[72px] md:-mt-[84px] md:pb-[96px]">
        <h2 className="sr-only">Діючі акції</h2>

        {hasPromos ? (
          <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2">
            {promos.map((promo) => {
              const until = promo.validUntil ? formatPromoDate(promo.validUntil) : null;
              const href = `/aktsii/${promo.slug}`;
              return (
                <article
                  key={promo.slug}
                  className="group relative flex flex-col overflow-hidden rounded-[24px] transition-transform duration-300 hover:-translate-y-[4px]"
                  style={{ background: '#2C4362', boxShadow: '0 0 0 1px rgba(0,179,220,0.25)' }}
                >
                  <div className="relative block aspect-[16/9] overflow-hidden">
                    <Image
                      src={promo.image}
                      alt={promo.imageAlt}
                      fill
                      sizes="(min-width: 768px) 585px, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    {promo.badge && (
                      <span className="absolute left-[16px] top-[16px] rounded-full bg-[#FFDC00] px-[12px] py-[4px] text-[14px] font-semibold text-[#233955]">
                        {promo.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-[24px] md:p-[32px]">
                    {until && <p className="mb-[10px] text-[14px] text-white/60">Діє до {until}</p>}
                    <h3 className="text-[24px] font-extrabold leading-[1.15] tracking-[-0.01em] md:text-[28px]">
                      {/* Stretched link: its ::after covers the whole card, so the entire card opens the promo page */}
                      <Link
                        href={href}
                        className="text-white no-underline transition-colors group-hover:text-[#00B3DC] after:absolute after:inset-0 after:z-[1] after:content-['']"
                      >
                        {promo.title}
                      </Link>
                    </h3>
                    {promo.description && (
                      <p className="mt-[10px] text-[16px] leading-[1.6] text-white/70">{promo.description}</p>
                    )}

                    <p className="mt-auto flex items-baseline gap-[8px] pt-[24px]">
                      <span className="text-[56px] font-extrabold leading-none tracking-[-0.04em]">{promo.price}</span>
                      <span className="text-[16px] font-semibold text-white/80">{promo.unit ?? 'грн/міс.'}</span>
                    </p>

                    <div className="mt-[20px] grid grid-cols-2 gap-[12px]">
                      <Link
                        href={href}
                        className={`rounded-[14px] px-[16px] py-[16px] text-center text-[16px] font-bold text-white no-underline transition-colors duration-200 hover:bg-white/10 ${focusRing}`}
                        style={{ border: '1px solid rgba(255,255,255,0.25)' }}
                      >
                        Про акцію
                      </Link>
                      <Link
                        href="/pidkliuchennia"
                data-connect-modal
                        className={`relative z-[2] rounded-[14px] bg-[#FFDC00] px-[16px] py-[16px] text-center text-[16px] font-bold text-[#233955] no-underline transition-colors duration-200 hover:bg-[#00B3DC] hover:text-white ${focusRing}`}
                      >
                        Підключити
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[24px] p-[40px] text-center" style={{ background: '#2C4362', boxShadow: '0 0 0 1px rgba(0,179,220,0.25)' }}>
            <p className="mb-[8px] text-[24px] font-bold">Зараз активних акцій немає</p>
            <p className="text-[16px] text-white/65">Залиште заявку — розповімо про актуальні тарифи.</p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-[1170px] px-4 pb-[80px] md:pb-[100px]">
        <div className="relative overflow-hidden rounded-[28px] px-[24px] py-[40px] md:px-[56px] md:py-[56px]" style={{ background: 'linear-gradient(120deg, #00B3DC 0%, #0A7FB8 55%, #1B4F86 100%)' }}>
          <div className="pointer-events-none absolute -right-[80px] -top-[80px] h-[280px] w-[280px] rounded-full bg-white/10" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-[120px] right-[120px] h-[240px] w-[240px] rounded-full bg-white/5" aria-hidden="true" />
          <div className="relative flex flex-col gap-[24px] md:flex-row md:items-center md:justify-between">
            <div>
              <p className="m-0 text-[26px] font-extrabold leading-tight md:text-[34px]">Є запитання щодо акцій?</p>
              <p className="m-0 mt-[8px] text-[16px] text-white/85 md:text-[18px]">
                Зателефонуйте{' '}
                <a href={`tel:+38${config.phone}`} className="font-bold text-white underline-offset-4 hover:underline">{config.phone}</a>
                {' '}або залиште заявку — ми все пояснимо.
              </p>
            </div>
            <Link
              href="/pidkliuchennia"
              data-connect-modal
              className={`inline-block flex-shrink-0 rounded-[14px] bg-[#FFDC00] px-[36px] py-[18px] text-center text-[17px] font-bold text-[#233955] no-underline transition-colors duration-200 hover:bg-white ${focusRing}`}
            >
              Залишити заявку
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
