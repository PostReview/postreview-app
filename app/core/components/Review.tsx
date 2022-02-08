import { Avatar, Button, Tooltip } from "@mui/material"
import React from "react"
import { RatingTotal } from "./RatingTotal"
import { ReviewCategoryAnswer } from "./ReviewCategoryAnswer"

export const Review = (props) => {
  const { displayName, reviews, userIcon, questionCategories } = props
  const submittedAt = reviews[0]?.createdAt?.toISOString().split("T")[0]
  const updatedAt = reviews[0]?.updatedAt.toISOString().split("T")[0]
  const ratingScaleMax = 5
  const isAnonymous = reviews[0]?.isAnonymous
  const submittedBy = isAnonymous ? "Anonymous" : displayName
  const submittedByIcon = userIcon
  const tooltipText = `Submitted by: ${submittedBy} | Submitted: ${submittedAt} | Last updated: ${updatedAt} `

  return (
    <div className="flex lg:flex-row flex-col items-center m-6">
      <div className="">
        <Tooltip title={tooltipText} placement="top" arrow>
          <Button id="user-avatar" className="focus:outline-none" onClick={undefined}>
            {isAnonymous ? (
              <Avatar alt={submittedBy} />
            ) : (
              <Avatar alt={submittedBy} src={submittedByIcon} />
            )}
          </Button>
        </Tooltip>
      </div>
      <div
        className="bg-gray-50 p-4 border-gray-600 border-2
          flex flex-col  max-w-5xl"
      >
        <div
          id="ratings-container"
          className="flex lg:flex-row flex-col items-center justify-evenly text-xs mx-6"
        >
          <div id="total" className="px-3 border-r-2 text-center">
            Total
            <div id="total-rating">
              <RatingTotal
                size="small"
                readOnly
                max={ratingScaleMax}
                value={
                  reviews.reduce((prev, current) => prev + current.response, 0) / reviews.length
                }
              />
            </div>
          </div>
          {questionCategories.map((category) => {
            const currentReview = reviews.find(
              (review) => review.questionId === category.questionId
            )
            return currentReview ? (
              <ReviewCategoryAnswer
                key={currentReview.id}
                ratingScaleMax={5}
                response={currentReview.response}
                questionCategory={currentReview.question.questionCategory}
              />
            ) : (
              <ReviewCategoryAnswer
                key={category.id}
                ratingScaleMax={5}
                norating
                questionCategory={category.questionCategory}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
