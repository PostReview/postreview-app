import { AppBar, Button, Dialog, IconButton, Toolbar, Typography } from "@mui/material"
import React, { useRef, useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import changeUserInfo from "app/mutations/changeUserInfo"
import { Field, Formik, Form, FormikValues, ErrorMessage } from "formik"
import { invoke, useMutation } from "blitz"
import getUserInfo from "app/queries/getUserInfo"
import { Widget } from "@uploadcare/react-widget"
import changeAvatar from "app/mutations/changeAvatar"
import { AvatarIcon } from "./AvatarIcon"

export const ProfileEditDialog = (props) => {
  const UPLOADCARE_PUBLIC_KEY = process.env.UPLOADCARE_PUBLIC_KEY
  const { open, setOpen, userInfo, setUserInfo } = props

  const [aboutMe, setAboutMe] = useState(userInfo?.aboutMe)

  const aboutMeCharLimit = 150

  // Formik
  const formRef = useRef<FormikValues>()
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit()
    }
  }

  const defaultUserInfo = setUserInfo

  const handleSave = () => {
    // Update the state value
    handleSubmit()
  }

  const handleCancel = () => {
    // Reset back to default
    setUserInfo(defaultUserInfo)
    setOpen(false)
  }

  const validateAboutMe = (value) => {
    setAboutMe(value)
  }

  const [changeUserinfoMutation] = useMutation(changeUserInfo)

  const widgetApi = useRef<any>()
  const [changeAvatarMutation] = useMutation(changeAvatar)

  // Track the avatar icon URL
  const [icon, setIcon] = useState(userInfo.icon)

  return (
    <Dialog open={open} onClose={() => handleCancel()} sx={{ background: "black" }} fullScreen>
      <AppBar sx={{ position: "relative", background: "black" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Edit profile
          </Typography>
          <Button color="inherit" onClick={() => handleSave()}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <div className="bg-black w-full h-full text-white flex flex-col items-center">
        <div id="cover-container" className="w-full bg-black h-20 flex-shrink-0"></div>
        <div id="user-info-container" className="relative">
          <div id="photo-avatar-container" className="flex flex-row mt-6">
            <div id="profile-picture" className="flex flex-row">
              <Button
                id="user-avatar"
                className="focus:outline-none -mt-16"
                onClick={() => widgetApi?.current?.openDialog()}
              >
                <AvatarIcon currentUser={userInfo} height={"5rem"} width={"5rem"} />
              </Button>
              <div className="hidden">
                <Widget
                  publicKey={UPLOADCARE_PUBLIC_KEY ? UPLOADCARE_PUBLIC_KEY : ""}
                  ref={widgetApi}
                  crop="1:1"
                  imageShrink="480x480"
                  imagesOnly
                  previewStep
                  clearable
                  tabs="file url"
                  onChange={async (info) => {
                    try {
                      setUserInfo({ id: userInfo.id, icon: icon, ...userInfo })
                      setIcon(info.cdnUrl)
                    } catch (err) {
                      alert(err)
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div id="username-handle-card">
            <Formik
              innerRef={formRef as any}
              initialValues={{
                displayName: userInfo?.displayName || "",
                handle: userInfo?.handle,
                pronoun: userInfo?.pronoun || "",
                aboutMe: userInfo?.aboutMe || "",
                website: userInfo?.website || "",
              }}
              onSubmit={async (values) => {
                setUserInfo({ id: userInfo.id, icon: icon, ...values })
                changeUserinfoMutation({ id: userInfo.id, ...values, icon: icon })
                setOpen(false)
                // Reload the page to reflect the change on the user avatar in the nav bar
                // (TODO: Make the icon change reactive in the nav bar)
                window.location.reload()
              }}
              validate={(values) => {
                const existingUser = invoke(getUserInfo, { userHandle: values.handle })
                return existingUser.then((foundUser) => {
                  const errors = {} as any

                  if (!values.handle) {
                    errors.handle = "Required"
                  } else if (/\s/g.test(values.handle)) {
                    errors.handle = "Cannot contain a space"
                  } else if (/[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/.test(values.handle)) {
                    errors.handle = "Cannot use a symbol"
                  } else if (foundUser) {
                    if (values.handle !== userInfo.handle) errors.handle = "Already taken"
                  }
                  if (values.aboutMe.length > aboutMeCharLimit) {
                    errors.aboutMe = `Must be less than ${aboutMeCharLimit} characters`
                  }

                  return errors
                })
              }}
            >
              <Form className="flex flex-col text-xl mt-8">
                <div className="flex flex-row border-b border-gray-medium mb-4 py-2">
                  <label className="w-32">Name</label>
                  <Field
                    name="displayName"
                    type="text"
                    className="ml-1 bg-black outline-0 text-green"
                  />
                </div>
                <div className="relative flex flex-row border-b border-gray-medium mb-4 py-2">
                  <label className="w-32">Handle</label>
                  <span className="inline text-gray-medium">@</span>
                  <Field name="handle" type="text" className="ml-1 bg-black outline-0 text-green" />
                  <ErrorMessage
                    name="handle"
                    component={"div"}
                    className="absolute right-0 -top-3 z-50 text-sm text-red"
                  />
                </div>
                <div className="flex flex-row border-b border-gray-medium mb-4 py-2">
                  <label htmlFor="pronouns" className="w-32">
                    Pronouns
                  </label>
                  <Field
                    name="pronoun"
                    type="text"
                    className="ml-1 bg-black outline-0 text-green"
                  />
                </div>
                <div className="relative flex flex-row border-b border-gray-medium mb-4 py-2">
                  <label htmlFor="pronouns" className="w-32 whitespace-nowrap">
                    About Me
                  </label>
                  <div className="absolute right-0 bottom-0 text-sm text-gray-light">
                    {`${aboutMe?.length ? aboutMe?.length : 0}/${aboutMeCharLimit}`}
                  </div>
                  <Field
                    name="aboutMe"
                    type="text"
                    as="textarea"
                    maxLength={aboutMeCharLimit}
                    className="ml-10 mb-4 h-20 w-full text-sm bg-black outline-0 text-green"
                    validate={validateAboutMe}
                  />
                  <ErrorMessage
                    name="aboutMe"
                    component={"div"}
                    className="absolute right-0 -top-3 z-50 text-sm text-red"
                  />
                </div>
                <div className="flex flex-row border-b border-gray-medium mb-4 py-2">
                  <label htmlFor="pronouns" className="w-32 whitespace-nowrap">
                    Website
                  </label>
                  <Field
                    name="website"
                    type="text"
                    className="ml-10 bg-black outline-0 text-green text-sm w-full"
                  />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
