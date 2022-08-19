import { AppBar, Button, Dialog, IconButton, Toolbar, Typography } from "@mui/material"
import React, { forwardRef, ReactElement, Ref } from "react"
import CloseIcon from "@mui/icons-material/Close"

export const ProfileEditDialog = (props) => {
  const { open, setOpen } = props

  return (
    <Dialog open={open} onClose={() => setOpen(false)} sx={{ background: "black" }} fullScreen>
      <AppBar sx={{ position: "relative", background: "black" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Edit profile
          </Typography>
          <Button autoFocus color="inherit" onClick={() => setOpen(false)}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <div className="bg-black h-full"></div>
    </Dialog>
  )
}
