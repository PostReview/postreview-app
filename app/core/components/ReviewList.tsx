import React from "react"
import { useQuery } from "@blitzjs/core"
import { Review } from "./Review"
import { useCurrentUser } from "../hooks/useCurrentUser"
import getReviewAnswers from "app/queries/getReviewAnswers"

export const ReviewList = (prop) => {
  const { article } = prop
  const currentUser = useCurrentUser()

  const [reviews] = useQuery(getReviewAnswers, {
    currentArticleId: article?.id,
  })

  const isWrittenBy = (answer, userId) => {
    return answer.userId === userId
  }

  const userIds = Array.from(new Set(reviews.map((review) => review.userId)))

  userIds.forEach((userId) => {
    const reviewsPerUser = reviews.filter(({ userId }) => userId === 1)
  })

  return (
    <>
      <div>Reviews</div>
      {userIds.map((userId) => {
        const reviewsPerUser = reviews.filter((review) => review.userId === userId)
        return <Review key={userId} userId={userId} review={reviewsPerUser} />
      })}

      {/* {JSON.stringify(reviews)} */}
    </>
  )
}
