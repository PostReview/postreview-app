import { useRouter, BlitzPage, invoke, useMutation, Image, Link, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Suspense, useEffect, useState } from "react"
import Navbar from "app/core/components/Navbar"
import { ErrorMessage, Field, Form, Formik } from "formik"
import getUserInfo from "app/queries/getUserInfo"
import signup from "../mutations/signup"
import { Button } from "app/core/components/Button"
import postReviewLogoDarkMode from "public/logo-darkmode.png"
import postReviewLogoLightMode from "public/logo-lightmode.png"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { createTheme, Switch, ThemeProvider } from "@mui/material"
import detectiveDarkMode from "public/detective-darkmode.png"
import detectiveLightMode from "public/detective-lightmode.png"

const OnboardingPage: BlitzPage = () => {
  const router = useRouter()
  const [signupMutation] = useMutation(signup)
  const [showError, setShowError] = useState(false)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const togglePasswordHidden = () => {
    setIsPasswordHidden(!isPasswordHidden)
  }

  // handle darkmode
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDark(mediaQuery.matches)
  }, [])

  // Theme override
  const theme = createTheme({
    palette: {
      success: {
        light: "#ffffff",
        main: "#94ec01",
        dark: "#2e2c2c",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
    },
  })

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

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <Navbar hideSearch={true} />
      <main className="flex-grow flex flex-col items-center mt-36">
        <GetStarted />
        <EnterName />
      </main>
    </div>
  )
}

OnboardingPage.getLayout = (page) => <Layout title="Welcome | PostReview">{page}</Layout>

export default OnboardingPage
