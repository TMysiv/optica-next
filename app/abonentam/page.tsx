'use client';
import { useState } from 'react';
import Link from 'next/link';
import { config } from '@/lib/config';

const contacts = [
  {
    label: 'Контакт-центр (гаряча лінія)',
    lines: [
      'Оператори на лінії з 8:00 до 22:00. В інші години — автовідповідач.',
      'Для фізичних осіб: 0800 506 800 або 044 440 0000 (безкоштовно з мобільних та стаціонарних телефонів)',
      'Для юридичних осіб: 0800 506 801',
    ],
  },
  {
    label: 'Чат-боти',
    lines: ['Допомога у Viber або Telegram. Для авторизації потрібен номер особового рахунку (16 цифр).'],
    links: [
      { label: 'Viber', href: 'viber://chat?number=380800506800' },
      { label: 'Telegram', href: 'https://t.me/ukrtelecom_bot' },
    ],
  },
  {
    label: 'Офіційний сайт',
    lines: ['Розділ «Допомога» на сайті ukrtelecom.ua.'],
    links: [{ label: 'ukrtelecom.ua', href: 'https://ukrtelecom.ua' }],
  },
  {
    label: 'Центри обслуговування',
    lines: ['Адреси та графік роботи центрів обслуговування — на офіційному сайті Укртелеком.'],
    links: [{ label: 'Знайти центр', href: 'https://ukrtelecom.ua/about/contacts' }],
  },
];

const faqs = [
  {
    question: 'Як звернутись в Укртелеком за допомогою',
    answer: (
      <div className="flex flex-col gap-[16px]">
        <p className="text-white/70 text-[15px] leading-[1.6] m-0">
          Є декілька способів звернутись в Укртелеком за допомогою або з питаннями:
        </p>
        <ul className="flex flex-col gap-[14px] m-0 p-0 list-none">
          {contacts.map((c, i) => (
            <li key={i}>
              <span className="text-white font-semibold text-[15px]">{c.label}. </span>
              {c.lines.map((line, j) => (
                <span key={j} className="text-white/70 text-[14px] leading-[1.6] block mt-[2px]">{line}</span>
              ))}
            </li>
          ))}
        </ul>
        <p className="text-white/40 text-[13px] leading-[1.6] m-0 mt-[4px]">
          Перед зверненням радимо ознайомитись з відповідями на часті питання нижче або на сайті Укртелеком у розділі «Допомога».
        </p>
      </div>
    ),
  },
  {
    question: 'Що робити, якщо зник інтернет — причини та поради',
    answer: (
      <div className="flex flex-col gap-[10px]">
        <p className="text-white/70 text-[15px] leading-[1.6] m-0">Спочатку перевірте базові речі:</p>
        <ol className="flex flex-col gap-[8px] m-0 pl-[20px]">
          {[
            'Перезавантажте роутер — вимкніть на 30 секунд і ввімкніть знову.',
            'Перевірте індикатори на роутері: має горіти PON або LOS — якщо LOS блимає, проблема на лінії.',
            'Перевірте чи оплачено послугу — заборгованість автоматично блокує доступ.',
            'Якщо є відключення світла — мережа Укртелеком працює до 96 годин від резервного живлення, але роутер потребує окремого живлення.',
            'Якщо нічого не допомогло — зателефонуйте на гарячу лінію 0800 506 800.',
          ].map((step, i) => (
            <li key={i} className="text-white/70 text-[14px] leading-[1.6]">{step}</li>
          ))}
        </ol>
      </div>
    ),
  },
  {
    question: 'Як сплатити за послуги — терміни та способи',
    answer: (
      <div className="flex flex-col gap-[10px]">
        <p className="text-white/70 text-[15px] leading-[1.6] m-0">Оплату за інтернет можна здійснити:</p>
        <ul className="flex flex-col gap-[6px] m-0 pl-[20px]">
          {[
            'У мобільному застосунку Укртелеком або в особистому кабінеті на ukrtelecom.ua',
            'Через Privat24, Monobank або інші банківські застосунки — за реквізитами або номером особового рахунку',
            'У відділеннях Нової Пошти або Укрпошти',
            'Готівкою в центрах обслуговування Укртелеком',
          ].map((item, i) => (
            <li key={i} className="text-white/70 text-[14px] leading-[1.6]">{item}</li>
          ))}
        </ul>
        <p className="text-white/40 text-[13px] mt-[6px] m-0">
          Рекомендується сплачувати не пізніше дати, вказаної в рахунку, щоб уникнути тимчасового блокування.
        </p>
      </div>
    ),
  },
  {
    question: 'Послуга «Кредитний період» — якщо не встигли оплатити',
    answer: (
      <p className="text-white/70 text-[15px] leading-[1.6] m-0">
        Якщо ви не встигли вчасно сплатити, Укртелеком надає послугу «Кредитний період» — короткострокове продовження доступу до інтернету без оплати.
        Активувати можна в особистому кабінеті на ukrtelecom.ua або через контакт-центр <a href="tel:0800506800" className="text-[#00B3DC] hover:text-white transition-colors">0800 506 800</a>.
        Послуга доступна за наявності позитивної історії платежів.
      </p>
    ),
  },
  {
    question: 'Тимчасове призупинення послуги (пауза)',
    answer: (
      <p className="text-white/70 text-[15px] leading-[1.6] m-0">
        Якщо ви тимчасово не користуєтесь інтернетом (відрядження, відпустка), можна призупинити послугу.
        Для цього зверніться до контакт-центру <a href="tel:0800506800" className="text-[#00B3DC] hover:text-white transition-colors">0800 506 800</a> або до центру обслуговування.
        Мінімальний термін паузи та умови уточнюйте у менеджера — вони можуть відрізнятись залежно від тарифного плану.
      </p>
    ),
  },
  {
    question: 'Як змінити тариф або перейти на акційний тариф',
    answer: (
      <p className="text-white/70 text-[15px] leading-[1.6] m-0">
        Зміну тарифу можна оформити в особистому кабінеті на ukrtelecom.ua або зателефонувавши на гарячу лінію <a href="tel:0800506800" className="text-[#00B3DC] hover:text-white transition-colors">0800 506 800</a>.
        Зверніть увагу: акційні тарифи (наприклад, «Ціна — не новина» по 99 грн/міс) діють <strong className="text-white">лише для нових абонентів</strong> при першому підключенні та не поширюються на діючих клієнтів.
      </p>
    ),
  },
];

