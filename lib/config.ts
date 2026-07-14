export const config = {
  api: process.env.NEXT_PUBLIC_API,
  domain: process.env.NEXT_PUBLIC_SITE ?? 'https://yourdomain.com',
  phone: process.env.NEXT_PUBLIC_PHONE,
  email: process.env.NEXT_PUBLIC_EMAIL,
  googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY,
  googleSheetActual: process.env.GOOGLE_SHEET_ACTUAL,
  googleSheetId: process.env.GOOGLE_SHEET_ID,
  telegramToken: process.env.TELEGRAM_TOKEN,
  telegramChat: process.env.TELEGRAM_CHAT,
};
