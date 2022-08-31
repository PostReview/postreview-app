import Navbar from "app/core/components/Navbar"
import { HowItWorks } from "app/core/components/HowItWorks"
import { BlitzPage, Head } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SocialMetadata } from "app/core/components/SocialMetadata"

const pageTitle = "How it works | PostReview"

const HowItWorksPage: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <SocialMetadata title={pageTitle} />
      </Head>
      <Navbar />
      <main className="flex-grow flex flex-col items-center bg-white dark:bg-gray-darkest">
        <HowItWorks />
      </main>
    </div>
  )
}

HowItWorksPage.getLayout = (page) => <Layout title={pageTitle}>{page}</Layout>

export default HowItWorksPage
