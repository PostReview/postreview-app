import React from "react"
import { FaBook, FaUser } from "react-icons/fa"
import { Link } from "next/link"
import { Rating } from "@mui/material"
import Chip from "@mui/material/Chip"
import StarIcon from "@mui/icons-material/Star"
import { useQuery } from "blitz"
import getArticleScoresById from "app/queries/getArticleScoresById"
import getQuestionCategories from "app/queries/getQuestionCategories"

export default function Article(props) {
  const { id, authorString, doi, title } = props

  const [articleScores] = useQuery(getArticleScoresById, {
    articleId: id,
  })

  const [questionCategories] = useQuery(getQuestionCategories, undefined)

  const ratingsCount = articleScores.length
  const totalRating = articleScores.reduce((prev, current) => {
    // console.log("prev: " + prev)
    // console.log("current: " + current._avg.response)
    return prev + current._avg.response! / articleScores.length
  }, 0)

  return (
    <div
      className="bg-gray-50 m-6 p-4 border-gray-600 border-2
    flex flex-col  max-w-5xl"
    >
      <div>
        <div id="article-header" className="flex flex-row">
          <Chip label={ratingsCount} className="mr-2" />
          <div id="title" className="font-semibold inline">
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
        className="flex lg:flex-row flex-col items-center justify-evenly text-xs mx-6"
      >
        <div id="total" className="px-3 border-r-2 text-center">
          <div id="total-rating">
            <Rating
              readOnly
              defaultValue={totalRating / 5}
              precision={0.1}
              max={1}
              sx={{
                fontSize: 100,
                color: "#FF5733",
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
          </div>
          Total
        </div>
        {articleScores.map((score) => (
          <div key={score.questionId} className="text-center">
            <Rating
              readOnly
              defaultValue={score._avg.response! / 5}
              precision={0.1}
              max={1}
              sx={{
                fontSize: 100,
                color: "#FFC300",
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <div>
              {
                questionCategories.find((category) => category.questionId === score.questionId)
                  ?.questionCategory
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
