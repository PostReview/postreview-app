import Navbar from "app/core/components/Navbar"
import { BlitzPage, Image, useRouter } from "blitz"
import { Suspense } from "react"
import twoScientistsPhoto from "public/two-scientists-photo.png"
import peopleAroundTheWorld from "public/people-around-the-world.png"
import logoWithNameDarkMode from "public/logo-withname-darkmode.png"
import Layout from "app/core/layouts/Layout"

const About: BlitzPage = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback="Loading...">
        <Navbar />
      </Suspense>
      <main className="flex-grow flex flex-col items-center bg-white text-gray-darkest">
        <h1 className="my-12 mx-4 max-w-3xl text-5xl text-left font-bold text-green">
          Post a review, post-publication
        </h1>
        <div id="story-container" className="flex flex-col max-w-2xl mt-24 mx-4">
          <div className="text-2xl text-left">
            Last year, a question peaked two scientists&apos; minds.
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
            <div className="my-4 animate-[pulse_4s_infinite] text-right hover:cursor-pointer hover:animate-bounce">
              a safe place
        </div>
            <div className="my-6 animate-[pulse_8s_infinite] text-left hover:cursor-pointer hover:animate-bounce">
              convenient
            </div>
            <div className="my-6 text-center hover:cursor-pointer hover:animate-bounce text-black">
              accessible
            </div>
            <div className="my-4 animate-[pulse_10s_infinite] text-right hover:cursor-pointer hover:animate-bounce">
              transparent
            </div>
            <div className="my-4 animate-[pulse_4s_infinite] text-left hover:cursor-pointer hover:animate-bounce">
              fun
            </div>
            <div className="my-4 animate-[pulse_6s_infinite] text-center hover:cursor-pointer hover:animate-bounce">
              equitable
            </div>
            <div className="my-4 text-right hover:cursor-pointer hover:animate-bounce text-black">
              open
            </div>
          </div>
          <div id="where everyone-container" className="my-32 text-4xl font-bold">
            <span className=" text-black sm:whitespace-nowrap">A space where </span>
            <span className=" text-green">everyone</span>
            <span className=" text-black">, not just scholars</span>
            <span className=" text-green"> can share their opinions </span>
            <span className=" text-black">about scholarly articles.</span>
            </div>
            <div id="out-team-description" className="flex flex-row">
              <div className="m-4">
                <h3 className="font-bold">Naoyuki Sunami </h3>
                <h3 className="text-stone-600">Chief Technology Officer</h3>
                <div className="my-2">
                  Nami has a PhD in Social Psychology with background in social rejection research.
                  In his spare time, Nami enjoys drawing, playing guitar and playing Warframe. Nami
                  is in charge of the development of the platform.
                </div>
              </div>
              <div className="m-4">
                <h3 className="font-bold">Anton Lebed</h3>
                <h3 className="text-stone-600">Chief Operating Officer</h3>
                <div className="my-2">
                  Anton is a PhD in Cognitive Psychology with background in visual attention and
                  creativity research. In his spare time, Anton enjoys biking and playing board
                  games. Anton is in charge of the organizational efforts of PostReview.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

About.getLayout = (page) => <Layout title="Our Story | PostReview">{page}</Layout>
export default About
