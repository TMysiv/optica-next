'use client';
import { useEffect } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';

interface Props {
  phone?: string;
  viberPhone?: string;
  telegramUsername?: string;
}

const digits = (value: string) => value.replace(/\D/g, '');

const linkLocation = (link: HTMLElement) => {
  const marked = link.closest<HTMLElement>('[data-track-location]');
  if (marked) return marked.dataset.trackLocation;
  if (link.closest('header')) return 'header';
  if (link.closest('footer')) return 'footer';
  return 'content';
};

export const ContactClickTracker = ({ phone, viberPhone, telegramUsername }: Props) => {
  useEffect(() => {
    const phoneTail = phone ? digits(phone).slice(-9) : '';
    const viberTail = viberPhone ? digits(viberPhone).slice(-9) : '';
    const telegram = telegramUsername?.toLowerCase();

    const classify = (href: string): string | null => {
      const lower = href.toLowerCase();
      if (lower.startsWith('tel:')) return phoneTail && digits(href).endsWith(phoneTail) ? 'phone_click' : null;
      if (lower.startsWith('viber:')) return viberTail && digits(decodeURIComponent(href)).endsWith(viberTail) ? 'viber_click' : null;
      if (telegram && /^https?:\/\/(t\.me|telegram\.me)\//.test(lower)) {
        return lower.split('/')[3]?.split('?')[0] === telegram ? 'telegram_click' : null;
      }
      return null;
    };

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest('a');
      const href = link?.getAttribute('href');
      if (!link || !href) return;
      const event = classify(href);
      if (!event) return;
      sendGTMEvent({ event, link_location: linkLocation(link), page_path: window.location.pathname });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [phone, viberPhone, telegramUsername]);

  return null;
};
