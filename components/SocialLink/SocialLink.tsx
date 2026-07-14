import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { SvgIconProps } from '@mui/material';
import { ElementType } from 'react';

const iconMap: Record<string, ElementType<SvgIconProps>> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
};

export const SocialLink = ({ label, href, className }: { label: string; href: string; className: string }) => {
  const Icon = iconMap[label];

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={`no-underline flex items-center gap-[8px] ${className}`}>
      {Icon && <Icon fontSize="small" />}
      {label}
    </a>
  );
};
