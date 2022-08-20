import { BlitzPage, Image } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Suspense } from "react"
import Navbar from "app/core/components/Navbar"
import { Footer } from "app/core/components/Footer"
import codeOfConduct from "public/code-of-conduct.png"
const CodeOfConductPage: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-darkest">
      <Suspense fallback="Loading...">
        <Navbar />
      </Suspense>
      <main className="flex-grow flex flex-col items-center bg-gray-light dark:bg-gray-darkest">
        <div className="py-4 w-full text-3xl font-bold bg-gray-dark dark:bg-black/30">
          <h1 className="text-center text-black dark:text-white">Code of Conduct</h1>
        </div>
        <div id="code-of-conduct-image" className="py-4 brightness-200">
          <Image
            src={codeOfConduct}
            alt="A picture of two peoples' hands holding a balanced scale together"
            width={200}
            height={200}
          />
        </div>
CodeOfConductPage.getLayout = (page) => <Layout title="Code of Conduct | PostReview">{page}</Layout>

export default CodeOfConductPage
