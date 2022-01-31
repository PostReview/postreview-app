import db from "db"

export default async function getUssersWithReviewsByArticleId(props) {
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
    },
  })
}
