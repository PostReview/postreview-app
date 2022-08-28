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
    fontSize = 50,
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

  // Track the state of the close button
  const [xMarkClicked, setXMarkClicked] = useState(false)

  return (
    <div
      className="
      mx-2
      my-4
      py-2
      relative"
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
          {!xMarkClicked ? (
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
              sx={{ fontSize: fontSize, color: "#94ec01" }}
            />
          ) : (
            <span className="italic self-start">Not rated</span>
          )}
        </div>
        <div
          id="max-label"
          className="
           w-1/3
           p-2"
        ></div>
        <div
          id="delete-button"
          className="absolute text-3xl top-0 right-3 hover:cursor-pointer"
          onClick={() => {
            setXMarkClicked(!xMarkClicked)
            setCurrentAnswer({ ...currentAnswer, response: null })
            handleRatingChange(question.questionId, null)
          }}
        >
          {xMarkClicked ? <span className="text-base underline">Undo</span> : "×"}
        </div>
      </div>
    </div>
  )
}
