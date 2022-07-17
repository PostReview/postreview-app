import { useQuery, useMutation, invoke } from "blitz"
import getReviewQuestions from "app/queries/getReviewQuestions"
import React, { useState } from "react"
import { ReviewQuestion } from "./ReviewQuestion"
import { useCurrentUser } from "../hooks/useCurrentUser"
import addReview from "app/mutations/addReview"
import getReviewAnswersByArticleAndUserIds from "app/queries/getReviewAnswersByArticleAndUserIds"
import { DialogActions, DialogContent, DialogTitle, Switch, Tooltip } from "@mui/material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import { FaBook, FaUser } from "react-icons/fa"
import { Button } from "./Button"
import getReviewCommentByArticleAndUserIds from "app/queries/getReviewCommentByArticleAndUserIds"
import addReviewComment from "app/mutations/addReviewComment"

export default function PopupReview(prop) {
  const { article, handleClose, setUserHasReview, setIsChangeMade, userHasReview } = prop
  const [reviewQuestions] = useQuery(getReviewQuestions, undefined)
  const currentUser = useCurrentUser()
  const reviewAnswerQueryParams = {
    currentArticleId: article.id,
    currentUserId: currentUser?.id,
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
    const index = newAnswers.findIndex((r) => r?.questionId === questionId)
    if (index < 0) newAnswers[questionId - 1] = newRating
    if (index >= 0) newAnswers[index] = newRating
    setReviewAnswers(newAnswers)
  }

  const [addReviewMutation] = useMutation(addReview)
  const [addReviewCommentMutation] = useMutation(addReviewComment)
  const handleReviewSubmit = async () => {
    setLoading(true)
    await invoke(addReviewMutation, reviewAnswers)
    await invoke(addReviewCommentMutation, {
      userId: currentUser?.id,
      articleId: article.id,
      isAnonymous: isAnonymous,
      comment: reviewComment?.comment,
    })

    setUserHasReview(true)
    window.location.reload()
  }
  const [loading, setLoading] = useState(false)
  return (
    <>
      <DialogTitle>
        <div className="text-center">What are your thoughts about this paper?</div>
      </DialogTitle>
      <DialogContent>
        <div id="title-container" className="text-center">
          <strong>{article.title} </strong>
          <div>
            <FaUser className="inline mr-2 text-gray-700" /> {article.authorString} (
            {article.publishedYear})
          </div>
          <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noreferrer">
            <div className="text-violet-600">
              <FaBook className="inline mr-2" />
              {`https://doi.org/${article.doi}`}
            </div>
          </a>
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
            className="w-full h-32 border-2 p-4"
            onChange={(e) => {
              setReviewComment({ comment: e.target.value })
            }}
            defaultValue={reviewComment?.comment}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <span>
          Submit anonymously
          <Switch checked={isAnonymous} onClick={handleChangeAnonymous} />
          <Tooltip title="If you submit your review anonymously, your handle and display name will be hidden from others.">
            <HelpOutlineIcon />
          </Tooltip>
        </span>
        <Button type="cancel" onClick={handleClose}>
          Cancel
        </Button>
        <Button loading={loading ? loading : undefined} onClick={handleReviewSubmit}>
          {userHasReview ? "Update" : "Submit"}
        </Button>
      </DialogActions>
    </>
  )
}
