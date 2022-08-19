import React, { Suspense } from "react"
import { useRouter, useSession, BlitzPage, noSSR } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

// Components
import Navbar from "../core/components/Navbar"
import { Footer } from "app/core/components/Footer"
import { Hero } from "app/core/components/Hero"
import { HowItWorks } from "app/core/components/HowItWorks"
import ArticleList from "app/core/components/ArticleList"
import { Features } from "app/core/components/Features"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  // Redirect
  const router = useRouter()
  const session = useSession()

  if (currentUser) {
    return (
      <div className="w-full bg-black items-center">
        <div id="header-category container" className="flex flex-col items-center">
          <div id="reviews-header" className="mt-10 mb-2 items-center font-semibold text-5xl text-gray-darkest/80">
            All Reviews
          </div>
          <div id="overall-reviews" className="items-center text-4xl font-bold text-white hover:cursor-pointer">
            Overall
          </div>
          <ArticleList />
        </div>
      </div>
    )
  } else {
    return (
      <>
        <Hero />
        <HowItWorks />
        <Features />
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white mx-2 p-2 px-3 border rounded-md my-12"
          onClick={() => router.push("browse")}
        >
          Start Browsing
        </button>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback="Loading...">
        <Navbar />
      </Suspense>
      <main className="flex-grow flex flex-col items-center mb-4">
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="PostReview">{page}</Layout>

export default Home
