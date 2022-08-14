import { BlitzPage, Head, Image, Link, Routes, useParam, useQuery } from "blitz"
import Navbar from "app/core/components/Navbar"
import { ReviewList } from "app/core/components/ReviewList"
import getArticle from "app/queries/getArticle"
import { Suspense, useEffect, useState } from "react"
import PopupReview from "app/core/components/PopupReview"
import hasUserSunmittedReview from "app/queries/hasUserSubmittedReview"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Footer } from "app/core/components/Footer"
import { Dialog, DialogActions, DialogContent, DialogTitle, Rating, Snackbar, SnackbarOrigin } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import { Button } from "app/core/components/Button"
import { FaCrown, FaBarcode, FaUsers } from "react-icons/fa"
import sadFace from "public/sad-face.png"
import getUsersWithReviewsByArticleId from "app/queries/getUsersWithReviewsByArticleId"
import getQuestionCategories from "app/queries/getQuestionCategories"
import getArticleScoresById from "app/queries/getArticleScoresById"

const ArticleDetails = () => {
  // The maximum rating
  const ratingScaleMax = 5

  const articleId = useParam("articleId", "string") as string
  const [article] = useQuery(getArticle, articleId)
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

  const currentUser = useCurrentUser()
  const [defaultUserHasReview] = useQuery(hasUserSunmittedReview, {
    userId: currentUser?.id,
    articleId: articleId,
  })
  const [userHasReview, setUserHasReview] = useState(defaultUserHasReview)

  // handle darkmode
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches)
  }, [])
  const smallStarColor = isDark ? "#d9d9d9" : "#737373"

  // Handle snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const openReviewDialog = () => {
    // If the user is not logged in, show a snackbar
    if (!currentUser) return setSnackbarOpen(true);
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

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <Head>
        <title>{`${article.title} | PostReview`}</title>
      </Head>
      <Navbar />
      <main className="m-6 flex-grow flex flex-col items-center">
        <div className="m-6 font-bold text-2xl text-left text-gray-darkest dark:text-white">
          <h1>{article.title}</h1>
        </div>
        <div className="article__author text-base text-gray-dark dark:text-gray-light">
          <FaCrown className="inline m-2" />
          {article.authorString}
        </div>
        <div className="article__barcode text-base underline text-green">
          <a href={`https://dx.doi.org/${article.doi}`} rel="noreferrer" target="_blank">
            <FaBarcode className="inline m-2" />
            {article.doi}
          </a>
        </div>
        {!articleHasReview ?
          // When the article does not have a review, render the sad face
          <div id="no-rating" className="flex flex-col items-center">
            <div className="mt-16 w-56">
              <Image
                src={sadFace}
                alt="A picture of a sad face with a single teardrop"
              />
            </div>
          </div> :
          <>
            <div id="with-rating-total">
              <div className="flex flex-row items-center">
                <div className="py-8 text-7xl font-bold text-gray-darkest dark:text-white">
                  {totalRating.toFixed(1)}
                </div>
                <Rating
                  readOnly
                  value={totalRating / ratingScaleMax}
                  precision={0.1}
                  max={1}
                  sx={{
                    fontSize: 120,
                    color: "#94ec01",
                  }}
                  emptyIcon={<StarIcon style={{ opacity: .40, color: "#737373" }} fontSize="inherit" />}
                />
              </div>
            </div>
            <div id="g-num-reviews">
              <FaUsers className="inline mr-2 text-gray-darkest dark:text-white" />
              <span className="text-green">{usersWithReview.length} global ratings</span>
            </div>
            {/* Render summary scores by question category */}
            <div id="category-scores" className="flex flex-row mt-3">
              {questionCategories.map((category) =>
                articleScores.find((score) => score.questionId === category.questionId)?._avg
                  .response! ? (
                  <div key={category.questionId} className="text-center mx-2">
                    <div className="flex items-center justify-center">
                      {/* Rendering the score digits */}
                      <div className="absolute text-gray-darkest font-semibold text-base z-50">
                        {articleScores
                          .find((score) => score.questionId === category.questionId)
                          ?._avg.response!.toFixed(1)}
                      </div>
                      <Rating
                        readOnly
                        value={
                          articleScores.find((score) => score.questionId === category.questionId)?._avg
                            .response! / ratingScaleMax
                        }
                        precision={0.1}
                        max={1}
                        sx={{
                          fontSize: 60,
                          color: smallStarColor,
                        }}
                        emptyIcon={<StarIcon style={{ opacity: .40, color: "#737373" }} fontSize="inherit" />}
                      />
                    </div>
                    <div className="w-16 text-center text-[0.7rem] text-gray-darkest dark:text-white">
                      {category.questionCategory}
                    </div>
                  </div>
                ) : (
                  <div key={category.questionId} className="text-center">
                    <div className="flex items-center justify-center">
                      <div className="absolute text-gray-darkest z-50">N/A</div>
                      <Rating
                        readOnly
                        value={0}
                        precision={0.1}
                        max={1}
                        sx={{
                          fontSize: 50,
                          color: "#737373",
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.40 }} fontSize="inherit" />}
                      />
                    </div>
                    <div>{category.questionCategory}</div>
                  </div>
                )
              )}
            </div>
          </>
        }
        {!userHasReview &&
          <div className="m-16">
            <button className="px-4 py-4 text-xl text-green rounded-lg bg-black/50 hover:bg-gray-darkest dark:bg-gray-medium dark:hover:bg-black/40"
              onClick={openReviewDialog}
            >
              Add review
            </button>
          </div>}
        {articleHasReview &&
          <ReviewList article={article} ratingScaleMax={ratingScaleMax} />
        }
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
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          message={
            <div className="flex flex-row text-xl items-center">
              <div className="flex-shrink">
                You need an account to add a review
              </div>
              <div className="flex-none px-4 text-2xl ml-1 underline text-green">
                <Link href={Routes.SignupPage()}><a>Sign up</a></Link>
              </div>
            </div>
          }
        />
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
