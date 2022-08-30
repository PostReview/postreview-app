import db from "db"
import { Ctx, AuthorizationError } from "blitz"
import algoliasearch from "algoliasearch"

// Initialize Algolia
const client = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_API_ADMIN_KEY!)
const index = client.initIndex(`${process.env.ALGOLIA_PREFIX}_users`)

export default async function deleteUser(currentUserId, ctx: Ctx) {
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new AuthorizationError()
  }

  const result = await db.user.delete({ where: { id: currentUserId } })

  // Update Algolia
  await index.deleteObject(currentUserId)

  return result
}
