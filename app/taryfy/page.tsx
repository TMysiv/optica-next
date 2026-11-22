import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { config } from '@/lib/config';
import { pageMetadata } from '@/lib/seo';
import { tariffs } from '@/lib/tariffs';
import { TariffPlanCard } from '@/components/TariffPlanCard/TariffPlanCard';

const TITLE = `Тарифи на інтернет Укртелеком GPON — від ${config.internetPrice} грн/міс`;
const DESCRIPTION = `Тарифи на оптичний інтернет GPON від Укртелеком: 1 Гбіт/с від ${config.internetPrice} грн/міс, інтернет + MEGOGO TV від 400 грн/міс. Порівняйте та підключіть онлайн.`;
const URL = `${config.domain}/taryfy`;

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/taryfy' });

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Головна', item: config.domain },
    { '@type': 'ListItem', position: 2, name: 'Тарифи', item: URL },
  ],
};

const tariffsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Тарифи інтернету Укртелеком',
  itemListElement: tariffs.map((tariff, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Product',
      name: `${tariff.name} — Укртелеком`,
      description: tariff.description.join('. '),
      image: `${config.domain}${tariff.cover}`,
      offers: {
        '@type': 'Offer',
        price: tariff.price,
        priceCurrency: 'UAH',
        availability: 'https://schema.org/InStock',
        url: URL,
      },
    },
  })),
};

const stats = [
  { value: 'до 1 Гбіт/с', label: 'швидкість' },
  { value: 'до 96 год', label: 'без світла' },
  { value: `від ${config.internetPrice} грн`, label: 'на місяць' },
];

const comparison: { label: string; values: (boolean | string)[] }[] = [
  { label: 'Оптичний інтернет GPON', values: [true, true, true] },
  { label: 'Енергонезалежність до 96 годин', values: [true, true, true] },
  { label: 'Ціна відома на 2 роки', values: [true, false, false] },
  { label: 'Знижка 50% на ігри в хмарі', values: [true, false, false] },
  { label: 'MEGOGO TV', values: [false, true, true] },
  { label: "TV на п'яти пристроях", values: [false, true, true] },
  { label: 'Матчі збірної України', values: [false, true, true] },
  { label: 'Ліга Чемпіонів, Ліга Європи, Ліга націй', values: [false, false, true] },
  { label: 'Disney, Paramount', values: [false, true, true] },
  { label: 'Warner Bros., HBO Max', values: [false, false, true] },
];

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDC00]';

const Check = () => (
  <svg aria-label="Так" role="img" className="mx-auto h-[22px] w-[22px]" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#00B3DC" fillOpacity="0.2" />
    <path d="M6.5 11.3l3 3L15.5 8" stroke="#7FE3FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Dash = () => (
  <span aria-label="Ні" role="img" className="mx-auto block h-[2px] w-[14px] rounded-full bg-white/25" />
);

