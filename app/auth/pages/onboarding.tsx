import { useRouter, BlitzPage, invoke, useMutation, Image, Link, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Suspense, useEffect, useState } from "react"
import Navbar from "app/core/components/Navbar"
import { Formik } from "formik"
import GoogleButton from "app/core/components/GoogleButton"
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

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <Navbar hideSearch={true} />
      <main className="flex-grow flex flex-col items-center mt-36">
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
      </main>
    </div>
  )
}

OnboardingPage.getLayout = (page) => <Layout title="Welcome | PostReview">{page}</Layout>

export default OnboardingPage
