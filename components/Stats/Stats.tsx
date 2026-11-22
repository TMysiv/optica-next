import { stats } from '@/lib/helpers';

/** Home page block: key figures about Укртелеком */
export const Stats = () => (
  <section aria-labelledby="stats-title" className="max-w-[1170px] mx-auto px-4 mt-[80px] mb-[80px]">
    <h2
      id="stats-title"
      className="text-white text-center text-[24px] md:text-[42px] font-bold leading-[117.5%] uppercase mb-[16px]"
    >
      Чому обирають Укртелеком
    </h2>
    <p className="text-white/70 text-center text-[14px] md:text-[17px] leading-[1.6] max-w-[640px] mx-auto mb-[40px] md:mb-[48px]">
      Оптоволоконна мережа Укртелеком, яка працює навіть під час відключень світла.
    </p>

    <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0 md:grid-cols-4">
      {stats.map((stat) => (
        <li
          key={stat.label}
          className="relative overflow-hidden rounded-[20px] px-[20px] py-[28px] text-center transition-all duration-300 hover:-translate-y-[2px]"
          style={{
            background: 'linear-gradient(135deg, rgba(0,179,220,0.08) 0%, rgba(0,179,220,0.03) 100%)',
            boxShadow: 'inset 0 0 0 1px rgba(0,179,220,0.25)',
          }}
        >
          <span className="mb-[8px] block text-[28px]" aria-hidden="true">{stat.icon}</span>
          <span className="mb-[6px] block text-[36px] font-bold leading-none text-[#FFDC00]">{stat.value}</span>
          <span className="block text-[13px] font-medium leading-tight text-white/60">{stat.label}</span>
        </li>
      ))}
    </ul>
  </section>
);
