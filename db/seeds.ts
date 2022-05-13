import createReplica from "app/core/createReplica"
import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  // for (let i = 0; i < 5; i++) {
  //   await db.project.create({ data: { name: "Project " + i } })
  // }

  // Seed review questions
  await db.reviewQuestions.createMany({
    data: [
      {
        questionId: 1,
        questionCategory: "Research Question",
        questionText: "Do you find the research question worthwhile?",
        minValue: 1,
        maxValue: 5,
        minLabel: "Not at all",
        maxLabel: "Completely",
      },
      {
        questionId: 2,
        questionCategory: "Design",
        questionText: "Do you find the way the study was conducted adequate?",
        minValue: 1,
        maxValue: 5,
        minLabel: "Not at all",
        maxLabel: "Completely",
      },
      {
        questionId: 3,
        questionCategory: "Findings",
        questionText: "Do you consider the findings sufficient to support the authors' claims?",
        minValue: 1,
        maxValue: 5,
        minLabel: "Not at all",
        maxLabel: "Completely",
      },
      {
        questionId: 4,
        questionCategory: "Interpretation",
        questionText: "Do you find the authors' explanation plausible?",
        minValue: 1,
        maxValue: 5,
        minLabel: "Not at all",
        maxLabel: "Completely",
      },
      {
        questionId: 5,
        questionCategory: "Significance",
        questionText: "How important do you think this study is for the society as a whole?",
        minValue: 1,
        maxValue: 5,
        minLabel: "Not at all",
        maxLabel: "Completely",
      },
    ],
    skipDuplicates: true,
  })

  // Create replica indices
  await createReplica()
    .catch((e) => console.log(e))
    .then(() => console.log("Algolia: Successfully created replica indices"))

  // Seed users
  // await db.user.createMany({
  //   data: users,
  // })

  // TODO: Seed articles

  // Seed review answers
  // await db.reviewAnswers.createMany({
  //   data: reviewAnswers,
  // })
}

export default seed
