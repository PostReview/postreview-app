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
    flex flex-col w-full max-w-5xl"
    >
      <div id="title-star-container" className="w-full flex md:flex-row flex-row justify-between">
        <div id="title" className="font-semibold inline mr-3">
          <Link href={`/articles/${id}`}>
            {title.length < 70 ? title :
              title.slice(0, 70) + "..."}
          </Link>
        </div>
        <div id="with-rating-total">
          <div className="flex flex-row items-end">
            <div className="text-5xl font-bold text-white">
              {ratingTotal?.toFixed(1)}
          </div>
                <Rating
                  readOnly
              value={ratingTotal / ratingScaleMax}
                  precision={0.1}
                  max={1}
                  sx={{
                fontSize: 70,
                color: "#94ec01",
                  }}
              emptyIcon={<StarIcon style={{ opacity: .40, color: "#737373" }} fontSize="inherit" />}
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
      <div id="bottom-container" className="flex flex-row items-end justify-between">
        <div id="g-ratings-container" className="text-gray-medium text-[0.8rem] whitespace-nowrap">
          <FaUsers className="inline mr-2 text-gray-medium" />
          {ratingsCount} global ratings
              </div>
        <div id="author-doi-container" className="flex flex-col items-end">
          <div className="text-[0.9rem] text-gray-medium">
            <FaCrown className="inline mr-2" />
            {authorString.length < 20 ? authorString :
              authorString.slice(0, 20) + "..."} {publishedYear && publishedYearString}
            </div>
          <div className="text-[0.8rem] text-green-dark/60 underline whitespace-nowrap">
            <a href={`https://dx.doi.org/${doi}`} rel="noreferrer" target="_blank">
              <FaBarcode className="inline mr-2 text-green-dark/60" />
              {doi}
            </a>
              </div>
              <div>{category.questionCategory}</div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
