import React from "react"
import { FaBook, FaUser } from "react-icons/fa"
import { Link } from "next/link"
import { Rating } from "@mui/material"
import Chip from "@mui/material/Chip"
import StarIcon from "@mui/icons-material/Star"
import { useQuery } from "blitz"
import getArticleScoresById from "app/queries/getArticleScoresById"
import getQuestionCategories from "app/queries/getQuestionCategories"
import getUsersWithReviewsByArticleId from "app/queries/getUsersWithReviewsByArticleId"

export default function Article(props) {
  const { id, authorString, doi, title } = props

  const ratingScaleMax = 5

  const [articleScores] = useQuery(getArticleScoresById, {
    currentArticleId: id,
  })

  const [questionCategories] = useQuery(getQuestionCategories, undefined)

  const [usersWithReview] = useQuery(getUsersWithReviewsByArticleId, {
    currentArticleId: id,
  })
  const ratingsCount = usersWithReview.length

  const totalRating = articleScores.reduce((prev, current) => {
    return prev + current._avg.response! / articleScores.length
  }, 0)

  return (
    <div
      className="bg-gray-50 m-3 p-4 border-gray-600 border-2
    flex flex-col  max-w-5xl"
    >
        <div id="article-header" className="flex md:flex-row flex-col">
          <div id="chip-container" className="self-center">
            <Chip label={ratingsCount} className="w-8" />
          </div>
          <div id="title" className="font-semibold inline ml-3">
            <Link href={`/articles/${id}`}>{title}</Link>
          </div>
          <div>
            <div className="article__author ml-2 text-gray-700">
              <FaUser className="inline mr-2" />
              {authorString}
            </div>
            <div className="article__DOI ml-2 text-gray-700 whitespace-nowrap">
              <a href={`https://dx.doi.org/${doi}`} rel="noreferrer" target="_blank">
                <FaBook className="inline mr-2" />
                {doi}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        id="ratings-container"
        className="flex md:flex-row flex-col items-center justify-evenly text-xs mx-6"
      >
        <div id="total" className="px-3 md:border-r-2 md:border-b-0 border-b-2 text-center">
          <div id="total-rating">
            {ratingsCount === 0 ? ( // When no ratings, show a placeholder
              <div className="flex items-center justify-center">
                <div className="absolute text-gray-500 z-50">N/A</div>
                <Rating
                  readOnly
                  value={0}
                  precision={0.1}
                  max={1}
                  sx={{
                    fontSize: 100,
                    color: "#FF5733",
                  }}
                  emptyIcon={<StarIcon style={{ opacity: 0.2 }} fontSize="inherit" />}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div className="absolute text-white font-semibold text-base z-50">
                  {totalRating.toFixed(1)}
                </div>
                <Rating
                  readOnly
                  value={totalRating / ratingScaleMax}
                  precision={0.1}
                  max={1}
                  sx={{
                    fontSize: 100,
                    color: "#FF5733",
                  }}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
            )}
          </div>
          Total
        </div>
        {questionCategories.map((category) =>
          articleScores.find((score) => score.questionId === category.questionId)?._avg
            .response! ? (
            <div key={category.questionId} className="text-center">
              <div className="flex items-center justify-center">
                <div className="absolute text-white font-semibold text-base z-50">
                  {articleScores
                    .find((score) => score.questionId === category.questionId)
                    ?._avg.response!.toFixed(1)}
                </div>
                <Rating
                  readOnly
                  value={
                    articleScores.find((score) => score.questionId === category.questionId)?._avg
                      .response! / ratingScaleMax
                  }
                  precision={0.1}
                  max={1}
                  sx={{
                    fontSize: 100,
                    color: "#FFC300",
                  }}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
              <div>{category.questionCategory}</div>
            </div>
          ) : (
            <div key={category.questionId} className="text-center">
              <div className="flex items-center justify-center">
                <div className="absolute text-gray-500 z-50">N/A</div>
                <Rating
                  readOnly
                  value={0}
                  precision={0.1}
                  max={1}
                  sx={{
                    fontSize: 100,
                    color: "#FF5733",
                  }}
                  emptyIcon={<StarIcon style={{ opacity: 0.2 }} fontSize="inherit" />}
                />
              </div>
              <div>{category.questionCategory}</div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
