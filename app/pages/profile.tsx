import { BlitzPage, useQuery } from "@blitzjs/core"
import EditIcon from "@mui/icons-material/Edit"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material"
import { Box } from "@mui/system"
import Header from "app/core/components/Header"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getReviewAnswersByUserId from "app/queries/getReviewAnswersByUserId"
import { Suspense, useState } from "react"
import { MyReviewsTable } from "app/core/components/MyReviewsTable"

const Profile = () => {
  const currentUser = useCurrentUser()
  const [reviewAnswers] = useQuery(getReviewAnswersByUserId, currentUser?.id)
  const [handleDisabled, setHandleDisabled] = useState(true)
  const [isDeactivateAccountDialogOpen, setIsDeactivateAccountDialogOpen] = useState(false)
  const changeHandle = () => {
    if (!handleDisabled) setHandleDisabled(true)
    if (handleDisabled) setHandleDisabled(false)
  }

  const handleHandleChange = (event) => {
    console.log(event.target.value)
  }

  const openDeactivateAccountDialog = () => {
    setIsDeactivateAccountDialogOpen(true)
  }
  const closeDeactivateAccountDialog = () => {
    setIsDeactivateAccountDialogOpen(false)
  }

  return (
    <>
      <Header />
      <main className="">
        <div id="user-info-card" className="bg-gray-100 p-4">
          <div className="flex flex-row items-center">
            <div id="user-icon-container" className="m-2">
              <AccountCircleIcon color="disabled" fontSize="large" />
            </div>
            <div id="handle-field-container">
              <TextField
                disabled={handleDisabled}
                id="outlined-basic"
                label="Handle"
                variant="filled"
                size="small"
                onChange={handleHandleChange}
              />
              <IconButton onClick={changeHandle}>
                <EditIcon></EditIcon>
              </IconButton>
            </div>
            <div id="user-name-container" className="m-2">
              <TextField
                disabled
                id="user-name"
                label="Display Name (optional)"
                variant="filled"
                defaultValue={currentUser?.name}
                size="small"
              />
              <IconButton>
                <EditIcon></EditIcon>
              </IconButton>
            </div>
            <div id="user-email-container" className="m-2">
              <TextField
                disabled
                id="user-email"
                label="Email"
                variant="filled"
                defaultValue={currentUser?.email}
                size="small"
              />
              <IconButton>
                <EditIcon></EditIcon>
              </IconButton>
            </div>
          </div>
        </div>
        <div id="my-reviews-container" className="m-3">
          <h1 className="text-3xl">Reviews You Posted</h1>
          <div className="m-6">
            <MyReviewsTable reviewAnswers={reviewAnswers} currentUser={currentUser} />
          </div>
        </div>
        <div>
          <Box>
            <Button
              variant="text"
              className="m-6 focus:outline-none"
              color="error"
              onClick={openDeactivateAccountDialog}
            >
              Deactivate your account
            </Button>
            <Dialog open={isDeactivateAccountDialogOpen} onClose={closeDeactivateAccountDialog}>
              <DialogTitle id="deactivate-account">{"Deactivating Your Account"}</DialogTitle>
              <DialogContent>
                We&apos;re sorry to see you go! We will delete your information and the review that
                you posted.
              </DialogContent>
              <DialogActions>
                <Button onClick={closeDeactivateAccountDialog} autoFocus>
                  Cancel
                </Button>
                <Button variant="contained" color="error" onClick={closeDeactivateAccountDialog}>
                  Deactivate
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </div>
      </main>
    </>
  )
}

const ProfilePage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <Profile />
    </Suspense>
  )
}

export default ProfilePage
