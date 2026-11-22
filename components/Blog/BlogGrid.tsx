'use client';
import { useState } from 'react';
import type { PostMeta } from '@/lib/posts';
import { PostCard } from './PostCard';

export const BlogGrid = ({ posts, categories }: { posts: PostMeta[]; categories: string[] }) => {
  const [active, setActive] = useState<string>('Всі');
  const tabs = ['Всі', ...categories];
  const visible = active === 'Всі' ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <div className="mb-[28px] flex flex-wrap gap-[10px]" role="tablist" aria-label="Категорії статей">
        {tabs.map((tab) => {
          const isActive = tab === active;
          const count = tab === 'Всі' ? posts.length : posts.filter((p) => p.category === tab).length;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab)}
              className={`cursor-pointer rounded-full px-[18px] py-[9px] text-[15px] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFDC00] ${
                isActive ? 'bg-[#00B3DC] text-white' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
              style={isActive ? undefined : { boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}
            >
              {tab} <span className={isActive ? 'text-white/80' : 'text-white/40'}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
};
