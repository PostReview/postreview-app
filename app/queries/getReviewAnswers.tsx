import db from "db"

export default async function getReviewAnswers(props) {
  const { currentUserId, currentArticleId } = props
  return await db.reviewAnswers.findMany({
    where: { userId: currentUserId, articleId: currentArticleId },
  })
}
