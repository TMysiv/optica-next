import { CreateOfferDTO } from '@/lib/types';

type ValidationError = { field: string; message: string };

export function validateOffer(body: unknown): { data: CreateOfferDTO } | { errors: ValidationError[] } {
  const errors: ValidationError[] = [];
  const b = body as Record<string, unknown>;

  const requiredStrings: (keyof CreateOfferDTO)[] = [
    'service', 'speed', 'typeOfHouse', 'region',
    'city', 'street', 'house', 'username', 'phone',
  ];

  for (const field of requiredStrings) {
    if (!b[field] || typeof b[field] !== 'string') {
      errors.push({ field, message: `${field} є обов'язковим рядковим полем` });
    }
  }

  if (typeof b.isMash !== 'boolean') {
    errors.push({ field: 'isMash', message: 'isMash має бути boolean' });
  }

  if (b.countMash !== undefined && typeof b.countMash !== 'number') {
    errors.push({ field: 'countMash', message: 'countMash має бути числом' });
  }

  if (errors.length > 0) return { errors };

  return { data: b as unknown as CreateOfferDTO };
}
