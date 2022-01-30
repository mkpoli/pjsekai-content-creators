import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis'

import { client, q } from './fauna'

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

const HEADER = ['channelID', 'name', 'subscribers', 'customUrl', 'link', 'creationDate', 'profilePictureUrl'] as const
type Header = typeof HEADER[number]

async function getTags(channels: Record<Header, string>[]) {
  return await client.query(
    q.Map(
      channels,
      q.Lambda("channel",
        q.Call(q.Function("GetTagsFromID"), q.Select("channelID", q.Var("channel")))    
      )
    )
  ) as { id: string, tags: { name: string, count: number }[] }[]
}

export default async (request: VercelRequest, response: VercelResponse) => {
  const authClient = await auth.getClient()
  google.options({
    auth: authClient,
  })

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: 'YouTube'
    })
    const values = res.data.values as string[][]
    const result: (Record<Header, string> & { tags?: { name: string, count: number }[] })[] = values.slice(1).map(
      (x) => Object.fromEntries(
        x.map(
          (v, i) => [HEADER[i], v]
        )
      ) as Record<Header, string>
    )
    const tags = await getTags(result)
    for (const [i, { channelID }] of result.entries()) {
      result[i].tags = tags.find(({ id }) => id === channelID)?.tags ?? []
    }
    response.status(200).json(result)
  } catch (err) {
    console.error(err)
    response.status(500).send(`Error: ${err}`)
  }
}