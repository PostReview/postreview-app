import React, { useEffect, useState } from "react"
import { ReviewedStar } from "./ReviewedStar"

export const ReviewStars = (props) => {
  const { reviews, questionCategories, onClick } = props
  const ratingScaleMax = 5

  // handle darkmode
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDark(mediaQuery.matches)
  }, [])
  const smallStarColor = isDark ? "#d9d9d9" : "#737373"

  return (
    <div
      id="expanded-review"
      className="flex flex-row w-full items-center justify-evenly text-xs bg-gray-light dark:bg-gray-light dark:bg-opacity-10"
      onClick={onClick}
    >
      {questionCategories.map((category) => {
        const currentReview = reviews.find((review) => review.questionId === category.questionId)
        return (
          <div key={category.questionId}>
            <ReviewedStar
              currentReview={currentReview}
              ratingScaleMax={ratingScaleMax}
              smallStarColor={smallStarColor}
              fontSize={50}
              category={category}
            />
          </div>
        )
      })}
    </div>
  )
}
