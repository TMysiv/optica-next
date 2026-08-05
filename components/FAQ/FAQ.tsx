'use client';
import { useState } from 'react';
import { Box } from '@mui/material';
import { config } from '@/lib/config';

const faqs = [
  {
    question: 'Що таке GPON інтернет і чим він відрізняється від звичайного?',
    answer:
      'GPON (Gigabit Passive Optical Network) — це технологія оптичного інтернету, яка передає дані по скловолокну зі швидкістю до 1 Гбіт/с. На відміну від мідного кабелю, оптика не схильна до перешкод і забезпечує стабільний сигнал на будь-якій відстані від АТС.',
  },
  {
    question: 'Скільки часу інтернет від Укртелеком працює при відключенні електроенергії?',
    answer:
      'Мережеве обладнання Укртелеком має резервне живлення до 96 годин (4 доби). Це означає, що інтернет продовжує працювати навіть під час тривалих відключень світла. Абонентське обладнання (роутер) потрібно забезпечити резервним живленням самостійно.',
  },
  {
    question: 'Скільки коштує підключення GPON інтернету від Укртелеком?',
    answer:
      'Тарифи на GPON інтернет від Укртелеком починаються від 99 грн/місяць за акцією «Ціна — не новина». Ціна фіксована на 2 роки: перші 12 місяців — 99 грн/міс, з 13-го місяця — 200 грн/міс. Підключення здійснюється безкоштовно або за акційною ціною залежно від міста.',
  },
  {
    question: 'Як підключити оптичний інтернет GPON від Укртелеком?',
    answer:
      `Щоб підключити GPON інтернет, залиште заявку на сайті або зателефонуйте ${config.phone}. Вкажіть адресу та зручний час — майстер перевірить технічну можливість і проведе підключення. Весь процес займає від 1 до 5 робочих днів.`,
  },
  {
    question: 'У яких містах доступне підключення GPON інтернету від Укртелеком?',
    answer:
      'Укртелеком надає послуги GPON інтернету в більшості міст України: Київ, Харків, Дніпро, Одеса, Запоріжжя, Львів, Чернігів, Черкаси, Вінниця, Рівне, Тернопіль, Хмельницький, Житомир, Чернівці, Івано-Франківськ та інші населені пункти. Наявність технічної можливості залежить від адреси.',
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Box component="section" aria-label="Часті запитання про підключення інтернету Укртелеком" className="max-w-[1170px] mx-auto px-4 mt-[100px] mb-[60px]">
      <h2 className="text-white text-center text-[40px] font-bold leading-[117.5%] mb-[48px] uppercase">
        Часті запитання
      </h2>
      <Box className="flex flex-col gap-[12px]">
        {faqs.map((faq, idx) => (
          <Box
            key={idx}
            className="rounded-[16px] overflow-hidden cursor-pointer transition-colors duration-200"
            style={{
              border: '1px solid rgba(0,179,220,0.25)',
              background: openIndex === idx ? 'rgba(0,179,220,0.08)' : 'rgba(255,255,255,0.04)',
            }}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            <Box className="flex justify-between items-center px-[24px] py-[20px]">
              <h3 className="text-white text-[17px] font-semibold m-0 pr-4 leading-snug">{faq.question}</h3>
              <span
                className="text-[#00B3DC] text-[28px] font-light flex-shrink-0 leading-none"
                aria-hidden="true"
              >
                {openIndex === idx ? '−' : '+'}
              </span>
            </Box>
            {openIndex === idx && (
              <Box className="px-[24px] pb-[20px]">
                <p className="text-white/70 text-[16px] leading-[1.6] m-0">{faq.answer}</p>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
