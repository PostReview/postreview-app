import db from "db"

export default async function getReviewAnswers(props) {
  const { currentUserId, currentArticleId } = props
  // I should update the query so that we are reading the reviews nested within users
  return await db.user.findMany({
    where: {
      review: {
        every: {
          articleId: currentArticleId,
        },
      },
    },
    include: {
      review: {
        include: {
          question: true,
        },
      },
    },
  })
  // return await db.reviewAnswers.findMany({
  //   where: { userId: currentUserId, articleId: currentArticleId },
  //   include: { writtenBy: { select: { handle: true, displayName: true } } },
  // })
}
