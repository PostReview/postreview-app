import { useQuery, useMutation, invoke } from "blitz"
import getReviewQuestions from "app/queries/getReviewQuestions"
import React, { useState } from "react"
import { ReviewQuestion } from "./ReviewQuestion"
import Button from "@mui/material/Button"
import { useCurrentUser } from "../hooks/useCurrentUser"
import addReview from "app/mutations/addReview"
import getReviewAnswersByArticleAndUserIds from "app/queries/getReviewAnswersByArticleAndUserIds"
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Switch,
  Tooltip,
} from "@mui/material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"

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
  const [isAnonymous, setIsAnonymous] = useState(false)
  const handleChangeAnonymous = () => {
    if (isAnonymous) setIsAnonymous(false)
    if (!isAnonymous) setIsAnonymous(true)
  }

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
    await invoke(addReviewMutation, [...reviewAnswersToDb])
    handleClose()
    setUserHasReview(true)
    window.location.reload()
  }
  const reviewAnswersToDb = reviewAnswers.map((answer) =>
    Object.assign(answer, { isAnonymous: isAnonymous })
  )
  console.log(reviewAnswersToDb)
  console.log(isAnonymous)
  return (
    <>
      <DialogTitle>
        <div className="text-center">What are your thoughs about this paper?</div>
      </DialogTitle>
      <DialogContent>
        <div id="title-container" className="text-center">
          <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noreferrer">
            <strong>{article.title} </strong>
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
          })}
        </div>
      </DialogContent>
      <DialogActions>
        <span>
          Submit anonymously
          <Switch onClick={handleChangeAnonymous} />
          <Tooltip title="If you submit your review anonymously, your handle and display name will be hidden from others.">
            <HelpOutlineIcon />
          </Tooltip>
        </span>
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
