import db from "db"

export default async function getUsersWithReviewsByArticleId(props) {
  const { currentArticleId } = props
  return await db.user.findMany({
    where: {
      review: {
        some: {
          articleId: currentArticleId,
        },
      },
    },
    select: {
      id: true,
      handle: true,
      displayName: true,
      icon: true,
      review: {
        where: { articleId: currentArticleId },
        include: {
          question: true,
        },
      },
      reviewComments: {
        where: { articleId: currentArticleId },
      },
    },
  })
}
