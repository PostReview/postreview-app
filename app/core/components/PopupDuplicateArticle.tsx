import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import React from "react"

export default function PopupDuplicateArticle(props) {
  const { handleClose } = props
  return (
    <>
      <DialogTitle>Duplicate Article</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-article already there.">
          Article is already added. Please choose a different article to add.
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Ok
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  )
}
