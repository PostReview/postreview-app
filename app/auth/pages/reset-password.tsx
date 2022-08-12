import { BlitzPage, useRouterQuery, Link, useMutation, Routes, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import resetPassword from "app/auth/mutations/resetPassword"
import { Footer } from "app/core/components/Footer"
import { Formik } from "formik"
import { Button } from "app/core/components/Button"
import { Suspense, useEffect } from "react"
import Navbar from "app/core/components/Navbar"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)
  const router = useRouter()

  // Redirect to home when no token is found
  useEffect(() => {
    if (!query.token) router.push("/")
  })

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <Suspense fallback="Loading...">
        <Navbar />
      </Suspense>
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="mt-40 text-center text-4xl font-bold my-4 text-gray-darkest dark:text-white">Change Password</h1>
        <div className="flex flex-col items-center py-6 px-20 bg-gray-light dark:bg-gray-dark text-gray-darkest dark:text-white">
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
                  <label htmlFor="password" className="mt-4 text-gray-darkest dark:text-white">
                    New Password
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
                    className="p-2 bg-black text-white focus:outline-green/[.50]"
                  />
                  <label htmlFor="passwordConfirmation" className="mt-4 text-gray-darkest dark:text-white">
                    Confirm New Password
                    <span className="text-orange-400 inline">
                      {errors.password && touched.password && " - " + errors.password}
                    </span>
                  </label>
                  <input
                    type="password"
                    name="passwordConfirmation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordConfirmation}
                    className="mb-6 p-2 bg-black text-white focus:outline-green/[.50]"
                  />
                  <div id="action-container" className="text-xl text-green rounded-lg bg-gray-medium dark:bg-gray-medium hover:bg-gray-darkest">
                    <button className="mx-2 my-2" onClick={() => router.push("signup")}>
                      Change password
                    </button></div>
                </form>
              )}
            </Formik>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>

export default ResetPasswordPage
