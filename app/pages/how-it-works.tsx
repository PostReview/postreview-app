import Navbar from "app/core/components/Navbar"
import { HowItWorks } from "app/core/components/HowItWorks"
import { BlitzPage } from "blitz"
import { Suspense } from "react"
import Layout from "app/core/layouts/Layout"

const HowItWorksPage: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col items-center bg-white dark:bg-gray-darkest">
        <HowItWorks />
      </main>
    </div>
  )
}

HowItWorksPage.getLayout = (page) => <Layout title="How it works | PostReview">{page}</Layout>

export default HowItWorksPage
