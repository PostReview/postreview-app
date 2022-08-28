import { BlitzPage, Head, Link, Routes, useParam, useQuery, useSession } from "blitz"
import Navbar from "app/core/components/Navbar"
import { ReviewList } from "app/core/components/ReviewList"
import getArticle from "app/queries/getArticle"
import { useEffect, useState } from "react"
import PopupReview from "app/core/components/PopupReview"
import hasUserSunmittedReview from "app/queries/hasUserSubmittedReview"
import { Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from "@mui/material"
import { Button } from "app/core/components/Button"
import getUsersWithReviewsByArticleId from "app/queries/getUsersWithReviewsByArticleId"
import getQuestionCategories from "app/queries/getQuestionCategories"
import getArticleScoresById from "app/queries/getArticleScoresById"
import Layout from "app/core/layouts/Layout"
import { ArticleSummaryScores } from "app/core/components/ArticleSummaryScores"
import { ArticleMetadata } from "app/core/components/ArticleMetadata"

const ArticleDetails = (props) => {
  // The maximum rating
  const ratingScaleMax = 5
  // Get article information
  const articleId = useParam("articleId", "string") as string
  const [article] = useQuery(getArticle, articleId)
  // Article title
  const [currentTitle, setCurrentTitle] = useState(article.title)

  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false)
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

  const [usersWithReview] = useQuery(getUsersWithReviewsByArticleId, {
    currentArticleId: article.id,
  })

  const session = useSession()
  const [defaultUserHasReview] = useQuery(hasUserSunmittedReview, {
    userId: session?.userId,
    articleId: articleId,
  })
  const [userHasReview, setUserHasReview] = useState(defaultUserHasReview)

  // handle darkmode
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDark(mediaQuery.matches)
  }, [])
  const smallStarColor = isDark ? "#d9d9d9" : "#737373"

  // Handle snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const openReviewDialog = () => {
    // If the user is not logged in, show a snackbar
    if (!session.userId) return setSnackbarOpen(true)
    setIsReviewDialogOpen(true)
  }

  // For rendering question summary scores
  const [questionCategories] = useQuery(getQuestionCategories, undefined)
  const [articleScores] = useQuery(getArticleScoresById, {
    currentArticleId: article.id,
  })

  // Calculate total rating
  const totalRating = articleScores.reduce((prev, current) => {
    return prev + current._avg.response! / articleScores.length
  }, 0)

  // Track if the article has a review at all
  const articleHasReview = usersWithReview.length === 0 ? false : true

  // Track the accordion state
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{`${currentTitle} | PostReview`}</title>
      </Head>
      <main className="m-6 flex-grow flex flex-col items-center">
        <ArticleMetadata article={article} />
        <ArticleSummaryScores
          isAccordionOpen={isAccordionOpen}
          toggleAccordion={toggleAccordion}
          questionCategories={questionCategories}
          articleScores={articleScores}
          ratingScaleMax={ratingScaleMax}
          smallStarColor={smallStarColor}
          articleHasReview={articleHasReview}
          totalRating={totalRating}
          usersWithReview={usersWithReview}
        />
        {(!userHasReview || !articleHasReview) && (
          <div className="m-16">
            <button
              className="px-4 py-4 text-xl text-green rounded-lg bg-black/50 hover:bg-gray-darkest dark:bg-gray-medium dark:hover:bg-black/40"
              onClick={openReviewDialog}
            >
              Add review
            </button>
          </div>
        )}
        {articleHasReview && (
          <ReviewList article={article} ratingScaleMax={ratingScaleMax} session={session} />
        )}
        <Dialog open={isReviewDialogOpen} onClose={closeReviewDialog}>
          <PopupReview
            article={article}
            handleClose={closeReviewDialog}
            setUserHasReview={setUserHasReview}
            setIsChangeMade={setIsChangeMade}
            session={session}
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
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          message={
            <div className="flex flex-row text-xl items-center">
              <div className="flex-shrink">You need an account to add a review</div>
              <div className="flex-none px-4 text-2xl ml-1 underline text-green">
                <Link href={Routes.SignupPage()}>
                  <a>Sign up</a>
                </Link>
              </div>
            </div>
          }
        />
      </main>
    </div>
  )
}

const ArticlePage: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <Navbar />
      <ArticleDetails />
    </div>
  )
}

ArticlePage.getLayout = (page) => <Layout>{page}</Layout>

export default ArticlePage
