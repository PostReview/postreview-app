import { useRouter, BlitzPage, invoke, useMutation, Image } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Suspense, useEffect, useState } from "react"
import Navbar from "app/core/components/Navbar"
import { Footer } from "app/core/components/Footer"
import { Formik } from "formik"
import GoogleButton from "app/core/components/GoogleButton"
import getUserInfo from "app/queries/getUserInfo"
import signup from "../mutations/signup"
import { Button } from "app/core/components/Button"
import postReviewLogoDarkMode from "public/logo-darkmode.png"
import postReviewLogoLightMode from "public/logo-lightmode.png"

const SignupPage: BlitzPage = () => {
  const router = useRouter()
  const [signupMutation] = useMutation(signup)
  const [showError, setShowError] = useState(false)

  // handle darkmode
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <Suspense fallback="Loading...">
        <Navbar />
      </Suspense>
      <div className="h-70 w-full flex justify-center">
        <Image
          src={isDark ? postReviewLogoDarkMode : postReviewLogoLightMode}
          alt="An image of a magnifying glass wearing a fedora hat"
          width={200}
          height={200}
        />
      </div>
      <h1 className="mt-0 text-center text-4xl font-bold my-4 text-gray-darkest dark:text-white">Join PostReview</h1>
      <main className="mb-16 sm:mb-80 sm:mx-40 flex-grow flex flex-col items-center justify-center bg-gray-light dark:bg-gray-dark">
        <div className="flex flex-col items-center py-6 px-2">
          <Formik
            initialValues={{ email: "", password: "", passwordVerify: "", handle: "" }}
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
                  <div className="bg-red bg-opacity-50 rounded-md text-gray-darkest text-center p-3">
                    This email is already used
                  </div>
                )}
                <label className="mt-4 text-gray-darkest dark:text-white">
                  Email
                  <span className="text-red inline">
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
                  className="pl-1 bg-black text-gray-medium focus:outline-green/[.50]"
                />
                <label htmlFor="handle" className="mt-4 text-gray-darkest dark:text-white">
                  Handle{" "}
                  <span className="text-red inline">
                    {errors.handle && touched.handle && " - " + errors.handle}
                  </span>
                </label>
                <div className="flex">
                  <span className="border-black border text-gray-darkest dark:text-white px-2">
                    @
                  </span>
                  <input
                    className="px-1 bg-black text-gray-medium focus:outline-green/[.50]"
                    type="handle"
                    name="handle"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.handle}
                  />
                </div>
                <label htmlFor="password" className="mt-4 text-gray-darkest dark:text-white">
                  Password{" "}
                  <span className="text-red inline">
                    {errors.password && touched.password && " - " + errors.password}
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="bg-black px-1 text-gray-medium focus:outline-green/[.50]"
                />
                <label htmlFor="passwordVerify" className="mt-4 text-gray-darkest dark:text-white">
                  Verify Password{" "}
                  <span className="text-red inline">
                    {errors.passwordVerify &&
                      touched.passwordVerify &&
                      " - " + errors.passwordVerify}
                  </span>
                </label>
                <input
                  type="password"
                  name="passwordVerify"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwordVerify}
                  className="bg-black px-1 text-gray-medium focus:outline-green/[.50]"
                />
                <Button addstyles="my-4" type="submit" disabled={isSubmitting}>
                  SIGN UP
                </Button>
              </form>
            )}
          </Formik>
          <div className="text-gray-darkest dark:text-white text-bold text-center my-4">Or</div>
          <GoogleButton />
        </div>
      </main>
      <Footer />
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
