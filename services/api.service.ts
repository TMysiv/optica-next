import { Offer } from '@/lib/types';

export async function createOffer(offer: Offer): Promise<void> {
  const res = await fetch('/api/add', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(offer),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message ?? 'Помилка при відправці заявки');
  }
}

export async function createConsult(payload: { username: string; phone: string; question?: string }): Promise<void> {
  const res = await fetch('/api/consultation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message ?? 'Помилка при відправці консультації');
  }
}
