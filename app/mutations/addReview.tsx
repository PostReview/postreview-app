import db from "db"
import { Ctx, AuthorizationError } from "blitz"
import * as z from "zod"
import algoliasearch from "algoliasearch"
import getArticleScoresById from "app/queries/getArticleScoresById"
import getUsersWithReviewsByArticleId from "app/queries/getUsersWithReviewsByArticleId"

// Initialize Algolia
const client = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_API_ADMIN_KEY!)
const index = client.initIndex(`${process.env.ALGOLIA_PREFIX}_articles`)

const AddReview = z.array(
  z.object({
    userId: z.number(),
    articleId: z.string(),
    questionId: z.number(),
    response: z.number().nullable(),
    isAnonymous: z.boolean(),
  })
)

export default async function addReview(input: z.infer<typeof AddReview>, ctx: Ctx) {
  const data = AddReview.parse(input)
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new AuthorizationError()
  }

  // Update records if existing, if not create records
  const review = await db.$transaction(
    data.map((latest) =>
      db.reviewAnswers.upsert({
        where: {
          articleId_questionId_userId: {
            articleId: latest.articleId,
            questionId: latest.questionId,
            userId: latest.userId,
          },
        },
        update: {
          response: latest.response,
          isAnonymous: latest.isAnonymous,
        },
        create: {
          ...latest,
        },
      })
    )
  )

  // Delete any null responses
  const deleted = await db.reviewAnswers.deleteMany({ where: { response: null } })

  // Update article metadata on Algolia
  // Get the new scores for the article
  const articleScores = await getArticleScoresById({ currentArticleId: data[0]?.articleId })
  const totalRating = articleScores.reduce((prev, current) => {
    return prev + current._avg.response! / articleScores.length
  }, 0)

  const addedArticle = await db.article.findFirst({
    where: {
      id: data[0]?.articleId,
    },
  })

  const usersWithReview = await getUsersWithReviewsByArticleId({
    currentArticleId: addedArticle?.id,
  })
  const ratingsCount = usersWithReview.length

  // Save the metadata to Algolia
  // TODO: Streamline the data structure to accommodate multiple review versions
  //       Group by versions, {questionId: XX, questionLabel: XX, response: XX}
  await index.partialUpdateObject({
    objectID: addedArticle?.id,
    ratingsCount: ratingsCount,
    ratingTotal: totalRating,
    ratingRQ: articleScores.find((item) => item.questionId == 1)?._avg.response,
    ratingDesign: articleScores.find((item) => item.questionId == 2)?._avg.response,
    ratingFindings: articleScores.find((item) => item.questionId == 3)?._avg.response,
    ratingInterpretation: articleScores.find((item) => item.questionId == 4)?._avg.response,
    ratingSignificance: articleScores.find((item) => item.questionId == 5)?._avg.response,
  })

  return review
}
