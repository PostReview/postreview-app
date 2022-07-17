import db from "db"
import { Ctx, AuthorizationError } from "blitz"
import * as z from "zod"
// import algoliasearch from "algoliasearch"

// TODO: Add comments to indices
// Initialize Algolia
// const client = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_API_ADMIN_KEY!)
// const index = client.initIndex(`${process.env.ALGOLIA_PREFIX}_articles`)

const AddReviewComment = z.object({
  userId: z.number(),
  articleId: z.string(),
  isAnonymous: z.boolean(),
  comment: z.string(),
})

export default async function addReviewComment(input: z.infer<typeof AddReviewComment>, ctx: Ctx) {
  const data = AddReviewComment.parse(input)
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new AuthorizationError()
  }

  const addedReviewComment = db.reviewComments.upsert({
    where: {
      userId_articleId: {
        articleId: data.articleId,
        userId: data.userId,
      },
    },
    update: {
      comment: data.comment,
      isAnonymous: data.isAnonymous,
    },
    create: {
      ...data,
    },
  })

  return addedReviewComment
}
