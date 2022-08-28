import db from "db"
import { Ctx, AuthorizationError } from "blitz"
import * as z from "zod"
import { updateArticleIndex } from "./helpers/updateArticleIndex"

const AddReview = z.array(
  z.object({
    userId: z.number(),
    articleId: z.string(),
    questionId: z.number(),
    response: z.number().nullable(),
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

  // Delete any null responses
  // const deleted = await db.reviewAnswers.deleteMany({ where: { response: null } })

  // Update Algolia index
  updateArticleIndex(data[0]?.articleId)

  return review
}
