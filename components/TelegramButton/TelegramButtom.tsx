'use client';

import TelegramIcon from '@mui/icons-material/Telegram';
import { usePathname } from "next/navigation";

export default function TelegramButton({ username }: { username?: string }) {
  const pathname = usePathname();

  if (pathname === '/abonentam' || !username) {
    return null;
  }

  return (
    <a
      href={`https://t.me/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Telegram"
      data-track-location="floating"
      className="fixed right-[24px] bottom-[94px] z-[1000] flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#229ED9] text-white shadow-lg transition-transform hover:scale-110"
    >
      <TelegramIcon sx={{ fontSize: 32 }} />
    </a>
  );
}
