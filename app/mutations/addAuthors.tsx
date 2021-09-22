import db from "db"
import { Ctx, AuthorizationError } from "blitz"
import * as z from "zod"
import { array } from "zod"

const parseAuthor = (author, articleId) => {
  const output = {
    orcid: author?.ORCID,
    familyName: author.family,
    givenName: author.given,
    articleId: articleId,
  }
  return output
}

export default async function addAuthors(input: any, articleId: number) {
  const authorKeys = Object.keys(input)
  const data = [] as Array<any>
  for (let i = 0; i < authorKeys.length; i++) {
    const author = input[i]
    data.push(parseAuthor(author, input.articleId))
  }
  console.log(input.articleId)
  const authors = await db.author.createMany({ data, skipDuplicates: true })

  return authors
}
