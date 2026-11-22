'use client';
import { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Logo } from '@/components/Logo/Logo';
import { config } from '@/lib/config';
import Link from 'next/link';
import PhoneIcon from '@mui/icons-material/Phone';

export const Header = () => {
  const theme = useTheme();
  const isMob = useMediaQuery(theme.breakpoints.down(765));
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    if (!isMob) setIsOpen(false);
  }, [isMob]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <Box className="fixed top-0 left-0 w-full z-50 h-[101px] bg-[rgba(1,4,9,0.30)] backdrop-blur-[15.1px]">
      <Box className="max-w-[1170px] mx-auto px-4 md:px-6 lg:px-0">
      <Box component="header" className="flex items-center justify-between pt-[28px] pb-[10px]">
        <Link href="/" className="no-underline" onClick={() => setIsOpen(false)}>
          <Logo />
        </Link>

        {!isMob && (
          <Box component="nav" aria-label="Головна навігація" className="flex items-center gap-[24px]">
            <Link
              href="/pidkliuchennia"
              className="text-white/70 hover:text-[#00B3DC] text-[15px] font-medium transition-colors duration-200 no-underline"
            >
              Підключитись
            </Link>
            <Link
              href="/aktsii"
              className="text-white/70 hover:text-[#00B3DC] text-[15px] font-medium transition-colors duration-200 no-underline"
            >
              Акції
            </Link>
            <Link
              href="/taryfy"
              className="text-white/70 hover:text-[#00B3DC] text-[15px] font-medium transition-colors duration-200 no-underline"
            >
              Тарифи
            </Link>
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
            href={`tel:+38${config.phone}`}
            className="flex items-center gap-[8px] no-underline">
            <PhoneIcon sx={{ fontSize: 22, color: '#00B3DC' }} />
              <span className="bg-gradient-to-r from-[#00B3DC] to-[#7FE3FF] bg-clip-text text-[20px] font-bold text-transparent">
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
      </Box>
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
            <Link
              href="/pidkliuchennia"
              className="text-white/80 hover:text-[#00B3DC] text-[17px] font-medium py-[14px] no-underline transition-colors duration-200"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
              onClick={() => setIsOpen(false)}
            >
              Підключитись
            </Link>
            <Link
              href="/aktsii"
              className="text-white/80 hover:text-[#00B3DC] text-[17px] font-medium py-[14px] no-underline transition-colors duration-200"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
              onClick={() => setIsOpen(false)}
            >
              Акції
            </Link>
            <Link
              href="/taryfy"
              className="text-white/80 hover:text-[#00B3DC] text-[17px] font-medium py-[14px] no-underline transition-colors duration-200"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
              onClick={() => setIsOpen(false)}
            >
              Тарифи
            </Link>
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
            <Link
              href="/pidkliuchennia"
              className="mt-4 mb-5 text-center py-[15px] rounded-[12px] bg-[#00B3DC] text-white text-[17px] font-semibold no-underline hover:bg-[#FFDC00] hover:text-black transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Залишити заявку
            </Link>
          </div>
        </Box>
      )}
    </>
  );
};
