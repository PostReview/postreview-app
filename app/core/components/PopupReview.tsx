import { useQuery, useMutation, invoke } from "blitz"
import getReviewQuestions from "app/queries/getReviewQuestions"
import React, { useState } from "react"
import { ReviewQuestion } from "./ReviewQuestion"
import addReview from "app/mutations/addReview"
import getReviewAnswersByArticleAndUserIds from "app/queries/getReviewAnswersByArticleAndUserIds"
import {
  alpha,
  Backdrop,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  ThemeProvider,
} from "@mui/material"
import { Button } from "./Button"
import getReviewCommentByArticleAndUserIds from "app/queries/getReviewCommentByArticleAndUserIds"
import addReviewComment from "app/mutations/addReviewComment"
import { ArticleMetadata } from "./ArticleMetadata"
import ThankYouBadge from "./ThankYouBadge"

export default function PopupReview(prop) {
  const {
    article,
    handleClose,
    setUserHasReview,
    setIsChangeMade,
    userHasReview,
    session,
    articleHasReview,
  } = prop
  const [reviewQuestions] = useQuery(getReviewQuestions, undefined)
  const reviewAnswerQueryParams = {
    currentArticleId: article.id,
    currentUserId: session?.userId,
  }
  const [defaultReviewAnswers] = useQuery(
    getReviewAnswersByArticleAndUserIds,
    reviewAnswerQueryParams
  )
  const [reviewAnswers, setReviewAnswers] = useState(defaultReviewAnswers)
  const [defaultReviewComment] = useQuery(
    getReviewCommentByArticleAndUserIds,
    reviewAnswerQueryParams
  )
  const [reviewComment, setReviewComment] = useState(defaultReviewComment)

  const [isAnonymous, setIsAnonymous] = useState(
    reviewAnswers[0]?.isAnonymous ? reviewAnswers[0]?.isAnonymous : false
  )
  const handleChangeAnonymous = (event) => {
    setIsAnonymous(event.target.checked)
    const newReviewAnswers = reviewAnswers.map((answer) => {
      return { ...answer, isAnonymous: event.target.checked }
    })
    setReviewAnswers(newReviewAnswers)
  }

  const updateRating = (questionId, newRating) => {
    const newAnswers = reviewAnswers
    const foundAnswer = reviewAnswers.find((review) => review?.questionId === questionId)
    // If the answer is not found, add the answer
    if (!foundAnswer) newAnswers.push(newRating)
    // If the answer is found, update the answer
    if (foundAnswer) {
      const index = newAnswers.findIndex((r) => r?.questionId === questionId)
      newAnswers[index] = newRating
    }
    setReviewAnswers(newAnswers)
  }

  const [showReviewRequiredError, setShowReviewRequiredError] = useState(false)

  const [addReviewMutation] = useMutation(addReview)
  const [addReviewCommentMutation] = useMutation(addReviewComment)

  // Thank-you badge
  const [thankYouShowing, setThankYouShowing] = useState(false)
  const showThankYou = () => {
    setThankYouShowing(true)
    setTimeout(() => {
      setThankYouShowing(false)
    }, 3000)
  }

  const handleReviewSubmit = async () => {
    setLoading(true)
    // Thank-you badge
    // Check if all answers are null
    const reviewsAllNull = reviewAnswers.map((answer) => answer.response).every((e) => e === null)
    if (!reviewsAllNull) showThankYou()
    // If there's no rating given, show the error message
    if (reviewAnswers.length == 0) return setShowReviewRequiredError(true)
    await invoke(addReviewMutation, reviewAnswers)
    await invoke(addReviewCommentMutation, {
      userId: session?.userId,
      articleId: article.id,
      isAnonymous: isAnonymous,
      // When comment is blank, update it to a blank string
      comment: reviewComment?.comment ? reviewComment?.comment : "",
    })

    setUserHasReview(true)
    setTimeout(() => {
      window.location.reload()
    }, 3000)
  }
  const [loading, setLoading] = useState(false)

  const backgroundColor = { background: alpha("#737373", 0.6) }

  // Theme override
  const theme = createTheme({
    palette: {
      success: {
        light: "#ffffff",
        main: "#94ec01",
        dark: "#2e2c2c",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
    },
  })

  return (
    <>
      {thankYouShowing && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={thankYouShowing}
          onClick={() => setThankYouShowing(false)}
        >
          <ThankYouBadge isFirst={!articleHasReview} />
        </Backdrop>
      )}
      <DialogTitle sx={{ background: alpha("#737373", 0.9), fontSize: "2rem" }}>
        <div className="text-left text-white font-bold">
          What are your thoughts about this paper?
        </div>
      </DialogTitle>
      <DialogContent sx={{ backgroundColor }}>
        <div className="flex flex-col items-center">
          <ArticleMetadata article={article} bold={"font-semibold"} textBlack />
        </div>
        <div id="question-container" className="flex flex-col">
          {reviewQuestions.map((question) => {
            return (
              <ReviewQuestion
                article={article}
                key={question?.questionId}
                question={question}
                onReviewUpdate={updateRating}
                reviewAnswers={reviewAnswers}
                setIsChangeMade={setIsChangeMade}
                isAnonymous={isAnonymous}
                session={session}
              />
            )
          })}
        </div>
        <div id="review-comment" className="flex flex-col">
          <div id="review-comment-header">
            <span>Comment</span>
            <span className="text-slate-400 mx-1">(optional)</span>
          </div>
          <textarea
            className="w-full h-32 border-2 p-4 bg-black text-green outline-none"
            onChange={(e) => {
              setReviewComment({ comment: e.target.value })
            }}
            defaultValue={reviewComment?.comment}
          />
        </div>
      </DialogContent>
      <DialogActions sx={{ background: alpha("#737373", 0.9), paddingY: "1rem" }}>
        <div className="flex flex-col ml-3 mt-3 sm:mt-0 sm:flex-row sm:items-center flex-grow">
          <span className="text-[0.8rem] sm:text-base text-white">Submit anonymously</span>
          <ThemeProvider theme={theme}>
            <Switch color="success" checked={isAnonymous} onClick={handleChangeAnonymous} />
          </ThemeProvider>
        </div>
        <Button type="cancel" onClick={handleClose}>
          Cancel
        </Button>
        <Button loading={loading ? "true" : undefined} onClick={handleReviewSubmit}>
          {userHasReview ? "Update" : "Submit"}
        </Button>
      </DialogActions>
      <Dialog open={showReviewRequiredError} onClose={() => setShowReviewRequiredError(false)}>
        <DialogTitle>Cannot submit a review without a rating</DialogTitle>
        <DialogContent>To submit a review, give a rating for at least one category.</DialogContent>
        <DialogActions>
          <Button type="cancel" onClick={() => setShowReviewRequiredError(false)}>
            Go back
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
