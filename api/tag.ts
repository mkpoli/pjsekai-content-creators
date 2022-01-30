import type { VercelRequest, VercelResponse } from '@vercel/node'
import { client, q, faunadb } from './fauna'
export default async (request: VercelRequest, response: VercelResponse) => {
  const { data: { name, id } } = JSON.parse(request.body)
  if (request.method === 'POST') {
    try {
      await client.query(
        q.Call(q.Function('AddTagToChannel'), [name, id])
      )
      response.status(200).end()
    } catch (error) {
      if (error instanceof faunadb.errors.FaunaHTTPError) {
        response.status(error.requestResult.statusCode).json(error.message)
      } else {
        response.status(500).end()
      }
    }
  } else {
    response.status(405).end()
  }
}