import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { config } from '@/lib/config';
import { pageMetadata } from '@/lib/seo';
import { tariffs } from '@/lib/tariffs';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { ConnectPageForm } from '@/components/ConnectModal/ConnectPageForm';

const TITLE = 'Підключити інтернет Укртелеком у квартиру чи будинок';
const DESCRIPTION = `Заявка на підключення інтернету Укртелеком онлайн: менеджер перевірить адресу, майстер проведе оптику GPON у квартиру чи будинок. Від ${config.internetPrice} грн/міс.`;
const URL = `${config.domain}/pidkliuchennia`;

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/pidkliuchennia', imageAlt: 'Підключити інтернет Укртелеком' });

const steps = [
  { title: 'Заявка', text: 'Вкажіть адресу, імʼя та телефон у формі.' },
  { title: 'Дзвінок менеджера', text: 'Перевіримо технічну можливість за вашою адресою та узгодимо зручний час.' },
  { title: 'Монтаж', text: 'Майстер проведе оптичний кабель до квартири чи будинку та встановить обладнання.' },
  { title: 'Інтернет працює', text: 'Майстер налаштує обладнання й перевірить, що все працює.' },
];

const benefits = [
  { value: 'до 1 Гбіт/с', label: 'швидкість оптики GPON' },
  { value: 'до 96 год', label: 'мережа працює без світла' },
  { value: `від ${config.internetPrice} грн`, label: 'на місяць' },
];

const faqs = [
  {
    question: 'Як провести інтернет у квартиру чи будинок?',
    answer: 'Залиште заявку — менеджер перевірить технічну можливість за адресою та узгодить візит. Майстер прокладе оптоволоконний кабель, встановить оптичний термінал і налаштує роутер. Орієнтовно підключення займає від 1 до 5 робочих днів.',
  },
  {
    question: 'Хто може підключитися за акційними тарифами?',
    answer: 'Нові абоненти — фізичні особи, які не користувались інтернетом Укртелеком протягом останніх 90 днів, за наявності технічної можливості за адресою.',
  },
  {
    question: 'Скільки коштує підключення?',
    answer: 'Вартість підключення залежить від технічної можливості та населеного пункту. Точну суму менеджер назве під час дзвінка після перевірки адреси.',
  },
  {
    question: 'Як дізнатися, чи можна підключитися за моєю адресою?',
    answer: 'Залиште заявку на цій сторінці — менеджер перевірить технічну можливість за вашою адресою та зателефонує.',
  },
  {
    question: 'Яке обладнання потрібне?',
    answer: 'Оптичний термінал (ONU) надається в оренду за 1 грн/міс. Роутер можна придбати або взяти в оренду.',
  },
  {
    question: 'Чи працюватиме інтернет без світла?',
    answer: 'Мережа Укртелеком працює до 96 годин без зовнішнього живлення. Щоб інтернет був і вдома, роутеру та терміналу потрібне резервне живлення — павербанк або ДБЖ.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Головна', item: config.domain },
    { '@type': 'ListItem', position: 2, name: 'Підключення', item: URL },
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
  name: 'Підключення інтернету GPON',
  provider: { '@type': 'Organization', name: 'Укртелеком', url: config.domain },
  areaServed: { '@type': 'Country', name: 'Ukraine' },
  availableLanguage: 'Ukrainian',
  url: URL,
};

const cardStyle = { background: '#2C4362', boxShadow: '0 0 0 1px rgba(0,179,220,0.22)' };

