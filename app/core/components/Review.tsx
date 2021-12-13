import { Avatar, Button, Tooltip } from "@mui/material"
import React from "react"
import { RatingTotal } from "./RatingTotal"
import { ReviewCategoryAnswer } from "./ReviewCategoryAnswer"

export const Review = (props) => {
  const { handle, displayName, reviews, userIcon } = props
  const submittedAt = reviews[0]?.createdAt?.toISOString().split("T")[0]
  const updatedAt = reviews[0]?.updatedAt.toISOString().split("T")[0]
  const ratingScaleMax = 5
  const isAnonymous = reviews[0].isAnonymous
  const submittedBy = isAnonymous ? "Anonymous" : displayName
  const submittedByIcon = userIcon
  const tooltipText = `Submitted by: ${submittedBy} | Submitted: ${submittedAt} | Last updated: ${updatedAt} `

  return (
    <div className="flex lg:flex-row flex-col items-center">
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
        className="bg-gray-50 m-6 p-4 border-gray-600 border-2
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
          {reviews.map((review) => (
            <ReviewCategoryAnswer
              key={review.id}
              ratingScaleMax={5}
              response={review.response}
              questionCategory={review.question.questionCategory}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
