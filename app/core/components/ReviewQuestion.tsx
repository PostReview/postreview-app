import React from "react"
import Button from "@mui/material/Button"
import Rating from "@mui/material/Rating"

export const ReviewQuestion = (prop) => {
  const { question, currentAnswer } = prop

  return (
    <div
      className="
      border-gray-400 p-5
    bg-green-100
    m-5
    rounded-md"
    >
      <div id="question-header" className="mb-2">
        {question.questionId}. {question.questionText}
      </div>
      <div
        id="response-options"
        className="flex items-center justify-center
        text-gray-500
        bg-green-50"
      >
        <div
          id="min-label"
          className="
           w-1/3
           p-2"
        >
          {question.minLabel}
        </div>
        <div id="rating-container" className="flex flex-col">
          <Rating
            name="customized-10"
            defaultValue={currentAnswer ? currentAnswer : undefined}
            max={question.maxValue}
          />
        </div>
        <div
          id="max-label"
          className="
           w-1/3
           p-2"
        >
          {question.maxLabel}
        </div>
      </div>
    </div>
  )
}
