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
  Rating,
} from "@mui/material"
import React, { useState } from "react"
import { styled } from "@mui/material/styles"
import { invoke, useQuery, useRouter } from "blitz"
import getQuestionCategories from "app/queries/getQuestionCategories"
import { MoreHoriz } from "@mui/icons-material"
import deleteReview from "app/mutations/deleteReview"
import PopupReview from "app/core/components/PopupReview"
import changeReviewAnonimity from "app/mutations/changeReivewAnonimity"
import { FaBook, FaUser } from "react-icons/fa"
import { Review } from "app/core/components/Review"

export const MyReviewsTable = (props) => {
  const { articleWithReview, currentUser } = props
  const [questionCategories] = useQuery(getQuestionCategories, undefined)

  const RatingTotal = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#f28c6d",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  })

  const [anchorEl, setAnchorEl] = useState(null)
  const actionOpen = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const router = useRouter()
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
      userId: currentUser.id,
      articleId: article.id,
      isAnonymous: newAnonymity,
    })
    router.reload()
  }

  return (
    <>
      {articleWithReview.map((article) => {
        const isAnonymous = article.review[0].isAnonymous
        return (
          <div
            key={article.id}
            className="bg-gray-50 m-6 p-4 border-gray-200 border-2
            flex flex-col  max-w-5xl"
          >
            <div
              id="metadata-container"
              className="mx-4 flex flex-row justify-between items-center"
            >
              <div id="article-metadata" className="m-2">
                <a href={`articles/${article.id}`}>
                  <h2 className="font-bold">{article.title}</h2>
                </a>
                <div id="author" className="text-sm text-gray-700">
                  <FaUser className="inline mr-2" />
                  {article.authorString} ({article.publishedYear})
                </div>
                <div className="text-sm text-gray-700">
                  <FaBook className="inline mr-2" />
                  <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noreferrer">
                    {article.doi}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center">
              <Review
                displayName={currentUser.displayName}
                reviews={article.review}
                userIcon={currentUser.icon}
                questionCategories={questionCategories}
              />
              <div className="flex flex-col">
                <div id="action-menu" className="self-end text-gray-500">
                  {isAnonymous && <VisibilityOff className="mr-2" />}
                  <IconButton onClick={handleClick}>
                    <MoreHoriz />
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
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