export default function TaryfyPage() {
  const highlightedId = 2;

  return (
    <main className="min-h-screen overflow-hidden text-white" style={{ background: '#233955' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tariffsSchema) }} />

      {/* Hero */}
      <section className="relative" style={{ background: 'radial-gradient(1200px 500px at 85% 0%, rgba(0,179,220,0.22), transparent 60%), rgba(0,0,0,0.18)' }}>
        <div className="mx-auto grid max-w-[1170px] grid-cols-1 items-center gap-[40px] px-4 pb-[64px] pt-[130px] md:pt-[150px] lg:grid-cols-[1fr_1fr] lg:gap-[56px] lg:pb-[88px]">
          <div>
            <span className="inline-block rounded-full border border-[rgba(0,179,220,0.35)] bg-[rgba(0,179,220,0.15)] px-[12px] py-[5px] text-[12px] font-semibold uppercase tracking-[1.5px] text-[#7FE3FF]">
              Тарифи 2026
            </span>
            <h1 className="mt-[18px] text-[38px] font-extrabold leading-[1.06] tracking-[-0.02em] sm:text-[50px] md:text-[60px]">
              Тарифи на інтернет і ТБ <span className="text-[#00B3DC]">Укртелеком</span>
            </h1>
            <p className="mt-[20px] max-w-[520px] text-[17px] leading-[1.6] text-white/65 md:text-[19px]">
              Оптичний інтернет GPON від Укртелеком та пакети з MEGOGO TV. Оберіть тариф під себе — решту зробить майстер.
            </p>

            <dl className="mt-[32px] grid max-w-[520px] grid-cols-3 gap-[12px]">
              {stats.map((s) => (
                <div key={s.label} className="rounded-[16px] px-[10px] py-[12px] sm:px-[14px] sm:py-[14px]" style={{ background: 'rgba(255,255,255,0.05)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="m-0">
                    <span className="block whitespace-nowrap text-[14px] font-extrabold leading-tight text-[#FFDC00] sm:text-[18px] md:text-[22px]">{s.value}</span>
                    <span className="mt-[2px] block text-[13px] text-white/55">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto aspect-[5/4] w-full max-w-[540px]" aria-hidden="true">
            <div className="absolute left-0 top-[6%] w-[62%] rotate-[-5deg] overflow-hidden rounded-[20px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]" style={{ boxShadow: '0 0 0 1px rgba(0,179,220,0.35), 0 30px 60px -20px rgba(0,0,0,0.6)' }}>
              <div className="relative aspect-[16/9]">
                <Image src={tariffs[1].cover} alt="" fill sizes="340px" className="object-cover" priority />
              </div>
            </div>
            <div className="absolute right-0 top-0 w-[56%] rotate-[4deg] overflow-hidden rounded-[20px]" style={{ boxShadow: '0 0 0 1px rgba(255,220,0,0.45), 0 30px 60px -20px rgba(0,0,0,0.6)' }}>
              <div className="relative aspect-[16/9]">
                <Image src={tariffs[2].cover} alt="" fill sizes="300px" className="object-cover" priority />
              </div>
            </div>
            <div className="absolute bottom-[2%] left-[16%] w-[68%] overflow-hidden rounded-[22px]" style={{ boxShadow: '0 0 0 2px rgba(0,179,220,0.6), 0 40px 80px -20px rgba(0,0,0,0.7)' }}>
              <div className="relative aspect-[16/9]">
                <Image src={tariffs[0].cover} alt="" fill sizes="370px" className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1170px] px-4 py-[64px] md:py-[88px]" aria-labelledby="plans-title">
        <div className="mb-[40px] flex flex-col gap-[10px] md:mb-[56px] md:flex-row md:items-end md:justify-between">
          <h2 id="plans-title" className="text-[30px] font-extrabold leading-tight md:text-[40px]">Оберіть тариф на інтернет</h2>
          <p className="max-w-[420px] text-[15px] text-white/55">Підключення для нових абонентів. Технічна можливість залежить від адреси.</p>
        </div>
        <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 lg:grid-cols-3">
          {tariffs.map((tariff) => (
            <TariffPlanCard key={tariff.id} tariff={tariff} highlighted={tariff.id === highlightedId} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1170px] px-4 pb-[64px] md:pb-[88px]" aria-labelledby="compare-title">
        <h2 id="compare-title" className="mb-[28px] text-[30px] font-extrabold leading-tight md:text-[40px]">Порівняння тарифів Укртелеком</h2>
        <div className="overflow-x-auto rounded-[24px]" style={{ background: '#2C4362', boxShadow: '0 0 0 1px rgba(0,179,220,0.25)' }}>
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th scope="col" className="px-[24px] py-[20px] text-[14px] font-semibold text-white/55">Що входить</th>
                {tariffs.map((t) => (
                  <th
                    key={t.id}
                    scope="col"
                    className={`px-[16px] py-[20px] text-center ${t.id === highlightedId ? 'bg-[rgba(255,220,0,0.08)]' : ''}`}
                  >
                    <span className="block text-[16px] font-bold text-white">{t.name}</span>
                    <span className="mt-[4px] block text-[14px] font-semibold text-[#FFDC00]">{t.priceFrom ? 'від ' : ''}{t.price} грн/міс</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-b border-white/5 last:border-b-0">
                  <th scope="row" className="px-[24px] py-[16px] text-[15px] font-medium text-white/80">{row.label}</th>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className={`px-[16px] py-[16px] text-center text-[15px] ${tariffs[i]?.id === highlightedId ? 'bg-[rgba(255,220,0,0.08)]' : ''}`}
                    >
                      {typeof v === 'string' ? v : v ? <Check /> : <Dash />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-[1170px] px-4 pb-[80px] md:pb-[100px]">
        <div
          className="relative overflow-hidden rounded-[28px] px-[24px] py-[40px] md:px-[56px] md:py-[56px]"
          style={{ background: 'linear-gradient(120deg, #00B3DC 0%, #0A7FB8 55%, #1B4F86 100%)' }}
        >
          <div className="pointer-events-none absolute -right-[80px] -top-[80px] h-[280px] w-[280px] rounded-full bg-white/10" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-[120px] right-[120px] h-[240px] w-[240px] rounded-full bg-white/5" aria-hidden="true" />
          <div className="relative flex flex-col gap-[24px] md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[26px] font-extrabold leading-tight md:text-[34px]">Не знаєте, який тариф обрати?</p>
              <p className="mt-[8px] text-[16px] text-white/85 md:text-[18px]">
                Зателефонуйте <a href={`tel:+38${config.phone}`} className="font-bold text-white underline-offset-4 hover:underline">{config.phone}</a> — допоможемо з вибором і перевіримо адресу.
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
