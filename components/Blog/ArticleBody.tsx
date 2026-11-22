'use client';
import type { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Renders the article's plain HTML and turns clicks on internal links (href="/...")
 * into client-side navigation, so moving between articles doesn't reload the page.
 */
export const ArticleBody = ({ html, className }: { html: string; className?: string }) => {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    // Already handled elsewhere (e.g. links to the request form open the modal)
    if (e.defaultPrevented) return;
    const link = (e.target as HTMLElement).closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    const isInternal = href?.startsWith('/') && !href.startsWith('//');
    const opensElsewhere = link.target && link.target !== '_self';
    const modified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
    if (!href || !isInternal || opensElsewhere || modified) return;

    e.preventDefault();
    router.push(href);
  };

  return <div className={className} onClick={handleClick} dangerouslySetInnerHTML={{ __html: html }} />;
};
