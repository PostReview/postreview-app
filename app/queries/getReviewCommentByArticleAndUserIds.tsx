import db from "db"

export default async function getReviewCommentByArticleAndUserIds(props) {
  const { currentUserId, currentArticleId } = props

  return await db.reviewComments.findFirst({
    where: {
      articleId: currentArticleId,
      userId: currentUserId,
    },
    select: {
      comment: true,
    },
  })
}
