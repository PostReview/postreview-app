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

  // const userIds = Array.from(new Set(reviews.map((review) => review.userId)))

  // userIds.forEach((userId) => {
  //   const reviewsPerUser = reviews.filter(({ userId }) => userId === 1)
  // })

  // const prScoreTotal = Math.round(
  //   (reviews.reduce((total, next) => total + next.response / 7, 0) / reviews.length) * 100
  // )

  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    )
  }

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
