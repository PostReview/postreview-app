import React from "react"
import { RatingTotal } from "./RatingTotal"
import { ReviewCategoryAnswer } from "./ReviewCategoryAnswer"

export const ReviewStars = (props) => {
  const { reviews, questionCategories } = props
  const ratingScaleMax = 5

  return (
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
            value={reviews.reduce((prev, current) => prev + current.response, 0) / reviews.length}
          />
        </div>
      </div>
      {questionCategories.map((category) => {
        const currentReview = reviews.find((review) => review.questionId === category.questionId)
        return currentReview ? (
          <ReviewCategoryAnswer
            key={currentReview.id}
            ratingScaleMax={category.maxValue}
            response={currentReview.response}
            questionCategory={currentReview.question.questionCategory}
          />
        ) : (
          <ReviewCategoryAnswer
            key={category.id}
            ratingScaleMax={category.maxValue}
            norating
            questionCategory={category.questionCategory}
          />
        )
      })}
    </div>
  )
}
