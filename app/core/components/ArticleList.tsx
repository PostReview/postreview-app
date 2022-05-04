import React, { Suspense } from "react"
import { useQuery } from "blitz"
import Article from "./Article"
import getArticlesWithReview from "app/queries/getArticlesWithReview"

export default function ArticleList() {
  const [defaultArticles] = useQuery(getArticlesWithReview, undefined)

  if (!defaultArticles) return null
  return (
    <div className="mt-10 mx-2">
      <h1 className="text-xl">Trending Papers</h1>
      {defaultArticles?.map((article, index) => {
        return (
          <Suspense fallback="loading" key={article.id}>
            <Article key={article.id} {...article} />
          </Suspense>
        )
      })}
    </div>
  )
}
