import { BlitzPage, useParam, useQuery } from "blitz"
import Navbar from "app/core/components/Navbar"
import { ReviewList } from "app/core/components/ReviewList"
import getArticle from "app/queries/getArticle"
import { Suspense, useState } from "react"
import PopupReview from "app/core/components/PopupReview"
import hasUserSunmittedReview from "app/queries/hasUserSubmittedReview"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Footer } from "app/core/components/Footer"
import Article from "app/core/components/Article"
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { Button } from "app/core/components/Button"

const ArticleDetails = () => {
  const articleId = useParam("articleId", "string") as string
  const [article] = useQuery(getArticle, articleId)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false)
  }
  const openReviewDialog = () => {
    setIsReviewDialogOpen(true)
  }
  const [isChangeMade, setIsChangeMade] = useState(false)
  const closeReviewDialog = () => {
    if (!isChangeMade) return setIsReviewDialogOpen(false)
    setIsConfirmDialogOpen(true)
  }
  const handleConfirmDiscard = () => {
    setIsConfirmDialogOpen(false)
    setIsReviewDialogOpen(false)
  }
  const currentUser = useCurrentUser()
  const [defaultUserHasReview] = useQuery(hasUserSunmittedReview, {
    userId: currentUser?.id,
    articleId: articleId,
  })
  const [userHasReview, setUserHasReview] = useState(defaultUserHasReview)
  const ActionButton = ({ state }) => {
    if (state == "edit")
      return (
        <Button variant="contained" onClick={openReviewDialog}>
          Edit Your Rating
        </Button>
      )
    if (state == "submit")
      return (
        <Button variant="contained" onClick={openReviewDialog}>
          Rate This Paper
        </Button>
      )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="m-6 flex-grow flex flex-col items-center">
        <div className="m-6 text-4xl text-center">
          <h1>Overall Score</h1>
        </div>
        <div id="article-container " className="flex flex-col items-center">
          <Article {...article} />
        </div>
        <ReviewList article={article} ActionButton={ActionButton} />
        <Dialog open={isReviewDialogOpen} onClose={closeReviewDialog}>
          <PopupReview
            article={article}
            handleClose={closeReviewDialog}
            setUserHasReview={setUserHasReview}
            setIsChangeMade={setIsChangeMade}
          />
        </Dialog>
        <Dialog open={isConfirmDialogOpen} onClose={closeConfirmDialog}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>Your changes will not be saved</DialogContent>
          <DialogActions>
            <Button type="cancel" onClick={closeConfirmDialog}>
              Cancel
            </Button>
            <Button type="error" onClick={handleConfirmDiscard}>
              Discard
            </Button>
          </DialogActions>
        </Dialog>
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
