import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/lib/theme';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE ?? 'https://yourdomain.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Підключити інтернет до 1 Гбіт/с | Укртелеком GPON',
  description:
    'Підключи оптичний інтернет GPON від Укртелеком — до 1 Гбіт/с, енергонезалежний до 96 годин. Тариф від 99 грн/міс. Залиш заявку онлайн!',
  keywords: 'підключити інтернет, інтернет провайдер Україна, GPON оптика, Укртелеком інтернет, 1 гбіт інтернет',
  alternates: {
    canonical: SITE_URL,
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Укртелеком',
    locale: 'uk_UA',
    title: 'Підключити інтернет до 1 Гбіт/с | Укртелеком GPON',
    description: 'Оптичний інтернет GPON від Укртелеком — до 1 Гбіт/с, енергонезалежний до 96 годин. Тариф від 99 грн/міс.',
    images: [{ url: '/images/desktop-banner.webp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Підключити інтернет до 1 Гбіт/с | Укртелеком',
    description: 'Оптичний інтернет GPON від Укртелеком — до 1 Гбіт/с, від 99 грн/міс.',
    images: ['/images/desktop-banner.webp'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
