import React, { useState } from "react"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material"
import { invoke, useRouter, useSession } from "blitz"
import deleteReview from "app/mutations/deleteReview"
import PopupReview from "app/core/components/PopupReview"
import changeReviewAnonimity from "app/mutations/changeReivewAnonimity"
import { MoreHoriz } from "@mui/icons-material"

export const ArticleAction = (props) => {
  const { article, articleHasReview } = props
  const session = useSession()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const actionOpen = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDeleteReview = async (currentArticleId) => {
    await invoke(deleteReview, currentArticleId)
    router.reload()
  }
  const [isDeleteReviewDialogOpen, setIsDeleteReviewDialogOpen] = useState(false)
  const closeDeleteReviewDialog = () => {
    setIsDeleteReviewDialogOpen(false)
  }
  const openDeleteReviewDialog = () => {
    setIsDeleteReviewDialogOpen(true)
  }

  const handleOpenReviewDialog = () => {
    handleClose()
    setIsReviewDialogOpen(true)
  }
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const closeReviewDialog = () => {
    setIsReviewDialogOpen(false)
  }
  const [userHasReview, setUserHasReview] = useState(true)
  const [isChangeMade, setIsChangeMade] = useState(false)

  const handleChangeAnonymous = async (article) => {
    const newAnonymity = !article.review[0].isAnonymous
    await invoke(changeReviewAnonimity, {
      userId: session?.userId,
      articleId: article.id,
      isAnonymous: newAnonymity,
    })
    router.reload()
  }
  const isAnonymous = article.review[0].isAnonymous

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreHoriz className="text-gray-dark dark:text-gray-medium" />
      </IconButton>
      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={actionOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleOpenReviewDialog}>Edit</MenuItem>
        <MenuItem onClick={() => handleChangeAnonymous(article)}>
          {isAnonymous ? "Make Identifiable" : "Make Anonymous"}
        </MenuItem>
        <MenuItem onClick={openDeleteReviewDialog}>Delete</MenuItem>
      </Menu>
      <Dialog open={isReviewDialogOpen} onClose={closeReviewDialog}>
        <PopupReview
          article={article}
          handleClose={closeReviewDialog}
          userHasReview={userHasReview}
          setUserHasReview={setUserHasReview}
          setIsChangeMade={setIsChangeMade}
          session={session}
          articleHasReview={articleHasReview}
        />
      </Dialog>
      <Box>
        <Dialog open={isDeleteReviewDialogOpen} onClose={closeDeleteReviewDialog}>
          <DialogTitle id="deactivate-account">{"Deleting Your Review"}</DialogTitle>
          <DialogContent>
            Doing this will delete all of your submitted reviews for this article:{" "}
            <div className="font-bold">{article.title}</div>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteReviewDialog} autoFocus>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteReview(article.id)}
            >
              Delete My Reviews
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  )
}
