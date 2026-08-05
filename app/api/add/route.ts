import { NextRequest, NextResponse } from 'next/server';
import { writeSheet } from '@/lib/google-sheets';
import { sendTelegramMessage } from '@/lib/telegram';
import { validateOffer } from '@/lib/validate';
import { config } from '@/lib/config';
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
  const start = Date.now();

  try {
    const body = await req.json();

    const result = validateOffer(body);
    if ('errors' in result) {
      logger.warn('validation_failed', { errors: result.errors });
      return NextResponse.json({ errors: result.errors }, { status: 400 });
    }

    const offer = result.data;

    const sheetName = config.googleSheetActual ?? '';
    const sheetId = config.googleSheetId ?? '';

    const day = new Date().toLocaleDateString('uk-UA');

    const row: (string | null)[] = [
      day,
      offer.region,
      offer.city,
      offer.street,
      offer.typeOfHouse,
      offer.house,
      offer.flat ?? '0',
      offer.username,
      offer.phone.replace(/\D/g, ''),
      offer.service,
      offer.isMash ? 'Так' : 'Ні',
      offer.countMash && offer.isMash ? String(offer.countMash) : '',
      offer.note ?? '',
    ];

    await writeSheet(sheetId, sheetName, [row]);

    await sendTelegramMessage(
      config.telegramChat ?? '',
      `Додана нова заявка:
  Область: ${offer.region}
  Населений пункт: ${offer.city}
  Вулиця: ${offer.street}
  Телефон: ${offer.phone.replace(/\D/g, '')}
  ПІБ: ${offer.username}`
    );

    logger.info('lead_saved', { region: offer.region, city: offer.city, service: offer.service, duration_ms: Date.now() - start });

    return NextResponse.json({ message: 'Заявку успішно додано' }, { status: 201 });
  } catch (error) {
    logger.error('api_error', { error: String(error), duration_ms: Date.now() - start });
    return NextResponse.json({ message: 'Внутрішня помилка сервера' }, { status: 500 });
  }
}
