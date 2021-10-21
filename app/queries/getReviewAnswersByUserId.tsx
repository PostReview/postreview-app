import db from "db"

export default async function getReviewAnswers(props) {
  const { currentUserId } = props
  return await db.reviewAnswers.findMany({
    where: { userId: currentUserId },
    include: {
      targetArticle: true,
      question: true,
    },
  })
}
