import { BlitzPage, useParam, useQuery } from "@blitzjs/core"
import Button from "app/core/components/Button"
import Header from "app/core/components/Header"
import { ReviewList } from "app/core/components/ReviewList"
import getArticle from "app/queries/getArticle"
import { Suspense } from "react"

const ArticleDetails = () => {
  const articleId = useParam("articleId", "string") as string
  const [article] = useQuery(getArticle, articleId)
  return (
    <>
      <Header />
      <main>
        {/* Article Info Component */}
        <h1> Hellow World! </h1>
        <p>id: {articleId}</p>
        <p>Title: {article ? article.title : "Article Not Found"}</p>
        {/* Submit Review Button Component */}
        <Button text={"Submit a Review"} onClick={() => null} />
        {/* Review Components */}
        <ReviewList></ReviewList>
      </main>
    </>
  )
}

const ArticlePage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <ArticleDetails />
    </Suspense>
  )
}

export default ArticlePage
