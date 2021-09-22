import db from "db"

export default async function isArticlePresent(doi: string) {
  return (await db.article.findFirst({ where: { doi: doi } })) ? true : false
}
