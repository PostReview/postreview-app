import db from "db"
import { Ctx, AuthorizationError } from "blitz"
import * as z from "zod"

// schema validation
const AddReview = z.object({
  // prisma schema
  userId: z.number(),
  articleId: z.string(),
  questionId: z.number(),
  response: z.string(),
})

export default async function addReview(input: z.infer<typeof AddReview>, ctx: Ctx) {
  const data = AddReview.parse(input)
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new AuthorizationError()
  }

  const review = await db.review.create({ data })

  return review
}
