import { Footer } from "app/core/components/Footer"
import Navbar from "app/core/components/Navbar"
import { HowItWorks } from "app/core/components/HowItWorks"
import { BlitzPage } from "blitz"
import { Suspense } from "react"


const HowItWorksPage: BlitzPage = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback="Loading...">
        <Navbar />
      </Suspense>
      <main className="flex-grow flex flex-col items-center bg-white dark:bg-gray-darkest">
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}

export default HowItWorksPage
