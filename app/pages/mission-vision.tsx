import Navbar from "app/core/components/Navbar"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Image, Link } from "blitz"
import { Suspense } from "react"
import transparencyPhoto from "public/transparency-photo.png"
import diversityPhoto from "public/diversity-photo.png"
import accountabilityPhoto from "public/accountability-photo.png"

const MissionVisionPage: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Suspense fallback="Loading...">
        <Navbar />
      </Suspense>
      <main className="mb-20 flex-grow flex flex-col items-center text-gray-darkest">
        <h1 className="mt-12 text-5xl font-bold">Our Mission</h1>
        <p className="mt-4 mx-4 text-center text-xl max-w-xl">
          Our mission is to de-centralize the power of voicing opinions about scholarly outputs.{" "}
        </p>
      </main>
    </div>
  )
}
MissionVisionPage.getLayout = (page) => (
  <Layout title="Mission and Vision | PostReview">{page}</Layout>
)
export default MissionVisionPage
