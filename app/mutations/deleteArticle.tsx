import db from "db"
import { Ctx, AuthorizationError } from "blitz"

export default async function deleteArticle(id: string, ctx: Ctx) {
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new AuthorizationError()
  }

  const article = await db.article.delete({ where: { id: id } })

  return article
}
