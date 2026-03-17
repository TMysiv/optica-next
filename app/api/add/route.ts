import { NextRequest, NextResponse } from 'next/server';
import { writeSheet } from '@/lib/google-sheets';
import { sendTelegramMessage } from '@/lib/telegram';
import { validateOffer } from '@/lib/validate';
import { config } from '@/lib/config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = validateOffer(body);
    if ('errors' in result) {
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
      `Додана 1 заявка: ${offer.region} область, н.п. ${offer.city}, к.т. ${offer.phone.replace(/\D/g, '')}, піб ${offer.username}`
    );

    return NextResponse.json({ message: 'Заявку успішно додано' }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/add]', error);
    return NextResponse.json({ message: 'Внутрішня помилка сервера' }, { status: 500 });
  }
}
