import db from "db"
import { Ctx, AuthorizationError } from "blitz"
import * as z from "zod"

const inputData = z.object({
  userId: z.number(),
  articleId: z.string(),
  isAnonymous: z.boolean(),
})

export default async function changeReviewAnonimity(input: z.infer<typeof inputData>, ctx: Ctx) {
  const data = inputData.parse(input)
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new AuthorizationError()
  }

  // Update records if existing, if not create records
  const review = await db.reviewAnswers.updateMany({
    where: { articleId: data.articleId, userId: data.userId },
    data: {
      isAnonymous: data.isAnonymous,
    },
  })
  return review
}
