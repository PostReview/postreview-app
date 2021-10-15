import { BlitzPage, useParam, useQuery } from "@blitzjs/core"
import { HelpOutlineOutlined } from "@mui/icons-material"
import EditIcon from "@mui/icons-material/Edit"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material"
import Switch from "@mui/material/Switch"
import { Box } from "@mui/system"
import ArticleList from "app/core/components/ArticleList"
import Header from "app/core/components/Header"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getArticles from "app/queries/getArticles"
import getReviewAnswersByUserId from "app/queries/getReviewAnswersByUserId"
import { Suspense, useState } from "react"
import { MyReviewsTable } from "app/core/components/MyReviewsTable"

const Profile = () => {
  const currentUser = useCurrentUser()
  const [reviewAnswers] = useQuery(getReviewAnswersByUserId, currentUser?.id)

  const [isDeactivateAccountDialogOpen, setIsDeactivateAccountDialogOpen] = useState(false)

  const [anonymousChecked, setAnonymousChecked] = useState(false)
  const changeAnonymous = (event) => {
    setAnonymousChecked(event.target.checked)
  }

  const handlePseudonymChange = () => {
    undefined
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
      <main className="p-5">
        <div>
          <h1 className="text-3xl">
            {" "}
            My Info
            <IconButton className="">
              <EditIcon className="" />
            </IconButton>
          </h1>
          <div className="m-6">
            <div>Name: {currentUser?.name} </div>
            <div>Email: {currentUser?.email}</div>
            <div>
              <div>
                {" "}
                Anonymous Mode
                <Tooltip
                  title="Your name will appear with your reviews by default. You can hide your name and set up your pseudonym by turning on Anonymous Mode"
                  placement="top-end"
                >
                  <IconButton>
                    <HelpOutlineOutlined />
                  </IconButton>
                </Tooltip>
                : <Switch checked={anonymousChecked} onChange={changeAnonymous} />
              </div>
            </div>
            <div>
              {anonymousChecked && (
                <TextField
                  id="outlined-basic"
                  label="Pseudonym"
                  variant="outlined"
                  size="small"
                  onChange={handlePseudonymChange}
                />
              )}
            </div>
          </div>
        </div>

        <div className="">
          <h1 className="text-3xl">Reviews You Posted</h1>
          <div className="m-6">
            <MyReviewsTable reviewAnswers={reviewAnswers} />
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
