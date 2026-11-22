import type { ReactNode } from 'react';

/** Topic icon chosen by keywords in the post slug */
const topicIcons: { match: RegExp; icon: ReactNode }[] = [
  {
    match: /megogo/,
    icon: <><rect x="2.5" y="4" width="19" height="13" rx="2" /><path d="M8 21h8M12 17v4M10 8.5v5l4-2.5-4-2.5z" /></>,
  },
  {
    match: /provaidera/,
    icon: <><path d="M4 8h13l-3-3M20 16H7l3 3" /></>,
  },
  {
    match: /pidkliuchyty/,
    icon: <><path d="M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0V7zM12 17v5" /></>,
  },
  {
    match: /paverbank|svitla|blekaut|dbz/,
    icon: <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" />,
  },
  {
    match: /wifi|mesh/,
    icon: <><path d="M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0" /><circle cx="12" cy="19" r="1.2" fill="currentColor" /></>,
  },
  {
    match: /router|ont/,
    icon: <><rect x="2.5" y="13" width="19" height="7" rx="2" /><path d="M7 13V7M17 13V7M6.5 16.5h.01M10 16.5h.01" /></>,
  },
  {
    match: /shvydk|shvidk|halmuye/,
    icon: <><path d="M12 21a9 9 0 1 1 9-9" /><path d="M12 12l5-4" /><circle cx="12" cy="12" r="1.3" fill="currentColor" /></>,
  },
  {
    match: /ihor/,
    icon: <><rect x="2" y="7" width="20" height="11" rx="5" /><path d="M7 10.5v4M5 12.5h4M15.5 11.5h.01M18 13.5h.01" /></>,
  },
  {
    match: /vpn/,
    icon: <><rect x="4.5" y="10.5" width="15" height="10" rx="2" /><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" /></>,
  },
  {
    match: /gpon|4g/,
    icon: <><path d="M3 12h4l2-5 3 10 2-5h7" /></>,
  },
];

const fallbackIcon = <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>;

const palettes: Record<string, { bg: string; accent: string }> = {
  'Технології': { bg: 'linear-gradient(135deg, #0B1A2E 0%, #12406A 60%, #0E6E95 100%)', accent: '#7FE3FF' },
  'Практично': { bg: 'linear-gradient(135deg, #0B1A2E 0%, #2B3A5C 55%, #6B5A1E 100%)', accent: '#FFDC00' },
};

export const PostCover = ({ slug, category, size = 'md' }: { slug: string; category: string; size?: 'sm' | 'md' | 'lg' }) => {
  const icon = topicIcons.find((t) => t.match.test(slug))?.icon ?? fallbackIcon;
  const palette = palettes[category] ?? palettes['Технології'];
  const iconSize = size === 'lg' ? 'h-[120px] w-[120px]' : size === 'sm' ? 'h-[44px] w-[44px]' : 'h-[76px] w-[76px]';

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: palette.bg }} aria-hidden="true">
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      {/* glow */}
      <div className="absolute left-1/2 top-1/2 h-[70%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[40px]" style={{ background: palette.accent, opacity: 0.22 }} />
      {/* rings */}
      <div className="absolute left-1/2 top-1/2 aspect-square h-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ borderColor: palette.accent, opacity: 0.18 }} />
      <div className="absolute left-1/2 top-1/2 aspect-square h-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ borderColor: palette.accent, opacity: 0.08 }} />
      <div className="absolute inset-0 flex items-center justify-center" style={{ color: palette.accent }}>
        <svg viewBox="0 0 24 24" className={iconSize} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </div>
    </div>
  );
};

export const categoryChip: Record<string, string> = {
  'Технології': 'bg-[rgba(0,179,220,0.15)] text-[#7FE3FF] border-[rgba(0,179,220,0.35)]',
  'Практично': 'bg-[rgba(255,220,0,0.12)] text-[#FFDC00] border-[rgba(255,220,0,0.35)]',
};

export const formatPostDate = (iso: string) =>
  new Date(iso).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
