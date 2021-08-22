import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis'
const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    },
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets'
    ],
    projectId: process.env.GOOGLE_PROJECT_ID
})

export default async (request: VercelRequest, response: VercelResponse) => {
  const { name = 'World' } = request.query;

  const authClient = await auth.getClient()
  google.options({
    auth: authClient,
  })

  const res = await sheets.spreadsheets.get({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
  })

  response.status(200).send(`Hello ${name}! ${res}`);
};