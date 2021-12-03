import React from "react"
import { RatingTotal } from "./RatingTotal"
import { ReviewCategoryAnswer } from "./ReviewCategoryAnswer"

export const IndividualReview = (props) => {
  const { handle, displayName, reviews } = props
  const ratingScaleMax = 5
  const isAnonymous = reviews[0].isAnonymous

  return (
    <>
      <div
        className="bg-gray-50 m-6 p-4 border-gray-600 border-2
          flex flex-col  max-w-5xl"
      >
        <div id="metadata-container" className="mx-4 flex flex-row justify-between">
          <div id="article-metadata" className="m-2">
            <div id="author" className="text-sm"></div>
          </div>
          <div id="review-metadata" className="text-xs">
            <div id="submitter">Submitted by: {isAnonymous ? displayName : "Anonymous"}</div>
            <div id="submitted-on">
              Submitted: {reviews[0]?.createdAt?.toISOString().split("T")[0]}
            </div>
            <div id="last-updated-on">
              Last updated: {reviews[0]?.updatedAt.toISOString().split("T")[0]}
            </div>
          </div>
        </div>
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
    </>
  )
}
