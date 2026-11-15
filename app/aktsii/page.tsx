import type { Metadata } from 'next';
import Link from 'next/link';
import { config } from '@/lib/config';

type Promo = {
  id: string;
  title: string;
  description?: string;
  price: number;
  unit?: string;
  badge?: string;
  validUntil?: string;
  schemaName?: string;
  conditions: {
    title: string;
    text: string
  }[];
};

const promos: Promo[] = [
  {
    id: 'optic',
    title: 'Оптичний Енергонезалежний Інтернет',
    schemaName: 'Оптичний інтернет від Укртелеком',
    description: 'Підключи інтернет зі швидкістю 1Гіг від 99грн/міс',
    price: 99,
    conditions: [
      {
        title: 'Мінімальний акційний тариф',
        text: 'Мінімальний акційний тариф на інтернет від Укртелеком складає 99 грн/міс.',
      },
      {
        title: 'Термін користування',
        text: 'Терміну користування немає',
      },
      {
        title: 'Хто може підключитись',
        text: 'Підключення до інтернету від Укртелеком за акційними тарифами доступне лише для фізичних осіб, які не були користувачами послуги інтернет від Укртелеком за останні 90 днів та за наявност технічної можливості підключення.',
      },
      {
        title: 'Перелік населених пунктів',
        text: 'Перелік населених пунктів, у яких здійснюється підключення до інтернету від Укртелеком за акційними тарифами, може змінюватись.',
      },
    ],
  },
  {
    id: 'optic-tv',
    title: 'Інтернет + MEGOGO TV',
    description: 'Підключи інтернет зі швидкістю 1Гіг та телебачення від MEGOGO',
    price: 400,
    conditions: [
      {
        title: 'Мінімальний акційний тариф',
        text: 'Мінімальний акційний тариф на комплекс послуг інтернет від Укртелеком та MEGOGO TV складає 400 грн/міс.',
      },
      {
        title: 'Термін користування',
        text: 'Терміну користування немає',
      },
      {
        title: 'Хто може підключитись',
        text: 'Підключення до інтернету від Укртелеком та MEGOGO TV за акційними тарифами доступне лише для фізичних осіб, які не були користувачами послуги інтернет від Укртелеком за останні 90 днів та за наявност технічної можливості підключення.',
      },
      {
        title: 'Перелік населених пунктів',
        text: 'Перелік населених пунктів, у яких здійснюється підключення до інтернету від Укртелеком за акційними тарифами, може змінюватись.',
      },
    ],
  },
];

const hasPromos = promos.length > 0;
const minPrice = hasPromos ? Math.min(...promos.map((p) => p.price)) : null;

const TITLE = minPrice
  ? `Акції на інтернет від Укртелеком — від ${minPrice} грн/міс`
  : 'Акції на інтернет від Укртелеком';
const DESCRIPTION = minPrice
  ? `Акційні пропозиції на інтернет від Укртелеком — від ${minPrice} грн/міс. Перевірте умови акцій та залиште заявку на підключення онлайн.`
  : 'Акційні пропозиції на інтернет від Укртелеком. Залиште заявку на підключення онлайн.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${config.domain}/aktsii` },
  openGraph: {
    type: 'website',
    url: `${config.domain}/aktsii`,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/images/desktop-banner.webp', width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/desktop-banner.webp'],
  },
};

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
    item: {
      '@type': 'Service',
      name: promo.schemaName ?? promo.title,
      ...(promo.description ? { description: promo.description } : {}),
      provider: { '@type': 'Organization', name: 'Укртелеком' },
      offers: {
        '@type': 'Offer',
        price: String(promo.price),
        priceCurrency: 'UAH',
        url: `${config.domain}/#form-section`,
        ...(promo.validUntil ? { priceValidUntil: promo.validUntil } : {}),
      },
    },
  })),
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDC00]';

