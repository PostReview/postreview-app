import React from "react"
import Button from "./Button"

export const ReviewQuestion = (prop) => {
  const { question } = prop
  const numChoice = question.maxValue - question.minValue + 2
  console.log(question)
  // Query the database here...
  var responseOptions = [] as any
  for (var i = 0; i < numChoice; i++) {
    responseOptions.push(<Button text={i} />)
  }
  return (
    <div
      className="
      border-gray-400 p-5
    bg-green-100
    m-5
    rounded-md"
    >
      <div id="question-header" className="">
        {question.questionId}. {question.questionText}
      </div>
      <div
        id="response-options"
        className="flex
      text-gray-500
        bg-green-50"
      >
        <div
          id="min-label"
          className="w-36
           flex-shrink-0
           p-2"
        >
          {question.minLabel}
        </div>
        {responseOptions}
        <div
          id="max-label"
          className="w-36 flex-shrink-0
                  p-2"
        >
          {question.maxLabel}
        </div>
      </div>
    </div>
  )
}
