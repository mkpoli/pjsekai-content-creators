import exampleData from './example_data.json'

export interface YouTuber {
  channelID: string
  link: string
  profilePictureUrl: string
  name: string
  creationDate: string
  subscribers: number
  customUrl: string,
  tags: Tag[]
}

export interface Tag {
  name: string
  count: number
}

export async function getYouTubers(): Promise<YouTuber[]> {
  let data: Promise<YouTuber[]>
  if (import.meta.env.PROD) {
    const response = await fetch(import.meta.env.PROD ? '/api/data' : 'https://pjsekai-content-creators.vercel.app/api/data')
    data = response.json();
  } else {
    await new Promise(r => setTimeout(r, 2000))
    data = Promise.resolve(exampleData as YouTuber[])
  }
  return data 
}

export async function addTagToChannel(tag: string, channelID: string): Promise<void> {
  await fetch('/api/tag', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        name: tag,
        id: channelID
      }
    })
  })
}