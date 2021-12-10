import React from "react"
import { useQuery } from "blitz"
import { useCurrentUser } from "../hooks/useCurrentUser"
import getReviewAnswers from "app/queries/getReviewAnswers"
import { IndividualReview } from "./IndividualReview"

export const ReviewList = (prop) => {
  const { article } = prop
  const currentUser = useCurrentUser()

  const [usersWithReview] = useQuery(getReviewAnswers, {
    currentArticleId: article?.id,
  })

  const currentUserReview = usersWithReview.filter((user) => user.id == currentUser?.id)
  const otherUserReview = usersWithReview.filter((user) => user.id != currentUser?.id)

  return (
    <>
      <div id="reviews-container" className="max-w-4xl">
        <div className="border-b m-6 text-2xl">
          <h1>Your Rating</h1>
        </div>
        <div id="your-review-wrapper" className="flex flex-col items-center">
          {currentUserReview.map((user) => (
            <IndividualReview
              key={user.id}
              displayName={user.handle}
              handle={user.handle}
              reviews={user.review}
            />
          ))}
        </div>
        <div className="border-b m-6 text-2xl">
          <h1>All Ratings</h1>
        </div>
        <div id="individual-review-wrapper" className="flex flex-col items-center">
          {otherUserReview.length ? (
            otherUserReview.map((user) => (
              <IndividualReview
                key={user.id}
                displayName={user.handle}
                handle={user.handle}
                reviews={user.review}
              />
            ))
          ) : (
            <div className="m-20">No other reviews</div>
          )}
        </div>
      </div>
    </>
  )
}
