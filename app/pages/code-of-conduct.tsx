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
CodeOfConductPage.getLayout = (page) => <Layout title="Code of Conduct | PostReview">{page}</Layout>

export default CodeOfConductPage
