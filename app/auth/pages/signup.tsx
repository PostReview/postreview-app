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

const SignupPage: BlitzPage = () => {
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

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <Suspense fallback="Loading...">
        <Navbar />
      </Suspense>
      <main className="flex-grow flex flex-col items-center justify-center">
        <div id="postReviewLogo" className="h-70 w-full flex justify-center">
          <Image
            src={isDark ? postReviewLogoDarkMode : postReviewLogoLightMode}
            alt="An image of a magnifying glass wearing a fedora hat"
            width={200}
            height={200}
          />
        </div>
        <h1 className="mt-0 text-center text-4xl font-bold my-4 text-gray-darkest dark:text-white">
          Join PostReview
        </h1>
        <div className="flex flex-col items-center py-6 px-10 bg-gray-light dark:bg-gray-dark">
          <Formik
            initialValues={{ email: "", password: "", handle: "" }}
            validate={(values) => {
              const existingUser = invoke(getUserInfo, { userHandle: values.handle })
              return existingUser.then((foundUser) => {
                const errors = {} as any
                if (!values.email) {
                  errors.email = "Required"
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                  errors.email = "Invalid email address"
                }

                if (!values.handle) {
                  errors.handle = "Required"
                } else if (foundUser) {
                  errors.handle = "Not available"
                }

                if (!values.password) {
                  errors.password = "Required"
                } else if (values.password.length < 10) {
                  errors.password = "Password should be 10 or more characters"
                }

                return errors
              })
            }}
            onSubmit={(values, { setSubmitting }) => {
              signupMutation(values).catch(() => setShowError(true))
              setTimeout(() => {
                setSubmitting(false)
              }, 400)
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="flex flex-col">
                {showError && (
                  <div className="bg-red/50 rounded-md text-gray-darkest text-center p-3">
                    This email is already used
                  </div>
                )}
                <label className="mt-4 font-semibold text-gray-darkest dark:text-white">
                  Email
                  <span className="text-xs inline font-normal text-red">
                    {" "}
                    {errors.email && touched.email && " - " + errors.email}
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="p-2 w-80 bg-black text-white focus:outline-green/[.50]"
                />
                <label
                  htmlFor="handle"
                  className="mt-4 font-semibold text-gray-darkest dark:text-white"
                >
                  Handle{" "}
                  <span className="text-xs inline font-normal text-red">
                    {errors.handle && touched.handle && " - " + errors.handle}
                  </span>
                </label>
                <div className="flex">
                  <span className="border-black border font-semibold text-gray-darkest dark:text-white p-2">
                    @
                  </span>
                  <input
                    type="handle"
                    name="handle"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.handle}
                    className="p-2 w-72 bg-black text-white focus:outline-green/[.50]"
                  />
                </div>
                <label
                  htmlFor="password"
                  className="mt-4 font-semibold text-gray-darkest dark:text-white"
                >
                  Password{" "}
                  <div className="text-xs inline font-normal text-red">
                    {errors.password && touched.password && " - " + errors.password}
                  </div>
                </label>
                <div className="relative">
                  <input
                    type={isPasswordHidden ? "password" : "text"}
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="w-80 p-2 bg-black text-white focus:outline-green/[.50]"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordHidden}
                    className="text-white text-2xl absolute inline right-2 top-2"
                  >
                    {isPasswordHidden ? <BsEyeSlash /> : <BsEye />}
                  </button>
                </div>
                <Button addstyles="my-4" type="submit" disabled={isSubmitting}>
                  Sign up
                </Button>
              </form>
            )}
          </Formik>
          <div className="text-gray-darkest dark:text-white text-bold text-center my-4">or</div>
          <GoogleButton type="sign-up" />
          <div className="my-4 text-gray-darkest dark:text-white">
            Already have an account?{" "}
            <Link href={Routes.LoginPage()}>
              <a className="text-sm text-center underline italic text-gray-dark dark:text-white/70">
                Log in
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up | PostReview">{page}</Layout>

export default SignupPage
