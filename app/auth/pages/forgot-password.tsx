import { BlitzPage, Image, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import forgotPassword from "app/auth/mutations/forgotPassword"
import { Suspense, useEffect, useState } from "react"
import Navbar from "app/core/components/Navbar"
import { Footer } from "app/core/components/Footer"
import { Formik } from "formik"
import forgotPictureDarkMode from "public/forgot-picture-darkmode.png"
import forgotPictureLightMode from "public/forgot-picture-lightmode.png"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

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
      <main className="flex-grow flex flex-col items-center justify-start">
        <div className="contrast-100 mt-20 h-60 w-full flex justify-center">
          <Image
            src={isDark ? forgotPictureDarkMode : forgotPictureLightMode}
            alt="A bust image of a person with three question marks on top of their head instead of hair"
            width={180}
            height={180}
          />
        </div>
        <h1 className="text-3xl text-center font-bold my-4 text-gray-darkest dark:text-white">Forgot your password?</h1>
        <h2 className="mb-8 text-md text-center text-gray-darkest dark:text-gray-light">We got your back!</h2>
        <div className="flex flex-col items-center py-6 px-20 bg-gray-light dark:bg-gray-dark">
          {isSuccess ? (
            <div>
              <h2 className="my-4 text-gray-darkest dark:text-white">Request Submitted</h2>
              <p className="my-4 dark:text-white">
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
              }) => (
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <label htmlFor="email" className="mt-4 font-semibold text-gray-darkest dark:text-white">
                    Email
                    <span className="text-xs inline font-normal text-red">
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
                  <div className="my-4 text-center font-semibold text-green rounded-lg bg-gray-medium dark:bg-gray-medium hover:bg-gray-darkest">
                    <button type="submit" className="mx-4 my-4" disabled={isSubmitting}>
                      Send change password instructions
                    </button>
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
