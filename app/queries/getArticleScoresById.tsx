import db from "db"

export default async function getArticleScoresById(props) {
  const { currentArticleId } = props
  return await db.reviewAnswers.groupBy({
    by: ["articleId", "questionId"],
    where: { articleId: currentArticleId },
    _avg: {
      response: true,
    },
    _count: {
      response: true,
    },
    orderBy: {
      questionId: "asc",
    },
  })
}
