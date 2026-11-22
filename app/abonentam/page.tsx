import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { config } from '@/lib/config';
import { pageMetadata, ogFromIllustration } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';

const TITLE = 'Діючим абонентам Укртелеком — контакти, оплата, підтримка';
const DESCRIPTION =
  'Гаряча лінія 0800 506 800, чат-боти, способи оплати, що робити, якщо зник інтернет, кредитний період і зміна тарифу — для абонентів Укртелеком.';
const URL = `${config.domain}/abonentam`;

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/abonentam',
  image: ogFromIllustration('/images/promos/support.svg'),
  imageAlt: 'Підтримка абонентів Укртелеком',
});

const HOTLINE = '0800 506 575';
const HOTLINE_TEL = 'tel:0800506575';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDC00]';

const Icon = ({ children }: { children: ReactNode }) => (
  <span className="flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center rounded-[14px] bg-[rgba(0,179,220,0.15)] text-[#7FE3FF]" aria-hidden="true">
    <svg viewBox="0 0 24 24" className="h-[24px] w-[24px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  </span>
);

const icons = {
  phone: <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12zM8.5 12h.01M12 12h.01M15.5 12h.01" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  store: <path d="M4 10v10h16V10M3 10l2-6h14l2 6M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M10 20v-5h4v5" />,
  app: <><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M11 18.5h2" /></>,
  bank: <path d="M3 9.5L12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />,
  box: <path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8" />,
  cash: <><rect x="2.5" y="6" width="19" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6 9.5v.01M18 14.5v.01" /></>,
};


const contacts: { icon: ReactNode; title: string; text: string; links?: { label: string; href: string }[] }[] = [
  {
    icon: icons.phone,
    title: 'Гаряча лінія',
    text: `Для фізичних осіб — ${HOTLINE} або 044 440 0000, для юридичних — 0800 506 801. Оператори на лінії з 8:00 до 20:00.`,
    links: [{ label: HOTLINE, href: HOTLINE_TEL }],
  },
  {
    icon: icons.chat,
    title: 'Чат-боти',
    text: 'Допомога у Viber або Telegram. Для авторизації знадобиться номер особового рахунку (16 цифр).',
    links: [
      { label: 'Viber', href: 'viber://chat?number=Укртелком Чатбот' },
      { label: 'Telegram', href: 'https://t.me/ukrtelecom_bot' },
    ],
  },
  {
    icon: icons.globe,
    title: 'Офіційний сайт',
    text: 'Розділ «Допомога» та особистий кабінет на сайті ukrtelecom.ua.',
    links: [{ label: 'ukrtelecom.ua', href: 'https://ukrtelecom.ua' }],
  },
];

const troubleshooting: { title: string; text: string }[] = [
  { title: 'Перезавантажте роутер', text: 'Вимкніть його з розетки на 30 секунд і ввімкніть знову.' },
  { title: 'Перевірте індикатори', text: 'PON має світитися постійно. Якщо світиться або блимає LOS — проблема на лінії.' },
  { title: 'Перевірте оплату', text: 'Заборгованість автоматично блокує доступ до інтернету.' },
  { title: 'Немає світла?', text: 'Мережа Укртелеком працює до 96 годин, але роутеру потрібне власне резервне живлення.' },
  { title: 'Зателефонуйте нам', text: `Якщо нічого не допомогло — гаряча лінія ${HOTLINE}.` },
];

