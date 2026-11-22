import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { GoogleTagManager } from '@next/third-parties/google';
import theme from '@/lib/theme';
import { config } from '@/lib/config';
import { ConsultationButton } from '@/components/ConsultationButton/ConsultationButton';
import './globals.css';
import TelegramButton from '@/components/TelegramButton/TelegramButtom';
import ViberButton from '@/components/ViberButton/ViberButton';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { ConnectModalProvider } from '@/components/ConnectModal/ConnectModalProvider';

export const metadata: Metadata = {
  metadataBase: new URL(config.domain),
  title: `Підключити інтернет Укртелеком GPON | від ${config.internetPrice} грн/міс`,
  description: `Підключення оптичного інтернету GPON від Укртелеком: до 1 Гбіт/с, працює до 96 годин без світла, від ${config.internetPrice} грн/міс.`,
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Укртелеком',
    locale: 'uk_UA',
    images: [{ url: '/images/desktop-banner.webp', width: 1200, height: 630, alt: 'Підключити GPON інтернет від Укртелеком' }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
      {config.gtmId && <GoogleTagManager gtmId={config.gtmId} />}
      <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ConnectModalProvider>
              <Header />
              {children}
              <Footer />
              <TelegramButton />
              <ViberButton />
              <ConsultationButton />
            </ConnectModalProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
