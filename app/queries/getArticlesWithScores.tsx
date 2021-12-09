import db from "db"

export default async function getArticlesWithScores() {
  return await db.reviewAnswers.groupBy({
    by: ["articleId", "questionId"],
    _avg: {
      response: true,
    },
    orderBy: {
      questionId: "asc",
    },
  })
}
