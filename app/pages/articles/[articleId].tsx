import { BlitzPage, useParam, useQuery } from "@blitzjs/core"
import Button from "app/core/components/Button"
import { ArticleContext } from "app/core/components/EnterDOI"
import Header from "app/core/components/Header"
import { ReviewList } from "app/core/components/ReviewList"
import getArticle from "app/queries/getArticle"
import { Suspense, useContext, useState } from "react"
import Popup from "app/core/components/Popup"
import PopupReview from "app/core/components/PopupReview"

const ArticleDetails = () => {
  const articleId = useParam("articleId", "string") as string
  const [article] = useQuery(getArticle, articleId)
  const [isOpen, setIsOpen] = useState(false)
  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Header />
      <main>
        {/* Article Info Component */}
        <p>id: {articleId}</p>
        <h1>Title: {article ? article.title : "Article Not Found"}</h1>
        {/* Submit Review Button Component */}
        <Button text={"Submit a Review"} onClick={togglePopup} />
        {/* Review Components */}
        <ReviewList></ReviewList>
        {isOpen && (
          <Popup
            className={""}
            content={<PopupReview article={article} handleClose={togglePopup} />}
            handleClose={togglePopup}
            xbutton={false}
          />
        )}
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
