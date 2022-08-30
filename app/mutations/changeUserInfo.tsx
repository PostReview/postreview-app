import db from "db"
import { Ctx, AuthorizationError } from "blitz"
import * as z from "zod"
import algoliasearch from "algoliasearch"

// Initialize Algolia
const client = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_API_ADMIN_KEY!)
const index = client.initIndex(`${process.env.ALGOLIA_PREFIX}_users`)

const inputData = z.object({
  id: z.number(),
  handle: z.string(),
  displayName: z.string().optional().nullable(),
  pronoun: z.string().optional().nullable(),
  aboutMe: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  isOnboarded: z.boolean().optional(),
})

export default async function changeUserInfo(input: z.infer<typeof inputData>, ctx: Ctx) {
  const data = inputData.parse(input)
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new AuthorizationError()
  }

  const { id, ...otherData } = data

  const result = await db.user.update({
    where: { id: data.id },
    data: {
      ...otherData,
    },
  })

  // Update Algolia
  await index.partialUpdateObject({
    objectID: data.id,
    ...otherData,
    updatedAt_timestamp: Date.now(),
  })

  return result
}
