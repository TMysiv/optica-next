'use client';
import { useConnectModal } from '@/components/ConnectModal/ConnectModalProvider';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import type { ReactNode } from 'react';
import BatteryChargingFullOutlined from '@mui/icons-material/BatteryChargingFullOutlined';
import PowerOutlined from '@mui/icons-material/PowerOutlined';
import WifiOutlined from '@mui/icons-material/WifiOutlined';
import { CustomButton } from '@/components/Custom/CustomButton';

const steps: { icon: ReactNode; label: string; metric: string; text: string }[] = [
  {
    icon: <BatteryChargingFullOutlined />,
    label: 'Мережа оператора',
    metric: 'до 96 годин',
    text: 'Вузли оптичної мережі GPON мають акумулятори та генератори, тому оптоволокно працює без світла.',
  },
  {
    icon: <PowerOutlined />,
    label: 'Ваш роутер і ONT',
    metric: 'Павербанк або ДБЖ',
    text: 'Підключіть обладнання до резервного живлення. Перевірте напругу його блока живлення та підберіть сумісний пристрій. Час роботи залежить від ємності акумулятора.',
  },
  {
    icon: <WifiOutlined />,
    label: 'Інтернет вдома',
    metric: 'Wi-Fi працює',
    text: 'Поки працюють мережа та ваше резервне живлення, інтернет під час відключення світла залишається доступним.',
  },
];

export const NoLightSection = () => {
  const theme = useTheme();
  const isMob = useMediaQuery(theme.breakpoints.down(765));

  const { openConnect } = useConnectModal();

  const handleClick = () => {
    openConnect();
  };

  return (
    <Box
      component="section"
      id="bez-svitla"
      aria-labelledby="bez-svitla-title"
      className="relative w-full overflow-hidden pt-[42px] md:pt-[60px]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-[240px] -top-[120px] h-[640px] w-[860px] bg-[radial-gradient(ellipse_at_center,rgba(0,179,220,0.16),transparent_65%)]"
      />

      <Box className="relative z-10 max-w-[1170px] mx-auto px-4 md:px-6 lg:px-0">
        <h2
          id="bez-svitla-title"
          className="text-[#00B3DC] font-semibold not-italic text-[24px] md:text-[42px] leading-[0.95] mb-[24px]"
        >
          Інтернет без світла
          <span className="text-white block"> від Укртелеком</span>
        </h2>
        <p className="text-white/70 text-[16px] md:text-[19px] leading-[1.6] max-w-[720px] mb-[48px]">
          Енергонезалежний інтернет GPON не зникає під час відключення світла: мережа оператора має резервне живлення
          до 96 годин. Щоб інтернет був і вдома, подбайте про живлення роутера та оптичного терміналу.
        </p>

        <Box className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-[10px] p-[28px] md:p-[48px] mb-[40px]">
          <Box component="ol" className="relative grid grid-cols-1 md:grid-cols-3 gap-[40px] list-none p-0 m-0">
            <span
              aria-hidden="true"
              className="absolute left-[27px] top-[28px] bottom-[28px] w-[2px] md:hidden bg-[linear-gradient(180deg,#00B3DC,rgba(0,179,220,0.2))]"
            />
            <span
              aria-hidden="true"
              className="absolute hidden md:block left-[28px] right-[28px] top-[27px] h-[2px] bg-[linear-gradient(90deg,#00B3DC_0%,#00B3DC_40%,rgba(0,179,220,0.2)_100%)]"
            />

            {steps.map((step) => (
              <Box component="li" key={step.label} className="relative pl-[84px] md:pl-0 min-h-[56px]">
                <span className="absolute left-0 top-0 md:static md:mb-[28px] z-10 flex h-[56px] w-[56px] items-center justify-center rounded-full border border-[#00B3DC] bg-[#06121c] text-[#00B3DC] shadow-[0_0_18px_rgba(0,179,220,0.45)]">
                  {step.icon}
                </span>
                <p className="text-[#00B3DC] text-[16px] font-medium leading-[1.2] mb-[6px] m-0">{step.label}</p>
                <p className="text-white text-[16px] md:text-[28px] font-semibold leading-[1.1] mb-[14px] m-0">{step.metric}</p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-[1.65] m-0">{step.text}</p>
              </Box>
            ))}
          </Box>
        </Box>

        <Box className="flex flex-col lg:flex-row lg:items-center gap-[24px] lg:gap-[40px]">
          <CustomButton
            text="ПІДКЛЮЧИТИ ІНТЕРНЕТ"
            width={!isMob ? 340 : 280}
            className="rounded-[12px] bg-[#00B3DC] h-[60px] text-white text-center text-[20px] font-medium not-italic leading-[0.97] uppercase tariff-btn hover:bg-yellow-850 hover:text-black"
            handleClick={handleClick}
          />
          <Box className="flex flex-col gap-[8px]">
            <p className="text-white/60 text-[13px] md:text-[15px] leading-[1.5] max-w-[520px] m-0">
              Підключення залежить від технічної можливості за вашою адресою. Залиште заявку — фахівець зателефонує й
              підкаже.
            </p>
            <Link
              href="/internet-bez-svitla"
              className="w-fit text-white/80 hover:text-white underline underline-offset-4 text-[13px] md:text-[15px] transition-colors"
            >
              Докладніше: інтернет без світла від Укртелеком
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
