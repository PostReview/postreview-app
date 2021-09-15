import db from "db"
import { Ctx, AuthorizationError } from "blitz"
import * as z from "zod"

// schema validation
const AddArticle = z.object({
  title: z.string(),
  doi: z.string(),
  publishedYear: z.number().int(),
  journal: z.string(),
  addedById: z.number().int(),
})

export default async function addArticle(input: z.infer<typeof AddArticle>, ctx: Ctx) {
  const data = AddArticle.parse(input)
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new AuthorizationError()
  }

  const article = await db.article.create({ data })

  return article
}
