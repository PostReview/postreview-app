import React, { Suspense, useEffect, useState } from "react"
import { useRouter, useSession, BlitzPage, useQuery, useRouterQuery, Head } from "blitz"
import Layout from "app/core/layouts/Layout"

// Components
import Navbar from "../core/components/Navbar"
import { Hero } from "app/core/components/Hero"
import { HowItWorks } from "app/core/components/HowItWorks"
import ArticleList from "app/core/components/ArticleList"
import getQuestionCategories from "app/queries/getQuestionCategories"
import { NavDots } from "app/core/components/NavDots"
import { SocialMetadata } from "app/core/components/SocialMetadata"

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

  // Getting the URL query for `search` for showing the article list
  const query = useRouterQuery()

  return (
    <div className="w-full items-center bg-black pb-32">
      <div id="header-category container" className="flex flex-col items-center">
        <div
          id="reviews-header"
          className="mt-10 mb-2 items-center text-5xl font-semibold text-gray-medium"
        >
          All Reviews
        </div>
        <div
          id="overall-reviews"
          className="flex flex-row items-center overflow-x-clip font-bold text-white hover:cursor-pointer"
        >
          <span
            className={`mr-1 ${questionCategory === "Overall" && "invisible"}`}
            onClick={() => handleArrowClick("left")}
          >
            {"<<"}
          </span>
          <div className="w-80 text-center text-4xl">{questionCategory}</div>
          <span
            className={`ml-1 ${questionCategory === searchCategories.slice(-1)[0] && "invisible"}`}
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
      {session.userId || <HowItWorks />}
    </div>
  )
}

const Home: BlitzPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <SocialMetadata />
      </Head>
      <Navbar />
      <main className="flex flex-grow flex-col items-center bg-white dark:bg-gray-darkest">
        <UserInfo />
      </main>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="PostReview">{page}</Layout>

export default Home
