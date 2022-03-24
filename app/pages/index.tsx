import React, { Suspense } from "react"
import { useRouter, useSession, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

// Components
import Header from "../core/components/Header"
import { Footer } from "app/core/components/Footer"
import { Hero } from "app/core/components/Hero"
import { HowItWorks } from "app/core/components/HowItWorks"
import { SignUpButton } from "app/core/components/SignUpButton"
import ArticleList from "app/core/components/ArticleList"
import { Features } from "app/core/components/Features"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  // Redirect
  const router = useRouter()
  const session = useSession()

  if (currentUser) {
    return (
      <>
        <ArticleList />
      </>
    )
  } else {
    return (
      <>
        <Hero />
        <HowItWorks />
        <ArticleList />
        <Features />
        <SignUpButton />
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback="Loading...">
        <Header />
      </Suspense>
      <main className="flex-grow flex flex-col items-center">
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
