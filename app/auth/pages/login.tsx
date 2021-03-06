import { useRouter, BlitzPage, useMutation, Link, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Suspense, useState } from "react"
import Header from "app/core/components/Header"
import { Footer } from "app/core/components/Footer"
import { Formik } from "formik"
import GoogleButton from "app/core/components/GoogleButton"
import login from "../mutations/login"
import { Button } from "app/core/components/Button"

const LoginPage: BlitzPage = () => {
  const router = useRouter()
  const [loginMutation] = useMutation(login)
  const [showError, setShowError] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback="Loading...">
        <Header />
      </Suspense>
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold my-4">Login to PostReview</h1>

        <div className="flex flex-col items-center bg-slate-200 py-6 px-12">
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
                <label htmlFor="email" className="mt-4">
                  Email
                  <span className="text-orange-400 inline">
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
                  className="px-1"
                />
                <label htmlFor="password" className="mt-4">
                  Password{" "}
                  <span className="text-orange-400">
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
                <div>
                  <Link href={Routes.ForgotPasswordPage()}>
                    <a className="text-gray-700">Forgot your password?</a>
                  </Link>
                </div>
                <Button addstyles="my-4" type="submit" disabled={isSubmitting}>
                  Login
                </Button>
              </form>
            )}
          </Formik>
          <div className="my-2 text-slate-800">
            Don&apos;t have an account?{" "}
            <Link href={Routes.SignupPage()}>
              <a className="text-blue-800">Sign up today</a>
            </Link>
          </div>

          <div className="text-center my-4">Or</div>
          <GoogleButton />
        </div>
      </main>
      <Footer />
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
