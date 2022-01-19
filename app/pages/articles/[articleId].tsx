import { BlitzPage, useParam, useQuery, useRouter } from "blitz"
import Button from "@mui/material/Button"
import Header from "app/core/components/Header"
import { ReviewList } from "app/core/components/ReviewList"
import getArticle from "app/queries/getArticle"
import { Suspense, useState } from "react"
import PopupReview from "app/core/components/PopupReview"
import hasUserSunmittedReview from "app/queries/hasUserSubmittedReview"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Footer } from "app/core/components/Footer"
import Article from "app/core/components/Article"
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

const ArticleDetails = () => {
  const articleId = useParam("articleId", "string") as string
  const [article] = useQuery(getArticle, articleId)
  const articleHasReview = !!article._count.review
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(!articleHasReview)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const router = useRouter()
  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false)
  }
  const openReviewDialog = () => {
    setIsReviewDialogOpen(true)
  }
  const closeReviewDialog = () => {
    setIsConfirmDialogOpen(true)
  }
  const handleConfirmDiscard = () => {
    setIsConfirmDialogOpen(false)
    setIsReviewDialogOpen(false)
    if (!articleHasReview) router.push("/")
  }
  const currentUser = useCurrentUser()
  const [defaultUserHasReview] = useQuery(hasUserSunmittedReview, {
    userId: currentUser?.id,
    articleId: articleId,
  })
  const [userHasReview, setUserHasReview] = useState(defaultUserHasReview)
  const ActionButton = () => {
    return userHasReview ? (
      <Button variant="contained" onClick={openReviewDialog}>
        Edit Your Rating
      </Button>
    ) : (
      <Button variant="contained" onClick={openReviewDialog}>
        Rate This Paper
      </Button>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="m-6 flex-grow flex flex-col items-center">
        <div className="m-6 text-4xl text-center">
          <h1>Overall Score</h1>
        </div>
        <div id="article-container " className="flex flex-col items-center">
          <Article {...article} />
        </div>
        <ActionButton />
        <ReviewList article={article} />
        <Dialog open={isReviewDialogOpen} onClose={closeReviewDialog}>
          <PopupReview
            article={article}
            handleClose={closeReviewDialog}
            setUserHasReview={setUserHasReview}
          />
        </Dialog>
        <Dialog open={isConfirmDialogOpen} onClose={closeConfirmDialog}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>Your changes will not be saved</DialogContent>
          <DialogActions>
            <Button variant="text" onClick={closeConfirmDialog}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleConfirmDiscard}>
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
