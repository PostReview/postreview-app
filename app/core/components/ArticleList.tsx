import getArticles from "app/queries/getArticles"
import React, { Suspense } from "react"
import { useQuery } from "blitz"
import Article from "./Article"
import { useCurrentUser } from "../hooks/useCurrentUser"

export default function ArticleList() {
  const [defaultArticles] = useQuery(getArticles, undefined)
  const currentUser = useCurrentUser()
  const showMax = currentUser ? 100 : 1

  if (!defaultArticles) return null
  return (
    <div className="mt-10">
      <h1 className="text-xl">Trending Papers</h1>
      {defaultArticles?.map((article, index) => {
        if (index <= showMax)
          return (
            <Suspense fallback="loading" key={article.id}>
              <Article key={article.id} {...article} />
            </Suspense>
          )
      })}
    </div>
  )
}
