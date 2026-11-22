'use client';
import { useState } from 'react';
import { Dialog } from '@mui/material';
import { Form } from '@/components/Form/Form';
import { ConnectSuccess } from './ConnectSuccess';
import { CONNECT_FORM_ID } from './ConnectModalProvider';

export const ConnectPageForm = () => {
  const [successOpen, setSuccessOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const closeSuccess = () => {
    setSuccessOpen(false);
    setFormKey((k) => k + 1);
  };

  return (
    <>
      <div
        id={CONNECT_FORM_ID}
        className="scroll-mt-[120px] self-start rounded-[28px]"
        style={{ background: 'linear-gradient(180deg, #2C4362 0%, #263F60 100%)', boxShadow: '0 0 0 1px rgba(0,179,220,0.35), 0 40px 80px -40px rgba(0,0,0,0.7)' }}
      >
        <div className="px-[20px] py-[28px] sm:px-[40px] sm:py-[36px]">
          <h2 className="m-0 text-[24px] font-extrabold leading-tight text-white sm:text-[28px]">Заявка на підключення</h2>
          <p className="m-0 mb-[24px] mt-[8px] text-[15px] text-white/60">Поля з * обовʼязкові. Це займе хвилину.</p>
          <Form key={formKey} onSuccess={() => setSuccessOpen(true)} />
        </div>
      </div>

      <Dialog
        open={successOpen}
        onClose={closeSuccess}
        maxWidth={false}
        aria-labelledby="connect-success-title"
        slotProps={{
          paper: {
            sx: {
              width: { xs: 'calc(100% - 24px)', sm: 'calc(100% - 48px)' },
              maxWidth: 520,
              m: { xs: '12px', sm: '24px' },
              borderRadius: '28px',
              background: 'linear-gradient(180deg, #2C4362 0%, #233955 100%)',
              boxShadow: '0 0 0 1px rgba(0,179,220,0.35), 0 40px 100px -20px rgba(0,0,0,0.7)',
              color: '#fff',
            },
          },
          backdrop: { sx: { backgroundColor: 'rgba(5,12,22,0.75)', backdropFilter: 'blur(6px)' } },
        }}
      >
        <ConnectSuccess onDone={closeSuccess} titleId="connect-success-title" />
      </Dialog>
    </>
  );
};
