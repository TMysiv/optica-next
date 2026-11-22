'use client';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Form } from '@/components/Form/Form';
import type { Offer } from '@/lib/types';
import { ConnectSuccess } from './ConnectSuccess';

/** Hash that used to point at the home page form; links to it now open the modal */
export const CONNECT_HASH = '#form-section';
/** Standalone request page (indexable). Links to it carrying `data-connect-modal` open the modal instead */
export const CONNECT_PATH = '/pidkliuchennia';
/** Id of the form block on the request page */
export const CONNECT_FORM_ID = 'connect-form';

type ConnectModalContext = { openConnect: (preset?: Partial<Offer>) => void };

const Ctx = createContext<ConnectModalContext>({ openConnect: () => {} });

/** Open the connection request modal from any client component */
export const useConnectModal = () => useContext(Ctx);

/** Links that should open the modal: legacy "/#form-section", or any link marked with data-connect-modal */
const opensModal = (link: HTMLAnchorElement) => {
  if (link.hasAttribute('data-connect-modal')) return true;
  const href = link.getAttribute('href');
  if (!href) return false;
  try {
    const url = new URL(href, window.location.href);
    return url.origin === window.location.origin && url.hash === CONNECT_HASH;
  } catch {
    return false;
  }
};

export const ConnectModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<Partial<Offer> | undefined>();
  const [submitted, setSubmitted] = useState(false);
  // Remount the form on each opening so the preset is applied fresh
  const [formKey, setFormKey] = useState(0);

  const openConnect = useCallback((nextPreset?: Partial<Offer>) => {
    // On the request page itself the form is already there: just scroll to it
    if (window.location.pathname === CONNECT_PATH) {
      document.getElementById(CONNECT_FORM_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setPreset(nextPreset);
    setSubmitted(false);
    setFormKey((k) => k + 1);
    setOpen(true);
  }, []);

  const close = () => setOpen(false);

  useEffect(() => {
    // Connect links (see opensModal) open the modal instead of navigating. Without JS they lead to the
    // request page. Capture phase runs before Next <Link> handlers; they skip navigation when defaultPrevented.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement | null)?.closest('a');
      if (!link || !opensModal(link)) return;
      e.preventDefault();
      openConnect();
    };

    // Old links / bookmarks to "/#form-section"
    const openFromHash = () => {
      if (window.location.hash !== CONNECT_HASH) return;
      history.replaceState(null, '', window.location.pathname + window.location.search);
      openConnect();
    };

    document.addEventListener('click', onClick, true);
    window.addEventListener('hashchange', openFromHash);
    openFromHash();
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('hashchange', openFromHash);
    };
  }, [openConnect]);

  return (
    <Ctx.Provider value={{ openConnect }}>
      {children}
      <Dialog
        open={open}
        onClose={close}
        maxWidth={false}
        scroll="body"
        aria-labelledby="connect-modal-title"
        slotProps={{
          paper: {
            sx: {
              width: { xs: 'calc(100% - 24px)', sm: 'calc(100% - 48px)' },
              maxWidth: 720,
              m: { xs: '12px', sm: '24px' },
              borderRadius: '28px',
              background: 'linear-gradient(180deg, #2C4362 0%, #233955 100%)',
              boxShadow: '0 0 0 1px rgba(0,179,220,0.35), 0 40px 100px -20px rgba(0,0,0,0.7)',
              color: '#fff',
              overflow: 'visible',
            },
          },
          backdrop: { sx: { backgroundColor: 'rgba(5,12,22,0.75)', backdropFilter: 'blur(6px)' } },
        }}
      >
        <IconButton
          onClick={close}
          aria-label="Закрити"
          sx={{ position: 'absolute', top: 14, right: 14, color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.08)' } }}
        >
          <CloseIcon />
        </IconButton>

        {submitted ? (
          <ConnectSuccess onDone={close} titleId="connect-modal-title" />
        ) : (
          <div className="px-[20px] pb-[28px] pt-[28px] sm:px-[44px] sm:pb-[40px] sm:pt-[36px]">
            <p className="m-0 text-[12px] font-semibold uppercase tracking-[1.5px] text-[#7FE3FF]">Оптичний інтернет GPON</p>
            <h2 id="connect-modal-title" className="m-0 mt-[6px] pr-[40px] text-[26px] font-extrabold leading-[1.15] text-white sm:text-[32px]">
              Заявка на підключення
            </h2>
            <p className="m-0 mb-[24px] mt-[8px] text-[15px] text-white/60">Заповніть форму — менеджер зателефонує та перевірить технічну можливість за вашою адресою.</p>
            <Form key={formKey} preset={preset} onSuccess={() => setSubmitted(true)} />
          </div>
        )}
      </Dialog>
    </Ctx.Provider>
  );
};