export default function AbonentamPage() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Головна', item: config.domain },
      { '@type': 'ListItem', position: 2, name: 'Діючим абонентам', item: `${config.domain}/abonentam` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
    })),
  };

  return (
    <main className="min-h-screen" style={{ background: '#233955' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
          Підтримка
        </span>
        <h1 className="text-white text-[42px] md:text-[56px] font-bold leading-tight mb-[16px]">
          Інформація для діючих абонентів
        </h1>
        <p className="text-white/50 text-[16px] md:text-[18px] leading-relaxed max-w-[640px] mb-[48px]">
          Послуги інтернету від Укртелеком — контакти, оплата, налаштування та відповіді на часті запитання
        </p>

        <div className="flex flex-col gap-[10px]">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-[16px] overflow-hidden cursor-pointer transition-colors duration-200"
              style={{
                border: '1px solid rgba(0,179,220,0.25)',
                background: openIndex === idx ? 'rgba(0,179,220,0.08)' : 'rgba(255,255,255,0.04)',
              }}
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            >
              <div className="flex justify-between items-center px-[24px] py-[20px]">
                <h2 className="text-white text-[17px] font-semibold m-0 pr-4 leading-snug">{faq.question}</h2>
                <span
                  className="text-[#00B3DC] text-[28px] font-light flex-shrink-0 leading-none"
                  aria-hidden="true"
                >
                  {openIndex === idx ? '−' : '+'}
                </span>
              </div>
              {openIndex === idx && (
                <div className="px-[24px] pb-[24px]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className="py-[60px]"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.15)' }}
      >
        <div className="max-w-[600px] mx-auto px-4 text-center">
          <p className="text-white text-[20px] font-semibold mb-[8px]">Ще не підключені?</p>
          <p className="text-white/50 text-[14px] mb-[24px]">
            Залиште заявку на нове підключення GPON інтернету від Укртелеком
          </p>
          <Link
            href="/#form-section"
            className="inline-block no-underline px-[40px] py-[16px] rounded-[12px] font-medium bg-[#00B3DC] text-white text-[20px] hover:bg-[#FFDC00] hover:text-black transition-all duration-200"
          >
            Підключитись
          </Link>
        </div>
      </div>
    </main>
  );
}
