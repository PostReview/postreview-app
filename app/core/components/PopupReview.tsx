import { useQuery } from "@blitzjs/core"
import getReviewQuestions from "app/queries/getReviewQuestions"
import React from "react"
import { ReviewQuestion } from "./ReviewQuestion"
import Button from "@mui/material/Button"

export default function PopupReview(prop) {
  const { article, handleClose } = prop
  const [reviewQuestions] = useQuery(getReviewQuestions, undefined)
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
      <div id="question-container" className="flex flex-col mx-36">
        {reviewQuestions.map((question) => {
          return <ReviewQuestion key={question.questionId} question={question}></ReviewQuestion>
        })}

        <div id="button-container" className="flex justify-center">
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={undefined}>
            Submit
          </Button>
          {/* Need "Are you sure?" Confirmation */}
        </div>
      </div>
    </>
  )
}
