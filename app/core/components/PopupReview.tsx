import { useQuery } from "@blitzjs/core"
import getReviewQuestions from "app/queries/getReviewQuestions"
import getReviewAnswers from "app/queries/getReviewAnswers"
import React, { useState } from "react"
import { ReviewQuestion } from "./ReviewQuestion"
import Button from "@mui/material/Button"
import { useCurrentUser } from "../hooks/useCurrentUser"

export default function PopupReview(prop) {
  const { article, handleClose } = prop
  const [reviewQuestions] = useQuery(getReviewQuestions, undefined)
  const currentUser = useCurrentUser()
  const reviewAnswerQueryParams = {
    currentUserId: currentUser?.id,
    currentArticleId: article.id,
  }
  const [defaultReviewAnswers] = useQuery(getReviewAnswers, reviewAnswerQueryParams)
  const [reviewAnswers, setReviewAnswers] = useState(defaultReviewAnswers)
  const handleSubmit = () => {
    undefined
  }
  return (
    <>
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
              key={question.questionId}
              question={question}
              currentAnswer={Number.parseInt(
                reviewAnswers.find((e) => e?.questionId === question?.questionId)!?.response
              )}
            />
          )
        })}

        <div id="button-container" className="flex justify-center">
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          {/* Need "Are you sure?" Confirmation */}
          <Button variant="contained" onClick={undefined}>
            Submit
          </Button>
        </div>
      </div>
    </>
  )
}
