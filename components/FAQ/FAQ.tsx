'use client';
import { useConnectModal } from '@/components/ConnectModal/ConnectModalProvider';
import { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { config } from '@/lib/config';
import { CustomButton } from '@/components/Custom/CustomButton';
import { homeFaqs as faqs } from '@/lib/homeFaq';


export const FAQ = () => {
  const theme = useTheme();
  const isMob = useMediaQuery(theme.breakpoints.down(765));
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { openConnect } = useConnectModal();

  const handleClick = () => {
    openConnect();
  };

  return (
    <Box
      component="section"
      id="faq"
      aria-labelledby="faq-title"
      className="max-w-[1170px] mx-auto px-4 mt-[80px] mb-[60px]"
    >
      <h2
        id="faq-title"
        className="text-white text-center text-[24px] md:text-[42px] font-bold leading-[117.5%] mb-[16px] uppercase"
      >
        Часті запитання про інтернет Укртелеком
      </h2>
      <p className="text-white/70 text-center text-[14px] md:text-[17px] leading-[1.6] max-w-[720px] mx-auto mb-[48px]">
        Про підключення домашнього інтернету Укртелеком, роботу без світла та тарифи.
      </p>

      <Box className="flex flex-col gap-[12px]">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <Box
              key={faq.question}
              className="rounded-[16px] overflow-hidden transition-colors duration-200"
              style={{
                border: '1px solid rgba(0,179,220,0.25)',
                background: isOpen ? 'rgba(0,179,220,0.08)' : 'rgba(255,255,255,0.04)',
              }}
            >
              <h3 className="m-0">
                <button
                  type="button"
                  id={`faq-q-${idx}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${idx}`}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-[24px] py-[20px] text-left cursor-pointer bg-transparent border-0"
                >
                  <span className="text-white text-[14px] md:text-[17px] font-semibold leading-snug">
                    {faq.question}
                  </span>
                  <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-[22px] w-[22px] flex-shrink-0 text-[#00B3DC] transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M10 3v14M3 10h14" />
                  </svg>
                </button>
              </h3>
              <div
                id={`faq-a-${idx}`}
                role="region"
                aria-labelledby={`faq-q-${idx}`}
                className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <p className="text-white/70 text-[13px] md:text-[15px] leading-[1.65] m-0 px-[24px] pb-[20px]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </Box>
          );
        })}
      </Box>

      <Box className="flex flex-col items-center gap-[14px] text-center mt-[40px]">
        <p className="text-white/70 text-[15px] md:text-[17px] m-0">Не знайшли відповідь? Залиште заявку або зателефонуйте.</p>
        <CustomButton
          text="ПІДКЛЮЧИТИ ІНТЕРНЕТ"
          width={!isMob ? 340 : 280}
          className="h-[60px] rounded-[12px] bg-[#00B3DC] text-white text-center text-[20px] font-medium not-italic leading-[0.97] uppercase connect-btn hover:bg-yellow-850 hover:text-black"
          handleClick={handleClick}
        />
        <a
          href={`tel:${config.phone}`}
          className="text-white/80 hover:text-white underline underline-offset-4 text-[15px] transition-colors"
        >
          {config.phone}
        </a>
      </Box>
    </Box>
  );
};
