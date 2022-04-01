import db from "db"
import { Ctx, AuthorizationError } from "blitz"
import * as z from "zod"
import algoliasearch from "algoliasearch"

// Initialize Algolia
const client = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_API_ADMIN_KEY!)
const index = client.initIndex(`${process.env.ALGOLIA_PREFIX}_articles`)

// Validate data
const AddArticle = z.object({
  title: z.string(),
  doi: z.string(),
  publishedYear: z.number().int(),
  journal: z.string(),
  addedById: z.number().int(),
  authorString: z.string(),
})

export default async function addArticle(input: z.infer<typeof AddArticle>, ctx: Ctx) {
  const data = AddArticle.parse(input)
  ctx.session.$authorize()

  if (!ctx.session.userId) {
    throw new AuthorizationError()
  }

  const article = await db.article.create({ data })

  const addedArticle = await db.article.findFirst({
    where: {
      doi: data.doi,
    },
  })

  // Save the metadata to Algolia
  await index.saveObject({
    objectID: addedArticle?.id,
    name: addedArticle?.title,
    doi: addedArticle?.doi,
    authors: addedArticle?.authorString,
    publishedYear: addedArticle?.publishedYear,
    journal: addedArticle?.journal,
    createdAt: addedArticle?.createdAt,
    createdAt_timestamp: addedArticle?.createdAt.valueOf(),
    updatedAt: addedArticle?.updatedAt,
    updatedAt_timestamp: addedArticle?.updatedAt.valueOf(),
  })

  return article
}
