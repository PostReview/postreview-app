import ArticleList from "app/core/components/ArticleList"
import EnterDOI from "app/core/components/EnterDOI"
import { Footer } from "app/core/components/Footer"
import { BlitzPage, useRouter, useSession } from "blitz"
import { Suspense } from "react"

const Browse = () => {
  const session = useSession()
  const router = useRouter()
  const isAtRoot = router.pathname === "/"

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest text-gray-darkest dark:text-white">
      <main className="flex-grow flex flex-col items-center">
        <h1 id="post-review" className="mt-24 text-5xl font-bold">
          PostReview
        </h1>
        <div
          id="search-bar-container"
          className="absolute flex flex-grow mt-36 w-96 justify-center"
        >
          {session?.userId ? (
            <EnterDOI session={session} />
          ) : (
            !isAtRoot && <EnterDOI session={session} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

const BrowsePage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <Browse />
    </Suspense>
  )
}

export default BrowsePage
