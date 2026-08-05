import { config } from '@/lib/config';

export async function send(
  level: 'info' | 'warn' | 'error',
  message: string,
  data?: Record<string, unknown>,
) {

  if (!config.axiomToken) {
    return;
  }

  await fetch(
    `https://eu-central-1.aws.edge.axiom.co/v1/ingest/${config.axiomDataset}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.axiomToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          level,
          message,
          timestamp: new Date().toISOString(),
          ...data,
        },
      ]),
    },
  ).catch((err) => console.error(String(err)));
}

export const logger = {
  info: (event: string, data?: Record<string, unknown>) => send('info', event, data),
  warn: (event: string, data?: Record<string, unknown>) => send('warn', event, data),
  error: (event: string, data?: Record<string, unknown>) => send('error', event, data),
};