const payments: { icon: ReactNode; title: string; text: string }[] = [
  { icon: icons.app, title: 'Застосунок і кабінет', text: 'Мобільний застосунок Укртелеком або особистий кабінет на ukrtelecom.ua.' },
  { icon: icons.bank, title: 'Банківські застосунки', text: 'Privat24, Monobank та інші — за номером особового рахунку.' },
  { icon: icons.box, title: 'Пошта', text: 'У відділеннях Нової Пошти або Укрпошти.' },
  { icon: icons.cash, title: 'Готівкою', text: 'У центрах обслуговування Укртелеком.' },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: 'Що робити, якщо не встиг оплатити? Послуга «Кредитний період»',
    answer: `Укртелеком надає послугу «Кредитний період» — короткострокове продовження доступу до інтернету без оплати. Активувати її можна в особистому кабінеті на ukrtelecom.ua або через контакт-центр ${HOTLINE}. Послуга доступна за наявності позитивної історії платежів.`,
  },
  {
    question: 'Як тимчасово призупинити послугу (пауза)?',
    answer: `Якщо ви тимчасово не користуєтесь інтернетом (відрядження, відпустка), послугу можна призупинити. Для цього зверніться до контакт-центру ${HOTLINE} або до центру обслуговування. Мінімальний термін паузи та умови залежать від тарифного плану — уточнюйте у менеджера.`,
  },
  {
    question: 'Як змінити тариф або перейти на акційний?',
    answer: `Зміну тарифу можна оформити в особистому кабінеті на ukrtelecom.ua або за телефоном ${HOTLINE}. Зверніть увагу: акційні тарифи (наприклад, «Ціна — не новина» за ${config.internetPrice} грн/міс) діють лише для нових абонентів при першому підключенні.`,
  },
  {
    question: 'До якої дати потрібно оплатити рахунок?',
    answer: 'Рекомендуємо сплачувати не пізніше дати, вказаної в рахунку, щоб уникнути тимчасового блокування послуги.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Головна', item: config.domain },
    { '@type': 'ListItem', position: 2, name: 'Діючим абонентам', item: URL },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};

const cardStyle = { background: '#2C4362', boxShadow: '0 0 0 1px rgba(0,179,220,0.22)' };

