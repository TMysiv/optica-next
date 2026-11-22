'use client';
import { useConnectModal } from '@/components/ConnectModal/ConnectModalProvider';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { CustomButton } from '@/components/Custom/CustomButton';
import Link from 'next/link';

interface Props {
  id: number;
  name: string;
  img: string;
  price: string;
  description: string[];
  extraPrice?: string;
  cover?: string;
  coverAlt?: string;
  slug?: string;
}

export const TariffsCard = ({ id, img, name, price, description, extraPrice, cover, coverAlt, slug }: Props) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down(1201));

  const { openConnect } = useConnectModal();

  const handleClick = () => {
    openConnect({ service: name === '1 Гбіт/с' ? 'Інтернет' : name });
  };

  const imgAlt = name === '1 Гбіт/с'
    ? 'Підключити інтернет GPON 1 Гбіт/с — Укртелеком'
    : `Тариф ${name} — інтернет + MEGOGO від Укртелеком`;

  return (
    <article
      aria-label={`Тариф ${name}, ${price} грн/міс`}
      className="max-w-[377px] w-full rounded-[30px] overflow-hidden p-[36px_32px] relative box-border shadow-[0_0_31.1px_13px_rgba(0,179,220,0.11)_inset_0_0_0_1px_#00B3DC] tariff-item flex flex-col group transition-transform duration-300 hover:-translate-y-[4px]"
    >
      {cover && (
        <div className="tariff-cover">
          <img src={cover} alt={coverAlt ?? imgAlt} loading="lazy" width={1200} height={675} />
        </div>
      )}
      <Box className="tariff-type">
        <img src={img} alt={imgAlt} className="block h-full w-auto" loading="lazy" width={120} height={60} />
      </Box>
      <h3 className="tariff-name text-white text-[38px] font-bold not-italic leading-[0.89] m-0 py-[20px] pb-[27px] h-[125px]">
        {slug ? (
          // Stretched link: its ::after covers the whole card, so the entire card opens the tariff page
          <Link
            href={`/taryfy/${slug}`}
            className="text-white no-underline transition-colors group-hover:text-[#7FE3FF] after:absolute after:inset-0 after:z-[1] after:content-['']"
          >
            {name}
          </Link>
        ) : name}
      </h3>

      <Box className="tariff-description max-w-[313px]">
        {description.map((desc, index) => (
          <Box key={index}>
            {desc.includes('до 96 годин') ? (
              <>{desc.replace('до 96 годин', '')}<br />до 96 годин</>
            ) : desc}
          </Box>
        ))}
        {extraPrice && (
          <Box>Відома ціна на 2 роки!<br />Ціна на 2-й рік – <span>{extraPrice}</span> грн/міс.</Box>
        )}
      </Box>

      <Box className="mt-auto">
        <Box
          className="tarrif-price mb-[29px] text-center block font-semibold not-italic bg-gradient-to-r from-[#FFDC00] via-[#FCD246] to-[#FFDC00] bg-clip-text text-transparent"
          data-price={price}
          data-currency="UAH"
        >
          <span className="text-center text-[68px] h-[68px] leading-[0.87] block mb-[1px]">{price}</span>
          <small className="text-center text-[22px] leading-[0.89] block">грн/міс.</small>
        </Box>

        <CustomButton
          text="ПІДКЛЮЧИТИ"
          width={!isMd ? 312 : 266}
          className="relative z-[2] rounded-[12px] bg-[#00B3DC] h-[60px] text-white text-center text-[20px] font-medium not-italic leading-[0.97] uppercase tariff-btn hover:bg-yellow-850 hover:text-black"
          handleClick={handleClick}
        />

        {slug && (
          <Link
            href={`/taryfy/${slug}`}
            className="block mx-auto mt-[12px] text-center text-[14px] font-medium not-italic leading-[0.97] text-white underline cursor-pointer"
            aria-label={`Детальніше про тариф ${name}`}
          >
            Детальніше
          </Link>
        )}
      </Box>

    </article>
  );
};
