import db from "db"
import { Ctx, AuthorizationError } from "blitz"
import * as z from "zod"

const AddReview = z.array(
  z.object({
    userId: z.number(),
    articleId: z.string(),
    questionId: z.number(),
    response: z.number(),
  })
)

export default async function addReview(input: z.infer<typeof AddReview>, ctx: Ctx) {
  const data = AddReview.parse(input)
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new AuthorizationError()
  }
  // update or create records
  const review = await db.reviewAnswers.createMany({ data })
  return review
}
