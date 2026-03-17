import { google, sheets_v4 } from 'googleapis';
import { JWT } from 'google-auth-library';
import {config} from "@/lib/config";

function getSheets(): sheets_v4.Sheets {
  const auth = new JWT({
    email: config.googleClientEmail,
    key: config.googlePrivateKey?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

export async function writeSheet(
  spreadsheetId: string,
  range: string,
  values: (string | null)[][]
): Promise<void> {
  const sheets = getSheets();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });
}
