import ArticleList from "app/core/components/ArticleList"
import EnterDOI from "app/core/components/EnterDOI"
import { Footer } from "app/core/components/Footer"
import { BlitzPage, useRouter, useSession } from "blitz"
import { Suspense } from "react"

const Browse = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col items-center mb-4">
        <ArticleList />
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