export default function AbonentamPage() {
  return (
    <main className="min-h-screen overflow-hidden text-white" style={{ background: '#233955' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section style={{ background: 'radial-gradient(1100px 480px at 85% 0%, rgba(0,179,220,0.22), transparent 60%), rgba(0,0,0,0.18)' }}>
        <div className="mx-auto max-w-[1170px] px-4 pb-[56px] pt-[130px] md:pb-[80px] md:pt-[140px]">
          <Breadcrumbs items={[{ label: 'Головна', href: '/' }, { label: 'Діючим абонентам' }]} />

          <div className="grid grid-cols-1 items-center gap-[36px] lg:grid-cols-[1.05fr_1fr] lg:gap-[56px]">
            <div>
              <span className="inline-block rounded-full border border-[rgba(0,179,220,0.35)] bg-[rgba(0,179,220,0.15)] px-[12px] py-[5px] text-[12px] font-semibold uppercase tracking-[1.5px] text-[#7FE3FF]">
                Підтримка
              </span>
              <h1 className="mt-[18px] text-[38px] font-extrabold leading-[1.06] tracking-[-0.02em] sm:text-[50px] md:text-[60px]">
                Діючим абонентам <span className="text-[#00B3DC]">Укртелеком</span>
              </h1>
              <p className="mt-[18px] max-w-[540px] text-[17px] leading-[1.6] text-white/70 md:text-[18px]">
                Контакти підтримки, способи оплати та відповіді на часті запитання щодо інтернету від Укртелеком.
              </p>

              <div className="mt-[28px] flex flex-wrap gap-[12px]">
                <a
                  href={HOTLINE_TEL}
                  className={`inline-flex items-center gap-[10px] rounded-[14px] bg-[#FFDC00] px-[24px] py-[16px] text-[17px] font-bold text-[#233955] no-underline transition-colors duration-200 hover:bg-[#00B3DC] hover:text-white ${focusRing}`}
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icons.phone}
                  </svg>
                  {HOTLINE}
                </a>
                <a
                  href="https://t.me/ukrtelecom_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center rounded-[14px] px-[24px] py-[16px] text-[17px] font-bold text-white no-underline transition-colors duration-200 hover:bg-white/10 ${focusRing}`}
                  style={{ border: '1px solid rgba(255,255,255,0.25)' }}
                >
                  Написати в чат-бот
                </a>
              </div>
              <p className="mt-[12px] text-[14px] text-white/50">Безкоштовно з мобільних і стаціонарних · щодня з 8:00 до 20:00</p>
            </div>

            <div className="relative aspect-[16/9] overflow-hidden rounded-[24px]" style={{ boxShadow: '0 0 0 1px rgba(0,179,220,0.35), 0 40px 80px -30px rgba(0,0,0,0.7)' }}>
              <Image src="/images/promos/support.svg" alt="Підтримка абонентів Укртелеком" fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1170px] px-4 pt-[56px] md:pt-[80px]" aria-labelledby="contacts-title">
        <h2 id="contacts-title" className="mb-[24px] text-[28px] font-extrabold md:text-[36px]">Як звʼязатися з Укртелеком</h2>
        <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((c) => (
            <div key={c.title} className="flex flex-col rounded-[20px] p-[22px]" style={cardStyle}>
              <Icon>{c.icon}</Icon>
              <h3 className="mt-[16px] text-[19px] font-bold">{c.title}</h3>
              <p className="mt-[8px] text-[15px] leading-[1.55] text-white/70">{c.text}</p>
              {c.links && (
                <div className="mt-auto flex flex-wrap gap-[8px] pt-[16px]">
                  {c.links.map((l) => {
                    const external = l.href.startsWith('http');
                    return (
                      <a
                        key={l.label}
                        href={l.href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className={`rounded-[10px] bg-[rgba(0,179,220,0.15)] px-[12px] py-[7px] text-[14px] font-semibold text-[#7FE3FF] no-underline transition-colors hover:bg-[#00B3DC] hover:text-white ${focusRing}`}
                      >
                        {l.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mx-auto max-w-[1170px] px-4 pt-[56px] md:pt-[80px]" aria-labelledby="trouble-title">
        <h2 id="trouble-title" className="text-[28px] font-extrabold md:text-[36px]">Зник інтернет? Спробуйте так</h2>
        <p className="mb-[24px] mt-[8px] text-[16px] text-white/60">Більшість проблем вирішуються за кілька хвилин.</p>
        <ol className="m-0 grid list-none grid-cols-1 gap-[16px] p-0 sm:grid-cols-2 lg:grid-cols-5">
          {troubleshooting.map((step, i) => (
            <li key={step.title} className="relative rounded-[20px] p-[22px]" style={cardStyle}>
              <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#FFDC00] text-[16px] font-extrabold text-[#233955]" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-[14px] text-[17px] font-bold">{step.title}</h3>
              <p className="mt-[6px] text-[14px] leading-[1.55] text-white/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Payments */}
      <section className="mx-auto max-w-[1170px] px-4 pt-[56px] md:pt-[80px]" aria-labelledby="pay-title">
        <h2 id="pay-title" className="mb-[24px] text-[28px] font-extrabold md:text-[36px]">Як оплатити послуги</h2>
        <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
          {payments.map((p) => (
            <div key={p.title} className="flex items-start gap-[16px] rounded-[20px] p-[22px]" style={cardStyle}>
              <Icon>{p.icon}</Icon>
              <div>
                <h3 className="text-[17px] font-bold">{p.title}</h3>
                <p className="mt-[6px] text-[14px] leading-[1.55] text-white/70">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1170px] px-4 pt-[56px] md:pt-[80px]" aria-labelledby="faq-title">
        <h2 id="faq-title" className="mb-[24px] text-[28px] font-extrabold md:text-[36px]">Часті запитання абонентів</h2>
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

      {/* CTA */}
      <section className="mx-auto max-w-[1170px] px-4 pb-[80px] pt-[56px] md:pb-[100px] md:pt-[80px]">
        <div className="relative overflow-hidden rounded-[28px] px-[24px] py-[40px] md:px-[56px] md:py-[52px]" style={{ background: 'linear-gradient(120deg, #00B3DC 0%, #0A7FB8 55%, #1B4F86 100%)' }}>
          <div className="pointer-events-none absolute -right-[80px] -top-[80px] h-[280px] w-[280px] rounded-full bg-white/10" aria-hidden="true" />
          <div className="relative flex flex-col gap-[24px] md:flex-row md:items-center md:justify-between">
            <div>
              <p className="m-0 text-[26px] font-extrabold leading-tight md:text-[32px]">Ще не підключені?</p>
              <p className="m-0 mt-[8px] text-[16px] text-white/85 md:text-[18px]">
                Оптичний інтернет GPON від {config.internetPrice} грн/міс для нових абонентів.
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
