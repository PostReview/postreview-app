import db from "db"

export default async function getReviewAnswersByUserId(props) {
  const { currentUserId, includeAnonymous = false } = props

  if (includeAnonymous)
    return await db.article.findMany({
      where: {
        review: {
          some: { userId: currentUserId },
        },
      },
      include: {
        review: {
          where: { userId: currentUserId },
          include: {
            question: true,
          },
        },
        reviewComment: {
          where: { userId: currentUserId },
        },
      },
    })

  return await db.article.findMany({
    where: {
      review: {
        some: { userId: currentUserId },
        none: { isAnonymous: true },
      },
    },
    include: {
      review: {
        where: { userId: currentUserId },
        include: {
          question: true,
        },
      },
      reviewComment: {
        where: { userId: currentUserId },
      },
    },
  })
}
