'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Box, TextField, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { CustomModal } from '@/components/Custom/CustomModal';
import { PhoneMask } from '@/components/Masks/PhoneMask';
import { sendGTMEvent } from '@next/third-parties/google';
import { createConsult } from '@/services/api.service';
import { consultCreateSchema } from '@/validation/consultCreateSchema';
import { beautifyErrors } from '@/lib/helpers';
import { ValidationErrors } from '@/lib/types';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type ClientType = 'new' | 'existing';
type ConsultForm = {
  name: string;
  phone: string;
  clientType: string;
  question?: string;
};

const EMPTY_FORM = { name: '', phone: '', clientType: '' as ClientType | '', question: '' };

const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.05)',
    transition: 'background 0.2s',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.35)' },
    '&.Mui-focused': { background: 'rgba(0,179,220,0.08)' },
    '&.Mui-focused fieldset': { borderColor: '#00B3DC', borderWidth: '1px' },
    '&.Mui-error fieldset': { borderColor: '#f87171' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.55)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#00B3DC' },
  '& .MuiInputLabel-root.Mui-error': { color: '#f87171' },
  '& .MuiFormHelperText-root': { marginLeft: '4px', color: '#f87171' },
};

const radioCardSx = (checked: boolean, hasError: boolean) => ({
  flex: 1,
  margin: 0,
  padding: '6px 10px',
  borderRadius: '12px',
  border: `1px solid ${checked ? '#00B3DC' : hasError ? '#f87171' : 'rgba(255,255,255,0.15)'}`,
  background: checked ? 'rgba(0,179,220,0.12)' : 'rgba(255,255,255,0.05)',
  transition: 'all 0.2s',
  '&:hover': { borderColor: checked ? '#00B3DC' : 'rgba(255,255,255,0.35)' },
});

export const ConsultationButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<ValidationErrors<ConsultForm>>({});

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setErrors({});
  };

  useEffect(() => {
    if (pathname === '/abonentam') {
      setIsOpen(false);
      setSuccessOpen(false);
      setForm(EMPTY_FORM);
      setErrors({});
    }
  }, [pathname]);

  if (pathname === '/abonentam') {
    return null;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'clientType' && value === 'existing') {
      setIsOpen(false);
      resetForm();
      router.push('/abonentam');
      return;
    }
    setForm(prev => ({ ...prev, [name]: value }));
    if (name in errors) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async () => {
    try {
      consultCreateSchema.validateSync(form, { abortEarly: false });
      setIsOpen(false);
      setSuccessOpen(true);
      resetForm();
      await createConsult({ username: form.name, phone: form.phone, question: form.question });
      sendGTMEvent({ event: 'consultation_submit' });
    } catch (e) {
      setErrors(beautifyErrors(e));
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Отримати консультацію"
        className="fixed right-[24px] bottom-[24px] z-[1000] flex h-[56px] w-[56px] cursor-pointer items-center justify-center rounded-full border-0 bg-[#FF8A1F] text-white shadow-[0_4px_14px_rgba(255,138,31,0.4)] transition-all duration-200 hover:-translate-y-[2px] hover:bg-[#F27A0A] hover:shadow-[0_6px_18px_rgba(255,138,31,0.5)] active:translate-y-0"
      >
        <ChatBubbleOutlineIcon sx={{ fontSize: 26 }} />
      </button>

      <CustomModal
        open={isOpen}
        handleCLose={() => {
          setIsOpen(false);
          resetForm();
        }}
        width={{ xs: '90%', sm: '440px' }}
        html={
          <Box className="flex flex-col gap-4">
            <Box>
              <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                Отримати консультацію
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: '6px 0 0' }}>
                Залиште контакти, і ми зателефонуємо вам найближчим часом
              </p>
            </Box>

            <TextField
              fullWidth
              label="Ваше ім'я"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              sx={textFieldSx}
            />

            <TextField
              fullWidth
              label="Телефон"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              sx={textFieldSx}
              InputLabelProps={{ shrink: true }}
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
              multiline
              minRows={2}
              maxRows={4}
              sx={textFieldSx}
            />

            <Box>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: '0 0 8px' }}>
                Ви є:
              </p>
              <RadioGroup
                name="clientType"
                value={form.clientType}
                onChange={handleChange}
                row
                sx={{ gap: '10px', flexWrap: 'nowrap' }}
              >
                {[
                  { value: 'new', label: 'Новий абонент' },
                  { value: 'existing', label: 'Діючий абонент' },
                ].map(({ value, label }) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    sx={radioCardSx(form.clientType === value, Boolean(errors.clientType))}
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: 'rgba(255,255,255,0.4)',
                          '&.Mui-checked': { color: '#00B3DC' },
                        }}
                      />
                    }
                    label={<span style={{ color: '#fff', fontSize: '14px' }}>{label}</span>}
                  />
                ))}
              </RadioGroup>
              {errors.clientType && (
                <p style={{ color: '#f87171', fontSize: '12px', margin: '6px 0 0 4px' }}>
                  {errors.clientType}
                </p>
              )}
            </Box>

            <Button
              fullWidth
              onClick={handleSubmit}
              sx={{
                height: '52px',
                mt: '4px',
                borderRadius: '12px',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 600,
                color: '#fff',
                background: 'linear-gradient(135deg, #00B3DC 0%, #0090B8 100%)',
                boxShadow: '0 6px 18px rgba(0,179,220,0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  background: 'linear-gradient(135deg, #00C2ED 0%, #009DC8 100%)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 8px 22px rgba(0,179,220,0.45)',
                },
              }}
            >
              Надіслати
            </Button>
          </Box>
        }
      />

      <CustomModal
        open={successOpen}
        handleCLose={() => setSuccessOpen(false)}
        width={{ xs: '80%', sm: '380px' }}
        html={
          <Box className="flex flex-col items-center gap-4 mt-4">
            <CheckCircleOutlineIcon sx={{ fontSize: 56, color: '#00B3DC' }} />
            <h2 style={{ color: '#fff', fontSize: '26px', fontWeight: 800, textAlign: 'center', margin: 0 }}>
              Дякуємо!
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', textAlign: 'center', margin: 0 }}>
              Наш менеджер зв'яжеться з вами найближчим часом
            </p>
            <img src="/images/logo.svg" alt="Укртелеком" width={140} height={36} loading="lazy" />
          </Box>
        }
      />
    </>
  );
};
