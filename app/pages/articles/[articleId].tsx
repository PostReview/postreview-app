import { BlitzPage, Head, useParam, useQuery, useSession } from "blitz"
import Navbar from "app/core/components/Navbar"
import { ReviewList } from "app/core/components/ReviewList"
import getArticle from "app/queries/getArticle"
import { Suspense, useState } from "react"
import PopupReview from "app/core/components/PopupReview"
import hasUserSunmittedReview from "app/queries/hasUserSubmittedReview"
import { Footer } from "app/core/components/Footer"
import Article from "app/core/components/Article"
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { Button } from "app/core/components/Button"

const ArticleDetails = (props) => {
  const { setCurrentTitle } = props
  const articleId = useParam("articleId", "string") as string
  const [article] = useQuery(getArticle, articleId)
  setCurrentTitle(article.title)

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
  const session = useSession()
  const [defaultUserHasReview] = useQuery(hasUserSunmittedReview, {
    userId: session?.userId,
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
    <>
      <main className="m-6 flex-grow flex flex-col items-center">
        <div className="m-6 text-4xl text-center">
          <h1>Overall Score</h1>
        </div>
        <div id="article-container " className="flex flex-col items-center">
          <Article {...article} />
        </div>
        <ReviewList article={article} ActionButton={ActionButton} session={session} />
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
    </>
  )
}

const ArticlePage: BlitzPage = () => {
  const [currentTitle, setCurrentTitle] = useState()

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{`${currentTitle} | PostReview`}</title>
      </Head>
      <Navbar />
      <Suspense fallback="Loading...">
        <ArticleDetails setCurrentTitle={setCurrentTitle} />
      </Suspense>
      <Footer />
    </div>
  )
}

export default ArticlePage
