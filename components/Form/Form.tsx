'use client';
import {
  Box, Grid, TextField, MenuItem, Checkbox,
  useTheme, useMediaQuery, Paper, IconButton, Autocomplete,
} from '@mui/material';
import { beautifyErrors, houseTypes, regions, services, speeds } from '@/lib/helpers';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { CustomButton } from '@/components/Custom/CustomButton';
import { PhoneMask } from '@/components/Masks/PhoneMask';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { offerCreateSchema } from '@/validation/offerCreateSchema';
import { CustomModal } from '@/components/Custom/CustomModal';
import { Offer, ValidationErrors } from '@/lib/types';
import { createOffer } from '@/services/api.service';
import data from '@/lib/addreska.json';

const formSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Підключення інтернету GPON',
  provider: { '@type': 'Organization', name: 'Укртелеком' },
  areaServed: 'UA',
  availableLanguage: 'Ukrainian',
};

const initialOffer: Offer = {
  service: 'Інтернет', isMash: false, countMash: 1, speed: '1000 МБіт/с',
  typeOfHouse: 'В квартиру', region: '', city: '', street: '',
  house: '', flat: '', username: '', phone: '', note: '',
};

const createMenuItemArray = (items: { id: number; value: string }[]) =>
  items.map((item) => <MenuItem key={item.id} value={item.value}>{item.value}</MenuItem>);

