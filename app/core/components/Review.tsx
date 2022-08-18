import { Avatar, Rating, Tooltip } from "@mui/material"
import React, { useState } from "react"
import { Icon } from "@iconify/react"
import { useRouter } from "blitz"
import StarIcon from "@mui/icons-material/Star"
import { ArticleAction } from "./ArticleAction"
import { ReviewStars } from "./ReviewStars"


export const Review = (props) => {
  const { displayName, handle, reviews, userIcon, questionCategories, comment, ratingScaleMax, showArticleAction = false, article } = props
  const submittedAt = reviews[0]?.createdAt?.toISOString().split("T")[0]
  const updatedAt = reviews[0]?.updatedAt.toISOString().split("T")[0]
  const isAnonymous = reviews[0]?.isAnonymous
  const submittedBy = isAnonymous ? "Anonymous" : displayName ? displayName : `@${handle}`
  const tooltipText =
    <div className="fle flex-col">
      <div>{`Submitted by: ${submittedBy}`}</div>
      <div>{`Submitted: ${submittedAt}`}</div>
      <div>{`Last updated: ${updatedAt}`}</div>
    </div>
  const totalScore = reviews.reduce((prev, current) => prev + current.response, 0) / reviews.length

  const router = useRouter()

  const [isCardExpanded, setIsCardExpanded] = useState(false)
  const [isCommentExpanded, setIsCommentExpanded] = useState(false)

  const TotalScoreCard = (props) => {
    const { fontSize = 50, textClass = "text-lg" } = props
    return (
      <div className="flex flex-row items-center">
        <div id="total-score" className={"ml-2 font-semibold text-gray-darkest dark:text-white " + textClass}>
          {totalScore.toFixed(1)}</div>
        <div id="total-star" className="mr-2">
          <Rating
            readOnly
            value={totalScore / ratingScaleMax}
            precision={0.1}
            max={1}
            sx={{
              fontSize: fontSize,
              color: "#94ec01",
            }}
            emptyIcon={<StarIcon style={{ opacity: .40, color: "#737373" }} fontSize="inherit" />}
          />
        </div>
      </div>)
  }

  return (
    <>
      <div id="review-summary" className="relative w-full h-32 p-2 flex flex-row items-center bg-gray-light dark:bg-gray-light/10  border-black">
        {showArticleAction &&
          <div className="absolute top-0 right-0">
            <ArticleAction article={article} />
          </div>}
        <div id="review-header-section" className="flex flex-row items-center relative">
          <div id="avatar" className="m-2 absolute hover:cursor-pointer">
            <Tooltip title={tooltipText} placement="top" arrow>
              {isAnonymous ? (
                <Avatar alt={"Anonymous"} sx={{ backgroundColor: "#545454" }} variant="square">
                  <Icon icon="mdi:incognito" className="text-green" />
                </Avatar>
              ) : (
                <button onClick={() => router.push(`/profiles/${handle}`)}>
                  <Avatar
                    alt={displayName ? displayName : handle}
                    sx={{
                      backgroundColor: "#545454",
                      color: "#94ec01"
                    }}
                    variant="square"
                    src={`https://eu.ui-avatars.com/api/?name=${displayName ? displayName : handle}&color=94ec01&background=545454`}
                  />
                </button>
              )}
            </Tooltip>
          </div>
        </div>
        <div className="m-auto">
          <TotalScoreCard textClass="text-4xl" />
        </div>
      </div>
      {isCardExpanded && <ReviewStars reviews={reviews} questionCategories={questionCategories}
        onClick={() => setIsCardExpanded(!isCardExpanded)} />}
      {(isCardExpanded && comment) &&
        <div className="p-4 w-full bg-gray-light dark:bg-gray-light/10 text-gray-darkest dark:text-white">
          <h2 className="font-semibold text-xl w-full">Comment</h2>
          <p className="text-gray-medium dark:text-gray-light">
            {comment.length < 500 ? comment :
              isCommentExpanded ?
                <>
                  {comment}
                  <span className="underline ml-2 italic hover:cursor-pointer"
                    onClick={() => setIsCommentExpanded(!isCommentExpanded)}>
                    See less
                  </span>
                </> :
                <>
                  {comment.slice(0, 500)}...
                  <span className="underline ml-2 italic hover:cursor-pointer"
                    onClick={() => setIsCommentExpanded(!isCommentExpanded)}>
                    See more
                  </span>
                </>}
          </p>
        </div>}
      <div id="expand"
        className="mt-0 w-full h-4 mb-6 bg-gray-medium hover:cursor-pointer"
        onClick={() => setIsCardExpanded(!isCardExpanded)}>
        <div className="mt-1 w-10 h-2 rounded-xl bg-gray-darkest m-auto"></div>
      </div>
    </>
  )
}
