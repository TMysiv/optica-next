/** "Request accepted" message shown after the connection form is submitted */
export const ConnectSuccess = ({ onDone, titleId }: { onDone?: () => void; titleId?: string }) => (
  <div className="flex flex-col items-center gap-[16px] px-[24px] py-[48px] text-center sm:px-[48px] sm:py-[64px]">
    <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[rgba(43,212,125,0.15)]" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-[40px] w-[40px]" fill="none" stroke="#2BD47D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
    <h2 id={titleId} className="m-0 text-[28px] font-extrabold leading-tight text-white sm:text-[36px]">Заявку прийнято!</h2>
    <p className="m-0 max-w-[420px] text-[17px] leading-[1.6] text-white/70">
      Наш менеджер зателефонує вам найближчим часом, щоб перевірити адресу та узгодити підключення.
    </p>
    {onDone && (
      <button
        type="button"
        onClick={onDone}
        className="mt-[8px] cursor-pointer rounded-[14px] bg-[#00B3DC] px-[36px] py-[15px] text-[16px] font-bold text-white transition-colors hover:bg-[#FFDC00] hover:text-[#233955]"
      >
        Добре
      </button>
    )}
  </div>
);
