import ArticleList from "app/core/components/ArticleList"
import { Footer } from "app/core/components/Footer"
import Header from "app/core/components/Header"
import { BlitzPage } from "blitz"
import { Suspense } from "react"

const Browse = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
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
