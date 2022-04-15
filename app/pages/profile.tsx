import { BlitzPage, invoke, useMutation, useQuery, useRouter } from "blitz"
import EditIcon from "@mui/icons-material/Edit"
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
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
import changeUserHandle from "app/mutations/changeUserHandle"
import changeDisplayName from "app/mutations/changeDisplayName"
import { Button } from "app/core/components/Button"

const Profile = () => {
  const currentUser = useCurrentUser()
  const [defaultMyArticlesWithReview] = useQuery(getReviewAnswersByUserId, {
    currentUserId: currentUser?.id,
    includeAnonymous: true,
  })
  const [myHandle, setMyHandle] = useState(currentUser?.handle)
  const [myDisplayName, setMyDisplayName] = useState(currentUser?.displayName)

  const [myArticlesWithReview, setMyArticlesWithReview] = useState(defaultMyArticlesWithReview)
  const [handleDisabled, setHandleDisabled] = useState(true)
  const [myDisplayNameDisabled, setMyDisplayNameDisabled] = useState(true)

  const [isDeactivateAccountDialogOpen, setIsDeactivateAccountDialogOpen] = useState(false)
  const changeHandle = () => {
    if (!handleDisabled) {
      invoke(changeUserHandle, { id: currentUser?.id, handle: myHandle })
      setHandleDisabled(true)
    }
    if (handleDisabled) setHandleDisabled(false)
  }

  const handleChangeDisplayName = () => {
    if (!myDisplayNameDisabled) {
      invoke(changeDisplayName, { id: currentUser?.id, displayName: myDisplayName })
      setMyDisplayNameDisabled(true)
    }
    if (myDisplayNameDisabled) setMyDisplayNameDisabled(false)
  }

  const handleHandleChange = (event) => {
    setMyHandle(event.target.value)
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
    await logoutMutation()
    router.push("/")
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
                defaultValue={myHandle}
                size="small"
                onChange={handleHandleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">@</InputAdornment>,
                }}
              />
              <IconButton onClick={changeHandle}>
                <EditIcon />
              </IconButton>
            </div>
            <div id="user-name-container" className="m-2">
              <TextField
                disabled={myDisplayNameDisabled}
                id="user-name"
                label="Display Name (optional)"
                variant="filled"
                defaultValue={myDisplayName}
                size="small"
                onChange={(event) => setMyDisplayName(event.target.value)}
              />
              <IconButton onClick={handleChangeDisplayName}>
                <EditIcon />
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
              {/* Commenting out the email change function for now */}
              {/* <IconButton>
                <EditIcon />
              </IconButton> */}
            </div>
          </div>
        </div>
        <div id="my-reviews-container" className="m-3">
          <h1 className="text-3xl">Reviews You Posted</h1>
          <div className="m-6">
            {myArticlesWithReview.length === 0 && <MyReviewsEmptyState />}
            <MyReviewsTable articleWithReview={myArticlesWithReview} currentUser={currentUser} />
          </div>
        </div>
        <div className="m-6">
          <Button id="public-view-container" className="m-2 text-blue-500 font-semibold">
            <a href={`profiles/${currentUser?.id}`}>Public profile view</a>
          </Button>
          <Button
            id="delete-account"
            className="m-2 font-semibold hover:cursor-pointer text-red-400"
            onClick={openDeactivateAccountDialog}
            color="error"
          >
            Deactivate your account
          </Button>
          <Box>
            <Dialog open={isDeactivateAccountDialogOpen} onClose={closeDeactivateAccountDialog}>
              <DialogTitle id="deactivate-account">{"Deactivating Your Account"}</DialogTitle>
              <DialogContent>
                We&apos;re sorry to see you go! We will delete your information and the review that
                you posted.
              </DialogContent>
              <DialogActions>
                <Button type="cancel" onClick={closeDeactivateAccountDialog}>
                  Cancel
                </Button>
                <Button type="error" onClick={handleDeleteUser}>
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
