'use client';
import { useState, ChangeEvent } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Box, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { CustomModal } from '@/components/Custom/CustomModal';
import { CustomButton } from '@/components/Custom/CustomButton';
import { PhoneMask } from '@/components/Masks/PhoneMask';
import { sendGTMEvent } from '@next/third-parties/google';
import { createConsult } from '@/services/api.service';
import { consultCreateSchema } from '@/validation/consultCreateSchema';
import { beautifyErrors } from '@/lib/helpers';
import { ValidationErrors } from '@/lib/types';

type ClientType = 'new' | 'existing';
type ConsultForm = {
  name: string;
  phone: string;
  clientType: string;
  question?: string
};

export const ConsultationButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/abonentam') {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', clientType: '' as ClientType | '', question: '' });
  const [errors, setErrors] = useState<ValidationErrors<ConsultForm>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'clientType' && value === 'existing') {
      setIsOpen(false);
      router.push('/abonentam');
      return;
    }
    setForm(prev => ({ ...prev, [name]: value }));
    if (name in errors) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async () => {
    try {
      consultCreateSchema.validateSync(form, { abortEarly: false });
      setErrors({});
      setIsOpen(false);
      setSuccessOpen(true);
      setForm({ name: '', phone: '', clientType: '', question: '' });
      await createConsult({ username: form.name, phone: form.phone, question: form.question });
      sendGTMEvent({ event: 'consultation_submit' });
    } catch (e) {
      setErrors(beautifyErrors(e));
    }
  };

  const textFieldSx = {
    '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.4)' },
    '& .MuiInput-underline:after': { borderBottomColor: '#00B3DC' },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#00B3DC' },
    '& .MuiInputBase-input': { color: 'white' },
    '& .MuiFormHelperText-root': { color: '#f87171' },
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Отримати консультацію"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#00B3DC',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,179,220,0.5)',
          transition: 'background 0.2s, transform 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#0099be')}
        onMouseLeave={e => (e.currentTarget.style.background = '#00B3DC')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white" />
          <circle cx="8" cy="11" r="1.2" fill="#00B3DC" />
          <circle cx="12" cy="11" r="1.2" fill="#00B3DC" />
          <circle cx="16" cy="11" r="1.2" fill="#00B3DC" />
        </svg>
      </button>

      <CustomModal
        open={isOpen}
        handleCLose={() => {
          setIsOpen(false);
          setForm({ name: '', phone: '', clientType: '', question: '' });
          setErrors({});
        }}
        width={{ xs: '90%', sm: '440px' }}
        html={
          <Box className="flex flex-col gap-5 mt-2">
            <h2 style={{ color: '#00B3DC', fontSize: '22px', fontWeight: 700, margin: 0 }}>
              Отримати консультацію
            </h2>

            <TextField
              fullWidth
              label="Ваше ім'я"
              name="name"
              value={form.name}
              onChange={handleChange}
              variant="standard"
              error={Boolean(errors.name)}
              helperText={errors.name}
              sx={textFieldSx}
            />

            <TextField
              fullWidth
              name="phone"
              value={form.phone}
              onChange={handleChange}
              variant="standard"
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              sx={textFieldSx}
              InputProps={{
                inputComponent: PhoneMask as any,
                inputProps: { error: Boolean(errors.phone) },
              }}
            />

            <TextField
              fullWidth
              label="Ваше питання (необов'язково)"
              name="question"
              value={form.question}
              onChange={handleChange}
              variant="standard"
              multiline
              maxRows={3}
              sx={textFieldSx}
            />

            <Box>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: '0 0 8px' }}>
                Ви є: *
              </p>
              <RadioGroup
                name="clientType"
                value={form.clientType}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="new"
                  control={<Radio sx={{ color: errors.clientType ? '#f87171' : 'rgba(255,255,255,0.4)', '&.Mui-checked': { color: '#00B3DC' } }} />}
                  label={<span style={{ color: 'white', fontSize: '15px' }}>Новий абонент</span>}
                />
                <FormControlLabel
                  value="existing"
                  control={<Radio sx={{ color: errors.clientType ? '#f87171' : 'rgba(255,255,255,0.4)', '&.Mui-checked': { color: '#00B3DC' } }} />}
                  label={<span style={{ color: 'white', fontSize: '15px' }}>Діючий абонент</span>}
                />
              </RadioGroup>
              {errors.clientType && (
                <p style={{ color: '#f87171', fontSize: '12px', margin: '4px 0 0' }}>{errors.clientType}</p>
              )}
            </Box>

            <CustomButton
              text="Надіслати"
              width={180}
              className="bg-cyan-500 text-white hover:bg-yellow-850 hover:text-black text-base mt-1"
              handleClick={handleSubmit}
            />
          </Box>
        }
      />

      <CustomModal
        open={successOpen}
        handleCLose={() => setSuccessOpen(false)}
        width={{ xs: '80%', sm: '380px' }}
        html={
          <Box className="flex flex-col items-center gap-4 mt-4">
            <h2 style={{ color: '#00B3DC', fontSize: '26px', fontWeight: 800, textAlign: 'center', margin: 0 }}>
              Дякуємо!
            </h2>
            <p style={{ color: 'white', fontSize: '16px', textAlign: 'center', margin: 0 }}>
              Наш менеджер зв'яжеться з вами найближчим часом
            </p>
            <img src="/images/logo.svg" alt="Укртелеком" width={140} height={36} loading="lazy" />
          </Box>
        }
      />
    </>
  );
};
