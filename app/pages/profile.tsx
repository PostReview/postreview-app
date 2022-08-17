import { BlitzPage, Image, invoke, Link, useMutation, useQuery, useRouter, useSession } from "blitz"
import EditIcon from "@mui/icons-material/Edit"
import {
  Avatar,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
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
import { AiFillCheckCircle } from "react-icons/ai"
import { MdError } from "react-icons/md"
import Layout from "app/core/layouts/Layout"
import resendVerification from "app/auth/mutations/resendVerification"
import profilePhotoPlaceHolder from "public/profile-photo-placeholder.png"



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

  // Change color for text field
  const theme = createTheme({

    palette: {
      success: {
        main: '#d9d9d9',
      },
    },
  });

  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <div className="flex-grow items center m-2 mt-2">
        {!currentUser?.emailIsVerified && (
          <div className="flex flex-row m-6 max-w-sm items-center justify-evenly text-sm rounded-md px-8 py-1 border-2 border-gray-medium text-gray-darkest dark:text-white">
            {!verificationSent && <>Your email is not verified.</>}{" "}
            {verificationSent ? (
              <span className="underline text-green-dark">Verification sent! Please check your mailbox.</span>
            ) : (
              <div id="action-container" className=" text-green rounded-md bg-gray-medium dark:bg-gray-medium hover:bg-gray-darkest dark:hover:bg-black/50">
                <button className="m-2"
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
                </button></div>
            )}
          </div>
        )}
        <div id="photo-avatar-container" className="flex flex-row px-8 m-6">
          <div id="profile-picture" className="w-32 hover: cursor-pointer">
            <Image id="profile-photo" src={profilePhotoPlaceHolder} alt="An image of a detective"></Image>
          </div>
          <div id="user-icon-container" className="absolute px-6 py-32">
            <Button id="user-avatar" className="focus:outline-none" onClick={undefined}>
              <Avatar
                alt={myDisplayName ? myDisplayName : myHandle}
                sx={{
                  backgroundColor: "#545454",
                  color: "#94ec01"
                }}
                variant="square"
                src={`https://eu.ui-avatars.com/api/?name=${myDisplayName ? myDisplayName : myHandle}&color=94ec01&background=545454`}
              />
            </Button>
          </div>
          <div id="user-pronouns" className="absolute pl-32 py-32 ml-4">
            <ThemeProvider theme={theme}>
              <TextField
                id="pronouns"
                placeholder="(Pronouns)"
                color="success"
                variant="standard"
                size="small"
              />
            </ThemeProvider>
            <IconButton onClick={handleChangeDisplayName}>
              <EditIcon />
            </IconButton>
          </div>
        </div>
        <div id="user-info-card" className="px-10 py-1">
          <div className="flex flex-col max-w-lg px-4 py-4 bg-gray-medium/70 text-gray-darkest dark:text-white">
            <div id="user-name-container" className="py-2 text-gray-darkest dark:text-white">
              <ThemeProvider theme={theme}>
                <TextField
                  disabled={myDisplayNameDisabled}
                  id="user-name"
                  label="Display Name (optional)"
                  color="success"
                  variant="outlined"
                  defaultValue={myDisplayName}
                  size="small"
                  onChange={(event) => setMyDisplayName(event.target.value)}
                />
              </ThemeProvider>
              <IconButton onClick={handleChangeDisplayName}>
                <EditIcon />
              </IconButton>
            </div>
            <div id="handle-field-container" className="py-2 text-gray-darkest dark:text-white">
              <ThemeProvider theme={theme}>
                <TextField
                  disabled={handleDisabled}
                  id="outlined-basic"
                  label="Handle"
                  color="success"
                  variant="outlined"
                  defaultValue={myHandle}
                  size="small"
                  onChange={(e) => setMyHandle(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">@</InputAdornment>,
                  }}
                />
              </ThemeProvider>
              <IconButton onClick={changeHandle}>
                <EditIcon />
              </IconButton>
            </div>
            <div id="user-email-container" className="flex flex-row items-center py-2 text-gray-darkest dark:text-white">
              <ThemeProvider theme={theme}>
                <TextField
                  disabled
                  id="user-email"
                  label="Email"
                  color="success"
                  variant="filled"
                  defaultValue={currentUser?.email}
                  size="small"
                />
              </ThemeProvider>
              {currentUser?.emailIsVerified ? (
                <div className="has-tooltip relative">
                  <div className="tooltip bg-gray-medium rounded-md -top-8 -left-10 px-2 py-1 text-sm text-gray-darkest dark:text-white">
                    Verified
                  </div>
                  <AiFillCheckCircle className="inline text-xl mx-2 text-green" />
                </div>
              ) : (
                <div className="has-tooltip relative">
                  <div className="tooltip bg-gray-medium text-gray-darkest rounded-md -top-8 -left-4 px-2 py-1">
                    <span className="whitespace-nowrap text-gray-darkest">Not verified</span>
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

        <div id="my-reviews-container" className="m-4 pt-8 flex-grow max-w-4xl">
          <h1 className="text-3xl font-semibold ml-6 text-gray-darkest dark:text-white">Your Reviews</h1>
          <div className=" text-gray-darkest dark:text-white">
            {myArticlesWithReview.length === 0 && <MyReviewsEmptyState />}
            <MyReviewsTable articleWithReview={myArticlesWithReview} currentUser={currentUser} />
          </div>
        </div>
        <div className="m-6">
          <Button id="public-view-container" className="m-2 underline text-md hover:cursor-pointer text-green-dark">
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
