import { useRouter, BlitzPage, Image } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useEffect, useRef, useState } from "react"
import Navbar from "app/core/components/Navbar"
import { Field, Form, Formik } from "formik"
import { Button } from "app/core/components/Button"
import detectiveDarkMode from "public/detective-darkmode.png"
import detectiveLightMode from "public/detective-lightmode.png"
import { AvatarIcon } from "app/core/components/AvatarIcon"
import { Widget } from "@uploadcare/react-widget"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const OnboardingPage: BlitzPage = () => {
  // handle darkmode
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDark(mediaQuery.matches)
  }, [])

  // Get session info
  const currentUser = useCurrentUser()
  const router = useRouter()

  // Uploadcare
  const UPLOADCARE_PUBLIC_KEY = process.env.UPLOADCARE_PUBLIC_KEY
  const widgetApi = useRef<any>()

  const GetStarted = () => {
    return (
      <div id="main-container">
        <h1 className="w-64 text-4xl font-bold my-4 text-gray-darkest dark:text-white">
          Thank you for signing up!
        </h1>
        <div id="get-started-container" className="flex flex-row">
          <div className="flex flex-row items-center">
            <button
              className="whitespace-nowrap px-4 py-4 text-xl text-green rounded-lg bg-black/50 hover:bg-gray-darkest dark:bg-gray-medium dark:hover:bg-black/40"
              onClick={undefined}
            >
              Get started
            </button>
          </div>
          <div className="ml-4 contrast-100 mt-6 w-44">
            <Image
              src={isDark ? detectiveDarkMode : detectiveLightMode}
              alt="An image of a detective looking through a magnifying glass with their left eye"
              width={584}
              height={800}
            />
          </div>
        </div>
      </div>
    )
  }

  const EnterName = () => {
    return (
      <div id="enter-name-container" className="pb-20">
        <div id="title-container" className="flex flex-row items-center">
          <div className="ml-4 contrast-100 m-6 w-24">
            <Image
              src={isDark ? detectiveDarkMode : detectiveLightMode}
              alt="An image of a detective looking through a magnifying glass with their left eye"
              width={584}
              height={800}
            />
          </div>
          <h1 className="w-64 text-4xl font-bold my-4 text-gray-darkest dark:text-white">
            How do you want to be addressed?
          </h1>
        </div>
        <Formik
          initialValues={{
            displayName: "",
            pronoun: "",
          }}
          onSubmit={async (values) => {
            // setUserInfo({ id: userInfo.id, icon: icon, ...values })
            // changeUserinfoMutation({ id: userInfo.id, ...values, icon: icon })
            // setOpen(false)
            // Reload the page to reflect the change on the user avatar in the nav bar
            // (TODO: Make the icon change reactive in the nav bar)
            window.location.reload()
          }}
          validate={(values) => {}}
        >
          <Form className="flex flex-col text-xl bg-black text-white px-4">
            <div className="flex flex-row border-b border-gray-dark py-4">
              <label className="w-32">Name</label>
              <Field
                name="displayName"
                type="text"
                className="ml-1 bg-black outline-0 text-green"
              />
            </div>
            <div className="flex flex-row py-4">
              <label htmlFor="pronouns" className="w-32">
                Pronouns
              </label>
              <Field name="pronoun" type="text" className="ml-1 bg-black outline-0 text-green" />
            </div>
          </Form>
        </Formik>
        <div className="text-center">
          <button id="next-button" className="m-9 text-green text-2xl">
            Next &rarr;
          </button>
        </div>
      </div>
    )
  }

  const UploadYourPhoto = () => {
    return (
      <div id="upload-photo-container" className="text-white">
        <div id="title-container" className="flex flex-row items-center ">
          <div className="text-gray-darkest dark:text-white">
            <h1 className="text-4xl font-bold my-4">Upload your photo</h1>
            <div className="mx-auto w-fit">But, only if you want to!</div>
          </div>
          <div className="ml-4 contrast-100 m-6 w-24">
            <Image
              src={isDark ? detectiveDarkMode : detectiveLightMode}
              alt="An image of a detective looking through a magnifying glass with their left eye"
              width={584}
              height={800}
            />
          </div>
        </div>
        <div id="profile-picture" className="flex flex-row mx-4">
          <Button
            id="user-avatar"
            className="focus:outline-none"
            onClick={() => widgetApi?.current?.openDialog()}
          >
            <AvatarIcon currentUser={currentUser} height={"5rem"} width={"5rem"} />
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
                  // setUserInfo({ id: userInfo.id, icon: icon, ...userInfo })
                  // setIcon(info.cdnUrl)
                } catch (err) {
                  alert(err)
                }
              }}
            />
          </div>
          <div className="self-end mx-3 text-white">
            {currentUser?.pronoun && `(${currentUser.pronoun})`}
          </div>
        </div>
        <div className="ml-4 mt-2 text-2xl font-semibold">{currentUser?.displayName}</div>
        <div className="ml-4 text-xl">{`@${currentUser?.handle}`}</div>
        <div id="buttons-container" className="flex flex-col items-center text-2xl pb-28 mt-10">
          <button className="w-min whitespace-nowrap my-4 px-8 py-2 text-green rounded-lg bg-black/50 hover:bg-gray-darkest dark:bg-gray-medium dark:hover:bg-black/40">
            Save
          </button>
          <button className="w-min my-4 text-gray-medium">Skip</button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <Navbar hideSearch={true} />
      <main className="flex-grow flex flex-col items-center mt-36">
        <GetStarted />
        <EnterName />
        <UploadYourPhoto />
      </main>
    </div>
  )
}

OnboardingPage.getLayout = (page) => <Layout title="Welcome | PostReview">{page}</Layout>

export default OnboardingPage
