import { BlitzPage, useParam, useQuery } from "@blitzjs/core"
import Button from "@mui/material/Button"
import Header from "app/core/components/Header"
import { ReviewList } from "app/core/components/ReviewList"
import getArticle from "app/queries/getArticle"
import { Suspense, useState } from "react"
import Popup from "app/core/components/Popup"
import PopupReview from "app/core/components/PopupReview"
import hasUserSunmittedReview from "app/queries/hasUserSubmittedReview"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const ArticleDetails = () => {
  const articleId = useParam("articleId", "string") as string
  const [article] = useQuery(getArticle, articleId)
  const [isOpen, setIsOpen] = useState(false)
  const togglePopup = () => {
    setIsOpen(!isOpen)
  }
  const currentUser = useCurrentUser()
  const [defaultUserHasReview] = useQuery(hasUserSunmittedReview, {
    userId: currentUser?.id,
    articleId: articleId,
  })
  const [userHasReview, setUserHasReview] = useState(defaultUserHasReview)
  const toggleEditWindow = () => {
    undefined
  }

  return (
    <>
      <Header />
      <main className="p-5">
        {/* Article Info Component */}
        <p>id: {articleId}</p>
        <h1>Title: {article ? article.title : "Article Not Found"}</h1>
        {/* Submit Review Button Component */}
        {!userHasReview && (
          <Button variant="contained" onClick={togglePopup}>
            Rate This Paper
          </Button>
        )}
        {userHasReview && (
          <Button variant="contained" onClick={toggleEditWindow}>
            Edit/Update Your Rating
          </Button>
        )}

        {/* Review Components */}
        <ReviewList></ReviewList>
        {isOpen && (
          <Popup
            className={""}
            content={
              <PopupReview
                article={article}
                handleClose={togglePopup}
                setUserHasReview={setUserHasReview}
              />
            }
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
