import db from "db"
import { Ctx, AuthorizationError } from "blitz"
import { updateArticleIndex } from "./helpers/updateArticleIndex"

export default async function deleteReview(currentArticleId: string, ctx: Ctx) {
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new AuthorizationError()
  }

  const currentUserId = ctx.session.userId

  const review = await db.reviewAnswers.deleteMany({
    where: {
      articleId: currentArticleId,
      userId: currentUserId,
    },
  })

  // Update Algolia Index
  updateArticleIndex(currentArticleId)

  return review
}
