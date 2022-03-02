import React, { useState } from "react"
import Rating from "@mui/material/Rating"
import { useCurrentUser } from "../hooks/useCurrentUser"

export const ReviewQuestion = (props) => {
  const { article, question, onReviewUpdate, reviewAnswers, setIsChangeMade, isAnonymous } = props
  const currentUser = useCurrentUser()
  const handleRatingChange = (questionId, newValue) => {
    const newData = {
      userId: currentUser?.id,
      articleId: article.id,
      response: newValue,
      questionId: questionId,
      isAnonymous: isAnonymous,
    }
    onReviewUpdate(questionId, newData)
  }
  const defaultCurrentAnswer = reviewAnswers.find(
    (answer) => answer?.questionId == question.questionId
  )
  const [currentAnswer, setCurrentAnswer] = useState(defaultCurrentAnswer)

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
      <div className="text-center font-bold">{question.questionCategory}</div>
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
              setCurrentAnswer({ ...currentAnswer, response: newValue })
              handleRatingChange(question.questionId, newValue)
              setIsChangeMade(true)
            }}
            value={currentAnswer?.response}
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
