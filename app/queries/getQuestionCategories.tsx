import db from "db"

export default async function getQuestionCategories() {
  return await db.reviewQuestions.findMany()
}
