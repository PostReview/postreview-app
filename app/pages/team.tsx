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
          <div id="anton-container" className="m-4 flex flex-col items-center">
            <Image
              id="anton-photo"
              src={teamMemberAntonPhoto}
              alt="A picture of a thinking man facing left"
              className="hover:animate-pulse hover:cursor-pointer"
              width={200}
              height={200}
            />
            <h3 className="text-2xl font-bold">Anton Lebed, PhD</h3>
            <h3 className="font-semibold">Chief Operating Officer</h3>
            <div className="m-4 max-w-lg">
              Anton Lebed (he/him;{" "}
              <Link href="https://twitter.com/coglebed">
                <a
                  className="underline font-thin text-green hover:text-green-dark"
                  target="_blank"
                  rel="nofollow"
                >
                  @coglebed
                </a>
              </Link>
              ) has a PhD in Cognitive Psychology with background in visual attention and creativity
              research. In his spare time, Anton enjoys biking and playing board games. Anton is in
              charge of the organizational efforts of PostReview.
            </div>
          </div>
          <div id="nami-container" className="m-4 flex flex-col items-center">
            <Image
              id="nami-photo"
              src={teamMemberNamiPhoto}
              alt="A picture of a thinking man facing right"
              className="hover:animate-pulse hover:cursor-pointer"
              width={200}
              height={200}
            />
            <h3 className="text-2xl font-bold">Naoyuki(Nami) Sunami, PhD</h3>
            <h3 className="font-semibold">Chief Technology Officer</h3>
            <div className="m-4 max-w-lg">
              Nami Sunami (he/him;{" "}
              <Link href="https://twitter.com/n_sunami">
                <a
                  className="underline font-thin text-green hover:text-green-dark"
                  target="_blank"
                  rel="nofollow"
                >
                  @n_sunami
                </a>
              </Link>
              ) has a PhD in Social Psychology with background in social rejection research. In his
              spare time, Nami enjoys drawing, playing guitar and playing Warframe. Nami is in
              charge of the full stack development of the PostReview platform.
            </div>
          </div>
      </main>
    </div>
  )
}
Team.getLayout = (page) => <Layout title="Team | PostReview">{page}</Layout>
export default Team
