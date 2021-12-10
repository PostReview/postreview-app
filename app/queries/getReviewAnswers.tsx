import db from "db"

export default async function getReviewAnswers(props) {
  const { currentArticleId } = props
  return await db.user.findMany({
    where: {
      review: {
        every: {
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
        include: {
          question: true,
        },
      },
    },
  })
}
