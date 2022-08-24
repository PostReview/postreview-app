import Navbar from "app/core/components/Navbar"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Image, Link } from "blitz"
import { Suspense } from "react"
import teamMemberAntonPhoto from "public/team-member-anton-photo.png"
import teamMemberNamiPhoto from "public/team-member-nami-photo.png"
import teamMemberJazellePhoto from "public/team-member-jazelle-photo.png"
import postReviewMentorPhoto from "public/team-mentor-chris-photo.png"

const Team: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Suspense fallback="Loading...">
        <Navbar />
      </Suspense>
      <main className="flex-grow flex flex-col items-center mb-12 text-gray-darkest">
        <h1 className="text-5xl font-bold mt-12">Our Team</h1>
        <div className="text-center max-w-xl">
          PostReview is developed by a small group of people passionate about improving
          communications in research.
        </div>
      </main>
    </div>
  )
}
Team.getLayout = (page) => <Layout title="Team | PostReview">{page}</Layout>
export default Team
