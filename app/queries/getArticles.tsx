import db from "db"

export default async function getArticles() {
  return await db.article.findMany({
    include: {
      review: {
        include: {
          question: true,
        },
      },
    },
  })
}
