import db from "db"

export default async function getArticleByDoi(doi: string) {
  const articleInfo = await db.article.findFirst({ where: { doi: doi } })
  return articleInfo
}
