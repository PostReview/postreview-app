import { BlitzPage, Head, invoke, Link, useMutation, useQuery, useRouter, useSession } from "blitz"
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { Box } from "@mui/system"
import Navbar from "app/core/components/Navbar"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getReviewAnswersByUserId from "app/queries/getReviewAnswersByUserId"
import { Suspense, useEffect, useState } from "react"
import { MyReviewsTable } from "app/core/components/MyReviewsTable"
import { MyReviewsEmptyState } from "app/core/components/MyReviewsEmptyState"
import deleteUser from "app/mutations/deleteUser"
import logout from "app/auth/mutations/logout"
import { Button } from "app/core/components/Button"
import Layout from "app/core/layouts/Layout"
import resendVerification from "app/auth/mutations/resendVerification"
import { ProfileEditDialog } from "app/core/components/ProfileEditDialog"
import { ProfileBgImage } from "app/core/components/ProfileBgImage"
import { ProfileInfo } from "app/core/components/ProfileInfo"
import { SocialMetadata } from "app/core/components/SocialMetadata"

const Profile = () => {
  const router = useRouter()

  // User-related variables
  const currentUser = useCurrentUser()
  const [userInfo, setUserInfo] = useState(currentUser)

  // Article-related variables
  const [defaultMyArticlesWithReview] = useQuery(getReviewAnswersByUserId, {
    currentUserId: currentUser?.id,
    includeAnonymous: true,
  })
  const [myArticlesWithReview, setMyArticlesWithReview] = useState(defaultMyArticlesWithReview)

  // Account-related variables
  const [resendVerificationMutation, { isSuccess }] = useMutation(resendVerification)
  const [verificationSent, setVerificationSent] = useState(false)
  const [logoutMutation] = useMutation(logout)
  const [isDeactivateAccountDialogOpen, setIsDeactivateAccountDialogOpen] = useState(false)
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
    <main className="flex flex-col items-center min-h-screen bg-white dark:bg-black/60 relative text-gray-darkest dark:text-white">
      <div id="verify-email-container" className="absolute self-center">
        {!currentUser?.emailIsVerified && (
          <div className="flex flex-row max-w-sm items-center justify-evenly text-sm rounded-md px-2 mt-3 border-2 border-white-medium text-white">
            {!verificationSent && (
              <span className="mr-1 text-gray-light">Your email is not verified</span>
            )}{" "}
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
      <ProfileBgImage />
      <ProfileInfo
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        open={open}
        setOpen={setOpen}
        showEditButton={true}
      />
      <div id="my-reviews-container" className="mx-4 mt-8 max-w-5xl">
        <h1 className=" mx-2 text-2xl font-semibold text-gray-darkest dark:text-white">Reviews</h1>
        <div className=" text-gray-darkest dark:text-white w-96 sm:w-[40rem]">
          {myArticlesWithReview?.length === 0 && <MyReviewsEmptyState />}
          <MyReviewsTable articleWithReview={myArticlesWithReview} currentUser={currentUser} />
        </div>
      </div>
      <div className="mx-auto flex flex-row">
        <Button
          id="public-view-container"
          className="m-2 font-semibold underline text-md hover:cursor-pointer text-green-dark dark:text-green hover:text-green dark:hover:text-green-dark"
        >
          <Link href={`profiles/${currentUser?.handle}`}>Public profile view</Link>
        </Button>
        <Button
          id="delete-account"
          className="m-2 font-semibold underline hover:cursor-pointer hover:text-gray-darkest text-gray-medium"
          onClick={() => setIsDeactivateAccountDialogOpen(true)}
          color="error"
          data-splitbee-event={"Deactivate opened"}
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
              <Button
                type="cancel"
                onClick={() => setIsDeactivateAccountDialogOpen(false)}
                data-splitbee-event={"Deactivate canceled"}
              >
                Cancel
              </Button>
              <Button
                type="error"
                onClick={handleDeleteUser}
                data-splitbee-event={"Deactivate completed"}
              >
                Deactivate
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
        <ProfileEditDialog
          open={open}
          setOpen={setOpen}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      </div>
    </main>
  )
}

const ProfilePage: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <SocialMetadata />
      </Head>
      <Navbar />
      <Profile />
    </div>
  )
}
ProfilePage.authenticate = true
ProfilePage.getLayout = (page) => <Layout title="Profile | PostReview">{page}</Layout>

export default ProfilePage
