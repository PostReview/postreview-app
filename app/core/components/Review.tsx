import { Avatar, Button, Rating, SwipeableDrawer, Tooltip } from "@mui/material"
import React, { useState } from "react"
import { ReviewStars } from "./ReviewStars"
import { Icon } from "@iconify/react"
import { Link } from "blitz"
import StarIcon from "@mui/icons-material/Star"


export const Review = (props) => {
  const { displayName, handle, reviews, userIcon, questionCategories, comment, ratingScaleMax } = props
  const submittedAt = reviews[0]?.createdAt?.toISOString().split("T")[0]
  const updatedAt = reviews[0]?.updatedAt.toISOString().split("T")[0]
  const isAnonymous = reviews[0]?.isAnonymous
  const submittedBy = isAnonymous ? "Anonymous" : displayName ? displayName : `@${handle}`
  const tooltipText = `Submitted by: ${submittedBy} | Submitted: ${submittedAt} | Last updated: ${updatedAt} `
  const totalScore = reviews.reduce((prev, current) => prev + current.response, 0) / reviews.length
  const [open, setOpen] = useState(true);



  return (
    <>
      <div id="review-summary" className="w-full h-32 p-2 flex flex-row items-center bg-gray-light dark:bg-gray-light/10  border-black">
        <div id="review-header-section" className="flex flex-row items-center">
          <div id="avatar" className="m-2">
            <Tooltip title={tooltipText} placement="top" arrow>
              {isAnonymous ? (
                <Avatar alt={"Anonymous"} sx={{ backgroundColor: "#545454" }} variant="square">
                  <Icon icon="mdi:incognito" className="text-green" />
                </Avatar>
              ) : (
                <Link href={`/profiles/${handle}`}>
                  <Avatar
                    alt={displayName ? displayName : handle}
                    sx={{
                      backgroundColor: "#545454",
                      color: "#94ec01"
                    }}
                    variant="square"
                    src={`https://eu.ui-avatars.com/api/?name=${displayName ? displayName : handle}&color=94ec01&background=545454`}
                  />
                </Link>
              )}
            </Tooltip>
          </div>
          <div id="total-star" className="mx-4">
            <Rating
              readOnly
              value={totalScore / ratingScaleMax}
              precision={0.1}
              max={1}
              sx={{
                fontSize: 50,
                color: "#94ec01",
              }}
              emptyIcon={<StarIcon style={{ opacity: .40, color: "#737373" }} fontSize="inherit" />}
            />
          </div>
          <div id="comment-snippet" className="break-words text-gray-darkest dark:text-white">
            {comment.length < 75 ? comment :
              <>
                {comment.slice(0, 75)}...
                <span className="underline ml-2 italic hover:cursor-pointer"
                  onClick={undefined}>
                  See more
                </span>
              </>}
          </div>
        </div>
      </div>
      <div id="expand"
        className="mt-0 w-full h-4 bg-gray-medium hover:cursor-pointer"
        onClick={undefined}>
        <div className="mt-1 w-10 h-2 rounded-xl bg-gray-darkest m-auto"></div>
      </div>
    </>
  )
}
