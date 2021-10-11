import db from "db"

export default async function hasUserSunmittedReview({ userId, articleId }) {
  return (await db.reviewAnswers.findFirst({
    where: {
      userId: userId,
      articleId: articleId,
    },
  }))
    ? true
    : false
}
