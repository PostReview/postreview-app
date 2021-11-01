import { Rating } from "@mui/material"
import React from "react"
import { styled } from "@mui/material/styles"

export const MyReviewsTable = (props) => {
  const { articleWithReview, currentUser } = props
  const ratingScaleMax = 5

  const RatingTotal = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#f28c6d",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  })
  console.log(articleWithReview)

  return (
    <>
      {articleWithReview.map((article) => (
        <div
          key={article.id}
          className="bg-gray-50 m-6 p-4 border-gray-600 border-2
          flex flex-col  max-w-5xl"
        >
          <div id="metadata-container" className="mx-4 flex flex-row justify-between">
            <div id="article-metadata" className="m-2">
              <a href={`articles/${article.id}`}>
                <h2 className="font-bold">{article.title}</h2>
              </a>
              <div id="author" className="text-sm">
                {article.authorString}
              </div>
              <div className="text-sm text-gray-500">{article.doi}</div>
            </div>
            <div id="review-metadata" className="text-xs">
              <div id="submitter">Submitted by: {currentUser.name}</div>
              <div id="submitted-on">
                Submitted: {article.review[0]?.createdAt.toISOString().split("T")[0]}
              </div>
              <div id="last-updated-on">
                Last updated: {article.review[0]?.updatedAt.toISOString().split("T")[0]}
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
                    article.review.reduce((prev, current) => prev + current.response, 0) /
                    article.review.length
                  }
                />
              </div>
            </div>
            {article.review.map((answer) => (
              <div key={answer.id} className="m-2 text-center">
                {answer.question.questionCategory}
                <div id="rating">
                  <Rating size="small" readOnly max={ratingScaleMax} value={answer.response} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
