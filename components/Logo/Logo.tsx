import Image from 'next/image';

export const Logo = () => (
  <Image
    src="/images/logo.svg"
    alt="Укртелеком — оптичний інтернет провайдер"
    className="h-[40px] w-auto"
    width={160}
    height={40}
  />
);
