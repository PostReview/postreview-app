import { BlitzPage, useRouterQuery, Link, useMutation, Routes, useRouter, Image } from "blitz"
import Layout from "app/core/layouts/Layout"
import resetPassword from "app/auth/mutations/resetPassword"
import { Formik } from "formik"
import { Suspense, useEffect, useState } from "react"
import Navbar from "app/core/components/Navbar"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import resetPasswordDarkMode from "public/reset-password-darkmode.png"
import resetPasswordLightMode from "public/reset-password-lightmode.png"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)
  const router = useRouter()

  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const togglePasswordHidden = () => {
    setIsPasswordHidden(!isPasswordHidden)
  }
  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true)
  const toggleConfirmationHidden = () => {
    setIsConfirmationHidden(!isConfirmationHidden)
  }

  // handle darkmode
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDark(mediaQuery.matches)
  }, [])

  // Redirect to home when no token is found
  useEffect(() => {
    if (!query.token) router.push("/")
  })

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <Suspense fallback="Loading...">
        <Navbar hideSearch={true} />
      </Suspense>
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="h-40 w-full flex justify-center">
          <Image
            src={isDark ? resetPasswordDarkMode : resetPasswordLightMode}
            alt="An image of a padlock with an encrypted password overlay"
            width={140}
          />
        </div>
        <h1 className=" text-center text-4xl font-bold my-4 text-gray-darkest dark:text-white">
          Change Password
        </h1>
        <div className="flex flex-col items-center py-7 px-10 h-80 bg-gray-light dark:bg-gray-dark text-gray-darkest dark:text-white">
          {isSuccess ? (
            <div>
              <h2>Password changed successfully!</h2>
              <p>
                Go to the <Link href={Routes.Home()}>homepage</Link>
              </p>
            </div>
          ) : (
            <Formik
              initialValues={{
                password: "",
                passwordConfirmation: "",
                token: query.token as string,
              }}
              validate={(values) => {
                const errors = {} as any
                if (!values.password) {
                  errors.password = "Required"
                } else if (values.password.length < 10) {
                  errors.password = "Password should be 10 or more characters"
                }
                if (!values.passwordConfirmation) {
                  errors.passwordConfirmation = "Required"
                } else if (values.passwordConfirmation.length < 10) {
                  errors.passwordConfirmation = "Password should be 10 or more characters"
                } else if (values.password != values.passwordConfirmation) {
                  errors.passwordConfirmation = "Passwords do not match"
                }
                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                resetPasswordMutation(values)
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
                  <label
                    htmlFor="password"
                    className="mt-3 font-semibold text-gray-darkest dark:text-white"
                  >
                    New Password
                  </label>
                  <span className="text-xs font-normal text-red">
                    {errors.password && touched.password && " - " + errors.password}
                  </span>
                  <div id="password-card" className="relative">
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
                      className="text-white text-2xl absolute inline right-5 top-2"
                    >
                      {isPasswordHidden ? <BsEyeSlash /> : <BsEye />}
                    </button>
                  </div>
                  <label
                    htmlFor="passwordConfirmation"
                    className="mt-4 font-semibold text-gray-darkest dark:text-white"
                  >
                    Confirm New Password
                  </label>
                  <span className="text-xs font-normal text-red">
                    {errors.password && touched.password && " - " + errors.password}
                  </span>
                  <div id="conf-card" className="relative">
                    <input
                      type={isConfirmationHidden ? "password" : "text"}
                      name="passwordConfirmation"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.passwordConfirmation}
                      className="w-80 mb-6 p-2 bg-black text-white focus:outline-green/[.50]"
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmationHidden}
                      className="text-white text-2xl absolute inline right-5 top-2"
                    >
                      {isConfirmationHidden ? <BsEyeSlash /> : <BsEye />}
                    </button>
                  </div>
                  <div
                    id="action-container"
                    className="text-center text-green rounded-lg bg-gray-medium dark:bg-gray-medium hover:bg-gray-darkest"
                  >
                    <button className="mx-2 my-2" onClick={() => router.push("signup")}>
                      Change password
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          )}
        </div>
      </main>
    </div>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => (
  <Layout title="Reset Your Password | PostReview">{page}</Layout>
)

export default ResetPasswordPage
