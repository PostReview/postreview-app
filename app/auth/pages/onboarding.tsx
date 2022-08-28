import { useRouter, BlitzPage, useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useEffect, useState } from "react"
import Navbar from "app/core/components/Navbar"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { GetStarted } from "app/core/components/onboarding/GetStarted"
import { EnterName } from "app/core/components/onboarding/EnterName"
import { UploadYourPhoto } from "app/core/components/onboarding/UploadYourPhoto"

const OnboardingPage: BlitzPage = () => {
  // Redirect when not logged in
  const router = useRouter()
  const session = useSession()
  useEffect(() => {
    if (!session.userId) {
      router.push("/")
    }
  })

  // handle darkmode
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDark(mediaQuery.matches)
  }, [])

  // Get session info
  const defaultCurrentUser = useCurrentUser()
  const [currentUser, setCurrentUser] = useState(defaultCurrentUser)

  // Handle pages
  const [currentPage, setCurrentPage] = useState("get-started")

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <Navbar hideSearch={true} />
      <main className="flex-grow flex flex-col items-center mt-36">
        {currentPage === "get-started" && (
          <GetStarted setCurrentPage={setCurrentPage} isDark={isDark} />
        )}
        {currentPage === "enter-name" && (
          <EnterName
            setCurrentPage={setCurrentPage}
            isDark={isDark}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        )}
        {currentPage === "upload-photo" && (
          <UploadYourPhoto
            isDark={isDark}
            router={router}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        )}
      </main>
    </div>
  )
}

OnboardingPage.getLayout = (page) => <Layout title="Welcome | PostReview">{page}</Layout>

export default OnboardingPage
