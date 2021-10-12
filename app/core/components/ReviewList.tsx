import React from "react"
import { useQuery } from "@blitzjs/core"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

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

  const prScoreTotal = Math.round(
    (reviews.reduce((total, next) => total + next.response / 7, 0) / reviews.length) * 100
  )

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
      <div className="p-5">
        Rating
        <div>
          <CircularProgressWithLabel value={prScoreTotal} />
        </div>
        <div className="text-gray-400">Based on {userIds.length} Rating/s</div>
      </div>

      <div className="p-5">
        <div>Individual Reviews</div>
        {userIds.map((userId) => {
          const reviewsPerUser = reviews.filter((review) => review.userId === userId)
          return <Review key={userId} userId={userId} review={reviewsPerUser} />
        })}

        {/* {JSON.stringify(reviews)} */}
      </div>
    </>
  )
}
