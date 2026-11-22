import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';
import { PostCover, categoryChip, formatPostDate } from './PostCover';

export const PostCard = ({ post }: { post: PostMeta }) => (
  <article
    className="group relative flex flex-col overflow-hidden rounded-[24px] transition-transform duration-300 hover:-translate-y-[4px]"
    style={{ background: '#2C4362', boxShadow: '0 0 0 1px rgba(0,179,220,0.22)' }}
  >
    <div className="aspect-[16/9] overflow-hidden">
      <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
        <PostCover slug={post.slug} category={post.category} />
      </div>
    </div>
    <div className="flex flex-1 flex-col p-[22px] md:p-[26px]">
      <div className="mb-[12px] flex flex-wrap items-center gap-[10px] text-[13px] text-white/45">
        <span className={`rounded-full border px-[10px] py-[3px] text-[11px] font-semibold uppercase tracking-[1.2px] ${categoryChip[post.category] ?? 'border-white/20 bg-white/10 text-white/70'}`}>
          {post.category}
        </span>
        <span>{post.readTime}</span>
      </div>
      <h3 className="text-[20px] font-bold leading-[1.3] text-white">
        {/* Stretched link: the whole card opens the article */}
        <Link
          href={`/blog/${post.slug}`}
          className="text-white no-underline transition-colors group-hover:text-[#00B3DC] after:absolute after:inset-0 after:z-[1] after:content-['']"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-[10px] line-clamp-3 text-[15px] leading-[1.55] text-white/60">{post.description}</p>
      <p className="mt-auto pt-[16px] text-[13px] text-white/40">{formatPostDate(post.date)}</p>
    </div>
  </article>
);