export default function AktsiiPage() {
  return (
    <main className="min-h-screen text-white" style={{ background: '#233955' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {hasPromos && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offersSchema) }} />
      )}

      <header style={{ background: 'rgba(0,0,0,0.18)' }}>
        <div className="mx-auto max-w-[1170px] px-4 pb-[120px] pt-[36px] md:pb-[140px] md:pt-[44px]">
          <nav aria-label="Навігація" className="mb-[48px] md:mb-[64px]">
            <ol className="flex items-center gap-[10px] text-[14px] text-white/55">
              <li>
                <Link href="/" className={`text-white/55 no-underline transition-colors hover:text-white ${focusRing}`}>
                  Головна
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/90">
                Акції
              </li>
            </ol>
          </nav>

          <div className="mb-[28px] h-[4px] w-[56px] rounded-full bg-[#FFDC00]" aria-hidden="true" />
          <h1 className="max-w-[820px] text-[38px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[50px] md:text-[62px]">
            Акції на інтернет від Укртелеком
          </h1>
          <p className="mt-[20px] max-w-[520px] text-[17px] leading-[1.6] text-white/65 md:text-[19px]">
            Оберіть акцію, перевірте умови й залиште заявку онлайн.
          </p>
        </div>
      </header>

      <section className="relative z-10 mx-auto -mt-[72px] max-w-[1170px] px-4 pb-[72px] md:-mt-[84px] md:pb-[96px]">
        <h2 className="sr-only">Діючі акції</h2>

        {hasPromos ? (
          <div className="flex flex-col gap-[20px]">
            {promos.map((promo, index) => {
              const until = promo.validUntil ? formatDate(promo.validUntil) : null;
              return (
                <article
                  key={promo.id}
                  id={promo.id}
                  className="scroll-mt-[24px] rounded-[24px]"
                  style={{ background: '#2C4362', boxShadow: '0 0 0 1px rgba(0,179,220,0.25)' }}
                >
                  <div className="grid grid-cols-1 gap-[28px] p-[28px] md:grid-cols-[1fr_auto] md:items-center md:gap-[56px] md:p-[44px]">
                    <div>
                      {(promo.badge || until) && (
                        <div className="mb-[14px] flex flex-wrap items-center gap-[10px] text-[14px]">
                          {promo.badge && (
                            <span className="rounded-full bg-[#FFDC00] px-[12px] py-[4px] font-semibold text-[#233955]">
                              {promo.badge}
                            </span>
                          )}
                          {until && <span className="text-white/60">Діє до {until}</span>}
                        </div>
                      )}
                      <h3 className="text-[28px] font-extrabold leading-[1.1] tracking-[-0.01em] md:text-[36px]">
                        {promo.title}
                      </h3>
                      {promo.description && (
                        <p className="mt-[12px] max-w-[520px] text-[17px] leading-[1.6] text-white/70">
                          {promo.description}
                        </p>
                      )}
                    </div>

                    <div className="md:min-w-[260px] md:text-right">
                      <p className="mb-[20px] flex items-baseline gap-[10px] md:justify-end">
                        <span className="text-[18px] font-medium text-white/55">від</span>
                        <span className="text-[72px] font-extrabold leading-none tracking-[-0.04em] md:text-[88px]">
                          {promo.price}
                        </span>
                        <span className="text-[18px] font-semibold text-white/80">{promo.unit ?? 'грн/міс.'}</span>
                      </p>
                      <Link
                        href="/#form-section"
                        className={`block rounded-[14px] bg-[#FFDC00] px-[28px] py-[18px] text-center text-[17px] font-bold text-[#233955] no-underline transition-colors duration-200 hover:bg-[#00B3DC] hover:text-white ${focusRing}`}
                      >
                        Підключити
                      </Link>
                    </div>
                  </div>

                  <details open={promos.length === 1 && index === 0} className="group border-t border-white/10">
                    <summary
                      className={`flex cursor-pointer list-none items-center justify-between gap-[16px] px-[28px] py-[20px] text-[16px] font-semibold md:px-[44px] [&::-webkit-details-marker]:hidden ${focusRing}`}
                    >
                      <span>Про акцію</span>
                      <svg
                        aria-hidden="true"
                        className="h-[20px] w-[20px] flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </summary>

                    <dl className="px-[28px] pb-[16px] md:px-[44px] md:pb-[28px]">
                      {promo.conditions.map((item) => (
                        <div
                          key={item.title}
                          className="grid grid-cols-1 gap-[6px] border-t border-white/10 py-[18px] md:grid-cols-[260px_1fr] md:gap-[40px]"
                        >
                          <dt className="text-[15px] font-semibold">{item.title}</dt>
                          <dd className="m-0 max-w-[640px] text-[15px] leading-[1.7] text-white/65">{item.text}</dd>
                        </div>
                      ))}
                    </dl>
                  </details>
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

      <section className="border-t border-white/10" style={{ background: 'rgba(0,0,0,0.15)' }}>
        <div className="mx-auto flex max-w-[1170px] flex-col gap-[24px] px-4 py-[56px] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-[6px] text-[24px] font-bold md:text-[28px]">Є запитання щодо акцій?</p>
            <p className="text-[16px] text-white/60">Зателефонуйте нам {config.phone} або залиште заявку — ми все пояснимо.</p>
          </div>
          <Link
            href="/#form-section"
            className={`inline-block flex-shrink-0 rounded-[14px] bg-[#00B3DC] px-[36px] py-[18px] text-center text-[17px] font-bold text-white no-underline transition-colors duration-200 hover:bg-[#FFDC00] hover:text-[#233955] ${focusRing}`}
          >
            Залишити заявку
          </Link>
        </div>
      </section>
    </main>
  );
}