export const Form = () => {
  const [offer, setOffer] = useState<Offer>(initialOffer);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors<Offer>>({});
  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down(600));
  const isS = useMediaQuery(theme.breakpoints.down(765));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;
    setOffer((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAutoCompleteChange = (name: string, value: string) => {
    setOffer((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const handler = (e: any) => {
      if (e?.detail) setOffer((prev) => ({ ...prev, [e.detail.name]: e.detail.value }));
    };
    window.addEventListener('scrollToForm', handler);
    return () => window.removeEventListener('scrollToForm', handler);
  }, []);

  const handleSaveOffer = async () => {
    try {
      const validateOffer = offerCreateSchema.validateSync(offer, { abortEarly: false }) as Offer;
      setValidationErrors({});
      setOpenModal(true);
      setOffer(initialOffer);
      await createOffer({ ...validateOffer, note: validateOffer.note?.replace(/\s+/g, ' ') });
    } catch (errors) {
      setValidationErrors(beautifyErrors(errors));
    }
  };

  const cities = useMemo(
    () => offer.region ? Array.from(new Set(data.filter((d) => d.region === offer.region).map((d) => d.city))) : [],
    [offer.region]
  );

  const textFieldProps = { variant: 'standard' as const, size: 'small' as const, margin: 'none' as const, className: 'text-field', slotProps: { inputLabel: { shrink: true } } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(formSchema) }} />
      <Box className="form-section relative" component="section" aria-label="Форма заявки на підключення інтернету">
        <Box className="w-full h-18 bg-cyan-500 rounded-top-left rounded-top-right" />
        <Box
          className={`border-4 border-cyan-500 px-14 py-10 rounded-bottom-left rounded-bottom-right ${isXs ? 'flex flex-col items-center' : ''} form-block`}
          id="form-section"
        >
          <Grid container className="w-full" spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                select
                label="Послуга"
                name="service"
                onChange={handleChange}
                value={offer.service}
                required {...textFieldProps}
                error={Boolean(validationErrors.service)}
                helperText={validationErrors.service}>
                {createMenuItemArray(services)}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }} container>
              <Grid size={{ xs: 12 }}>
                <label className="flex items-center cursor-pointer">
                  <Checkbox
                    name="isMash"
                    checked={offer.isMash}
                    onChange={handleChange}
                    size="small"
                    sx={{ paddingLeft: 0, color: '#fff', '&.Mui-checked': { color: '#fff' } }}
                  />
                  <span className="text-white text-lg">Потрібен Гігабітний Wi-Fi роутер</span>
                </label>
              </Grid>
              {offer.isMash && (
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <TextField
                      value={offer.countMash}
                      onChange={handleChange}
                      name="countMash"
                      inputMode="numeric"
                      type="number"
                      variant="standard"
                      size="small"
                      error={Boolean(validationErrors.countMash)}
                      helperText={validationErrors.countMash}
                      sx={{
                        width: '48px',
                        '& input': {
                          textAlign: 'center',
                          color: 'white',
                          MozAppearance: 'textfield',
                          '&::-webkit-outer-spin-button': { display: 'none' },
                          '&::-webkit-inner-spin-button': { display: 'none' },
                        },
                        '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                        '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                      }}
                    />
                    {[
                      { icon: <RemoveIcon fontSize="small" />, action: () => setOffer((p) => ({ ...p, countMash: Math.max(p.countMash - 1, 1) })) },
                      { icon: <AddIcon fontSize="small" />, action: () => setOffer((p) => ({ ...p, countMash: p.countMash + 1 })) },
                    ].map(({ icon, action }, i) => (
                      <Paper key={i} elevation={0} sx={{ border: '1px solid white', borderRadius: '6px', display: 'flex', alignItems: 'center', background: 'inherit' }}>
                        <IconButton size="small" sx={{ padding: '2px', width: 20, height: 20, color: 'white' }} onClick={action}>{icon}</IconButton>
                      </Paper>
                    ))}
                  </Box>
                </Grid>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Швидкість"
                name="speed"
                value={offer.speed}
                onChange={handleChange}
                required {...textFieldProps}
                error={Boolean(validationErrors.speed)}
                helperText={validationErrors.speed}
              >
                {createMenuItemArray(speeds)}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Тип Будинку"
                name="typeOfHouse"
                value={offer.typeOfHouse}
                onChange={handleChange}
                required {...textFieldProps}
                error={Boolean(validationErrors.typeOfHouse)}
                helperText={validationErrors.typeOfHouse}
              >
                {createMenuItemArray(houseTypes)}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Autocomplete
                options={regions} value={offer.region}
                onChange={(_, newValue) => {
                  handleAutoCompleteChange('region', newValue || ''); setOffer((p) => ({ ...p, city: '' }));
                }}
                noOptionsText="Нічого не знайдено"
                renderInput={(params) =>
                  <TextField
                    {...params}
                    fullWidth
                    label="Область"
                    name="region"
                    required
                    {...textFieldProps}
                    error={Boolean(validationErrors.region)}
                    helperText={validationErrors.region}
                  />
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Autocomplete
                options={cities} value={offer.city}
                onChange={(_, newValue) => handleAutoCompleteChange('city', newValue || '')}
                disabled={!offer.region} noOptionsText="Нічого не знайдено"
                renderInput={(params) =>
                  <TextField
                    {...params}
                    fullWidth
                    label="Населений пункт"
                    name="city"
                    required
                    {...textFieldProps}
                    error={Boolean(validationErrors.city)}
                    helperText={validationErrors.city}
                  />
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Вулиця"
                name="street"
                value={offer.street}
                onChange={handleChange}
                placeholder="Шевченка"
                required {...textFieldProps}
                error={Boolean(validationErrors.street)}
                helperText={validationErrors.street}
              />
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <TextField
                fullWidth
                label="Будинок"
                name="house"
                value={offer.house}
                onChange={handleChange}
                placeholder="11"
                required {...textFieldProps}
                error={Boolean(validationErrors.house)}
                helperText={validationErrors.house}
              />
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <TextField
                fullWidth
                label="Квартира"
                name="flat"
                value={offer.flat}
                onChange={handleChange}
                placeholder="0"
                {...textFieldProps}
                error={Boolean(validationErrors.flat)}
                helperText={validationErrors.flat}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Ваше ім'я"
                name="username"
                value={offer.username}
                onChange={handleChange}
                required
                placeholder="Ваше ім'я"
                {...textFieldProps}
                error={Boolean(validationErrors.username)}
                helperText={validationErrors.username}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                type="tel"
                fullWidth
                label="Ваш телефон"
                name="phone"
                required
                placeholder="+38 (0__) ___ __ __"
                onChange={handleChange}
                value={offer.phone}
                {...textFieldProps}
                error={Boolean(validationErrors.phone)}
                helperText={validationErrors.phone}
                InputProps={{
                  inputComponent: PhoneMask as any,
                  inputProps: {
                    error: Boolean(validationErrors.phone)
                  }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Примітка"
                name="note"
                value={offer.note}
                onChange={handleChange}
                placeholder="Примітка"
                {...textFieldProps}
                error={Boolean(validationErrors.note)}
                helperText={validationErrors.note}
              />
            </Grid>
          </Grid>

          <p role="note" className="agree-text max-w-[536px] mt-[18px] mb-[25px] text-[#D7D7D7] text-[11px] font-[350]">
            Відправляючи Заявку, Ви даєте згоду АТ «Укртелеком» на обробку Ваших персональних даних відповідно до умов Закону України «Про захист персональних даних» **
          </p>

          <CustomButton
            text="ПІДКЛЮЧИТИ"
            width={247}
            className="bg-cyan-500 text-white hover:bg-yellow-850 hover:text-black text-xl mt-5"
            handleClick={handleSaveOffer}
          />

          {!isS && (
            <img
              src="/images/mesh-router.png"
              alt="Wi-Fi роутер TP-Link Mercusys EasyMesh для GPON інтернету"
              className="w-45 h-70 absolute -right-7 -bottom-12"
              loading="lazy"
              width={180}
              height={282}
            />
          )}

          {openModal && (
            <CustomModal
              open={openModal}
              handleCLose={() => setOpenModal(false)}
              width={{ xs: '80%', md: '40%' }}
              html={
                <Box className="flex flex-col items-center gap-5 mt-5">
                  <h2 className="text-5xl font-extrabold text-cyan-500 text-center">Ваша заявка прийнята!</h2>
                  <p className="text-white text-xl text-center">Наш менеджер зателефонує в найближчий час</p>
                  <img src="/images/logo.svg" alt="Укртелеком — оптичний інтернет провайдер" />
                </Box>
              }
            />
          )}
          <span aria-hidden="true" className="ellipse ellipse-8" />
        </Box>
      </Box>
    </>
  );
};
