import { Banner } from '@/components/Banner/Banner';
import { Tariffs } from '@/components/Tariffs/Tariffs';
import { Equipments } from '@/components/Equipments/Equipments';
import { Reviews } from '@/components/Reviews/Reviews';
import { Form } from '@/components/Form/Form';
import { Footer } from '@/components/Footer/Footer';

const SITE_URL = process.env.NEXT_PUBLIC_SITE ?? 'https://yourdomain.com';

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Укртелеком',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/logo.svg`,
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <div className="overflow-hidden">
        <Banner />
        <Tariffs />
        <h2 className="equipment-h text-white text-center text-[48px] font-semibold leading-[89%] mb-[49px]">
          Обладнання для оптичного
          <strong className="block mt-[14px] font-bold leading-[89%] uppercase bg-[linear-gradient(94deg,_#FFDC00_-0.62%,_#FFDC00_39.09%,_#FCD246_53.73%,_#FFDC00_74.6%)] bg-clip-text text-transparent">
            інтернету GPON
          </strong>
        </h2>
        <Equipments />
        <Reviews />
        <h2 className="form-t max-w-[440px] text-white text-center text-[40px] font-bold leading-[117.5%] mt-[133px] mb-[51px] mx-auto uppercase">
          Підключіть інтернет зараз
        </h2>
        <Form />
        <Footer />
      </div>
    </>
  );
}
