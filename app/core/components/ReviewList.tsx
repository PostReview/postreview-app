import React from "react"
import { useQuery } from "blitz"
import getUsersWithReviewsByArticleId from "app/queries/getUsersWithReviewsByArticleId"
import { Review } from "./Review"
import getQuestionCategories from "app/queries/getQuestionCategories"

export const ReviewList = (prop) => {
  const { article, ratingScaleMax, session } = prop

  const [usersWithReview] = useQuery(getUsersWithReviewsByArticleId, {
    currentArticleId: article?.id,
  })

  const [questionCategories] = useQuery(getQuestionCategories, undefined)

  const currentUserReview = usersWithReview.find((user) => user.id == session?.userId)
  const currentUserHasReview = currentUserReview?.review.length
  const otherUserReview = usersWithReview.filter((user) => user.id != session?.userId)

  return (
    <>
      <div id="reviews-container" className="max-w-4xl">
        {currentUserHasReview && (
          // Show the current user's review
          <div id="your-rating-wrapper" className="mt-6 mb-6">
            <div className="border-b m-6 text-2xl text-gray-darkest dark:text-white">
              <h1>Your review</h1>
            </div>
            <div className="flex flex-col items-center">
              <Review
                key={currentUserReview?.id}
                displayName={currentUserReview?.displayName}
                handle={currentUserReview?.handle}
                reviews={currentUserReview?.review}
                userIcon={currentUserReview?.icon}
                questionCategories={questionCategories}
                comment={currentUserReview?.reviewComments[0]?.comment}
                ratingScaleMax={ratingScaleMax}
                showArticleAction={true}
                article={{ ...article, review: { ...currentUserReview?.review } }}
              />
            </div>
          </div>
        )}
        <div className="border-b m-6 text-2xl text-gray-darkest dark:text-white">
          <h1>Reviews</h1>
        </div>
        <div id="individual-review-wrapper" className="flex flex-col items-center">
          {otherUserReview.length ? (
            otherUserReview.map((user) => (
              <Review
                key={user.id}
                displayName={user.displayName}
                handle={user.handle}
                reviews={user.review}
                userIcon={user.icon}
                questionCategories={questionCategories}
                ratingScaleMax={ratingScaleMax}
                comment={user.reviewComments[0]?.comment}
              />
            ))
          ) : (
            <div className="m-20 opacity-80 text-gray-darkest dark:text-white">No other reviews</div>
          )}
        </div>
      </div>
    </>
  )
}
