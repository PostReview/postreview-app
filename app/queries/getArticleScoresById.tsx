import db from "db"

export default async function getArticleScoresById(props) {
  const { articleId } = props
  return await db.reviewAnswers.groupBy({
    by: ["articleId", "questionId"],
    where: { articleId: articleId },
    _avg: {
      response: true,
    },
    orderBy: {
      questionId: "asc",
    },
  })
}
