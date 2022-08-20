import { BlitzPage, Head, Image, Link, Routes, useParam, useQuery, useSession } from "blitz"
import Navbar from "app/core/components/Navbar"
import { ReviewList } from "app/core/components/ReviewList"
import getArticle from "app/queries/getArticle"
import { Suspense, useEffect, useState } from "react"
import PopupReview from "app/core/components/PopupReview"
import hasUserSunmittedReview from "app/queries/hasUserSubmittedReview"
import { Footer } from "app/core/components/Footer"
import { Accordion, AccordionDetails, AccordionSummary, Dialog, DialogActions, DialogContent, DialogTitle, Rating, Snackbar } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import { Button } from "app/core/components/Button"
import { FaCrown, FaBarcode, FaUsers } from "react-icons/fa"
import sadFace from "public/sad-face.png"
import getUsersWithReviewsByArticleId from "app/queries/getUsersWithReviewsByArticleId"
import getQuestionCategories from "app/queries/getQuestionCategories"
import getArticleScoresById from "app/queries/getArticleScoresById"

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
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches)
  }, [])
  const smallStarColor = isDark ? "#d9d9d9" : "#737373"


  // Handle snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const openReviewDialog = () => {
    // If the user is not logged in, show a snackbar
    if (!session.userId) return setSnackbarOpen(true);
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
        <div className="m-6 font-bold text-2xl text-left max-w-3xl text-gray-darkest dark:text-white">
          <h1>{article.title}</h1>
        </div>
        <div className="article__author text-base text-center m-2 max-w-2xl text-gray-dark dark:text-gray-light">
          <FaCrown className="inline m-2" />
          {article.authorString}
        </div>
        <div className="article__barcode text-base underline max-w-2xl text-green">
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
            {!isAccordionOpen &&
              <div id="category-scores"
                className="flex flex-row mt-3 hover:cursor-pointer"
                onClick={() => toggleAccordion()}>
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
                    // When the category does not have a star (N/A)
                    <div key={category.questionId} className="text-center mx-2">
                      <div className="flex items-center justify-center">
                        <div className="absolute text-gray-darkest font-semibold text-xs opacity-70 z-50">N/A</div>
                        <Rating
                          readOnly
                          value={0}
                          precision={0.1}
                          max={1}
                          sx={{
                            fontSize: 60,
                            color: smallStarColor,
                          }}
                          emptyIcon={<StarIcon style={{ opacity: 0.30, color: "#737373" }} fontSize="inherit" />}
                        />
                      </div>
                      <div className="w-16 text-center text-[0.7rem] opacity-70 text-gray-darkest dark:text-white">
                        {category.questionCategory}
                      </div>
                    </div>
                  )
                )}
              </div>}
          </>
        }
        <Accordion
          expanded={isAccordionOpen}
          onChange={() => toggleAccordion()}
          sx={{
            backgroundColor: "transparent",
            display: "hidden",
            border: 0,
            borderColor: "transparent",
            boxShadow: 0,
            width: 'auto',
            padding: 0,
            transitionDelay: 0,
            msTransitionDuration: 0,
            ":before": {
              display: "none",
            }
          }}
          onClick={() => toggleAccordion()}
        >
          <AccordionSummary
            expandIcon={undefined}
            aria-controls="panel1a-content"
            id="panel1a-header"
            classes={{ root: "hidden" }}
          >
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col hover:cursor-pointer">{questionCategories.map((category) =>
              articleScores.find((score) => score.questionId === category.questionId)?._avg
                .response! ? (
                <div key={category.questionId} className="text-center my-4">
                  <div className="flex flex-row items-center justify-between">
                    {/* Rendering the score digits */}
                    <div className="text-left">
                      <div className="text-lg text-gray-darkest dark:text-white">
                        {category.questionCategory}
                      </div>
                      <div id="g-num-reviews" className="text-left">
                        <FaUsers className="inline mr-2 text-gray-darkest dark:text-white" />
                        <span className="font-bold text-green-dark">
                          {articleScores
                            .find((score) => score.questionId === category.questionId)
                            ?._count.response}
                        </span>
                      </div>
                    </div>
                    <div className="absolute pl-48 text-2xl font-semibold text-gray-darkest dark:text-white">
                      {articleScores
                        .find((score) => score.questionId === category.questionId)
                        ?._avg.response!.toFixed(1)}
                    </div>
                    <div className="pl-24">
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
                  </div>

                </div>
              ) : (
                // When the category does not have a star (N/A)
                <div key={category.questionId} className="text-center my-4">
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-left">
                      <div className="text-lg opacity-70 text-gray-darkest dark:text-white">
                        {category.questionCategory}
                      </div>
                      <div id="g-num-reviews" className="text-left">
                        <FaUsers className="inline mr-2 text-gray-darkest dark:text-white" />
                        <span className="font-bold text-green-dark">0</span>
                      </div>
                    </div>
                    <div className="absolute pl-48 text-xl text-gray-darkest dark:text-white opacity-70">N/A</div>
                    <div className="pl-24">
                      <Rating
                        readOnly
                        value={0}
                        precision={0.1}
                        max={1}
                        sx={{
                          fontSize: 60,
                          color: smallStarColor,
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.30, color: "#737373" }} fontSize="inherit" />}
                      />
                    </div>
                  </div>
                </div>
              )
            )}</div>
          </AccordionDetails>
        </Accordion>
        {!userHasReview &&
          <div className="m-16">
            <button className="px-4 py-4 text-xl text-green rounded-lg bg-black/50 hover:bg-gray-darkest dark:bg-gray-medium dark:hover:bg-black/40"
              onClick={openReviewDialog}
            >
              Add review
            </button>
          </div>}
        {articleHasReview &&
          <ReviewList article={article} ratingScaleMax={ratingScaleMax} session={session} />
        }
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
    </div >
  )
}

const ArticlePage: BlitzPage = () => {

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <Suspense fallback="Loading...">
        <Navbar />
        <ArticleDetails />
      </Suspense>
      <Footer />
    </div>
  )
}

export default ArticlePage
