import React from "react"
import { Link, useQuery } from "blitz"
import getQuestionCategories from "app/queries/getQuestionCategories"
import { FaBarcode, FaCrown } from "react-icons/fa"
import { Review } from "app/core/components/Review"

export const MyReviewsTable = (props) => {
  // Rating scale max
  const ratingScaleMax = 5
  const { articleWithReview, currentUser, publicProfile } = props
  const [questionCategories] = useQuery(getQuestionCategories, undefined)

  return (
    <>
      {articleWithReview.map((article) => {
        return (
          <div
            key={article.id}
            className="m-1 p-2 border-gray-medium/20 border-4
            flex flex-col max-w-5xl"
          >
            <div id="metadata-container" className="flex flex-row justify-between items-center">
              <div id="article-metadata" className="m-2 text-gray-darkest dark:text-white">
                <Link href={`/articles/${article.id}`}>
                  <a>
                    <h2 className="font-bold">{article.title}</h2>
                  </a>
                </Link>
                <div id="author" className="text-sm text-gray-darkest dark:text-white opacity-70">
                  <FaCrown className="inline mr-2" />
                  {article.authorString} ({article.publishedYear})
                </div>
                <div className="text-sm text-green-dark underline">
                  <FaBarcode className="inline mr-2" />
                  <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noreferrer">
                    {article.doi}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <Review
                displayName={currentUser?.displayName}
                handle={currentUser?.handle}
                reviews={article?.review}
                userIcon={currentUser?.icon}
                questionCategories={questionCategories}
                comment={article?.reviewComment[0]?.comment}
                ratingScaleMax={ratingScaleMax}
                showArticleAction={!publicProfile}
                article={article}
              />
            </div>
          </div>
        )
      })}
    </>
  )
}
