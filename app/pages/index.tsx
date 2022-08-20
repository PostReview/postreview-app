import React, { Suspense, useEffect, useState } from "react"
import { useRouter, useSession, BlitzPage, noSSR, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"

// Components
import Navbar from "../core/components/Navbar"
import { Footer } from "app/core/components/Footer"
import { Hero } from "app/core/components/Hero"
import { HowItWorks } from "app/core/components/HowItWorks"
import ArticleList from "app/core/components/ArticleList"
import getQuestionCategories from "app/queries/getQuestionCategories"
import { NavDots } from "app/core/components/NavDots"

const UserInfo = () => {
  const router = useRouter()
  const session = useSession()
  const [questionCategories] = useQuery(getQuestionCategories, undefined)
  const [questionCategory, setQuestionCategory] = useState("Overall")
  const questionCategoryLabels = questionCategories.map(
    (category) => category.questionCategory
  ) as any
  const allLabels = ["Overall"].concat(questionCategoryLabels)
  const [searchCategories, setSearchCategories] = useState(allLabels)

  const handleArrowClick = (direction) => {
    if (direction === "right") {
      const nextCategoryIndex = searchCategories.indexOf(questionCategory) + 1
      // Don't fire if the next item is undefined
      if (!searchCategories[nextCategoryIndex]) return undefined
      setQuestionCategory(searchCategories[nextCategoryIndex]!)
    }
    if (direction === "left") {
      const nextCategoryIndex = searchCategories.indexOf(questionCategory) - 1
      // Don't fire if the next item is undefined
      if (!searchCategories[nextCategoryIndex]) return undefined
      setQuestionCategory(searchCategories[nextCategoryIndex]!)
    }
  }
  // Key event listener
  const handleKeyEvent = (e: KeyboardEvent) => {
    if (e.isComposing || e.key === "ArrowLeft") {
      handleArrowClick("left")
    }
    if (e.isComposing || e.key === "ArrowRight") {
      handleArrowClick("right")
    }
  }
  // Attach key event listener when the question category changes
  useEffect(() => {
    window.addEventListener("keydown", handleKeyEvent, false)
    return () => window.removeEventListener("keydown", handleKeyEvent, false)
  }, [questionCategory])

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
            className="items-center flex flex-row font-bold text-white hover:cursor-pointer"
          >
            <span
              className={`mr-4 ${questionCategory === "Overall" && "invisible"}`}
              onClick={() => handleArrowClick("left")}
            >
              {"<<"}
            </span>
            <div className="text-4xl w-80 text-center">{questionCategory}</div>
            <span
              className={`ml-4 ${
                questionCategory === searchCategories.slice(-1)[0] && "invisible"
              }`}
              onClick={() => handleArrowClick("right")}
            >
              {">>"}
            </span>
          </div>
          <ArticleList questionCategory={questionCategory} />
        </div>
        <NavDots
          searchCategories={searchCategories}
          questionCategory={questionCategory}
          setQuestionCategory={setQuestionCategory}
        />
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
