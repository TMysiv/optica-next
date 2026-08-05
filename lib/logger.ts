import { config } from '@/lib/config';

async function send(level: 'info' | 'warn' | 'error', event: string, data?: Record<string, unknown>) {
  const entry = { _time: new Date().toISOString(), level, event, ...data };

  console[level === 'info' ? 'log' : level](JSON.stringify(entry));

  if (!config.axiomToken) {
    return;
  }

  await fetch(`https://api.axiom.co/v1/datasets/${config.axiomDataset}/ingest`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.axiomToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([entry]),
  }).catch(() => {});
}

export const logger = {
  info: (event: string, data?: Record<string, unknown>) => send('info', event, data),
  warn: (event: string, data?: Record<string, unknown>) => send('warn', event, data),
  error: (event: string, data?: Record<string, unknown>) => send('error', event, data),
};
