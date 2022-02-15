import db from "db"
import { Ctx, AuthorizationError } from "blitz"

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

  return review
}
