'use client';

import TelegramIcon from '@mui/icons-material/Telegram';
import { usePathname } from "next/navigation";
import { config } from '@/lib/config';

export default function TelegramButton() {
  const pathname = usePathname();

  if (pathname === '/abonentam') {
    return null;
  }

  return (
    <a
      href={`https://t.me/${config.telegramUsername}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Telegram"
      className="fixed right-[24px] bottom-[94px] z-[1000] flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#229ED9] text-white shadow-lg transition-transform hover:scale-110"
    >
      <TelegramIcon sx={{ fontSize: 32 }} />
    </a>
  );
}
