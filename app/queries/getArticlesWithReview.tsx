import db from "db"

export default async function getArticlesWithReview() {
  return await db.article.findMany({
    include: {
      review: {
        include: {
          question: true,
        },
      },
    },
    where: {
      review: { some: {} },
    },
  })
}
