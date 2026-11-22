import Link from 'next/link';
import { config } from '@/lib/config';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDC00]';

/** Call-to-action inside the article text (mobile/tablet; desktop has the sticky sidebar card) */
export const ArticleCta = () => (
  <aside
    aria-label="Підключення інтернету Укртелеком"
    className="relative my-[32px] overflow-hidden rounded-[22px] px-[22px] py-[24px] lg:hidden"
    style={{ background: 'linear-gradient(120deg, #00B3DC 0%, #0A7FB8 55%, #1B4F86 100%)' }}
  >
    <div className="pointer-events-none absolute -right-[60px] -top-[60px] h-[180px] w-[180px] rounded-full bg-white/10" aria-hidden="true" />
    <p className="relative m-0 text-[20px] font-extrabold leading-[1.25] text-white">Інтернет, що працює без світла</p>
    <p className="relative m-0 mt-[6px] text-[15px] leading-[1.5] text-white/85">
      Оптичний GPON до 1 Гбіт/с від <strong className="text-white">{config.internetPrice} грн/міс</strong>. Мережа працює до 96 годин.
    </p>
    <div className="relative mt-[16px] flex flex-wrap gap-[10px]">
      <Link
        href="/pidkliuchennia"
        data-connect-modal
        className={`rounded-[12px] bg-[#FFDC00] px-[20px] py-[12px] text-[15px] font-bold text-[#233955] no-underline transition-colors hover:bg-white ${focusRing}`}
      >
        Залишити заявку
      </Link>
      <Link
        href="/taryfy"
        className={`rounded-[12px] px-[20px] py-[12px] text-[15px] font-bold text-white no-underline transition-colors hover:bg-white/15 ${focusRing}`}
        style={{ border: '1px solid rgba(255,255,255,0.5)' }}
      >
        Тарифи
      </Link>
    </div>
  </aside>
);
