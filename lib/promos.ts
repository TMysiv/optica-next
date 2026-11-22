import { config } from '@/lib/config';

export type Promo = {
  slug: string;
  title: string;
  description?: string;
  /** Path to an image in /public, e.g. '/images/promos/optic.webp' */
  image: string;
  imageAlt: string;
  price: number;
  unit?: string;
  badge?: string;
  validUntil?: string;
  schemaName?: string;
  /** Detailed description paragraphs for the promo page */
  content?: string[];
  conditions: {
    title: string;
    text: string;
  }[];
};

export const promos: Promo[] = [
  {
    slug: 'optychnyi-internet',
    title: 'Оптичний Енергонезалежний Інтернет',
    schemaName: 'Оптичний інтернет від Укртелеком',
    description: `Оптичний інтернет GPON до 1 Гбіт/с за ${config.internetPrice} грн/міс`,
    image: '/images/promos/internet.svg',
    imageAlt: 'Оптичний енергонезалежний інтернет від Укртелеком',
    price: Number(config.internetPrice),
    content: [
      'Оптичний інтернет GPON від Укртелеком — це швидкість до 1 Гбіт/с та енергонезалежна мережа, яка працює до 96 годин без світла.',
    ],
    conditions: [
      {
        title: 'Мінімальний акційний тариф',
        text: `Мінімальний акційний тариф на інтернет від Укртелеком складає ${config.internetPrice} грн/міс.`,
      },
      {
        title: 'Хто може підключитись',
        text: 'Підключення до інтернету від Укртелеком за акційними тарифами доступне лише для фізичних осіб, які не були користувачами послуги інтернет від Укртелеком за останні 90 днів та за наявності технічної можливості підключення.',
      },
      {
        title: 'Перелік населених пунктів',
        text: 'Перелік населених пунктів, у яких здійснюється підключення до інтернету від Укртелеком за акційними тарифами, може змінюватись.',
      },
    ],
  },
  {
    slug: 'internet-megogo-tv',
    title: 'Оптичний Енергонезалежний Інтернет + MEGOGO TV',
    description: 'Оптичний інтернет GPON до 1 Гбіт/с і телебачення MEGOGO TV в одному пакеті',
    image: '/images/promos/tv.svg',
    imageAlt: 'Інтернет та телебачення MEGOGO від Укртелеком',
    price: 400,
    content: [
      'Комплекс послуг: оптичний інтернет GPON від Укртелеком зі швидкістю до 1 Гбіт/с та телебачення MEGOGO TV.',
    ],
    conditions: [
      {
        title: 'Мінімальний акційний тариф',
        text: 'Мінімальний акційний тариф на комплекс послуг інтернет від Укртелеком та MEGOGO TV складає 400 грн/міс.',
      },
      {
        title: 'Хто може підключитись',
        text: 'Підключення до інтернету від Укртелеком та MEGOGO TV за акційними тарифами доступне лише для фізичних осіб, які не були користувачами послуги інтернет від Укртелеком за останні 90 днів та за наявності технічної можливості підключення.',
      },
      {
        title: 'Перелік населених пунктів',
        text: 'Перелік населених пунктів, у яких здійснюється підключення до інтернету від Укртелеком за акційними тарифами, може змінюватись.',
      },
    ],
  },
];

export function getPromoBySlug(slug: string): Promo | undefined {
  return promos.find((p) => p.slug === slug);
}

export function formatPromoDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
}
