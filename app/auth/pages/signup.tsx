import { useRouter, BlitzPage, invoke, useMutation, Image, Link, Routes, Head } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useEffect, useState } from "react"
import Navbar from "app/core/components/Navbar"
import { Formik } from "formik"
import GoogleButton from "app/core/components/GoogleButton"
import getUserInfo from "app/queries/getUserInfo"
import signup from "../mutations/signup"
import { Button } from "app/core/components/Button"
import postReviewLogoDarkMode from "public/logo-darkmode.png"
import postReviewLogoLightMode from "public/logo-lightmode.png"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { createTheme, Switch, ThemeProvider } from "@mui/material"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { SocialMetadata } from "app/core/components/SocialMetadata"

const pageTitle = "Sign Up | PostReview"

const SignupPage: BlitzPage = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()

  // Redirect when logged in & already onboarded
  useEffect(() => {
    if (currentUser && !currentUser?.isOnboarded) {
      router.push("/onboarding")
    }
    if (currentUser?.isOnboarded) {
      router.push("/")
    }
  })

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

  // Theme override
  const theme = createTheme({
    palette: {
      success: {
        light: "#ffffff",
        main: "#94ec01",
        dark: "#2e2c2c",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
    },
  })

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <Head>
        <SocialMetadata title={pageTitle} />
      </Head>
      <Navbar hideSearch={true} />
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
            initialValues={{ email: "", password: "", handle: "", terms: false, coc: false }}
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

                if (!values.terms) {
                  errors.terms =
                    "Please read our Terms of Use and Privacy Policy and click to agree"
                }

                if (!values.coc) {
                  errors.coc = "Please read our CoC and click to agree"
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
                  <div className="bg-black/60 rounded-md text-red text-center p-2">
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
                <div className="flex flex-row w-80 items-center">
                  <ThemeProvider theme={theme}>
                    <Switch
                      color="success"
                      name="terms"
                      value={values.terms}
                      onChange={handleChange}
                    ></Switch>
                  </ThemeProvider>
                  <div className="my-4 inline text-gray-darkest dark:text-white">
                    I agree to the{" "}
                    <Link href={Routes.TermsofUsePage()}>
                      <a
                        className="underline italic text-gray-dark dark:text-white/90 hover:text-black"
                        target="_blank"
                      >
                        Terms of Use
                      </a>
                    </Link>{" "}
                    and{" "}
                    <Link href={Routes.PrivacyPolicyPage()}>
                      <a
                        className="underline italic text-gray-dark dark:text-white/90 hover:text-black"
                        target="_blank"
                      >
                        Privacy Policy
                      </a>
                    </Link>
                    <div className="text-xs font-semibold text-red">
                      {errors.terms && touched.terms && " - " + errors.terms}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-80 items-center">
                  <ThemeProvider theme={theme}>
                    <Switch
                      color="success"
                      name="coc"
                      value={values.coc}
                      onChange={handleChange}
                    ></Switch>
                  </ThemeProvider>
                  <div className="my-4 inline text-gray-darkest dark:text-white">
                    I agree to the{" "}
                    <Link href={Routes.CodeOfConductPage()}>
                      <a
                        className="underline italic text-gray-dark dark:text-white/90 hover:text-black"
                        target="_blank"
                      >
                        Code of Conduct
                      </a>
                    </Link>
                    <div className="text-xs font-semibold text-red">
                      {errors.coc && touched.coc && " - " + errors.coc}
                    </div>
                  </div>
                </div>
                <Button
                  addstyles="my-4"
                  type="submit"
                  disabled={isSubmitting}
                  data-splitbee-event="Sign up"
                >
                  Sign up
                </Button>
              </form>
            )}
          </Formik>
          <div className="text-gray-darkest dark:text-white text-bold text-center my-4">or</div>
          <GoogleButton type="sign-up" data-splitbee-event="Sign up" />
          <div className="my-4 text-gray-darkest dark:text-white">
            Already have an account?{" "}
            <Link href={Routes.LoginPage()}>
              <a className="text-sm text-center underline italic text-gray-dark dark:text-white/90 hover:text-gray-darkest">
                Log in
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

SignupPage.getLayout = (page) => <Layout title="Sign Up | PostReview">{page}</Layout>

export default SignupPage
