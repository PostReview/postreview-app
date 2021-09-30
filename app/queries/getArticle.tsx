import db from "db"
import { NotFoundError } from "next/stdlib"

export default async function getArticle(id: string) {
  const article = await db.article.findUnique({ where: { id: id } })
  if (!article) {
    throw new NotFoundError()
  }
  return article
}
