import React from "react"
import { Avatar } from "@mui/material"

export const AvatarIcon = (props) => {
  const { currentUser } = props
  return (
    <Avatar
      alt={currentUser.handle}
      src={
        currentUser.icon
          ? currentUser.icon!
          : `https://eu.ui-avatars.com/api/?name=${
              currentUser.displayName ? currentUser.displayName : currentUser.handle
            }&color=94ec01&background=2e2c2c`
      }
      sx={{
        backgroundColor: "#545454",
        color: "#94ec01",
        borderColor: "black",
      }}
      variant="square"
    />
  )
}
