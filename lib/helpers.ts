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

export const stats = [
  { value: '25+', label: 'років на ринку', icon: '🏆' },
  { value: '1M+', label: 'клієнтів в Україні', icon: '👥' },
  { value: '96год', label: 'енергонезалежність', icon: '⚡' },
  { value: '1', label: 'Гбіт/с швидкість', icon: '🚀' },
];

export const footerNavItems = [
  { label: 'Підключитись', id: '', href: '/pidkliuchennia' },
  { label: 'Акції', id: '', href: '/aktsii' },
  { label: 'Тарифи', id: '', href: '/taryfy' },
  { label: 'Інтернет без світла', id: '', href: '/internet-bez-svitla' },
  { label: 'Діючим абонентам', id: '', href: '/abonentam' },
  { label: 'Блог', id: '', href: '/blog' },
];

export const socials = [
  { label: 'Telegram', href: 'https://t.me/olena_gavrilenko' },
  { label: 'Facebook', href: 'https://www.facebook.com/ukrtelecom' },
  { label: 'Instagram', href: 'https://www.instagram.com/ukrtelecom_official' },
  { label: 'YouTube', href: 'https://www.youtube.com/@theukrtelecom' },
];
