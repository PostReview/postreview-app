import React, { useState } from "react"
import Rating from "@mui/material/Rating"

export const ReviewQuestion = (props) => {
  const {
    article,
    question,
    onReviewUpdate,
    reviewAnswers,
    setIsChangeMade,
    isAnonymous,
    session,
  } = props
  const handleRatingChange = (questionId, newValue) => {
    const newData = {
      userId: session?.userId,
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
      rounded-full relative"
    >
      <div className="font-bold">{question.questionCategory}</div>
      <div id="question-header" className="mb-2">
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
              // If the star is blank, do nothing
              if (newValue == null) return undefined
              setCurrentAnswer({ ...currentAnswer, response: newValue })
              handleRatingChange(question.questionId, newValue)
              setIsChangeMade(true)
            }}
            value={currentAnswer ? currentAnswer?.response : 0}
          />
        </div>
        <div
          id="max-label"
          className="
           w-1/3
           p-2"
        ></div>
        <div
          id="delete-button"
          className="absolute text-3xl top-0 right-6 hover:cursor-pointer"
          onClick={() => {
            setCurrentAnswer({ ...currentAnswer, response: null })
            handleRatingChange(question.questionId, null)
          }}
        >
          ×
        </div>
      </div>
    </div>
  )
}
