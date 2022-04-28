import { Footer } from "app/core/components/Footer"
import Header from "app/core/components/Header"
import { HowItWorks } from "app/core/components/HowItWorks"
import { BlitzPage } from "blitz"
import { Suspense } from "react"

const HowItWorksPage: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback="Loading...">
        <Header />
      </Suspense>
      <main className="flex-grow flex flex-col items-center mb-12">
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}

export default HowItWorksPage
