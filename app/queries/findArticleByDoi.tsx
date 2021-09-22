import db from "db"

export default async function findArticleByDoi(doi: string) {
  return await db.article.findUnique({
    where: { doi },
  })
}
