import { useRouter, BlitzPage, useSession, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useEffect, useState } from "react"
import Navbar from "app/core/components/Navbar"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { GetStarted } from "app/core/components/onboarding/GetStarted"
import { EnterName } from "app/core/components/onboarding/EnterName"
import { UploadYourPhoto } from "app/core/components/onboarding/UploadYourPhoto"
import changeUserInfo from "app/mutations/changeUserInfo"

const OnboardingPage: BlitzPage = () => {
  const router = useRouter()

  // handle darkmode
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDark(mediaQuery.matches)
  }, [])

  // Get user info
  const defaultCurrentUser = useCurrentUser()
  const [currentUser, setCurrentUser] = useState(defaultCurrentUser)

  // Handle pages
  const [currentPage, setCurrentPage] = useState("get-started")

  // DB mutation to change user info
  const [changeUserInfoMutation] = useMutation(changeUserInfo)

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black/60">
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
            changeUserInfoMutation={changeUserInfoMutation}
          />
        )}
        {currentPage === "upload-photo" && (
          <UploadYourPhoto
            isDark={isDark}
            router={router}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            changeUserInfoMutation={changeUserInfoMutation}
          />
        )}
      </main>
    </div>
  )
}

OnboardingPage.authenticate = true

OnboardingPage.getLayout = (page) => <Layout title="Welcome | PostReview">{page}</Layout>

export default OnboardingPage
