import { BlitzPage, Router, useMutation, useParam, useRouterQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Suspense, useEffect, useState } from "react"
import Navbar from "app/core/components/Navbar"
import { Footer } from "app/core/components/Footer"
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
    <div className="flex flex-col min-h-screen">
      <Suspense fallback="Loading...">
        <Navbar />
      </Suspense>
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold my-4">Verifying email...</h1>

        {error && (
          <div className="flex flex-col items-center bg-slate-200 py-6 px-12">
            An error happened
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

VerifyEmailPage.getLayout = (page) => <Layout title="Verify Email">{page}</Layout>

export default VerifyEmailPage
