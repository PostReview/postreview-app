import { BlitzPage, invoke, Link, useMutation, useQuery, useRouter, useSession } from "blitz"
import EditIcon from "@mui/icons-material/Edit"
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material"
import { Box } from "@mui/system"
import Navbar from "app/core/components/Navbar"
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
import Layout from "app/core/layouts/Layout"
import resendVerification from "app/auth/mutations/resendVerification"
import { FaLink } from "react-icons/fa"

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

  // Track the modal for editing the profile
  const [open, setOpen] = useState(false)

  return (
    <main className="flex flex-col items-center min-h-screen bg-white dark:bg-gray-darkest relative text-gray-darkest dark:text-white">
      <div id="verify-email-container" className="absolute self-center">
        {!currentUser?.emailIsVerified && (
          <div className="flex flex-row max-w-sm items-center justify-evenly text-sm rounded-md px-2 mt-3 border-2 border-white-medium text-gray-darkest dark:text-white">
            {!verificationSent && <span className="mr-1">Your email is not verified</span>}{" "}
            {verificationSent ? (
              <span className="underline text-green-dark">
                Verification sent! Please check your mailbox.
              </span>
            ) : (
              <button
                className=" text-green rounded-md px-2 py-1 my-3 bg-gray-medium dark:bg-gray-medium hover:bg-gray-darkest dark:hover:bg-black/50"
                onClick={() =>
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
              </button>
            )}
          </div>
        )}
      </div>
      <div id="user-bg-image" className="bg-black h-40 flex-shrink-0 w-full"></div>
      <div id="user-info-container" className="relative mx-10 max-w-4xl">
        <div className="absolute right-0 top-2">
          <IconButton onClick={() => setOpen(!open)}>
            <EditIcon className="text-4xl text-gray-dark dark:text-gray-medium" />
          </IconButton>
        </div>
        <div id="photo-avatar-container" className="flex flex-row mt-6">
          <div id="profile-picture" className="flex flex-row">
            <Button id="user-avatar" className="focus:outline-none -mt-16" onClick={undefined}>
              <Avatar
                alt={myDisplayName ? myDisplayName : myHandle}
                sx={{
                  backgroundColor: "#545454",
                  color: "#94ec01",
                  height: "5rem",
                  width: "5rem",
                }}
                variant="square"
                src={`https://eu.ui-avatars.com/api/?name=${
                  myDisplayName ? myDisplayName : myHandle
                }&color=94ec01&background=545454`}
              />
            </Button>
            <div id="user-pronouns" className="relative">
              <span className="absolute bottom-0 ml-4"> {`(${currentUser?.pronoun})`}</span>
            </div>
          </div>
        </div>
        <div id="username-handle-card">
          <div className="flex flex-col max-w-lg my-2">
            <span id="display-name-container" className="text-2xl">
              {myDisplayName}
            </span>
            <div id="handle-container">
              <span>{`@${myHandle}`}</span>
            </div>
          </div>
        </div>
        <div id="about-me-card" className="mt-6">
          {currentUser?.aboutMe}
        </div>
        {currentUser?.website && (
          <div id="website" className="mt-6">
            <span className="text-xs text-green-dark">
              <FaLink className="inline mr-1" />
              <Link href={encodeURI(currentUser?.website)}>
                <a target={"_blank"} className="">
                  {encodeURI(currentUser?.website)}
                </a>
              </Link>
            </span>
          </div>
        )}
      </div>
      <div id="my-reviews-container" className="m-4 mt-8 max-w-4xl">
        <h1 className="text-2xl font-semibold text-gray-darkest dark:text-white">Your Reviews</h1>
        <div className=" text-gray-darkest dark:text-white">
          {myArticlesWithReview.length === 0 && <MyReviewsEmptyState />}
          <MyReviewsTable articleWithReview={myArticlesWithReview} currentUser={currentUser} />
        </div>
      </div>
      <div className="mx-auto flex flex-row">
        <Button
          id="public-view-container"
          className="m-2 underline text-md hover:cursor-pointer text-green-dark"
        >
          <Link href={publicProfileLink}>Public profile view</Link>
        </Button>
        <Button
          id="delete-account"
          className="m-2 underline hover:cursor-pointer text-gray-medium"
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
  )
}

const ProfilePage: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback="Loading...">
        <Navbar />
        <Profile />
      </Suspense>
      <Footer />
    </div>
  )
}
ProfilePage.authenticate = true
ProfilePage.getLayout = (page) => <Layout title="Profile | PostReview">{page}</Layout>

export default ProfilePage
