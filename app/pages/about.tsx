import Navbar from "app/core/components/Navbar"
import { BlitzPage, Head, Image, useRouter } from "blitz"
import twoScientistsPhoto from "public/two-scientists-photo.png"
import peopleAroundTheWorld from "public/people-around-the-world.png"
import logoWithNameDarkMode from "public/logo-withname-darkmode.png"
import Layout from "app/core/layouts/Layout"
import { SocialMetadata } from "app/core/components/SocialMetadata"

const pageTitle = "Our Story | PostReview"

const About: BlitzPage = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <SocialMetadata title={pageTitle} />
      </Head>
      <Navbar />
      <div className="w-full bg-gray-darkest flex flex-col items-center">
        <main className="flex-grow flex flex-col items-center bg-white text-gray-darkest">
          <h1 className="my-12 mx-8 max-w-3xl text-5xl text-left font-bold text-green">
            Post a review, post-publication
          </h1>
          <div id="story-container" className="flex flex-col max-w-2xl mt-24 mx-8">
            <div className="text-2xl text-left">
              Last year, a question piqued two scientists&apos; minds.
            </div>
            <h2 className="my-36 md:ml-16 max-w-xl text-4xl font-bold text-black">
              Why is it so difficult to track evaluations of scholarly articles?
            </h2>
            <div className="text-2xl text-left">
              They realized there was no space to document and communicate discussions on scholarly
              articles.
            </div>
            <div className="my-36 text-2xl text-left">They decided to create a space.</div>
            <div id="brainstorming-container">
              <span className="text-4xl font-bold text-black sm:whitespace-nowrap">
                Brainstorming for the{" "}
              </span>
              <span className="text-4xl font-bold text-green">perfect space </span>
              <span className="text-4xl font-bold text-black">began...</span>
            </div>
            <div id="two-scientists-container" className="mt-20 mx-4 flex flex-col items-center">
              <Image
                id="two-scientists-photo"
                src={twoScientistsPhoto}
                alt="A picture of two men thinking with their backs together"
                className="brightness-110"
              />
              <h3 className="absolute mt-60 sm:mt-96 text-6xl sm:text-7xl font-bold text-green">
                It should be
              </h3>
            </div>
            <div id="words-container" className="mx-4 my-4 text-4xl font-bold">
              <div className="ml-auto w-min whitespace-nowrap my-4 animate-[pulse_4s_infinite] text-right hover:cursor-pointer hover:animate-bounce">
                a safe place
              </div>
              <div className="mr-auto w-min my-6 animate-[pulse_8s_infinite] text-left hover:cursor-pointer hover:animate-bounce">
                convenient
              </div>
              <div className="mx-auto w-min my-6 text-center hover:cursor-pointer hover:animate-bounce text-black">
                accessible
              </div>
              <div className="ml-auto w-min my-4 animate-[pulse_10s_infinite] text-right hover:cursor-pointer hover:animate-bounce">
                transparent
              </div>
              <div className="mr-auto w-min my-4 animate-[pulse_4s_infinite] text-left hover:cursor-pointer hover:animate-bounce">
                fun
              </div>
              <div className="mx-auto w-min my-4 animate-[pulse_6s_infinite] text-center hover:cursor-pointer hover:animate-bounce">
                equitable
              </div>
              <div className="ml-auto w-min my-4 text-right hover:cursor-pointer hover:animate-bounce text-black">
                open
              </div>
            </div>
            <div id="where everyone-container" className="my-36 text-4xl font-bold">
              <span className=" text-black sm:whitespace-nowrap">A space where </span>
              <span className=" text-green">everyone</span>
              <span className=" text-black">, not just scholars</span>
              <span className=" text-green"> can share their opinions </span>
              <span className=" text-black">about scholarly articles.</span>
            </div>
            <div className="text-2xl text-left">
              They knew that if they can make their vision happen...
            </div>
            <div className="mx-2 mt-36">
              <Image
                id="people-in-a-globe"
                src={peopleAroundTheWorld}
                alt="An image of a globe as a puzzle with a unique person in each puzzle piece"
                className="contrast-150 hover:cursor-pointer hover:animate-[pulse_6s_infinite]"
              />
            </div>
            <div className="p-6 mt-10 text-2xl bg-green">
              people from all walks of life can join the conversation
            </div>
            <div
              id="rotating-container"
              className="mt-32 mb-72 text-center text-6xl font-bold slidingVertical"
            >
              <span>All of us</span>
              <span>can participate</span>
              <span>in creating</span>
              <span className="text-green">a collective knowledge</span>
            </div>
          </div>
          <div id="ending-of-story-container" className="flex flex-col max-w-2xl px-8 bg-green">
            <div className="mt-24 text-2xl text-left">They believed that...</div>
            <div className="mt-24 mb-16 text-6xl font-bold text-white">
              Opinions on research should be
            </div>
            <div className="mt-10 sm:px-24 text-left sm:text-5xl text-4xl font-bold text-gray-medium">
              open
            </div>
            <div className="mt-14 sm:px-24 text-left sm:text-5xl text-4xl font-bold text-gray-dark">
              accessible
            </div>
            <div className="mt-14 sm:px-24 text-left sm:text-5xl text-4xl font-bold">
              transparent
            </div>
            <div className="mt-14 mb-24 sm:px-24 text-left sm:text-5xl text-4xl font-bold text-black">
              community-driven
            </div>
          </div>
          <div
            id="finale-container"
            className="flex flex-col max-w-2xl px-8 bg-gray-darkest text-gray-light pb-40"
          >
            <div className="mt-24 text-2xl text-left">So they created...</div>
            <div className="mt-32 mx-2 sm:px-16 px-8">
              <Image
                id="logo-with-name"
                src={logoWithNameDarkMode}
                alt="A picture of magnifying glass with the platform name"
                className="brightness-150"
              />
            </div>
            <button
              className="sm:w-52 w-36 mx-auto mb-40 p-4 sm:text-2xl text-xl font-semibold text-green rounded-lg bg-black/50 hover:bg-gray-darkest dark:bg-gray-medium dark:hover:bg-black/40"
              onClick={() => router.push("/signup")}
            >
              Sign up now
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

About.getLayout = (page) => <Layout title={pageTitle}>{page}</Layout>
export default About
