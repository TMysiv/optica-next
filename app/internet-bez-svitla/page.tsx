import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { config } from '@/lib/config';
import { tariffs } from '@/lib/tariffs';
import { pageMetadata, ogFromIllustration } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';

const PATH = '/internet-bez-svitla';
const URL = `${config.domain}${PATH}`;

export const metadata: Metadata = pageMetadata({
  title: 'Інтернет без світла Укртелеком — енергонезалежний GPON',
  description: `Енергонезалежний інтернет Укртелеком: оптика GPON працює до 96 годин без світла. До 1 Гбіт/с від ${config.internetPrice} грн/міс. Що потрібно вдома і як підключити.`,
  path: PATH,
  image: ogFromIllustration('/images/promos/internet.svg'),
  imageAlt: 'Інтернет без світла від Укртелеком',
});

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDC00]';
const cardStyle = { background: '#2C4362', boxShadow: '0 0 0 1px rgba(0,179,220,0.22)' };

const stats = [
  { value: 'до 96 год', label: 'мережа працює без світла' },
  { value: 'до 1 Гбіт/с', label: 'швидкість оптики' },
  { value: `від ${config.internetPrice} грн`, label: 'на місяць' },
];

const reasons = [
  {
    title: 'Пасивна оптична мережа',
    text: 'У GPON сигнал іде оптоволокном через пасивні розгалужувачі, яким не потрібна електрика. Відключення світла в будинку не обриває саму лінію.',
  },
  {
    title: 'Резервне живлення вузлів',
    text: 'Вузлове обладнання Укртелеком має акумулятори та генератори й автоматично перемикається на них, коли зникає зовнішнє живлення.',
  },
  {
    title: 'До 96 годин автономності',
    text: 'Завдяки резерву мережа GPON Укртелеком працює до 96 годин без зовнішнього живлення — навіть під час тривалого блекауту.',
  },
];

const comparison: { label: string; gpon: string; mobile: string; copper: string }[] = [
  {
    label: 'Робота без світла',
    gpon: 'До 96 годин завдяки резерву вузлів',
    mobile: 'Залежить від живлення базових станцій',
    copper: 'Часто зникає, якщо вузли без резерву',
  },
  {
    label: 'Швидкість під час блекауту',
    gpon: 'Стабільна, до 1 Гбіт/с',
    mobile: 'Падає через перевантаження мережі',
    copper: 'Залежить від провайдера',
  },
  {
    label: 'Що потрібно вдома',
    gpon: 'Живлення роутера й терміналу',
    mobile: 'Заряджений телефон чи модем',
    copper: 'Живлення роутера',
  },
];

const homeSteps = [
  { title: 'Дізнайтеся, що живити', text: 'Оптичний термінал (ONT) і роутер. Подивіться напругу та струм на їхніх блоках живлення.', href: '/blog/shcho-take-ont-i-navishcho-vin-potriben', link: 'Що таке ONT' },
  { title: 'Оберіть резервне живлення', text: 'Павербанк з потрібною напругою, міні-ДБЖ для роутера або зарядна станція.', href: '/blog/yakyi-paverbank-abo-dbz-dlya-routera-i-ont', link: 'Як обрати павербанк чи ДБЖ' },
  { title: 'Порахуйте запас', text: 'Роутер і термінал разом споживають зазвичай 11–25 Вт. Оцініть, на скільки годин вистачить заряду.', href: '/blog/skilky-pratsyuye-router-vid-paverbanka', link: 'Формула і таблиця' },
  { title: 'Перевірте заздалегідь', text: 'Підключіть обладнання до резервного джерела, поки світло є, і переконайтеся, що все працює.', href: '/blog/chek-lyst-internet-do-blekautu', link: 'Чек-лист до блекауту' },
];

const faqs = [
  {
    question: 'Чи справді інтернет Укртелеком працює без світла?',
    answer: 'Так. Оптична мережа GPON Укртелеком має резервне живлення вузлів і працює до 96 годин без зовнішнього живлення. Щоб інтернет був і у вас удома, роутеру та оптичному терміналу потрібне власне резервне живлення.',
  },
  {
    question: 'Чому оптоволокно працює без світла, а інші види інтернету — ні?',
    answer: 'У мережі GPON на шляху до вашого будинку стоять пасивні оптичні розгалужувачі, яким не потрібна електрика, а вузлове обладнання має акумулятори й генератори. В інших мережах активне обладнання в під\'їздах чи на вулиці часто вимикається разом зі світлом.',
  },
  {
    question: 'Що потрібно, щоб інтернет працював удома під час блекауту?',
    answer: 'Резервне живлення для оптичного терміналу (ONT) і Wi-Fi роутера: павербанк із підтримкою потрібної напруги, міні-ДБЖ або зарядна станція. Час роботи залежить від ємності акумулятора та споживання обладнання.',
  },
  {
    question: 'Скільки коштує енергонезалежний інтернет Укртелеком?',
    answer: `Тариф «1 Гбіт/с» — від ${config.internetPrice} грн/міс з відомою ціною на 2 роки. Також є пакети інтернету з MEGOGO TV. Вартість підключення залежить від технічної можливості та населеного пункту.`,
  },
  {
    question: 'Як дізнатися, чи можна підключити такий інтернет за моєю адресою?',
    answer: 'Залиште заявку на сайті — менеджер перевірить технічну можливість підключення GPON за вашою адресою та зателефонує.',
  },
];

