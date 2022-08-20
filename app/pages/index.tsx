import React, { Suspense } from "react"
import { useRouter, useSession, BlitzPage, noSSR } from "blitz"
import Layout from "app/core/layouts/Layout"

// Components
import Navbar from "../core/components/Navbar"
import { Footer } from "app/core/components/Footer"
import { Hero } from "app/core/components/Hero"
import { HowItWorks } from "app/core/components/HowItWorks"
import ArticleList from "app/core/components/ArticleList"

const UserInfo = () => {
  const router = useRouter()
  const session = useSession()

  if (session.userId) {
    return (
      <div className="w-full bg-black items-center">
        <div id="header-category container" className="flex flex-col items-center">
          <div
            id="reviews-header"
            className="mt-10 mb-2 items-center font-semibold text-5xl text-gray-medium"
          >
            All Reviews
          </div>
          <div
            id="overall-reviews"
            className="items-center text-4xl font-bold text-white hover:cursor-pointer"
          >
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
        <button
          className="mb-12 px-4 py-4 text-xl text-green rounded-lg bg-black/50 hover:bg-gray-darkest dark:bg-gray-medium dark:hover:bg-black/40"
          onClick={() => router.push("signup")}
        >
          Sign up now
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
      <main className="flex-grow flex flex-col items-center mb-4 bg-white dark:bg-gray-darkest">
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
