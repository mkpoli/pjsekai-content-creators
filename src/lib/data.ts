// import sheets from '@googleapis/sheets'

// const  = google.sheets('v4')

export interface YouTuber {
  channelID: string
  link: string
  profilePictureUrl: string
  name: string
  creationDate: string
  subscribers: number
  customUrl: string
}

export async function getYouTubers() {
  const result = await (await fetch('/api/data')).text()
  return JSON.parse(result) as YouTuber[]
}
