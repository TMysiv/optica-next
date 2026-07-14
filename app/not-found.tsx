import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Сторінку не знайдено | Укртелеком',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4" style={{ background: '#233955' }}>
      <h1 className="text-[#00B3DC] text-[96px] font-bold leading-none mb-[8px]">404</h1>
      <p className="text-white text-[24px] font-semibold mb-[12px]">Сторінку не знайдено</p>
      <p className="text-white/50 text-[16px] mb-[40px] max-w-[400px]">
        Схоже, ця сторінка не існує або була переміщена.
      </p>
      <div className="flex gap-[16px] flex-wrap justify-center">
        <Link
          href="/"
          className="no-underline px-[32px] py-[14px] rounded-[12px] bg-[#00B3DC] text-white text-[16px] font-medium hover:bg-[#FFDC00] hover:text-black transition-all duration-200"
        >
          На головну
        </Link>
        <Link
          href="/blog"
          className="no-underline px-[32px] py-[14px] rounded-[12px] text-white text-[16px] font-medium transition-all duration-200"
          style={{ border: '1px solid rgba(255,255,255,0.2)' }}
        >
          Перейти до блогу
        </Link>
      </div>
    </main>
  );
}
