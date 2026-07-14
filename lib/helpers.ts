import { DefaultValidationErrors, ValidationErrors } from './types';

export const services = [
  { id: 1, value: 'Інтернет' },
  { id: 2, value: 'Оптимальний дует' },
  { id: 3, value: 'Максимальний дует' },
];

export const speeds = [
  { id: 1, value: '1000 МБіт/с' },
];

export const houseTypes = [
  { id: 1, value: 'В квартиру' },
  { id: 2, value: 'В будинок' },
];

export function beautifyErrors<T = DefaultValidationErrors>(yupErrors: any): ValidationErrors<T> {
  if (!yupErrors.inner || !Array.isArray(yupErrors.inner)) return {};

  const entries = yupErrors.inner
    .filter((e: any) => e.path)
    .map((e: any) => [e.path, e.message] as const);

  return Object.fromEntries(entries) as ValidationErrors<T>;
}

export const regions = [
  'Вінницька',
  'Волинська',
  'Дніпропетровська',
  'Донецька',
  'Житомирська',
  'Закарпатська',
  'Запорізька',
  'Івано-Франківська',
  'Київська',
  'Кіровоградська',
  'Львівська',
  'Миколаївська',
  'Одеська',
  'Полтавська',
  'Рівненська',
  'Сумська',
  'Тернопільська',
  'Харківська',
  'Херсонська',
  'Хмельницька',
  'Черкаська',
  'Чернівецька',
  'Чернігівська',
];

export const reviews = [
  {
    id: 1,
    name: 'Олена Коваленко',
    city: 'Київ',
    rating: 5,
    text: 'Підключились два місяці тому. Швидкість стабільна, під час відключення світла інтернет працював — це просто рятівник для роботи вдома.',
    date: 'Червень 2026',
    isoDate: '2026-06-01',
    avatar: 'О',
  },
  {
    id: 2,
    name: 'Максим Сидоренко',
    city: 'Харків',
    rating: 5,
    text: 'Перейшов з іншого провайдера. Різниця відчутна — 1 Гбіт реально 1 Гбіт, не "до 1 Гбіт". Майстер приїхав швидко, все налаштував.',
    date: 'Червень 2026',
    isoDate: '2026-06-15',
    avatar: 'М',
  },
  {
    id: 3,
    name: 'Тетяна Мельник',
    city: 'Львів',
    rating: 5,
    text: 'Взяли тариф з MEGOGO — дуже вигідно. Дітям є що дивитись, якість відео відмінна. Ціна на 2 роки фіксована — це великий плюс в наш час.',
    date: 'Травень 2026',
    isoDate: '2026-05-20',
    avatar: 'Т',
  },
];

export const stats = [
  { value: '25+', label: 'років на ринку', icon: '🏆' },
  { value: '1M+', label: 'клієнтів в Україні', icon: '👥' },
  { value: '96год', label: 'енергонезалежність', icon: '⚡' },
  { value: '1', label: 'Гбіт/с швидкість', icon: '🚀' },
];

export const footerNavItems = [
  { label: 'Тарифи', id: 'tarrif-section' },
  { label: 'Обладнання', id: 'equipment-section' },
  { label: 'Відгуки', id: 'reviews-section' },
  { label: 'Підключитись', id: 'form-section' },
  { label: 'Акції', id: '', href: '/aktsii' },
  { label: 'Блог', id: '', href: '/blog' },
];

export const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/ukrtelecom' },
  { label: 'Instagram', href: 'https://www.instagram.com/ukrtelecom_official' },
  { label: 'YouTube', href: 'https://www.youtube.com/@theukrtelecom' },
];

export const legalLinks = [
  { label: 'Публічна оферта', href: 'http://google.com' },
  { label: 'Політика конфіденційності', href: 'http://google.com' },
];
