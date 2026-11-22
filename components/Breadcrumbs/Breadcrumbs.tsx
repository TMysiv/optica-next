import Link from 'next/link';

export type Crumb = { label: string; href?: string };

export const Breadcrumbs = ({ items, className = 'mb-[28px]' }: { items: Crumb[]; className?: string }) => (
  <nav aria-label="Навігація" className={className}>
    <ol className="m-0 flex list-none flex-wrap items-center gap-[8px] p-0 text-[14px] text-white/50">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={item.label} className="flex items-center gap-[8px]">
            {isLast || !item.href ? (
              <span aria-current={isLast ? 'page' : undefined} className="text-white/85">{item.label}</span>
            ) : (
              <Link href={item.href} className="text-white/50 no-underline transition-colors hover:text-white">{item.label}</Link>
            )}
            {!isLast && <span aria-hidden="true">/</span>}
          </li>
        );
      })}
    </ol>
  </nav>
);
