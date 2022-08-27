import { BlitzPage, Router, useMutation, useParam, useRouterQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Suspense, useEffect, useState } from "react"
import Navbar from "app/core/components/Navbar"
import verifyEmail from "app/auth/mutations/verifyEmail"

const VerifyEmailPage: BlitzPage = () => {
  const code = useParam("code", "string")
  const [verifyEmailMutation] = useMutation(verifyEmail)
  const [error, setError] = useState(false)
  const userId = useRouterQuery().userId

  useEffect(() => {
    if (!code) {
      return
    }

    Router.prefetch("profile")

    verifyEmailMutation({ code, userId }).then((success) => {
      if (success) {
        Router.replace("/profile")
      } else {
        setError(true)
      }
    })
  }, [code, userId, setError, verifyEmailMutation])

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold my-4 text-gray-darkest dark:text-white">
          Verifying email...
        </h1>

        {error && (
          <div className="flex flex-col items-center bg-gray-medium py-6 px-12 text-gray-darkest dark:text-white">
            An error happened
          </div>
        )}
      </main>
    </div>
  )
}

VerifyEmailPage.getLayout = (page) => <Layout title="Verify Email">{page}</Layout>

export default VerifyEmailPage
