import { BlitzPage, invoke, useMutation, useQuery, useRouter } from "blitz"
import EditIcon from "@mui/icons-material/Edit"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import {
  Avatar,
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
import { MyReviewsEmptyState } from "app/core/components/MyReviewsEmptyState"
import { Footer } from "app/core/components/Footer"
import deleteUser from "app/mutations/deleteUser"
import logout from "app/auth/mutations/logout"

const Profile = () => {
  const currentUser = useCurrentUser()
  const [articleWithReview] = useQuery(getReviewAnswersByUserId, { currentUserId: currentUser?.id })
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

  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  const handleDeleteUser = async () => {
    await invoke(deleteUser, currentUser?.id)
    router.push("/")
    await logoutMutation()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div id="user-info-card" className="bg-gray-200 p-4">
          <div className="flex flex-row items-center">
            <div id="user-icon-container" className="m-2">
              <Button id="user-avatar" className="focus:outline-none" onClick={undefined}>
                {currentUser?.icon ? (
                  <Avatar alt={currentUser.handle} src={currentUser.icon!} />
                ) : (
                  <Avatar>{currentUser?.handle?.[0]}</Avatar>
                )}
              </Button>{" "}
            </div>
            <div id="handle-field-container">
              <TextField
                disabled={handleDisabled}
                id="outlined-basic"
                label="Handle"
                variant="filled"
                defaultValue={currentUser?.handle}
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
                defaultValue={currentUser?.displayName}
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
            {articleWithReview.length === 0 && <MyReviewsEmptyState />}
            <MyReviewsTable articleWithReview={articleWithReview} currentUser={currentUser} />
          </div>
        </div>
        <div>
          <div id="public-view-container" className="m-2 text-blue-500 font-semibold">
            <a href="#">Public profile view</a>
          </div>
          <div
            id="delete-account"
            className="m-2 font-semibold hover:cursor-pointer text-red-400"
            onClick={openDeactivateAccountDialog}
          >
            Deactivate your account
          </div>
          <Box>
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
                <Button variant="contained" color="error" onClick={handleDeleteUser}>
                  Deactivate
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </div>
      </main>
      <Footer />
    </div>
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
