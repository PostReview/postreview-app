import { BlitzPage, useRouterQuery, Link, useMutation, Routes, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import resetPassword from "app/auth/mutations/resetPassword"
import { Footer } from "app/core/components/Footer"
import { Formik } from "formik"
import { Button } from "app/core/components/Button"
import { Suspense, useEffect } from "react"
import Header from "app/core/components/Header"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)
  const router = useRouter()

  // Redirect to home when no token is found
  useEffect(() => {
    if (!query.token) router.push("/")
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback="Loading...">
        <Header />
      </Suspense>

      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold my-4">Set a New Password</h1>

        <div className="flex flex-col items-center bg-slate-200 py-6 px-12">
          {isSuccess ? (
            <div>
              <h2>Password Reset Successfully</h2>
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
                  <label htmlFor="password" className="mt-4">
                    New Password
                    <span className="text-orange-400 inline">
                      {errors.password && touched.password && " - " + errors.password}
                    </span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="px-1"
                  />
                  <label htmlFor="passwordConfirmation" className="mt-4">
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
                    className="px-1"
                  />
                  <Button addstyles="my-4" type="submit" disabled={isSubmitting}>
                    Reset Password
                  </Button>
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
