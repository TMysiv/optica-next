'use client';
import { useConnectModal } from '@/components/ConnectModal/ConnectModalProvider';

/** Opens the connection request modal with the tariff preselected */
export const ConnectTariffButton = ({ service, className }: { service: string; className?: string }) => {
  const { openConnect } = useConnectModal();

  const handleClick = () => {
    openConnect({ service });
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      Підключити
    </button>
  );
};
