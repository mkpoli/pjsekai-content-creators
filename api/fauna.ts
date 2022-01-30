import faunadb from 'faunadb'
export const client = new faunadb.Client({
  secret: process.env.FAUNA_ADMIN_KEY,
  domain: "db.us.fauna.com"
})
export const q = faunadb.query
export { default as faunadb } from 'faunadb'