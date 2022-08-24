import Navbar from "app/core/components/Navbar"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Image, Link } from "blitz"
import { Suspense } from "react"
import teamMemberAntonPhoto from "public/team-member-anton-photo.png"
import teamMemberNamiPhoto from "public/team-member-nami-photo.png"
import teamMemberJazellePhoto from "public/team-member-jazelle-photo.png"
import postReviewMentorPhoto from "public/team-mentor-chris-photo.png"

const TeamPage: BlitzPage = () => {
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
        <div id="team-container" className="md:flex flex-row">
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
          <div id="jazelle-container" className="m-4 flex flex-col items-center">
            <Image
              id="jazelle-photo"
              src={teamMemberJazellePhoto}
              alt="A picture of a woman facing right"
              className="hover:animate-pulse hover:cursor-pointer"
              width={200}
              height={200}
            />
            <h3 className="text-2xl font-bold">Jazelle Maira R. Carillo</h3>
            <h3 className="font-semibold">Lead Designer</h3>
            <div className="m-4 max-w-lg">
              Jazelle Carillo (she/her;{" "}
              <Link href="https://twitter.com/jazellemaira">
                <a
                  className="underline font-thin text-green hover:text-green-dark"
                  target="_blank"
                  rel="nofollow"
                >
                  @jazellemaira
                </a>
              </Link>
              ) is a wife and a cat mom. She enjoys painting and taking photos. Jazelle is in charge
              of PostReview visual design and front end development.
            </div>
          </div>
        </div>
        <h1 id="special-thanks" className="text-4xl font-bold mt-12">
          Special Thanks
        </h1>
        <div id="chris-container" className="m-4 flex flex-col items-center">
          <Image
            id="chris-photo"
            src={postReviewMentorPhoto}
            alt="A picture of Chris, PostReview mentor"
            className="hover:animate-pulse hover:cursor-pointer"
            width={200}
            height={200}
          />
          <h3 className="text-2xl font-bold">Chris Hartgerink, PhD</h3>
          <h3 className="font-semibold">PostReview Mentor</h3>
          <div className="m-4 max-w-lg">
            Chris Hartgerink (he/they;{" "}
            <Link href="https://twitter.com/chartgerink">
              <a
                className="underline font-thin text-green hover:text-green-dark"
                target="_blank"
                rel="nofollow"
              >
                @chartgerink
              </a>
            </Link>
            ) is part researcher, part statistician, part software programmer, part businessperson.
            He is the founder of{" "}
            <Link href="https://libscie.org">
              <a
                className="underline font-thin text-green hover:text-green-dark"
                target="_blank"
                rel="nofollow"
              >
                Liberate Science GmbH
              </a>
            </Link>{" "}
            and{" "}
            <Link href="https://www.researchequals.com/">
              <a
                className="underline font-thin text-green hover:text-green-dark"
                target="_blank"
                rel="nofollow"
              >
                ResearchEquals
              </a>
            </Link>
            . Chris has mentored the Team of PostReview greatly since the beginning.
          </div>
        </div>
      </main>
    </div>
  )
}
TeamPage.getLayout = (page) => <Layout title="Team | PostReview">{page}</Layout>
export default Team
