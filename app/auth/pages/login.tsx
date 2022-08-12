import { useRouter, BlitzPage, useMutation, Link, Routes, Image } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Suspense, useEffect, useState } from "react"
import Navbar from "app/core/components/Navbar"
import { Footer } from "app/core/components/Footer"
import { Formik } from "formik"
import GoogleButton from "app/core/components/GoogleButton"
import login from "../mutations/login"
import { Button } from "app/core/components/Button"
import detectiveDarkMode from "public/detective-darkmode.png"
import detectiveLightMode from "public/detective-lightmode.png"

const LoginPage: BlitzPage = () => {
  const router = useRouter()
  const [loginMutation] = useMutation(login)
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
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="contrast-100 mt-20 h-60 w-full flex justify-center">
          <Image
            src={isDark ? detectiveDarkMode : detectiveLightMode}
            alt="A bust image of a detective looking through a magnifying glass with their left eye"
            width={180}
            height={180}
          />
        </div>
        <h1 className="text-4xl text-center font-bold my-4 text-gray-darkest dark:text-white">Welcome back!</h1>
        <div className="flex flex-col items-center py-6 px-20 bg-gray-light dark:bg-gray-dark">
          <Formik
            initialValues={{ email: "", password: "", handle: "" }}
            validate={(values) => {
              const errors = {} as any
              if (!values.email) {
                errors.email = "Required"
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = "Invalid email address"
              }
              if (!values.password) {
                errors.password = "Required"
              } else if (values.password.length < 10) {
                errors.password = "Password should be 10 or more characters"
              }
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              loginMutation(values).catch((error) => {
                setShowError(true)
              })
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
              <form onSubmit={handleSubmit} className="flex flex-col w-full">
                {showError && (
                  <div className="bg-red-500 bg-opacity-50 rounded-md text-center p-3">
                    Incorrect email or password
                  </div>
                )}
                <label htmlFor="email" className="mt-4 text-gray-darkest dark:text-white">
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
                  className="px-1 bg-black text-gray-medium focus:outline-green/[.50]"
                />
                <label htmlFor="password" className="mt-4 text-gray-darkest dark:text-white">
                  Password{" "}
                  <span className="text-red">
                    {errors.password && touched.password && " - " + errors.password}
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="px-1 bg-black text-gray-medium focus:outline-green/[.50]"
                />
                <div>
                  <Link href={Routes.ForgotPasswordPage()}>
                    <a className="text-sm underline italic text-gray-dark dark:text-white/70">Forgot your password?</a>
                  </Link>
                </div>
                <Button addstyles="my-4" type="submit" disabled={isSubmitting}>
                  Log in
                </Button>
              </form>
            )}
          </Formik>
          <div className="my-2 text-gray-darkest dark:text-white">
            Don&apos;t have an account?{" "}
            <Link href={Routes.SignupPage()}>
              <a className="text-sm text-center underline italic text-gray-dark dark:text-white/70">Sign up today</a>
            </Link>
          </div>

          <div className="text-gray-darkest dark:text-white text-bold text-center my-4">Or</div>
          <GoogleButton type="log-in" />
        </div>
      </main>
      <Footer />
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