export default function ConnectPage() {
  return (
    <main className="min-h-screen overflow-hidden text-white" style={{ background: '#233955' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <section style={{ background: 'radial-gradient(1100px 480px at 85% 0%, rgba(0,179,220,0.22), transparent 60%), rgba(0,0,0,0.18)' }}>
        <div className="mx-auto max-w-[1170px] px-4 pb-[56px] pt-[130px] md:pb-[80px] md:pt-[140px]">
          <Breadcrumbs items={[{ label: 'Головна', href: '/' }, { label: 'Підключення' }]} />

          <div className="grid grid-cols-1 gap-[36px] lg:grid-cols-[1fr_1.15fr] lg:gap-[48px]">
            <div className="lg:pt-[12px]">
              <span className="inline-block rounded-full border border-[rgba(0,179,220,0.35)] bg-[rgba(0,179,220,0.15)] px-[12px] py-[5px] text-[12px] font-semibold uppercase tracking-[1.5px] text-[#7FE3FF]">
                Заявка онлайн
              </span>
              <h1 className="mt-[18px] text-[36px] font-extrabold leading-[1.06] tracking-[-0.02em] sm:text-[46px] md:text-[60px]">
                Підключити інтернет <span className="text-[#00B3DC]">Укртелеком</span>
              </h1>
              <p className="mt-[18px] max-w-[500px] text-[17px] leading-[1.6] text-white/70 md:text-[18px]">
                Підключення оптоволоконного інтернету GPON у квартиру чи будинок. Залиште заявку — менеджер зателефонує, перевірить адресу та узгодить, коли провести інтернет.
              </p>

              <dl className="mt-[28px] grid max-w-[500px] grid-cols-3 gap-[12px]">
                {benefits.map((b) => (
                  <div key={b.label} className="rounded-[16px] px-[10px] py-[12px] sm:px-[14px] sm:py-[14px]" style={{ background: 'rgba(255,255,255,0.05)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}>
                    <dt className="sr-only">{b.label}</dt>
                    <dd className="m-0">
                      <span className="block whitespace-nowrap text-[14px] font-extrabold leading-tight text-[#FFDC00] sm:text-[18px] md:text-[20px]">{b.value}</span>
                      <span className="mt-[2px] block text-[12px] leading-snug text-white/55 sm:text-[13px]">{b.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="relative mt-[32px] hidden aspect-[16/9] max-w-[500px] overflow-hidden rounded-[24px] lg:block" style={{ boxShadow: '0 0 0 1px rgba(0,179,220,0.3)' }}>
                <Image src="/images/promos/internet.svg" alt="Оптичний інтернет GPON від Укртелеком" fill sizes="500px" className="object-cover" />
              </div>

              <p className="mt-[24px] text-[15px] text-white/60">
                Зручніше телефоном?{' '}
                <a href={`tel:+38${config.phone}`} className="font-bold text-[#7FE3FF] no-underline hover:text-white">{config.phone}</a>
              </p>
            </div>

            <ConnectPageForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1170px] px-4 pt-[56px] md:pt-[80px]" aria-labelledby="steps-title">
        <h2 id="steps-title" className="mb-[24px] text-[28px] font-extrabold md:text-[36px]">Як проходить підключення GPON</h2>
        <ol className="m-0 grid list-none grid-cols-1 gap-[16px] p-0 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-[20px] p-[22px]" style={cardStyle}>
              <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#FFDC00] text-[16px] font-extrabold text-[#233955]" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-[14px] text-[18px] font-bold">{step.title}</h3>
              <p className="mt-[6px] text-[15px] leading-[1.55] text-white/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[1170px] px-4 pt-[56px] md:pt-[80px]" aria-labelledby="tariffs-title">
        <div className="mb-[24px] flex flex-wrap items-end justify-between gap-[12px]">
          <h2 id="tariffs-title" className="text-[28px] font-extrabold md:text-[36px]">Тарифи для підключення</h2>
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

      <section className="mx-auto max-w-[1170px] px-4 pb-[80px] pt-[56px] md:pb-[100px] md:pt-[80px]" aria-labelledby="faq-title">
        <h2 id="faq-title" className="mb-[24px] text-[28px] font-extrabold md:text-[36px]">Часті запитання про підключення</h2>
        <div className="flex flex-col gap-[12px]">
          {faqs.map((f, i) => (
            <details key={f.question} open={i === 0} className="group rounded-[20px]" style={cardStyle}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-[16px] px-[22px] py-[20px] md:px-[28px] [&::-webkit-details-marker]:hidden">
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
    </main>
  );
}
