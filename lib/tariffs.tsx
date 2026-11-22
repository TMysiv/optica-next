import { MarketingFTTx } from '@/descriptions/MarketingFTTx';
import { OptimaDualOffer } from '@/descriptions/OptimaDualOffer';
import { MaxDualOffer } from '@/descriptions/MaxDualOffer';
import { Tariff } from '@/lib/types';
import { config } from '@/lib/config';

export type TariffWithCover = Tariff & {
  slug: string;
  summary: string;
  cover: string;
  coverAlt: string;
  kind: string;
  badge?: string;
  /** Show «від» before the price */
  priceFrom?: boolean;
  keyTerms: { title: string; text: string }[];
};

export const tariffs: TariffWithCover[] = [
  {
    id: 1,
    slug: 'internet-1-gbit',
    name: '1 Гбіт/с',
    summary: `Гігабітний інтернет Укртелеком: енергонезалежна оптика GPON до 1 Гбіт/с від ${config.internetPrice} грн/міс. Ціна відома на 2 роки.`,
    img: '/images/gpon.svg',
    cover: '/images/promos/internet.svg',
    coverAlt: 'Оптичний інтернет GPON 1 Гбіт/с від Укртелеком',
    kind: 'Інтернет',
    price: config.internetPrice,
    priceFrom: true,
    extraPrice: 'від 200',
    modalElement: <MarketingFTTx />,
    description: ['Енергонезалежна оптика до 96 годин', 'Можливість оренди гігабітного роутера'],
    keyTerms: [
      { title: 'Ціна', text: `1–12 місяць — ${config.internetPrice} грн/міс, 13–24 місяць — 200 грн/міс. З 25-го місяця — за стандартним тарифним планом.` },
      { title: 'Швидкість', text: 'До 1 Гбіт/с (оптика FTTH).' },
      { title: 'Хто може підключити', text: 'Нові абоненти, які не користувались інтернетом Укртелеком останні 90 днів.' },
      { title: 'Обладнання', text: 'Оптичний термінал (ONU) — 1 грн/міс. Роутер можна купити або взяти в оренду.' },
      { title: 'Термін акції', text: 'До 31.12.2026, в обмеженій кількості населених пунктів.' },
    ],
  },
  {
    id: 2,
    slug: 'optymalnyi-duet',
    name: 'Оптимальний дует',
    summary: 'Оптичний інтернет GPON та MEGOGO TV в одному пакеті за 400 грн/міс: матчі збірної України, Disney, Paramount і TV на пʼяти пристроях.',
    img: '/images/gpon-megogo.svg',
    cover: '/images/promos/tv.svg',
    coverAlt: 'Тариф Оптимальний дует — інтернет та MEGOGO TV від Укртелеком',
    kind: 'Інтернет + MEGOGO TV',
    badge: 'Популярний',
    price: '400',
    modalElement: <OptimaDualOffer />,
    description: ['Енергонезалежна оптика до 96 годин', 'Матчі збірної України', 'Преміальний контент Disney, Paramount', "TV на п'яти пристроях"],
    keyTerms: [
      { title: 'Ціна', text: '400 грн/міс за інтернет і MEGOGO TV разом. Ціна діє лише при користуванні обома послугами.' },
      { title: 'Що входить', text: 'Оптичний інтернет та MEGOGO TV за тарифом «Оптимальний».' },
      { title: 'Швидкість', text: 'До 1 Гбіт/с (FTTH) або до 100 Мбіт/с (FTTB) — залежно від адреси.' },
      { title: 'Хто може підключити', text: 'Нові абоненти без заборгованості за послуги Укртелеком.' },
      { title: 'Обладнання', text: 'Оптичний термінал (ONU) — 1 грн/міс. Роутер можна купити або взяти в оренду.' },
      { title: 'Строк акції', text: 'Замовлення до 31.12.2026, підключення до 15.01.2027.' },
    ],
  },
  {
    id: 3,
    slug: 'maksymalnyi-duet',
    name: 'Максимальний дует',
    summary: 'Оптичний інтернет GPON та MEGOGO TV з максимумом спорту за 600 грн/міс: Ліга Чемпіонів, Ліга Європи, Ліга націй, HBO Max, Warner Bros.',
    img: '/images/gpon-megogo.svg',
    cover: '/images/promos/sport.svg',
    coverAlt: 'Тариф Максимальний дует — інтернет, MEGOGO TV та спорт від Укртелеком',
    kind: 'Інтернет + MEGOGO TV',
    badge: 'Максимум спорту',
    price: '600',
    modalElement: <MaxDualOffer />,
    description: ['Енергонезалежна оптика до 96 годин', 'Ліга Чемпіонів, Ліга Європи, Ліга націй та інші ТОПові спортивні події 2026 року!', 'Преміальний контент Disney, Paramount, Warner.Bros, HBO Max', "TV на п'яти пристроях"],
    keyTerms: [
      { title: 'Ціна', text: '600 грн/міс за інтернет і MEGOGO TV разом. Ціна діє лише при користуванні обома послугами.' },
      { title: 'Що входить', text: 'Оптичний інтернет та MEGOGO TV за тарифом «Максимальний».' },
      { title: 'Швидкість', text: 'До 1 Гбіт/с (FTTH) або до 100 Мбіт/с (FTTB) — залежно від адреси.' },
      { title: 'Хто може підключити', text: 'Нові абоненти без заборгованості за послуги Укртелеком.' },
      { title: 'Обладнання', text: 'Оптичний термінал (ONU) — 1 грн/міс. Роутер можна купити або взяти в оренду.' },
      { title: 'Строк акції', text: 'Замовлення до 31.12.2026, підключення до 15.01.2027.' },
    ],
  },
];

export const tariffService = (name: string) => (name === '1 Гбіт/с' ? 'Інтернет' : name);

export const getTariffBySlug = (slug: string) => tariffs.find((t) => t.slug === slug);
