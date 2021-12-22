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
  console.log(question)
  return (
    <div
      className="
      border-gray-400
    bg-gray-200
    m-3
    px-6
    py-2
    rounded-full"
    >
      <h1 className="text-center font-bold">{question.questionCategory}</h1>
      <div id="question-header" className="text-center mb-2">
        {question.questionText}
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
            size="large"
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
