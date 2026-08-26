'use client';
import { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Logo } from '@/components/Logo/Logo';
import { config } from '@/lib/config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const scrollItems = [
  { label: 'Підключитись', id: 'form-section' },
];

export const Header = () => {
  const theme = useTheme();
  const isMob = useMediaQuery(theme.breakpoints.down(765));
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isHome) return;
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isMob) setIsOpen(false);
  }, [isMob]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <Box component="header" className="flex items-center justify-between pt-[28px] pb-[10px]">
        <Link href="/" className="no-underline" onClick={() => setIsOpen(false)}>
          <Logo />
        </Link>

        {!isMob && (
          <Box component="nav" aria-label="Головна навігація" className="flex items-center gap-[24px]">
            {scrollItems.map((item) => (
              <a
                key={item.id}
                href={isHome ? `#${item.id}` : `/#${item.id}`}
                className="text-white/70 hover:text-white text-[15px] font-medium transition-colors duration-200 no-underline"
                onClick={(e) => scrollToSection(e, item.id)}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/aktsii"
              className="text-white/70 hover:text-[#00B3DC] text-[15px] font-medium transition-colors duration-200 no-underline"
            >
              Акції
            </Link>
            <a
              href={isHome ? '#tarrif-section' : '/#tarrif-section'}
              className="text-white/70 hover:text-white text-[15px] font-medium transition-colors duration-200 no-underline"
              onClick={(e) => scrollToSection(e, 'tarrif-section')}
            >
              Тарифи
            </a>
            <Link
              href="/blog"
              className="text-white/70 hover:text-[#00B3DC] text-[15px] font-medium transition-colors duration-200 no-underline"
            >
              Блог
            </Link>
            <Link
              href="/abonentam"
              className="text-white/70 hover:text-[#00B3DC] text-[15px] font-medium transition-colors duration-200 no-underline"
            >
              <span className="hidden [@media(min-width:850px)]:inline">Діючим </span>Абонентам
            </Link>
          </Box>
        )}

        <div className="flex items-center gap-3">
          <a
            href={`tel:+${config.phone}`}
            className="flex items-center gap-[10px] no-underline group"
            aria-label="Зателефонувати до Укртелеком"
          >
            <Box className="w-[32px] h-[32px] rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center group-hover:bg-red-600/40 transition-all duration-200">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3.5 1.5C3.5 1.5 2 1.5 1.5 3C1 4.5 1.5 7.5 4.5 10.5C7.5 13.5 10.5 14 12 13.5C13.5 13 13.5 11.5 13.5 11.5L11 9L9.5 10.5C9.5 10.5 7.5 9.5 6 8C4.5 6.5 3.5 4.5 3.5 4.5L5 3L3.5 1.5Z"
                  stroke="#ef4444"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
            <span className="text-[#00B3DC] text-[20px] font-semibold leading-tight group-hover:text-white transition-colors duration-200">
              {config.phone}
            </span>
          </a>

          {isMob && (
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? 'Закрити меню' : 'Відкрити меню'}
              aria-expanded={isOpen}
              className="w-[38px] h-[38px] flex items-center justify-center"
            >
              {isOpen
                ? <CloseIcon sx={{ color: 'white' }} />
                : <MenuIcon sx={{ color: 'white' }} />}
            </button>
          )}
        </div>
      </Box>

      {isMob && (
        <Box
          component="nav"
          aria-label="Мобільна навігація"
          aria-hidden={!isOpen}
          className="fixed left-0 w-full z-40 overflow-hidden"
          style={{
            top: '101px',
            background: 'rgba(1, 4, 9, 0.97)',
            backdropFilter: 'blur(15px)',
            maxHeight: isOpen ? '500px' : '0px',
            opacity: isOpen ? 1 : 0,
            transition: 'max-height 0.3s ease, opacity 0.2s ease',
          }}
        >
          <div className="px-5 py-2 flex flex-col">
            {scrollItems.map((item, i) => (
              <a
                key={item.id}
                href={isHome ? `#${item.id}` : `/#${item.id}`}
                className="text-white/80 hover:text-white text-[17px] font-medium py-[14px] no-underline transition-colors duration-200"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                onClick={(e) => scrollToSection(e, item.id)}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/aktsii"
              className="text-white/80 hover:text-[#00B3DC] text-[17px] font-medium py-[14px] no-underline transition-colors duration-200"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
              onClick={() => setIsOpen(false)}
            >
              Акції
            </Link>
            <a
              href={isHome ? '#tarrif-section' : '/#tarrif-section'}
              className="text-white/80 hover:text-white text-[17px] font-medium py-[14px] no-underline transition-colors duration-200"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
              onClick={(e) => scrollToSection(e, 'tarrif-section')}
            >
              Тарифи
            </a>
            <Link
              href="/blog"
              className="text-white/80 hover:text-[#00B3DC] text-[17px] font-medium py-[14px] no-underline transition-colors duration-200"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
              onClick={() => setIsOpen(false)}
            >
              Блог
            </Link>
            <Link
              href="/abonentam"
              className="text-white/80 hover:text-[#00B3DC] text-[17px] font-medium py-[14px] no-underline transition-colors duration-200"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
              onClick={() => setIsOpen(false)}
            >
              Діючим Абонентам
            </Link>
            <a
              href={isHome ? '#form-section' : '/#form-section'}
              className="mt-4 mb-5 text-center py-[15px] rounded-[12px] bg-[#00B3DC] text-white text-[17px] font-semibold no-underline hover:bg-[#FFDC00] hover:text-black transition-all duration-200"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
                }
                setIsOpen(false);
              }}
            >
              Підключитись
            </a>
          </div>
        </Box>
      )}
    </>
  );
};
