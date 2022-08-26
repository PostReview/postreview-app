import { IconButton, Button, Avatar } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import React from "react"
import { FaLink } from "react-icons/fa"
import { Link } from "blitz"
import { AvatarIcon } from "./AvatarIcon"

export const ProfileInfo = (props) => {
  const { open, setOpen, userInfo, showEditButton = false } = props

  return (
    <div id="user-info-container" className="relative mx-10 max-w-4xl">
      {showEditButton && (
        <div className="absolute right-0 top-2">
          <IconButton onClick={() => setOpen(!open)}>
            <EditIcon className="text-4xl text-gray-dark dark:text-gray-medium" />
          </IconButton>
        </div>
      )}
      <div id="photo-avatar-container" className="flex flex-row -mt-12">
        <div id="profile-picture" className="flex flex-row">
          <Button id="user-avatar" className="focus:outline-none" onClick={undefined}>
            <AvatarIcon currentUser={userInfo} height={"5rem"} width={"5rem"} />
          </Button>
          <div id="user-pronouns" className="relative">
            <span className="absolute bottom-0 ml-4">
              {userInfo?.pronoun && `(${userInfo?.pronoun})`}
            </span>
          </div>
        </div>
      </div>
      <div id="username-handle-card">
        <div className="flex flex-col max-w-lg my-2">
          <span id="display-name-container" className="text-2xl">
            {userInfo?.displayName}
          </span>
          <div id="handle-container">
            <span>{`@${userInfo?.handle}`}</span>
          </div>
        </div>
      </div>
      <div id="about-me-card" className="w-80 sm:w-[35rem] mt-6">
        {userInfo?.aboutMe}
      </div>
      {userInfo?.website && (
        <div id="website" className="mt-6">
          <span className="text-xs text-green-dark">
            <FaLink className="inline mr-1" />
            <Link
              href={
                /^http+/.test(userInfo?.website)
                  ? encodeURI(userInfo?.website)
                  : "https://" + userInfo?.website
              }
            >
              <a target={"_blank"} className="">
                {encodeURI(userInfo?.website)}
              </a>
            </Link>
          </span>
        </div>
      )}
    </div>
  )
}
