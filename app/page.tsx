import { Banner } from '@/components/Banner/Banner';
import { Tariffs } from '@/components/Tariffs/Tariffs';
import { Reviews } from '@/components/Reviews/Reviews';
import { FAQ } from '@/components/FAQ/FAQ';
import { Form } from '@/components/Form/Form';
import { Footer } from '@/components/Footer/Footer';
import { config } from '@/lib/config';

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'TelecommunicationsService'],
  name: 'Укртелеком',
  url: `${config.domain}/`,
  logo: `${config.domain}/images/logo.svg`,
  description: 'Підключення оптичного інтернету GPON до 1 Гбіт/с по всій Україні. Енергонезалежна мережа до 96 годин.',
  areaServed: { '@type': 'Country', name: 'Ukraine' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Тарифи інтернету',
    itemListElement: [
      { '@type': 'Offer', name: '1 Гбіт/с GPON', description: 'Енергонезалежна оптика до 96 годин. Відома ціна на 2 роки.', price: '99', priceCurrency: 'UAH' },
      { '@type': 'Offer', name: 'Оптимальний дует', description: 'Інтернет + MEGOGO. Акція діє 1 рік.', price: '400', priceCurrency: 'UAH' },
      { '@type': 'Offer', name: 'Максимальний дует', description: 'Інтернет + MEGOGO Premium. Ліга Чемпіонів та ТОПовий контент.', price: '550', priceCurrency: 'UAH' },
    ],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Що таке GPON інтернет і чим він відрізняється від звичайного?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GPON (Gigabit Passive Optical Network) — це технологія оптичного інтернету, яка передає дані по скловолокну зі швидкістю до 1 Гбіт/с. На відміну від мідного кабелю, оптика не схильна до перешкод і забезпечує стабільний сигнал на будь-якій відстані від АТС.',
      },
    },
    {
      '@type': 'Question',
      name: 'Скільки часу інтернет від Укртелеком працює при відключенні електроенергії?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Мережеве обладнання Укртелеком має резервне живлення до 96 годин (4 доби). Це означає, що інтернет продовжує працювати навіть під час тривалих відключень світла. Абонентське обладнання (роутер) потрібно забезпечити резервним живленням самостійно.',
      },
    },
    {
      '@type': 'Question',
      name: 'Скільки коштує підключення GPON інтернету від Укртелеком?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Тарифи на GPON інтернет від Укртелеком починаються від 99 грн/місяць за акцією «Ціна — не новина». Ціна фіксована на 2 роки: перші 12 місяців — 99 грн/міс, з 13-го місяця — 200 грн/міс. Підключення здійснюється безкоштовно або за акційною ціною залежно від міста.',
      },
    },
    {
      '@type': 'Question',
      name: 'Як підключити оптичний інтернет GPON від Укртелеком?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Щоб підключити GPON інтернет, залиште заявку на сайті або зателефонуйте до контакт-центру. Вкажіть адресу та зручний час — майстер перевірить технічну можливість і проведе підключення. Весь процес займає від 1 до 5 робочих днів.',
      },
    },
    {
      '@type': 'Question',
      name: 'У яких містах доступне підключення GPON інтернету від Укртелеком?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Укртелеком надає послуги GPON інтернету в більшості міст України: Київ, Харків, Дніпро, Одеса, Запоріжжя, Львів, Чернігів, Черкаси, Вінниця, Рівне, Тернопіль, Хмельницький, Житомир, Чернівці, Івано-Франківськ та інші населені пункти. Наявність технічної можливості залежить від адреси.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="overflow-hidden">
        <Banner />
        <h2 className="form-t max-w-[640px] text-white text-center text-[40px] font-bold leading-[117.5%] mt-[50px] mb-[51px] mx-auto uppercase">
          Залиш заявку на підключення інтернету
        </h2>
        <Form />
        <Tariffs />
        <Reviews />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}