const articles = [
  { href: '/blog/internet-pid-chas-vidklyuchennya-svitla', title: 'Інтернет під час відключення світла — як це працює' },
  { href: '/blog/gpon-chy-4g-pid-chas-blekautu', title: 'GPON чи 4G під час блекауту: що надійніше' },
  { href: '/blog/chek-lyst-internet-do-blekautu', title: 'Чек-лист: як підготувати домашній інтернет до блекауту' },
  { href: '/blog/yakyi-paverbank-abo-dbz-dlya-routera-i-ont', title: 'Який павербанк або ДБЖ підійде для роутера і ONT' },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Головна', item: config.domain },
    { '@type': 'ListItem', position: 2, name: 'Інтернет без світла', item: URL },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Енергонезалежний інтернет GPON',
  description: 'Оптичний інтернет GPON від Укртелеком, мережа якого працює до 96 годин без зовнішнього живлення.',
  provider: { '@type': 'Organization', name: 'Укртелеком', url: config.domain },
  areaServed: { '@type': 'Country', name: 'Ukraine' },
  url: URL,
  offers: { '@type': 'Offer', price: config.internetPrice, priceCurrency: 'UAH', url: `${config.domain}/taryfy/internet-1-gbit` },
};

export default function InternetBezSvitlaPage() {
  return (
    <main className="min-h-screen overflow-hidden text-white" style={{ background: '#233955' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Hero */}
      <section style={{ background: 'radial-gradient(1100px 480px at 85% 0%, rgba(255,220,0,0.16), transparent 60%), rgba(0,0,0,0.18)' }}>
        <div className="mx-auto max-w-[1170px] px-4 pb-[56px] pt-[130px] md:pb-[80px] md:pt-[140px]">
          <Breadcrumbs items={[{ label: 'Головна', href: '/' }, { label: 'Інтернет без світла' }]} />

          <div className="grid grid-cols-1 items-center gap-[36px] lg:grid-cols-[1.05fr_1fr] lg:gap-[56px]">
            <div>
              <span className="inline-block rounded-full border border-[rgba(255,220,0,0.4)] bg-[rgba(255,220,0,0.12)] px-[12px] py-[5px] text-[12px] font-semibold uppercase tracking-[1.5px] text-[#FFDC00]">
                Енергонезалежний інтернет
              </span>
              <h1 className="mt-[18px] text-[38px] font-extrabold leading-[1.06] tracking-[-0.02em] sm:text-[50px] md:text-[58px]">
                Інтернет без світла <span className="text-[#00B3DC]">від Укртелеком</span>
              </h1>
              <p className="mt-[18px] max-w-[540px] text-[17px] leading-[1.6] text-white/70 md:text-[18px]">
                Інтернет, який працює без світла: оптична мережа GPON Укртелеком тримається до 96 годин без зовнішнього живлення.
              </p>

              <dl className="mt-[28px] grid max-w-[520px] grid-cols-3 gap-[12px]">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-[16px] px-[10px] py-[12px] sm:px-[14px] sm:py-[14px]" style={{ background: 'rgba(255,255,255,0.05)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="m-0">
                      <span className="block whitespace-nowrap text-[14px] font-extrabold leading-tight text-[#FFDC00] sm:text-[18px] md:text-[20px]">{s.value}</span>
                      <span className="mt-[2px] block text-[12px] leading-snug text-white/55 sm:text-[13px]">{s.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-[28px] flex flex-wrap gap-[12px]">
                <Link
                  href="/pidkliuchennia"
                  data-connect-modal
                  className={`rounded-[14px] bg-[#FFDC00] px-[32px] py-[16px] text-[17px] font-bold text-[#233955] no-underline transition-colors duration-200 hover:bg-[#00B3DC] hover:text-white ${focusRing}`}
                >
                  Підключити
                </Link>
                <Link
                  href="/taryfy"
                  className={`rounded-[14px] px-[28px] py-[16px] text-[17px] font-bold text-white no-underline transition-colors duration-200 hover:bg-white/10 ${focusRing}`}
                  style={{ border: '1px solid rgba(255,255,255,0.25)' }}
                >
                  Тарифи
                </Link>
              </div>
            </div>

            <div className="relative aspect-[16/9] overflow-hidden rounded-[24px]" style={{ boxShadow: '0 0 0 1px rgba(0,179,220,0.35), 0 40px 80px -30px rgba(0,0,0,0.7)' }}>
              <Image src="/images/promos/internet.svg" alt="Енергонезалежний оптичний інтернет GPON Укртелеком" fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Why fiber works without power */}
      <section className="mx-auto max-w-[1170px] px-4 pt-[56px] md:pt-[80px]" aria-labelledby="why-title">
        <h2 id="why-title" className="text-[28px] font-extrabold md:text-[36px]">Чому оптоволокно працює без світла</h2>
        <p className="mb-[24px] mt-[8px] max-w-[720px] text-[16px] leading-[1.6] text-white/65">
          Більшість провайдерів втрачають звʼязок, коли знеструмлюються їхні вузли. Мережа GPON влаштована інакше — ось чому GPON без світла продовжує працювати.
        </p>
        <div className="grid grid-cols-1 gap-[16px] md:grid-cols-3">
          {reasons.map((r, i) => (
            <div key={r.title} className="rounded-[20px] p-[24px]" style={cardStyle}>
              <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#FFDC00] text-[16px] font-extrabold text-[#233955]" aria-hidden="true">{i + 1}</span>
              <h3 className="mt-[14px] text-[19px] font-bold">{r.title}</h3>
              <p className="mt-[8px] text-[15px] leading-[1.6] text-white/70">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="mx-auto max-w-[1170px] px-4 pt-[56px] md:pt-[80px]" aria-labelledby="compare-title">
        <h2 id="compare-title" className="mb-[24px] text-[28px] font-extrabold md:text-[36px]">Інтернет під час блекауту: що надійніше</h2>
        <div className="overflow-x-auto rounded-[24px]" style={cardStyle}>
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th scope="col" className="px-[24px] py-[18px] text-[14px] font-semibold text-white/55" />
                <th scope="col" className="bg-[rgba(255,220,0,0.08)] px-[16px] py-[18px] text-[16px] font-bold text-[#FFDC00]">Оптика GPON Укртелеком</th>
                <th scope="col" className="px-[16px] py-[18px] text-[16px] font-bold">Мобільний 4G</th>
                <th scope="col" className="px-[16px] py-[18px] text-[16px] font-bold">Кабельний (мідь)</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-b border-white/5 last:border-b-0">
                  <th scope="row" className="px-[24px] py-[16px] text-[15px] font-semibold text-white/85">{row.label}</th>
                  <td className="bg-[rgba(255,220,0,0.08)] px-[16px] py-[16px] text-[15px] text-white">{row.gpon}</td>
                  <td className="px-[16px] py-[16px] text-[15px] text-white/65">{row.mobile}</td>
                  <td className="px-[16px] py-[16px] text-[15px] text-white/65">{row.copper}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[12px] text-[14px] text-white/50">
          Детальне порівняння — у статті <Link href="/blog/gpon-chy-4g-pid-chas-blekautu" className="text-[#7FE3FF] underline-offset-4 hover:underline">GPON чи 4G під час блекауту</Link>.
        </p>
      </section>

      {/* What you need at home */}
      <section className="mx-auto max-w-[1170px] px-4 pt-[56px] md:pt-[80px]" aria-labelledby="home-title">
        <h2 id="home-title" className="text-[28px] font-extrabold md:text-[36px]">Що потрібно вдома, щоб інтернет працював без світла</h2>
        <p className="mb-[24px] mt-[8px] max-w-[720px] text-[16px] leading-[1.6] text-white/65">
          Мережа працює, але роутеру й оптичному терміналу у квартирі теж потрібне живлення. Підготуватися можна за один вечір.
        </p>
        <ol className="m-0 grid list-none grid-cols-1 gap-[16px] p-0 sm:grid-cols-2 lg:grid-cols-4">
          {homeSteps.map((s, i) => (
            <li key={s.title} className="flex flex-col rounded-[20px] p-[22px]" style={cardStyle}>
              <span className="text-[13px] font-bold uppercase tracking-[1.2px] text-[#7FE3FF]">Крок {i + 1}</span>
              <h3 className="mt-[8px] text-[18px] font-bold">{s.title}</h3>
              <p className="mt-[6px] text-[15px] leading-[1.55] text-white/70">{s.text}</p>
              <Link href={s.href} className="mt-auto pt-[14px] text-[14px] font-semibold text-[#7FE3FF] no-underline hover:text-white">
                {s.link} →
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Tariffs */}
      <section className="mx-auto max-w-[1170px] px-4 pt-[56px] md:pt-[80px]" aria-labelledby="tariffs-title">
        <div className="mb-[24px] flex flex-wrap items-end justify-between gap-[12px]">
          <h2 id="tariffs-title" className="text-[28px] font-extrabold md:text-[36px]">Тарифи на енергонезалежний інтернет</h2>
          <Link href="/taryfy" className="text-[15px] font-medium text-[#7FE3FF] no-underline hover:text-white">Порівняти тарифи →</Link>
        </div>
        <div className="grid grid-cols-1 gap-[16px] md:grid-cols-3">
          {tariffs.map((t) => (
            <Link
              key={t.slug}
              href={`/taryfy/${t.slug}`}
              className="group flex items-center gap-[16px] overflow-hidden rounded-[20px] p-[12px] text-white no-underline transition-colors hover:bg-white/5"
              style={cardStyle}
            >
              <div className="relative aspect-[16/9] w-[120px] flex-shrink-0 overflow-hidden rounded-[12px]">
                <Image src={t.cover} alt={t.coverAlt} fill sizes="120px" className="object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
              </div>
              <div>
                <p className="m-0 text-[11px] font-semibold uppercase tracking-[1.2px] text-[#7FE3FF]">{t.kind}</p>
                <p className="m-0 mt-[4px] text-[18px] font-bold leading-[1.2] transition-colors group-hover:text-[#00B3DC]">{t.name}</p>
                <p className="m-0 mt-[4px] text-[15px] font-semibold text-[#FFDC00]">{t.priceFrom ? 'від ' : ''}{t.price} грн/міс</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1170px] px-4 pt-[56px] md:pt-[80px]" aria-labelledby="faq-title">
        <h2 id="faq-title" className="mb-[24px] text-[28px] font-extrabold md:text-[36px]">Часті запитання про інтернет без світла</h2>
        <div className="flex flex-col gap-[12px]">
          {faqs.map((f, i) => (
            <details key={f.question} open={i === 0} className="group rounded-[20px]" style={cardStyle}>
              <summary className={`flex cursor-pointer list-none items-center justify-between gap-[16px] px-[22px] py-[20px] md:px-[28px] [&::-webkit-details-marker]:hidden ${focusRing}`}>
                <h3 className="m-0 text-[17px] font-semibold leading-snug">{f.question}</h3>
                <span className="flex h-[32px] w-[32px] flex-shrink-0 items-center justify-center rounded-full bg-[rgba(0,179,220,0.15)] text-[#7FE3FF] transition-transform duration-200 group-open:rotate-45" aria-hidden="true">
                  <svg viewBox="0 0 20 20" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M10 4v12M4 10h12" /></svg>
                </span>
              </summary>
              <p className="m-0 px-[22px] pb-[22px] text-[15px] leading-[1.65] text-white/70 md:px-[28px]">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-[1170px] px-4 pt-[56px] md:pt-[80px]" aria-labelledby="articles-title">
        <h2 id="articles-title" className="mb-[20px] text-[24px] font-extrabold md:text-[30px]">Корисно знати</h2>
        <ul className="m-0 grid list-none grid-cols-1 gap-[12px] p-0 md:grid-cols-2">
          {articles.map((a) => (
            <li key={a.href}>
              <Link href={a.href} className="flex items-center justify-between gap-[12px] rounded-[16px] px-[20px] py-[16px] text-[16px] font-semibold text-white no-underline transition-colors hover:bg-white/5 hover:text-[#00B3DC]" style={cardStyle}>
                {a.title}
                <span aria-hidden="true" className="text-[#7FE3FF]">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1170px] px-4 pb-[80px] pt-[56px] md:pb-[100px] md:pt-[80px]">
        <div className="relative overflow-hidden rounded-[28px] px-[24px] py-[40px] md:px-[56px] md:py-[52px]" style={{ background: 'linear-gradient(120deg, #00B3DC 0%, #0A7FB8 55%, #1B4F86 100%)' }}>
          <div className="pointer-events-none absolute -right-[80px] -top-[80px] h-[280px] w-[280px] rounded-full bg-white/10" aria-hidden="true" />
          <div className="relative flex flex-col gap-[24px] md:flex-row md:items-center md:justify-between">
            <div>
              <p className="m-0 text-[26px] font-extrabold leading-tight md:text-[32px]">Будьте на звʼязку навіть без світла</p>
              <p className="m-0 mt-[8px] text-[16px] text-white/85 md:text-[18px]">
                Оптичний GPON до 1 Гбіт/с від {config.internetPrice} грн/міс. Менеджер перевірить вашу адресу.
              </p>
            </div>
            <Link
              href="/pidkliuchennia"
              data-connect-modal
              className={`flex-shrink-0 rounded-[14px] bg-[#FFDC00] px-[36px] py-[18px] text-center text-[17px] font-bold text-[#233955] no-underline transition-colors duration-200 hover:bg-white ${focusRing}`}
            >
              Залишити заявку
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
