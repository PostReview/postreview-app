import { useRouter, BlitzPage, invoke, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Suspense } from "react"
import Header from "app/core/components/Header"
import { Footer } from "app/core/components/Footer"
import { Formik } from "formik"
import GoogleButton from "app/core/components/GoogleButton"
import getUserInfo from "app/queries/getUserInfo"
import signup from "../mutations/signup"
import { Button } from "app/core/components/Button"

const SignupPage: BlitzPage = () => {
  const router = useRouter()
  const [signupMutation] = useMutation(signup)
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback="Loading...">
        <Header />
      </Suspense>
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold my-4">Create an Account</h1>
        <div className="flex flex-col items-center bg-slate-200 py-6 px-12">
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
              signupMutation(values)
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
                <label className="mt-4">
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
                  className="pl-1"
                />
                <label htmlFor="handle" className="mt-4">
                  Handle{" "}
                  <span className="text-orange-400">
                    {errors.handle && touched.handle && " - " + errors.handle}
                  </span>
                </label>
                <div className="flex">
                  <span className="bg-slate-300 border-gray-300 border text-slate-800 rounded-l-md px-2">
                    @
                  </span>
                  <input
                    className="rounded-r-md px-1"
                    type="handle"
                    name="handle"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.handle}
                  />
                </div>
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
                <label htmlFor="passwordVerify" className="mt-4">
                  Verify Password{" "}
                  <span className="text-orange-400">
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
                  className="px-1"
                />
                <Button addstyles="my-4" type="submit" disabled={isSubmitting}>
                  Sign Up
                </Button>
              </form>
            )}
          </Formik>
          <div className="text-center my-4">Or</div>
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
