import db from "db"

export default async function getReviewQuestions() {
  return await db.reviewQuestions.findMany()
}
