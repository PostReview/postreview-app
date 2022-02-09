import { Avatar, Button, Tooltip } from "@mui/material"
import React from "react"
import { ReviewStars } from "./ReviewStars"

export const Review = (props) => {
  const { displayName, reviews, userIcon, questionCategories } = props
  const submittedAt = reviews[0]?.createdAt?.toISOString().split("T")[0]
  const updatedAt = reviews[0]?.updatedAt.toISOString().split("T")[0]
  const isAnonymous = reviews[0]?.isAnonymous
  const submittedBy = isAnonymous ? "Anonymous" : displayName
  const submittedByIcon = userIcon
  const tooltipText = `Submitted by: ${submittedBy} | Submitted: ${submittedAt} | Last updated: ${updatedAt} `

  return (
    <div className="flex lg:flex-row flex-col items-center m-6">
      <div className="">
        <Tooltip title={tooltipText} placement="top" arrow>
          <Button id="user-avatar" className="focus:outline-none" onClick={undefined}>
            {isAnonymous ? (
              <Avatar alt={submittedBy} />
            ) : (
              <Avatar alt={submittedBy} src={submittedByIcon} />
            )}
          </Button>
        </Tooltip>
      </div>
      <div
        className="bg-gray-50 p-4 border-gray-600 border-2
          flex flex-col  max-w-5xl"
      >
        <ReviewStars reviews={reviews} questionCategories={questionCategories} />
      </div>
    </div>
  )
}
