import { CreateOfferDTO } from '@/lib/types';
import { services, speeds, houseTypes, regions } from '@/lib/helpers';

type ValidationError = { field: string; message: string };

const MAX_LENGTHS: Partial<Record<keyof CreateOfferDTO, number>> = {
  username: 100,
  city: 100,
  street: 100,
  house: 20,
  phone: 20,
  note: 500,
};

const ALLOWLISTS: Partial<Record<keyof CreateOfferDTO, string[]>> = {
  service: services.map(s => s.value),
  speed: speeds.map(s => s.value),
  typeOfHouse: houseTypes.map(h => h.value),
  region: regions,
};

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
      continue;
    }
    const val = b[field] as string;
    const maxLen = MAX_LENGTHS[field];
    if (maxLen && val.length > maxLen) {
      errors.push({ field, message: `${field} перевищує максимальну довжину ${maxLen}` });
    }
    const allowlist = ALLOWLISTS[field];
    if (allowlist && !allowlist.includes(val)) {
      errors.push({ field, message: `${field} містить недозволене значення` });
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
