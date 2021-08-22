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
  
  const HEADER = ['channelID', 'name', 'subscribers', 'customUrl', 'link', 'creationDate', 'profilePictureUrl']

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: 'YouTube'
    })
    const values = res.data.values
    response.status(200).send(
      JSON.stringify(
        values.slice(1).map(
          (x) => Object.fromEntries(
            x.map(
              (v, i) => [HEADER[i], v]
            )
          )
        )
      )
    )
  } catch (err) {
    response.status(500).send(`Error!`)
  }
}