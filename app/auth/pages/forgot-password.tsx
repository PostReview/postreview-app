import { BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import forgotPassword from "app/auth/mutations/forgotPassword"
import { Suspense } from "react"
import Navbar from "app/core/components/Navbar"
import { Footer } from "app/core/components/Footer"
import { Formik } from "formik"
import { Button } from "app/core/components/Button"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback="Loading...">
        <Navbar />
      </Suspense>
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold my-4">Forgot your password?</h1>
        <div className="flex flex-col items-center bg-slate-200 py-6 px-12">
          {isSuccess ? (
            <div>
              <h2 className="text-center my-4 font-bold">Request Submitted</h2>
              <p>
                If your email is in our system, you will receive instructions to reset your password
                shortly.
              </p>
            </div>
          ) : (
            <Formik
              initialValues={{ email: "" }}
              validate={(values) => {
                const errors = {} as any
                if (!values.email) {
                  errors.email = "Required"
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                  errors.email = "Invalid email address"
                }
                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                forgotPasswordMutation(values)
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
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <label htmlFor="email" className="mt-4">
                    Email
                    <span className="text-orange-400 inline">
                      {errors.email && touched.email && " - " + errors.email}
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="px-1"
                  />
                  <div className="my-4">
                    <Button type="submit" disabled={isSubmitting}>
                      Send Reset Password Instructions
                    </Button>
                  </div>
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

ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => <Layout title="Forgot Your Password?">{page}</Layout>

export default ForgotPasswordPage
