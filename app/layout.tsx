import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { GoogleTagManager } from '@next/third-parties/google';
import theme from '@/lib/theme';
import { config } from '@/lib/config';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(config.domain),
  title: 'Підключити інтернет до 1 Гбіт/с | Укртелеком GPON',
  description:
    'Підключи оптичний інтернет GPON від Укртелеком — до 1 Гбіт/с, енергонезалежний до 96 годин. Тариф від 99 грн/міс. Залиш заявку онлайн!',
  keywords: 'підключити інтернет, інтернет провайдер Україна, GPON оптика, Укртелеком інтернет, 1 гбіт інтернет',
  alternates: {
    canonical: config.domain,
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: config.domain,
    siteName: 'Укртелеком',
    locale: 'uk_UA',
    title: 'Підключити інтернет до 1 Гбіт/с | Укртелеком GPON',
    description: 'Оптичний інтернет GPON від Укртелеком — до 1 Гбіт/с, енергонезалежний до 96 годин. Тариф від 99 грн/міс.',
    images: [{ url: '/images/desktop-banner.webp', width: 1200, height: 630, alt: 'Підключити GPON інтернет від Укртелеком' }],
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
      {config.gtmId && <GoogleTagManager gtmId={config.gtmId} />}
      <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
