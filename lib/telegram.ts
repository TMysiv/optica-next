import {config} from "@/lib/config";

export async function sendTelegramMessage(
  chatId: string | number,
  message: string
): Promise<void> {
  const token = config.telegramToken ?? '';

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Telegram API error: ${error}`);
  }
}
