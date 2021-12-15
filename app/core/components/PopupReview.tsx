import { useQuery, useMutation, invoke } from "blitz"
import getReviewQuestions from "app/queries/getReviewQuestions"
import React, { useState } from "react"
import { ReviewQuestion } from "./ReviewQuestion"
import Button from "@mui/material/Button"
import { useCurrentUser } from "../hooks/useCurrentUser"
import addReview from "app/mutations/addReview"
import getReviewAnswersByArticleAndUserIds from "app/queries/getReviewAnswersByArticleAndUserIds"
import { DialogActions, DialogContent } from "@mui/material"

export default function PopupReview(prop) {
  const { article, handleClose, setUserHasReview } = prop
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

  const defaultUserHasReview = !!defaultReviewAnswers?.length

  const updateRating = (questionId, newRating) => {
    const newAnswers = [...reviewAnswers]
    const index = newAnswers.findIndex((r) => r?.questionId === questionId)
    if (index < 0) newAnswers[questionId - 1] = newRating
    if (index >= 0) newAnswers[index] = newRating
    setReviewAnswers(newAnswers)
  }
  const [addReviewMutation] = useMutation(addReview)
  const handleReviewSubmit = async () => {
    await invoke(addReviewMutation, [...reviewAnswers])
    handleClose()
    setUserHasReview(true)
    window.location.reload()
  }
  return (
    <>
      <DialogContent>
        <div className="text-xs text-gray-50">ID: {article.id}</div>
        <div>Reviewing:</div>
        <div>
          <strong>{article.title} </strong>
        </div>
        <div>{article.authorString}</div>
        <div>
          <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noreferrer">
            {article.doi}
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
              />
            )
          })}{" "}
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          Cancel
        </Button>
        {/* Need "Are you sure?" Confirmation */}
        <Button variant="contained" onClick={handleReviewSubmit}>
          Submit
        </Button>
      </DialogActions>
    </>
  )
}
