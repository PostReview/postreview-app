import React from "react"
import { RatingTotal } from "./RatingTotal"
import { ReviewCategoryAnswer } from "./ReviewCategoryAnswer"

export const ReviewSample = (props) => {
  const { userId, review, article, user, ratingScaleMax } = props

  return (
    <>
      <div
        className="bg-gray-50 m-6 p-4 border-gray-600 border-2
          flex flex-col  max-w-5xl"
      >
        <div id="metadata-container" className="mx-4 flex flex-row justify-between">
          <div id="article-metadata" className="m-2">
            <h2 className="font-bold">{article.title}</h2>
            <div id="author" className="text-sm">
              {article.authorString}
            </div>
            <div className="text-sm text-gray-500">{article.doi}</div>
          </div>
          <div id="review-metadata" className="text-xs">
            <div id="submitter">Submitted by: {user.name}</div>
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
                  article.review.reduce((prev, current) => prev + current.response, 0) /
                  article.review.length
                }
              />
            </div>
          </div>
          {article.review.map((review) => (
            <ReviewCategoryAnswer
              key={review.id}
              ratingScaleMax={5}
              response={review.response}
              questionCategory={review.questionCategory}
            />
          ))}
          <div>...</div>
        </div>
      </div>
      {userId && (
        <>
          <div>ID: {userId}</div>
          <div>{JSON.stringify(review)}</div>
        </>
      )}
    </>
  )
}
