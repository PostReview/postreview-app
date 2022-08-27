import Navbar from "app/core/components/Navbar"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Image } from "blitz"
import transparencyPhoto from "public/transparency-photo.png"
import diversityPhoto from "public/diversity-photo.png"
import accountabilityPhoto from "public/accountability-photo.png"

const MissionVisionPage: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="mb-20 flex-grow flex flex-col items-center text-gray-darkest">
        <h1 className="mt-12 text-5xl font-bold">Our Mission</h1>
        <p className="mt-4 mx-4 text-center text-xl max-w-xl">
          PostReview mission is to de-centralize the power of voicing opinions about scholarly
          outputs.{" "}
        </p>
        <div className="flex flex-col items-center">
          <h1 className="mt-20 text-5xl font-bold">Our Vision</h1>
          <div id="vision-container" className="lg:flex flex-row">
            <div
              id="transparency-container"
              className="mt-16 mb-4 flex flex-col max-w-sm items-center"
            >
              <Image
                src={transparencyPhoto}
                alt="An image of a hand with magnifying glass hovered over a gear icon"
                className="hover:animate-pulse hover:cursor-pointer"
                width={160}
                height={160}
              />
              <p className="mt-2 mx-2 text-xl">
                Make use of the power of transparency for creating a fair and accurate consensus in
                research.
              </p>
            </div>
            <div
              id="diversity-container"
              className="mt-16 mb-4 flex flex-col max-w-sm items-center"
            >
              <Image
                src={diversityPhoto}
                alt="An image of a crowd"
                className="hover:animate-pulse hover:cursor-pointer"
                width={240}
                height={160}
              />
              <p className="mt-2 mx-2 text-xl">
                Amplify the voices of underrepresented groups and identities in research.
              </p>
            </div>
            <div
              id="accountability-container"
              className="mt-16 mb-4 flex flex-col max-w-sm items-center"
            >
              <Image
                src={accountabilityPhoto}
                alt="A picture of two hands holding a star"
                className="hover:animate-pulse hover:cursor-pointer"
                width={160}
                height={160}
              />
              <p className="mt-2 mx-2 text-xl">Increase accountability in research.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
MissionVisionPage.getLayout = (page) => (
  <Layout title="Mission and Vision | PostReview">{page}</Layout>
)
export default MissionVisionPage
