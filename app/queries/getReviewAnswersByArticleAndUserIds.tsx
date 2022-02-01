import db from "db"

export default async function getReviewAnswersByArticleAndUserIds(props) {
  const { currentArticleId, currentUserId } = props
  return await db.reviewAnswers.findMany({
    where: {
      userId: currentUserId,
      articleId: currentArticleId,
    },
  })
}
