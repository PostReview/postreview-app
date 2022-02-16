import db from "db"
import { Ctx, AuthorizationError } from "blitz"
import * as z from "zod"

const AddReview = z.array(
  z.object({
    userId: z.number(),
    articleId: z.string(),
    questionId: z.number(),
    response: z.number(),
    isAnonymous: z.boolean(),
  })
)

export default async function addReview(input: z.infer<typeof AddReview>, ctx: Ctx) {
  const data = AddReview.parse(input)
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new AuthorizationError()
  }
  // Update records if existing, if not create records
  const review = await db.$transaction(
    data.map((latest) =>
      db.reviewAnswers.upsert({
        where: {
          articleId_questionId_userId: {
            articleId: latest.articleId,
            questionId: latest.questionId,
            userId: latest.userId,
          },
        },
        update: {
          response: latest.response,
          isAnonymous: latest.isAnonymous,
        },
        create: {
          ...latest,
        },
      })
    )
  )
  return review
}
