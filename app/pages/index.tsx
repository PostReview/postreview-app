import React, { Suspense } from "react"
import { Image, useRouter, useSession, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"

// Components
import GoogleButton from "../core/components/GoogleButton"
import Header from "../core/components/Header"
import EnterDOI from "../core/components/EnterDOI"
import { Footer } from "app/core/components/Footer"

const LOCAL_STORAGE_KEY = "doiResolver"

// useEffect to update the local stroage
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  // Redirect
  const router = useRouter()
  const session = useSession()

  if (currentUser) {
    return (
      <>
        <EnterDOI />
      </>
    )
  } else {
    return (
      <>
        <GoogleButton />
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback="Loading..." >
        <Header />
      </Suspense>
      <main
        className="flex-grow"
      >
        <div id="hero" className="flex flex-col items-center">
          <div id="logo">
            <Image src={logo} alt="PostReview" />
          </div>
          <div className="mb-6">Rotten Tomatoes (TM) for Scientific Articles</div>
          <div className="mx-2">
            <Suspense fallback="Loading...">
              <UserInfo />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// Default <Values></Values>
const defaultArticles = []

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
