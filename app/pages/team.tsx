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
    </div>
  )
}
Team.getLayout = (page) => <Layout title="Team | PostReview">{page}</Layout>
export default Team
