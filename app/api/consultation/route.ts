import { NextRequest, NextResponse } from 'next/server';
import { writeSheet } from '@/lib/google-sheets';
import { sendTelegramMessage } from '@/lib/telegram';
import { config } from '@/lib/config';
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
  const start = Date.now();

  try {
    const body = await req.json();

    const username = (body.username ?? '').trim();
    const phone = (body.phone ?? '').toString().replace(/\D/g, '');
    const question = (body.question ?? '').trim();

    if (!username || phone.length < 10) {
      return NextResponse.json({ errors: { username: !username ? "Обов'язкове поле" : '', phone: phone.length < 10 ? 'Невірний номер' : '' } }, { status: 400 });
    }

    const sheetName = config.googleSheetConsult ?? '';
    const sheetId = config.googleSheetId ?? '';

    const day = new Date().toLocaleDateString('uk-UA');

    const row: string[] = [day, username, phone, question];

    await writeSheet(sheetId, sheetName, [row]);

    await sendTelegramMessage(
      config.telegramChat ?? '',
      `Нова консультація:
Телефон: ${phone}
ПІБ: ${username}
Питання: ${question}`
    );

    await logger.info('consultation_saved', { duration_ms: Date.now() - start });

    return NextResponse.json({ message: 'Заявку на консультацію отримано' }, { status: 201 });
  } catch (error) {
    await logger.error('consultation_api_error', { error: String(error), duration_ms: Date.now() - start });
    return NextResponse.json({ message: 'Внутрішня помилка сервера' }, { status: 500 });
  }
}
