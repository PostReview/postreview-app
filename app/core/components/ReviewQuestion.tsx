import React from "react"
import Button from "@mui/material/Button"
import Rating from "@mui/material/Rating"
import { useCurrentUser } from "../hooks/useCurrentUser"

export const ReviewQuestion = (props) => {
  const { article, question, onReviewUpdate } = props
  const currentUser = useCurrentUser()
  const handleRatingChange = (questionId, newValue) => {
    const newData = {
      userId: currentUser?.id,
      articleId: article.id,
      response: newValue,
      questionId: questionId,
    }
    onReviewUpdate(questionId, newData)
  }
  return (
    <div
      className="
      border-gray-400 p-4
    bg-green-50
    m-3
    rounded-md"
    >
      <div id="question-header" className="mb-2">
        {question.questionId}. {question.questionText}
      </div>
      <div
        id="response-options"
        className="flex items-center justify-center
        text-gray-500"
      >
        <div
          id="min-label"
          className="
           w-1/3
           p-2"
        ></div>
        <div id="rating-container" className="flex flex-col">
          <Rating
            name="customized-10"
            max={question.maxValue}
            onChange={(event, newValue) => {
              handleRatingChange(question.questionId, newValue)
            }}
          />
        </div>
        <div
          id="max-label"
          className="
           w-1/3
           p-2"
        ></div>
      </div>
    </div>
  )
}
