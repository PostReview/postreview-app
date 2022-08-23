import EnterDOI from "app/core/components/EnterDOI"
import Navbar from "app/core/components/Navbar"
import { BlitzPage, useRouter, useSession } from "blitz"
import { Suspense } from "react"

const Browse = () => {
  const session = useSession()
  const router = useRouter()
  const isAtRoot = router.pathname === "/"

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest text-gray-darkest dark:text-white">
      <main className="flex-grow flex flex-col items-center">
        <h1 id="post-review" className="mt-44 text-6xl font-bold text-gray-dark dark:text-white">
          PostReview
        </h1>
        <div
          id="search-bar-container"
          className="absolute flex flex-grow mt-60 mb-16 px-4 sm:px-2 md:px-80 w-full justify-center overflow-y-clip"
        >
          {session?.userId ? (
            <EnterDOI session={session} />
          ) : (
            !isAtRoot && <EnterDOI session={session} />
          )}
        </div>
      </main>
    </div>
  )
}

const BrowsePage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <Navbar hideSearch={true} />
      <Browse />
    </Suspense>
  )
}

export default BrowsePage
