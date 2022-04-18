import { Avatar, Button, Tooltip } from "@mui/material"
import React from "react"
import { ReviewStars } from "./ReviewStars"
import { Icon } from "@iconify/react"
import { Link } from "blitz"

export const Review = (props) => {
  const { displayName, handle, reviews, userIcon, questionCategories } = props
  const submittedAt = reviews[0]?.createdAt?.toISOString().split("T")[0]
  const updatedAt = reviews[0]?.updatedAt.toISOString().split("T")[0]
  const isAnonymous = reviews[0]?.isAnonymous
  const submittedBy = isAnonymous ? "Anonymous" : displayName ? displayName : `@${handle}`
  const submittedByIcon = userIcon
  const tooltipText = `Submitted by: ${submittedBy} | Submitted: ${submittedAt} | Last updated: ${updatedAt} `

  return (
    <div className="flex lg:flex-row flex-col items-center m-6">
      <div className="">
        <Tooltip title={tooltipText} placement="top" arrow>
          <Button id="user-avatar" className="focus:outline-none">
            {isAnonymous ? (
              <Avatar alt={submittedBy} sx={{ backgroundColor: "rgb(217 119 6)" }}>
                <Icon icon="mdi:incognito" className="" />
              </Avatar>
            ) : (
              <Link href={`/profiles/${handle}`}>
                <Avatar alt={submittedBy} src={submittedByIcon} />
              </Link>
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
