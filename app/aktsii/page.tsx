import type { Metadata } from 'next';
import Link from 'next/link';
import { config } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Акції Укртелеком — Приведи друга і отримай 400 грн',
  description: 'Актуальні акції від Укртелеком. Приведи друга — отримай 400 грн бонусу після його підключення до GPON інтернету.',
  alternates: { canonical: `${config.domain}/aktsii` },
  openGraph: {
    type: 'website',
    url: `${config.domain}/aktsii`,
    title: 'Акції Укртелеком — Приведи друга і отримай 400 грн',
    description: 'Приведи друга і отримай 400 грн після його підключення до GPON інтернету від Укртелеком.',
    images: [{ url: '/images/desktop-banner.webp', width: 1200, height: 630, alt: 'Акції Укртелеком — Приведи друга і отримай 400 грн' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Акції Укртелеком — Приведи друга і отримай 400 грн',
    description: 'Приведи друга і отримай 400 грн після його підключення до GPON інтернету від Укртелеком.',
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

const promotionSchema = {
  '@context': 'https://schema.org',
  '@type': 'SpecialAnnouncement',
  name: 'Акція «Приведи друга» від Укртелеком',
  text: 'Порекомендуй GPON інтернет від Укртелеком другу. Після його підключення отримай 400 грн бонусу на особистий рахунок. Без обмежень по кількості друзів.',
  category: 'https://www.wikidata.org/wiki/Q12004',
  datePosted: '2024-01-01',
  announcementLocation: { '@type': 'Organization', name: 'Укртелеком', url: config.domain },
};

const steps = [
  {
    number: '01',
    title: 'Порекомендуй другу',
    description: 'Розкажи другу або сусіду про GPON інтернет від Укртелеком і попроси вказати твоє ім\'я при підключенні.',
  },
  {
    number: '02',
    title: 'Друг підключується',
    description: 'Друг залишає заявку та підключає будь-який тариф GPON інтернету від Укртелеком.',
  },
  {
    number: '03',
    title: 'Отримай 400 грн',
    description: 'Після успішного підключення друга ти отримуєш 400 грн бонусу на свій особистий рахунок.',
  },
];

export default function AktsiiPage() {
  return (
    <main className="min-h-screen" style={{ background: '#233955' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(promotionSchema) }} />

      {/* Хедер сторінки */}
      <div className="max-w-[1170px] mx-auto px-4 pt-[60px] pb-[48px]">
        <Link
          href="/"
          className="flex w-fit items-center gap-2 text-white/50 hover:text-white text-[14px] no-underline transition-colors mb-[40px] group"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          На головну
        </Link>

        <span className="inline-block text-[11px] font-semibold uppercase tracking-[1.5px] px-[10px] py-[4px] rounded-full border mb-[20px] bg-[rgba(0,179,220,0.15)] text-[#00B3DC] border-[rgba(0,179,220,0.3)]">
          Акції
        </span>
        <h1 className="text-white text-[42px] md:text-[56px] font-bold leading-tight mb-[16px]">
          Поточні акції
        </h1>
        <p className="text-white/50 text-[16px] md:text-[18px] leading-relaxed max-w-[600px]">
          Вигідні пропозиції для наших абонентів та їхніх друзів
        </p>
      </div>

      {/* Список акцій */}
      <div className="max-w-[1170px] mx-auto px-4 pb-[80px]">

        {/* Акція: Приведи друга */}
        <article
          className="rounded-[24px] overflow-hidden"
          style={{ border: '1px solid rgba(0,179,220,0.25)', background: 'linear-gradient(135deg, rgba(0,179,220,0.08) 0%, rgba(0,179,220,0.02) 100%)' }}
        >
          {/* Шапка акції */}
          <div className="p-[40px_40px_32px] md:p-[48px_56px_40px]">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-[24px]">
              <div className="max-w-[600px]">
                <span className="inline-block text-[11px] font-semibold uppercase tracking-[1.5px] px-[10px] py-[4px] rounded-full border mb-[16px] bg-[rgba(255,220,0,0.1)] text-[#FFDC00] border-[rgba(255,220,0,0.3)]">
                  Активна акція
                </span>
                <h2 className="text-white text-[32px] md:text-[40px] font-bold leading-tight mb-[16px]">
                  Приведи друга
                </h2>
                <p className="text-white/65 text-[16px] leading-[1.7]">
                  Порекомендуй GPON інтернет від Укртелеком своєму другу, сусіду або родичу.
                  Після того, як він підключиться — ти отримуєш <strong className="text-white">400 грн</strong> бонусу
                  на свій особистий рахунок. Без обмежень по кількості друзів.
                </p>
              </div>

              {/* Бонус */}
              <div
                className="flex-shrink-0 rounded-[20px] p-[28px_32px] text-center min-w-[180px]"
                style={{ background: 'linear-gradient(135deg, rgba(255,220,0,0.15) 0%, rgba(255,220,0,0.05) 100%)', border: '1px solid rgba(255,220,0,0.3)' }}
              >
                <p className="text-white/50 text-[13px] uppercase tracking-[1px] mb-[8px]">Твій бонус</p>
                <p className="text-[#FFDC00] text-[56px] font-bold leading-none mb-[4px]">400</p>
                <p className="text-[#FFDC00] text-[20px] font-semibold">грн</p>
              </div>
            </div>
          </div>

          {/* Як це працює */}
          <div
            className="px-[40px] py-[36px] md:px-[56px]"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            <h3 className="text-white/50 text-[12px] font-semibold uppercase tracking-[1.5px] mb-[28px]">
              Як отримати бонус
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-[16px]">
                  <span
                    className="flex-shrink-0 w-[40px] h-[40px] rounded-full flex items-center justify-center text-[13px] font-bold text-[#00B3DC]"
                    style={{ background: 'rgba(0,179,220,0.12)', border: '1px solid rgba(0,179,220,0.25)' }}
                  >
                    {step.number}
                  </span>
                  <div>
                    <p className="text-white text-[15px] font-semibold mb-[6px]">{step.title}</p>
                    <p className="text-white/50 text-[14px] leading-[1.6]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Умови та CTA */}
          <div
            className="px-[40px] py-[32px] md:px-[56px] flex flex-col md:flex-row md:items-center md:justify-between gap-[20px]"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-white/35 text-[13px] leading-[1.6] max-w-[500px]">
              Акція діє для фізичних осіб. Друг має бути новим абонентом Укртелеком і підключитися
              на будь-який тарифний план GPON інтернету. Бонус нараховується після активації послуги.
            </p>
            <Link
              href="/#form-section"
              className="flex-shrink-0 no-underline inline-block px-[36px] py-[16px] rounded-[12px] font-medium bg-[#00B3DC] text-white text-[16px] text-center hover:bg-[#FFDC00] hover:text-black transition-all duration-200"
            >
              Підключитись зараз
            </Link>
          </div>
        </article>

      </div>

      {/* CTA */}
      <div
        className="py-[60px]"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.15)' }}
      >
        <div className="max-w-[600px] mx-auto px-4 text-center">
          <p className="text-white text-[20px] font-semibold mb-[8px]">Є запитання щодо акцій?</p>
          <p className="text-white/50 text-[14px] mb-[24px]">Зателефонуйте нам або залиште заявку — ми все пояснимо</p>
          <Link
            href="/#form-section"
            className="inline-block no-underline px-[40px] py-[16px] rounded-[12px] font-medium bg-[#00B3DC] text-white text-[20px] hover:bg-[#FFDC00] hover:text-black transition-all duration-200"
          >
            Залишити заявку
          </Link>
        </div>
      </div>
    </main>
  );
}
