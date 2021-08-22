export interface YouTuber {
  channelID: string
  link: string
  profilePictureUrl: string
  name: string
  creationDate: string
  subscribers: number
  customUrl: string
}

export async function getYouTubers(): Promise<YouTuber[]> {
  const response = await fetch(import.meta.env.PROD ? '/api/data' : 'https://pjsekai-content-creators.vercel.app/api/data')
  const data = response.json();
  return data as Promise<YouTuber[]>
}
