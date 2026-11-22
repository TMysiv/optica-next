'use client';
import { useConnectModal } from '@/components/ConnectModal/ConnectModalProvider';
import Image from 'next/image';
import Link from 'next/link';
import { TariffWithCover, tariffService } from '@/lib/tariffs';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDC00]';

export const TariffPlanCard = ({ tariff, highlighted = false }: { tariff: TariffWithCover; highlighted?: boolean }) => {
  const { openConnect } = useConnectModal();

  const handleConnect = () => {
    openConnect({ service: tariffService(tariff.name) });
  };

  return (
    <article
      aria-label={`Тариф ${tariff.name}, ${tariff.price} грн/міс`}
      className={`group relative flex flex-col overflow-hidden rounded-[28px] transition-transform duration-300 hover:-translate-y-[4px]`}
      style={{
        background: highlighted ? 'linear-gradient(180deg, #2E4A70 0%, #263F60 100%)' : '#2C4362',
        boxShadow: highlighted
          ? '0 0 0 2px #FFDC00, 0 24px 60px -20px rgba(255,220,0,0.35)'
          : '0 0 0 1px rgba(0,179,220,0.3), 0 24px 60px -30px rgba(0,179,220,0.45)',
      }}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={tariff.cover}
          alt={tariff.coverAlt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60px]" style={{ background: 'linear-gradient(180deg, transparent, rgba(38,63,96,0.9))' }} />
        {tariff.badge && (
          <span className={`absolute right-[16px] top-[16px] rounded-full px-[12px] py-[5px] text-[13px] font-bold ${highlighted ? 'bg-[#FFDC00] text-[#233955]' : 'bg-[#00B3DC] text-white'}`}>
            {tariff.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-[24px] pb-[28px] pt-[8px] md:px-[28px]">
        <p className="text-[12px] font-semibold uppercase tracking-[1.5px] text-[#7FE3FF]">{tariff.kind}</p>
        <h3 className="mt-[6px] text-[28px] font-extrabold leading-[1.1] text-white">
          {/* Stretched link: its ::after covers the whole card, so the entire card opens the tariff page */}
          <Link
            href={`/taryfy/${tariff.slug}`}
            className="text-white no-underline transition-colors group-hover:text-[#00B3DC] after:absolute after:inset-0 after:z-[1] after:content-['']"
          >
            {tariff.name}
          </Link>
        </h3>

        <p className="mt-[16px] flex items-baseline gap-[8px]">
          {tariff.priceFrom && <span className="text-[17px] font-medium text-white/60">від</span>}
          <span className="bg-gradient-to-r from-[#FFDC00] to-[#FCD246] bg-clip-text text-[60px] font-extrabold leading-none tracking-[-0.03em] text-transparent">
            {tariff.price}
          </span>
          <span className="text-[17px] font-semibold text-white/80">грн/міс</span>
        </p>
        {/* Always reserve this line so lists and buttons line up across cards */}
        <p className="mt-[8px] min-h-[40px] text-[13px] leading-[1.5] text-white/55">
          {tariff.extraPrice && <>Ціна відома на 2 роки · з 13-го місяця — {tariff.extraPrice} грн/міс</>}
        </p>

        <ul className="mt-[20px] flex flex-col gap-[12px] border-t border-white/10 pt-[20px]">
          {tariff.description.map((item) => (
            <li key={item} className="flex gap-[12px] text-[15px] leading-[1.45] text-white/80">
              <svg aria-hidden="true" className="mt-[2px] h-[18px] w-[18px] flex-shrink-0" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="9" fill="#00B3DC" fillOpacity="0.2" />
                <path d="M5 9.2l2.6 2.6L13 6.4" stroke="#7FE3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-[28px]">
          <button
            type="button"
            onClick={handleConnect}
            className={`relative z-[2] w-full cursor-pointer rounded-[14px] py-[16px] text-[17px] font-bold uppercase transition-colors duration-200 ${focusRing} ${
              highlighted
                ? 'bg-[#FFDC00] text-[#233955] hover:bg-[#00B3DC] hover:text-white'
                : 'bg-[#00B3DC] text-white hover:bg-[#FFDC00] hover:text-[#233955]'
            }`}
          >
            Підключити
          </button>
          <Link
            href={`/taryfy/${tariff.slug}`}
            aria-label={`Детальніше про тариф ${tariff.name}`}
            className={`mt-[12px] block w-full py-[6px] text-center text-[14px] font-medium text-white/70 underline underline-offset-4 transition-colors hover:text-white ${focusRing}`}
          >
            Детальніше про тариф
          </Link>
        </div>
      </div>

    </article>
  );
};
