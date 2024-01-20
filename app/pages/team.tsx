import Navbar from "app/core/components/Navbar"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Head, Image, Link } from "blitz"
import teamMemberAntonPhoto from "public/team-member-anton-photo.png"
import teamMemberNamiPhoto from "public/team-member-nami-photo.png"
import teamMemberJazellePhoto from "public/team-member-jazelle-photo.png"
import postReviewMentorPhoto from "public/team-mentor-chris-photo.png"
import { SocialMetadata } from "app/core/components/SocialMetadata"

const pageTitle = "Team | PostReview"

const TeamPage: BlitzPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Head>
        <SocialMetadata title={pageTitle} />
      </Head>
      <Navbar />
      <main className="mb-12 flex flex-grow flex-col items-center text-gray-darkest">
        <h1 className="mt-12 text-5xl font-bold">Our Team</h1>
        <div className="mx-4 max-w-xl text-center text-xl">
          PostReview is developed by a small group of people passionate about improving
          communications in research.
        </div>
        <div id="team-container" className="flex-row md:flex">
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
            <h3 className="font-semibold">Co-Founder</h3>
            <div className="m-4 max-w-lg">
              Anton Lebed (he/him;{" "}
              <Link href="https://twitter.com/coglebed">
                <a
                  className="font-thin text-green underline hover:text-green-dark"
                  target="_blank"
                  rel="nofollow"
                >
                  @coglebed
                </a>
              </Link>
              ) has a PhD in Cognitive Psychology with background in visual attention and creativity
              research. In his spare time, Anton enjoys biking and playing board games.
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
            <h3 className="text-2xl font-bold">Naoyuki (Nami) Sunami, PhD</h3>
            <h3 className="font-semibold">Co-Founder</h3>
            <div className="m-4 max-w-lg">
              Nami Sunami (he/him;{" "}
              <Link href="https://twitter.com/n_sunami">
                <a
                  className="font-thin text-green underline hover:text-green-dark"
                  target="_blank"
                  rel="nofollow"
                >
                  @n_sunami
                </a>
              </Link>
              ) has a PhD in Social Psychology with background in social rejection research. In his
              spare time, Nami enjoys drawing, playing guitar and playing Warframe.
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
                  className="font-thin text-green underline hover:text-green-dark"
                  target="_blank"
                  rel="nofollow"
                >
                  @jazellemaira
                </a>
              </Link>
              ) is a wife and a cat mom. She enjoys painting and taking photos. Jazelle designed and
              implemented the user interface.
            </div>
          </div>
        </div>
        <h1 id="special-thanks" className="mt-12 text-4xl font-bold">
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
                className="font-thin text-green underline hover:text-green-dark"
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
                className="font-thin text-green underline hover:text-green-dark"
                target="_blank"
                rel="nofollow"
              >
                Liberate Science GmbH
              </a>
            </Link>{" "}
            and{" "}
            <Link href="https://www.researchequals.com/">
              <a
                className="font-thin text-green underline hover:text-green-dark"
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
TeamPage.getLayout = (page) => <Layout title={pageTitle}>{page}</Layout>
export default TeamPage
