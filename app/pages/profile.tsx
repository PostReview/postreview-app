import { BlitzPage, invoke, Link, useMutation, useQuery, useRouter, useSession } from "blitz"
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
import { Suspense, useEffect, useState } from "react"
import { MyReviewsTable } from "app/core/components/MyReviewsTable"
import { MyReviewsEmptyState } from "app/core/components/MyReviewsEmptyState"
import { Footer } from "app/core/components/Footer"
import deleteUser from "app/mutations/deleteUser"
import logout from "app/auth/mutations/logout"
import changeUserHandle from "app/mutations/changeUserHandle"
import changeDisplayName from "app/mutations/changeDisplayName"
import { Button } from "app/core/components/Button"
import { AiFillCheckCircle } from "react-icons/ai"
import { MdError } from "react-icons/md"
import Layout from "app/core/layouts/Layout"
import resendVerification from "app/auth/mutations/resendVerification"

const Profile = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()

  const [defaultMyArticlesWithReview] = useQuery(getReviewAnswersByUserId, {
    currentUserId: currentUser?.id,
    includeAnonymous: true,
  })
  const [myHandle, setMyHandle] = useState(currentUser?.handle)
  const [publicProfileLink, setPublicProfileLink] = useState(`profiles/${currentUser?.handle}`)
  const [myDisplayName, setMyDisplayName] = useState(currentUser?.displayName)

  const [myArticlesWithReview, setMyArticlesWithReview] = useState(defaultMyArticlesWithReview)
  const [handleDisabled, setHandleDisabled] = useState(true)
  const [myDisplayNameDisabled, setMyDisplayNameDisabled] = useState(true)

  const [isDeactivateAccountDialogOpen, setIsDeactivateAccountDialogOpen] = useState(false)
  const [resendVerificationMutation, { isSuccess }] = useMutation(resendVerification)
  const [verificationSent, setVerificationSent] = useState(false)

  const changeHandle = () => {
    if (!handleDisabled) {
      invoke(changeUserHandle, { id: currentUser?.id, handle: myHandle })
      setPublicProfileLink(`profiles/${myHandle}`)
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

  const [logoutMutation] = useMutation(logout)
  const handleDeleteUser = async () => {
    await invoke(deleteUser, currentUser?.id)
    await logoutMutation()
    router.push("/")
  }

  // Redirect when not logged in
  const session = useSession()
  useEffect(() => {
    if (!session.userId) {
      router.push("/")
    }
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div id="user-info-card" className="bg-gray-200 p-4">
          <div className="flex flex-row items-center">
            <div id="user-icon-container" className="m-2">
              <Button id="user-avatar" className="focus:outline-none" onClick={undefined}>
                <Avatar
                  alt={myDisplayName ? myDisplayName : myHandle}
                  src={`https://eu.ui-avatars.com/api/?name=${
                    currentUser?.displayName ? currentUser?.displayName : currentUser?.handle
                  }`}
                />
              </Button>
            </div>
            <div id="handle-field-container">
              <TextField
                disabled={handleDisabled}
                id="outlined-basic"
                label="Handle"
                variant="filled"
                defaultValue={myHandle}
                size="small"
                onChange={(e) => setMyHandle(e.target.value)}
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
            <div id="user-email-container" className="m-2 flex flex-row items-center">
              <TextField
                disabled
                id="user-email"
                label="Email"
                variant="filled"
                defaultValue={currentUser?.email}
                size="small"
              />
              {currentUser?.emailIsVerified ? (
                <div className="has-tooltip relative">
                  <div className="tooltip bg-slate-300 rounded-md text-gray-700 -top-8 -left-4 px-2 py-1">
                    Verified
                  </div>
                  <AiFillCheckCircle className="inline text-2xl mx-2 text-green-400" />
                </div>
              ) : (
                <div className="has-tooltip relative">
                  <div className="tooltip bg-slate-300 rounded-md text-gray-700 -top-8 -left-4 px-2 py-1">
                    <span className="whitespace-nowrap">Not verified</span>
                  </div>
                  <MdError className="inline text-2xl mx-2 text-red-400" />
                </div>
              )}
              {/* Commenting out the email change function for now */}
              {/* <IconButton>
                <EditIcon />
              </IconButton> */}
            </div>
          </div>
        </div>
        {!currentUser?.emailIsVerified && (
          <div className="text-orange-800 max-w-3xl text-sm border-2 border-orange-400 rounded-md px-2 py-1 m-3 bg-orange-300">
            Your email is not verified.{" "}
            {verificationSent ? (
              <span className="underline">Verification sent! Please check your mailbox.</span>
            ) : (
              <Button
                onClick={({}) =>
                  resendVerificationMutation()
                    .then(() => {
                      setVerificationSent(true)
                    })
                    .catch((error) => {
                      alert(error)
                    })
                }
              >
                Resend verification
              </Button>
            )}
          </div>
        )}

        <div id="my-reviews-container" className="m-3">
          <h1 className="text-3xl">Reviews You Posted</h1>
          <div className="m-6">
            {myArticlesWithReview.length === 0 && <MyReviewsEmptyState />}
            <MyReviewsTable articleWithReview={myArticlesWithReview} currentUser={currentUser} />
          </div>
        </div>
        <div className="m-6">
          <Button id="public-view-container" className="m-2 text-blue-500 font-semibold">
            <Link href={publicProfileLink}>Public profile view</Link>
          </Button>
          <Button
            id="delete-account"
            className="m-2 font-semibold hover:cursor-pointer text-red-400"
            onClick={() => setIsDeactivateAccountDialogOpen(true)}
            color="error"
          >
            Deactivate your account
          </Button>
          <Box>
            <Dialog
              open={isDeactivateAccountDialogOpen}
              onClose={() => setIsDeactivateAccountDialogOpen(false)}
            >
              <DialogTitle id="deactivate-account">{"Deactivating Your Account"}</DialogTitle>
              <DialogContent>
                We&apos;re sorry to see you go! We will delete your information and the review that
                you posted.
              </DialogContent>
              <DialogActions>
                <Button type="cancel" onClick={() => setIsDeactivateAccountDialogOpen(false)}>
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
ProfilePage.authenticate = true
ProfilePage.getLayout = (page) => <Layout title="Profile">{page}</Layout>

export default ProfilePage
