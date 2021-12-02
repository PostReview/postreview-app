import { BlitzPage, useParam, useQuery } from "blitz"
import Button from "@mui/material/Button"
import Header from "app/core/components/Header"
import { ReviewList } from "app/core/components/ReviewList"
import getArticle from "app/queries/getArticle"
import { Suspense, useState } from "react"
import Popup from "app/core/components/Popup"
import PopupReview from "app/core/components/PopupReview"
import hasUserSunmittedReview from "app/queries/hasUserSubmittedReview"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Footer } from "app/core/components/Footer"

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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="m-6 flex-grow">
        {userHasReview ? (
          <Button variant="contained" onClick={toggleEditWindow}>
            Edit Your Rating
          </Button>
        ) : (
          <Button variant="contained" onClick={togglePopup}>
            Rate This Paper
          </Button>
        )}
        <ReviewList article={article} />
        {isOpen && (
          <Popup
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
      <Footer />
    </div>
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
