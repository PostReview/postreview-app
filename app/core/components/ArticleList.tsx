import getArticles from "app/queries/getArticles"
import React, { Suspense } from "react"
import { useQuery } from "blitz"
import Article from "./Article"

export default function ArticleList() {
  const [defaultArticles] = useQuery(getArticles, undefined)

  if (!defaultArticles) return null
  return (
    <div className="mt-10">
      <h1 className="text-xl">Trending Papers</h1>
      {defaultArticles?.map((article) => {
        return (
          <Suspense fallback="loading" key={article.id}>
            <Article key={article.id} {...article} />
          </Suspense>
        )
      })}
    </div>
  )
}
