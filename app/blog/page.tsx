import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Блог про інтернет | Укртелеком',
  description: 'Корисні статті про інтернет, GPON технологію, поради з налаштування та вибору тарифу.',
};

const CATEGORY_COLORS: Record<string, string> = {
  'Технології': 'bg-[rgba(0,179,220,0.15)] text-[#00B3DC] border-[rgba(0,179,220,0.3)]',
  'Практично': 'bg-[rgba(255,220,0,0.1)] text-[#FFDC00] border-[rgba(255,220,0,0.3)]',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen" style={{ background: '#233955' }}>
      {/* Хедер блогу */}
      <div className="max-w-[1170px] mx-auto px-4 pt-[60px] pb-[48px]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-[14px] no-underline transition-colors mb-[40px] group"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          На головну
        </Link>

        <h1 className="text-white text-[42px] md:text-[56px] font-bold leading-tight mb-[16px]">
          Блог про інтернет
        </h1>
        <p className="text-white/50 text-[16px] md:text-[18px] leading-relaxed max-w-[600px]">
          Корисні матеріали про технології, налаштування та вибір інтернету
        </p>
      </div>

      {/* Список статей */}
      <div className="max-w-[1170px] mx-auto px-4 pb-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="no-underline group"
            >
              <article className="blog-card rounded-[20px] p-[28px] flex flex-col gap-[16px] h-full transition-all duration-300 cursor-pointer">

                {/* Категорія */}
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[1.5px] px-[10px] py-[4px] rounded-full border w-fit ${CATEGORY_COLORS[post.category] ?? 'bg-white/10 text-white/60 border-white/20'}`}
                >
                  {post.category}
                </span>

                {/* Заголовок */}
                <h2 className="text-white text-[18px] font-bold leading-[1.35] m-0 flex-1 group-hover:text-[#00B3DC] transition-colors duration-200">
                  {post.title}
                </h2>

                {/* Опис */}
                <p className="text-white/55 text-[14px] leading-[1.6] m-0 line-clamp-3">
                  {post.description}
                </p>

                {/* Мета */}
                <div className="flex items-center justify-between pt-[12px]" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className="text-white/35 text-[12px]">
                    {new Date(post.date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="text-white/35 text-[12px] flex items-center gap-[6px]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    {post.readTime}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="py-[60px]"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.15)' }}
      >
        <div className="max-w-[600px] mx-auto px-4 text-center">
          <p className="text-white/50 text-[14px] mb-[20px]">Готові підключити надійний інтернет?</p>
          <Link
            href="/#form-section"
            className="inline-block no-underline px-[40px] py-[16px] rounded-[12px] font-medium not-italic leading-[0.97] bg-[#00B3DC] text-white text-[20px] hover:bg-[#FFDC00] hover:text-black transition-all duration-200"
          >
            Залишити заявку
          </Link>
        </div>
      </div>
    </main>
  );
}
