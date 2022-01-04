import db from "db"

export default async function getReviewAnswersByUserId(props) {
  const { currentUserId } = props
  return await db.article.findMany({
    where: {
      review: {
        some: {},
        every: {
          userId: currentUserId,
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
}
