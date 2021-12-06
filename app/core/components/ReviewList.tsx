import React from "react"
import { useQuery } from "blitz"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Review } from "./Review"
import { useCurrentUser } from "../hooks/useCurrentUser"
import getReviewAnswers from "app/queries/getReviewAnswers"
import { IndividualReview } from "./IndividualReview"
import Article from "./Article"

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
      <div>
        <div className="border-b m-6 text-2xl">
          <h1>All Ratings</h1>
        </div>
        {usersWithReview.map((user) => (
          <IndividualReview
            key={user.id}
            displayName={user.handle}
            handle={user.handle}
            reviews={user.review}
          >
            {JSON.stringify(user)}
          </IndividualReview>
        ))}
      </div>
    </>
  )
}
