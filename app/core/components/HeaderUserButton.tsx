import { Link, useMutation } from "@blitzjs/core"
import { Avatar, Button, Menu, MenuItem } from "@mui/material"
import logout from "app/auth/mutations/logout"
import React, { useState } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import GoogleButton from "./GoogleButton"

export const HeaderUserButton = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = async () => {
    await logoutMutation()
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  console.log(currentUser)

  return (
    <div>
      {currentUser ? (
        <Button id="user-avatar" className="focus:outline-none" onClick={handleClick}>
          {currentUser.icon ? (
            <Avatar alt={currentUser.handle} src={currentUser.icon!} />
          ) : (
            <Avatar>{currentUser?.handle?.[0]}</Avatar>
          )}
        </Button>
      ) : (
        <Button
          id="login-button"
          variant="contained"
          className="focus:outline-none"
          onClick={handleClick}
        >
          Login / Signup
        </Button>
      )}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {currentUser ? (
          <>
            <MenuItem onClick={handleClose}>
              <Link href="/profile">Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>
        ) : (
          <>
            <MenuItem>
              <GoogleButton />
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  )
}
