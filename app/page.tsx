import { Banner } from '@/components/Banner/Banner';
import { Tariffs } from '@/components/Tariffs/Tariffs';
import { Stats } from '@/components/Stats/Stats';
import { FAQ } from '@/components/FAQ/FAQ';
import { NoLightSection } from '@/components/NoLightSection/NoLightSection';
import { HowToConnect } from '@/components/HowToConnect/HowToConnect';
import type { Metadata } from 'next';
import { config } from '@/lib/config';
import { pageMetadata } from '@/lib/seo';
import { tariffs } from '@/lib/tariffs';
import { homeFaqs } from '@/lib/homeFaq';

export const metadata: Metadata = pageMetadata({
  title: `Підключити інтернет Укртелеком GPON | від ${config.internetPrice} грн/міс`,
  description: `Домашній інтернет Укртелеком: оптоволокно GPON до 1 Гбіт/с, що працює до 96 годин без світла. Від ${config.internetPrice} грн/міс — залиште заявку онлайн.`,
  path: '/',
  imageAlt: 'Підключити GPON інтернет від Укртелеком',
});

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
    itemListElement: tariffs.map((t) => ({
      '@type': 'Offer',
      name: t.name,
      description: t.summary,
      price: t.price,
      priceCurrency: 'UAH',
      url: `${config.domain}/taryfy/${t.slug}`,
    })),
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Укртелеком — оптичний інтернет GPON',
  url: `${config.domain}/`,
  inLanguage: 'uk',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <div className="overflow-hidden">
        <Banner />
        <Tariffs />
        <NoLightSection />
        <Stats />
        <HowToConnect />
        <FAQ />
      </div>
    </>
  );
}
