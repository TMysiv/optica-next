import { Box } from '@mui/material';
import { TariffsCard } from './TariffsCard';
import { config } from '@/lib/config';
import { tariffs } from '@/lib/tariffs';

const tariffsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Тарифи інтернету Укртелеком',
  description: `Оптичний інтернет GPON від Укртелеком — тарифи від ${config.internetPrice} грн/міс`,
  itemListElement: tariffs.map((tariff, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Product',
      name: `Інтернет ${tariff.name} — Укртелеком GPON`,
      description: tariff.description.join('. '),
      image: `${config.domain}${tariff.img}`,
      offers: {
        '@type': 'Offer',
        price: tariff.price,
        priceCurrency: 'UAH',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'Укртелеком' },
      },
    },
  })),
};

export const Tariffs = () => (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tariffsSchema) }} />
    <h2 className="text-white text-center text-[24px] md:text-[42px] font-bold leading-[117.5%] uppercase mt-[60px] md:mt-[80px] mb-0 px-4">
      Тарифи на інтернет Укртелеком
    </h2>
    <Box
      className="tariff-section flex justify-between relative mx-auto my-[46px] mb-[102px] max-w-[1170px] w-full"
      component="section"
      aria-label="Тарифи інтернету Укртелеком"
      id="tarrif-section"
    >
      <span aria-hidden="true" className="absolute pointer-events-none z-1 ellipse-4" />
      <span aria-hidden="true" className="absolute pointer-events-none z-1 ellipse-5" />
      {tariffs.map(({ modalElement: _modal, ...tariff }) => (
        <TariffsCard key={tariff.id} {...tariff} />
      ))}
    </Box>
  </>
);
