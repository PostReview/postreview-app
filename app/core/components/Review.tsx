import { Avatar, Rating, Tooltip } from "@mui/material"
import React, { useState } from "react"
import { Icon } from "@iconify/react"
import { useRouter } from "blitz"
import StarIcon from "@mui/icons-material/Star"
import { ArticleAction } from "./ArticleAction"
import { ReviewStars } from "./ReviewStars"
import { AvatarIcon } from "./AvatarIcon"
import { BsFillChatRightTextFill } from "react-icons/bs"

export const Review = (props) => {
  const {
    displayName,
    handle,
    reviews,
    userIcon,
    questionCategories,
    comment,
    ratingScaleMax,
    showArticleAction = false,
    article,
    articleHasReview,
  } = props
  const submittedAt = reviews[0]?.createdAt?.toISOString().split("T")[0]
  const updatedAt = reviews[0]?.updatedAt.toISOString().split("T")[0]
  const isAnonymous = reviews[0]?.isAnonymous
  const submittedBy = isAnonymous ? "Anonymous" : displayName ? displayName : `@${handle}`
  const tooltipText = (
    <div className="fle flex-col">
      <div>{`Submitted by: ${submittedBy}`}</div>
      <div>{`Submitted: ${submittedAt}`}</div>
      <div>{`Last updated: ${updatedAt}`}</div>
    </div>
  )
  const totalScore = reviews.reduce((prev, current) => prev + current.response, 0) / reviews.length

  const router = useRouter()

  const [isCardExpanded, setIsCardExpanded] = useState(false)
  const [isCommentExpanded, setIsCommentExpanded] = useState(false)

  const TotalScoreCard = (props) => {
    const { fontSize = 50, textClass = "text-lg" } = props
    return (
      <div className="flex flex-row items-center">
        <div
          id="total-score"
          className={"ml-2 font-semibold text-gray-darkest dark:text-white " + textClass}
        >
          {totalScore.toFixed(1)}
        </div>
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
            emptyIcon={<StarIcon style={{ opacity: 0.4, color: "#737373" }} fontSize="inherit" />}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        id="review-summary"
        className="relative flex h-32 w-full flex-row items-center border-black bg-gray-light p-2  dark:bg-gray-light/10"
      >
        {showArticleAction && (
          <div className="absolute top-0 right-0">
            <ArticleAction article={article} articleHasReview={articleHasReview} />
          </div>
        )}
        <div id="review-header-section" className="relative flex flex-row items-center">
          <div id="avatar" className="absolute m-2 hover:cursor-pointer">
            <Tooltip title={tooltipText} placement="top" arrow>
              {isAnonymous ? (
                <Avatar alt={"Anonymous"} sx={{ backgroundColor: "#545454" }} variant="square">
                  <Icon icon="mdi:incognito" className="text-green" />
                </Avatar>
              ) : (
                <button onClick={() => router.push(`/profiles/${handle}`)}>
                  <AvatarIcon currentUser={{ handle: handle, icon: userIcon }} />
                </button>
              )}
            </Tooltip>
          </div>
        </div>
        <div className="m-auto">
          <TotalScoreCard textClass="text-4xl" />
        </div>
        {
          // Show a speech bubble icon when there's a comment
          comment && (
            <div id="comment-icon" className="absolute right-10 top-auto rounded-md">
              <button
                className="rounded-full bg-gray-dark p-2 text-white"
                onClick={() => setIsCardExpanded(!isCardExpanded)}
              >
                <BsFillChatRightTextFill />
              </button>
            </div>
          )
        }
      </div>
      {isCardExpanded && (
        <ReviewStars
          reviews={reviews}
          questionCategories={questionCategories}
          onClick={() => setIsCardExpanded(!isCardExpanded)}
        />
      )}
      {isCardExpanded && comment && (
        <div className="w-full bg-gray-light p-4 text-gray-darkest dark:bg-gray-light/10 dark:text-white">
          <h2 className="w-full text-xl font-semibold">Comment</h2>
          <p className="text-gray-medium dark:text-gray-light">
            {comment.length < 500 ? (
              comment
            ) : isCommentExpanded ? (
              <>
                {comment}
                <span
                  className="ml-2 italic underline hover:cursor-pointer"
                  onClick={() => setIsCommentExpanded(!isCommentExpanded)}
                >
                  See less
                </span>
              </>
            ) : (
              <>
                {comment.slice(0, 500)}...
                <span
                  className="ml-2 italic underline hover:cursor-pointer"
                  onClick={() => setIsCommentExpanded(!isCommentExpanded)}
                >
                  See more
                </span>
              </>
            )}
          </p>
        </div>
      )}
      <div
        id="expand"
        className="mt-0 mb-3 h-4 w-full bg-gray-medium hover:cursor-pointer"
        onClick={() => setIsCardExpanded(!isCardExpanded)}
      >
        <div className="m-auto mt-1 h-2 w-10 rounded-xl bg-gray-darkest"></div>
      </div>
    </>
  )
}
