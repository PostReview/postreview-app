import { Footer } from "app/core/components/Footer"
import Navbar from "app/core/components/Navbar"
import { Visions } from "app/core/components/Visions"
import { BlitzPage } from "blitz"
import { Suspense } from "react"
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline"

const About: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback="Loading...">
        <Navbar />
      </Suspense>
      <main className="flex-grow flex flex-col items-center mb-12">
        <h1 className="text-6xl font-bold my-12">About us</h1>
        <div className="flex flex-col items-center max-w-3xl my-12 mx-4">
          <h2 className="text-4xl font-bold">Our mission</h2>
          <div className="my-6">
            We love science and sharing opinions. Our goal is to streamline the opinion-sharing
            process and improve the quality of published papers by creating a reliable feedback
            channel between the authors and the audience.
          </div>
        </div>
        <Visions />
        <div id="team" className="flex flex-col items-center max-w-3xl my-12 mx-4">
          <h2 className="text-4xl font-bold">Our team</h2>
          <div className="my-6">
            PostReview is developed by a small group of scientists passionate about improving
            communications in research.
          </div>
          <div className="flex flex-col items-center">
            <div id="picture">
              <PeopleOutlineIcon sx={{ fontSize: 100 }} />
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
      <Footer />
    </div>
  )
}

export default About
