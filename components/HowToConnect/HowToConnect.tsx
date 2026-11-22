'use client';
import { useConnectModal } from '@/components/ConnectModal/ConnectModalProvider';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import type { ReactNode } from 'react';
import EditNoteOutlined from '@mui/icons-material/EditNoteOutlined';
import SupportAgentOutlined from '@mui/icons-material/SupportAgentOutlined';
import HandymanOutlined from '@mui/icons-material/HandymanOutlined';
import RouterOutlined from '@mui/icons-material/RouterOutlined';
import { CustomButton } from '@/components/Custom/CustomButton';

const steps: { icon: ReactNode; title: string; text: string }[] = [
  {
    icon: <EditNoteOutlined />,
    title: 'Заявка',
    text: 'Залиште заявку на сайті: вкажіть адресу, ім’я та телефон. Це займає хвилину.',
  },
  {
    icon: <SupportAgentOutlined />,
    title: 'Майстер',
    text: 'Фахівець зателефонує, перевірить технічну можливість підключення за вашою адресою та узгодить зручний час візиту.',
  },
  {
    icon: <HandymanOutlined />,
    title: 'Монтаж',
    text: 'Майстер проводить оптичний кабель GPON до квартири або будинку та встановлює обладнання.',
  },
  {
    icon: <RouterOutlined />,
    title: 'Налаштування',
    text: 'Майстер налаштовує обладнання й перевіряє, що інтернет працює. Далі можна користуватися.',
  },
];

export const HowToConnect = () => {
  const theme = useTheme();
  const isMob = useMediaQuery(theme.breakpoints.down(765));

  const { openConnect } = useConnectModal();

  const handleClick = () => {
    openConnect();
  };

  return (
    <Box
      component="section"
      id="yak-pidklyuchytys"
      aria-labelledby="yak-pidklyuchytys-title"
      className="w-full pt-[20px] md:pt-[48px]"
    >
      <Box className="max-w-[1170px] mx-auto px-4 md:px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-[32px] lg:gap-[80px]">
        <Box className="lg:sticky lg:top-[100px] self-start">
          <h2
            id="yak-pidklyuchytys-title"
            className="text-[#00B3DC] font-semibold not-italic text-[24px] md:text-[42px] leading-[0.95] mb-[24px]"
          >
            Як підключити інтернет{' '}
            <span className="text-white block">у 4 кроки</span>
          </h2>
          <p className="text-white/70 text-[16px] md:text-[18px] leading-[1.6] mb-[28px]">
            Підключення оптоволоконного інтернету GPON від Укртелеком: від заявки до готового домашнього інтернету.
          </p>
          <CustomButton
            text="ПІДКЛЮЧИТИ ІНТЕРНЕТ"
            width={!isMob ? 340 : 280}
            className="rounded-[12px] bg-[#00B3DC] h-[60px] text-white text-center text-[20px] font-medium not-italic leading-[0.97] uppercase tariff-btn hover:bg-yellow-850 hover:text-black"
            handleClick={handleClick}
          />
          <p className="text-white/50 text-[13px] md:text-[14px] leading-[1.5] mt-[16px] mb-0 max-w-[340px]">
            Підключення залежить від технічної можливості за вашою адресою.
          </p>
        </Box>

        <Box component="ol" className="list-none p-0 m-0 border-b border-white/15">
          {steps.map((step, i) => (
            <Box
              component="li"
              key={step.title}
              className="flex items-start gap-[16px] md:gap-[32px] border-t border-white/15 py-[22px] md:py-[30px]"
            >
              <span
                aria-hidden="true"
                className="w-[48px] md:w-[72px] shrink-0 text-[#00B3DC] text-[32px] md:text-[48px] font-semibold leading-[1]"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <Box className="flex-1">
                <h3 className="text-white text-[16px] md:text-[18px] font-semibold leading-[1.15] mb-[8px] m-0">
                  {step.title}
                </h3>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-[1.6] m-0 max-w-[560px]">{step.text}</p>
              </Box>
              <span aria-hidden="true" className="hidden md:block shrink-0 text-white/30 [&_svg]:!text-[32px]">
                {step.icon}
              </span>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
